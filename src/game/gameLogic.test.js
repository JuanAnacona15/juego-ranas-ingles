import { describe, it, expect } from 'vitest';
import {
  DIFFICULTIES,
  generateTrack,
  shuffle,
  createDeck,
  drawQuestion,
  resolveMove,
  findQuestion,
  computeStats,
} from './gameLogic.js';
import { QUESTIONS, TOTAL_QUESTIONS } from '../data/questions.js';
import { createInitialState, gameReducer } from './gameReducer.js';

describe('banco de preguntas', () => {
  it('tiene 30 fáciles, 40 medias y 50 difíciles (120 en total)', () => {
    expect(QUESTIONS.easy.length).toBe(30);
    expect(QUESTIONS.medium.length).toBe(40);
    expect(QUESTIONS.hard.length).toBe(50);
    expect(TOTAL_QUESTIONS).toBe(120);
  });

  it('cada pregunta tiene 4 opciones, respuesta válida y explicación', () => {
    const all = [...QUESTIONS.easy, ...QUESTIONS.medium, ...QUESTIONS.hard];
    const ids = new Set();
    for (const q of all) {
      expect(q.options).toHaveLength(4);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(4);
      expect(q.question).toBeTruthy();
      expect(q.explanation).toBeTruthy();
      expect(ids.has(q.id)).toBe(false);
      ids.add(q.id);
    }
    expect(ids.size).toBe(120);
  });
});

describe('generateTrack', () => {
  it('genera la cantidad correcta de hojas por dificultad', () => {
    for (const key of ['easy', 'medium', 'hard']) {
      expect(generateTrack(DIFFICULTIES[key].leaves)).toHaveLength(DIFFICULTIES[key].leaves);
    }
  });

  it('la meta (última hoja) siempre es verde', () => {
    for (const n of [10, 15, 20]) {
      const track = generateTrack(n);
      expect(track[track.length - 1]).toBe('green');
    }
  });

  it('las dos primeras hojas no son moradas ni rojas', () => {
    for (let i = 0; i < 50; i++) {
      const track = generateTrack(10);
      expect(['purple', 'red']).not.toContain(track[0]);
      expect(['purple', 'red']).not.toContain(track[1]);
    }
  });

  it('solo usa tipos de hoja válidos', () => {
    const valid = new Set(['green', 'purple', 'red', 'blue', 'yellow']);
    const track = generateTrack(20);
    for (const t of track) expect(valid.has(t)).toBe(true);
  });

  it('la distribución respeta aproximadamente los porcentajes', () => {
    const track = generateTrack(20);
    const count = (t) => track.filter((x) => x === t).length;
    expect(count('green')).toBeGreaterThanOrEqual(8);
    expect(count('green')).toBeLessThanOrEqual(13);
    expect(count('red')).toBeLessThanOrEqual(4);
    expect(count('purple')).toBeLessThanOrEqual(4);
  });
});

describe('shuffle y mazo', () => {
  it('shuffle conserva la longitud y el multiconjunto', () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const out = shuffle(arr, () => 0.5);
    expect(out).toHaveLength(5);
    expect([...out].sort()).toEqual([...arr].sort());
  });

  it('createDeck contiene todos los ids del nivel', () => {
    const deck = createDeck('easy');
    expect(deck).toHaveLength(30);
    expect(new Set(deck).size).toBe(30);
    const ids = new Set(QUESTIONS.easy.map((q) => q.id));
    for (const id of deck) expect(ids.has(id)).toBe(true);
  });

  it('drawQuestion agota el mazo y lo vuelve a mezclar', () => {
    const state = { difficulty: 'easy', questionDeck: createDeck('easy'), deckIndex: 30 };
    const r = drawQuestion(state);
    expect(r.question).toBeTruthy();
    expect(r.index).toBe(1);
  });
});

