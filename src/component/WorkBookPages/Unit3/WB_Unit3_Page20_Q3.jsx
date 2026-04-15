import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const ITEMS = [
  {
    id: 1,
    options: ["chin", "shin"],
    correct: "chin",
  },
  {
    id: 2,
    options: ["patch", "sash"],
    correct: "patch",
  },
  {
    id: 3,
    options: ["lash", "latch"],
    correct: "latch",
  },
  {
    id: 4,
    options: ["cheat", "sheet"],
    correct: "cheat",
  },
  {
    id: 5,
    options: ["chop", "shop"],
    correct: "shop",
  },
  {
    id: 6,
    options: ["dish", "ditch"],
    correct: "dish",
  },
];

export default function WB_Unit3_Page18_QC() {
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
      ValidationAlert.info("Please answer all words first.");
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

  const isWrong = (item, option) => {
    if (!showResults) return false;
    return answers[item.id] === option && option !== item.correct;
  };

  const isSelected = (item, option) => {
    if (showAns) return item.correct === option;
    return answers[item.id] === option;
  };

  const renderOption = (item, option) => {
    const selected = isSelected(item, option);
    const wrong = isWrong(item, option);

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "118px",
          minHeight: "54px",
          padding: "6px 18px",
          borderRadius: "999px",
          border: selected ? "4px solid #d62828" : "2px solid transparent",
          background: "transparent",
          color: "#222",
          fontSize: "24px",
          fontWeight: "500",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
          lineHeight: "1.1",
        }}
      >
        {option}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
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
      <style>{`
        .wb-c-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 22px !important;
          width: 100% !important;
          max-width: 1120px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-c-title-row {
          display: flex !important;
          align-items: center !important;
          gap: 14px !important;
          flex-wrap: wrap !important;
        }

        .wb-c-listen-disc {
          width: 42px !important;
          height: 42px !important;
          border-radius: 50% !important;
          background: #e9e9e9 !important;
          border: 1px solid #d5d5d5 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 20px !important;
          font-weight: 700 !important;
          color: #222 !important;
          flex-shrink: 0 !important;
        }

        .wb-c-grid {
          display: grid !important;
          grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
          column-gap: 18px !important;
          row-gap: 18px !important;
          width: 100% !important;
          align-items: start !important;
        }

        .wb-c-item {
          display: flex !important;
          align-items: flex-start !important;
          gap: 10px !important;
          min-width: 0 !important;
        }

        .wb-c-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
          min-width: 18px !important;
          margin-top: 10px !important;
        }

        .wb-c-card {
          width: 126px !important;
          min-height: 138px !important;
          border: 2px solid #a9a9a9 !important;
          border-radius: 18px !important;
          background: #fff !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-evenly !important;
          align-items: center !important;
          padding: 10px 8px !important;
          box-sizing: border-box !important;
        }

        .wb-c-divider {
          width: 100% !important;
          height: 1px !important;
          background: transparent !important;
        }

        .wb-c-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 1200px) {
          .wb-c-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 700px) {
          .wb-c-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 500px) {
          .wb-c-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
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
        <h1    className="WB-header-title-page8"
          style={{
            margin: 0,
          }}>
          <span className="WB-ex-A">C</span> Listen, read, and circle.
        </h1>
      

        <div className="wb-c-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c-item">
              <div className="wb-c-num">{item.id}</div>

              <div className="wb-c-card">
                {item.options.map((option) => (
                  <React.Fragment key={option}>
                    {renderOption(item, option)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-c-buttons">
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