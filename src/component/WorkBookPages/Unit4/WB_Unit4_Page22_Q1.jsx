import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    sentence: "It’s the 7th month of the year.",
    correct: "July",
  },
  {
    id: 2,
    sentence: "It’s the 2nd month of the year.",
    correct: "February",
  },
  {
    id: 3,
    sentence: "It’s the 5th month of the year.",
    correct: "May",
  },
  {
    id: 4,
    sentence: "It’s the 3rd month of the year.",
    correct: "March",
  },
  {
    id: 5,
    sentence: "It’s the 9th month of the year.",
    correct: "September",
  },
  {
    id: 6,
    sentence: "It’s the 12th month of the year.",
    correct: "December",
  },
];

const OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function WB_Unit3_Page20_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelectChange = (id, value) => {
    if (showAns ||showResults) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns ||showResults) return;

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
    const filledAnswers = {};

    ITEMS.forEach((item) => {
      filledAnswers[item.id] = item.correct;
    });

    setAnswers(filledAnswers);
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

  return (
    <div className="main-container-component">
      <style>{`
  .wb-months-wrapper {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 8px 14px 20px;
    box-sizing: border-box;
  }

  .wb-months-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }

  .wb-months-row {
    display: flex;
  
    gap: 16px;
    align-items: center;
    width: 100%;
  }

  .wb-months-num {
    font-size: 20px;
    font-weight: 700;
    color: #222;
    line-height: 1;
  }

  .wb-months-sentence {
    font-size: 18px;
    color: #111;
    line-height: 1.4;
    width:60%
  }

  .wb-months-answer-wrap {
    position: relative;
    width: 60%;
    display: flex;
  }

  .wb-months-select {
    width: 100%;
    min-height: 54px;
    font-size: 18px;
    color: #000000ff;
    border: none;
    border-bottom: 1px solid #222;
    outline: none;
    background: transparent;
    padding: 0 34px 2px 8px;
    text-align: center;
    text-align-last: center;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-sizing: border-box;
    cursor: pointer;
  }

  .wb-months-select:disabled {
    opacity: 1;
    cursor: default;
  }

  .wb-months-arrow {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #666;
    pointer-events: none;
  }

  .wb-months-wrong {
    position: absolute;
    top: 6px;
    right: -8px;
       width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: red;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
  }

  .wb-months-buttons {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .wb-months-row {
      grid-template-columns: 34px 1fr;
    }

    .wb-months-answer-wrap {
      grid-column: 2 / 3;
    }
  }
`}</style>

      <div
        className="div-forall"
        style={{
          
          gap: "45px",
       
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span className="WB-ex-A">C</span> Read and write.
        </h1>
        <div className="wb-months-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-months-row">
              <div className="wb-months-num">{item.id}</div>

              <div className="wb-months-sentence">{item.sentence}</div>

              <div className="wb-months-answer-wrap">
                <select
                  className="wb-months-select"
                  value={answers[item.id] || ""}
                  disabled={showAns ||showResults}
                  onChange={(e) => handleSelectChange(item.id, e.target.value)}
                  style={{borderBottom:isWrong(item) ? "2px solid red":"1px solid #222"}}
                >
                  <option value="" disabled>
                    Select month
                  </option>

                  {OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {!showAns && <div className="wb-months-arrow">▼</div>}

                {isWrong(item) && <div className="wb-months-wrong">✕</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-months-buttons">
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
