import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit1PlayingAudioIcon from "./WorkbookUnit1PlayingAudioIcon";
import useWorkbookUnit1Audio from "./useWorkbookUnit1Audio";
import question1Audio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_001_Which_is_the_biggest_animal.mp3";
import lionAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_002_The_lion_is_the_biggest_animal.mp3";
import catAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_003_The_cat_is_the_biggest_animal.mp3";
import birdAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_004_The_bird_is_the_biggest_animal.mp3";
import question2Audio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_005_Which_is_the_fastest.mp3";
import carAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_006_The_car_is_the_fastest.mp3";
import bikeAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_007_The_bike_is_the_fastest.mp3";
import skateboardAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_008_The_skateboard_is_the_fastest.mp3";
import question3Audio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_009_Which_is_the_heaviest.mp3";
import penAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_010_The_pen_is_the_heaviest.mp3";
import bookAudio from "../../../assets/audio/WorkBook/unit1/Page 3 - Exercise B/Item_011_The_book_is_the_heaviest.mp3";
import "./workbookUnit1Interactions.css";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 2.svg";
import img1c from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 3.svg";

import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 4.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 5.svg";
import img2c from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 6.svg";

import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 7.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 8.svg";
import img3c from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 3/SVG/Asset 9.svg";
import trueIcon from "../../../assets/imgs/true.svg";

const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    question: "Which is the biggest animal?",
    images: [
      { key: "lion", src: img1a, alt: "A large lion" },
      { key: "cat", src: img1b, alt: "A small house cat" },
      { key: "bird", src: img1c, alt: "A small bird" },
    ],
    correctImage: "lion",
    options: [
      "The lion is the biggest animal.",
      "The cat is the biggest animal.",
      "The bird is the biggest animal.",
    ],
    correctText: "The lion is the biggest animal.",
    questionAudio: question1Audio,
    optionAudio: {
      "The lion is the biggest animal.": lionAudio,
      "The cat is the biggest animal.": catAudio,
      "The bird is the biggest animal.": birdAudio,
    },
  },
  {
    id: 2,
    question: "Which is the fastest?",
    images: [
      { key: "car", src: img2a, alt: "A fast car" },
      { key: "bike", src: img2b, alt: "A bicycle" },
      { key: "skateboard", src: img2c, alt: "A skateboard" },
    ],
    correctImage: "car",
    options: [
      "The car is the fastest.",
      "The bike is the fastest.",
      "The skateboard is the fastest.",
    ],
    correctText: "The car is the fastest.",
    questionAudio: question2Audio,
    optionAudio: {
      "The car is the fastest.": carAudio,
      "The bike is the fastest.": bikeAudio,
      "The skateboard is the fastest.": skateboardAudio,
    },
  },
  {
    id: 3,
    question: "Which is the heaviest?",
    images: [
      { key: "pen", src: img3a, alt: "A pen" },
      { key: "book", src: img3b, alt: "A book" },
      { key: "desk", src: img3c, alt: "A desk" },
    ],
    correctImage: "desk",
    options: [
      "The pen is the heaviest.",
      "The book is the heaviest.",
      "The desk is the heaviest.",
    ],
    correctText: "The desk is the heaviest.",
    questionAudio: question3Audio,
    optionAudio: {
      "The pen is the heaviest.": penAudio,
      "The book is the heaviest.": bookAudio,
    },
  },
];

