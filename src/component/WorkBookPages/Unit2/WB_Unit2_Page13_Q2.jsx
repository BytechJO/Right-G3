import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import useWorkbookUnit2TabDrag from "./useWorkbookUnit2TabDrag";
import "./workbookUnit2Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 13/SVG/Asset 8.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 24.svg";
import full1 from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/full1.mp3";
import full2 from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/full2.mp3";
import full3 from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/full3.mp3";
import full4 from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/full4.mp3";
import alwaysAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_001_always.mp3";
import usuallyAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_002_usually.mp3";
import sometimesAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_003_sometimes.mp3";
import rarelyAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_004_rarely.mp3";
import neverAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_005_never.mp3";
import sheAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_006_She.mp3";
import busSchoolAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_007_takes_a_bus_to_school.mp3";
import stellaDadAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_008_Stella's_dad.mp3";
import taxiAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_009_takes_a_taxi.mp3";
import heAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_010_He.mp3";
import scooterAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_011_rides_a_scooter.mp3";
import helenMomAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_012_Helen's_mom.mp3";
import subwayAudio from "../../../assets/audio/WorkBook/unit2/Page 13 - Exercise J/Item_013_takes_the_subway_to_the_supermarket.mp3";

const FREQUENCY_AUDIO = {
  always: alwaysAudio,
  usually: usuallyAudio,
  sometimes: sometimesAudio,
  rarely: rarelyAudio,
  never: neverAudio,
};

const RED = "#000000ff";
const ORANGE = "#f29a1f";
const BORDER = "#b6b6b6";
const WRONG = "red";
const TEXT = "#111";

// الكلمات المتاحة في الـ dropdown
const WORD_OPTIONS = ["usually", "sometimes", "rarely"];

const SENTENCES = [
  {
    id: 1,
    before: "She",
    correctWord: "usually",
    after: "takes a bus to school.",
    beforeAudio: sheAudio,
    afterAudio: busSchoolAudio,
    fullAudio: full1,
  },
  {
    id: 2,
    before: "Stella's dad",
    correctWord: "usually",
    after: "takes a taxi.",
    beforeAudio: stellaDadAudio,
    afterAudio: taxiAudio,
    fullAudio: full2,
  },
  {
    id: 3,
    before: "He",
    correctWord: "sometimes",
    after: "rides a scooter.",
    beforeAudio: heAudio,
    afterAudio: scooterAudio,
    fullAudio: full3,
  },
  {
    id: 4,
    before: "Helen's mom",
    correctWord: "rarely",
    after: "takes the subway to the supermarket.",
    beforeAudio: helenMomAudio,
    afterAudio: subwayAudio,
    fullAudio: full4,
  },
];

const PICTURES = [
  { id: 1, img: img1, alt: "bus", correctNumber: 1 },
  { id: 2, img: img2, alt: "scooter", correctNumber: 3 },
  { id: 3, img: img3, alt: "taxi", correctNumber: 2 },
  { id: 4, img: img4, alt: "subway", correctNumber: 4 },
];

const DRAG_NUMBERS = [1, 2, 3, 4];

