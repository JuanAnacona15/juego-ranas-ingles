import { LEAF_TYPES } from '../game/gameLogic.js';

const STEPS = [
  'Choose your frog.',
  'Select the difficulty.',
  'Answer English questions.',
  'If you answer correctly, advance one leaf.',
  'Discover the special leaf effects.',
  'Be the first to reach the goal!',
];

export default function Instructions({ onBack }) {
  return (
    <div className="screen">
      <header className="screen-header">
        <button className="btn btn-ghost" onClick={onBack}>
          ← BACK
        </button>
        <h1>How to Play</h1>
      </header>

      <div className="instructions">
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <h2>Leaf types</h2>
        <div className="leaf-legend">
          {Object.values(LEAF_TYPES).map((t) => (
            <div key={t.key} className={`leaf-legend-item ${t.key}`}>
              <svg viewBox="0 0 120 120" className="legend-pad" aria-hidden="true">
                <path
                  d="M60 16 C94 16 110 46 110 78 C110 100 88 110 60 110 C32 110 10 100 10 78 C10 46 26 16 60 16 Z"
                  fill={t.color}
                  stroke="#00000026"
                  strokeWidth="2.5"
                />
              </svg>
              <div>
                <strong>{t.label}</strong>
                <p>{t.effect}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="screen-actions">
          <button className="btn btn-primary" onClick={onBack}>
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}
