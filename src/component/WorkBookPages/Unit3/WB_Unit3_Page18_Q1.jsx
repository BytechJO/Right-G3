import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex G 1.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  { id: 1, correct: "dolls?" },
  { id: 2, correct: "cars?" },
  { id: 3, correct: "balls?" },
  { id: 4, correct: "trains?" },
  { id: 5, correct: "kites?" },
];

const DRAG_ITEMS = [
  { id: 1, value: "dolls?" },
  { id: 2, value: "cars?" },
  { id: 3, value: "balls?" },
  { id: 4, value: "trains?" },
  { id: 5, value: "kites?" },

  // distractors
  { id: 6, value: "books?" },
  { id: 7, value: "bananas?" },
  { id: 8, value: "cookies?" },
];

export default function WB_Unit3_Page18_QB() {
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

    const allAnswered = ITEMS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length;

    ITEMS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
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
    const filled = {};

    ITEMS.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? `a-${item.id}`,
        value: item.correct,
      };
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

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  const renderDropBox = (boxKey, wrong) => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        style={{
          minWidth: "150px",
          height: "32px",
          borderBottom: "2px solid #3f3f3f",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          fontSize: "18px",
          lineHeight: "1",
          color: "#111",
          padding: "0 4px 2px",
          boxSizing: "border-box",
          position: "relative",
          fontWeight: 500,
        }}
      >
        {value}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            ✕
          </div>
        )}
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
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
          }}
        >
          <span className="WB-ex-A">B</span> Look and write the questions and
          answers.
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
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
                  backgroundColor: isUsed ? "#eeeeee" : SOFT_COLOR,
                  color: isUsed ? "#999" : "#222",
                  cursor: isUsed || showAns ? "not-allowed" : "grab",
                  opacity: isUsed ? 0.6 : 1,
                  userSelect: "none",
                  fontSize: "16px",
                  fontWeight: 500,
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
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "860px",
              minHeight: "620px",
            }}
          >
            <img
              src={exerciseImg}
              alt="exercise"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />

            <div
              style={{
                position: "absolute",
                right: "18px",
                top: "425px",
                width: "345px",
                background: "#f8f8f8",
                border: "2px solid #9b9b9b",
                borderRadius: "12px",
                padding: "16px 14px 14px",
                boxSizing: "border-box",
              }}
            >
              {ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "6px",
                    marginBottom: index === ITEMS.length - 1 ? 0 : "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                      lineHeight: 1.1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Do you have any
                  </span>

                  {renderDropBox(`a-${item.id}`, isWrong(item))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "6px",
            display: "flex",
            justifyContent: "center",
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