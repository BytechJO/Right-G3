import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  6.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["sh", "tch"],
    correct: "sh",
  },
  {
    id: 2,
    img: img2,
    options: ["ch", "sh"],
    correct: "ch",
  },
  {
    id: 3,
    img: img3,
    options: ["tch", "ch"],
    correct: "ch",
  },
  {
    id: 4,
    img: img4,
    options: ["sh", "ch"],
    correct: "ch",
  },
  {
    id: 5,
    img: img5,
    options: ["ch", "sh"],
    correct: "sh",
  },
];

export default function WB_Unit3_Page18_QD() {
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
      ValidationAlert.info("Please answer all pictures first.");
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
          minWidth: "84px",
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
        .wb-d-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 22px !important;
          width: 100% !important;
          max-width: 1120px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-d-grid {
          display: grid !important;
          grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          column-gap: 22px !important;
          row-gap: 20px !important;
          width: 100% !important;
          align-items: start !important;
        }

        .wb-d-item {
          display: flex !important;
          align-items: flex-start !important;
          gap: 10px !important;
          min-width: 0 !important;
        }

        .wb-d-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
          min-width: 18px !important;
          margin-top: 10px !important;
        }

        .wb-d-body {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 10px !important;
        }

        .wb-d-img-frame {
          width: 140px !important;
          height: 96px !important;
          border: 2px solid #f39b42 !important;
          border-radius: 18px !important;
          background: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }

        .wb-d-img {
          max-width: 100% !important;
          max-height: 100% !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-d-options {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 6px !important;
        }

        .wb-d-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 1200px) {
          .wb-d-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 700px) {
          .wb-d-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 500px) {
          .wb-d-grid {
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
          <span className="WB-ex-A">D</span> Does it have ch, tch, or sh sound? Look and circle.
        </h1>
      
        <div className="wb-d-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-d-item">
              <div className="wb-d-num">{item.id}</div>

              <div className="wb-d-body">
                <div className="wb-d-img-frame">
                  <img src={item.img} alt={`item-${item.id}`} className="wb-d-img" />
                </div>

                <div className="wb-d-options">
                  {item.options.map((option) => (
                    <React.Fragment key={option}>
                      {renderOption(item, option)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wb-d-buttons">
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