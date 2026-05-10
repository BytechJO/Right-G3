import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/8.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const BORDER_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Is the teacher at the library?",
    correct: "No, he isn't.",
  },
  {
    id: 2,
    img: img2,
    question: "Are the kids in the taxi?",
    correct: "No, they aren't.",
  },
  {
    id: 3,
    img: img3,
    question: "Are Hansel and Helen at the zoo?",
    correct: "Yes, they are.",
  },
  {
    id: 4,
    img: img4,
    question: "Is Hansel in the living room?",
    correct: "Yes, he is.",
  },
];

const OPTIONS = [
  "No, he isn't.",
  "No, they aren't.",
  "Yes, they are.",
  "Yes, he is.",
];

// ── Error Badge ────────────────────────────────────────────────
const ErrorBadge = () => (
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
);

// ── Main Component ─────────────────────────────────────────────
export default function WB_Unit8_Page55_QJ() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  // ── Select Answer ───────────────────────────────────────────
  const handleSelect = (id, value) => {
    if (showAns||checked) return;

    setChecked(false);

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ── Check ───────────────────────────────────────────────────
  const handleCheck = () => {
    if (showAns||checked) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first! ✏️");
      return;
    }

    let correct = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        correct++;
      }
    });

    setChecked(true);

    const total = ITEMS.length;

    if (correct === total) {
      ValidationAlert.success(`Excellent! ${correct} / ${total}`);
    } else if (correct > 0) {
      ValidationAlert.warning(`${correct} / ${total} correct`);
    } else {
      ValidationAlert.error(`${correct} / ${total} correct`);
    }
  };

  // ── Show Answers ────────────────────────────────────────────
  const handleShowAnswer = () => {
    const correctMap = {};

    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setChecked(false);
    setShowAns(true);
  };

  // ── Reset ───────────────────────────────────────────────────
  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  // ── Wrong Check ─────────────────────────────────────────────
  const isWrong = (item) => checked && answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "20px",
        }}
      >
        {/* ── Title ───────────────────────────────────────── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">J</span>
          Read, look, and choose.
        </h1>

        {/* ── Questions ───────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(20px,3vw,36px) clamp(16px,3vw,46px)",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* السؤال */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#111",
                      lineHeight: 1,
                    }}
                  >
                    {item.id}
                  </span>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      lineHeight: 1.5,
                      color: "#222",
                      // fontWeight: 500,
                    }}
                  >
                    {item.question}
                  </p>
                </div>

                {/* الصورة */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`question-${item.id}`}
                    style={{
                      width: "60%",
                      height: "auto",

                      display: "block",
                    }}
                  />

   
                </div>

                {/* Select */}
                <div
                  style={{
                    position: "relative",
                    width: "60%",
                  }}
                >
                  <select
                    value={answers[item.id] || ""}
                    onChange={(e) => handleSelect(item.id, e.target.value)}
                    disabled={showAns||checked}
                    style={{
                      width: "100%",
                      // minHeight: "48px",
                      padding: "10px 40px 10px 14px",
                      // borderRadius: "10px",
                      borderBottom: wrong
                        ? `2px solid ${WRONG_COLOR}`
                        : `2px solid ${BORDER_COLOR}`,
                      backgroundColor: "#fff",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "#222",
                      outline: "none",
                      cursor: showAns||checked ? "default" : "pointer",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      transition: "0.2s ease",
                    }}
                  >
                    <option value="">-- Choose answer --</option>

                    {OPTIONS.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {/* سهم */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "14px",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    ▼
                  </div>

                  {/* X فوق الانبوت */}
                 {wrong && (
  <div
    style={{
      position: "absolute",
      top: "10px",
      right: "0px",
      zIndex: 10,
    }}
  >
    <ErrorBadge />
  </div>
)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
