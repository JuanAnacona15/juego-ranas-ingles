import { useState } from 'react';
import { FROGS } from '../data/frogs.js';
import FrogCard from '../components/FrogCard.jsx';

const MAX_NAME = 16;

export default function CharacterSelect({ onBack, onContinue }) {
  const [players, setPlayers] = useState([
    { name: 'Jugador 1', frogId: 'frog_01' },
    { name: 'Jugador 2', frogId: 'frog_07' },
  ]);
  const [active, setActive] = useState(0);

  const ownerOf = (frogId) => {
    const i = players.findIndex((p) => p.frogId === frogId);
    return i === 0 ? 'blue' : i === 1 ? 'orange' : null;
  };

  const setFrog = (frogId) =>
    setPlayers((ps) => ps.map((p, i) => (i === active ? { ...p, frogId } : p)));

  const setName = (value) =>
    setPlayers((ps) =>
      ps.map((p, i) => (i === active ? { ...p, name: value.slice(0, MAX_NAME) } : p)),
    );

  const chosen = FROGS.find((f) => f.id === players[active].frogId);

  return (
    <div className="screen">
      <header className="screen-header">
        <button className="btn btn-ghost" onClick={onBack}>
          ← VOLVER
        </button>
        <h1>Elige tus ranas</h1>
      </header>

      <div className="slot-tabs">
        {players.map((p, i) => (
          <button
            key={i}
            type="button"
            className={`slot-tab ${i === 0 ? 'blue' : 'orange'} ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            {i === 0 ? '🔵' : '🟠'} {p.name}
          </button>
        ))}
      </div>

      <div className="name-row">
        <label htmlFor="player-name">Nombre del jugador {active + 1}</label>
        <input
          id="player-name"
          value={players[active].name}
          maxLength={MAX_NAME}
          onChange={(e) => setName(e.target.value)}
          placeholder="Máx. 16 caracteres"
        />
        <span className="char-count">
          {players[active].name.length}/{MAX_NAME}
        </span>
      </div>

      <div className="frog-grid">
        {FROGS.map((frog) => (
          <FrogCard key={frog.id} frog={frog} selectedBy={ownerOf(frog.id)} onSelect={() => setFrog(frog.id)} />
        ))}
      </div>

      <div className={`chosen-preview ${active === 0 ? 'blue' : 'orange'}`}>
        {chosen && <img src={chosen.image} alt={chosen.commonName} />}
        <span>
          <strong>{chosen?.commonName}</strong> · <em>{chosen?.scientificName}</em>
        </span>
      </div>

      <div className="screen-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          VOLVER
        </button>
        <button className="btn btn-primary" onClick={() => onContinue(players)}>
          CONTINUAR
        </button>
      </div>
    </div>
  );
}
