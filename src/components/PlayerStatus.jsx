import { getFrog } from '../data/frogs.js';

export default function PlayerStatus({ player, active, totalLeaves }) {
  const frog = getFrog(player.frogId);
  const positionLabel =
    player.position >= totalLeaves
      ? '¡Meta!'
      : player.position === 0
        ? 'Inicio'
        : `Hoja ${player.position}`;

  return (
    <div className={`player-status ${player.color} ${active ? 'active' : ''}`}>
      <div className="player-status-ring">
        <img src={frog.image} alt={frog.commonName} />
      </div>
      <div className="player-status-info">
        <span className="player-status-name">{player.name}</span>
        <span className="player-status-pos">{positionLabel}</span>
        {player.skippedTurns > 0 && (
          <span className="player-status-skip">
            ⏳ {player.skippedTurns} turno{player.skippedTurns > 1 ? 's' : ''} perdido
            {player.skippedTurns > 1 ? 's' : ''}
          </span>
        )}
      </div>
      {active && <span className="player-status-turn">TU TURNO</span>}
    </div>
  );
}
