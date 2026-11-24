const TOPICS = {
  simple_present: 'Presente simple',
  simple_past: 'Pasado simple',
  comparatives: 'Comparativos',
  superlatives: 'Superlativos',
  vocabulary: 'Vocabulario',
};

function topicLabel(t) {
  return TOPICS[t] || t;
}

export default function QuestionCard({ state, activePlayer, onAnswer, onContinue }) {
  const { phase, currentQuestion, lastAnswer, penaltyMessage, bonusActive } = state;

  if (phase === 'penalty') {
    return (
      <div className="question-card">
        <div className="penalty-box">
          <span className="penalty-icon">🚫</span>
          <p className="penalty-text">{penaltyMessage}</p>
          <button className="btn btn-primary" onClick={onContinue}>
            CONTINUAR
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="question-card">
        <p className="question-empty">Preparando pregunta…</p>
      </div>
    );
  }

  const answered = phase === 'feedback';
  const correctIndex = currentQuestion.correctAnswer;
  const selected = lastAnswer ? lastAnswer.selectedIndex : null;

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="turn-label">
          🐸 {activePlayer.name} · {bonusActive ? '¡pregunta bonus!' : 'tu turno'}
        </span>
        <span className="topic-badge">{topicLabel(currentQuestion.topic)}</span>
      </div>

      <h2 className="question-text">{currentQuestion.question}</h2>

      <div className="options">
        {currentQuestion.options.map((opt, i) => {
          let cls = 'option';
          if (answered) {
            if (i === correctIndex) cls += ' correct';
            else if (i === selected) cls += ' wrong';
            else cls += ' dim';
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              disabled={answered}
              onClick={() => onAnswer(i)}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span className="option-text">{opt}</span>
              {answered && i === correctIndex && <span className="opt-icon ok">✔</span>}
              {answered && i === selected && i !== correctIndex && (
                <span className="opt-icon bad">✘</span>
              )}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`feedback ${lastAnswer.correct ? 'feedback-ok' : 'feedback-bad'}`}>
          <p className="feedback-title">
            {lastAnswer.correct ? '¡Correcto! 🎉' : '¡Incorrecto! 😢'}
          </p>
          {!lastAnswer.correct && (
            <p className="feedback-correct-answer">
              La respuesta correcta era: <strong>{currentQuestion.options[correctIndex]}</strong>
            </p>
          )}
          <p className="feedback-explanation">{currentQuestion.explanation}</p>
          {lastAnswer.leaf && lastAnswer.leaf !== 'green' && (
            <p className="feedback-leaf">
              {lastAnswer.correct && lastAnswer.leaf === 'blue' && '🔵 ¡Estás en una hoja azul (bonus)! Responde una pregunta extra.'}
              {lastAnswer.correct && lastAnswer.leaf === 'yellow' && '🟡 ¡Estás en una hoja amarilla (impulso)! Avanzas una hoja extra.'}
              {!lastAnswer.correct && lastAnswer.leaf === 'purple' && '🟣 Fallaste en una hoja morada (trampa): retrocedes 2 hojas.'}
              {!lastAnswer.correct && lastAnswer.leaf === 'red' && '🔴 Fallaste en una hoja roja: pierdes tus próximos 2 turnos.'}
            </p>
          )}
          <button className="btn btn-primary" onClick={onContinue}>
            CONTINUAR
          </button>
        </div>
      )}
    </div>
  );
}
