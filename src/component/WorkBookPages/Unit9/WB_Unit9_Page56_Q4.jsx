import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  { id: 1, correct: true },
  { id: 2, correct: false },
  { id: 3, correct: true },
  { id: 4, correct: false },
  { id: 5, correct: true },
  { id: 6, correct: false },
];

export default function Phonics_Page56_QD() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id) => {
    if (showAns) return;

    setAnswers((prev) => {
      const current = prev[id];

      let nextValue;
      if (current === undefined) {
        nextValue = true; // ✓
      } else if (current === true) {
        nextValue = false; // ✕
      } else {
        nextValue = undefined; // empty
      }

      return {
        ...prev,
        [id]: nextValue,
      };
    });
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);

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

    setChecked(true);

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
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!checked) return false;
    if (answers[item.id] === undefined) return false;
    return answers[item.id] !== item.correct;
  };

  const renderSymbol = (value) => {
    if (value === true) {
      return (
        <span
          style={{
            color: "#e32626",
            fontSize: "44px",
            fontWeight: "700",
            lineHeight: "1",
            position: "relative",
            top: "-2px",
          }}
        >
          ✓
        </span>
      );
    }

    if (value === false) {
      return (
        <span
          style={{
            color: "#e32626",
            fontSize: "44px",
            fontWeight: "700",
            lineHeight: "1",
            position: "relative",
            top: "-2px",
          }}
        >
          ✕
        </span>
      );
    }

    return null;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Do they both have the same -s sound? Listen and write ✓ or ✕.
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "70px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                  minWidth: "16px",
                }}
              >
                {item.id}
              </span>

              <div
                onClick={() => handleSelect(item.id)}
                style={{
                  width: "54px",
                  height: "54px",
                  border: "2px solid #ababab",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: showAns ? "default" : "pointer",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                {renderSymbol(answers[item.id])}
              </div>

              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-10px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}