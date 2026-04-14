import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import farmImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 47/SVG/1.svg";

const ITEMS = [
  { word: "horses", correct: "were", article: false, isPlural: true },
  { word: "tractor", correct: "wasn’t", article: true, isPlural: false },
  { word: "dog", correct: "was", article: true, isPlural: false },
  { word: "goats", correct: "were", article: false, isPlural: true },
  { word: "cows", correct: "were", article: false, isPlural: true },
  { word: "chickens", correct: "were", article: false, isPlural: true },
  { word: "barn", correct: "was", article: true, isPlural: false },
  { word: "big tree", correct: "wasn’t", article: false, isPlural: false },
];

export default function WB_Unit8_Page47_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const getYesValue = (item) => {
    return item.isPlural ? "were" : "was";
  };

  const getNoValue = (item) => {
    return item.isPlural ? "weren’t" : "wasn’t";
  };

  const handleTopSelect = (item, type) => {
    if (showAns) return;

    const value = type === "yes" ? getYesValue(item) : getNoValue(item);

    setAnswers((prev) => ({
      ...prev,
      [item.word]: value,
    }));
  };

  const handleSentenceSelect = (word, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [word]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.word]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all items first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.word] === item.correct) {
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
      correctMap[item.word] = item.correct;
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
    return answers[item.word] !== item.correct;
  };

  const getSentenceOptions = (item) => {
    return item.isPlural
      ? ["were", "weren’t"]
      : ["was", "wasn’t"];
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
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">E</span>
          Look and write ✓. Then write sentences.
        </h1>

        {/* top choices */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
            maxWidth: "760px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const selected = answers[item.word];
            const yesActive = selected === getYesValue(item);
            const noActive = selected === getNoValue(item);

            return (
              <div
                key={item.word}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: "72px",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "500",
                    textAlign: "center",
                    lineHeight: "1.2",
                    minHeight: "34px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.word}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => handleTopSelect(item, "yes")}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #bdbdbd",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      color: yesActive ? "#16a34a" : "#8f8f8f",
                      fontSize: "22px",
                      fontWeight: "700",
                      lineHeight: "1",
                      cursor: showAns ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✓
                  </button>

                  <button
                    onClick={() => handleTopSelect(item, "no")}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #bdbdbd",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      color: noActive ? "#dc2626" : "#8f8f8f",
                      fontSize: "22px",
                      fontWeight: "700",
                      lineHeight: "1",
                      cursor: showAns ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* sentences */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "650px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {ITEMS.map((item, index) => (
            <div
              key={item.word}
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <div
                style={{
                  borderBottom: "2px solid #8f8f8f",
                  paddingBottom: "4px",
                  minHeight: "34px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "6px",
                  fontSize: "17px",
                  lineHeight: "1.4",
                  color: answers[item.word] ? "#dc2626" : "#333",
                }}
              >
                <span style={{ color: "#333" }}>{index + 1}.</span>
                <span>There</span>

                <select
                  value={answers[item.word] || ""}
                  onChange={(e) =>
                    handleSentenceSelect(item.word, e.target.value)
                  }
                  disabled={showAns}
                  style={{
                    minWidth: "90px",
                    height: "30px",
                    border: "1px solid #bdbdbd",
                    borderRadius: "6px",
                    padding: "0 8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#fff",
                    color: "#333",
                    cursor: showAns ? "default" : "pointer",
                  }}
                >
                  <option value="">Select</option>
                  {getSentenceOptions(item).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {item.article && <span>a</span>}
                <span>{item.word}</span>
                <span>on Grandpa’s farm.</span>
              </div>

              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    right: "-10px",
                    top: "-6px",
                    width: "22px",
                    height: "22px",
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "50%",
                    fontSize: "12px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
            </div>
          ))}
        </div>

        {/* image under */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <img
            src={farmImg}
            alt="Grandpa farm"
            style={{
              width: "260px",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4px",
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