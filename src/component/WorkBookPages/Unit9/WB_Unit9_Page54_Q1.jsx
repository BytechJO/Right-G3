import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Are they on the playground?",
    options: ["Yes, they are.", "No, they aren’t."],
    correct: "Yes, they are.",
  },
  {
    id: 2,
    img: img2,
    question: "Are they at the zoo?",
    options: ["Yes, they are.", "No, they aren’t."],
    correct: "No, they aren’t.",
  },
  {
    id: 3,
    img: img3,
    question: "Are they at the clinic?",
    options: ["Yes, they are.", "No, they aren’t."],
    correct: "Yes, they are.",
  },
  {
    id: 4,
    img: img4,
    question: "Are they at the circus?",
    options: ["Yes, they are.", "No, they aren’t."],
    correct: "No, they aren’t.",
  },
];

export default function WB_Unit8_Page53_QG() {
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

  const getOptionStyle = (item, option) => {
    const selected = answers[item.id] === option;
    const isCorrectOption = item.correct === option;

    let border = "2px solid transparent";
    let color = "#222";

    if (selected) {
      border = "3px solid #dc2626";
    }

    if (showAns && isCorrectOption) {
      border = "3px solid #dc2626";
    }

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "190px",
      minHeight: "44px",
      padding: "4px 18px",
      border,
      borderRadius: "999px",
      cursor: showAns ? "default" : "pointer",
      fontSize: "22px",
      lineHeight: "1.2",
      color,
      backgroundColor: "transparent",
      transition: "all 0.2s ease",
      textAlign: "center",
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
          <span className="WB-ex-A">G</span> Read, look, and circle.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "34px 42px",
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
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                    lineHeight: "1",
                    marginTop: "6px",
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
                      width: "290px",
                      height: "150px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  paddingLeft: "34px",
                  marginTop: "2px",
                }}
              >
                {item.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(item.id, option)}
                    style={getOptionStyle(item, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {isWrong(item.id) && (
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
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}