describe('resolveMove', () => {
  it('hoja verde: avanza una posición sin efectos', () => {
    const leaves = ['green', 'green', 'green', 'green', 'green'];
    expect(resolveMove(leaves, 1)).toEqual({ position: 1, win: false, skipped: 0, bonus: false });
  });

  it('morada retrocede dos hojas, sin pasar de 0', () => {
    const leaves = ['purple', 'green', 'green', 'green', 'green'];
    expect(resolveMove(leaves, 1).position).toBe(0);
    const leaves2 = ['green', 'purple', 'green', 'green', 'green'];
    expect(resolveMove(leaves2, 2).position).toBe(0);
  });

  it('roja resta exactamente dos turnos', () => {
    const leaves = ['green', 'red', 'green', 'green', 'green'];
    const r = resolveMove(leaves, 2);
    expect(r.skipped).toBe(2);
    expect(r.position).toBe(2);
  });

  it('azul concede una pregunta extra', () => {
    const leaves = ['green', 'blue', 'green', 'green', 'green'];
    const r = resolveMove(leaves, 2);
    expect(r.bonus).toBe(true);
    expect(r.position).toBe(2);
  });

  it('amarilla produce un avance adicional', () => {
    const leaves = ['green', 'yellow', 'green', 'green', 'green'];
    expect(resolveMove(leaves, 2).position).toBe(3);
  });

  it('amarilla encadena otra hoja especial', () => {
    const leaves = ['green', 'yellow', 'blue', 'green', 'green'];
    const r = resolveMove(leaves, 2);
    expect(r.position).toBe(3);
    expect(r.bonus).toBe(true);
  });

  it('encadenar varias amarillas termina y puede ganar', () => {
    const leaves = ['green', 'yellow', 'yellow', 'yellow', 'green'];
    const r = resolveMove(leaves, 2);
    expect(r.win).toBe(true);
    expect(r.position).toBe(5);
  });

  it('detecta la victoria al alcanzar o superar la meta', () => {
    const leaves = ['green', 'green', 'green', 'green', 'green'];
    expect(resolveMove(leaves, 5).win).toBe(true);
    const leaves2 = ['green', 'green', 'green', 'yellow', 'green'];
    expect(resolveMove(leaves2, 4).win).toBe(true);
  });

  it('el retroceso morado no activa efectos encadenados', () => {
    // hoja 3 morada retrocede a la 1; la 1 es azul pero NO debe activarse
    const leaves = ['blue', 'green', 'purple', 'green', 'green'];
    const r = resolveMove(leaves, 3);
    expect(r.position).toBe(1);
    expect(r.bonus).toBe(false);
  });

  it('una misma hoja especial no se activa dos veces en un movimiento', () => {
    // no hay ciclo posible, pero el guardián de visitados lo garantiza
    const leaves = ['green', 'yellow', 'yellow', 'yellow', 'green'];
    const r = resolveMove(leaves, 2);
    expect(r.position).toBe(5); // termina, no itera indefinidamente
    expect(r.win).toBe(true);
  });
});

describe('computeStats', () => {
  it('calcula porcentaje correcto', () => {
    expect(computeStats({ correctAnswers: 3, incorrectAnswers: 1 }).percentage).toBe(75);
  });
  it('devuelve 0% cuando no respondió nada', () => {
    expect(computeStats({ correctAnswers: 0, incorrectAnswers: 0 }).percentage).toBe(0);
  });
});

