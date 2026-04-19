import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    text: "The car is faster than the skateboard.",
    correct: "true",
  },
  {
    id: 2,
    text: "The grandpa is younger than the grandson.",
    correct: "false",
  },
  {
    id: 3,
    text: "The lion is larger than the cat.",
    correct: "true",
  },
  {
    id: 4,
    text: "The truck is smaller than the car.",
    correct: "false",
  },
  {
    id: 5,
    text: "The snake is longer than the worm.",
    correct: "true",
  },
  {
    id: 6,
    text: "The book is heavier than the pen.",
    correct: "true",
  },
];

export default function SB_AtTheBasketballGame_Page210_QA() {
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
      ValidationAlert.info("Please complete all answers first.");
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
    const filled = {};

    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrongCell = (item, choice) => {
    if (!checked || showAns) return false;
    return answers[item.id] === choice && answers[item.id] !== item.correct;
  };

  const shouldShowCheck = (item, choice) => {
    if (showAns) return item.correct === choice;
    if (!checked) return false;
    return answers[item.id] === choice && answers[item.id] === item.correct;
  };

  const renderBookCheck = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        style={{
          width: "clamp(34px, 3.3vw, 54px)",
          height: "clamp(34px, 3.3vw, 54px)",
          transform: "rotate(-12deg)",
          display: "inline-block",
        }}
      >
        <path
          d="M4 13 L9 18 L20 5"
          stroke="#d82424"
          strokeWidth="3.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderChoiceCell = (item, choice) => {
    const isSelected = answers[item.id] === choice;
    const showCheck = shouldShowCheck(item, choice);
    const showWrong = isWrongCell(item, choice);

    return (
      <td
        onClick={() => handleSelect(item.id, choice)}
        style={{
          width: "12.2%",
          minWidth: "92px",
          borderLeft: "2px solid #a6a6a6",
          borderTop: "2px solid #a6a6a6",
          textAlign: "center",
          verticalAlign: "middle",
          cursor: showAns ? "default" : "pointer",
          position: "relative",
          background: isSelected && !checked ? "#f6f6f6" : "#fff",
          padding: 0,
          height: "68px",
        }}
      >
        {!checked && !showAns && (
          <div
            style={{
              width: "22px",
              height: "22px",
              margin: "0 auto",
              borderRadius: "50%",
              border: `2px solid ${isSelected ? "#7d7d7d" : "#b9b9b9"}`,
              background: isSelected ? "#ececec" : "transparent",
              boxSizing: "border-box",
            }}
          />
        )}

        {showCheck && renderBookCheck()}

        {showWrong && (
          <div
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "19px",
              height: "19px",
              borderRadius: "50%",
              background: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "700",
            }}
          >
            ✕
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="main-container-component" style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "12px clamp(10px, 2vw, 24px) 28px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          boxSizing: "border-box",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">A</span>
          Read and write ✓.
        </h1>

        <div
          style={{
            width: "100%",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "2px",
          }}
        >
          <div
            style={{
              minWidth: "760px",
              maxWidth: "1188px",
              width: "100%",
              margin: "0 auto",
              border: "2px solid #a6a6a6",
              borderRadius: "18px",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: "75.6%",
                      height: "58px",
                      padding: 0,
                      background: "#fff",
                    }}
                  />
                  <th
                    style={{
                      width: "12.2%",
                      minWidth: "92px",
                      borderLeft: "2px solid #a6a6a6",
                      textAlign: "center",
                      fontSize: "clamp(18px, 2vw, 26px)",
                      fontWeight: "400",
                      color: "#222",
                      padding: 0,
                    }}
                  >
                    True
                  </th>
                  <th
                    style={{
                      width: "12.2%",
                      minWidth: "92px",
                      borderLeft: "2px solid #a6a6a6",
                      textAlign: "center",
                      fontSize: "clamp(18px, 2vw, 26px)",
                      fontWeight: "400",
                      color: "#222",
                      padding: 0,
                    }}
                  >
                    False
                  </th>
                </tr>
              </thead>

              <tbody>
                {ITEMS.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        borderTop: "2px solid #a6a6a6",
                        padding: "0 18px 0 20px",
                        height: "68px",
                        fontSize: "clamp(18px, 2.35vw, 28px)",
                        color: "#222",
                        verticalAlign: "middle",
                        lineHeight: 1.15,
                        wordBreak: "break-word",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "700",
                          display: "inline-block",
                          minWidth: "28px",
                          marginRight: "14px",
                        }}
                      >
                        {item.id}
                      </span>
                      <span>{item.text}</span>
                    </td>

                    {renderChoiceCell(item, "true")}
                    {renderChoiceCell(item, "false")}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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