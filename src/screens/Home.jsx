export default function Home({ onPlay, onHowTo, onSettings }) {
  return (
    <div className="screen home">
      <img src="/assets/backgrounds/pond.svg" className="bg" alt="" />
      <div className="home-content">
        <h1 className="logo">
          SAPO <span>RACE</span>
        </h1>
        <p className="tagline">¡Salta, aprende inglés y descubre Colombia!</p>
        <div className="home-frogs">
          <img src="/assets/frogs/frog_07.svg" className="frog-left" alt="" />
          <img src="/assets/frogs/frog_01.svg" className="frog-right" alt="" />
        </div>
        <div className="home-buttons">
          <button className="btn btn-primary" onClick={onPlay}>
            JUGAR
          </button>
          <button className="btn btn-secondary" onClick={onHowTo}>
            CÓMO JUGAR
          </button>
          <button className="btn btn-secondary" onClick={onSettings}>
            OPCIONES
          </button>
        </div>
        <footer className="credits">
          SAPO RACE · Juego educativo sobre los anfibios de Colombia · Inglés básico
        </footer>
      </div>
    </div>
  );
}
