import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 1.svg"
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 4.svg";


const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Do they have any vegetables?",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 2,
    img: img2,
    question: "Does she have any hats?",
    options: ["Yes, she has some.", "No, she hasn’t any."],
    correct: "Yes, she has some.",
  },
  {
    id: 3,
    img: img3,
    question: "Do they have any drinks?",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "Yes, they do have some.",
  },
  {
    id: 4,
    img: img4,
    question: "Does she have any ice cream?",
    options: ["Yes, she has some.", "No, she hasn’t any."],
    correct: "No, she hasn’t any.",
  },
];

export default function WB_Unit3_Page16_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
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

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
  };

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrong = isWrong(item) && selected;
    const correctSelected = showResults && selected && answers[item.id] === item.correct;

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        style={{
          position: "relative",
          padding: "10px 18px",
          borderRadius: "999px",
          border: wrong
            ? "2px solid #dc2626"
            : selected
            ? "2px solid #f39b42"
            : "2px solid transparent",
          backgroundColor: "transparent",
          color: "#111",
          fontSize: "16px",
          fontWeight: "500",
          cursor: showAns ? "default" : "pointer",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
          minWidth: "fit-content",
        }}
      >
        {option}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: "700",
              border: "2px solid #fff",
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
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">C</span> Look, circle, and answer.
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "38px 330px 1fr",
                gap: "18px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "#222",
                  lineHeight: "1",
                }}
              >
                {item.id}
              </div>

              <img
                src={item.img}
                alt={`question-${item.id}`}
                style={{
                  width: "320px",
                  height: "170px",
                  objectFit: "contain",
                  display: "block",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  justifyContent: "center",
                  marginTop: "0",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    color: "#111",
                    lineHeight: "1.4",
                    marginBottom: "2px",
                  }}
                >
                  {item.question}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "14px 16px",
                    alignItems: "center",
                  }}
                >
                  {item.options.map((option) => (
                    <React.Fragment key={option}>
                      {renderOption(item, option)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "6px",
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