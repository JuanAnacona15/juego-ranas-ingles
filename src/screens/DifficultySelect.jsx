import { useState } from 'react';
import { DIFFICULTIES } from '../game/gameLogic.js';

const ORDER = ['easy', 'medium', 'hard'];

export default function DifficultySelect({ onBack, onStart }) {
  const [selected, setSelected] = useState('easy');

  return (
    <div className="screen">
      <header className="screen-header">
        <button className="btn btn-ghost" onClick={onBack}>
          ← VOLVER
        </button>
        <h1>Elige la dificultad</h1>
      </header>

      <div className="difficulty-cards">
        {ORDER.map((key) => {
          const d = DIFFICULTIES[key];
          return (
            <button
              key={key}
              type="button"
              className={`difficulty-card ${key} ${selected === key ? 'selected' : ''}`}
              onClick={() => setSelected(key)}
            >
              <h2>{d.label}</h2>
              <p className="diff-leaves">🪷 {d.leaves} hojas</p>
              <p className="diff-topics">{d.topics}</p>
            </button>
          );
        })}
      </div>

      <div className="screen-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          VOLVER
        </button>
        <button className="btn btn-primary" onClick={() => onStart(selected)}>
          COMENZAR CARRERA
        </button>
      </div>
    </div>
  );
}
