import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const CIRCLE_COLOR = "#ef4444";

const QUESTIONS = [
  {
    id: 1,
    words: [
      { id: "1-1", text: "try",   correct: true  },
      { id: "1-2", text: "grumpy",correct: false },
      { id: "1-3", text: "fry",   correct: true  },
      { id: "1-4", text: "cry",   correct: true  },
    ],
  },
  {
    id: 2,
    words: [
      { id: "2-1", text: "sandy",  correct: true  },
      { id: "2-2", text: "hearty", correct: true  },
      { id: "2-3", text: "party",  correct: true  },
      { id: "2-4", text: "spy",    correct: false },
    ],
  },
];

export default function WB_YSound_PageC() {
  const [selected,    setSelected]    = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns,     setShowAns]     = useState(false);

  const toggleWord = (wordId) => {
    if (showAns) return;
    setSelected((prev) => ({ ...prev, [wordId]: !prev[wordId] }));
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    // تأكد إن الطالب اختار شي على الأقل
    const anySelected = QUESTIONS.every((q) =>
      q.words.some((w) => selected[w.id])
    );
    if (!anySelected) {
      ValidationAlert.info("Please circle some words first.");
      return;
    }

    let score = 0;
    let total = 0;

    QUESTIONS.forEach((q) => {
      q.words.forEach((w) => {
        total++;
        const isSelected = !!selected[w.id];
        if (isSelected === w.correct) score++;
      });
    });

    setShowResults(true);
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    QUESTIONS.forEach((q) => {
      q.words.forEach((w) => { filled[w.id] = w.correct; });
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

  const getWordStyle = (word) => {
    const isSelected = !!selected[word.id];

    // بعد الفحص
    if (showResults) {
      const isCorrect = isSelected === word.correct;
      if (isSelected && isCorrect)  return { circled: true,  color: CIRCLE_COLOR, borderColor: CIRCLE_COLOR };
      if (isSelected && !isCorrect) return { circled: true,  color: WRONG_COLOR,  borderColor: WRONG_COLOR  };
      if (!isSelected && word.correct) return { circled: false, color: WRONG_COLOR, borderColor: "transparent", underline: true };
      return { circled: false, color: "#111", borderColor: "transparent" };
    }

    // قبل الفحص
    if (isSelected) return { circled: true, color: CIRCLE_COLOR, borderColor: CIRCLE_COLOR };
    return { circled: false, color: "#111", borderColor: "transparent" };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "clamp(20px,3vw,36px)",
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
          <span className="WB-ex-A">C</span>
          Which words have the same{" "}
          <strong style={{ fontWeight: 900 }}>-y sound</strong>?
          Listen and circle.
        </h1>

        {/* Questions */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           "clamp(28px,4vw,50px)",
            width:         "100%",
          }}
        >
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                display:    "flex",
                alignItems: "center",
                gap:        "clamp(16px,2.5vw,32px)",
                width:      "100%",
                flexWrap:   "wrap",
              }}
            >
              {/* number */}
              <span
                style={{
                  fontSize:   "clamp(18px,2.2vw,32px)",
                  fontWeight: 700,
                  color:      "#111",
                  lineHeight: 1,
                  minWidth:   "clamp(18px,2.2vw,32px)",
                  flexShrink: 0,
                }}
              >
                {q.id}
              </span>

              {/* words */}
              <div
                style={{
                  display:        "flex",
                  alignItems:     "center",
                  gap:            "clamp(20px,4vw,60px)",
                  flex:           1,
                  flexWrap:       "wrap",
                  justifyContent: "space-around",
                }}
              >
                {q.words.map((word) => {
                  const ws = getWordStyle(word);
                  return (
                    <div
                      key={word.id}
                      onClick={() => toggleWord(word.id)}
                      style={{
                        position:      "relative",
                        padding:       "clamp(6px,0.9vw,12px) clamp(18px,2.8vw,38px)",
                        borderRadius:  "999px",
                        border:        `2.5px solid ${ws.borderColor}`,
                        color:         ws.color,
                        fontSize:      "clamp(16px,2.2vw,30px)",
                        fontWeight:    600,
                        cursor:        showAns ? "default" : "pointer",
                        userSelect:    "none",
                        transition:    "border-color 0.18s ease, color 0.18s ease",
                        textDecoration: ws.underline ? "underline" : "none",
                        textDecorationColor: WRONG_COLOR,
                        whiteSpace:    "nowrap",
                      }}
                    >
                      {word.text}

                      {/* wrong badge — إذا اختار غلط */}
                      {showResults && selected[word.id] && word.correct === false && (
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
                            boxShadow:       "0 1px 4px rgba(0,0,0,0.2)",
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
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