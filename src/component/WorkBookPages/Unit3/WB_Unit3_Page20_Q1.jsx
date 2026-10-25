import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import useWorkbookUnit3TabDrag from "./useWorkbookUnit3TabDrag";
import "./workbookUnit3Interactions.css";
import full1Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/full3.mp3";
import part1Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/Item_001_The.mp3";
import part2Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/Item_002_icken_is_eating_a_pea.mp3";
import part3Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/Item_003_at_the_bea.mp3";
import part4Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/Item_004_He_wants_a.mp3";
import part5Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/Item_005_ell._He_doesn't_want_a_wa.mp3";
import part6Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/Item_006_There_is_fi.mp3";
import part7Audio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise A/Item_007_in_the_ki.mp3";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex A  3.svg";

const OPTIONS = ["ch", "tch", "sh"];

const SENTENCES = [
  {
    id: 1,
    parts: ["The ", "icken is eating a pea", " at the bea", "."],
    answers: ["ch", "ch", "ch"],
  },
  {
    id: 2,
    parts: ["He wants a ", "ell. He doesn’t want a wa", "."],
    answers: ["sh", "tch"],
  },
  {
    id: 3,
    parts: ["There is fi", " in the ki", "en."],
    answers: ["sh", "tch"],
  },
];
const FULL_AUDIO = { 1: full1Audio, 2: full2Audio, 3: full3Audio };
const PART_AUDIO = {
  "1-0": part1Audio,
  "1-1": part2Audio,
  "1-2": part3Audio,
  "2-0": part4Audio,
  "2-1": part5Audio,
  "3-0": part6Audio,
  "3-1": part7Audio,
};
const IMAGE_ALTS = {
  1: "A boy thinking about a seashell and a watch",
  2: "A fish in a kitchen dish",
  3: "A chicken eating a peach at the beach",
};

const IMAGES = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
];

const correctImageAnswers = {
  1: 2,
  2: 3,
  3: 1,
};

const NUMBERS = [1, 2, 3];

