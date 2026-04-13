import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.4.svg";

const ITEMS = [
  { id: 1, img: img1, correct: "July" },
  { id: 2, img: img2, correct: "April" },
  { id: 3, img: img3, correct: "September" },
  { id: 4, img: img4, correct: "November" },
];

const DRAG_ITEMS = [
  { id: 1, value: "April" },
  { id: 2, value: "July" },
  { id: 3, value: "September" },
  { id: 4, value: "November" },
];

export default function WB_Unit6_Page37_Q1() {
  const [answers, setAnswers] = useState({});
  const [draggedMonth, setDraggedMonth] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedMonth(value);
  };

  const handleDrop = (id) => {
    if (showAns || !draggedMonth) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: draggedMonth,
    }));

    setDraggedMonth(null);
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
      if (answers[item.id] === item.correct) {
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
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedMonth(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!checked) return false;
    return answers[id] !== ITEMS.find((item) => item.id === id).correct;
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
          <span className="WB-ex-A">I</span>
          Read, look, and write.
        </h1>

        {/* بنك الشهور */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
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
                  fontSize: "16px",
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

        {/* العناصر */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px 40px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingLeft: "26px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                }}
              >
                {item.id}
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <img
                  src={item.img}
                  alt={`month-${item.id}`}
                  style={{
                    width: "85px",
                    height: "85px",
                    objectFit: "contain",
                    display: "block",
                    flexShrink: 0,
                  }}
                />

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "6px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#333",
                      lineHeight: "1.4",
                    }}
                  >
                    What month is it?
                  </p>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(item.id)}
                    style={{
                      position: "relative",
                      minHeight: "34px",
                      borderBottom: "2px solid #8f8f8f",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 4px 4px 4px",
                      color: answers[item.id] ? "#dc2626" : "#9ca3af",
                      fontSize: "17px",
                      fontWeight: "500",
                      backgroundColor: answers[item.id] ? "#fff7ed" : "transparent",
                      borderRadius: "6px 6px 0 0",
                    }}
                  >
                    {answers[item.id] ? `It's ${answers[item.id]}.` : ""}

                    {isWrong(item.id) && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
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
                </div>
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
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}