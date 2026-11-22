export default function FrogCard({ frog, selectedBy, onSelect }) {
  const ringClass = selectedBy ? `ring-${selectedBy}` : '';
  return (
    <button
      type="button"
      className={`frog-card ${selectedBy ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className={`frog-card-ring ${ringClass}`}>
        <img src={frog.image} alt={frog.commonName} />
      </div>
      <div className="frog-card-body">
        <h3>{frog.commonName}</h3>
        <p className="frog-card-sci">{frog.scientificName}</p>
        <p className="frog-card-habitat">📍 {frog.habitat}</p>
        <p className="frog-card-fun">💡 {frog.funFact}</p>
      </div>
    </button>
  );
}
