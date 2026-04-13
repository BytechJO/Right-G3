import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.6.svg";

const IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
];

const DRAG_ITEMS = [
  { id: 1, value: "is running" },
  { id: 2, value: "first" },
  { id: 3, value: "is eating an ice cream" },
  { id: 4, value: "fifth" },
  { id: 5, value: "is singing" },
  { id: 6, value: "second" },
];

const QUESTIONS = [
  {
    id: 1,
    parts: ["The third boy ", "."],
    correct: "is running",
  },
  {
    id: 2,
    parts: ["The ", " boy is riding a bike."],
    correct: "first",
  },
  {
    id: 3,
    parts: ["The sixth boy ", "."],
    correct: "is eating an ice cream",
  },
  {
    id: 4,
    parts: ["The ", " boy is kicking the ball."],
    correct: "fifth",
  },
  {
    id: 5,
    parts: ["The fourth boy ", "."],
    correct: "is singing",
  },
  {
    id: 6,
    parts: ["The ", " boy is skateboarding."],
    correct: "second",
  },
];

export default function WB_Unit6_Page34_Q2() {
  const [answers, setAnswers] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedItem(value);
  };

  const handleDrop = (questionId) => {
    if (showAns || !draggedItem) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: draggedItem,
    }));

    setDraggedItem(null);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = QUESTIONS.every((q) => answers[q.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
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
    const correctMap = {};
    QUESTIONS.forEach((q) => {
      correctMap[q.id] = q.correct;
    });

    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (questionId) => {
    if (!checked) return false;
    return answers[questionId] !== QUESTIONS.find((q) => q.id === questionId).correct;
  };

  const renderDropBox = (questionId) => {
    const value = answers[questionId];

    return (
      <span
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(questionId)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "150px",
          minHeight: "34px",
          padding: "4px 10px",
          margin: "0 6px",
          borderBottom: "2px dashed #9ca3af",
          backgroundColor: value ? "#fff7ed" : "#f9fafb",
          color: value ? "#dc2626" : "#9ca3af",
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "1.4",
          borderRadius: "6px",
          verticalAlign: "middle",
          textAlign: "center",
        }}
      >
        {value || ""}
      </span>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Look, read, and write.
        </h1>

        {/* الصور */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          {IMAGES.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                width: "72px",
              }}
            >
              <div
                style={{
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
                {item.id}
              </div>

              <img
                src={item.img}
                alt={`boy-${item.id}`}
                style={{
                  width: "60px",
                  height: "78px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        {/* بنك الكلمات */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "4px",
          }}
        >
          {DRAG_ITEMS.map((item) => {
            const disabled = usedValues.includes(item.value);

            return (
              <div
                key={item.id}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(item.value)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px 24px",
            marginTop: "6px",
          }}
        >
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: "22px",
                color: "#333",
                lineHeight: "1.8",
                paddingLeft: "26px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "4px",
                  fontWeight: "700",
                }}
              >
                {q.id}
              </span>

              <span>{q.parts[0]}</span>
              {renderDropBox(q.id)}
              <span>{q.parts[1]}</span>

              {isWrong(q.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
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

        {/* الأزرار */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
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