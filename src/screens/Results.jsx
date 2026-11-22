import { computeStats } from '../game/gameLogic.js';
import { getFrog } from '../data/frogs.js';

export default function Results({ state, onReplay, onMenu }) {
  const winner = state.players.find((p) => p.id === state.winner);
  const winnerFrog = getFrog(winner.frogId);
  const rows = state.players.map((p) => ({ player: p, ...computeStats(p) }));

  return (
    <div className="screen results">
      <div className="results-card">
        <div className="confetti">🎉</div>
        <h1 className="results-title">¡Ganó {winner.name}!</h1>
        <img className="results-frog" src={winnerFrog.image} alt={winnerFrog.commonName} />
        <p className="results-species">
          {winnerFrog.commonName} · <em>{winnerFrog.scientificName}</em>
        </p>

        <div className="results-stats">
          {rows.map(({ player, correct, incorrect, percentage }) => (
            <div key={player.id} className={`result-row ${player.color}`}>
              <div className="result-name">
                {player.id === state.winner ? '🥇' : '🥈'} {player.name}
              </div>
              <div className="result-metrics">
                <span>✅ {correct} correctas</span>
                <span>❌ {incorrect} incorrectas</span>
                <span>📊 {percentage}% aciertos</span>
              </div>
            </div>
          ))}
        </div>

        <div className="screen-actions">
          <button className="btn btn-primary" onClick={onReplay}>
            VOLVER A JUGAR
          </button>
          <button className="btn btn-ghost" onClick={onMenu}>
            MENÚ PRINCIPAL
          </button>
        </div>
      </div>
    </div>
  );
}
