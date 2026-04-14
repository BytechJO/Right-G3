import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const SentenceBuilder = ({
  id,
  parts,
  correct,
  onUpdate,
  showResult,
  forceAnswer,
}) => {
  const [availableWords, setAvailableWords] = useState(
    parts.map((word, index) => ({
      id: `${id}-word-${index}`,
      text: word,
    }))
  );

  const [chosenWords, setChosenWords] = useState([]);

  React.useEffect(() => {
    if (forceAnswer) {
      const words = correct.split(" ").map((word, index) => ({
        id: `${id}-correct-${index}`,
        text: word,
      }));
      setChosenWords(words);
      setAvailableWords([]);
      onUpdate(correct);
    }
  }, [forceAnswer, correct, id, onUpdate]);

  const handleWordClick = (wordToAdd) => {
    const newChosenWords = [...chosenWords, wordToAdd];
    setChosenWords(newChosenWords);
    setAvailableWords(availableWords.filter((w) => w.id !== wordToAdd.id));
    onUpdate(newChosenWords.map((w) => w.text).join(" "));
  };

  const handleRemoveWord = (wordToRemove) => {
    const newChosenWords = chosenWords.filter((w) => w.id !== wordToRemove.id);
    setChosenWords(newChosenWords);

    setAvailableWords((prev) =>
      [...prev, wordToRemove].sort((a, b) => a.id.localeCompare(b.id))
    );

    onUpdate(newChosenWords.map((w) => w.text).join(" "));
  };

  const isIncorrectAnswer = () => {
    if (!showResult) return false;

    const userAnswer = chosenWords.map((w) => w.text).join(" ").trim().toLowerCase();
    const correctAnswer = correct.trim().toLowerCase();

    if (!userAnswer) return false;
    return userAnswer !== correctAnswer;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          minHeight: "44px",
          padding: "8px",
          borderRadius: "10px",
          background: "#f3f4f6",
        }}
      >
        {availableWords.map((word) => (
          <button
            key={word.id}
            onClick={() => handleWordClick(word)}
            style={{
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #cfcfcf",
              background: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {word.text}
          </button>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            minHeight: "44px",
            padding: "8px 8px 10px 8px",
            borderBottom: "2px solid #666",
          }}
        >
          {chosenWords.map((word) => (
            <button
              key={word.id}
              onClick={() => handleRemoveWord(word)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #bfdbfe",
                background: "#dbeafe",
                color: "#1e3a8a",
                fontSize: "16px",
                cursor: forceAnswer ? "default" : "pointer",
              }}
              disabled={forceAnswer}
            >
              {word.text}
            </button>
          ))}
        </div>

        {isIncorrectAnswer() && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            ✕
          </div>
        )}
      </div>
    </div>
  );
};

const EXERCISES = [
  {
    id: 1,
    scrambled: ["he", "won’t", "plant", "a", "tree."],
    correct: "He won’t plant a tree.",
  },
  {
    id: 2,
    scrambled: ["they", "will", "wash", "the", "car."],
    correct: "They will wash the car.",
  },
  {
    id: 3,
    scrambled: ["she", "will", "build", "a", "snowman."],
    correct: "She will build a snowman.",
  },
  {
    id: 4,
    scrambled: ["I", "won’t", "watch", "a", "movie."],
    correct: "I won’t watch a movie.",
  },
  {
    id: 5,
    scrambled: ["she", "won’t", "lie", "in", "the", "sun."],
    correct: "She won’t lie in the sun.",
  },
  {
    id: 6,
    scrambled: ["he", "will", "read", "a", "book."],
    correct: "He will read a book.",
  },
];

export default function WB_Unit8_Page60_QH() {
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswerUpdate = (id, answer) => {
    setUserAnswers((prev) => ({ ...prev, [id]: answer }));

    if (showResults) {
      setShowResults(false);
    }
  };

  const checkAnswers = () => {
    if (showAnswers) return;

    const unanswered = EXERCISES.filter(
      (item) => !userAnswers[item.id] || userAnswers[item.id].trim() === ""
    );

    if (unanswered.length > 0) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }

    let correctCount = 0;

    EXERCISES.forEach((item) => {
      const userAnswer = (userAnswers[item.id] || "").trim().toLowerCase();
      const correctAnswer = item.correct.trim().toLowerCase();
      if (userAnswer === correctAnswer) correctCount++;
    });

    setShowResults(true);

    if (correctCount === EXERCISES.length) {
      ValidationAlert.success(`Score: ${correctCount} / ${EXERCISES.length}`);
    } else if (correctCount > 0) {
      ValidationAlert.warning(`Score: ${correctCount} / ${EXERCISES.length}`);
    } else {
      ValidationAlert.error(`Score: ${correctCount} / ${EXERCISES.length}`);
    }
  };

  const handleStartAgain = () => {
    setUserAnswers({});
    setShowResults(false);
    setShowAnswers(false);
    setResetKey((prev) => prev + 1);
  };

  const handleShowAnswer = () => {
    const allAnswers = {};
    EXERCISES.forEach((item) => {
      allAnswers[item.id] = item.correct;
    });

    setUserAnswers(allAnswers);
    setShowResults(true);
    setShowAnswers(true);
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">H</span>
          Read and write sentences.
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {EXERCISES.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 280px 1fr",
                gap: "16px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#222",
                  lineHeight: "1.6",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  fontSize: "18px",
                  color: "#222",
                  lineHeight: "1.6",
                }}
              >
                {item.scrambled.join(" / ")}
              </div>

              <SentenceBuilder
                key={`${item.id}-${resetKey}`}
                id={item.id}
                parts={item.scrambled}
                correct={item.correct}
                onUpdate={(answer) => handleAnswerUpdate(item.id, answer)}
                showResult={showResults}
                forceAnswer={showAnswers}
              />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}