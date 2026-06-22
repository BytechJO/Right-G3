import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/4.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const SELECT_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    img: img1,
    subject: "She",
    modalOptions: ["will", "won't"],
    action: "do her homework.",
    correctModal: "will",
  },
  {
    id: 2,
    img: img2,
    subject: "He",
    modalOptions: ["will", "won't"],
    action: "plant a tree.",
    correctModal: "won't",
  },
  {
    id: 3,
    img: img3,
    subject: "They",
    modalOptions: ["will", "won't"],
    action: "eat at a restaurant.",
    correctModal: "will",
  },
  {
    id: 4,
    img: img4,
    subject: "She",
    modalOptions: ["will", "won't"],
    action: "go to the store.",
    correctModal: "won't",
  },
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -7,
      right: -7,
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

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page58_QD() {
  // answers[id] = "will" | "won't"
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns || checked) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isItemCorrect = (item) => answers[item.id] === item.correctModal;

  // ── هل هاد الخيار بالذات غلط؟ ──
  const isOptionWrong = (item, value) => {
    if (!checked || showAns) return false;
    return answers[item.id] === value && value !== item.correctModal;
  };

  // ── handlers ──
  const handleCheck = () => {
    if (showAns || checked) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((i) => {
      if (isItemCorrect(i)) correct++;
    });
    setChecked(true);
    const total = ITEMS.length;
    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    else if (correct > 0)
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    else ValidationAlert.error(`Score: ${correct} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = i.correctModal;
    });
    setAnswers(filled);
    setChecked(false);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  // ── رسم خيار واحد (will / won't) كدائرة ──
  const renderOption = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isOptionWrong(item, value);

    return (
      <div
        key={value}
        onClick={() => handleSelect(item.id, value)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(2px,0.4vw,4px) clamp(8px,1.2vw,14px)",
          cursor: showAns || checked ? "default" : "pointer",
          userSelect: "none",
          fontSize: "18px",
          lineHeight: 1.3,
          transition: "color 0.15s",
          whiteSpace: "nowrap",
        }}
      >
        {/* الدائرة — تظهر عند الاختيار */}
        {selected && (
          <div
            style={{
              position: "absolute",
              inset: "-2px -4px",
              border: wrong
                ? `1px solid ${WRONG_COLOR}`
                : `1px solid ${SELECT_COLOR}`,
              borderRadius: "999px",
              pointerEvents: "none",
              transition: "border-color 0.15s",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{value}</span>

        {/* بادج الخطأ على الدائرة */}
        {wrong && selected && <ErrorBadge />}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(18px,2.5vw,30px)" }}>
        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">G</span>Look, read, and tap or click. Speak.
        </h1>

        {/* ── شبكة 2×2 ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(20px,3.5vw,48px) clamp(20px,4vw,55px)",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px,1.4vw,16px)",
                minWidth: 0,
              }}
            >
              {/* رقم + صورة */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "clamp(8px,1vw,14px)",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                    flexShrink: 0,
                    minWidth: "clamp(14px,1.8vw,22px)",
                  }}
                >
                  {item.id}
                </span>

                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width: "auto",
                    height: "120px",
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* الجملة: subject | modal (قابل للاختيار) | action (نص ثابت) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(6px,0.8vw,12px)",
                  paddingLeft: "clamp(20px,2.5vw,32px)",
                  flexWrap: "wrap",
                }}
              >
                {/* subject */}
                <span
                  style={{
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "clamp(28px,4vw,42px)",
                    flexShrink: 0,
                  }}
                >
                  {item.subject}
                </span>

                {/* modal options — هون الاختيار الوحيد */}
                <div
                  style={{
                    borderLeft: "1.5px solid #222",
                    paddingLeft: "clamp(6px,0.8vw,12px)",
                    display: "flex",
                    height: "70px",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "clamp(2px,0.4vw,6px)",
                    flexShrink: 0,
                  }}
                >
                  {item.modalOptions.map((opt) => renderOption(item, opt))}
                </div>

                {/* action — نص ثابت بدون اختيار */}
                <span
                  style={{
                    fontSize: "18px",
                    color: "#222",
                    borderLeft: "1.5px solid #222",
                    lineHeight: "70px",
                    paddingLeft: "clamp(6px,0.8vw,12px)",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {item.action}
                </span>
              </div>
            </div>
          ))}
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