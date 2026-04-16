import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 2.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 3.svg"
import img2a from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 4.svg"
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 5.svg"
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 6.svg"
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 7.svg"
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 8.svg"
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 9.svg"

const ITEMS = [
  {
    id: 1,
    type: "answer",
    question: "Which is bigger, the deer or the elephant?",
    leftImg: img1a,
    rightImg: img1b,
    firstOptions: ["The elephant", "The deer"],
    middle: "is bigger than",
    lastOptions: ["the deer.", "the elephant."],
    correctFirst: "The elephant",
    correctLast: "the deer.",
  },
  {
    id: 2,
    type: "answer",
    question: "Who is taller, the girl or the man?",
    leftImg: img2a,
    rightImg: img2b,
    firstOptions: ["The man", "The girl"],
    middle: "is taller than",
    lastOptions: ["the girl.", "the man."],
    correctFirst: "The man",
    correctLast: "the girl.",
  },
  {
    id: 3,
    type: "question",
    leftImg: img3a,
    rightImg: img3b,
    firstOptions: ["Which", "Who"],
    middle: "is faster,",
    lastOptions: ["the bike or the car?", "the car or the bike?"],
    correctFirst: "Which",
    correctLast: "the bike or the car?",
    fixedAnswer: "The car is faster than the bike.",
  },
  {
    id: 4,
    type: "answer",
    question: "Who is younger, John or Sarah?",
    leftImg: img4a,
    rightImg: img4b,
    firstOptions: ["Sarah", "John"],
    middle: "is younger than",
    lastOptions: ["John.", "Sarah."],
    correctFirst: "Sarah",
    correctLast: "John.",
  },
];

