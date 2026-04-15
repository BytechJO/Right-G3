import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex J  4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: [
      "She has a few apples in the bowl.",
      "She has a little apples in the bowl.",
    ],
    correct: "She has a few apples in the bowl.",
  },
  {
    id: 2,
    img: img2,
    options: [
      "She has a few water in the glass.",
      "She has a little water in the glass.",
    ],
    correct: "She has a little water in the glass.",
  },
  {
    id: 3,
    img: img3,
    options: [
      "There is a few chicken on the plate.",
      "There is a little chicken on the plate.",
    ],
    correct: "There is a little chicken on the plate.",
  },
  {
    id: 4,
    img: img4,
    options: [
      "They have a few cookies on the plate.",
      "They have a little cookies on the plate.",
    ],
    correct: "They have a few cookies on the plate.",
  },
];

export default function WB_Unit3_Page17_QJ() {
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
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
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

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrong = isWrong(item) && selected;
    const showCorrectAsSelected = showAns && item.correct === option;

    return (
      <div
        onClick={() => handleSelect(item.id, option)}
        className={`j-option ${
          selected || showCorrectAsSelected ? "selected" : ""
        } ${wrong ? "wrong" : ""} ${showAns ? "disabled" : ""}`}
      >
        {option}

        {wrong && <div className="j-wrong-mark">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-j-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 20px !important;
          width: 100% !important;
          max-width: 1120px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
        }

        .wb-j-title {
          margin: 0 !important;
        }

        .wb-j-grid {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          column-gap: 34px !important;
          row-gap: 22px !important;
          align-items: start !important;
          width: 100% !important;
        }

        .wb-j-card {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          width: 100% !important;
        }

        .wb-j-number {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
          margin: 0 0 8px 0 !important;
        }

        .wb-j-img-frame {
          width: 100% !important;
          max-width: 420px !important;
          height: 150px !important;
          border: 2px solid #a9a9a9 !important;
          border-radius: 14px !important;
          background: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
          margin-bottom: 10px !important;
        }

        .wb-j-img {
          max-width: 100% !important;
          max-height: 100% !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-j-options {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px !important;
          width: 100% !important;
          padding-left: 0 !important;
        }

        .j-option {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          width: fit-content !important;
          max-width: 100% !important;
          padding: 5px 16px !important;
          border-radius: 999px !important;
          border: 2px solid transparent !important;
          background: transparent !important;
          color: #111 !important;
          font-size: 18px !important;
          line-height: 1.35 !important;
          cursor: pointer !important;
          user-select: none !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
          white-space: normal !important;
          word-break: break-word !important;
        }

        .j-option.selected {
          border: 2px solid #d62828 !important;
        }

        .j-option.wrong {
          border: 2px solid #ef4444 !important;
        }

        .j-option.disabled {
          cursor: default !important;
        }

        .j-wrong-mark {
          position: absolute !important;
          top: -10px !important;
          right: -10px !important;
          width: 22px !important;
          height: 22px !important;
          border-radius: 50% !important;
          background: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18) !important;
          box-sizing: border-box !important;
        }

        .wb-j-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 4px !important;
        }

        @media (max-width: 900px) {
          .wb-j-grid {
            grid-template-columns: 1fr !important;
            row-gap: 18px !important;
          }

          .wb-j-img-frame {
            max-width: 100% !important;
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
      >     <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A"> J </span> Read, look, and circle.
        </h1>

        <div className="wb-j-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-j-card">
              <div className="wb-j-number">{item.id}</div>

              <div className="wb-j-img-frame">
                <img src={item.img} alt={`question-${item.id}`} className="wb-j-img" />
              </div>

              <div className="wb-j-options">
                {item.options.map((option) => (
                  <div key={option}>{renderOption(item, option)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-j-buttons">
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