const styles = {
  pageWrap: { width: "100%", display: "flex", justifyContent: "center" },
  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px,2vw,28px)",
    width: "88%",
  },

  sentencesWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(14px,2vw,22px)",
    width: "100%",
  },

  sentenceRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "clamp(8px,1vw,14px)",
    width: "100%",
    flexWrap: "wrap",
  },

  sentenceNumber: {
    fontSize: "clamp(12px,1.4vw,18px)",
    fontWeight: 700,
    color: TEXT,
    lineHeight: 1,
    minWidth: "clamp(18px,2vw,28px)",
    flexShrink: 0,
  },

  sentenceText: {
    fontSize: "clamp(12px,1.4vw,18px)",
    color: TEXT,
    lineHeight: 1.2,
    // fontWeight: 500,
  },

  // ── Dropdown ──
  selectWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "flex-end",
  },

  select: {
    minWidth: "clamp(120px,18vw,200px)",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "1px solid #333",
    borderRadius: 0,
    outline: "none",
    fontSize: "clamp(12px,1.4vw,18px)",
    // fontWeight: 500,
    // color: RED,
    padding: "0 clamp(4px,0.6vw,8px) 4px 2px",
    background: "transparent",
    cursor: "pointer",
    appearance: "auto",
    boxSizing: "border-box",
  },

  wrongBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    width: "clamp(22px,1.4vw,24px)",
    height: "clamp(22px,1.4vw,24px)",
    borderRadius: "50%",
    backgroundColor: WRONG,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px,1vw,12px)",
    fontWeight: 600,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 4,
  },

  // ── Image cards ──
  imageCard: {
    position: "relative",
    width: "100%",
    borderRadius: "4px",
    overflow: "hidden",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "0.2s ease",
  },

  image: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
    userSelect: "none",
    pointerEvents: "none",
  },

  dragNumbersWrap: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "clamp(10px,1.4vw,16px)",
  },

  dragCircle: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: ORANGE,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(16px,1.7vw,20px)",
    fontWeight: 500,
    cursor: "grab",
    userSelect: "none",
    transition: "0.2s ease",
    touchAction: "none",
    boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
  },

  buttonsWrap: { display: "flex", justifyContent: "center", marginTop: "4px" },
};

