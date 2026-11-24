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
  purple: { key: 'purple', label: 'Trap', color: '#A66DD4', effect: 'If you fail here, go back two leaves.' },
  red: { key: 'red', label: 'Penalty', color: '#ED6464', effect: 'If you fail here, lose your next two turns.' },
  blue: { key: 'blue', label: 'Bonus', color: '#65C7E8', effect: 'If you answer correctly here, get an extra question.' },
  yellow: { key: 'yellow', label: 'Boost', color: '#FFD45C', effect: 'If you answer correctly here, advance two leaves.' },
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
// Movimiento y efectos de hoja (según el resultado de la respuesta)
// ---------------------------------------------------------------------------
// La hoja en la que está parado el jugador decide la consecuencia de su respuesta.
// Posiciones: 0 = casilla inicial, 1..totalLeaves = hojas (leaves[0..N-1]).
// La meta es la posición `totalLeaves` (la última hoja).
// - Correcta: avanza 1 hoja (2 si está sobre amarilla) y gana bonus si está sobre azul.
// - Incorrecta: retrocede 2 si está sobre morada, pierde 2 turnos si está sobre roja,
//   o se queda quieto en el resto.

// Hoja en la que está parado el jugador (null en la salida o en la meta).
export function currentLeaf(leaves, position) {
  return position > 0 && position < leaves.length ? leaves[position - 1] : null;
}

// Devuelve { position, skipped, bonus, win }.
export function applyMove(leaves, position, correct) {
  const goal = leaves.length;
  const leaf = currentLeaf(leaves, position);
  let pos = position;
  let skipped = 0;
  let bonus = false;

  if (correct) {
    pos = Math.min(position + (leaf === 'yellow' ? 2 : 1), goal);
    bonus = leaf === 'blue';
  } else if (leaf === 'purple') {
    pos = Math.max(0, position - 2);
  } else if (leaf === 'red') {
    skipped = 2;
  }

  return { position: pos, skipped, bonus, win: pos >= goal };
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
