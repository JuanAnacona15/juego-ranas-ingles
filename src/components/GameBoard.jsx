import { useState, useEffect } from 'react';
import LilyPad from './LilyPad.jsx';

function useColumns(totalCells) {
  const compute = () => {
    if (typeof window === 'undefined') return 5;
    if (window.innerWidth < 640) return 3;
    return totalCells > 16 ? 6 : 5;
  };
  const [cols, setCols] = useState(compute);
  useEffect(() => {
    const onResize = () => setCols(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCells]);
  return cols;
}

export default function GameBoard({ leaves, players, totalLeaves }) {
  const totalCells = totalLeaves + 1; // inicio + hojas
  const cols = useColumns(totalCells);

  const cells = [];
  cells.push({
    key: 0,
    label: 'INICIO',
    type: 'start',
    isGoal: false,
    occupants: players.filter((p) => p.position === 0),
  });
  for (let i = 0; i < totalLeaves; i++) {
    const pos = i + 1;
    cells.push({
      key: pos,
      label: pos,
      type: leaves[i],
      isGoal: i === totalLeaves - 1,
      occupants: players.filter((p) => p.position === pos),
    });
  }

  return (
    <div className="game-board" style={{ gridTemplateColumns: `repeat(${cols}, minmax(60px, 1fr))` }}>
      {cells.map((cell, idx) => {
        const row = Math.floor(idx / cols);
        const colInRow = idx % cols;
        const col = row % 2 === 0 ? colInRow + 1 : cols - colInRow;
        return (
          <div
            key={cell.key}
            className="board-cell"
            style={{ gridRow: row + 1, gridColumn: col }}
          >
            <LilyPad
              label={cell.label}
              type={cell.type}
              occupants={cell.occupants}
              isGoal={cell.isGoal}
            />
          </div>
        );
      })}
    </div>
  );
}
