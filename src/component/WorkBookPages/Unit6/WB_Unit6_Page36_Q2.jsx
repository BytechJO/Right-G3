import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import raceImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 36/H.1.svg";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const QUESTIONS = [
  { id: 1, text: "Who is first?", correct: "L" },
  { id: 2, text: "Who is third?", correct: "J" },
  { id: 3, text: "Who is ninth?", correct: "D" },
  { id: 4, text: "Who is fifth?", correct: "H" },
  { id: 5, text: "Who is fourth?", correct: "I" },
  { id: 6, text: "Who is eleventh?", correct: "B" },
  { id: 7, text: "Who is seventh?", correct: "F" },
  { id: 8, text: "Who is tenth?", correct: "C" },
];

export default function WB_Unit6_Page36_QH() {
  const [answers, setAnswers] = useState({});
  const [draggedLetter, setDraggedLetter] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedLetters = Object.values(answers);

  const handleDragStart = (letter) => {
    if (showAns || usedLetters.includes(letter)) return;
    setDraggedLetter(letter);
  };

  const handleDrop = (questionId) => {
    if (showAns || !draggedLetter) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: draggedLetter,
    }));

    setDraggedLetter(null);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every((q) => answers[q.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score++;
      }
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
    setDraggedLetter(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (questionId) => {
    if (!checked) return false;
    return answers[questionId] !== QUESTIONS.find((q) => q.id === questionId).correct;
  };

  const renderDropBox = (questionId) => {
    const value = answers[questionId];

    return (
      <span
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(questionId)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "70px",
          height: "34px",
          marginLeft: "10px",
          borderBottom: "2px dashed #7f7f7f",
          backgroundColor: value ? "#fff7ed" : "transparent",
          color: value ? "#dc2626" : "#9ca3af",
          fontWeight: "700",
          fontSize: "24px",
          lineHeight: "1",
          textAlign: "center",
        }}
      >
        {value || ""}
      </span>
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
          <span className="WB-ex-A">H</span>
          Read and write the answers.
        </h1>

        {/* صورة السباق */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={raceImg}
            alt="race"
            style={{
              width: "100%",
              maxWidth: "900px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* بنك الحروف */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "4px",
          }}
        >
          {LETTERS.map((letter) => {
            const disabled = usedLetters.includes(letter);

            return (
              <div
                key={letter}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(letter)}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "700",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* الأسئلة */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px 40px",
            marginTop: "4px",
          }}
        >
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: "26px",
                color: "#333",
                paddingLeft: "24px",
                minHeight: "42px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "2px",
                  fontWeight: "700",
                  fontSize: "24px",
                }}
              >
                {q.id}
              </span>

              <span>{q.text}</span>
              {renderDropBox(q.id)}

              {isWrong(q.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
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
            marginTop: "8px",
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