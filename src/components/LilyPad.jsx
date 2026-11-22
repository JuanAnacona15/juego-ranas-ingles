import { LEAF_TYPES } from '../game/gameLogic.js';
import { getFrog } from '../data/frogs.js';

export default function LilyPad({ label, type, occupants = [], isGoal = false }) {
  const color =
    type === 'start' ? '#FFF8E7' : (LEAF_TYPES[type] && LEAF_TYPES[type].color) || '#65BD48';

  return (
    <div className={`lily-pad ${type}`} style={{ '--pad-color': color }}>
      <svg viewBox="0 0 120 120" className="lily-pad-svg" aria-hidden="true">
        <path
          d="M60 16 C94 16 110 46 110 78 C110 100 88 110 60 110 C32 110 10 100 10 78 C10 46 26 16 60 16 Z"
          fill={color}
          stroke="#00000026"
          strokeWidth="2.5"
        />
        <path d="M60 16 L60 110" stroke="#00000022" strokeWidth="3" fill="none" />
        <path d="M22 62 L98 74" stroke="#0000001c" strokeWidth="3" fill="none" />
      </svg>
      <span className="lily-pad-number">{label}</span>
      {isGoal && <span className="lily-pad-flag">🏁</span>}
      <div className="lily-pad-frogs">
        {occupants.map((p, i) => {
          const offset = occupants.length > 1 ? (i === 0 ? -9 : 9) : 0;
          return (
            <img
              key={p.id}
              src={getFrog(p.frogId).image}
              alt={p.name}
              className={`pad-frog ${p.color}`}
              style={{ transform: `translateX(${offset}px) translateY(-2px)` }}
            />
          );
        })}
      </div>
    </div>
  );
}
