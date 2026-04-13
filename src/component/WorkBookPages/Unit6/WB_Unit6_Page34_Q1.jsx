import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/C.6.svg";

const SENTENCES = [
  "A small cat and a big dog are running down the hill.",
  "They’re running across the street.",
  "The cat can go through the fence. The dog can’t.",
  "The dog can’t jump over the fence.",
  "The cat is climbing up a tree.",
  "The cat is happy. The dog is sad.",
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
  1: 3,
  2: 5,
  3: 2,
  4: 6,
  5: 1,
  6: 4,
};

const NUMBERS = [1, 2, 3, 4, 5, 6];

export default function WB_Unit6_Page34_Q1() {
  const [answers, setAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedNumbers = Object.values(answers);

  // drag
  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  // drop
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
          <span className="WB-ex-A">C</span>
          Read, look, and number the pictures.
        </h1>

        {/* sentences */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {SENTENCES.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", fontSize: "18px" }}>
              <strong>{i + 1}.</strong>
              <p style={{ margin: 0 }}>{s}</p>
            </div>
          ))}
        </div>

        {/* numbers */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
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
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
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
            gap: "20px",
            justifyItems: "center",
            marginBottom:"20px"
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(item.id)}
              style={{
                position: "relative",
                width: "180px",
                height: "140px",
                background: "#fff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #e5e7eb",
              }}
            >
              {answers[item.id] && (
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    background: "#fff",
                    color: "#ef4444",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {answers[item.id]}
                </div>
              )}

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
                  }}
                >
                  ✕
                </div>
              )}

              <img
                src={item.img}
                alt=""
                style={{ width: "150px", height: "110px", objectFit: "contain" }}
              />
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