export default function WB_Unit3_Page7_QJ() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, field, value) => {
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
      const firstCorrect = answers[item.id]?.first === item.correctFirst;
      const lastCorrect = answers[item.id]?.last === item.correctLast;

      if (firstCorrect && lastCorrect) score += 1;
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
      filled[item.id] = {
        first: item.correctFirst,
        last: item.correctLast,
      };
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

  const getValue = (itemId, field) => answers[itemId]?.[field] || "";

  const isWrong = (item) => {
    if (!checked || showAns) return false;

    return (
      answers[item.id]?.first !== item.correctFirst ||
      answers[item.id]?.last !== item.correctLast
    );
  };

  const renderSelect = (item, field, options, minWidth) => (
    <div
      style={{
        position: "relative",
        minWidth,
        width: "fit-content",
        maxWidth: "100%",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <select
        value={getValue(item.id, field)}
        disabled={showAns}
        onChange={(e) => handleChange(item.id, field, e.target.value)}
        style={{
          width: "100%",
          minWidth,
          maxWidth: "100%",
          height: "44px",
          border: "none",
          outline: "none",
          background: "transparent",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          color: "#d62828",
          fontSize: "clamp(24px, 2vw, 32px)",
          fontWeight: "500",
          lineHeight: "1.1",
          textAlign: "center",
          textAlignLast: "center",
          padding: "0 26px 0 8px",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
        }}
      >
        <option value="" disabled hidden>
          —
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {!showAns && (
        <span
          style={{
            position: "absolute",
            right: "4px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "12px",
            color: "#777",
            pointerEvents: "none",
          }}
        >
          ▼
        </span>
      )}
    </div>
  );

  return (
    <div className="main-container-component">
      <style>{`
        .wb-j-wrapper {
          width: 100% !important;
          max-width: 1180px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 28px !important;
        }

        .wb-j-title {
          margin: 0 !important;
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
          flex-wrap: wrap !important;
        }

        .wb-j-row {
          display: grid !important;
          grid-template-columns: 36px minmax(0, 1fr) clamp(220px, 24vw, 320px) !important;
          gap: 18px !important;
          align-items: start !important;
          width: 100% !important;
        }

        .wb-j-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          color: #222 !important;
          padding-top: 8px !important;
        }

        .wb-j-text-col {
          min-width: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 12px !important;
        }

        .wb-j-question {
          font-size: clamp(24px, 2vw, 30px) !important;
          line-height: 1.35 !important;
          color: #111 !important;
          font-weight: 500 !important;
        }

        .wb-j-line-wrap {
          position: relative !important;
          width: 100% !important;
        }

        .wb-j-line {
          width: 100% !important;
          min-height: 56px !important;
          border-bottom: 3px solid #2f2f2f !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          flex-wrap: wrap !important;
          padding-bottom: 4px !important;
          box-sizing: border-box !important;
        }

        .wb-j-middle {
          font-size: clamp(24px, 2vw, 32px) !important;
          line-height: 1.2 !important;
          color: #111 !important;
          font-weight: 500 !important;
        }

        .wb-j-answer {
          font-size: clamp(24px, 2vw, 30px) !important;
          line-height: 1.35 !important;
          color: #111 !important;
          font-weight: 500 !important;
        }

        .wb-j-wrong {
          position: absolute !important;
          top: -7px !important;
          right: -7px !important;
          width: 22px !important;
          height: 22px !important;
          border-radius: 999px !important;
          background: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
          box-sizing: border-box !important;
        }

        .wb-j-images {
          width: 100% !important;
          min-height: clamp(140px, 18vw, 220px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: clamp(10px, 2vw, 24px) !important;
          padding-top: 4px !important;
          box-sizing: border-box !important;
        }

        .wb-j-img-box {
          flex: 1 1 0 !important;
          min-width: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .wb-j-img {
          display: block !important;
          width: 100% !important;
          height: auto !important;
          max-height: clamp(120px, 17vw, 210px) !important;
          object-fit: contain !important;
        }

        .wb-j-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 4px !important;
        }

        @media (max-width: 980px) {
          .wb-j-row {
            grid-template-columns: 36px 1fr !important;
          }

          .wb-j-images {
            grid-column: 2 / 3 !important;
            width: min(100%, 420px) !important;
            min-height: auto !important;
            margin-left: 0 !important;
            margin-top: 2px !important;
          }
        }

        @media (max-width: 640px) {
          .wb-j-wrapper {
            gap: 22px !important;
          }

          .wb-j-line {
            gap: 6px !important;
          }

          .wb-j-images {
            width: min(100%, 320px) !important;
            gap: 12px !important;
          }

          .wb-j-img {
            max-height: 140px !important;
          }
        }
      `}</style>

      <div className="wb-j-wrapper">
        <h1 className="WB-header-title-page8 wb-j-title">
          <span className="WB-ex-A">J</span>
          Read and look. Write the questions or answers.
        </h1>

        {ITEMS.map((item) => (
          <div key={item.id} className="wb-j-row">
            <div className="wb-j-num">{item.id}</div>

            <div className="wb-j-text-col">
              {item.type === "answer" ? (
                <>
                  <div className="wb-j-question">{item.question}</div>

                  <div className="wb-j-line-wrap">
                    <div className="wb-j-line">
                      {renderSelect(item, "first", item.firstOptions, "190px")}
                      <span className="wb-j-middle">{item.middle}</span>
                      {renderSelect(item, "last", item.lastOptions, "170px")}
                    </div>

                    {isWrong(item) && <div className="wb-j-wrong">✕</div>}
                  </div>
                </>
              ) : (
                <>
                  <div className="wb-j-line-wrap">
                    <div className="wb-j-line">
                      {renderSelect(item, "first", item.firstOptions, "120px")}
                      <span className="wb-j-middle">{item.middle}</span>
                      {renderSelect(item, "last", item.lastOptions, "280px")}
                    </div>

                    {isWrong(item) && <div className="wb-j-wrong">✕</div>}
                  </div>

                  <div className="wb-j-answer">{item.fixedAnswer}</div>
                </>
              )}
            </div>

            <div className="wb-j-images">
              <div className="wb-j-img-box">
                <img
                  src={item.leftImg}
                  alt={`left-${item.id}`}
                  className="wb-j-img"
                />
              </div>

              <div className="wb-j-img-box">
                <img
                  src={item.rightImg}
                  alt={`right-${item.id}`}
                  className="wb-j-img"
                />
              </div>
            </div>
          </div>
        ))}

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