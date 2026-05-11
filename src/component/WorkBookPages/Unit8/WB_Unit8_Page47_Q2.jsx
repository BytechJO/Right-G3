import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import boyImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/2.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const OPTIONS = ["a horse", "a TV", "dogs, sheep, and goats", "a cat"];

const QUESTIONS = [
  {
    id: 1,
    before: "There was",
    answer: "a horse",
    after: "on the farm.",
  },
  {
    id: 2,
    before: "There wasn't",
    answer: "a TV",
    after: "on the farm.",
  },
  {
    id: 3,
    before: "They had",
    answer: "dogs, sheep, and goats",
    after: "on the farm.",
  },
  {
    id: 4,
    before: "They didn't have",
    answer: "a cat",
    after: "on the farm.",
  },
];

const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "bold",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      pointerEvents: "none",
      zIndex: 5,
    }}
  >
    ✕
  </div>
);

export default function WB_Page47_F() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns || showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const isComplete = (q) => {
    return answers[q.id];
  };

  const isCorrect = (q) => {
    return answers[q.id] === q.answer;
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = QUESTIONS.every((q) => isComplete(q));

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    QUESTIONS.forEach((q) => {
      if (isCorrect(q)) score++;
    });

    setShowResults(true);

    const total = QUESTIONS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const solved = {};

    QUESTIONS.forEach((q) => {
      solved[q.id] = q.answer;
    });

    setAnswers(solved);
    setShowAns(true);
    setShowResults(false);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "10px",
        }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span>
          Read and write.
        </h1>
<div className="flex flex-col gap-5">
        <img
          src={boyImg}
          alt="boy"
          style={{
            width: "100%",
            height: "280px",
            objectFit: "contain",
          }}
        />

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          {QUESTIONS.map((q) => {
            const wrong = showResults && isComplete(q) && !isCorrect(q);

            return (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111",
                  }}
                >
                  {q.id}
                </span>

                {/* Before */}
                <span
                  style={{
                    fontSize: "18px",
                    color: "#111",
                  }}
                >
                  {q.before}
                </span>

                {/* Select */}
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <select
                    disabled={showAns || showResults}
                    value={answers[q.id] || ""}
                    onChange={(e) => handleSelect(q.id, e.target.value)}
                    style={{
                      minWidth: "220px",
                      minHeight: "38px",
                      borderBottom: wrong
                        ? `2px solid ${WRONG_COLOR}`
                        : `1px solid ${BORDER_COLOR}`,
                      padding: "4px 8px",
                      fontSize: "18px",
                      outline: "none",
                      background: "#fff",
                      color: "#111",
                    }}
                  >
                    <option value="">Select</option>

                    {OPTIONS.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>

                  {wrong && <ErrorBadge />}
                </div>

                {/* After */}
                <span
                  style={{
                    fontSize: "18px",
                    color: "#111",
                  }}
                >
                  {q.after}
                </span>
              </div>
            );
          })}
        </div>
</div>
        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
