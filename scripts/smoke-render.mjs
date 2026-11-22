// Smoke test de renderizado (SSR) para atrapar errores de runtime en las pantallas.
// Ejecutar: node scripts/smoke-render.mjs
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';

// --- shims de entorno de navegador (mínimos) ---
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};
globalThis.window = {
  innerWidth: 1200,
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  addEventListener() {},
  removeEventListener() {},
};
globalThis.document = {
  documentElement: { classList: { toggle() {} } },
  getElementById: () => null,
  addEventListener() {},
};

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const mods = {};
async function load(name) {
  mods[name] = (await server.ssrLoadModule(name)).default;
}

await load('/src/App.jsx');
await load('/src/screens/Home.jsx');
await load('/src/screens/CharacterSelect.jsx');
await load('/src/screens/DifficultySelect.jsx');
await load('/src/screens/Instructions.jsx');
await load('/src/screens/Settings.jsx');
await load('/src/screens/Game.jsx');
await load('/src/screens/Results.jsx');
const { createInitialState } = await server.ssrLoadModule('/src/game/gameReducer.js');
const { findQuestion } = await server.ssrLoadModule('/src/game/gameLogic.js');

function render(name, node) {
  const html = renderToString(node);
  if (!html || html.length < 50) throw new Error(`${name}: render vacío`);
  console.log(`✓ ${name} (${html.length} chars)`);
  return html;
}

const noop = () => {};

render('App (Home)', React.createElement(mods['/src/App.jsx']));
render('Home', React.createElement(mods['/src/screens/Home.jsx'], { onPlay: noop, onHowTo: noop, onSettings: noop }));
render('CharacterSelect', React.createElement(mods['/src/screens/CharacterSelect.jsx'], { onBack: noop, onContinue: noop }));
render('DifficultySelect', React.createElement(mods['/src/screens/DifficultySelect.jsx'], { onBack: noop, onStart: noop }));
render('Instructions', React.createElement(mods['/src/screens/Instructions.jsx'], { onBack: noop }));
render('Settings', React.createElement(mods['/src/screens/Settings.jsx'], { settings: { sound: false, animations: true }, onChange: noop, onBack: noop }));

const players = [
  { name: 'Juan', frogId: 'frog_01' },
  { name: 'Luna', frogId: 'frog_07' },
];
render('Game (carrera)', React.createElement(mods['/src/screens/Game.jsx'], { players, difficulty: 'easy', onExit: noop }));

// Resultados: estado de victoria simulado
const state = createInitialState({ difficulty: 'easy', players });
state.winner = 1;
state.status = 'finished';
state.players[0].correctAnswers = 4;
state.players[0].incorrectAnswers = 1;
state.players[1].correctAnswers = 2;
state.players[1].incorrectAnswers = 2;
render('Results', React.createElement(mods['/src/screens/Results.jsx'], { state, onReplay: noop, onMenu: noop }));

await server.close();
console.log('\nTodos los renderizados OK.');
