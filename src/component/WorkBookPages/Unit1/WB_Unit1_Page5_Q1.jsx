import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// عدلي المسارات حسب مشروعك
import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 2.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 3.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 4.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 5.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 6.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 7.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 8.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,
    rightImg: img1b,
    question: "Which one is lighter, the tiger or the cat?",
    middleText: "is lighter than",
    firstOptions: ["The tiger", "The cat"],
    lastOptions: ["the tiger", "the cat"],
    correctFirst: "The cat",
    correctLast: "the tiger",
  },
  {
    id: 2,
    leftImg: img2a,
    rightImg: img2b,
    question: "Which one is taller, the man or the boy?",
    middleText: "is taller than",
    firstOptions: ["The man", "The boy"],
    lastOptions: ["the man", "the boy"],
    correctFirst: "The man",
    correctLast: "the boy",
  },
  {
    id: 3,
    leftImg: img3a,
    rightImg: img3b,
    question: "Which one is faster, the skateboard or the car?",
    middleText: "is faster than",
    firstOptions: ["The skateboard", "The car"],
    lastOptions: ["the skateboard", "the car"],
    correctFirst: "The car",
    correctLast: "the skateboard",
  },
  {
    id: 4,
    leftImg: img4a,
    rightImg: img4b,
    question: "Which one is thinner, the tree or the flower?",
    middleText: "is thinner than",
    firstOptions: ["The tree", "The flower"],
    lastOptions: ["the tree", "the flower"],
    correctFirst: "The flower",
    correctLast: "the tree",
  },
];

export default function WB_Unit3_Page19_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, field, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));

    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id]?.first && answers[item.id]?.last
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      const isCorrect =
        answers[item.id]?.first === item.correctFirst &&
        answers[item.id]?.last === item.correctLast;

      if (isCorrect) score += 1;
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
    const filledAnswers = {};

    ITEMS.forEach((item) => {
      filledAnswers[item.id] = {
        first: item.correctFirst,
        last: item.correctLast,
      };
    });

    setAnswers(filledAnswers);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (item, field) => {
    if (!checked || showAns) return false;

    if (field === "first") {
      return answers[item.id]?.first !== item.correctFirst;
    }

    return answers[item.id]?.last !== item.correctLast;
  };

  const selectStyle = (wrong = false, hasValue = false) => ({
    height: "clamp(32px, 4vw, 42px)",
    minWidth: "clamp(92px, 18vw, 150px)",
    width: "clamp(92px, 18vw, 150px)",
    maxWidth: "100%",
    border: `2px solid ${wrong ? "#e53935" : "#c9c9c9"}`,
    borderRadius: "clamp(7px, 1vw, 10px)",
    background: "#fff",
    padding: "0 clamp(26px, 3vw, 38px) 0 clamp(8px, 1vw, 12px)",
    fontSize: "clamp(11px, 1.4vw, 18px)",
    fontWeight: "500",
    color: hasValue ? "#d62828" : "#333",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: showAns ? "default" : "pointer",
    boxSizing: "border-box",
    textAlignLast: "center",
    lineHeight: 1.1,
  });

  return (
    <div className="main-container-component">
      <style>{`
        .wb-e-wrap {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 8px 18px 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        .wb-e-title {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .wb-e-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(18px, 4vw, 54px);
          row-gap: clamp(18px, 3vw, 34px);
          align-items: start;
          width: 100%;
        }

        .wb-e-item {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.4vw, 14px);
          min-width: 0;
          width: 100%;
        }

        .wb-e-top {
          display: flex;
          gap: clamp(8px, 1vw, 14px);
          align-items: flex-start;
          min-width: 0;
          width: 100%;
        }

        .wb-e-num {
          min-width: clamp(16px, 2vw, 24px);
          font-size: clamp(16px, 1.8vw, 24px);
          font-weight: 700;
          color: #222;
          line-height: 1;
          padding-top: clamp(4px, 1vw, 8px);
          flex-shrink: 0;
        }

        .wb-e-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 12px);
          min-width: 0;
        }

        .wb-e-images {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: clamp(8px, 2vw, 22px);
          min-height: clamp(56px, 12vw, 120px);
          width: 100%;
        }

        .wb-e-img-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(56px, 12vw, 120px);
          min-width: 0;
        }

        .wb-e-img {
          max-width: 100%;
          max-height: clamp(56px, 12vw, 120px);
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-e-question {
          font-size: clamp(13px, 1.7vw, 20px);
          line-height: 1.25;
          color: #222;
          font-weight: 500;
          word-break: break-word;
        }

        .wb-e-answer-block {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 10px);
          width: 100%;
        }

        .wb-e-answer-line {
          border-bottom: 3px solid #4a4a4a;
          padding-bottom: clamp(4px, 0.8vw, 6px);
          min-height: clamp(34px, 6vw, 54px);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: clamp(6px, 1vw, 10px);
          width: 100%;
        }

        .wb-e-answer-line.second {
          min-height: 28px;
        }

        .wb-e-middle {
          font-size: clamp(11px, 1.4vw, 18px);
          font-weight: 500;
          color: #222;
          white-space: nowrap;
          line-height: 1.15;
        }

        .wb-e-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          max-width: 100%;
        }

        .wb-e-arrow {
          position: absolute;
          right: clamp(8px, 1vw, 12px);
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(9px, 1vw, 12px);
          color: #666;
          pointer-events: none;
        }

        .wb-e-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .wb-e-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .wb-e-wrap {
            padding: 8px 10px 20px;
          }

          .wb-e-question {
            font-size: clamp(12px, 3.6vw, 18px);
          }

          .wb-e-answer-line {
            align-items: flex-start;
          }

          .wb-e-middle {
            white-space: normal;
          }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
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
          <span className="WB-ex-A">E</span>
          Look and read. Answer the questions.
        </h1>

        <div className="wb-e-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-e-item">
              <div className="wb-e-top">
                <div className="wb-e-num">{item.id}</div>

                <div className="wb-e-content">
                  <div className="wb-e-images">
                    <div className="wb-e-img-box">
                      <img
                        src={item.leftImg}
                        alt={`left-${item.id}`}
                        className="wb-e-img"
                      />
                    </div>

                    <div className="wb-e-img-box">
                      <img
                        src={item.rightImg}
                        alt={`right-${item.id}`}
                        className="wb-e-img"
                      />
                    </div>
                  </div>

                  <div className="wb-e-question">{item.question}</div>

                  <div className="wb-e-answer-block">
                    <div className="wb-e-answer-line">
                      <div className="wb-e-select-wrap">
                        <select
                          value={answers[item.id]?.first || ""}
                          disabled={showAns}
                          onChange={(e) =>
                            handleSelect(item.id, "first", e.target.value)
                          }
                          style={selectStyle(
                            isWrong(item, "first"),
                            !!answers[item.id]?.first
                          )}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {item.firstOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {!showAns && <span className="wb-e-arrow">▼</span>}
                      </div>

                      <span className="wb-e-middle">{item.middleText}</span>

                      <div className="wb-e-select-wrap">
                        <select
                          value={answers[item.id]?.last || ""}
                          disabled={showAns}
                          onChange={(e) =>
                            handleSelect(item.id, "last", e.target.value)
                          }
                          style={selectStyle(
                            isWrong(item, "last"),
                            !!answers[item.id]?.last
                          )}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>
                          {item.lastOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {!showAns && <span className="wb-e-arrow">▼</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wb-e-buttons">
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