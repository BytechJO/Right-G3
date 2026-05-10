import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 4.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 2.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 3.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: img1a,

    question: "Which one is lighter, the tiger or the cat?",
    options: [
      "The cat is lighter than the tiger",
      "The tiger is lighter than the cat",
    ],
    correct: "The cat is lighter than the tiger",
  },
  {
    id: 2,
    leftImg: img1b,

    question: "Which one is taller, the man or the boy?",
    options: [
      "The man is taller than the boy",
      "The boy is taller than the man",
    ],
    correct: "The man is taller than the boy",
  },
  {
    id: 3,
    leftImg: img2a,

    question: "Which one is faster, the skateboard or the car?",
    options: [
      "The car is faster than the skateboard",
      "The skateboard is faster than the car",
    ],
    correct: "The car is faster than the skateboard",
  },
  {
    id: 4,
    leftImg: img2b,

    question: "Which one is thinner, the tree or the flower?",
    options: [
      "The flower is thinner than the tree",
      "The tree is thinner than the flower",
    ],
    correct: "The flower is thinner than the tree",
  },
];

export default function WB_Unit3_Page19_QE() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns || checked) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns || checked) return;
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

  const isWrong = (item) => {
    if (!checked || showAns) return false;
    return answers[item.id] !== item.correct;
  };
  return (
    <div className="main-container-component">
      <style>{`
        .wb-e-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(18px, 4vw, 54px);
          row-gap: 25px;
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
          // height: 265px
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
          // flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
              // height: 100%;
    // justify-content: space-between;
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
          // max-width: 100%;
          // max-height: clamp(56px, 12vw, 120px);
          width: auto;
          height: 110px;
          object-fit: contain;
          display: block;
        }

        .wb-e-question {
          font-size: clamp(13px, 1.6vw, 17px);
          line-height: 1.3;
          color: #222;
          height: 40px;
          
          // font-weight: 500;
          word-break: break-word;
        }

        .wb-e-answer-block {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 10px);
          width: 100%;
          min-width: 0;
        }

        .wb-e-answer-line {
          // border-bottom: 2px solid #c9c9c9;
          padding-bottom: clamp(4px, 0.8vw, 6px);
          min-height: clamp(34px, 6vw, 54px);
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: clamp(4px, 0.8vw, 8px);
          width: 100%;
          min-width: 0;
          // overflow: hidden;
        }

        .wb-e-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
        }

        .wb-e-select {
          width: 100%;
          height: clamp(32px, 3.2vw, 42px);
          min-width: 0;
          border-bottom: 2px solid #c9c9c9;
          // border-radius: clamp(7px, 1vw, 10px);
          background: #fff;
          padding: 0 clamp(20px, 2.2vw, 32px) 0 clamp(6px, 0.8vw, 10px);
          font-size: clamp(10px, 1.5vw, 17px);
          // font-weight: 500;
          color: #333;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          box-sizing: border-box;
          line-height: 1.1;
          // text-align: center;
          // text-align-last: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }



.wb-e-wrong-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: red;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  z-index: 2;
}
        .wb-e-select.has-value {
          color: #000000ff;
        }

        .wb-e-select.wrong {
          border-color: red;
        }

        .wb-e-select:disabled {
          cursor: default;
        }

        .wb-e-arrow {
          position: absolute;
          right: clamp(5px, 0.7vw, 10px);
          top: 50%;
          transform: translateY(-50%);
          font-size: clamp(8px, 0.9vw, 9px);
          color: #666;
          pointer-events: none;
        }

        .wb-e-middle {
          font-size: clamp(10px, 1.6vw, 20px);
          // font-weight: 500;
          color: #222;
          line-height: 1.2;
          flex-shrink: 0;
          white-space: nowrap;
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

          .wb-e-answer-line {
            flex-wrap: nowrap;
          }

          .wb-e-middle {
            font-size: clamp(12px, 2vw, 18px);
          }

          .wb-e-select {
            font-size: clamp(12px, 2vw, 16px);
          }
        }

        @media (max-width: 600px) {
          .wb-e-answer-line {
            flex-wrap: wrap;
          }

          .wb-e-select-wrap {
            flex: 1 1 40%;
          }

          .wb-e-middle {
            width: 100%;
            text-align: center;
            font-size: 15px;
          }

          .wb-e-select {
            font-size: 13px;
            height: 36px;
          }
        }

        @media (max-width: 420px) {
          .wb-e-answer-line {
            flex-direction: column;
            align-items: stretch;
          }

          .wb-e-select-wrap {
            width: 100%;
            flex: 1 1 auto;
          }
        }
      `}</style>

      <div className="div-forall" style={{gap:"25px"}}>
        <h1 className="WB-header-title-page8">
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
                    <img
                      src={item.leftImg}
                      alt={`left-${item.id}`}
                      className="wb-e-img"
                    />
                  </div>

                  <div className="wb-e-question">{item.question}</div>

                  <div className="wb-e-answer-block">
                    <div className="wb-e-answer-line">
                      <div className="wb-e-select-wrap">
                        <select
                          value={answers[item.id] || ""}
                          disabled={showAns}
                          onChange={(e) =>
                            handleSelect(item.id, e.target.value)
                          }
                          className={`wb-e-select 
      ${isWrong(item) ? "wrong" : ""} 
      ${answers[item.id] ? "has-value" : ""}`}
                        >
                          <option value="" disabled hidden>
                            Select
                          </option>

                          {item.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        {!showAns && <span className="wb-e-arrow">▼</span>}

                        {/* ❌ WRONG BADGE */}
                        {isWrong(item) && (
                          <div className="wb-e-wrong-badge">✕</div>
                        )}
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
