import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import useWorkbookUnit2TabDrag from "./useWorkbookUnit2TabDrag";
import "./workbookUnit2Interactions.css";

import busImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 1.svg";
import scooterImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 2.svg";
import carImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 3.svg";
import motorcycleImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 4.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 24.svg";
import alwaysAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_001_always.mp3";
import usuallyAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_002_usually.mp3";
import sometimesAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_003_sometimes.mp3";
import rarelyAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_004_rarely.mp3";
import neverAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_005_never.mp3";
import sentence1Audio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_006_She_usually_takes_a_bus_to_work.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_007_She_usually_drives_a_car_to_the_library.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_008_She_sometimes_rides_a_scooter_to_the_park.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise I/Item_009_She_rarely_rides_a_motorcycle_to_the_mall.mp3";

const FREQUENCY_AUDIO = {
  always: alwaysAudio,
  usually: usuallyAudio,
  sometimes: sometimesAudio,
  rarely: rarelyAudio,
  never: neverAudio,
};
const frequencyPositions = ["18%", "33.5%", "49%", "63%", "78%"];
const SENTENCES = [
  {
    id: 1,
    text: "She usually takes a bus to work.",
    audio: sentence1Audio,
  },
  {
    id: 2,
    text: "She usually drives a car to the library.",
    audio: sentence2Audio,
  },
  {
    id: 3,
    text: "She sometimes rides a scooter to the park.",
    audio: sentence3Audio,
  },
  {
    id: 4,
    text: "She rarely rides a motorcycle to the mall.",
    audio: sentence4Audio,
  },
];

const IMAGE_CARDS = [
  {
    id: 1,
    img: busImg,
    alt: "bus",
    correctNumber: 1,
  },
  {
    id: 2,
    img: scooterImg,
    alt: "scooter",
    correctNumber: 3,
  },
  {
    id: 3,
    img: carImg,
    alt: "car",
    correctNumber: 2,
  },
  {
    id: 4,
    img: motorcycleImg,
    alt: "motorcycle",
    correctNumber: 4,
  },
];

const DRAG_NUMBERS = [1, 2, 3, 4];

const WRONG_COLOR = "#ef4444";
const TEXT_COLOR = "#111";
const NUMBER_COLOR = "#000000ff";
const DRAG_BG = "#f29a1f";

