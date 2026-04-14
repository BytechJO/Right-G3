import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/1.svg";
import img3 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/2.svg";
import img5 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/3.svg";
import img2 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/4.svg";
import img4 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/5.svg";
import img6 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/6.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["beach", "dig"],
    correct: "beach",
  },
  {
    id: 2,
    img: img2,
    options: ["garden", "barn"],
    correct: "barn",
  },
  {
    id: 3,
    img: img3,
    options: ["swim", "dig"],
    correct: "swim",
  },
  {
    id: 4,
    img: img4,
    options: ["skateboard", "bike"],
    correct: "skateboard",
  },
  {
    id: 5,
    img: img5,
    options: ["boat", "car"],
    correct: "boat",
  },
  {
    id: 6,
    img: img6,
    options: ["zoo", "farm"],
    correct: "farm",
  },
];

export default function WB_Unit8_Page58_QC() {
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

  const isWrong = (item) => {
    if (!checked) return false;
    return answers[item.id] !== item.correct;
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

  const renderOption = (itemId, optionText) => {
    const selected = answers[itemId] === optionText;

    return (
      <div
        onClick={() => handleSelect(itemId, optionText)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "120px",
          padding: "6px 14px",
          fontSize: "20px",
          color: "#222",
          cursor: showAns ? "default" : "pointer",
          userSelect: "none",
          lineHeight: "1.2",

        }}
      >
        {selected && (
          <div
            style={{
              position: "absolute",
              inset: "0",
              border: "4px solid #dc2626",
              borderRadius: "999px",
              pointerEvents: "none",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{optionText}</span>
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
          gap: "24px",
                                      marginBottom:"20px"

        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span>
          Look, read, and circle.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "22px 50px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                gap: "18px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#222",
                  minWidth: "18px",
                  lineHeight: "1.4",
                }}
              >
                {item.id}
              </span>

              <div
                style={{
                  width: "200px",
                  height: "160px",
                  border: "2px solid #bdbdbd",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  flexShrink: 0,
                }}
              >
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
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  paddingTop: "20px",
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
                    top: "-8px",
                    right: "-8px",
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