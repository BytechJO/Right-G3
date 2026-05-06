import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import sceneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/1.svg";

const WRONG_COLOR = "red";
const LINE_COLOR = "#000000ff";
const OPTIONS = ["me", "you", "it"];

// ✅ مواقع العناصر فوق الصورة (عدليهم حسب التصميم)
const ITEMS = [
  { id: 1, correct: "me", position: { top: "9%", left: "47%" } },
  { id: 2, correct: "you", position: { top: "33%", left: "55%" } },
  { id: 3, correct: "you", position: { top: "56%", left: "51%" } },
  { id: 4, correct: "me", position: { top: "80%", left: "57%" } },
];

export default function SB_LookReadWrite_PageI() {
  const [selected, setSelected] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
    if (showAns || showResults) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = ITEMS.every((i) => selected[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((i) => {
      if (selected[i.id] === i.correct) score++;
    });

    setShowResults(true);

    const total = ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = i.correct;
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

  const isWrong = (item) =>
    showResults && !showAns && selected[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">I</span> Look, read, and write{" "}
          <strong className="text-blue-900">me</strong>,{" "}
          <strong className="text-blue-900">you</strong>, or{" "}
          <strong className="text-blue-900">it</strong>.
        </h1>

        {/* 🖼️ الصورة + dropdowns */}
        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={sceneImg}
            alt="scene"
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  top: item.position.top,
                  left: item.position.left,
                  transform: "translate(-50%, -50%)",
                  width: "clamp(70px, 7vw, 140px)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderBottom: wrong
                      ? `2px solid ${WRONG_COLOR}`
                      : `1px solid black`,
                  }}
                >
                  <select
                    value={selected[item.id] || ""}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    disabled={showAns || showResults}
                    style={{
                      width: "100%",
                      // border: "none",
                      // borderBottom: wrong
                      //   ? `2px solid ${WRONG_COLOR}`
                      //   : `1px solid black`,
                      // background: "#fff",
                      fontSize: "clamp(12px,1.5vw,18px)",
                      // fontWeight: 700,
                      padding: "4px",
                      // outline: "none",
                      // borderRadius: "6px",
                      cursor: showAns || showResults ? "default" : "pointer",
                    }}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* ❌ wrong icon */}
                  {wrong && (
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
        <div style={{ display: "flex", justifyContent: "center" }}>
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
