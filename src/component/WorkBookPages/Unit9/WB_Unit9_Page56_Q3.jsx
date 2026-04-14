import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/2.svg";
import img3 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["dogs", "ducks"],
    correct: "dogs",
  },
  {
    id: 2,
    img: img2,
    options: ["bees", "beets"],
    correct: "bees",
  },
  {
    id: 3,
    img: img3,
    options: ["bags", "bats"],
    correct: "bats",
  },
  {
    id: 4,
    img: img4,
    options: ["cups", "cubs"],
    correct: "cups",
  },
];

export default function WB_Unit9_Page56_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
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
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (id) => {
    if (!showResults) return false;
    return answers[id] !== ITEMS.find((item) => item.id === id).correct;
  };

  const getOptionStyle = (itemId, option) => {
    const selected = answers[itemId] === option;

    return {
      minWidth: "110px",
      minHeight: "48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      lineHeight: "1.2",
      color: "#222",
      cursor: showAns ? "default" : "pointer",
      border: selected ? "4px solid #dc2626" : "4px solid transparent",
      borderRadius: "999px",
      backgroundColor: "transparent",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
      padding: "0 10px",
    };
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
          <span className="WB-ex-A">C</span> Look, read, and circle. Say.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "26px",
            alignItems: "start",
            justifyItems: "center",
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
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "6px",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#222",
                  }}
                >
                  {item.id}
                </span>
              </div>

              <div
                style={{
                  width: "270px",
                  minHeight: "300px",
                  border: "3px solid #a3a3a3",
                  borderRadius: "24px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 14px 18px 14px",
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width: "100%",
                    height: "165px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  {item.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelect(item.id, option)}
                      style={getOptionStyle(item.id, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {isWrong(item.id) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}