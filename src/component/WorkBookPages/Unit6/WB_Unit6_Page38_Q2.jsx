import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.5.svg";

const ITEMS = [
  { id: 1, img: img1, correct: "pl" }, // plate
  { id: 2, img: img2, correct: "fl" }, // fly
  { id: 3, img: img3, correct: "sl" }, // slide
  { id: 4, img: img4, correct: "pl" }, // plant
  { id: 5, img: img5, correct: "fl" }, // flag
];

const OPTIONS = ["fl", "pl", "sl"];

export default function WB_Unit6_Page38_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id] !== undefined);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
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
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!checked) return false;
    return answers[id] !== ITEMS.find((item) => item.id === id).correct;
  };

  const getOptionStyle = (selected) => ({
    minWidth: "34px",
    height: "30px",
    padding: "0 8px",
    borderRadius: "6px",
    border: "1.5px solid #f59e0b",
    backgroundColor: selected ? "#ef4444" : "#fff",
    color: selected ? "#fff" : "#333",
    fontSize: "17px",
    fontWeight: "500",
    cursor: showAns ? "default" : "pointer",
  });

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>
          Listen and circle fl, pl, or sl.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "18px",
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
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111",
                  marginLeft: "8px",
                }}
              >
                {item.id}
              </div>

              <img
                src={item.img}
                alt={`item-${item.id}`}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "1.5px solid #f59e0b",
                  borderRadius: "10px",
                  padding: "6px 8px",
                  backgroundColor: "#fff",
                }}
              >
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(item.id, option)}
                    style={getOptionStyle(answers[item.id] === option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {isWrong(item.id) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "2px",
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

        <div style={{ display: "flex", justifyContent: "center", marginTop: "6px" }}>
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