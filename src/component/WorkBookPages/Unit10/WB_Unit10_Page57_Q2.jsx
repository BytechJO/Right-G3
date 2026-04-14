import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const QUESTIONS = [
  { id: 1, text: "Will you go to school?" },
  { id: 2, text: "Will you go to the park?" },
  { id: 3, text: "Will you eat any cake?" },
  { id: 4, text: "Will you buy new clothes?" },
  { id: 5, text: "Will you play with your friends?" },
];

const ANSWER_OPTIONS = [
  { value: "Yes, I will.", label: "Yes, I will." },
  { value: "No, I won’t.", label: "No, I won’t." },
];

export default function WB_Unit8_Page57_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    if (checked) {
      setChecked(false);
    }
  };

  const handleCheck = () => {
    const allAnswered = QUESTIONS.every((q) => answers[q.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    setChecked(true);
    ValidationAlert.success("Great! You answered all the questions.");
  };

  const handleStartAgain = () => {
    setAnswers({});
    setChecked(false);
  };

  const handleShowAnswer = () => {
    ValidationAlert.info("Students’ answers will vary.");
  };

  const isUnansweredAfterCheck = (questionId) => {
    if (!checked) return false;
    return !answers[questionId];
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "920px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>
          What will you do tomorrow? Read and answer the questions.
        </h1>

        {/* Top choice boxes */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "130px",
            marginBottom: "6px",
            flexWrap: "wrap",
          }}
        >
          {ANSWER_OPTIONS.map((option) => (
            <div
              key={option.value}
              style={{
                minWidth: "150px",
                height: "48px",
                border: "2px solid #a3a3a3",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#222",
                backgroundColor: "#fff",
                padding: "0 16px",
                boxSizing: "border-box",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>

        {/* Questions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            width: "100%",
            maxWidth: "820px",
            margin: "0 auto",
          }}
        >
          {QUESTIONS.map((question) => (
            <div
              key={question.id}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr 520px",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#111",
                    minWidth: "18px",
                  }}
                >
                  {question.id}
                </span>

                <span
                  style={{
                    fontSize: "20px",
                    color: "#222",
                    lineHeight: "1.35",
                  }}
                >
                  {question.text}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  minWidth: 0,
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
                    const active = answers[question.id] === option.value;

                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSelect(question.id, option.value)}
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
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    flex: 1,
                    minHeight: "36px",
                    borderBottom: "2px solid #7f7f7f",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "20px",
                    color: answers[question.id] ? "#dc2626" : "#999",
                    lineHeight: "1.3",
                    paddingBottom: "2px",
                    boxSizing: "border-box",
                  }}
                >
                  {answers[question.id] || ""}
                </div>
              </div>

              {isUnansweredAfterCheck(question.id) && (
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
            marginTop: "10px",
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