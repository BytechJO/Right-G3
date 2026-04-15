import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 3.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  {
    id: 1,
    img: img1,
    prefix: "They have some",
    correct: "fruits.",
  },
  {
    id: 2,
    img: img2,
    prefix: "They have some",
    correct: "caps.",
  },
  {
    id: 3,
    img: img3,
    prefix: "They have some",
    correct: "sweets.",
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "fruits." },
  { id: 2, value: "caps." },
  { id: 3, value: "sweets." },
];

export default function WB_Unit3_Page16_QC() {
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
      const matchedAnswer = DRAG_ITEMS.find(
        (drag) => drag.value === item.correct
      );

      filled[`a-${item.id}`] = {
        dragId: matchedAnswer?.id ?? `a-${item.id}`,
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

  const isWrongAnswer = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  const renderDropBox = (boxKey, isWrong, width = "220px") => {
    const value = answers[boxKey]?.value || "";

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(boxKey)}
        style={{
          minWidth: width,
          minHeight: "42px",
          borderBottom: "2px solid #444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          color: showAns ? "#d93025" : "#111",
          backgroundColor: "transparent",
          borderRadius: "8px 8px 0 0",
          padding: "0 8px 4px",
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
          <span className="WB-ex-A">C</span> Look and complete the sentences.
        </h1>

        {/* Bank فوق بنفس ستايل B */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px 0 0",
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

        {/* الأسئلة */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "34px 320px 1fr",
                gap: "14px",
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
                alt={`sentence-${item.id}`}
                style={{
                  width: "310px",
                  height: "170px",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "10px",
                    flexWrap: "wrap",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      color: "#222",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.prefix}
                  </span>

                  {renderDropBox(`a-${item.id}`, isWrongAnswer(item), "190px")}
                </div>

                <div
                  style={{
                    width: "100%",
                    borderBottom: "2px solid #555",
                    height: "12px",
                  }}
                />
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