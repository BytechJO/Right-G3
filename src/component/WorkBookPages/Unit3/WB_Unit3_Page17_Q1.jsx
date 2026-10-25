import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import useWorkbookUnit3TabDrag from "./useWorkbookUnit3TabDrag";
import {
  WorkbookUnit3DragItem,
  WorkbookUnit3DropTarget,
} from "./WorkbookUnit3DragControls";
import "./workbookUnit3Interactions.css";
import glovesAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise E/Item_001_They_have_gloves.mp3";
import questionAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise E/Item_002_What_do_they_have.mp3";
import dollsAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise E/Item_003_They_have_some_dolls.mp3";
import fruitAudio from "../../../assets/audio/WorkBook/unit3/Page 17 - Exercise E/Item_004_They_have_some_fruit.mp3";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 17/3.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

/* نفس ITEMS و DRAG_ITEMS بدون تغيير */
const ITEMS = [
  {
    id: 1,
    img: img1,
    fixedQuestion: "What do they have?",
    correctQuestion: "What do they have?",
    correctAnswer: "They have gloves.",
    lockQuestion: true,
    lockAnswer: false,
  },
  {
    id: 2,
    img: img2,
    fixedAnswer: "They have some fruit.",
    correctQuestion: "What do they have?",
    correctAnswer: "They have some fruit.",
    lockQuestion: false,
    lockAnswer: true,
  },
  {
    id: 3,
    img: img3,
    fixedQuestion: "What do they have?",
    correctQuestion: "What do they have?",
    correctAnswer: "They have some dolls.",
    lockQuestion: true,
    lockAnswer: false,
  },
];
const DRAG_ITEMS = [
  { id: 1, value: "They have gloves.", audio: glovesAudio },
  { id: 2, value: "What do they have?", audio: questionAudio },
  { id: 3, value: "They have some dolls.", audio: dollsAudio },
];
const LINE_AUDIO = {
  "They have gloves.": glovesAudio,
  "What do they have?": questionAudio,
  "They have some dolls.": dollsAudio,
  "They have some fruit.": fruitAudio,
};
const IMAGE_ALTS = {
  1: "People wearing gloves",
  2: "Girls with fruit",
  3: "A woman and children with dolls",
};
export default function WB_Unit3_Page16_QE() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedKeys, setLockedKeys] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    if (showAns || !item || lockedKeys.includes(boxKey)) return;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(newAnswers);
    setActiveItem(null);
  };

  const targetIds = ["a-1", "q-2", "a-3"];
  const keyboard = useWorkbookUnit3TabDrag({
    itemIds: DRAG_ITEMS.map((item) => item.id),
    targetIds,
    isItemDisabled: (id) => usedDragIds.includes(id) || showAns,
    isTargetDisabled: (id) => lockedKeys.includes(id) || showAns,
    onPick: (id) => {
      const item = DRAG_ITEMS.find((entry) => entry.id === id);
      playAudio(`drag-${id}`, item?.audio);
    },
    onPlace: (id, boxKey) =>
      applyDrop(
        boxKey,
        DRAG_ITEMS.find((item) => item.id === id),
      ),
  });
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const dragged = DRAG_ITEMS.find((d) => d.id === active.id);
    applyDrop(over.id, dragged);
  };

  const renderDropBox = (boxKey, isWrong) => {
    const value = answers[boxKey]?.value || "";
    const filledEditable =
      Boolean(value) && !lockedKeys.includes(boxKey) && !showAns;
    const preview =
      keyboard.keyboardItemId && keyboard.keyboardTargetId === boxKey;
    const previewValue = preview
      ? DRAG_ITEMS.find((item) => item.id === keyboard.keyboardItemId)?.value
      : "";

    return (
      <WorkbookUnit3DropTarget
        id={boxKey}
        registerTarget={keyboard.registerTarget}
        locked={lockedKeys.includes(boxKey) || showAns}
        tabIndex={keyboard.keyboardItemId || filledEditable ? 0 : -1}
        ariaLabel={`${value || "Empty answer slot"}${
          lockedKeys.includes(boxKey) ? ", correct and locked" : ""
        }`}
        onRemove={() => {
          if (!filledEditable) return;
          const removedId = answers[boxKey]?.dragId;
          setAnswers((prev) => {
            const next = { ...prev };
            delete next[boxKey];
            return next;
          });
          if (removedId) keyboard.focusItem(removedId);
        }}
        onKeyDown={(event) => {
          if (keyboard.keyboardItemId)
            keyboard.handleTargetKeyDown(event, boxKey);
          else if (
            filledEditable &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            const removedId = answers[boxKey]?.dragId;
            setAnswers((prev) => {
              const next = { ...prev };
              delete next[boxKey];
              return next;
            });
            if (removedId) keyboard.focusItem(removedId);
          }
        }}
        className={`wb-e17-drop wb-unit3-drop-target ${isWrong ? "wrong" : ""}`}
        getStyle={(isOver) => ({
          color: showAns ? "#000000ff" : "#111",

          /* 🔥 الإيفيكت */
          backgroundColor: isOver ? "rgba(243, 155, 66, 0.15)" : "transparent",

          borderBottom: isOver
            ? "2px solid #f39b42"
            : isWrong
              ? "2px solid red"
              : "1px solid #444",

          transform: isOver ? "scale(1.03)" : "scale(1)",

          transition: "all 0.2s ease",
        })}
        value={value}
        preview={previewValue}
        wrongNode={
          isWrong ? <div className="wb-e17-wrong-badge">✕</div> : null
        }
      />
    );
  };
  const handleCheck = () => {
    if (showAns || lockedKeys.length === targetIds.length) return;

    const allAnswered = ITEMS.every((item) => {
      const qReady = item.lockQuestion || answers[`q-${item.id}`]?.value;
      const aReady = item.lockAnswer || answers[`a-${item.id}`]?.value;
      return qReady && aReady;
    });

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    let total = 0;

    ITEMS.forEach((item) => {
      const userQuestion = item.lockQuestion
        ? item.correctQuestion
        : answers[`q-${item.id}`]?.value;

      const userAnswer = item.lockAnswer
        ? item.correctAnswer
        : answers[`a-${item.id}`]?.value;

      if (userQuestion === item.correctQuestion) score++;
      if (userAnswer === item.correctAnswer) score++;

      total += 2;
    });

    setShowResults(true);
    setLockedKeys(
      targetIds.filter((key) => {
        const [type, rawId] = key.split("-");
        const item = ITEMS.find((entry) => entry.id === Number(rawId));
        return (
          answers[key]?.value ===
          (type === "q" ? item.correctQuestion : item.correctAnswer)
        );
      }),
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
    const filled = {};

    ITEMS.forEach((item) => {
      if (!item.lockQuestion) {
        const qMatch = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctQuestion,
        );

        filled[`q-${item.id}`] = {
          dragId: qMatch?.id ?? `q-${item.id}`,
          value: item.correctQuestion,
        };
      }

      if (!item.lockAnswer) {
        const aMatch = DRAG_ITEMS.find(
          (drag) => drag.value === item.correctAnswer,
        );

        filled[`a-${item.id}`] = {
          dragId: aMatch?.id ?? `a-${item.id}`,
          value: item.correctAnswer,
        };
      }
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setActiveItem(null);
    setLockedKeys(targetIds);
    keyboard.cancel();
    stopAudio();
  };
  const handleStartAgain = () => {
    setAnswers({});
    setActiveItem(null);
    setShowResults(false);
    setShowAns(false);
    setLockedKeys([]);
    keyboard.cancel();
    stopAudio();
  };
  const isWrongQuestion = (item) =>
    showResults &&
    !item.lockQuestion &&
    answers[`q-${item.id}`]?.value !== item.correctQuestion;

  const isWrongAnswer = (item) =>
    showResults &&
    !item.lockAnswer &&
    answers[`a-${item.id}`]?.value !== item.correctAnswer;

  const renderFixedLine = (text, instanceKey, color = "#111") => (
    <div
      className="wb-e17-drop wb-e17-fixed wb-unit3-audio-control wb-unit3-interactive"
      role="button"
      tabIndex={0}
      onClick={() => playAudio(`fixed-${instanceKey}`, LINE_AUDIO[text])}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          playAudio(`fixed-${instanceKey}`, LINE_AUDIO[text]);
        }
      }}
      style={{ color }}
    >
      <WorkbookUnit3PlayingAudioIcon
        active={activeAudioKey === `fixed-${instanceKey}`}
      />
      {text}
    </div>
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => {
        setActiveItem(DRAG_ITEMS.find((d) => d.id === e.active.id));
      }}
      onDragEnd={(event) => {
        handleDragEnd(event);
        setActiveItem(null);
      }}
    >
      <div className="main-container-component">
        {/* 🔹 نفس الستايل 100% بدون تغيير */}
        <style>{`
        .wb-e17-wrap {
          display: flex;
          flex-direction: column;
          gap:35px;
          width: 100%;
        }

        .wb-e17-bank {
          display: flex;
          flex-wrap: wrap;
          gap:25px;
          justify-content: center;
          align-items: center;
          padding-top: 2px;
        }

        .wb-e17-chip {
          padding: 8px 22px;
          border-radius: clamp(12px, 1.4vw, 14px);
          user-select: none;
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: 0.2s ease;
          touch-action: none;
          text-align: center;
        }

        .wb-e17-chip.disabled {
          box-shadow: none;
          opacity: 0.55;
        }

        .wb-e17-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .wb-e17-row {
          display: flex;
          gap: clamp(12px, 1.8vw, 18px);
          align-items: flex-start;
          width: 100%;
        }

        .wb-e17-num {
          font-size: clamp(16px, 1.7vw, 20px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-e17-img {
          width:180px;
          height: auto;
          object-fit: contain;
          display: block;
          justify-self: start;
                             

        }

        .wb-e17-lines {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 12px);
          width: 100%;
          justify-content: start;
          min-width: 0;
        }

        .wb-e17-drop {
          width: min(100%, clamp(280px, 48vw, 520px));
          min-height: clamp(40px, 5vw, 44px);
          border-bottom: 1px solid #444;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: clamp(12px, 1.4vw, 18px);
          line-height: 1.35;
          background-color: transparent;
          border-radius: 6px 6px 0 0;
          padding: 0 clamp(6px, 1vw, 8px) 4px;
          box-sizing: border-box;
          position: relative;
          word-break: break-word;
        }

        .wb-e17-fixed {
          background: transparent;
          border-bottom: 1px solid transparent;

        }

        .wb-e17-wrong-badge {
          position: absolute;
          top: -10px;
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

        .wb-e17-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .wb-e17-touch-preview {
          position: fixed;
          z-index: 9999;
          transform: translate(-50%, -50%);
          pointer-events: none;
          padding: clamp(8px, 1vw, 10px) clamp(12px, 1.6vw, 16px);
          border-radius: clamp(12px, 1.4vw, 14px);
          background: ${SOFT_COLOR};
          border: 1.5px solid ${ACTIVE_COLOR};
          color: #222;
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0,0,0,0.14);
          max-width: min(80vw, 320px);
          text-align: center;
        }

        @media (max-width: 900px) {
          .wb-e17-row {
            grid-template-columns:
              clamp(24px, 3vw, 34px)
              minmax(130px, clamp(180px, 30vw, 260px))
              minmax(0, 1fr);
            gap: 14px;
          }

          .wb-e17-img {
            width: clamp(140px, 30vw, 250px);
            height: clamp(95px, 20vw, 150px);
          }

          .wb-e17-drop {
            width: min(100%, 100%);
          }
        }

        @media (max-width: 700px) {
          .wb-e17-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wb-e17-num {
            font-size: clamp(18px, 4.8vw, 21px);
          }

          .wb-e17-img {
            justify-self: center;
            width: clamp(170px, 56vw, 290px);
            height: clamp(110px, 36vw, 185px);
          }

          .wb-e17-lines {
            align-items: flex-start;
          }

          .wb-e17-drop {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .wb-e17-chip {
            width: 100%;
          }

          .wb-e17-drop {
            font-size: clamp(15px, 4vw, 19px);
          }
        }
      `}</style>
        <div className="div-forall" style={{ gap: "25px" }}>
          <ExerciseHeader
            sectionLetter="E"
            title="Look and write the questions or answers."
            subTitle="Identify each question or answer chip into each conversation line before dragging it, then place one item at a time and review every target before checking."
          />

          <div className="wb-e17-wrap">
            <div className="wb-e17-bank">
              {DRAG_ITEMS.map((item) => {
                const isUsed = usedDragIds.includes(item.id);
                return (
                  <WorkbookUnit3DragItem
                    key={item.id}
                    id={item.id}
                    disabled={isUsed || showAns}
                    registerItem={keyboard.registerItem}
                    onPlayAudio={() =>
                      playAudio(`drag-${item.id}`, item.audio)
                    }
                    onKeyboardPick={() => keyboard.pickItem(item.id)}
                    activeAudio={activeAudioKey === `drag-${item.id}`}
                    ariaLabel={`${item.value} draggable answer${
                      isUsed ? ", already used" : ""
                    }`}
                    className={`wb-e17-chip wb-unit3-drag-item wb-unit3-audio-control ${
                      isUsed ? "disabled" : ""
                    }`}
                    style={{
                      border: `1px solid ${
                        isUsed ? BORDER_COLOR : ACTIVE_COLOR
                      }`,
                      backgroundColor: isUsed ? "#efefef" : "",
                      color: isUsed ? "#9a9a9a" : "#222",
                      cursor: isUsed || showAns ? "not-allowed" : "grab",
                    }}
                  >
                    {item.value}
                  </WorkbookUnit3DragItem>
                );
              })}
            </div>

            <div className="wb-e17-list">
              {ITEMS.map((item) => (
                <div key={item.id} className="wb-e17-row">
                  <div className="wb-e17-num">{item.id}</div>

                  <img
                    src={item.img}
                    alt={IMAGE_ALTS[item.id]}
                    className="wb-e17-img"
                  />

                  <div className="wb-e17-lines">
                    {item.lockQuestion ? (
                      renderFixedLine(item.fixedQuestion, `question-${item.id}`)
                    ) : (
                      renderDropBox(
                        `q-${item.id}`,
                        isWrongQuestion(item),
                      )
                    )}

                    {item.lockAnswer ? (
                      renderFixedLine(item.fixedAnswer, `answer-${item.id}`)
                    ) : (
                      renderDropBox(`a-${item.id}`, isWrongAnswer(item))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="wb-e17-buttons">
              <Button
                handleShowAnswer={handleShowAnswer}
                handleStartAgain={handleStartAgain}
                checkAnswers={handleCheck}
              />
            </div>
          </div>
        </div>

        {/* 🔥 DragOverlay */}
        <DragOverlay>
          {activeItem ? (
            <div
              className="wb-e17-chip"
              style={{
                border: `1px solid ${ACTIVE_COLOR}`,
                backgroundColor: "white",
                color: "#222",
                cursor: "grabbing",
              }}
            >
              {activeItem.value}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
