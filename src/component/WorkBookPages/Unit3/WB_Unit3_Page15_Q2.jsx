import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 4.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  {
    id: 1,
    img: img1,
    fixedQuestion: "What does he have?",
    fixedAnswer: "He has a glove.",
    correctQuestion: "What does he have?",
    correctAnswer: "He has a glove.",
    lockQuestion: true,
    lockAnswer: true,
  },
  {
    id: 2,
    img: img2,
    fixedQuestion: "What does she have?",
    correctQuestion: "What does she have?",
    correctAnswer: "She has an apple.",
    lockQuestion: true,
    lockAnswer: false,
  },
  {
    id: 3,
    img: img3,
    correctQuestion: "What does she have?",
    correctAnswer: "She has a banana.",
    lockQuestion: false,
    lockAnswer: false,
  },
  {
    id: 4,
    img: img4,
    correctQuestion: "What does she have?",
    correctAnswer: "She has a doll.",
    lockQuestion: false,
    lockAnswer: false,
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "What does she have?" },
  { id: 2, value: "What does she have?" },
  { id: 3, value: "She has an apple." },
  { id: 4, value: "She has a banana." },
  { id: 5, value: "She has a doll." },
];

export default function WB_Unit3_Page15_QB() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const handleDragStart = (item) => {
    if (showAns || usedDragIds.includes(item.id)) return;
    setDraggedItem(item);
  };

  const handleDrop = (boxKey) => {
    if (showAns || !draggedItem) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === draggedItem.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: draggedItem.id,
      value: draggedItem.value,
    };

    setAnswers(newAnswers);
    setDraggedItem(null);
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => {
      const qReady = item.lockQuestion || answers[`q-${item.id}`]?.value;
      const aReady = item.lockAnswer || answers[`a-${item.id}`]?.value;
      return qReady && aReady;
    });

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    let total = 0;

    ITEMS.forEach((item) => {
      const userQuestion = item.lockQuestion
        ? item.correctQuestion
        : answers[`q-${item.id}`]?.value;

      const userAnswer = item.lockAnswer
        ? item.correctAnswer
        : answers[`a-${item.id}`]?.value;

      if (userQuestion === item.correctQuestion) score++;
      if (userAnswer === item.correctAnswer) score++;

      total += 2;
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
    const filled = {};

    ITEMS.forEach((item) => {
      if (!item.lockQuestion) {
        const matchedQuestion = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctQuestion
        );

        filled[`q-${item.id}`] = {
          dragId: matchedQuestion?.id ?? `q-${item.id}`,
          value: item.correctQuestion,
        };
      }

      if (!item.lockAnswer) {
        const matchedAnswer = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctAnswer
        );

        filled[`a-${item.id}`] = {
          dragId: matchedAnswer?.id ?? `a-${item.id}`,
          value: item.correctAnswer,
        };
      }
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongQuestion = (item) => {
    if (!showResults || item.lockQuestion) return false;
    return answers[`q-${item.id}`]?.value !== item.correctQuestion;
  };

  const isWrongAnswer = (item) => {
    if (!showResults || item.lockAnswer) return false;
    return answers[`a-${item.id}`]?.value !== item.correctAnswer;
  };

  const renderDropBox = (boxKey, isWrong, width = "320px") => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        style={{
          minWidth: width,
          minHeight: "44px",
          borderBottom: "2px solid #444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          color: showAns ? "#d93025" : "#111",
          backgroundColor: isWrong ? "rgba(217, 48, 37, 0.08)" : "transparent",
          borderRadius: "8px 8px 0 0",
          padding: "0 10px",
          boxSizing: "border-box",
          transition: "0.2s ease",
        }}
      >
        {value}
      </div>
    );
  };

  const renderFixedLine = (text, width = "320px", color = "#111") => {
    return (
      <div
        style={{
          minWidth: width,
          minHeight: "44px",
          borderBottom: "2px solid #444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          color,
          borderRadius: "8px 8px 0 0",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        {text}
      </div>
    );
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
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span> Look and write the questions and answers.
        </h1>

        {/* Bank فوق */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0 4px",
          }}
        >
          {DRAG_ITEMS.map((item) => {
            const isUsed = usedDragIds.includes(item.id);

            return (
              <div
                key={item.id}
                draggable={!isUsed && !showAns}
                onDragStart={() => handleDragStart(item)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "14px",
                  border: `1.5px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
                  backgroundColor: isUsed ? "#efefef" : SOFT_COLOR,
                  color: isUsed ? "#9a9a9a" : "#222",
                  cursor: isUsed || showAns ? "not-allowed" : "grab",
                  opacity: isUsed ? 0.55 : 1,
                  userSelect: "none",
                  fontSize: "16px",
                  fontWeight: "500",
                  boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "0.2s ease",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px 50px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {item.id}
              </div>

              <img
                src={item.img}
                alt={`item-${item.id}`}
                style={{
                  width: "180px",
                  height: "150px",
                  objectFit: "contain",
                  border: "2px solid #bfbfbf",
                  borderRadius: "16px",
                  background: "#fff",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {item.lockQuestion
                  ? renderFixedLine(item.fixedQuestion, "320px", "#111")
                  : renderDropBox(`q-${item.id}`, isWrongQuestion(item), "320px")}

                {item.lockAnswer
                  ? renderFixedLine(item.fixedAnswer, "320px", "#111")
                  : renderDropBox(`a-${item.id}`, isWrongAnswer(item), "320px")}
              </div>
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