const Button = ({
  handleStartAgain,
  handleShowAnswer,
  checkAnswers,
  checkDisabled = false,
}) => {
  return (
    <div className="action-buttons-container">
      {handleStartAgain && (
        <button onClick={handleStartAgain} className="try-again-button">
          Start Again ↻
        </button>
      )}

      {handleShowAnswer && (
        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>
      )}

      {checkAnswers && (
        <button
          onClick={() => {
            if (checkDisabled) return;

            checkAnswers();
          }}
          className="check-button2"
          aria-disabled={checkDisabled}
          tabIndex={0}
        >
          Check Answer ✓
        </button>
      )}
    </div>
  );
};

export default Button;