const styles = {
  pageWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(14px, 6vw, 15px)",

    width: "88%",
  },

  sentencesWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(12px, 2vw,16px)",
    width: "100%",
  },

  sentenceRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "clamp(10px, 1.4vw, 16px)",
    width: "100%",
  },

  sentenceNumber: {
    fontSize: "clamp(12px, 1.4vw, 20px)",
    fontWeight: 700,
    color: TEXT_COLOR,
    lineHeight: 1,
    minWidth: "clamp(18px, 2vw, 28px)",
    flexShrink: 0,
    paddingTop: "2px",
  },

  sentenceText: {
    fontSize: "clamp(12px, 1.4vw, 18px)",
    // fontWeight: 500,
    color: TEXT_COLOR,
    lineHeight: 1.25,
    wordBreak: "break-word",
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "clamp(10px, 1.4vw, 18px)",
    width: "100%",
    alignItems: "start",
  },

  cardDropArea: {
    position: "relative",
    width: "80%",
    minWidth: 0,
    cursor: "pointer",
    transition: "0.2s ease",
    borderRadius: "clamp(12px, 1.4vw, 18px)",
  },

  imageWrap: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
    userSelect: "none",
    pointerEvents: "none",
  },

  numberOverlay: {
    position: "absolute",
    top: "0.01%",
    right: "1.2%",
    width: "17%",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: NUMBER_COLOR,
    fontSize: "clamp(18px, 1.7vw, 20px)",
    fontWeight: 500,
    lineHeight: 1,
    background: "transparent",
    border: "none",
    boxSizing: "border-box",
    pointerEvents: "none",
  },

  wrongBadge: {
    position: "absolute",
    top: "-10px",
    right: "-14px",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 700,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 3,
    pointerEvents: "none",
  },

  dragNumbersWrap: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "clamp(10px, 1.4vw, 16px)",
    marginTop: "clamp(2px, 0.6vw, 8px)",
  },

  dragCircle: {
    width: "clamp(30px, 5vw, 40px)",
    height: "clamp(30px, 5vw, 40px)",
    borderRadius: "50%",
    background: DRAG_BG,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(20px, 2.4vw, 25px)",
    fontWeight: 500,
    cursor: "grab",
    userSelect: "none",
    transition: "0.2s ease",
    touchAction: "none",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit3_Page21_QI() {
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const dropRefs = useRef({});
  const dropSucceededRef = useRef(false);
  const [shakeGrid, setShakeGrid] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const usedNumbers = useMemo(
    () => Object.values(imageAnswers),
    [imageAnswers],
  );

  const applyDrop = (cardId, num) => {
    const targetId = `card-${cardId}`;
    if (showAns || correctIds.includes(targetId)) return;
    const updated = { ...imageAnswers };

    Object.keys(updated).forEach((key) => {
      if (updated[key] === num) {
        delete updated[key];
      }
    });

    updated[cardId] = num;
    dropSucceededRef.current = true;
    setImageAnswers(updated);
    setDraggedNumber(null);
    setCheckedIds((previous) => previous.filter((id) => id !== targetId));
  };

  const placeNumber = (num, targetId) => {
    applyDrop(Number(String(targetId).replace("card-", "")), Number(num));
  };

  const keyboard = useWorkbookUnit2TabDrag({
    itemIds: DRAG_NUMBERS,
    targetIds: IMAGE_CARDS.map((card) => `card-${card.id}`),
    isItemDisabled: (id) => usedNumbers.includes(id) || showAns,
    isTargetDisabled: (id) => correctIds.includes(id) || showAns,
    onPlace: placeNumber,
  });

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    dropSucceededRef.current = false;
    setDraggedNumber(num);
  };

  const handleDragEnd = () => {
    if (!dropSucceededRef.current) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
    }
    setDraggedNumber(null);
  };

  const handleDrop = (cardId) => {
    if (showAns || draggedNumber === null) return;
    applyDrop(cardId, draggedNumber);
  };

  const handleTouchStart = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;

    const touch = e.touches[0];
    setTouchItem(num);
    setDraggedNumber(num);
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (touchItem === null) return;

    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (touchItem === null) return;
    let matched = false;

    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;

      const rect = ref.getBoundingClientRect();

      if (
        touchPos.x >= rect.left &&
        touchPos.x <= rect.right &&
        touchPos.y >= rect.top &&
        touchPos.y <= rect.bottom
      ) {
        applyDrop(Number(key), touchItem);
        matched = true;
      }
    });

    if (!matched) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
    }

    setTouchItem(null);
    setDraggedNumber(null);
  };

  const handleRemoveNumber = (cardId) => {
    const targetId = `card-${cardId}`;
    if (showAns || correctIds.includes(targetId)) return;
    const removedNumber = imageAnswers[cardId];

    setImageAnswers((prev) => {
      const updated = { ...prev };
      delete updated[cardId];
      return updated;
    });

    setCheckedIds((previous) => previous.filter((id) => id !== targetId));
    if (removedNumber) keyboard.focusItem(removedNumber);
  };

  const getScore = () => {
    let score = 0;

    IMAGE_CARDS.forEach((card) => {
      if (imageAnswers[card.id] === card.correctNumber) {
        score += 1;
      }
    });

    return score;
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === IMAGE_CARDS.length) return;

    const allAnswered = IMAGE_CARDS.every((card) => imageAnswers[card.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = IMAGE_CARDS.length;
    const score = getScore();

    setCheckedIds(IMAGE_CARDS.map((card) => `card-${card.id}`));
    setCorrectIds(
      IMAGE_CARDS.filter(
        (card) => imageAnswers[card.id] === card.correctNumber,
      ).map((card) => `card-${card.id}`),
    );

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};

    IMAGE_CARDS.forEach((card) => {
      correctMap[card.id] = card.correctNumber;
    });

    setImageAnswers(correctMap);
    setCheckedIds(IMAGE_CARDS.map((card) => `card-${card.id}`));
    setCorrectIds(IMAGE_CARDS.map((card) => `card-${card.id}`));
    setShowAns(true);
    setDraggedNumber(null);
    setTouchItem(null);
    keyboard.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setImageAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    setShakeGrid(false);
    keyboard.cancel();
    stopAudio();
  };

  const isCardWrong = (cardId) => {
    if (!checkedIds.includes(`card-${cardId}`) || showAns) return false;
    const card = IMAGE_CARDS.find((item) => item.id === cardId);
    return imageAnswers[cardId] !== card.correctNumber;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-i-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(10px, 1.6vw, 18px);
          width: 100%;
          align-items: start;
        }

       
        .wb-i-card-wrong {
          filter: drop-shadow(0 0 0 rgba(0,0,0,0));
        }

        .wb-i-drag-selected {
          transform: scale(1.08);
          box-shadow: 0 0 0 3px rgba(141, 141, 147, 0.2);
        }

        .wb-i-drag-disabled {
          background: #cfcfd4 !important;
          cursor: not-allowed !important;
          opacity: 0.6;
        }
.wb-i-card-active {
  transform: translateY(-4px) scale(1.03);
  transition: all 0.25s ease;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.15));
}

.wb-i-card-hover {
  transform: scale(1.05);
  transition: all 0.2s ease;
}



