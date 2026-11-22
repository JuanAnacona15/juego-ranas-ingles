import { useState, useEffect } from 'react';
import Home from './screens/Home.jsx';
import CharacterSelect from './screens/CharacterSelect.jsx';
import DifficultySelect from './screens/DifficultySelect.jsx';
import Game from './screens/Game.jsx';
import Instructions from './screens/Instructions.jsx';
import Settings from './screens/Settings.jsx';

const SETTINGS_KEY = 'sapo-race-settings';
const DEFAULT_SETTINGS = { sound: false, animations: true };

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    /* ignorar preferencias corruptas */
  }
  return { ...DEFAULT_SETTINGS };
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [settings, setSettings] = useState(loadSettings);
  const [players, setPlayers] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    document.documentElement.classList.toggle('no-animations', !settings.animations);
  }, [settings]);

  return (
    <div className="app">
      {screen === 'home' && (
        <Home
          onPlay={() => setScreen('charSelect')}
          onHowTo={() => setScreen('instructions')}
          onSettings={() => setScreen('settings')}
        />
      )}
      {screen === 'charSelect' && (
        <CharacterSelect
          onBack={() => setScreen('home')}
          onContinue={(p) => {
            setPlayers(p);
            setScreen('difficulty');
          }}
        />
      )}
      {screen === 'difficulty' && (
        <DifficultySelect
          onBack={() => setScreen('charSelect')}
          onStart={(d) => {
            setDifficulty(d);
            setScreen('game');
          }}
        />
      )}
      {screen === 'game' && players && difficulty && (
        <Game
          players={players}
          difficulty={difficulty}
          settings={settings}
          onExit={() => setScreen('home')}
        />
      )}
      {screen === 'instructions' && <Instructions onBack={() => setScreen('home')} />}
      {screen === 'settings' && (
        <Settings settings={settings} onChange={setSettings} onBack={() => setScreen('home')} />
      )}
    </div>
  );
}
