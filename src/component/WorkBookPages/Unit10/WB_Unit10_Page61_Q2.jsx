import React, { useState } from "react";
import Button from "../Button";

const PARAGRAPH = `Mom and Dad are very excited about our vacation! Dad says, “Tonight, I’ll show you a brochure of the hotel where we will stay. Tomorrow, we will go to the store to buy new swimsuits. On Tuesday, I’ll choose what to pack. We’ll come home from the vacation in two weeks.”`;

const QUESTIONS = [
  {
    id: 1,
    label: "Tonight",
    correct: "I’ll show you a brochure of the hotel where we will stay.",
  },
  {
    id: 2,
    label: "Tomorrow",
    correct: "we will go to the store to buy new swimsuits.",
  },
  {
    id: 3,
    label: "Tuesday",
    correct: "I’ll choose what to pack.",
  },
  {
    id: 4,
    label: "Two weeks",
    correct: "We’ll come home from the vacation in two weeks.",
  },
];

export default function WB_Unit10_Page58_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  const normalizeText = (text) => {
    return text
      .replace(/[“”،".!?]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };

  const clearSelection = () => {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  };

  const handleTextSelection = () => {
    if (showAns) return;
    if (!activeQuestionId) return;

    const selection = window.getSelection()?.toString().trim() || "";
    if (!selection) return;

    setAnswers((prev) => ({
      ...prev,
      [activeQuestionId]: selection,
    }));

    clearSelection();
  };

  const handleChooseQuestion = (id) => {
    if (showAns) return;
    setActiveQuestionId(id);
    clearSelection();
  };

  const handleCheck = () => {
    const allAnswered = QUESTIONS.every((q) => answers[q.id]);
    if (!allAnswered) return;

    setChecked(true);
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    QUESTIONS.forEach((q) => {
      correctMap[q.id] = q.correct;
    });

    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
    setActiveQuestionId(null);
    clearSelection();
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setActiveQuestionId(null);
    clearSelection();
  };

  const isWrong = (id) => {
    if (!checked) return false;
    const q = QUESTIONS.find((item) => item.id === id);
    return normalizeText(answers[id] || "") !== normalizeText(q.correct);
  };

  const isCorrect = (id) => {
    if (!checked && !showAns) return false;
    const q = QUESTIONS.find((item) => item.id === id);
    return normalizeText(answers[id] || "") === normalizeText(q.correct);
  };

  return (
    <div className="main-container-component">
      <style>
        {`
          .custom-select-paragraph {
            -webkit-user-select: text;
            user-select: text;
          }

          .custom-select-paragraph::selection {
            background: #93c5fd;
            color: #0f172a;
          }

          .custom-select-paragraph *::selection {
            background: #93c5fd;
            color: #0f172a;
          }
        `}
      </style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          width: "100%",
          maxWidth: "980px",
          margin: "0 auto",
          padding: "10px 18px 20px 18px",
          boxSizing: "border-box",
        }}
      >
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">B</span>
          Read and answer the questions.
        </h1>

        <div
          style={{
            minHeight: "42px",
            border: "2px dashed #d1d5db",
            borderRadius: "12px",
            padding: "10px 14px",
            backgroundColor: "#f9fafb",
            color: "#6b7280",
            fontSize: "15px",
            lineHeight: "1.4",
          }}
        >
          First click a question, then highlight its answer from the paragraph.
        </div>

        <div
          onMouseUp={handleTextSelection}
          style={{
            border: "2px solid #e5e7eb",
            borderRadius: "16px",
            backgroundColor: "#ffffff",
            padding: "18px 20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            cursor: activeQuestionId ? "text" : "default",
          }}
        >
          <p
            className="custom-select-paragraph"
            style={{
              margin: 0,
              fontSize: "20px",
              lineHeight: "1.9",
              color: "#222",
              whiteSpace: "pre-wrap",
            }}
          >
            {PARAGRAPH}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {QUESTIONS.map((item) => {
            const active = activeQuestionId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleChooseQuestion(item.id)}
                style={{
                  position: "relative",
                  border: active
                    ? "2px solid #2563eb"
                    : "1.5px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "14px 16px",
                  backgroundColor: active ? "#eff6ff" : "#fff",
                  cursor: showAns ? "default" : "pointer",
                  boxShadow: active ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      minWidth: "22px",
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#111",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.id}
                  </span>

                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: active ? "#1d4ed8" : "#2563eb",
                    }}
                  >
                    {item.label}
                  </div>
                </div>

                <div
                  style={{
                    minHeight: "44px",
                    borderBottom: `2px solid ${
                      isCorrect(item.id)
                        ? "#22c55e"
                        : isWrong(item.id)
                        ? "#ef4444"
                        : active
                        ? "#2563eb"
                        : "#9ca3af"
                    }`,
                    padding: "8px 4px 6px 4px",
                    fontSize: "18px",
                    color: answers[item.id] ? "#111" : "#9ca3af",
                    lineHeight: "1.5",
                    backgroundColor: isCorrect(item.id)
                      ? "#dcfce7"
                      : isWrong(item.id)
                      ? "#fee2e2"
                      : answers[item.id]
                      ? "#fef3c7"
                      : "transparent",
                    borderRadius: "8px 8px 0 0",
                    transition: "all 0.2s ease",
                  }}
                >
                  {answers[item.id] || ""}
                </div>

                {isWrong(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.16)",
                    }}
                  >
                    ✕
                  </div>
                )}

                {isCorrect(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.16)",
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "6px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}