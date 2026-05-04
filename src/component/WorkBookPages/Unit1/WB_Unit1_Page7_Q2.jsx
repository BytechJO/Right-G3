import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 2.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 3.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 4.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 5.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 6.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 7.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 8.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 9.svg";

const ITEMS = [
  {
    id: 1,
    type: "answer",
    question: "Which is bigger, the deer or the elephant?",
    leftImg: img1a,
    rightImg: img1b,
    options: [
      "The elephant is bigger than the deer.",
      "The deer is bigger than the elephant.",
    ],
    correct: "The elephant is bigger than the deer.",
  },

  {
    id: 2,
    type: "answer",
    question: "Who is taller, the girl or the man?",
    leftImg: img2a,
    rightImg: img2b,
    options: [
      "The man is taller than the girl.",
      "The girl is taller than the man.",
    ],
    correct: "The man is taller than the girl.",
  },

  {
    id: 3,
    type: "question",
    leftImg: img3a,
    rightImg: img3b,
    options: [
      "Which is faster, the bike or the car?",
      "Who is faster, the bike or the car?",
    ],
    correct: "Which is faster, the bike or the car?",
    fixedAnswer: "The car is faster than the bike.",
  },

  {
    id: 4,
    type: "answer",
    question: "Who is younger, John or Sarah?",
    leftImg: img4a,
    rightImg: img4b,
    options: ["Sarah is younger than John.", "John is younger than Sarah."],
    correct: "Sarah is younger than John.",
  },
];
export default function WB_Unit3_Page7_QJ() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, value) => {
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

  const renderSelect = (item) => (
    <div className="wb-j-select-wrap">
      <select
        value={answers[item.id] || ""}
        disabled={showAns}
        onChange={(e) => handleChange(item.id, e.target.value)}
        className={`wb-j-select ${
          answers[item.id] ? "wb-j-select--filled" : ""
        } ${isWrong(item) ? "wb-j-select--wrong" : ""}`}
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

      {!showAns && <span className="wb-j-arrow">▼</span>}
    </div>
  );

  return (
    <div className="main-container-component">
      <style>{`
        .wb-j-wrapper {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 8px 0 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .wb-j-row {
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr) clamp(220px, 24vw, 320px);
          gap: 18px;
          align-items: start;
          width: 100%;
        }

        .wb-j-num {
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          color: #222;
          // padding-top: 8px;
        }

        .wb-j-text-col {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wb-j-question {
          font-size: 18px;
          line-height: 1.35;
          color: #111;
          font-weight: 500;
        }

        .wb-j-line-wrap {
          position: relative;
          width: 100%;
        }

        .wb-j-line {
          width: 100%;
          min-height: 58px;
          // border-bottom: 3px solid #2f2f2f;
          display: flex;
          align-items: center;
          gap: clamp(6px, 1vw, 14px);
          flex-wrap: nowrap;
          padding-bottom: 6px;
          box-sizing: border-box;
          min-width: 0;
        }

        .wb-j-answer {
          font-size: 18px;
          line-height: 1.35;
          color: #111;
          // font-weight: 500;
        }
.wb-j-select--wrong {
  border-color: red !important;
}
        .wb-j-wrong {
          position: absolute;
          top: -7px;
          right: -7px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: red;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          box-sizing: border-box;
        }

        .wb-j-images {
    width: auto;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(10px, 2vw, 24px);
    padding-top: 4px;
    box-sizing: border-box;
}

        .wb-j-img-box {
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wb-j-img {
    display: block;
    width: 150px;
    height: 130px;
    /* max-height: clamp(120px, 17vw, 210px); */
    /* object-fit: contain; */
}

        .wb-j-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .wb-j-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          flex: 1 1 0;
          min-width: 0;
          max-width: 100%;
        }

        .wb-j-select-wrap--small {
          flex: 0 0 clamp(90px, 12vw, 120px);
        }

        .wb-j-select-wrap--medium {
          flex: 0 1 clamp(120px, 18vw, 190px);
        }

        .wb-j-select-wrap--large {
          flex: 0 1 clamp(150px, 24vw, 260px);
        }

        .wb-j-select {
          width: 100%;
          min-width: 0;
          height: clamp(38px, 4vw, 46px);
          border-bottom: 2px solid #c9c9c9;
          // border-radius: 10px;
          background: #fff;
          padding: 0 34px 0 12px;
          font-size: 18px;
          // font-weight: 500;
          color: #222;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;
          text-align-last: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .wb-j-select--filled {
          color: #222;
        }

        .wb-j-select:disabled {
          opacity: 1;
          cursor: default;
        }

        .wb-j-arrow {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          color: #666;
          pointer-events: none;
        }

        @media (max-width: 1100px) {
          .wb-j-row {
            grid-template-columns: 32px minmax(0, 1fr) minmax(180px, 260px);
            gap: 16px;
          }
          .wb-j-line { gap: 8px; }
        }

        @media (max-width: 980px) {
          .wb-j-row {
            grid-template-columns: 32px 1fr;
          }
          .wb-j-images {
            grid-column: 2 / 3;
            width: min(100%, 420px);
            min-height: auto;
            margin-top: 4px;
          }
        }

        @media (max-width: 768px) {
          .wb-j-wrapper { gap: 24px; }
          .wb-j-text-col { gap: 10px; }
          .wb-j-line {
            flex-wrap: wrap;
            align-items: center;
            min-height: auto;
            padding-bottom: 8px;
          }
          .wb-j-middle { white-space: normal; }
          .wb-j-select-wrap--small,
          .wb-j-select-wrap--medium,
          .wb-j-select-wrap--large { flex: 1 1 180px; }
          .wb-j-images {
            width: min(100%, 360px);
            gap: 14px;
          }
          .wb-j-img { max-height: 150px; }

          /* ✅ تصغير الخط على الشاشات المتوسطة */
          .wb-j-num,
          .wb-j-question,
          .wb-j-middle,
          .wb-j-answer,
          .wb-j-select { font-size: 18px; }
        }

        @media (max-width: 560px) {
          .wb-j-row {
            grid-template-columns: 28px 1fr;
            gap: 12px;
          }
          .wb-j-line { gap: 6px; }
          .wb-j-arrow {
            right: 10px;
            font-size: 11px;
          }
          .wb-j-images { width: min(100%, 280px); }
          .wb-j-img { max-height: 120px; }

          /* ✅ تصغير الخط على الشاشات الصغيرة */
          .wb-j-num,
          .wb-j-question,
          .wb-j-middle,
          .wb-j-answer,
          .wb-j-select { font-size: 15px; }

          .wb-j-select {
            height: 40px;
            padding: 0 30px 0 10px;
          }
        }
      `}</style>

      <div className="div-forall">
        <h1 className="WB-header-title-page8">
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
                    <div className="wb-j-line">{renderSelect(item)}</div>
                    {isWrong(item) && <div className="wb-j-wrong">✕</div>}
                  </div>
                </>
              ) : (
                <>
                  <div className="wb-j-line-wrap">
                    <div className="wb-j-line">{renderSelect(item)}</div>
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
