import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/6.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/8.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/9.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/10.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/11.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["cr", "dr", "pr"],
    correct: "pr",
  },
  {
    id: 2,
    img: img2,
    options: ["br", "tr", "dr"],
    correct: "br",
  },
  {
    id: 3,
    img: img3,
    options: ["fr", "pr", "cr"],
    correct: "pr",
  },
  {
    id: 4,
    img: img4,
    options: ["tr", "gr", "pr"],
    correct: "gr",
  },
  {
    id: 5,
    img: img5,
    options: ["cr", "tr", "br"],
    correct: "br",
  },
  {
    id: 6,
    img: img6,
    options: ["gr", "fr", "dr"],
    correct: "gr",
  },
];

export default function WB_Unit8_Page49_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
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

  const isWrong = (item) => {
    if (!checked) return false;
    return answers[item.id] !== item.correct;
  };

  const renderOption = (itemId, option) => {
    const selected = answers[itemId] === option;

    return (
      <button
        onClick={() => handleSelect(itemId, option)}
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          border: selected ? "4px solid #dc2626" : "4px solid transparent",
          backgroundColor: "#fff",
          color: "#222",
          fontSize: "24px",
          fontWeight: "500",
          cursor: showAns ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: "1",
          transition: "all 0.2s ease",
        }}
      >
        {option}
      </button>
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
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>
          Listen and circle.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px 34px",
            justifyItems: "center",
            alignItems: "start",
            width: "100%",
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
                gap: "14px",
                width: "100%",
                maxWidth: "220px",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                  marginLeft: "2px",
                }}
              >
                {item.id}
              </div>

              <div
                style={{
                  width: "100%",
                  height: "150px",
                  border: "3px solid #bdbdbd",
                  borderRadius: "20px",
                  backgroundColor: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width: "85%",
                    height: "85%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "14px",
                  width: "100%",
                }}
              >
                {item.options.map((option) => (
                  <div key={option}>{renderOption(item.id, option)}</div>
                ))}
              </div>

              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
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
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
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