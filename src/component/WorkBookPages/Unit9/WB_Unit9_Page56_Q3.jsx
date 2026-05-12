import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/4.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const SELECT_COLOR = "#f39b42";
const CARD_BORDER = "#a3a3a3";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, img: img1, options: ["dogs", "ducks"], correct: "dogs" },
  { id: 2, img: img2, options: ["bees", "beets"], correct: "bees" },
  { id: 3, img: img3, options: ["bags", "bats"], correct: "bats" },
  { id: 4, img: img4, options: ["cups", "cubs"], correct: "cups" },
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -8,
      right: -8,
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      backgroundColor: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
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

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit9_Page56_QC() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  // ── handlers ──
  const handleSelect = (id, value) => {
    if (showAns||checked) return;
    setChecked(false);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns||checked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) correct++;
    });
    setChecked(true);
    const total = ITEMS.length;
    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
       else if (correct >0)
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    else ValidationAlert.error(`Score: ${correct} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });
    setAnswers(correctMap);
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) =>
    checked && answers[id] !== ITEMS.find((item) => item.id === id)?.correct;

  // ── ستايل زر الاختيار ──
  const optionStyle = (itemId, option) => {
    const selected = answers[itemId] === option;
    const wrong = isWrong(itemId) && selected;

    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      // fontWeight:      selected ? 500 : 300,
      // color:           wrong ? WRONG_COLOR : selected ? SELECT_COLOR : "#555",
      cursor: showAns ? "default" : "pointer",
      border: selected
        ? `1px solid ${wrong ? WRONG_COLOR : SELECT_COLOR}`
        : "1px solid transparent",
      borderRadius: "999px",
      backgroundColor: "transparent",
      transition: "all 0.15s ease",
      boxSizing: "border-box",
      padding: "clamp(6px,0.8vw,12px)",
    };
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "120px" }}>
        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span> Look, read, and circle. Say.
        </h1>

        {/* ── البطاقات 4 في صف ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0,1fr))",
            gap: "clamp(14px,2vw,26px)",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item.id);

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  // flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "clamp(6px,0.8vw,10px)",
                  width: "100%",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                    alignSelf: "flex-start",
                    paddingLeft: "4px",
                  }}
                >
                  {item.id}
                </span>

                {/* البطاقة */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    border: `1.5px solid ${CARD_BORDER}`,
                    borderRadius: "clamp(14px,1.8vw,24px)",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding:
                      "clamp(10px,1.2vw,16px) clamp(8px,1vw,14px) clamp(14px,1.6vw,20px)",
                    boxSizing: "border-box",
                    gap: "clamp(8px,1vw,14px)",
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* الصورة */}
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width: "100%",
                      height: "clamp(120px,15vw,180px)",
                      objectFit: "contain",
                      display: "block",
                      userSelect: "none",
                    }}
                  />

                  {/* خيارات الاختيار */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "clamp(4px,0.6vw,10px)",
                    }}
                  >
                    {item.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.id, option)}
                        style={optionStyle(item.id, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* بادج الخطأ */}
                  {wrong && <ErrorBadge />}
                </div>
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
