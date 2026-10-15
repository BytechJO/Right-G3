const Button = ({
  handleStartAgain,
  handleShowAnswer,
  checkAnswers,
  checkDisabled = false,
}) => {
    return(
        <div className="action-buttons-container">
        <button onClick={handleStartAgain} className="try-again-button">
          Start Again ↻
        </button>
        {/* ⭐⭐⭐ NEW: زر Show Answer */}
        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>

        <button
          onClick={checkAnswers}
          className="check-button2"
          disabled={checkDisabled}
          aria-disabled={checkDisabled}
        >
          Check Answer ✓
        </button>
      </div>
    );
}
export default Button;
