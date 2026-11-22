export default function Settings({ settings, onChange, onBack }) {
  return (
    <div className="screen">
      <header className="screen-header">
        <button className="btn btn-ghost" onClick={onBack}>
          ← VOLVER
        </button>
        <h1>Opciones</h1>
      </header>

      <div className="settings-list">
        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-title">Efectos de sonido</span>
            <span className="setting-desc">Disponible en una próxima versión.</span>
          </div>
          <button type="button" className="toggle disabled" disabled>
            <span className="toggle-knob" />
          </button>
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <span className="setting-title">Animaciones decorativas</span>
            <span className="setting-desc">Saltos, rebotes y brillos de las hojas.</span>
          </div>
          <button
            type="button"
            className={`toggle ${settings.animations ? 'on' : ''}`}
            onClick={() => onChange({ ...settings, animations: !settings.animations })}
            aria-pressed={settings.animations}
          >
            <span className="toggle-knob" />
          </button>
        </div>
      </div>

      <p className="settings-note">
        Las preferencias se guardan en este dispositivo.
      </p>

      <div className="screen-actions">
        <button className="btn btn-primary" onClick={onBack}>
          LISTO
        </button>
      </div>
    </div>
  );
}