export default function WB_Unit3_Page3_QB() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [correctImages, setCorrectImages] = useState([]);
  const [correctTexts, setCorrectTexts] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit1Audio();

  const handleImageSelect = (itemId, imageKey) => {
    if (showAns || correctImages.includes(itemId)) return;
    setAnswers((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], image: imageKey },
    }));
    setChecked(false);
  };

  const handleTextSelect = (itemId, text) => {
    if (showAns || correctTexts.includes(itemId)) return;
    setAnswers((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], text },
    }));
    setChecked(false);
  };

  const handleCheck = () => {
    if (
      showAns ||
      (correctImages.length === ITEMS.length &&
        correctTexts.length === ITEMS.length)
    )
      return;

    const allAnswered = ITEMS.every(
      (item) => answers[item.id]?.image && answers[item.id]?.text,
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const nextCorrectImages = ITEMS.filter(
      (item) => answers[item.id]?.image === item.correctImage,
    ).map((item) => item.id);
    const nextCorrectTexts = ITEMS.filter(
      (item) => answers[item.id]?.text === item.correctText,
    ).map((item) => item.id);
    const score = ITEMS.filter(
      (item) =>
        nextCorrectImages.includes(item.id) &&
        nextCorrectTexts.includes(item.id),
    ).length;

    setCorrectImages(nextCorrectImages);
    setCorrectTexts(nextCorrectTexts);
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
      filled[item.id] = { image: item.correctImage, text: item.correctText };
    });
    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
    setCorrectImages(ITEMS.map((item) => item.id));
    setCorrectTexts(ITEMS.map((item) => item.id));
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setCorrectImages([]);
    setCorrectTexts([]);
    stopAudio();
  };

  const isImageSelected = (itemId, imageKey) =>
    answers[itemId]?.image === imageKey;

  const isTextSelected = (itemId, option) => answers[itemId]?.text === option;

  const isWrongImage = (item) => {
    if (!checked || showAns) return false;
    return answers[item.id]?.image !== item.correctImage;
  };

  const isWrongText = (item, option) => {
    if (!checked || showAns) return false;
    return answers[item.id]?.text === option && option !== item.correctText;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-qb-root,
        .wb-qb-root * {
          box-sizing: border-box !important;
        }

        .wb-qb-root {
          width: 100%;
        }

        .wb-qb-main-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
        }

        .wb-qb-row {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) minmax(330px, 38%);
          gap: clamp(16px, 2.6vw, 28px) !important;
          align-items: start !important;
          width: 100%;
        }

        .wb-qb-left-col {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.6vw, 14px);
          min-width: 0;
          width: 100%;
        }

        .wb-qb-question-wrap {
          display: flex;
          align-items: flex-start;
          gap: clamp(8px, 1.4vw, 14px);
          min-width: 0;
        }

        .wb-qb-number {
          font-size: clamp(16px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
          margin-top: clamp(2px, 0.6vw, 6px);
          min-width: clamp(16px, 2vw, 18px);
          flex-shrink: 0;
        }

        .wb-qb-question {
          font-size: clamp(16px, 2.2vw, 19px);
          color: #111;
          line-height: 1.35;
          font-weight: 500;
          min-width: 0;
        }

        .wb-qb-images-row {
          display: flex !important;
          align-items: flex-end !important;
          gap: clamp(10px, 1.8vw, 5px) !important;
          flex-wrap: wrap !important;
          // padding-left: clamp(22px, 4vw, 34px) !important;
          overflow: visible !important;
          width: 100%;
        }

        .wb-qb-image-click {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          flex-shrink: 0;
          overflow: visible;
        }

        .wb-qb-image-holder {
          width: clamp(72px, 13vw, 96px) !important;
          height: clamp(68px, 12vw, 96px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          overflow: visible !important;
          flex-shrink: 0 !important;
        }

        .wb-qb-root img,
        .wb-qb-force-img {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: auto !important;
          height: auto !important;
          max-width: clamp(64px, 12vw, 120px) !important;
          max-height: clamp(60px, 11vw, 120px) !important;
         
          object-fit: contain !important;
          flex-shrink: 0 !important;
          overflow: visible !important;
        }

        .wb-qb-image-ring {
          position: absolute;
          inset: clamp(-8px, -1vw, -10px);
          border: clamp(2px, 0.35vw, 4px) solid ${ACTIVE_COLOR};
          border-radius: 999px;
          pointer-events: none;
        }

        .wb-qb-image-ring-wrong {
          position: absolute;
          inset: clamp(-8px, -1vw, -10px);
          border: clamp(2px, 0.35vw, 4px) solid ${WRONG_COLOR};
          border-radius: 999px;
          pointer-events: none;
        }

        .wb-qb-image-wrong-badge {
          position: absolute;
          top: clamp(-7px, -0.8vw, -8px);
          right: clamp(-7px, -0.8vw, -8px);
          width: clamp(16px, 2.2vw, 22px);
          height: clamp(16px, 2.2vw, 22px);
          border-radius: 50%;
          background-color: red;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          z-index: 2;
        }

        .wb-qb-right-col {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.3vw, 10px);
          padding-top: clamp(8px, 3vw, 36px);
          width: 100%;
          min-width: 0;
        }

        .wb-qb-option-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(30px, 4vw, 46px);
          gap: clamp(8px, 1.4vw, 14px);
          align-items: center;
          width: 100%;
        }

        .wb-qb-option-text {
          font-size: clamp(14px, 2vw, 19px);
          color: #222;
          line-height: 1.35;
          // font-weight: 500;
          min-width: 0;
          word-break: break-word;
          text-wrap: nowrap
        }

        .wb-qb-checkbox {
          width: clamp(28px, 3.8vw, 40px);
          height: clamp(28px, 3.8vw, 40px);
          border-radius: 6px;
          border: 2px solid #bbb;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .wb-qb-checkbox.wrong {
          border-color: ${WRONG_COLOR};
          background: rgba(239, 68, 68, 0.08);
        }

        .wb-qb-wrong {
          position: absolute;
          top: clamp(-7px, -0.8vw, -8px);
          right: clamp(-7px, -0.8vw, -8px);
          width: clamp(16px, 2.2vw, 22px);
          height: clamp(16px, 2.2vw, 22px);
          border-radius: 50%;
          background-color: red;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(9px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          z-index: 2;
        }

        @media (max-width: 900px) {
          .wb-qb-row {
            grid-template-columns: 1fr !important;
          }

          .wb-qb-right-col {
            padding-top: 0 !important;
          }
        }

        @media (max-width: 600px) {
          .wb-qb-images-row {
            padding-left: 0 !important;
          }
        }
      `}</style>

      <div className="div-forall " style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Read, look, circle, and write{" "}
              <span className="text-red-600">✓</span>.
            </>
          }
          subTitle="Look at the biggest, fastest, and heaviest picture set first, compare all available options, then tap only the answer that matches."
        />

        <div className="wb-qb-main-list">
          {ITEMS.map((item) => {
            const wrongImage = isWrongImage(item);

            return (
              <div key={item.id} className="wb-qb-row">
                <div className="wb-qb-left-col">
                  <div className="wb-qb-question-wrap">
                    <div className="wb-qb-number">{item.id}</div>
                    <button
                      type="button"
                      className="wb-qb-question wb-unit1-audio-control wb-unit1-interactive"
                      onClick={() =>
                        playAudio(`question-${item.id}`, item.questionAudio)
                      }
                      style={{
                        border: 0,
                        background: "transparent",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      {item.question}
                      <WorkbookUnit1PlayingAudioIcon
                        active={activeAudioKey === `question-${item.id}`}
                      />
                    </button>
                  </div>

                  <div className="wb-qb-images-row">
                    {item.images.map((img) => {
                      const selected = isImageSelected(item.id, img.key);
                      const isThisWrong = wrongImage && selected;

                      return (
                        <div
                          key={img.key}
                          className="wb-qb-image-click"
                          role="button"
                          tabIndex={
                            correctImages.includes(item.id) || showAns ? -1 : 0
                          }
                          onClick={() => handleImageSelect(item.id, img.key)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              handleImageSelect(item.id, img.key);
                            }
                          }}
                          style={{ cursor: showAns ? "default" : "pointer" }}
                        >
                          {selected && !isThisWrong && (
                            <div className="wb-qb-image-ring" />
                          )}

                          {isThisWrong && (
                            <>
                              <div className="wb-qb-image-ring-wrong" />
                              <div className="wb-qb-image-wrong-badge">✕</div>
                            </>
                          )}

                          <div className="wb-qb-image-holder">
                            <img
                              className="wb-qb-force-img"
                              src={img.src}
                              alt={img.alt}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="wb-qb-right-col">
                  {item.options.map((option) => {
                    const selected = isTextSelected(item.id, option);
                    const wrong = isWrongText(item, option);

                    const showCorrect = showAns && item.correctText === option;

                    const textLocked =
                      correctTexts.includes(item.id) || showAns;

                    const optionAudio = item.optionAudio[option];

                    return (
                      <div key={option} className="wb-qb-option-row">
                        {/* =====================================
          SENTENCE AUDIO
      ===================================== */}

                        <div
                          className="wb-qb-option-text wb-unit1-audio-control wb-unit1-interactive"
                          role="button"
                          tabIndex={0}
                          aria-label={`Play audio: ${option}`}
                          onClick={() => {
                            if (!optionAudio) return;

                            playAudio(
                              `option-${item.id}-${option}`,
                              optionAudio,
                            );
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();

                              if (!optionAudio) return;

                              playAudio(
                                `option-${item.id}-${option}`,
                                optionAudio,
                              );
                            }
                          }}
                          style={{
                            cursor: optionAudio ? "pointer" : "default",
                          }}
                        >
                          <WorkbookUnit1PlayingAudioIcon
                            active={
                              activeAudioKey === `option-${item.id}-${option}`
                            }
                          />

                          {option}
                        </div>

                        {/* =====================================
          CHECKBOX — SELECT ONLY
      ===================================== */}

                        <div
                          role="button"
                          tabIndex={textLocked ? -1 : 0}
                          aria-label={`Select: ${option}`}
                          onClick={() => {
                            if (textLocked) return;

                            handleTextSelect(item.id, option);
                          }}
                          onKeyDown={(event) => {
                            if (textLocked) return;

                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();

                              handleTextSelect(item.id, option);
                            }
                          }}
                          className={`wb-qb-checkbox ${wrong ? "wrong" : ""}`}
                          style={{
                            cursor: textLocked ? "default" : "pointer",
                          }}
                        >
                          {(selected || showCorrect) && (
                            <img
                              src={trueIcon}
                              alt=""
                              style={{
                                height: "25px",
                              }}
                            />
                          )}

                          {wrong && <div className="wb-qb-wrong">✕</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4px",
            width: "100%",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkDisabled={
              showAns ||
              (correctImages.length === ITEMS.length &&
                correctTexts.length === ITEMS.length)
            }
          />
        </div>
      </div>
    </div>
  );
}
