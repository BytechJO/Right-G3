import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR  = "#ef4444";
const SYMBOL_COLOR = "#e32626";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, correct: true  },
  { id: 2, correct: false },
  { id: 3, correct: true  },
  { id: 4, correct: false },
  { id: 5, correct: true  },
  { id: 6, correct: false },
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position:        "absolute",
      top:             -8,
      right:           -10,
      width:           "clamp(16px,1.8vw,22px)",
      height:          "clamp(16px,1.8vw,22px)",
      borderRadius:    "50%",
      backgroundColor: WRONG_COLOR,
      color:           "#fff",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        "clamp(9px,0.9vw,12px)",
      fontWeight:      700,
      border:          "1.5px solid #fff",
      boxShadow:       "0 2px 6px rgba(0,0,0,0.2)",
      zIndex:          5,
      pointerEvents:   "none",
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function Phonics_Page56_QD() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  // ── Toggle: undefined → true → false → undefined ──
  const handleSelect = (id) => {
    if (showAns) return;
    setChecked(false);
    setAnswers((prev) => {
      const current = prev[id];
      const next    = current === undefined ? true : current === true ? false : undefined;
      const updated = { ...prev };
      if (next === undefined) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);
    if (!allAnswered) {
      ValidationAlert.error("Please answer all questions first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((item) => { if (answers[item.id] === item.correct) correct++; });
    setChecked(true);
    const total = ITEMS.length;
    if (correct === total) ValidationAlert.success("Excellent! All correct! 🎉");
    else                   ValidationAlert.error(`${correct} / ${total} correct. Try again! 💪`);
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => { correctMap[item.id] = item.correct; });
    setAnswers(correctMap);
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    checked && answers[item.id] !== undefined && answers[item.id] !== item.correct;

  // ── رسم الرمز داخل الصندوق ──
  const renderSymbol = (value) => {
    if (value === undefined) return null;
    return (
      <span
        style={{
          color:      SYMBOL_COLOR,
          fontSize:   "clamp(28px,4vw,46px)",
          fontWeight: 700,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {value ? "✓" : "✕"}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(20px,3vw,36px)" }}>

        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>{" "}
          Do they both have the same -s sound? Listen and write ✓ or ✕.
        </h1>

        {/* ── الصناديق ── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            flexWrap:       "wrap",
            gap:            "clamp(24px,5vw,70px)",
            marginTop:      "8px",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display:  "flex",
                  alignItems: "center",
                  gap:      "clamp(8px,1.2vw,14px)",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize:   "clamp(16px,2vw,22px)",
                    fontWeight: 700,
                    color:      "#222",
                    minWidth:   "clamp(14px,1.8vw,20px)",
                  }}
                >
                  {item.id}
                </span>

                {/* الصندوق */}
                <div
                  onClick={() => handleSelect(item.id)}
                  style={{
                    width:           "clamp(44px,6vw,58px)",
                    height:          "clamp(44px,6vw,58px)",
                    border:          `2px solid ${wrong ? WRONG_COLOR : "#ababab"}`,
                    borderRadius:    "clamp(6px,0.8vw,10px)",
                    backgroundColor: "#fff",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    cursor:          showAns ? "default" : "pointer",
                    boxSizing:       "border-box",
                    position:        "relative",
                    transition:      "border-color 0.2s",
                  }}
                >
                  {renderSymbol(answers[item.id])}
                </div>

                {/* بادج الخطأ */}
                {wrong && <ErrorBadge />}
              </div>
            );
          })}
        </div>

        {/* ── الأزرار ── */}
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