export default function WB_Unit3_Page22_QJ() {
  const [wordAnswers, setWordAnswers] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageAnswers, setImageAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);
  const [touchItem, setTouchItem] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const [checkedWordIds, setCheckedWordIds] = useState([]);
  const [correctWordIds, setCorrectWordIds] = useState([]);
  const [checkedPictureIds, setCheckedPictureIds] = useState([]);
  const [correctPictureIds, setCorrectPictureIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [shakeGrid, setShakeGrid] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const numberDropRefs = useRef({});
  const dropSucceededRef = useRef(false);
  const usedNumbers = useMemo(
    () => Object.values(imageAnswers),
    [imageAnswers],
  );

  // ── Word select ──
  const handleWordChange = (sentenceId, value) => {
    if (showAns || correctWordIds.includes(sentenceId)) return;

    setWordAnswers((prev) => ({ ...prev, [sentenceId]: value }));
    setCheckedWordIds((previous) => previous.filter((id) => id !== sentenceId));
    playAudio(`frequency-${sentenceId}-${value}`, FREQUENCY_AUDIO[value]);
  };

  // ── Number drag ──
  const applyNumberDrop = (cardId, num) => {
    const targetId = `picture-${cardId}`;
    if (showAns || correctPictureIds.includes(targetId)) return;
    const updated = { ...imageAnswers };
    Object.keys(updated).forEach((k) => {
      if (updated[k] === num) delete updated[k];
    });
    updated[cardId] = num;
    dropSucceededRef.current = true;
    setImageAnswers(updated);
    setDraggedNumber(null);
    setCheckedPictureIds((previous) =>
      previous.filter((id) => id !== targetId),
    );
  };

  const placeNumber = (num, targetId) => {
    applyNumberDrop(
      Number(String(targetId).replace("picture-", "")),
      Number(num),
    );
  };

  const keyboard = useWorkbookUnit2TabDrag({
    itemIds: DRAG_NUMBERS,
    targetIds: PICTURES.map((picture) => `picture-${picture.id}`),
    isItemDisabled: (id) => usedNumbers.includes(id) || showAns,
    isTargetDisabled: (id) => correctPictureIds.includes(id) || showAns,
    onPlace: placeNumber,
  });

  const handleNumberDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    dropSucceededRef.current = false;
    setDraggedNumber(num);
  };
  const handleNumberDragEnd = () => {
    if (!dropSucceededRef.current) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
    }
    setDraggedNumber(null);
  };
  const handleNumberDrop = (cardId) => {
    if (showAns || draggedNumber === null) return;
    applyNumberDrop(cardId, draggedNumber);
  };

  const handleTouchStartNumber = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;
    const t = e.touches[0];
    setTouchItem(num);
    setDraggedNumber(num);
    setTouchPos({ x: t.clientX, y: t.clientY });
  };
  const handleTouchMove = (e) => {
    if (touchItem === null) return;
    const t = e.touches[0];
    setTouchPos({ x: t.clientX, y: t.clientY });
  };
  const handleTouchEnd = () => {
    if (touchItem === null) return;
    let matched = false;
    Object.entries(numberDropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      if (
        touchPos.x >= r.left &&
        touchPos.x <= r.right &&
        touchPos.y >= r.top &&
        touchPos.y <= r.bottom
      ) {
        applyNumberDrop(Number(key), touchItem);
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
    const targetId = `picture-${cardId}`;
    if (showAns || correctPictureIds.includes(targetId)) return;
    const removedNumber = imageAnswers[cardId];

    setImageAnswers((prev) => {
      const u = { ...prev };
      delete u[cardId];
      return u;
    });
    setCheckedPictureIds((previous) =>
      previous.filter((id) => id !== targetId),
    );
    if (removedNumber) keyboard.focusItem(removedNumber);
  };

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (
      showAns ||
      (correctWordIds.length === SENTENCES.length &&
        correctPictureIds.length === PICTURES.length)
    )
      return;
    const allWords = SENTENCES.every((s) => wordAnswers[s.id]);
    const allNumbers = PICTURES.every((p) => imageAnswers[p.id]);
    if (!allWords || !allNumbers) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = SENTENCES.length + PICTURES.length;
    SENTENCES.forEach((s) => {
      if (wordAnswers[s.id] === s.correctWord) score++;
    });
    PICTURES.forEach((p) => {
      if (imageAnswers[p.id] === p.correctNumber) score++;
    });
    setCheckedWordIds(SENTENCES.map((sentence) => sentence.id));
    setCorrectWordIds(
      SENTENCES.filter(
        (sentence) => wordAnswers[sentence.id] === sentence.correctWord,
      ).map((sentence) => sentence.id),
    );
    setCheckedPictureIds(PICTURES.map((picture) => `picture-${picture.id}`));
    setCorrectPictureIds(
      PICTURES.filter(
        (picture) => imageAnswers[picture.id] === picture.correctNumber,
      ).map((picture) => `picture-${picture.id}`),
    );

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filledWords = {};
    const filledNumbers = {};
    SENTENCES.forEach((s) => {
      filledWords[s.id] = s.correctWord;
    });
    PICTURES.forEach((p) => {
      filledNumbers[p.id] = p.correctNumber;
    });
    setWordAnswers(filledWords);
    setImageAnswers(filledNumbers);
    setCheckedWordIds(SENTENCES.map((sentence) => sentence.id));
    setCorrectWordIds(SENTENCES.map((sentence) => sentence.id));
    setCheckedPictureIds(PICTURES.map((picture) => `picture-${picture.id}`));
    setCorrectPictureIds(PICTURES.map((picture) => `picture-${picture.id}`));
    setShowAns(true);
    setDraggedNumber(null);
    setTouchItem(null);
    keyboard.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setWordAnswers({ 1: "", 2: "", 3: "", 4: "" });
    setImageAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setCheckedWordIds([]);
    setCorrectWordIds([]);
    setCheckedPictureIds([]);
    setCorrectPictureIds([]);
    setShowAns(false);
    setShakeGrid(false);
    keyboard.cancel();
    stopAudio();
  };

  const isWordWrong = (id) =>
    checkedWordIds.includes(id) &&
    wordAnswers[id] !== SENTENCES.find((s) => s.id === id)?.correctWord;
  const isNumberWrong = (id) =>
    checkedPictureIds.includes(`picture-${id}`) &&
    imageAnswers[id] !== PICTURES.find((p) => p.id === id)?.correctNumber;

  // لون الرقم فوق الصورة بعد الفحص
  const getNumberColor = (cardId) => {
    if (!checkedPictureIds.includes(`picture-${cardId}`)) return "#000";
    return imageAnswers[cardId] ===
      PICTURES.find((p) => p.id === cardId)?.correctNumber
      ? "#000000ff"
      : WRONG;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-j-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(12px, 1.5vw, 20px);
          width: 100%;
          align-items: start;
        }
        .wb-j-drag-selected  { transform: scale(1.08); box-shadow: 0 0 0 3px rgba(141,141,147,0.2); }
        .wb-j-drag-disabled  { background: #cfcfd4 !important; cursor: not-allowed !important; opacity: 0.6; }
        .wb-j-touch-preview  {
          position:fixed; padding:0 14px; min-width:48px; height:48px;
          border-radius:999px; background:#8d8d93; color:#fff;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; font-weight:700; pointer-events:none; z-index:9999;
          box-shadow:0 4px 10px rgba(0,0,0,0.2); white-space:nowrap;
        }
        @media (max-width:900px) { .wb-j-cards-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
        @media (max-width:560px) { .wb-j-cards-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="div-forall" style={{ gap: "25px" }}>
        <ExerciseHeader
          sectionLetter="J"
          title="Look and complete the sentences. Number the pictures."
          subTitle="Complete the frequency adverb and picture number for each sentence in two passes: choose the missing word first, then number the matching pictures."
        />
        <div style={{ position: "relative", width: "auto", height: "85px" }}>
          <img
            src={img}
            alt="Frequency chart for always, usually, sometimes, rarely, and never"
            style={{ width: "auto", height: "85px" }}
          />
          {Object.entries(FREQUENCY_AUDIO).map(([frequency, audio], index) => (
            <button
              key={frequency}
              type="button"
              aria-label={`Play ${frequency}`}
              className="wb-unit2-audio-control wb-unit2-interactive"
              onClick={() => playAudio(`legend-${frequency}`, audio)}
              style={{
                position: "absolute",
                left: `${index * 20}%`,
                bottom: 0,
                width: "20%",
                height: "45%",
                border: 0,
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <WorkbookUnit2PlayingAudioIcon
                active={activeAudioKey === `legend-${frequency}`}
              />
            </button>
          ))}
        </div>

        <div style={styles.pageWrap}>
          <div style={styles.contentWrap}>
            {/* ── Sentences with dropdown ── */}
            <div style={styles.sentencesWrap}>
              {SENTENCES.map((item) => {
                const wrong = isWordWrong(item.id);
                const fullAudioEnabled = correctWordIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    role={fullAudioEnabled ? "button" : undefined}
                    tabIndex={fullAudioEnabled ? 0 : undefined}
                    aria-label={
                      fullAudioEnabled
                        ? `Play complete sentence ${item.id}`
                        : undefined
                    }
                    className={`wb-unit2-audio-control ${fullAudioEnabled ? "wb-unit2-completed-audio" : ""}`}
                    onClick={() => {
                      if (fullAudioEnabled)
                        playAudio(`full-${item.id}`, item.fullAudio);
                    }}
                    onKeyDown={(event) => {
                      if (
                        fullAudioEnabled &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`full-${item.id}`, item.fullAudio);
                      }
                    }}
                    style={styles.sentenceRow}
                  >
                    <WorkbookUnit2PlayingAudioIcon
                      active={activeAudioKey === `full-${item.id}`}
                    />
                    <div style={styles.sentenceNumber}>{item.id}</div>
                    <span
                      role="button"
                      tabIndex={fullAudioEnabled ? -1 : 0}
                      className="wb-unit2-audio-control wb-unit2-interactive"
                      onClick={(event) => {
                        if (fullAudioEnabled) return;
                        event.stopPropagation();
                        playAudio(`before-${item.id}`, item.beforeAudio);
                      }}
                      onKeyDown={(event) => {
                        if (
                          !fullAudioEnabled &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(`before-${item.id}`, item.beforeAudio);
                        }
                      }}
                      style={styles.sentenceText}
                    >
                      {item.before}
                      <WorkbookUnit2PlayingAudioIcon
                        active={activeAudioKey === `before-${item.id}`}
                      />
                    </span>

                    {/* Dropdown */}
                    <div style={styles.selectWrap}>
                      <select
                        disabled={showAns || fullAudioEnabled}
                        value={wordAnswers[item.id]}
                        onChange={(e) => {
                          if (showAns || fullAudioEnabled) return;

                          handleWordChange(item.id, e.target.value);
                        }}
                        style={{
                          ...styles.select,
                          color: wordAnswers[item.id]
                            ? wrong
                              ? RED
                              : RED
                            : "#aaa",
                          borderBottomColor: wrong ? WRONG : "#333",
                          cursor: showAns ? "default" : "pointer",
                        }}
                      >
                        <option value="" disabled hidden></option>
                        {WORD_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                      {wrong && <div style={styles.wrongBadge}>✕</div>}
                    </div>

                    <span
                      role="button"
                      tabIndex={fullAudioEnabled ? -1 : 0}
                      className="wb-unit2-audio-control wb-unit2-interactive"
                      onClick={(event) => {
                        if (fullAudioEnabled) return;
                        event.stopPropagation();
                        playAudio(`after-${item.id}`, item.afterAudio);
                      }}
                      onKeyDown={(event) => {
                        if (
                          !fullAudioEnabled &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(`after-${item.id}`, item.afterAudio);
                        }
                      }}
                      style={styles.sentenceText}
                    >
                      {item.after}
                      <WorkbookUnit2PlayingAudioIcon
                        active={activeAudioKey === `after-${item.id}`}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
            {/* ── Drag numbers ── */}
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
                    onDragStart={() => handleNumberDragStart(num)}
                    onDragEnd={handleNumberDragEnd}
                    onTouchStart={(e) => handleTouchStartNumber(e, num)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onKeyDown={(event) =>
                      keyboard.handleItemKeyDown(event, num)
                    }
                    style={styles.dragCircle}
                    className={`${disabled || showAns ? "wb-j-drag-disabled" : ""} ${selected ? "wb-j-drag-selected" : ""}`}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
            {/* ── Image cards — الصورة فقط بدون overlay ── */}
            <div
              className={`wb-j-cards-grid ${shakeGrid ? "wb-unit2-invalid-drop-shake" : ""}`}
              onAnimationEnd={() => setShakeGrid(false)}
            >
              {PICTURES.map((item) => {
                const wrong = isNumberWrong(item.id);
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      numberDropRefs.current[item.id] = el;
                      keyboard.registerTarget(`picture-${item.id}`, el);
                    }}
                    role="button"
                    tabIndex={
                      !showAns &&
                      !correctPictureIds.includes(`picture-${item.id}`) &&
                      (keyboard.keyboardItemId || imageAnswers[item.id])
                        ? 0
                        : -1
                    }
                    aria-disabled={
                      showAns ||
                      correctPictureIds.includes(`picture-${item.id}`)
                    }
                    style={{ position: "relative" }}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => {
                      if (!showAns) setHoveredCard(item.id);
                    }}
                    onDragLeave={() => setHoveredCard(null)}
                    onDrop={() => {
                      handleNumberDrop(item.id);
                      setHoveredCard(null);
                    }}
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
                      keyboard.handleTargetKeyDown(event, `picture-${item.id}`);
                    }}
                  >
                    <div
                      style={{
                        ...styles.imageCard,

                        transform:
                          hoveredCard === item.id ? "scale(1.05)" : "scale(1)",
                        boxShadow:
                          hoveredCard === item.id
                            ? "0 0 12px rgba(242,154,31,0.5)"
                            : "none",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.alt}
                        style={styles.image}
                        draggable={false}
                      />
                    </div>

                    {/* الرقم فوق الصورة — يمين أعلى */}
                    {(imageAnswers[item.id] ||
                      keyboard.keyboardTargetId === `picture-${item.id}`) && (
                      <div
                        style={{
                          position: "absolute",
                          top: "2%",
                          right: "7%",
                          fontSize: "clamp(18px,1.7vw,22px)",
                          fontWeight: 500,
                          color: getNumberColor(item.id),
                          lineHeight: 1,
                          zIndex: 3,
                          pointerEvents: "none",
                          textShadow: "0 1px 3px rgba(255,255,255,0.8)",
                        }}
                      >
                        <span
                          className={
                            keyboard.keyboardTargetId === `picture-${item.id}`
                              ? "wb-unit2-keyboard-preview"
                              : undefined
                          }
                        >
                          {keyboard.keyboardTargetId === `picture-${item.id}`
                            ? keyboard.keyboardItemId
                            : imageAnswers[item.id]}
                        </span>
                      </div>
                    )}

                    {wrong && (
                      <div
                        style={{
                          ...styles.wrongBadge,
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          zIndex: 4,
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>
                );
              })}
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
          className="wb-j-touch-preview"
          style={{ left: touchPos.x - 40, top: touchPos.y - 24 }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}