@keyframes popIn {
  0% {
    transform: scale(0.9);
  }
  60% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
        .wb-i-touch-preview {
          position: fixed;
          width: clamp(40px, 5vw, 52px);
          height: clamp(40px, 5vw, 52px);
          border-radius: 50%;
          background: #8d8d93;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(20px, 2.4vw, 28px);
          font-weight: 700;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 900px) {
          .wb-i-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .wb-i-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="div-forall" style={{ gap: "35px" }}>
        <ExerciseHeader
          sectionLetter="I"
          title="Read, look, and number."
          subTitle="Read all frequency statement to the correct transportation picture clues first, then assign the numbers carefully so the picture or order is used correctly."
        />
        <div className="flex flex-col gap-3 w-full">
          <div
            className="flex flex-col gap-3 w-full"
            style={{ position: "relative", width: "auto", height: "80px" }}
          >
            <img
              src={img}
              alt="Frequency chart for always, usually, sometimes, rarely, and never"
              style={{ width: "auto", height: "80px" }}
            />
            {Object.entries(FREQUENCY_AUDIO).map(
              ([frequency, audio], index) => (
                <button
                  key={frequency}
                  type="button"
                  aria-label={`Play ${frequency}`}
                  className="wb-unit2-audio-control wb-unit2-interactive"
                  onClick={() => playAudio(`frequency-${frequency}`, audio)}
                  style={{
                    position: "absolute",
                    left: frequencyPositions[index],
                    bottom: 0,
                    width: "10%",
                    height: "45%",
                    border: 0,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <WorkbookUnit2PlayingAudioIcon
                    active={activeAudioKey === `frequency-${frequency}`}
                  />
                </button>
              ),
            )}
          </div>

          <div style={styles.pageWrap}>
            <div style={styles.contentWrap}>
              <div style={styles.sentencesWrap}>
                {SENTENCES.map((item) => (
                  <div key={item.id} style={styles.sentenceRow}>
                    <div style={styles.sentenceNumber}>{item.id}</div>
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={`Play sentence: ${item.text}`}
                      className="wb-unit2-audio-control wb-unit2-interactive"
                      onClick={() =>
                        playAudio(`sentence-${item.id}`, item.audio)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`sentence-${item.id}`, item.audio);
                        }
                      }}
                      style={styles.sentenceText}
                    >
                      {item.text}
                      <WorkbookUnit2PlayingAudioIcon
                        active={activeAudioKey === `sentence-${item.id}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.dragNumbersWrap}>
                {DRAG_NUMBERS.map((num) => {
                  const disabled = usedNumbers.includes(num);
                  const selected = draggedNumber === num || touchItem === num;

                  return (
                    <div
                      key={num}
                      role="button"
                      tabIndex={0}
                      aria-disabled={disabled || showAns}
                      ref={(element) => keyboard.registerItem(num, element)}
                      draggable={!disabled && !showAns}
                      onDragStart={() => handleDragStart(num)}
                      onDragEnd={handleDragEnd}
                      onTouchStart={(e) => handleTouchStart(e, num)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      onKeyDown={(event) =>
                        keyboard.handleItemKeyDown(event, num)
                      }
                      style={styles.dragCircle}
                      className={`${disabled || showAns ? "wb-i-drag-disabled" : ""} ${
                        selected ? "wb-i-drag-selected" : ""
                      }`}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
              <div
                className={`wb-i-cards-grid ${shakeGrid ? "wb-unit2-invalid-drop-shake" : ""}`}
                onAnimationEnd={() => setShakeGrid(false)}
              >
                {IMAGE_CARDS.map((item) => (
                  <div
                    key={item.id}
                    ref={(el) => {
                      dropRefs.current[item.id] = el;
                      keyboard.registerTarget(`card-${item.id}`, el);
                    }}
                    role="button"
                    tabIndex={
                      !showAns &&
                      !correctIds.includes(`card-${item.id}`) &&
                      (keyboard.keyboardItemId || imageAnswers[item.id])
                        ? 0
                        : -1
                    }
                    aria-disabled={
                      showAns || correctIds.includes(`card-${item.id}`)
                    }
                    style={styles.cardDropArea}
                    className={`
  ${hoveredCard === item.id ? "wb-i-card-active" : ""}
  ${imageAnswers[item.id] ? "wb-i-card-filled" : ""}
`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(item.id)}
                    onClick={() => handleRemoveNumber(item.id)}
                    onKeyDown={(event) => {
                      if (
                        !keyboard.keyboardItemId &&
                        imageAnswers[item.id] &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        handleRemoveNumber(item.id);
                        return;
                      }
                      keyboard.handleTargetKeyDown(event, `card-${item.id}`);
                    }}
                    onDragEnter={() => setHoveredCard(item.id)}
                    onDragLeave={() => setHoveredCard(null)}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={styles.imageWrap}>
                      <img
                        src={item.img}
                        alt={item.alt}
                        style={styles.image}
                        draggable={false}
                      />

                      <div style={styles.numberOverlay}>
                        <span
                          className={
                            keyboard.keyboardTargetId === `card-${item.id}`
                              ? "wb-unit2-keyboard-preview"
                              : undefined
                          }
                        >
                          {keyboard.keyboardTargetId === `card-${item.id}`
                            ? keyboard.keyboardItemId
                            : imageAnswers[item.id] || ""}
                        </span>
                        {isCardWrong(item.id) && (
                          <span style={styles.wrongBadge}>✕</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={styles.buttonsWrap}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>

      {touchItem !== null && (
        <div
          className="wb-i-touch-preview"
          style={{
            left: touchPos.x - 24,
            top: touchPos.y - 24,
          }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}
