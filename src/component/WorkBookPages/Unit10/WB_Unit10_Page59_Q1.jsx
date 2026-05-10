import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import stellaImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/1.svg";

const WRONG_COLOR = "red";
const ACTIVE_COLOR = "#f39b42";
const RED_COLOR = "#000000ff";
const LINE_COLOR = "#333";

const QUESTIONS = [
  {
    id: 1,
    text: "Will Stella take her bag on the trip tomorrow?",
    correct: "Yes, she will.",
  },
  {
    id: 2,
    text: "Will she take her red skirt on the trip?",
    correct: "No, she won't.",
  },
  { id: 3, text: "Will she take an umbrella?", correct: "Yes, she will." },
  { id: 4, text: "Will she take her shoes?", correct: "Yes, she will." },
  { id: 5, text: "Will she take her lunchbox?", correct: "Yes, she will." },
  { id: 6, text: "Will she take her green shirt?", correct: "No, she won't." },
];

const ANSWER_OPTIONS = ["Yes, she will.", "No, she won't."];

export default function WB_Unit8_Page59_QE() {
  const [selected, setSelected] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns||showResults) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns||showResults) return;
    const allAnswered = QUESTIONS.every((q) => selected[q.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selected[q.id] === q.correct) score++;
    });
    setShowResults(true);
    const total = QUESTIONS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    QUESTIONS.forEach((q) => {
      filled[q.id] = q.correct;
    });
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (q) =>
    showResults && !showAns && selected[q.id] !== q.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px,2vw,22px)",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">E</span> Read, look, and write.
        </h1>

        {/* ── Top layout: Stella | Take | Not Take ── */}

        {/* Stella */}

        <img
          src={stellaImg}
          alt="Stella"
          style={{
            width: "80%",
            height: "auto",
            display: "block",
            userSelect: "none",
          }}
        />

        {/* ── Questions with dropdown ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
          }}
        >
          {QUESTIONS.map((q) => {
            const wrong = isWrong(q);
            return (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px,1.2vw,16px)",
                  minWidth: 0,
                  flexWrap: "wrap",
                }}
              >
                {/* number */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "clamp(14px,1.8vw,22px)",
                  }}
                >
                  {q.id}
                </span>

                {/* question text */}
                <span
                  style={{
                    fontSize: "18px",
                    // fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.35,
                    // flex:      1,
                    width: "400px",
                    wordBreak: "break-word",
                  }}
                >
                  {q.text}
                </span>

                {/* dropdown */}
                <div
                  style={{
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <select
                    disabled={showAns||showResults}
                    value={selected[q.id] || ""}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                    style={{
                      minWidth: "clamp(140px,20vw,240px)",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderBottom: wrong
                        ? `2px solid ${WRONG_COLOR}`
                        : `1px solid ${LINE_COLOR}`,
                      borderRadius: 0,
                      outline: "none",
                      fontSize: "18px",
                      // fontWeight:   600,
                      color: RED_COLOR,
                      padding: "0 clamp(4px,0.6vw,8px) 4px 2px",
                      background: "transparent",
                      cursor: showAns ? "default" : "pointer",
                      appearance: "auto",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="" disabled hidden></option>
                    {ANSWER_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* wrong badge — يسار أعلى */}
                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "700",
                        border: "2px solid white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                        zIndex: 5,
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
