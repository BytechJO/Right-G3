import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/6.svg";

const SENTENCES = [
  { id: 1, text: "He will swim in the sea." },
  { id: 2, text: "She won’t fly a kite." },
  { id: 3, text: "They will go to the beach." },
  { id: 4, text: "She will do her homework." },
  { id: 5, text: "She won’t plant a flower." },
  { id: 6, text: "He won’t play the drum." },
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
  2: 2,
  3: 5,
  4: 3,
  5: 6,
  6: 1,
};

const NUMBERS = [1, 2, 3, 4, 5, 6];

export default function WB_Unit10_Page57_QA() {
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

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === draggedNumber) {
        delete newAnswers[key];
      }
    });

    newAnswers[id] = draggedNumber;

    setAnswers(newAnswers);
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
          <span className="WB-ex-A">A</span>
          Read, look, and number the pictures.
        </h1>

        {/* numbers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "6px",
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
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "20px",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* main layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.95fr",
            gap: "26px",
            alignItems: "start",
          }}
        >
          {/* left side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {SENTENCES.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                    lineHeight: "1.3",
                  }}
                >
                  {item.id}
                </span>

                <p
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "1.45",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* right side images */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 14px",
              justifyItems: "center",
            }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  width: "190px",
                  height: "130px",
                  backgroundColor: "#fff",
                  borderRadius: "14px",
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
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      zIndex: 3,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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

                {/* number box */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(item.id)}
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    width: "38px",
                    height: "38px",
                    backgroundColor: "#fff",
                    border: "2px solid #cfcfcf",
                    borderRadius: "6px",
                    color: answers[item.id] ? "#ef4444" : "#bdbdbd",
                    fontWeight: "700",
                    fontSize: "24px",
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
        </div>

        {/* buttons */}
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