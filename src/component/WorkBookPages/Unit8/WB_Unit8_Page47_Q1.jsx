import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/1.svg";
import trueIcon from "../../../assets/imgs/true.svg";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const OPTIONS = ["was", "were", "wasn't"];

const SENTENCES = [
  {
    id: 1,
    word: "horses",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "horses on Grandpa’s farm.",
  },
  {
    id: 2,
    word: "tractor",
    checkedAnswer: false,
    start: "There",
    firstAnswer: "wasn't",
    end: "a tractor on Grandpa’s farm.",
  },
  {
    id: 3,
    word: "dog",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "was",
    end: "a dog on Grandpa’s farm.",
  },
  {
    id: 4,
    word: "goats",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "goats on Grandpa’s farm.",
  },
  {
    id: 5,
    word: "cows",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "cows on Grandpa’s farm.",
  },
  {
    id: 6,
    word: "chickens",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "were",
    end: "chickens on Grandpa’s farm.",
  },
  {
    id: 7,
    word: "barn",
    checkedAnswer: true,
    start: "There",
    firstAnswer: "was",
    end: "a barn on Grandpa’s farm.",
  },
  {
    id: 8,
    word: "big tree",
    checkedAnswer: false,
    start: "There",
    firstAnswer: "wasn't",
    end: "a big tree on Grandpa’s farm.",
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
  const [checks, setChecks] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns || showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckBox = (id) => {
    if (showAns || showResults) return;

    setChecks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isComplete = (item) => {
    return answers[item.id] && checks[item.id] !== undefined;
  };

  const isCorrect = (item) => {
    return (
      answers[item.id] === item.firstAnswer &&
      checks[item.id] === item.checkedAnswer
    );
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allSelectsAnswered = SENTENCES.every((item) => answers[item.id]);

    if (!allSelectsAnswered) {
      ValidationAlert.info("Please complete all selects first.");
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
    const solvedAnswers = {};
    const solvedChecks = {};

    SENTENCES.forEach((item) => {
      solvedAnswers[item.id] = item.firstAnswer;
      solvedChecks[item.id] = item.checkedAnswer;
    });

    setAnswers(solvedAnswers);
    setChecks(solvedChecks);

    setShowAns(true);
    setShowResults(false);
  };
  const handleStartAgain = () => {
    setAnswers({});
    setChecks({});
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
          <span className="WB-ex-A">E</span>
          Look and write <strong className="text-red-600">✓ </strong> . Then
          write sentences.
        </h1>

        {/* Top Checkboxes */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "22px",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "22px",
              alignItems: "flex-start",
            }}
          >
            {SENTENCES.map((item) => {
              const checkWrong =
                showResults && checks[item.id] !== item.checkedAnswer;

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {item.word}
                  </span>

                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <div
                      onClick={() => handleCheckBox(item.id)}
                      style={{
                        width: "35px",
                        height: "35px",
                        border: checkWrong
                          ? `2px solid ${WRONG_COLOR}`
                          : `1px solid ${BORDER_COLOR}`,
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: showAns || showResults ? "default" : "pointer",
                        // background: "#fff",
                        // color: "#ef4444",
                        // fontWeight: 700,
                        // fontSize: "18px",
                        userSelect: "none",
                      }}
                    >
                      {checks[item.id] ? (
                        <img src={trueIcon} style={{ height: "25px" }} />
                      ) : (
                        ""
                      )}
                    </div>

                    {checkWrong && <ErrorBadge />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2">
          {/* Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
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
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {item.start}
                  </span>

                  {/* Select */}
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <select
                      disabled={showAns || showResults}
                      value={answers[item.id] || ""}
                      onChange={(e) => handleSelect(item.id, e.target.value)}
                      style={{
                        minWidth: "110px",
                        minHeight: "36px",
                        borderBottom:
                          wrong && answers[item.id] !== item.firstAnswer
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

                    {wrong && answers[item.id] !== item.firstAnswer && (
                      <ErrorBadge />
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: "18px",
                      color: "#111",
                    }}
                  >
                    {item.end}
                  </span>
                </div>
              );
            })}
          </div>
          <img
            src={img1}
            alt="img1"
            style={{ height: "350px", width: "auto" }}
          />
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
