// Lógica pura del juego: sin React, sin DOM, sin efectos secundarios.
// Todas las funciones son deterministas y testeables.

import { QUESTIONS } from '../data/questions.js';

// ---------------------------------------------------------------------------
// Dificultades
// ---------------------------------------------------------------------------
export const DIFFICULTIES = {
  easy: {
    key: 'easy',
    label: 'FÁCIL',
    leaves: 10,
    topics: 'Presente simple, vocabulario y pasado simple sencillo.',
  },
  medium: {
    key: 'medium',
    label: 'INTERMEDIO',
    leaves: 15,
    topics: 'Presente simple, pasado simple, comparativos y superlativos.',
  },
  hard: {
    key: 'hard',
    label: 'DIFÍCIL',
    leaves: 20,
    topics: 'Combinación de todos los temas anteriores.',
  },
};

// ---------------------------------------------------------------------------
// Tipos de hoja
// ---------------------------------------------------------------------------
export const LEAF_TYPES = {
  green: { key: 'green', label: 'Normal', color: '#65BD48', effect: 'No effect.' },
  purple: { key: 'purple', label: 'Trap', color: '#A66DD4', effect: 'Go back two leaves.' },
  red: { key: 'red', label: 'Penalty', color: '#ED6464', effect: 'Lose your next two turns.' },
  blue: { key: 'blue', label: 'Bonus', color: '#65C7E8', effect: 'Answer one extra question.' },
  yellow: { key: 'yellow', label: 'Boost', color: '#FFD45C', effect: 'Advance one extra leaf.' },
};

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Generación de la pista
// ---------------------------------------------------------------------------
// Distribución objetivo (excluyendo la meta, que siempre es verde):
// ~50% verde, 15% morada, 10% roja, 15% azul, 10% amarilla.
export function generateTrack(totalLeaves, rng = Math.random) {
  const leaves = new Array(totalLeaves).fill('green');
  const last = totalLeaves - 1;
  leaves[last] = 'green'; // la meta siempre es verde

  const rest = totalLeaves - 1; // hojas a repartir antes de la meta
  const counts = {
    purple: Math.round(rest * 0.15),
    red: Math.round(rest * 0.10),
    blue: Math.round(rest * 0.15),
    yellow: Math.round(rest * 0.10),
  };
  const greens = rest - (counts.purple + counts.red + counts.blue + counts.yellow);

  const pool = [
    ...Array(counts.purple).fill('purple'),
    ...Array(counts.red).fill('red'),
    ...Array(counts.blue).fill('blue'),
    ...Array(counts.yellow).fill('yellow'),
    ...Array(Math.max(0, greens)).fill('green'),
  ];
  const mixed = shuffle(pool, rng);

  for (let i = 0; i < last; i++) leaves[i] = mixed[i] || 'green';

  // Las primeras hojas no deben penalizar en exceso: saca moradas/rojas del inicio.
  for (let i = 0; i < Math.min(2, last); i++) {
    if (leaves[i] === 'purple' || leaves[i] === 'red') {
      let swapped = false;
      for (let j = i + 1; j < last; j++) {
        const t = leaves[j];
        if (t === 'green' || t === 'blue' || t === 'yellow') {
          const tmp = leaves[i];
          leaves[i] = leaves[j];
          leaves[j] = tmp;
          swapped = true;
          break;
        }
      }
      if (!swapped) leaves[i] = 'green';
    }
  }

  return leaves;
}

// ---------------------------------------------------------------------------
// Banco de preguntas / mazo
// ---------------------------------------------------------------------------
const QUESTION_INDEX = {};
for (const level of ['easy', 'medium', 'hard']) {
  for (const q of QUESTIONS[level]) QUESTION_INDEX[q.id] = q;
}

export function findQuestion(id) {
  return QUESTION_INDEX[id] || null;
}

export function createDeck(level) {
  return shuffle(QUESTIONS[level].map((q) => q.id));
}

// Saca la siguiente pregunta del mazo. Si el mazo se agota, se vuelve a mezclar.
export function drawQuestion(state) {
  let deck = state.questionDeck;
  let index = state.deckIndex;
  if (!deck || deck.length === 0) {
    deck = createDeck(state.difficulty);
    index = 0;
  } else if (index >= deck.length) {
    deck = shuffle(deck);
    index = 0;
  }
  const id = deck[index];
  return { question: QUESTION_INDEX[id], deck, index: index + 1 };
}

// ---------------------------------------------------------------------------
// Movimiento y efectos de hojas
// ---------------------------------------------------------------------------
// Resuelve el aterrizaje en `startPos` y todas las cadenas de efectos.
// Posiciones: 0 = casilla inicial, 1..totalLeaves = hojas (leaves[0..N-1]).
// La meta es la posición `totalLeaves` (la última hoja).
// Devuelve: { position, win, skipped, bonus }
// - skipped: turnos que pierde el jugador (hoja roja)
// - bonus: si el jugador ganó una pregunta extra (hoja azul)
// Reglas:
// - El retroceso morado NO activa otros efectos.
// - Una misma hoja especial no se activa dos veces en un mismo movimiento.
// - La resolución encadenada está limitada a la longitud de la pista.
export function resolveMove(leaves, startPos) {
  const totalLeaves = leaves.length;
  const goal = totalLeaves; // alcanzar o superar esta posición = victoria
  let pos = startPos;
  const visited = new Set();
  let skipped = 0;
  let bonus = false;
  const maxSteps = totalLeaves + 2;

  for (let step = 0; step < maxSteps; step++) {
    if (pos >= goal) {
      return { position: goal, win: true, skipped, bonus };
    }
    if (pos < 0) pos = 0;
    const leaf = leaves[pos - 1];
    if (pos === 0 || leaf === 'green') break;
    if (visited.has(pos)) break; // ya se activó en este movimiento
    visited.add(pos);

    if (leaf === 'purple') {
      pos = Math.max(0, pos - 2);
      break; // retroceso sin efectos encadenados
    } else if (leaf === 'red') {
      skipped += 2;
      break;
    } else if (leaf === 'blue') {
      bonus = true;
      break;
    } else if (leaf === 'yellow') {
      pos += 1; // impulso: puede encadenar otra hoja
    }
  }

  if (pos >= goal) return { position: goal, win: true, skipped, bonus };
  if (pos < 0) pos = 0;
  return { position: pos, win: false, skipped, bonus };
}

// ---------------------------------------------------------------------------
// Estadísticas
// ---------------------------------------------------------------------------
export function computeStats(player) {
  const correct = player.correctAnswers;
  const incorrect = player.incorrectAnswers;
  const total = correct + incorrect;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { correct, incorrect, total, percentage };
}
