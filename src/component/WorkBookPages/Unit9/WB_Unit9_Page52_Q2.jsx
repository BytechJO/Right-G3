import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/3.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/2.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/1.svg";

const SENTENCES = [
  "They were at the bakery yesterday.",
  "She is at the library now.",
  "He was at the bus stop a week ago.",
  "She is at the airport now.",
  "They were at the clinic last week.",
  "I was at work today.",
];

const ITEMS = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
];

const correctAnswers = {
  1: 4,
  2: 1,
  3: 2,
  4: 5,
  5: 6,
  6: 3,
};

const NUMBERS = [1, 2, 3, 4, 5, 6];

export default function WB_Unit8_Page52_QD() {
  const [answers, setAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedNumbers = Object.values(answers);

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (id) => {
    if (showAns || draggedNumber === null) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: draggedNumber,
    }));

    setDraggedNumber(null);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === correctAnswers[item.id]) {
        score++;
      }
    });

    setChecked(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    setAnswers(correctAnswers);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedNumber(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!checked) return false;
    return answers[id] !== correctAnswers[id];
  };

  return (
    <div className="main-container-component">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Read, look, and number the pictures.
        </h1>

        {/* sentences */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px 40px",
          }}
        >
          {SENTENCES.map((sentence, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "10px",
                fontSize: "18px",
                color: "#222",
                lineHeight: "1.5",
              }}
            >
              <strong style={{ minWidth: "20px" }}>{index + 1}</strong>
              <p style={{ margin: 0 }}>{sentence}</p>
            </div>
          ))}
        </div>

        {/* numbers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);

            return (
              <div
                key={num}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(num)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: disabled ? "#ccc" : "#ef4444",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "22px",
            justifyItems: "center",
            marginBottom: "20px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                width: "200px",
                height: "160px",
                background: "#fff",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #bdbdbd",
                overflow: "hidden",
              }}
            >
              {isWrong(item.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    left: "-6px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#ef4444",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "700",
                    zIndex: 3,
                  }}
                >
                  ✕
                </div>
              )}

              <img
                src={item.img}
                alt={`item-${item.id}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* white box always visible */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "42px",
                  height: "42px",
                  background: "#fff",
                  border: "2px solid #cfcfcf",
                  borderRadius: "6px",
                  color: answers[item.id] ? "#ef4444" : "#bdbdbd",
                  fontWeight: "700",
                  fontSize: "26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxSizing: "border-box",
                  zIndex: 2,
                }}
              >
                {answers[item.id] || ""}
              </div>
            </div>
          ))}
        </div>

        {/* buttons */}
        <div style={{ display: "flex", justifyContent: "center" }}>
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