import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import left1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 1.svg";
import right1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 2.svg";
import left2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 3.svg";
import right2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 4.svg";
import left3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 5.svg";
import right3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 6.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: left1,
    rightImg: right1,
    correct: "autumn",
    selectPos: {
      top: "66%",
      left: "19%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    id: 2,
    leftImg: left2,
    rightImg: right2,
    correct: "spring",
    selectPos: {
      top: "75%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    id: 3,
    leftImg: left3,
    rightImg: right3,
    correct: "summer",
    selectPos: {
      top: "72%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
];
const OPTIONS = ["spring", "summer", "autumn", "winter"];

export default function WB_Unit3_Page24_QG() {
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
      ValidationAlert.info("Please complete all answers first.");
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
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

  const bubbleBase = {
    position: "relative",
    background: "#fff",
    border: "2px solid #444",
    borderRadius: "12px",
    boxSizing: "border-box",
  };

  return (
    <div className="main-container-component">
      <style>{`
  .wb-g24-wrapper {
    display: flex;
    flex-direction: column;
    gap: 28px;
   
    margin: 0 auto;
    padding: 8px 14px 20px;
    box-sizing: border-box;
  }

  .wb-g24-title {
    margin: 0;
  }

  .wb-g24-list {
    display: flex;
    flex-direction: column;
    gap: 34px;
    width: 100%;
  }

  .wb-g24-row {
    display: flex;
  
    gap: 16px;
    align-items: center;
    width: 100%;
  }

  .wb-g24-num {
    font-size: 22px;
    font-weight: 700;
    color: #222;
    align-self: start;
    padding-top: 34px;
  }

  .wb-g24-side-img {
    width: auto;
    height: 180px;
    object-fit: contain;
    display: block;
  }


  .wb-g24-answer-text {
    font-size: 18px;
    color: #222;
    white-space: nowrap;
  }

  .wb-g24-select {
    border: none;
    outline: none;
    background: transparent;
    font-size: 18px;
    color: #000000ff;
    border-bottom: 1px solid #444;
    padding: 0 20px 2px 2px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    min-width: 92px;
    cursor: pointer;
    text-transform: lowercase;
  }

  .wb-g24-select:disabled {
    cursor: default;
    opacity: 1;
  }

  .wb-g24-select-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .wb-g24-arrow {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #666;
    pointer-events: none;
  }

  .wb-g24-wrong {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ef4444;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  }

  .wb-g24-buttons {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .wb-g24-row {
      grid-template-columns: 1fr;
    }

    .wb-g24-num {
      padding-top: 0;
    }

    .wb-g24-middle {
      order: 2;
    }

    .wb-g24-side-left {
      order: 1;
    }

    .wb-g24-side-right {
      order: 3;
    }
  }
`}</style>
      <div
        className="div-forall"
        style={{
        
          gap: "28px",
       
        }}
      >
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">G</span>
          Read and complete the conversations.
        </h1>

        <div className="wb-g24-list">
          {ITEMS.map((item) => {
            const value = answers[item.id] || "";

            return (
              <div key={item.id} className="wb-g24-row">
                <div className="wb-g24-num">{item.id}</div>

                <img src={item.leftImg} alt="" className="wb-g24-side-img" />

                <div className="wb-g24-side-right">
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={item.rightImg}
                      alt=""
                      className="wb-g24-side-img"
                    />

                    <div
                      className="wb-g24-select-wrap"
                      style={{
                        position: "absolute",
                        ...item.selectPos,
                      }}
                    >
                      <select
                        value={value}
                        disabled={showAns}
                        onChange={(e) => handleSelect(item.id, e.target.value)}
                        className="wb-g24-select"
                      >
                        <option value="" disabled>
                          select
                        </option>
                        {OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      {!showAns && <span className="wb-g24-arrow">▼</span>}
                    </div>
                  </div>
                  {isWrong(item) && <div className="wb-g24-wrong">✕</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="wb-g24-buttons">
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
