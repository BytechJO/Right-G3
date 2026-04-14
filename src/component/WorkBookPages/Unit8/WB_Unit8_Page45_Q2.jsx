import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/6_8.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/7_6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/8_5.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/9_5.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    subject: "She",
    options: ["was", "wasn’t"],
    correct: "was",
    end: "at the farm.",
  },
  {
    id: 2,
    img: img2,
    subject: "They",
    options: ["were", "weren’t"],
    correct: "were",
    end: "at the park.",
  },
  {
    id: 3,
    img: img3,
    subject: "He",
    options: ["was", "wasn’t"],
    correct: "wasn’t",
    end: "at the swimming pool.",
  },
  {
    id: 4,
    img: img4,
    subject: "They",
    options: ["were", "weren’t"],
    correct: "weren’t",
    end: "at the beach.",
  },
];

export default function WB_Unit6_Page45_QB() {
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

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
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
    padding: "2px 6px",
    fontSize: "18px",
    fontWeight: "500",
    cursor: showAns ? "default" : "pointer",
    color: "#222",
    border: selected ? "2px solid #ef4444" : "2px solid transparent",
    borderRadius: "20px",
    lineHeight: "1",
  });

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>
          Look, read, and circle.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px 40px",
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
                }}
              >
                {item.id}
              </div>

              <img
                src={item.img}
                alt={`item-${item.id}`}
                style={{
                  width: "180px",
                  height: "110px",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "10px",
                }}
              />

              <p style={{ fontSize: "18px", margin: 0 }}>
                {item.subject}{" "}
                {item.options.map((opt) => (
                  <span
                    key={opt}
                    onClick={() => handleSelect(item.id, opt)}
                    style={getOptionStyle(answers[item.id] === opt)}
                  >
                    {opt}
                  </span>
                ))}{" "}
                {item.end}
              </p>

              {isWrong(item.id) && (
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