import { useReducer, useState } from 'react';
import { gameReducer, createInitialState } from '../game/gameReducer.js';
import { DIFFICULTIES } from '../game/gameLogic.js';
import GameBoard from '../components/GameBoard.jsx';
import QuestionCard from '../components/QuestionCard.jsx';
import PlayerStatus from '../components/PlayerStatus.jsx';
import Results from './Results.jsx';

export default function Game({ players, difficulty, onExit }) {
  const [state, dispatch] = useReducer(
    gameReducer,
    { difficulty, players },
    createInitialState,
  );
  const [showPause, setShowPause] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);

  if (state.status === 'finished' && state.winner) {
    return (
      <Results
        state={state}
        onReplay={() => dispatch({ type: 'START_GAME', payload: { difficulty, players } })}
        onMenu={onExit}
      />
    );
  }

  const activePlayer = state.players[state.currentPlayer];

  return (
    <div className="screen game-screen">
      <header className="game-header">
        <button className="btn btn-ghost" onClick={() => setShowPause(true)}>
          ⏸ Pausa
        </button>
        <h1 className="game-title">SAPO RACE</h1>
        <span className="difficulty-badge">{DIFFICULTIES[state.difficulty].label}</span>
      </header>

      <div className="player-bar">
        <PlayerStatus
          player={state.players[0]}
          active={state.currentPlayer === 0}
          totalLeaves={state.totalLeaves}
        />
        <PlayerStatus
          player={state.players[1]}
          active={state.currentPlayer === 1}
          totalLeaves={state.totalLeaves}
        />
      </div>

      <div className="game-layout">
        <GameBoard
          leaves={state.leaves}
          players={state.players}
          totalLeaves={state.totalLeaves}
        />
        <QuestionCard
          state={state}
          activePlayer={activePlayer}
          onAnswer={(i) => dispatch({ type: 'ANSWER', payload: { selectedIndex: i } })}
          onContinue={() => dispatch({ type: 'CONTINUE' })}
        />
      </div>

      {showPause && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Pausa</h2>
            <button className="btn btn-primary" onClick={() => setShowPause(false)}>
              CONTINUAR
            </button>
            <button className="btn btn-ghost" onClick={() => setConfirmExit(true)}>
              SALIR AL MENÚ
            </button>
          </div>
        </div>
      )}

      {confirmExit && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¿Abandonar la partida?</h2>
            <p>Se perderá el progreso actual.</p>
            <button className="btn btn-primary" onClick={onExit}>
              SÍ, SALIR
            </button>
            <button className="btn btn-ghost" onClick={() => setConfirmExit(false)}>
              SEGUIR JUGANDO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