describe('reducer de partida', () => {
  function makeState(overrides = {}) {
    const base = {
      status: 'playing',
      difficulty: 'easy',
      totalLeaves: 5,
      leaves: ['green', 'green', 'green', 'green', 'green'],
      currentPlayer: 0,
      players: [
        { id: 1, name: 'P1', frogId: 'frog_01', color: 'blue', position: 0, skippedTurns: 0, correctAnswers: 0, incorrectAnswers: 0 },
        { id: 2, name: 'P2', frogId: 'frog_07', color: 'orange', position: 0, skippedTurns: 0, correctAnswers: 0, incorrectAnswers: 0 },
      ],
      questionDeck: ['easy_001', 'easy_002', 'easy_003', 'easy_004', 'easy_005'],
      deckIndex: 0,
      currentQuestion: findQuestion('easy_001'),
      phase: 'question',
      questionAnswered: false,
      lastAnswer: null,
      bonusActive: false,
      penaltyMessage: null,
      winner: null,
    };
    return { ...base, ...overrides };
  }

  it('respuesta correcta avanza una hoja y suma acierto', () => {
    const q = findQuestion('easy_001');
    const s = makeState();
    const next = gameReducer(s, { type: 'ANSWER', payload: { selectedIndex: q.correctAnswer } });
    expect(next.players[0].position).toBe(1);
    expect(next.players[0].correctAnswers).toBe(1);
    expect(next.phase).toBe('feedback');
  });

  it('respuesta incorrecta no avanza y suma fallo', () => {
    const q = findQuestion('easy_001');
    const wrong = (q.correctAnswer + 1) % 4;
    const s = makeState();
    const next = gameReducer(s, { type: 'ANSWER', payload: { selectedIndex: wrong } });
    expect(next.players[0].position).toBe(0);
    expect(next.players[0].incorrectAnswers).toBe(1);
  });

  it('doble clic no cuenta dos veces', () => {
    const q = findQuestion('easy_001');
    const s = makeState();
    const once = gameReducer(s, { type: 'ANSWER', payload: { selectedIndex: q.correctAnswer } });
    const twice = gameReducer(once, { type: 'ANSWER', payload: { selectedIndex: q.correctAnswer } });
    expect(twice.players[0].correctAnswers).toBe(1);
  });

  it('CONTINUAR cambia al otro jugador', () => {
    const q = findQuestion('easy_001');
    let s = makeState();
    s = gameReducer(s, { type: 'ANSWER', payload: { selectedIndex: q.correctAnswer } });
    s = gameReducer(s, { type: 'CONTINUE' });
    expect(s.currentPlayer).toBe(1);
    expect(s.phase).toBe('question');
  });

  it('hoja roja descuenta dos turnos del jugador', () => {
    const q = findQuestion('easy_001');
    const s = makeState({ leaves: ['green', 'red', 'green', 'green', 'green'], players: makeState().players.map((p, i) => ({ ...p, position: i === 0 ? 1 : 0 })) });
    const next = gameReducer(s, { type: 'ANSWER', payload: { selectedIndex: q.correctAnswer } });
    expect(next.players[0].position).toBe(2);
    expect(next.players[0].skippedTurns).toBe(2);
  });

  it('hoja azul concede pregunta extra al mismo jugador', () => {
    const q = findQuestion('easy_001');
    const s = makeState({ leaves: ['green', 'blue', 'green', 'green', 'green'], players: makeState().players.map((p, i) => ({ ...p, position: i === 0 ? 1 : 0 })) });
    let next = gameReducer(s, { type: 'ANSWER', payload: { selectedIndex: q.correctAnswer } });
    expect(next.bonusActive).toBe(true);
    next = gameReducer(next, { type: 'CONTINUE' });
    expect(next.currentPlayer).toBe(0); // sigue el mismo jugador
    expect(next.phase).toBe('question');
  });

  it('detecta la victoria', () => {
    const q = findQuestion('easy_001');
    const s = makeState({ players: makeState().players.map((p, i) => ({ ...p, position: i === 0 ? 4 : 0 })) });
    const next = gameReducer(s, { type: 'ANSWER', payload: { selectedIndex: q.correctAnswer } });
    expect(next.winner).toBe(1);
    expect(next.status).toBe('finished');
  });

  it('crear una partida nueva elimina penalizaciones anteriores', () => {
    const fresh = createInitialState({
      difficulty: 'easy',
      players: [
        { name: 'A', frogId: 'frog_01' },
        { name: 'B', frogId: 'frog_07' },
      ],
    });
    expect(fresh.players[0].skippedTurns).toBe(0);
    expect(fresh.players[1].skippedTurns).toBe(0);
    expect(fresh.players[0].position).toBe(0);
    expect(fresh.leaves).toHaveLength(10);
    expect(fresh.leaves[fresh.leaves.length - 1]).toBe('green');
  });
});
