import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/8.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Is the teacher at the library?",
    correct: "No, he isn’t.",
  },
  {
    id: 2,
    img: img2,
    question: "Are the kids in the taxi?",
    correct: "No, they aren’t.",
  },
  {
    id: 3,
    img: img3,
    question: "Are Hansel and Helen at the zoo?",
    correct: "Yes, they are.",
  },
  {
    id: 4,
    img: img4,
    question: "Is Hansel in the living room?",
    correct: "Yes, he is.",
  },
];

const DRAG_ITEMS = [
  { id: 1, value: "No, he isn’t." },
  { id: 2, value: "No, they aren’t." },
  { id: 3, value: "Yes, they are." },
  { id: 4, value: "Yes, he is." },
];

export default function WB_Unit8_Page55_QJ() {
  const [answers, setAnswers] = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (id) => {
    if (showAns || !draggedText) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === draggedText) {
        delete newAnswers[key];
      }
    });

    newAnswers[id] = draggedText;
    setAnswers(newAnswers);
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

    setShowResults(true);

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
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedText(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!showResults) return false;
    return answers[id] !== ITEMS.find((item) => item.id === id).correct;
  };

  const renderDropBox = (id, width = "220px") => {
    const value = answers[id];

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(id)}
        style={{
          position: "relative",
          minWidth: width,
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6px 4px 6px",
          borderBottom: "2px solid #555",
          color: value ? "#d92d20" : "#999",
          fontSize: "22px",
          lineHeight: "1.3",
          textAlign: "center",
        }}
      >
        {value || ""}

        {isWrong(id) && (
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
          gap: "18px",
          width: "100%",
          maxWidth: "980px",
          margin: "0 auto",
          padding: "10px 18px 20px 18px",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{ margin: 0 }}
        >
          <span className="WB-ex-A">J</span> Read, look, and write.
        </h1>

        {/* بنك السحب */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "6px",
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
            gap: "30px 46px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                    lineHeight: "1",
                    marginTop: "4px",
                  }}
                >
                  {item.id}
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: 1,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "22px",
                      lineHeight: "1.35",
                      color: "#222",
                    }}
                  >
                    {item.question}
                  </p>

                  <img
                    src={item.img}
                    alt={`question-${item.id}`}
                    style={{
                      width: "300px",
                      height: "165px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "18px",
                  marginTop: "2px",
                }}
              >
                {renderDropBox(item.id, "290px")}
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
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}