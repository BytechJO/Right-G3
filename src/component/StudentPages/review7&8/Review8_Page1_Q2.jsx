import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const items = [
  {
    starter: "The teacher was in the classroom.",
    correct: [
      "Her name was Miss Rose.",
      "The classroom was quiet.",
      "No, they weren’t.",
      "No, there wasn’t.",
      "The students were outside.",
    ],
  },
];

export default function Review8_Page1_Q3() {
  // ✨ كل كلمة string بدل array
  const [answers, setAnswers] = useState(items[0].correct.map(() => ""));
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const handleChange = (value, index) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };
  const resetAll = () => {
    setAnswers(items.map(() => ["", ""]));
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    setAnswers(items.map((item) => item.correct));
    setLocked(true);
    setShowResult(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const empty = answers.some((row) => row.some((word) => word === ""));

    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let score = 0;

    answers.forEach((row, i) => {
      if (row.join(" ") === items[i].correct.join(" ")) {
        score++;
      }
    });

    const total = items.length;

    const message = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:#2e7d32;font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);

    setShowResult(true);
    setLocked(true);
  };

  return (
    <div className="flex justify-center p-8">
      <div className="div-forall" style={{ width: "60%" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px",marginBottom:20 }}>B</span>
          Write about the picture.
        </h5>
        <p style={{ fontWeight: "bold" }}>{items[0].starter}</p>

        {answers.map((ans, i) => (
          <textarea
            key={i}
            value={ans}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-full border-b-2 mb-3"
            rows={1}
            disabled={locked}
          />
        ))}
        {/* buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={resetAll}>
            Start Again ↻
          </button>

          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>

          <button className="check-button2" onClick={checkAnswers}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
}
