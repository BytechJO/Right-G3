import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgRoom from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/A.1.svg";

const QUESTIONS = [
  { id: 1, text: "The cat is playing with a flag.", correct: false },
  { id: 2, text: "The man is sleeping.", correct: true },
  { id: 3, text: "There are flowers on the chair.", correct: false },
  { id: 4, text: "There are plates on the table.", correct: true },
];

export default function WB_Unit6_Page35_QA() {
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

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every((q) => answers[q.id] !== undefined);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let score = 0;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });

    setChecked(true);

    if (score === QUESTIONS.length) {
      ValidationAlert.success(`Score: ${score} / ${QUESTIONS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${QUESTIONS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${QUESTIONS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    QUESTIONS.forEach((q) => {
      correctMap[q.id] = q.correct;
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

  const isWrong = (id) => {
    if (!checked) return false;
    return answers[id] !== QUESTIONS.find((q) => q.id === id).correct;
  };

  const getBtnStyle = (selected) => ({
    width: "34px",
    height: "34px",
    borderRadius: "6px",
    border: "2px solid #e5e7eb",
    background: selected ? "#ef4444" : "#f3f4f6",
    color: selected ? "#fff" : "#9ca3af",
    cursor: showAns ? "default" : "pointer",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "1",
  });

  return (
    <div
      className="main-container-component"
      style={{
        width: "100%",
      }}
    >
      <div
        className="div-forall"
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          padding: "10px 16px 20px 16px",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
          }}
        >
          <span className="WB-ex-A">A</span>
          Look, read, and write ✓ or ✗.
        </h1>

        {/* الصورة */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <img
            src={imgRoom}
            alt="room"
            style={{
              width: "100%",
              maxWidth: "760px",
              borderRadius: "12px",
              display: "block",
              margin: 0,
            }}
          />
        </div>

        {/* الجدول */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 72px 72px",
              alignItems: "center",
              fontWeight: "600",
              color: "#555",
              padding: "0 8px",
              marginBottom: "2px",
            }}
          >
            <span></span>
            <span style={{ textAlign: "center" }}>True</span>
            <span style={{ textAlign: "center" }}>False</span>
          </div>

          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 72px 72px",
                alignItems: "center",
                gap: "8px",
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  color: "#333",
                  lineHeight: "1.5",
                }}
              >
                <strong>{q.id}.</strong> {q.text}
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleSelect(q.id, true)}
                  style={getBtnStyle(answers[q.id] === true)}
                >
                  ✓
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => handleSelect(q.id, false)}
                  style={getBtnStyle(answers[q.id] === false)}
                >
                  ✗
                </button>
              </div>

              {isWrong(q.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-7px",
                    right: "-7px",
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
                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>

        {/* الأزرار */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "6px",
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