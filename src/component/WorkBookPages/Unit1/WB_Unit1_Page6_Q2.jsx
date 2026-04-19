import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/0000.svg";
import img3 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00000.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 12.svg";;

const WORDS = [
  { id: 1, text: " scoreboard" },
  { id: 2, text: "referee" },
  { id: 3, text: "whistle" },
  { id: 4, text: "bike" },
];

const IMAGES = [
  { id: 1, img: img1, alt: "scoreboard" },
  { id: 2, img: img2, alt: "referee" },
  { id: 3, img: img3, alt: "whistle" },
  { id: 4, img: img4, alt: "bike" },
];

const CORRECT_ANSWERS = {
  1: 1, // scoreboard
  2: 2, // referee
  3: 3, // whistle
  4: 4, // bike
};

const DRAG_NUMBERS = [1, 2, 3, 4];

export default function WB_Vocabulary_Page213_H() {
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedNumbers = useMemo(() => Object.values(imageAnswers), [imageAnswers]);

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (imageId) => {
    if (showAns || draggedNumber === null) return;

    setImageAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === draggedNumber) {
          delete updated[key];
        }
      });

      updated[imageId] = draggedNumber;
      return updated;
    });

    setDraggedNumber(null);
  };

  const handleRemoveNumber = (imageId) => {
    if (showAns) return;

    setImageAnswers((prev) => {
      const updated = { ...prev };
      delete updated[imageId];
      return updated;
    });
  };

  const getScore = () => {
    let score = 0;

    IMAGES.forEach((item) => {
      if (imageAnswers[item.id] === CORRECT_ANSWERS[item.id]) {
        score += 1;
      }
    });

    return score;
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = IMAGES.every((item) => imageAnswers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = IMAGES.length;
    const score = getScore();

    setChecked(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    setImageAnswers(CORRECT_ANSWERS);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setImageAnswers({});
    setDraggedNumber(null);
    setChecked(false);
    setShowAns(false);
  };

  const isImageWrong = (imageId) => {
    if (!checked) return false;
    return imageAnswers[imageId] !== CORRECT_ANSWERS[imageId];
  };

  const getWordById = (id) => WORDS.find((item) => item.id === id)?.text || "";

  return (
    <div className="main-container-component">
      <div className="wb-page213-wrapper">
        <h1 className="WB-header-title-page8 wb-main-title">
          <span className="wb-unit-badge">H</span>
          Read, look, and number.
        </h1>

        <div className="wb-content-grid">
          {/* Left side words */}
          <div className="wb-words-list">
            {WORDS.map((word) => (
              <div key={word.id} className="wb-word-row">
           
                <div className="wb-word-box">
                  <span className="wb-word-text">{word.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right side images */}
          <div className="wb-images-grid">
            {IMAGES.map((item) => (
              <div
                key={item.id}
                className={`wb-image-card ${
                  isImageWrong(item.id) ? "wb-image-card--wrong" : ""
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item.id)}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  className="wb-image"
                  draggable={false}
                />

                <button
                  type="button"
                  className={`wb-corner-number ${
                    imageAnswers[item.id] ? "wb-corner-number--filled" : ""
                  }`}
                  onClick={() => handleRemoveNumber(item.id)}
                  disabled={!imageAnswers[item.id] || showAns}
                  title={
                    showAns
                      ? "Answer shown"
                      : imageAnswers[item.id]
                      ? "Remove number"
                      : "Empty"
                  }
                >
                  {imageAnswers[item.id] || ""}
                </button>

                {isImageWrong(item.id) && (
                  <div className="wb-wrong-mark">✕</div>
                )}

                {showAns && (
                  <div className="wb-answer-label">
                    {getWordById(CORRECT_ANSWERS[item.id])}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Draggable numbers */}
        <div className="wb-drag-numbers">
          {DRAG_NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);

            return (
              <div
                key={num}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(num)}
                className={`wb-drag-circle ${
                  disabled || showAns ? "wb-drag-circle--disabled" : ""
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="wb-buttons-wrap">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>

      <style jsx>{`
        .wb-page213-wrapper {
          width: 100%;
          max-width: 1150px;
          margin: 0 auto;
          padding: 24px 20px 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          box-sizing: border-box;
        }

        .wb-main-title {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .wb-unit-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: #d9d9d9;
          color: #5f6368;
          font-weight: 700;
          font-size: 24px;
          flex-shrink: 0;
        }

        .wb-content-grid {
          display: grid;
          grid-template-columns: minmax(280px, 360px) 1fr;
          gap: 28px;
          align-items: start;
        }

        .wb-words-list {
          display: flex;
          flex-direction: column;
          gap: 28px;
          padding-top: 8px;
        }

        .wb-word-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .wb-word-number {
          width: 34px;
          min-width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 2px solid #8d8d8d;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: #222;
        }

        .wb-word-box {
          min-height: 56px;
          padding: 0 18px;
          border: 2px solid #a9a9a9;
          border-radius: 14px;
          background: #fff;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          max-width: 220px;
        }

        .wb-word-text {
          font-size: 32px;
          font-weight: 500;
          line-height: 1.2;
          color: #222;
          text-transform: lowercase;
        }

        .wb-images-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(200px, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        .wb-image-card {
          position: relative;
          min-height: 220px;
          border: 3px solid #f39b42;
          border-radius: 18px;
          background: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            border-color 0.18s ease;
          box-sizing: border-box;
        }

        .wb-image-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .wb-image-card--wrong {
          border-color: #ef4444;
        }

        .wb-image {
          width: 100%;
          height: 100%;
          max-height: 190px;
          object-fit: contain;
          display: block;
          user-select: none;
          pointer-events: none;
        }

        .wb-corner-number {
          position: absolute;
          top: 0;
          right: 0;
          width: 48px;
          height: 48px;
          border: none;
          border-left: 2px solid #f39b42;
          border-bottom: 2px solid #f39b42;
          border-bottom-left-radius: 14px;
          background: #f7f7f7;
          color: #999;
          font-size: 28px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }

        .wb-corner-number--filled {
          color: #d92f2f;
          background: #ffffff;
        }

        .wb-corner-number:disabled {
          cursor: default;
        }

        .wb-wrong-mark {
          position: absolute;
          top: 10px;
          left: 10px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
        }

        .wb-answer-label {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.92);
          color: #333;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          text-transform: lowercase;
        }

        .wb-drag-numbers {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 4px;
        }

        .wb-drag-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f39b42;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          cursor: grab;
          user-select: none;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.14);
          transition: transform 0.18s ease, opacity 0.18s ease,
            box-shadow 0.18s ease;
        }

        .wb-drag-circle:hover {
          transform: translateY(-2px);
        }

        .wb-drag-circle--disabled {
          background: #d1d5db;
          cursor: not-allowed;
          opacity: 0.58;
          box-shadow: none;
          transform: none;
        }

        .wb-buttons-wrap {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 992px) {
          .wb-content-grid {
            grid-template-columns: 1fr;
          }

          .wb-words-list {
            gap: 20px;
          }

          .wb-images-grid {
            grid-template-columns: repeat(2, minmax(170px, 1fr));
          }

          .wb-word-text {
            font-size: 28px;
          }
        }

        @media (max-width: 640px) {
          .wb-page213-wrapper {
            padding: 18px 14px 24px;
            gap: 22px;
          }

          .wb-main-title {
            gap: 10px;
          }

          .wb-unit-badge {
            width: 36px;
            height: 36px;
            font-size: 20px;
            border-radius: 10px;
          }

          .wb-word-row {
            gap: 10px;
          }

          .wb-word-number {
            width: 30px;
            min-width: 30px;
            height: 30px;
            font-size: 18px;
          }

          .wb-word-box {
            min-height: 48px;
            padding: 0 14px;
            max-width: 100%;
          }

          .wb-word-text {
            font-size: 24px;
          }

          .wb-images-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .wb-image-card {
            min-height: 180px;
            padding: 10px;
          }

          .wb-image {
            max-height: 150px;
          }

          .wb-corner-number {
            width: 42px;
            height: 42px;
            font-size: 24px;
          }

          .wb-drag-circle {
            width: 46px;
            height: 46px;
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}