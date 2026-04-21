import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 32/A.6.svg";

const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR  = "#ef4444";
const CHECK_COLOR  = "#16a34a";

const ITEMS = [
  { id: 1, img: img1, correct: true  },
  { id: 2, img: img2, correct: false },
  { id: 3, img: img3, correct: true  },
  { id: 4, img: img4, correct: false },
  { id: 5, img: img5, correct: false },
  { id: 6, img: img6, correct: true  },
];

export default function WB_YSound_PageA() {
  const [answers,     setAnswers]     = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  // كليك على الكارد — يبدّل بين ✓ و ✕ و فاضي
  const handleCardClick = (id) => {
    if (showAns) return;
    setAnswers((prev) => {
      if (prev[id] === undefined) return { ...prev, [id]: true  };  // أول كليك → ✓
      if (prev[id] === true)      return { ...prev, [id]: false };  // تاني كليك → ✕
      const upd = { ...prev }; delete upd[id]; return upd;          // تالت كليك → فاضي
    });
    setShowResults(false);
  };

  // كليك على بوكس الـ ✓/✕ مباشرة
  const handleBoxClick = (e, id, value) => {
    e.stopPropagation();
    if (showAns) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = ITEMS.every((i) => answers[i.id] !== undefined);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => { if (answers[i.id] === i.correct) score++; });
    setShowResults(true);
    const total = ITEMS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => { filled[i.id] = i.correct; });
    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  const getCardBorder = (item) => {
    if (!showResults) return `2px solid ${BORDER_COLOR}`;
    if (showAns)      return `2px solid ${BORDER_COLOR}`;
    return answers[item.id] === item.correct
      ? `2px solid ${BORDER_COLOR}`
      : `2.5px solid ${WRONG_COLOR}`;
  };

  // لون رمز الـ ✓/✕ داخل البوكس
  const getSymbolColor = (item, value) => {
    if (!showResults) return value ? CHECK_COLOR : WRONG_COLOR;
    if (answers[item.id] === value) {
      return answers[item.id] === item.correct ? CHECK_COLOR : WRONG_COLOR;
    }
    return value ? CHECK_COLOR : WRONG_COLOR;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "18px",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin:     0,
            display:    "flex",
            alignItems: "center",
            gap:        "12px",
            flexWrap:   "wrap",
          }}
        >
          <span className="WB-ex-A">A</span>
          Does it have a <strong style={{ fontWeight: 900 }}>-y sound</strong>? Write ✓ or ✕.
        </h1>

        {/* Cards grid */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(6, minmax(0,1fr))",
            gap:                 "clamp(8px,1.2vw,16px)",
            width:               "100%",
          }}
        >
          {ITEMS.map((item) => {
            const answered = answers[item.id] !== undefined;
            const wrong    = isWrong(item);

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                style={{
                  position:     "relative",
                  width:        "100%",
                  aspectRatio:  "1 / 1",
                  border:       getCardBorder(item),
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  background:   "#fff",
                  overflow:     "visible",
                  boxSizing:    "border-box",
                  boxShadow:    "0 2px 8px rgba(0,0,0,0.07)",
                  cursor:       showAns ? "default" : "pointer",
                  userSelect:   "none",
                }}
              >
                {/* inner clip */}
                <div
                  style={{
                    position:     "absolute",
                    inset:        0,
                    borderRadius: "clamp(10px,1.2vw,16px)",
                    overflow:     "hidden",
                  }}
                >
                  {/* Number badge — top left */}
                  <div
                    style={{
                      position:       "absolute",
                      top:            "clamp(4px,0.7vw,8px)",
                      left:           "clamp(4px,0.7vw,8px)",
                      width:          "clamp(20px,2.8vw,36px)",
                      height:         "clamp(20px,2.8vw,36px)",
                      borderRadius:   "clamp(5px,0.6vw,8px)",
                      border:         `2px solid ${BORDER_COLOR}`,
                      background:     "#fff",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      fontSize:       "clamp(11px,1.5vw,20px)",
                      fontWeight:     700,
                      color:          "#111",
                      zIndex:         2,
                      boxSizing:      "border-box",
                    }}
                  >
                    {item.id}
                  </div>

                  {/* Image */}
                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width:         "100%",
                      height:        "100%",
                      objectFit:     "contain",
                      display:       "block",
                      padding:       "clamp(10px,1.6vw,20px)",
                      boxSizing:     "border-box",
                      userSelect:    "none",
                      pointerEvents: "none",
                    }}
                  />

                  {/* ── ✓ box — bottom right ── */}
                  <div
                    onClick={(e) => handleBoxClick(e, item.id, true)}
                    style={{
                      position:       "absolute",
                      bottom:         0,
                      right:          0,
                      width:          "clamp(28px,4vw,52px)",
                      height:         "clamp(28px,4vw,52px)",
                      borderTop:      `2px solid ${BORDER_COLOR}`,
                      borderLeft:     `2px solid ${BORDER_COLOR}`,
                      borderBottomRightRadius: "clamp(10px,1.2vw,16px)",
                      background:     answers[item.id] === true
                        ? "rgba(22,163,74,0.08)"
                        : "#fff",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      cursor:         showAns ? "default" : "pointer",
                      zIndex:         3,
                      transition:     "background 0.15s",
                    }}
                  >
                    {answers[item.id] === true && (
                      <span
                        style={{
                          fontSize:   "clamp(16px,2.8vw,38px)",
                          fontWeight: 900,
                          color:      showResults
                            ? (item.correct ? CHECK_COLOR : WRONG_COLOR)
                            : CHECK_COLOR,
                          lineHeight: 1,
                          userSelect: "none",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  {/* ── ✕ box — جنب ✓ box (للخيار الثاني) ── */}
                  {/* نحن ما عندنا بوكسين — بس بوكس وحد يعرض الاختيار */}
                  {answers[item.id] === false && (
                    <div
                      onClick={(e) => handleBoxClick(e, item.id, false)}
                      style={{
                        position:       "absolute",
                        bottom:         0,
                        right:          0,
                        width:          "clamp(28px,4vw,52px)",
                        height:         "clamp(28px,4vw,52px)",
                        borderTop:      `2px solid ${BORDER_COLOR}`,
                        borderLeft:     `2px solid ${BORDER_COLOR}`,
                        borderBottomRightRadius: "clamp(10px,1.2vw,16px)",
                        background:     "rgba(239,68,68,0.06)",
                        display:        "flex",
                        alignItems:     "center",
                        justifyContent: "center",
                        cursor:         showAns ? "default" : "pointer",
                        zIndex:         3,
                      }}
                    >
                      <span
                        style={{
                          fontSize:   "clamp(16px,2.8vw,38px)",
                          fontWeight: 900,
                          color:      showResults
                            ? (!item.correct ? CHECK_COLOR : WRONG_COLOR)
                            : WRONG_COLOR,
                          lineHeight: 1,
                          userSelect: "none",
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  )}
                </div>

                {/* Wrong badge — خارج الـ clip */}
                {wrong && (
                  <div
                    style={{
                      position:        "absolute",
                      top:             "-8px",
                      right:           "-8px",
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
                      boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
                      zIndex:          5,
                      pointerEvents:   "none",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(6px,1vw,12px)",
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