export default function WB_Phonics_Page227_QA() {
  const [selectAnswers, setSelectAnswers] = useState({});
  const [imageAnswers, setImageAnswers] = useState({});
  const [activeNumber, setActiveNumber] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedSelectKeys, setLockedSelectKeys] = useState([]);
  const [wrongSelectKeys, setWrongSelectKeys] = useState([]);
  const [lockedImageIds, setLockedImageIds] = useState([]);
  const [wrongImageIds, setWrongImageIds] = useState([]);
  const [shakeGrid, setShakeGrid] = useState(false);
  const suppressClickRef = useRef(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const usedNumbers = Object.values(imageAnswers);

  const handleSelectChange = (key, value) => {
    if (showAns || lockedSelectKeys.includes(key)) return;
    setSelectAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
    setWrongSelectKeys((prev) => prev.filter((entry) => entry !== key));
  };

  const applyDrop = (imageId, num) => {
    if (showAns || num === null || lockedImageIds.includes(imageId)) return;

    const updated = { ...imageAnswers };

    Object.keys(updated).forEach((key) => {
      if (updated[key] === num) delete updated[key];
    });

    updated[imageId] = num;

    setImageAnswers(updated);
    setActiveNumber(null);
    setWrongImageIds((prev) => prev.filter((entry) => entry !== imageId));
  };

  const keyboard = useWorkbookUnit3TabDrag({
    itemIds: NUMBERS,
    targetIds: IMAGES.map((item) => item.id),
    isItemDisabled: (id) => usedNumbers.includes(id) || showAns,
    isTargetDisabled: (id) => lockedImageIds.includes(id) || showAns,
    onPlace: (id, imageId) => applyDrop(imageId, id),
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
      return;
    }

    applyDrop(over.id, active.id);
  };

  /* draggable */
  const DraggableNumber = ({ num }) => {
    const disabled = usedNumbers.includes(num);
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: num,
      disabled: disabled || showAns,
    });

    return (
      <div
        {...listeners}
        {...attributes}
        ref={(element) => {
          setNodeRef(element);
          keyboard.registerItem(num, element);
        }}
        role="button"
        tabIndex={disabled || showAns ? -1 : 0}
        aria-disabled={disabled || showAns}
        onKeyDown={(event) => keyboard.handleItemKeyDown(event, num)}
        className={`wb-a20-number-chip wb-unit3-drag-item ${disabled ? "disabled" : ""}`}
        style={{
          backgroundColor: disabled ? "#d1d5db" : "#f39b42",
          cursor: disabled || showAns ? "not-allowed" : "grab",
        }}
      >
        {num}
      </div>
    );
  };

  /* droppable */
  const DroppableImage = ({ item }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: item.id,
    });

    const filledEditable =
      Boolean(imageAnswers[item.id]) &&
      !lockedImageIds.includes(item.id) &&
      !showAns;
    const preview =
      keyboard.keyboardItemId && keyboard.keyboardTargetId === item.id;
    return (
      <div
        ref={(element) => {
          setNodeRef(element);
          keyboard.registerTarget(item.id, element);
        }}
        role="button"
        tabIndex={keyboard.keyboardItemId || filledEditable ? 0 : -1}
        aria-disabled={lockedImageIds.includes(item.id) || showAns}
        onClick={() => {
          if (!filledEditable || suppressClickRef.current) return;
          const removed = imageAnswers[item.id];
          setImageAnswers((prev) => {
            const next = { ...prev };
            delete next[item.id];
            return next;
          });
          setWrongImageIds((prev) => prev.filter((id) => id !== item.id));
          keyboard.focusItem(removed);
        }}
        onKeyDown={(event) => {
          if (keyboard.keyboardItemId)
            keyboard.handleTargetKeyDown(event, item.id);
          else if (
            filledEditable &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            const removed = imageAnswers[item.id];
            setImageAnswers((prev) => {
              const next = { ...prev };
              delete next[item.id];
              return next;
            });
            setWrongImageIds((prev) => prev.filter((id) => id !== item.id));
            keyboard.focusItem(removed);
          }
        }}
        className="wb-a20-image-card wb-unit3-drop-target"
        style={{
          /* 🔥 hover effect */
          transform: isOver ? "scale(1.05)" : "scale(1)",
          transition: "all 0.2s ease",
          boxShadow: isOver ? "0 0 0 3px rgba(243,155,66,0.25)" : "none",
        }}
      >
        <img
          src={item.img}
          alt={IMAGE_ALTS[item.id]}
          className="wb-a20-image"
        />

        <div className="wb-a20-image-number">
          <span className={preview ? "wb-unit3-keyboard-preview" : undefined}>
            {preview ? keyboard.keyboardItemId : imageAnswers[item.id] || ""}
          </span>
        </div>

        {isImageWrong(item.id) && <div className="wb-a20-image-wrong">✕</div>}
      </div>
    );
  };

  const getTotalBlanks = () =>
    SENTENCES.reduce((acc, s) => acc + s.answers.length, 0);

  const getScore = () => {
    let score = 0;

    SENTENCES.forEach((sentence) => {
      sentence.answers.forEach((ans, idx) => {
        const key = `s${sentence.id}-b${idx}`;
        if (selectAnswers[key] === ans) score++;
      });
    });

    IMAGES.forEach((img) => {
      if (imageAnswers[img.id] === correctImageAnswers[img.id]) score++;
    });

    return score;
  };

  const handleCheck = () => {
    const totalBlanks = getTotalBlanks();
    if (
      showAns ||
      (lockedSelectKeys.length === totalBlanks &&
        lockedImageIds.length === IMAGES.length)
    )
      return;

    const allSelectsAnswered = SENTENCES.every((sentence) =>
      sentence.answers.every(
        (_, idx) => selectAnswers[`s${sentence.id}-b${idx}`],
      ),
    );

    const allImagesAnswered = IMAGES.every((img) => imageAnswers[img.id]);

    if (!allSelectsAnswered || !allImagesAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const total = getTotalBlanks() + IMAGES.length;
    const score = getScore();

    setChecked(true);
    const correctSelects = [];
    const wrongSelects = [];
    SENTENCES.forEach((sentence) =>
      sentence.answers.forEach((answer, index) => {
        const key = `s${sentence.id}-b${index}`;
        (selectAnswers[key] === answer ? correctSelects : wrongSelects).push(
          key,
        );
      }),
    );
    setLockedSelectKeys(correctSelects);
    setWrongSelectKeys(wrongSelects);
    setLockedImageIds(
      IMAGES.filter(
        (item) => imageAnswers[item.id] === correctImageAnswers[item.id],
      ).map((item) => item.id),
    );
    setWrongImageIds(
      IMAGES.filter(
        (item) => imageAnswers[item.id] !== correctImageAnswers[item.id],
      ).map((item) => item.id),
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
    const filledSelects = {};

    SENTENCES.forEach((sentence) => {
      sentence.answers.forEach((ans, idx) => {
        filledSelects[`s${sentence.id}-b${idx}`] = ans;
      });
    });

    setSelectAnswers(filledSelects);
    setImageAnswers(correctImageAnswers);
    setChecked(true);
    setShowAns(true);
    setActiveNumber(null);
    setLockedSelectKeys(
      SENTENCES.flatMap((sentence) =>
        sentence.answers.map((_, index) => `s${sentence.id}-b${index}`),
      ),
    );
    setWrongSelectKeys([]);
    setLockedImageIds(IMAGES.map((item) => item.id));
    setWrongImageIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setSelectAnswers({});
    setImageAnswers({});
    setActiveNumber(null);
    setChecked(false);
    setShowAns(false);
    setLockedSelectKeys([]);
    setWrongSelectKeys([]);
    setLockedImageIds([]);
    setWrongImageIds([]);
    setShakeGrid(false);
    keyboard.cancel();
    stopAudio();
  };

  const isSelectWrong = (sentenceId, blankIndex) => {
    return wrongSelectKeys.includes(`s${sentenceId}-b${blankIndex}`);
  };

  const isImageWrong = (id) => {
    return wrongImageIds.includes(id);
  };

  const renderSelect = (sentenceId, blankIndex) => {
    const key = `s${sentenceId}-b${blankIndex}`;
    const value = selectAnswers[key] || "";
    const wrong = isSelectWrong(sentenceId, blankIndex);

    return (
      <span className="wb-a20-select-wrap">
        <select
          value={value}
          disabled={showAns || lockedSelectKeys.includes(key)}
          onChange={(e) => handleSelectChange(key, e.target.value)}
          className="wb-a20-select"
          style={{
            borderBottom: wrong ? "1px solid red" : "1px solid #111111cf",
          }}
        >
          <option value="" disabled></option>
          {OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {!showAns && <span className="wb-a20-select-arrow">▼</span>}

        {wrong && <span className="wb-a20-wrong-badge">✕</span>}
      </span>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => {
        suppressClickRef.current = true;
        setActiveNumber(e.active.id);
      }}
      onDragEnd={(event) => {
        handleDragEnd(event);
        setActiveNumber(null);
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }}
    >
      <div className="main-container-component">
        {/* 🔥 نفس CSS تبعك بدون تعديل */}
        <style>{`
        .wb-a20-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.4vw, 28px);
          width: 100%;
        }

        .wb-a20-main-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(120px, 22vw, 230px);
          gap: clamp(10px, 2vw, 28px);
          align-items: start;
          width: 100%;
        }

        .wb-a20-left {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 4vw, 62px);
          padding-top: clamp(2px, 1vw, 18px);
          min-width: 0;
        }

        .wb-a20-sentence-row {
          display: flex;
          align-items: flex-start;
          gap: clamp(6px, 1vw, 18px);
          flex-wrap: wrap;
          width: 100%;
        }

        .wb-a20-sentence-num {
          font-size: clamp(16px, 1.7vw, 20px);
          font-weight: 700;
          color: #222;
          min-width: clamp(16px, 2vw, 24px);
          line-height: 1;
          flex-shrink: 0;
          padding-top: clamp(2px, 0.5vw, 6px);
        }

        .wb-a20-sentence-text {
          font-size: clamp(14px, 1.7vw, 18px);
          color: #222;
          line-height: 1.5;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          min-width: 0;
          flex: 1;
        }

        .wb-a20-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          margin: 0 4px;
        }

        .wb-a20-select {
          min-width: clamp(42px, 6vw, 78px);
          width: clamp(42px, 6vw, 78px);
          height: clamp(28px, 4vw, 42px);
          font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 500;
          color: #000;
          border-bottom: 1px solid #000000ff;
          outline: none;
          background: transparent;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          text-align: center;
          line-height: 1;
        }

        .wb-a20-select-arrow {
          position: absolute;
          right: 0.2px;
          bottom: 10px;
          font-size: clamp(11px, 1.3vw, 14px);
          color: #666;
          pointer-events: none;
        }

        .wb-a20-wrong-badge {
         position: absolute;
          top: 0px;
          right: -10px;
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

        .wb-a20-right {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.4vw, 16px);
          align-items: center;
          height:100%;
           justify-content: space-between;
          min-width: 0;
        }

        .wb-a20-image-card {
          position: relative;
          // width: clamp(110px, 20vw, 230px);
          // height: clamp(78px, 12vw, 145px);
          // border: 3px solid #f39b42;
          // border-radius: clamp(10px, 2vw, 18px);
          background: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .wb-a20-image {
          width: auto;
          height: 120px;
          object-fit: cover;
          display: block;
        }

        .wb-a20-image-number {
          position: absolute;
              right: 0px;
    bottom: 0px;
    width: clamp(24px, 3.4vw, 32px);
    height: clamp(24px, 3.4vw, 32px);
          // border-top: 3px solid #f39b42;
          // border-left: 3px solid #f39b42;
          border-top-left-radius: 8px;
          // background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(14px, 1.7vw, 20px);
          font-weight: 700;
          color: #111;
        }

        .wb-a20-image-wrong {
          position: absolute;
          top: 0px;
          right: 1%;
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

        .wb-a20-number-bank {
          display: flex;
          justify-content: center;
          gap: clamp(10px, 1.6vw, 14px);
          margin-top: 4px;
          flex-wrap: wrap;
        }

        .wb-a20-number-chip {
          width: clamp(34px, 4.6vw, 44px);
          height: clamp(34px, 4.6vw, 44px);
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: clamp(16px, 2.2vw, 22px);
          user-select: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          touch-action: none;
        }

        .wb-a20-number-chip.disabled {
          box-shadow: none;
          opacity: 0.55;
        }

        .wb-a20-touch-preview {
          position: fixed;
          z-index: 9999;
          transform: translate(-50%, -50%);
          pointer-events: none;
          width: clamp(34px, 4.6vw, 44px);
          height: clamp(34px, 4.6vw, 44px);
          border-radius: 50%;
          background: #f39b42;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: clamp(16px, 2.2vw, 22px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
        }

        .wb-a20-buttons {
          display: flex;
          justify-content: center;
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .wb-a20-main-grid {
            grid-template-columns: minmax(0, 1fr) clamp(105px, 18vw, 160px);
            gap: 10px;
          }

          .wb-a20-left {
            gap: 18px;
            padding-top: 0;
          }

          .wb-a20-sentence-text {
            font-size: clamp(13px, 1.7vw, 18px);
            line-height: 1.45;
          }

          .wb-a20-sentence-num {
            font-size: clamp(15px, 1.8vw, 20px);
          }

          .wb-a20-select {
            min-width: 42px;
            width: 42px;
            height: 28px;
            font-size: 14px;
            padding: 0 12px 2px 2px;
          }

          .wb-a20-select-arrow {
            right: 2px;
            bottom: 7px;
            font-size: 10px;
          }

          .wb-a20-image-card {
            width: clamp(100px, 16vw, 150px);
            height: clamp(72px, 11vw, 105px);
          }

          .wb-a20-image-number {
            width: 22px;
            height: 22px;
            font-size: 13px;
          }
        }

        @media (max-width: 600px) {
          .wb-a20-main-grid {
            grid-template-columns: minmax(0, 1fr) 92px;
            gap: 8px;
          }

          .wb-a20-left {
            gap: 30px;
          }

          .wb-a20-sentence-row {
            gap: 23px;
          }

          .wb-a20-sentence-text {
            font-size: 12px;
            line-height: 1.35;
          }

          .wb-a20-sentence-num {
            font-size: 14px;
            min-width: 14px;
          }

          .wb-a20-select {
            min-width: 38px;
            width: 38px;
            height: 24px;
            font-size: 12px;
            border-bottom-width: 2px;
            padding: 0 10px 2px 2px;
          }

          .wb-a20-select-arrow {
            right: 1px;
            bottom: 5px;
            font-size: 9px;
          }

          .wb-a20-image-card {
            width: 92px;
            height: 64px;
            border-width: 2px;
          }

          .wb-a20-image-number {
            width: 20px;
            height: 20px;
            font-size: 12px;
            border-top-width: 2px;
            border-left-width: 2px;
          }

          .wb-a20-number-chip {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }

          .wb-a20-touch-preview {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }
        }
      `}</style>

        <div className="div-forall" style={{ gap: "60px" }}>
          <ExerciseHeader
            sectionLetter="A"
            title={
              <>
                Write <span style={{ color: "#2e3192" }}>ch</span>,{" "}
                <span style={{ color: "#2e3192" }}>tch</span>, or{" "}
                <span style={{ color: "#2e3192" }}>sh</span>. Then number the
                pictures.
              </>
            }
            subTitle="Complete the ch, tch, or sh spelling and picture order first, then number the pictures only after each spelling is correct."
          />

          <div className="wb-a20-wrap">
            <div className="wb-a20-main-grid">
              <div className="wb-a20-left">
                {/* sentences نفسهم */}
                {SENTENCES.map((s) => {
                  const fullEnabled =
                    checked &&
                    s.answers.every(
                      (answer, index) =>
                        selectAnswers[`s${s.id}-b${index}`] === answer,
                    );
                  return (
                    <div
                      key={s.id}
                      className={`wb-a20-sentence-row wb-unit3-audio-control ${fullEnabled ? "wb-unit3-completed-audio" : ""}`}
                      role={fullEnabled ? "button" : undefined}
                      tabIndex={fullEnabled ? 0 : undefined}
                      aria-label={
                        fullEnabled
                          ? `Play completed sentence ${s.id}`
                          : undefined
                      }
                      onClick={() => {
                        if (fullEnabled)
                          playAudio(`full-${s.id}`, FULL_AUDIO[s.id]);
                      }}
                      onKeyDown={(event) => {
                        if (
                          fullEnabled &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          playAudio(`full-${s.id}`, FULL_AUDIO[s.id]);
                        }
                      }}
                    >
                      <WorkbookUnit3PlayingAudioIcon
                        active={activeAudioKey === `full-${s.id}`}
                      />
                      <span className="wb-a20-sentence-num">{s.id}</span>
                      <div className="wb-a20-sentence-text">
                        {s.parts.map((part, i) => (
                          <React.Fragment key={i}>
                            <span
                              className={
                                PART_AUDIO[`${s.id}-${i}`]
                                  ? "wb-unit3-audio-control wb-unit3-interactive"
                                  : undefined
                              }
                              role={
                                !fullEnabled && PART_AUDIO[`${s.id}-${i}`]
                                  ? "button"
                                  : undefined
                              }
                              tabIndex={
                                !fullEnabled && PART_AUDIO[`${s.id}-${i}`]
                                  ? 0
                                  : undefined
                              }
                              onClick={(event) => {
                                event.stopPropagation();
                                if (!fullEnabled)
                                  playAudio(
                                    `part-${s.id}-${i}`,
                                    PART_AUDIO[`${s.id}-${i}`],
                                  );
                              }}
                              onKeyDown={(event) => {
                                if (
                                  !fullEnabled &&
                                  PART_AUDIO[`${s.id}-${i}`] &&
                                  (event.key === "Enter" || event.key === " ")
                                ) {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  playAudio(
                                    `part-${s.id}-${i}`,
                                    PART_AUDIO[`${s.id}-${i}`],
                                  );
                                }
                              }}
                            >
                              <WorkbookUnit3PlayingAudioIcon
                                active={activeAudioKey === `part-${s.id}-${i}`}
                              />
                              {part}
                            </span>
                            {s.answers[i] &&
                              renderSelect(s.id, i, s.answers[i])}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="wb-a20-number-bank">
                  {NUMBERS.map((num) => (
                    <DraggableNumber key={num} num={num} />
                  ))}
                </div>
              </div>

              <div
                className={`wb-a20-right ${shakeGrid ? "wb-unit3-invalid-drop-shake" : ""}`}
                onAnimationEnd={() => setShakeGrid(false)}
              >
                {IMAGES.map((item) => (
                  <DroppableImage key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="wb-a20-buttons">
              <Button
                handleShowAnswer={handleShowAnswer}
                handleStartAgain={handleReset}
                checkAnswers={handleCheck}
              />
            </div>
          </div>
        </div>

        {/* 🔥 DragOverlay */}
        <DragOverlay>
          {activeNumber ? (
            <div className="wb-a20-touch-preview">{activeNumber}</div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
