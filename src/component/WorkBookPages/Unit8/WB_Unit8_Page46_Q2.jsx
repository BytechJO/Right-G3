import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/2.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/3.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const LINE_COLOR = "#2f2f2f";

const OPTIONS = ["had", "didn't have", "have"];

const SENTENCES = [
  {
    id: 1,
    start: "She",
    firstAnswer: "had",
    middle: "a doll, but she",
    secondAnswer: "didn't have",
    end: "a computer.",
  },
  {
    id: 2,
    start: "He",
    firstAnswer: "had",
    middle: "a kite, but he",
    secondAnswer: "didn't have",
    end: "a car.",
  },
  {
    id: 3,
    start: "He",
    firstAnswer: "had",
    middle: "a ball, but he",
    secondAnswer: "didn't have",
    end: "a train.",
  },
  {
    id: 4,
    start: "They",
    firstAnswer: "had",
    middle: "a radio, but they",
    secondAnswer: "didn't have",
    end: "a TV.",
  },
  {
    id: 5,
    start: "She",
    firstAnswer: "had",
    middle: "a book, but she",
    secondAnswer: "didn't have",
    end: "a robot.",
  },
];

const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "bold",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",

      pointerEvents: "none",
      zIndex: 5,
    }}
  >
    ✕
  </div>
);

export default function WB_Unit8_Page46_QD() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, field, value) => {
    if (showAns||showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    setShowResults(false);
  };

  const isComplete = (item) => {
    return answers[item.id]?.first && answers[item.id]?.second;
  };

  const isCorrect = (item) => {
    return (
      answers[item.id]?.first === item.firstAnswer &&
      answers[item.id]?.second === item.secondAnswer
    );
  };

  const handleCheck = () => {
       if (showAns||showResults) return;
    const allAnswered = SENTENCES.every((item) => isComplete(item));

    if (!allAnswered) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }

    let score = 0;

    SENTENCES.forEach((item) => {
      if (isCorrect(item)) score++;
    });

    setShowResults(true);

    const total = SENTENCES.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const solved = {};

    SENTENCES.forEach((item) => {
      solved[item.id] = {
        first: item.firstAnswer,
        second: item.secondAnswer,
      };
    });

    setAnswers(solved);
    setShowAns(true);
    setShowResults(false);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "clamp(18px,2.5vw,28px)",
        }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Find and write sentences.
        </h1>

        {/* Images */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "clamp(16px,3vw,40px)",
            flexWrap: "wrap",
          }}
        >
          <img
            src={img1}
            alt="img1"
            style={{ height: "220px", width: "auto" }}
          />

          <img
            src={img2}
            alt="img2"
            style={{ height: "150px", width: "auto" }}
          />
        </div>

        {/* Sentences */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px,2vw,24px)",
            width: "100%",
          }}
        >
          {SENTENCES.map((item) => {
            const wrong = showResults && isComplete(item) && !isCorrect(item);

            return (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px,1vw,12px)",
                  flexWrap: "wrap",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                  }}
                >
                  {item.id}
                </span>

                {/* Start */}
                <span
                  style={{
                    fontSize: "18px",
                    // fontWeight: 500,
                    color: "#111",
                  }}
                >
                  {item.start}
                </span>

                {/* First Select */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <select
                    disabled={showAns||showResults}
                    value={answers[item.id]?.first || ""}
                    onChange={(e) =>
                      handleSelect(item.id, "first", e.target.value)
                    }
                    style={{
                      minWidth: "120px",
                      minHeight: "36px",
                      borderBottom: wrong && answers[item.id]?.first !== item.firstAnswer 
                        ? `2px solid ${WRONG_COLOR}`
                        : `1px solid ${BORDER_COLOR}`,
                      padding: "4px 8px",
                      fontSize: "18px",
                      outline: "none",
                      background: "#fff",
                      color: "#111",
                    }}
                  >
                    <option value="">Select</option>

                    {OPTIONS.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>

                  {wrong && answers[item.id]?.first !== item.firstAnswer && (
                    <ErrorBadge />
                  )}
                </div>

                {/* Middle */}
                <span
                  style={{
                    fontSize: "18px",
                    // fontWeight: 500,
                    color: "#111",
                  }}
                >
                  {item.middle}
                </span>

                {/* Second Select */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <select
                    disabled={showAns||showResults}
                    value={answers[item.id]?.second || ""}
                    onChange={(e) =>
                      handleSelect(item.id, "second", e.target.value)
                    }
                    style={{
                      minWidth: "150px",
                      minHeight: "36px",
                      borderBottom: wrong && answers[item.id]?.second !== item.secondAnswer
                        ? `2px solid ${WRONG_COLOR}`
                        : `1px solid ${BORDER_COLOR}`,
                      padding: "4px 8px",
                      fontSize: "18px",
                      outline: "none",
                      background: "#fff",
                      color: "#111",
                    }}
                  >
                    <option value="">Select</option>

                    {OPTIONS.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>

                  {wrong && answers[item.id]?.second !== item.secondAnswer && (
                    <ErrorBadge />
                  )}
                </div>

                {/* End */}
                <span
                  style={{
                    fontSize: "18px",
                    // fontWeight: 500,
                    color: "#111",
                  }}
                >
                  {item.end}
                </span>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
