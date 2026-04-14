import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import stellaImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/1.svg";

import take1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/2.svg";
import take2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/3.svg";
import take3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/4.svg";
import take4 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/5.svg";

import notTake1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/6.svg";
import notTake2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/7.svg";
import notTake3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/8.svg";
import notTake4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/9.svg";

const QUESTIONS = [
  {
    id: 1,
    text: "Will Stella take her bag on the trip tomorrow?",
    correct: "Yes, she will.",
  },
  {
    id: 2,
    text: "Will she take her red skirt on the trip?",
    correct: "No, she won’t.",
  },
  {
    id: 3,
    text: "Will she take an umbrella?",
    correct: "Yes, she will.",
  },
  {
    id: 4,
    text: "Will she take her shoes?",
    correct: "Yes, she will.",
  },
  {
    id: 5,
    text: "Will she take her lunchbox?",
    correct: "Yes, she will.",
  },
  {
    id: 6,
    text: "Will she take her green shirt?",
    correct: "No, she won’t.",
  },
];

const ANSWER_OPTIONS = ["Yes, she will.", "No, she won’t."];

const takeImages = [take1, take2, take3, take4];
const notTakeImages = [notTake1, notTake2, notTake3, notTake4];

export default function WB_Unit8_Page59_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (questionId, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    if (checked) {
      setChecked(false);
    }
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every((q) => answers[q.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === QUESTIONS.length) {
      ValidationAlert.success(`Score: ${score} / ${QUESTIONS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${QUESTIONS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${QUESTIONS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const solved = {};
    QUESTIONS.forEach((q) => {
      solved[q.id] = q.correct;
    });

    setAnswers(solved);
    setChecked(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (question) => {
    if (!checked) return false;
    return answers[question.id] !== question.correct;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          width: "100%",
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">E</span>
          Read, look, and write.
        </h1>

        {/* top answer boxes */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "130px",
            flexWrap: "wrap",
            marginBottom: "2px",
          }}
        >
          {ANSWER_OPTIONS.map((option) => (
            <div
              key={option}
              style={{
                minWidth: "200px",
                height: "60px",
                border: "3px solid #a3a3a3",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                color: "#222",
                backgroundColor: "#fff",
                padding: "0 18px",
                boxSizing: "border-box",
              }}
            >
              {option}
            </div>
          ))}
        </div>

        {/* title */}
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "#222",
            textDecoration: "underline",
            marginBottom: "2px",
          }}
        >
          Trip to the Grand Canyon
        </div>

        {/* top layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "170px 1fr 1fr",
            gap: "20px",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          {/* Stella */}
          <div
            style={{
              width: "165px",
              height: "165px",
              border: "3px solid #a3a3a3",
              borderRadius: "16px",
              overflow: "hidden",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={stellaImg}
              alt="Stella"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Things to Take */}
          <div
            style={{
              border: "3px solid #a3a3a3",
              borderRadius: "16px",
              padding: "10px 12px",
              backgroundColor: "#fff",
              minHeight: "165px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "22px",
                color: "#222",
                textDecoration: "underline",
                marginBottom: "10px",
              }}
            >
              Things to Take
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              {takeImages.map((img, index) => (
                <div
                  key={index}
                  style={{
                    width: "72px",
                    height: "72px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={img}
                    alt={`take-${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Things Not to Take */}
          <div
            style={{
              border: "3px solid #a3a3a3",
              borderRadius: "16px",
              padding: "10px 12px",
              backgroundColor: "#fff",
              minHeight: "165px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "22px",
                color: "#222",
                textDecoration: "underline",
                marginBottom: "10px",
              }}
            >
              Things Not to Take
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "10px",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              {notTakeImages.map((img, index) => (
                <div
                  key={index}
                  style={{
                    width: "72px",
                    height: "72px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={img}
                    alt={`not-take-${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            maxWidth: "940px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {QUESTIONS.map((question) => (
            <div
              key={question.id}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 520px",
                gap: "18px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#111",
                    minWidth: "18px",
                    lineHeight: "1.4",
                  }}
                >
                  {question.id}
                </span>

                <span
                  style={{
                    fontSize: "21px",
                    color: "#222",
                    lineHeight: "1.4",
                  }}
                >
                  {question.text}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexShrink: 0,
                  }}
                >
                  {ANSWER_OPTIONS.map((option) => {
                    const active = answers[question.id] === option;

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(question.id, option)}
                        style={{
                          padding: "8px 12px",
                          borderRadius: "10px",
                          border: active
                            ? "2px solid #3b82f6"
                            : "2px solid #d1d5db",
                          backgroundColor: active ? "#eff6ff" : "#fff",
                          color: active ? "#1d4ed8" : "#444",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: showAns ? "default" : "pointer",
                          whiteSpace: "nowrap",
                          marginBottom:"20px"
                        }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    flex: 1,
                    minHeight: "38px",
                    borderBottom: "2px solid #7f7f7f",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "22px",
                    color: answers[question.id] ? "#dc2626" : "#999",
                    lineHeight: "1.3",
                    paddingBottom: "2px",
                  }}
                >
                  {answers[question.id] || ""}
                </div>
              </div>

              {isWrong(question) && (
                <div
                  style={{
                    position: "absolute",
                    right: "-10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}