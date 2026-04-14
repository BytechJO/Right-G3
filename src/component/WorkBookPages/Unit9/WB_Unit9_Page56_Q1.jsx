import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    text: "The cats have cups and bats.",
    correct: true,
  },
  {
    id: 2,
    text: "The bees and dogs see the trees.",
    correct: true,
  },
  {
    id: 3,
    text: "The girl has books, peas, and dogs.",
    correct: false,
  },
];

export default function Phonics_QA() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
  };

  const isWrong = (item) => {
    if (!checked) return false;
    return answers[item.id] !== item.correct;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id] !== undefined
    );

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
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
    const ans = {};
    ITEMS.forEach((item) => {
      ans[item.id] = item.correct;
    });

    setAnswers(ans);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const renderBox = (id, value) => {
    const selected = answers[id] === value;

    return (
      <div
        onClick={() => handleSelect(id, value)}
        style={{
          width: "38px",
          height: "38px",
          border: "2px solid #bdbdbd",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: showAns ? "default" : "pointer",
        }}
      >
        {selected && (
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: value ? "#ef4444" : "#ef4444",
            }}
          >
            {value ? "✓" : "✕"}
          </span>
        )}
      </div>
    );
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
          <span className="WB-ex-A">A</span>
          Do the words ending in "s" have the same -s sound? Write ✓ or ✕.
        </h1>

        {ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            {/* sentence */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "700" }}>{item.id}</span>
              <p style={{ margin: 0, fontSize: "18px" }}>{item.text}</p>
            </div>

            {/* choices */}
            <div style={{ display: "flex", gap: "10px" }}>
              {renderBox(item.id, true)}
              {renderBox(item.id, false)}
            </div>

            {/* wrong mark */}
            {isWrong(item) && (
              <div
                style={{
                  position: "absolute",
                  right: "-8px",
                  top: "-8px",
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
        ))}

        <div style={{ display: "flex", justifyContent: "center" }}>
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