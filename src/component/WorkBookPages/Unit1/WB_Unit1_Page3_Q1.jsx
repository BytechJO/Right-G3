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

  const isSelectedCell = (item, choice) => answers[item.id] === choice;

  const shouldShowCheck = (item, choice) => {
    if (showAns) return item.correct === choice;
    return answers[item.id] === choice;
  };

  const renderBookCheck = () => {
    return (
      <svg
        viewBox="0 0 24 24"
        style={{
          width: "clamp(30px, 3vw, 52px)",
          height: "clamp(30px, 3vw, 52px)",
          transform: "rotate(-10deg)",
          display: "inline-block",
          pointerEvents: "none",
        }}
      >
        <path
          d="M4 13 L9 18 L20 5"
          stroke="#d62020"
          strokeWidth="3.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderChoiceCell = (item, choice) => {
    const selected = isSelectedCell(item, choice);
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
          background: selected && !checked ? "#fafafa" : "#fff",
          padding: 0,
          height: "68px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {showCheck && renderBookCheck()}
        </div>

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
              lineHeight: 1,
            }}
          >
            ✕
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="main-container-component">
      <style>
        {`
          .main-container-component {
            width: 100%;
            min-width: 0;
          }

          .div-forall {
            width: 100%;
            min-width: 0;
          }

          .exercise-table-outer {
            width: 100%;
            min-width: 0;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
          }

          .exercise-table-inner {
            width: 100%;
            min-width: 760px;
            max-width: 1188px;
            margin: 0 auto;
            border: 2px solid #a6a6a6;
            border-radius: 18px;
            overflow: hidden;
            background: #fff;
          }

          .exercise-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
          }

          .exercise-title-cell {
            border-top: 2px solid #a6a6a6;
            padding: 0 18px 0 20px;
            height: 68px;
            font-size: clamp(18px, 2.2vw, 28px);
            color: #222;
            vertical-align: middle;
            line-height: 1.15;
            word-break: break-word;
          }

          .exercise-number {
            font-weight: 700;
            display: inline-block;
            min-width: 28px;
            margin-right: 14px;
          }

          @media (max-width: 1024px) {
            .exercise-table-inner {
              min-width: 720px;
            }
          }

          @media (max-width: 900px) {
            .exercise-table-inner {
              min-width: 680px;
            }

            .exercise-title-cell {
              font-size: 20px;
              padding: 0 14px 0 16px;
            }
          }

          @media (max-width: 768px) {
            .exercise-table-inner {
              min-width: 640px;
            }

            .exercise-title-cell {
              font-size: 18px;
              height: 64px;
              padding: 0 12px 0 14px;
            }
          }

          @media (max-width: 600px) {
            .exercise-table-inner {
              min-width: 580px;
            }

            .exercise-title-cell {
              font-size: 16px;
              line-height: 1.2;
            }

            .exercise-number {
              min-width: 22px;
              margin-right: 10px;
            }
          }
        `}
      </style>

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

        <div className="exercise-table-outer">
          <div className="exercise-table-inner">
            <table className="exercise-table">
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
                    <td className="exercise-title-cell">
                      <span className="exercise-number">{item.id}</span>
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
            flexWrap: "wrap",
            gap: "10px",
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