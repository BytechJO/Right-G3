import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex I  1.svg";

const QUESTIONS = [
  {
    id: 1,
    question: "Does he have any grapes?",
    correct: "No, he hasn’t any.",
  },
  {
    id: 2,
    question: "Does he have any eggplants?",
    correct: "Yes, he has some.",
  },
  {
    id: 3,
    question: "Does he have any carrots?",
    correct: "No, he hasn’t any.",
  },
  {
    id: 4,
    question: "Does he have any apples?",
    correct: "Yes, he has some.",
  },
];

const OPTIONS = [
  "Yes, he has some.",
  "No, he hasn’t any.",
  "Yes, he has any.",
  "No, he has some.",
];

export default function WB_Unit3_Page17_QI() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelectChange = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [`a-${id}`]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every((item) => answers[`a-${item.id}`]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = QUESTIONS.length;

    QUESTIONS.forEach((item) => {
      if (answers[`a-${item.id}`] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};

    QUESTIONS.forEach((item) => {
      filledAnswers[`a-${item.id}`] = item.correct;
    });

    setAnswers(filledAnswers);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`] !== item.correct;
  };

  return (
   <div className="main-container-component">
      <div
        className="div-forall"
            style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
  
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A"> I </span> Read, look, and write.
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "2px solid #d9d9d9",
              borderRadius: "18px",
              padding: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              width: "100%",
              maxWidth: "620px",
            }}
          >
            <img
              src={exerciseImg}
              alt="exercise-i"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          {QUESTIONS.map((item, index) => {
            const value = answers[`a-${item.id}`] || "";

            return (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "46px 1fr 340px",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#222",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </div>

                <div
                  style={{
                    fontSize: "24px",
                    color: "#111",
                    lineHeight: "1.3",
                  }}
                >
                  {item.question}
                </div>

                <div style={{ position: "relative" }}>
                  <select
                    value={value}
                    disabled={showAns}
                    onChange={(e) =>
                      handleSelectChange(item.id, e.target.value)
                    }
                    style={{
                      width: "100%",
                      minHeight: "50px",
                      fontSize: "22px",
                      color: showAns
                        ? "#000000ff"
                        : value
                        ? "#000000ff"
                        : "#000000ff",
                      border: "none",
                      borderBottom: "2px solid #444",
                      outline: "none",
                      background: "transparent",
                      padding: "0 32px 4px 4px",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    <option value="" disabled>
                      Select answer
                    </option>
                    {OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {!showAns && (
                    <div
                      style={{
                        position: "absolute",
                        right: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        fontSize: "14px",
                        color: "#666",
                      }}
                    >
                      ▼
                    </div>
                  )}

                  {isWrong(item) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
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
                        border: "2px solid #fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4px",
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