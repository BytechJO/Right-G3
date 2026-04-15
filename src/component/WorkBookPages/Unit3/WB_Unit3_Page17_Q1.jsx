import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/3.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  {
    id: 1,
    img: img1,
    fixedQuestion: "What do they have?",
    correctQuestion: "What do they have?",
    correctAnswer: "They have gloves.",
    lockQuestion: true,
    lockAnswer: false,
  },
  {
    id: 2,
    img: img2,
    fixedAnswer: "They have some fruit.",
    correctQuestion: "What do they have?",
    correctAnswer: "They have some fruit.",
    lockQuestion: false,
    lockAnswer: true,
  },
  {
    id: 3,
    img: img3,
    fixedQuestion: "What do they have?",
    correctQuestion: "What do they have?",
    correctAnswer: "They have some dolls.",
    lockQuestion: true,
    lockAnswer: false,
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "They have gloves." },
  { id: 2, value: "What do they have?" },
  { id: 3, value: "They have some dolls." },
];

export default function WB_Unit3_Page16_QE() {
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
        const qMatch = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctQuestion
        );

        filled[`q-${item.id}`] = {
          dragId: qMatch?.id ?? `q-${item.id}`,
          value: item.correctQuestion,
        };
      }

      if (!item.lockAnswer) {
        const aMatch = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctAnswer
        );

        filled[`a-${item.id}`] = {
          dragId: aMatch?.id ?? `a-${item.id}`,
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

  const renderDropBox = (boxKey, isWrong, width = "330px") => {
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
          justifyContent: "flex-start",
          fontSize: "26px",
          color: showAns ? "#000000ff" : "#111",
          backgroundColor: "transparent",
          borderRadius: "6px 6px 0 0",
          padding: "0 6px 4px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {value}

        {isWrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
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
    );
  };

  const renderFixedLine = (text, width = "330px", color = "#111") => {
    return (
      <div
        style={{
          minWidth: width,
          minHeight: "44px",
          borderBottom: "2px solid #444",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          fontSize: "26px",
          color,
          padding: "0 6px 4px",
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
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">E</span> Look and write the questions or answers.
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "2px",
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
                  padding: "10px 16px",
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
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "38px 340px 1fr",
                gap: "18px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                  lineHeight: "1",
                }}
              >
                {item.id}
              </div>

              <img
                src={item.img}
                alt={`item-${item.id}`}
                style={{
                  width: "330px",
                  height: "180px",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {item.lockQuestion
                  ? renderFixedLine(
                      item.fixedQuestion,
                      "520px",
                      "#111"
                    )
                  : renderDropBox(
                      `q-${item.id}`,
                      isWrongQuestion(item),
                      "520px"
                    )}

                {item.lockAnswer
                  ? renderFixedLine(
                      item.fixedAnswer,
                      "520px",
                      "#111"
                    )
                  : renderDropBox(
                      `a-${item.id}`,
                      isWrongAnswer(item),
                      "520px"
                    )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4px",
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