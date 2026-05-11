import React, { useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import houseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/1.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const LINE_COLOR = "#333";

const ITEMS = [
  {
    id: 1,
    example: true,
    question: "Can you see Hansel?",
    answer: "Yes, I can see him by the tree.",
  },
  {
    id: 2,
    example: false,
    question: "Can you see the cat?",
    choices: [
      "Yes, I can see it in the kitchen.",
      "Yes, I can see it in the bedroom.",
    ],
    correct: "Yes, I can see it in the kitchen.",
  },
  {
    id: 3,
    example: false,
    question: "Can you see Dad?",
    choices: [
      "Yes, I can see him near the bed in the bedroom.",
      "Yes, I can see him in the kitchen.",
    ],
    correct: "Yes, I can see him near the bed in the bedroom.",
  },
  {
    id: 4,
    example: false,
    question: "Can you see Mom?",
    choices: [
      "Yes, I can see her in front of the washing machine in the basement.",
      "Yes, I can see her in the bedroom.",
    ],
    correct:
      "Yes, I can see her in front of the washing machine in the basement.",
  },
];

export default function SB_LookAndAnswer_PageA() {
  const [answers, setAnswers] = useState({});
  const [openId, setOpenId] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  // إغلاق عند الضغط خارج
  useEffect(() => {
    const close = () => setOpenId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleSelect = (id, value) => {
    if (showAns || showResults) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setOpenId(null);
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const editables = ITEMS.filter((i) => !i.example);
    const allAnswered = editables.every((i) => answers[i.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    editables.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });

    setShowResults(true);

    const total = editables.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.example).forEach((i) => {
      filled[i.id] = i.correct;
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setOpenId(null);
  };

  const isWrong = (item) =>
    showResults && !showAns && answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div className="div-forall">
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span> Look and answer the questions.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "30px",
          }}
        >
          {/* الصورة */}
          <div>
            <img src={houseImg} style={{ width: "100%", height: "auto" }} />
          </div>

          {/* الأسئلة */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {ITEMS.map((item) => (
              <div key={item.id}>
                <div style={{ fontSize: "18px" }}>
                  {item.id}. {item.question}
                </div>

                {item.example ? (
                  <div
                    style={{
                      fontSize: "18px",
                      borderBottom: `1px solid ${LINE_COLOR}`,
                      paddingBottom: "5px",
                    }}
                  >
                    {item.answer}
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    {/* Selected */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        !showAns &&
                          setOpenId(openId === item.id ? null : item.id);
                      }}
                      style={{
                        borderBottom:isWrong(item) ? `2px solid ${
                           WRONG_COLOR}` : `1px solid ${
                           LINE_COLOR}`
                        ,
                        padding: "6px 28px 6px 4px",
                        cursor: showAns||showResults ? "default" : "pointer",
                        fontSize: "17px",
                        height: "30px",
                        background: "#fff",
                        position: "relative",
                      }}
                    >
                      {answers[item.id] || ""}

                      <span
                        style={{
                          position: "absolute",
                          right: "6px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "10px",
                          color: "#666",
                        }}
                      >
                        ▼
                      </span>
                    </div>

                    {/* Dropdown */}
                    {openId === item.id && !showResults && !showAns && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          width: "100%",
                          background: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          marginTop: "2px",
                          zIndex: 9999,
                          maxHeight: "180px",
                          overflowY: "auto",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                      >
                        {item.choices.map((choice) => {
                          const isSelected = answers[item.id] === choice;

                          return (
                            <div
                              key={choice}
                              onClick={() => handleSelect(item.id, choice)}
                              style={{
                                padding: "8px 10px",
                                fontSize: "18px",
                                cursor: "pointer",
                                backgroundColor: isSelected
                                  ? "#e6f0ff"
                                  : "#fff",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#f1f1f1";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  isSelected ? "#e6f0ff" : "#fff";
                              }}
                            >
                              {choice}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Wrong icon */}
                    {isWrong(item) && (
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
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
        />
      </div>
    </div>
  );
}
