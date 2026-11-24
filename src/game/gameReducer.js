// Reducer central del estado de la partida. Inmutable: nunca muta el estado previo.

import {
  DIFFICULTIES,
  generateTrack,
  createDeck,
  drawQuestion,
  applyMove,
  currentLeaf,
} from './gameLogic.js';

export function createInitialState({ difficulty, players }) {
  const diff = DIFFICULTIES[difficulty] ? difficulty : 'easy';
  const totalLeaves = DIFFICULTIES[diff].leaves;
  const leaves = generateTrack(totalLeaves);
  const deck = createDeck(diff);

  const state = {
    status: 'playing', // 'playing' | 'paused' | 'finished'
    difficulty: diff,
    totalLeaves,
    leaves,
    currentPlayer: 0,
    players: players.map((p, i) => ({
      id: i + 1,
      name: p.name,
      frogId: p.frogId,
      color: i === 0 ? 'blue' : 'orange',
      position: 0,
      skippedTurns: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
    })),
    questionDeck: deck,
    deckIndex: 0,
    currentQuestion: null,
    phase: 'question', // 'question' | 'feedback' | 'penalty'
    questionAnswered: false,
    lastAnswer: null, // { selectedIndex, correct, correctIndex, leaf }
    bonusActive: false,
    penaltyMessage: null,
    winner: null,
  };

  const draw = drawQuestion(state);
  state.questionDeck = draw.deck;
  state.deckIndex = draw.index;
  state.currentQuestion = draw.question;
  return state;
}

function advanceTurn(state) {
  const players = state.players.map((p) => ({ ...p }));
  const p = 1 - state.currentPlayer;
  const player = players[p];

  if (player.skippedTurns > 0) {
    player.skippedTurns -= 1;
    return {
      ...state,
      players,
      currentPlayer: p,
      phase: 'penalty',
      currentQuestion: null,
      questionAnswered: false,
      lastAnswer: null,
      bonusActive: false,
      penaltyMessage: `${player.name} pierde su turno (hoja roja).`,
    };
  }

  const draw = drawQuestion(state);
  return {
    ...state,
    players,
    currentPlayer: p,
    questionDeck: draw.deck,
    deckIndex: draw.index,
    currentQuestion: draw.question,
    phase: 'question',
    questionAnswered: false,
    lastAnswer: null,
    bonusActive: false,
    penaltyMessage: null,
  };
}

function handleAnswer(state, selectedIndex) {
  if (state.phase !== 'question' || state.questionAnswered) return state;

  const q = state.currentQuestion;
  const correct = selectedIndex === q.correctAnswer;

  const players = state.players.map((p) => ({ ...p }));
  const player = players[state.currentPlayer];
  if (correct) player.correctAnswers += 1;
  else player.incorrectAnswers += 1;

  const leaf = currentLeaf(state.leaves, player.position);
  const res = applyMove(state.leaves, player.position, correct);
  player.position = res.position;
  player.skippedTurns += res.skipped;

  let bonusActive = res.bonus;
  let winner = null;
  let status = state.status;
  if (res.win) {
    winner = player.id;
    status = 'finished';
  }

  return {
    ...state,
    status,
    winner,
    players,
    phase: 'feedback',
    questionAnswered: true,
    lastAnswer: { selectedIndex, correct, correctIndex: q.correctAnswer, leaf },
    bonusActive,
    penaltyMessage: null,
  };
}

function handleContinue(state) {
  if (state.phase === 'penalty') {
    return advanceTurn({ ...state, players: state.players.map((p) => ({ ...p })) });
  }
  if (state.phase !== 'feedback' || state.status === 'finished') return state;

  if (state.bonusActive) {
    const draw = drawQuestion(state);
    return {
      ...state,
      questionDeck: draw.deck,
      deckIndex: draw.index,
      currentQuestion: draw.question,
      phase: 'question',
      questionAnswered: false,
      lastAnswer: null,
      bonusActive: false,
    };
  }

  return advanceTurn({ ...state, players: state.players.map((p) => ({ ...p })) });
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return createInitialState(action.payload);
    case 'ANSWER':
      return handleAnswer(state, action.payload.selectedIndex);
    case 'CONTINUE':
      return handleContinue(state);
    case 'PAUSE':
      return state.status === 'playing' ? { ...state, status: 'paused' } : state;
    case 'RESUME':
      return state.status === 'paused' ? { ...state, status: 'playing' } : state;
    default:
      return state;
  }
}
