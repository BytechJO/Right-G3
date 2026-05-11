import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd12pg56instruction2-adult-lady_tx74LOXb.mp3";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const SYMBOL_COLOR = "#e32626";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, correct: true },
  { id: 2, correct: false },
  { id: 3, correct: true },
  { id: 4, correct: false },
  { id: 5, correct: true },
  { id: 6, correct: false },
];
const captions = [
  { start: 0.36, end: 4.58, text: "Page 56. Phonics. Exercise D." },
  { start: 4.58, end: 7.96, text: "Do they both have the same S sound?" },
  { start: 7.96, end: 11.62, text: "Listen and write check or X." },
  { start: 13.56, end: 16.58, text: "1- please, trees." },
  { start: 17.68, end: 20.64, text: "2- boxes, socks." },
  { start: 21.7, end: 24.94, text: "3- ropes, boats." },
  { start: 26.18, end: 29.54, text: "4- noses, caps." },
  { start: 29.54, end: 34.1, text: "5- stones, bones." },
  { start: 34.1, end: 38.1, text: "6- bats, cubs." },
];
// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -8,
      right: -10,
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
export default function Phonics_Page56_QD() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  // ── Toggle: undefined → true → false → undefined ──
  const handleSelect = (id, value) => {
    if (showAns || checked) return;

    setChecked(false);

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns || checked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);
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
    if (correct === ITEMS.length) {
      ValidationAlert.success(`Score: ${correct} / ${ITEMS.length}`);
    } else if (correct > 0) {
      ValidationAlert.warning(`Score: ${correct} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${correct} / ${ITEMS.length}`);
    }
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

  const isWrong = (item) =>
    checked &&
    answers[item.id] !== undefined &&
    answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div className="div-forall" >
        {/* ── العنوان ── */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span> Do they both have the same{" "}
          <strong className="text-blue-900"> -s sound</strong>? Listen and write{" "}
          <strong className="text-red-600">✓</strong> or{" "}
          <strong className="text-red-600">✕</strong>.
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={11.62}
          />
        </div>

        {/* ── الصناديق ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "clamp(24px,5vw,70px)",
            marginTop: "8px",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "clamp(8px,1.2vw,14px)",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#222",
                  }}
                >
                  {item.id}
                </span>

                {/* الصندوق */}
                {/* مربعات الاختيار */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  {/* مربع الصح */}
                  <div
                    onClick={() => handleSelect(item.id, true)}
                    style={{
                      width: "45px",
                      height: "45px",
                      border: `1px solid ${
                        answers[item.id] === true
                          ? wrong
                            ? WRONG_COLOR
                            : "#f39b42"
                          : "#ababab"
                      }`,
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: showAns ? "default" : "pointer",
                      transition: "0.2s",
                      position: "relative",
                    }}
                  >
                    {answers[item.id] === true && (
                      <img src={trueIcon} style={{ height: "25px" }} />
                    )}

                    {/* الاكس فوق المربع المختار */}
                    {wrong && answers[item.id] === true && <ErrorBadge />}
                  </div>

                  {/* مربع الغلط */}
                  <div
                    onClick={() => handleSelect(item.id, false)}
                    style={{
                      width: "45px",
                      height: "45px",
                      border: `1px solid ${
                        answers[item.id] === false
                          ? wrong
                            ? WRONG_COLOR
                            : "#f39b42"
                          : "#ababab"
                      }`,
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: showAns || checked ? "default" : "pointer",
                      transition: "0.2s",
                      position: "relative",
                    }}
                  >
                    {answers[item.id] === false && (
                      <img src={falseIcon} style={{ height: "25px" }} />
                    )}

                    {/* الاكس فوق المربع المختار */}
                    {wrong && answers[item.id] === false && <ErrorBadge />}
                  </div>
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
