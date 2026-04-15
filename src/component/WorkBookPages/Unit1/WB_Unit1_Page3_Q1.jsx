import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    text: "The car is faster than the skateboard.",
    correct: "True",
  },
  {
    id: 2,
    text: "The grandpa is younger than the grandson.",
    correct: "False",
  },
  {
    id: 3,
    text: "The lion is larger than the cat.",
    correct: "True",
  },
  {
    id: 4,
    text: "The truck is smaller than the car.",
    correct: "False",
  },
  {
    id: 5,
    text: "The snake is longer than the worm.",
    correct: "True",
  },
  {
    id: 6,
    text: "The book is heavier than the pen.",
    correct: "True",
  },
];

export default function WB_UnitX_TrueFalse() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span> Read and write ✓.
        </h1>

        {ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            <div style={{ fontSize: "18px" }}>
              {item.id}. {item.text}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {["True", "False"].map((option) => {
                const selected = answers[item.id] === option;

                return (
                  <div
                    key={option}
                    onClick={() => handleSelect(item.id, option)}
                    style={{
                      padding: "6px 14px",
                      border: selected ? "3px solid #ef4444" : "2px solid #ccc",
                      borderRadius: "8px",
                      cursor: showAns ? "default" : "pointer",
                      backgroundColor: "white",
                    }}
                  >
                    {option}
                  </div>
                );
              })}
            </div>

            {isWrong(item) && (
              <span style={{ color: "red", fontWeight: "bold" }}>✕</span>
            )}
          </div>
        ))}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <Button text="Check" onClick={handleCheck} />
          <Button text="Show Answer" onClick={handleShowAnswer} />
          <Button text="Start Again" onClick={handleReset} />
        </div>
      </div>
    </div>
  );
}