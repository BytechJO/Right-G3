import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.6.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct: "She mustn’t eat the cake.",
  },
  {
    id: 2,
    img: img2,
    correct: "She must go to school.",
  },
  {
    id: 3,
    img: img3,
    correct: "They mustn’t play in the street.",
  },
  {
    id: 4,
    img: img4,
    correct: "She must eat fruit.",
  },
  {
    id: 5,
    img: img5,
    correct: "They must wash the dishes.",
  },
  {
    id: 6,
    img: img6,
    correct: "He mustn’t watch TV.",
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "She mustn’t eat the cake." },
  { id: 2, value: "She must go to school." },
  { id: 3, value: "They mustn’t play in the street." },
  { id: 4, value: "She must eat fruit." },
  { id: 5, value: "They must wash the dishes." },
  { id: 6, value: "He mustn’t watch TV." },
];

export default function WB_Unit6_Page35_Q1() {
  const [answers, setAnswers] = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (id) => {
    if (showAns || !draggedText) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: draggedText,
    }));

    setDraggedText(null);
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
    setDraggedText(null);
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
          <span className="WB-ex-A">E</span>
          Look, read, and write.
        </h1>

        {/* بنك الجمل */}
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

        {/* الصور والجمل */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", gap: "26px 34px",
            alignItems: "start",
            marginBottom:"20px"
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                  marginLeft: "8px",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  position: "relative",
                  width: "180px",
                  height: "120px",
                  border: "2px solid #cfcfcf",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img}
                  alt={`question-${item.id}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />

                {item.id === 1 || item.id === 3 || item.id === 6 ? (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "4px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      border: "1px solid #bdbdbd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#777",
                      fontSize: "24px",
                      fontWeight: "700",
                      lineHeight: "1",
                    }}
                  >
                    ✕
                  </div>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "4px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      border: "1px solid #bdbdbd",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#777",
                      fontSize: "22px",
                      fontWeight: "700",
                      lineHeight: "1",
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "42px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 8px 6px 8px",
                  borderBottom: "2px solid #8f8f8f",
                  textAlign: "center",
                  fontSize: "17px",
                  color: answers[item.id] ? "#dc2626" : "#9ca3af",
                  fontWeight: answers[item.id] ? "500" : "400",
                  lineHeight: "1.5",
                  backgroundColor: answers[item.id] ? "#fff7ed" : "transparent",
                  borderRadius: "6px 6px 0 0",
                }}
              >
                {answers[item.id] || ""}

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