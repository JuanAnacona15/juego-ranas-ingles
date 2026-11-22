import { LEAF_TYPES } from '../game/gameLogic.js';

const STEPS = [
  'Elige tu rana.',
  'Selecciona la dificultad.',
  'Responde preguntas de inglés.',
  'Si aciertas, avanzas una hoja.',
  'Descubre los efectos de las hojas especiales.',
  '¡Llega primero a la meta!',
];

export default function Instructions({ onBack }) {
  return (
    <div className="screen">
      <header className="screen-header">
        <button className="btn btn-ghost" onClick={onBack}>
          ← VOLVER
        </button>
        <h1>Cómo jugar</h1>
      </header>

      <div className="instructions">
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>

        <h2>Tipos de hoja</h2>
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
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
