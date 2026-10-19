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
import dollsAudio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise G/Item_001_dolls.mp3";
import carsAudio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise G/Item_002_cars.mp3";
import ballsAudio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise G/Item_003_balls.mp3";
import trainsAudio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise G/Item_004_trains.mp3";
import kitesAudio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise G/Item_005_kites.mp3";
import prefixAudio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise G/Item_006_Do_you_have_any.mp3";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex G 1.svg";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  { id: 1, correct: "dolls?" },
  { id: 2, correct: "cars?" },
  { id: 3, correct: "balls?" },
  { id: 4, correct: "trains?" },
  { id: 5, correct: "kites?" },
];

const DRAG_ITEMS = [
  { id: 1, value: "dolls?", audio: dollsAudio },
  { id: 2, value: "cars?", audio: carsAudio },
  { id: 3, value: "balls?", audio: ballsAudio },
  { id: 4, value: "trains?", audio: trainsAudio },
  { id: 5, value: "kites?", audio: kitesAudio },
];

export default function WB_Unit3_Page18_QB() {
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

  const keyboard = useWorkbookUnit3TabDrag({
    itemIds: DRAG_ITEMS.map((item) => item.id),
    targetIds: ITEMS.map((item) => `a-${item.id}`),
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

  const renderDropBox = (boxKey, wrong) => {
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
        className={`wb-g18-drop-box wb-unit3-drop-target ${wrong ? "wrong" : ""}`}
        getStyle={(isOver) => ({
          color: "#111",

          /* 🔥 hover effect */
          backgroundColor: isOver ? "rgba(243, 155, 66, 0.15)" : "transparent",

          borderBottom: isOver
            ? "1px solid #f39b42"
            : wrong
              ? "2px solid red"
              : "1px solid #3f3f3f",

          transform: isOver ? "scale(1.05)" : "scale(1)",

          transition: "all 0.2s ease",
        })}
        value={value}
        preview={previewValue}
        wrongNode={
          wrong ? <div className="wb-g18-wrong-badge">✕</div> : null
        }
      />
    );
  };

  const isWrong = (item) =>
    showResults && answers[`a-${item.id}`]?.value !== item.correct;

  const handleCheck = () => {
    if (showAns || lockedKeys.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const score = ITEMS.filter(
      (item) => answers[`a-${item.id}`]?.value === item.correct,
    ).length;

    setShowResults(true);
    setLockedKeys(
      ITEMS.filter(
        (item) => answers[`a-${item.id}`]?.value === item.correct,
      ).map((item) => `a-${item.id}`),
    );

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
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? `a-${item.id}`,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setActiveItem(null);
    setLockedKeys(ITEMS.map((item) => `a-${item.id}`));
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
        <style>{`
        .wb-g18-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.2vw, 28px);
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .wb-g18-bank {
          display: flex;
          gap: 25px;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        .wb-g18-chip {
          padding: 8px 22px;
          border-radius: clamp(10px, 1.4vw, 14px);
          user-select: none;
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: 0.2s ease;
          touch-action: none;
          text-align: center;
        }

        .wb-g18-stage {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .wb-g18-board {
          position: relative;
          width: 80%;
          // max-width: clamp(320px, 88vw, 860px);
          display: flex;
    // justify-content: center;
        }

        .wb-g18-image {
          width: 65%;
          height: auto;
          display: block;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
                      

        }

        .wb-g18-panel {
          position: absolute;
          right: 0%;
          bottom: 0%;
          width: clamp(170px, 40vw, 300px);
          background: white;
          border: 2px solid ${ACTIVE_COLOR};
          border-radius: clamp(10px, 1.6vw, 12px);
          padding: 10px;
          box-sizing: border-box;
        }

        .wb-g18-row {
          display: flex;
          align-items: center;
          gap: clamp(4px, 0.8vw, 6px);
          margin-bottom: clamp(7px, 0.2vw, 5px);
        }

        .wb-g18-row:last-child {
          margin-bottom: 0;
        }

        .wb-g18-prefix {
          font-size: clamp(11px, 1.4vw, 16px);
          color: #111;
          line-height: 1.1;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .wb-g18-drop-box {
          min-width: clamp(74px, 15vw, 150px);
          width: 100%;
          min-height: clamp(24px, 3.6vw, 32px);
          border-bottom: 1px solid #3f3f3f;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: clamp(13px, 1.4vw, 18px);
          line-height: 1.1;
          color: #111;
          padding: 0 4px 2px;
          box-sizing: border-box;
          position: relative;
          // font-weight: 500;
          background: transparent;
          word-break: break-word;
        }

        .wb-g18-drop-box.wrong {
          background-color: rgba(239, 68, 68, 0.08);
          border-radius: 6px 6px 0 0;
        }

        .wb-g18-wrong-badge {
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

        .wb-g18-buttons {
          margin-top: clamp(4px, 1vw, 6px);
          display: flex;
          justify-content: center;
        }

        .wb-g18-chip-selected {
          transform: scale(1.06);
          box-shadow: 0 0 0 3px rgba(243, 155, 66, 0.2);
        }

        .wb-g18-chip-disabled {
          box-shadow: none !important;
          cursor: not-allowed !important;
          opacity: 0.6;
        }

        .wb-g18-touch-preview {
          position: fixed;
          left: 0;
          top: 0;
          transform: translate(-50%, -50%);
          padding: 10px 14px;
          min-width: max-content;
          border-radius: 14px;
          background: ${ACTIVE_COLOR};
          color: #fff;
          font-size: clamp(14px, 1.6vw, 16px);
          font-weight: 600;
          pointer-events: none;
          z-index: 9999;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          white-space: nowrap;
        }

        @media (max-width: 700px) {
          .wb-g18-panel {
            top: clamp(150px, 49vw, 340px);
            width: clamp(160px, 43vw, 250px);
          }
        }

        @media (max-width: 480px) {
          .wb-g18-prefix {
            font-size: clamp(10px, 3vw, 13px);
          }

          .wb-g18-drop-box {
            min-width: clamp(60px, 20vw, 100px);
            font-size: clamp(12px, 3.4vw, 14px);
          }

          .wb-g18-panel {
            right: 6px;
            top: clamp(138px, 48vw, 240px);
            width: clamp(150px, 45vw, 210px);
            padding: 8px 8px 10px;
          }

          .wb-g18-row {
            gap: 4px;
            margin-bottom: 8px;
          }
        }
      `}</style>
        {/* 🔹 نفس CSS تبعك بدون تغيير */}
        {/* (ما لمسته نهائياً) */}

        <div className="div-forall" style={{ gap: "28px" }}>
          <ExerciseHeader
            sectionLetter="G"
            title="Look and write Helen's questions."
            subTitle="Identify each toy word into each Do you have any question before dragging it, then place one item at a time and review every target before checking."
          />

          <div className="wb-g18-bank w-full">
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
                  className={`wb-g18-chip wb-unit3-drag-item wb-unit3-audio-control ${
                    isUsed || showAns ? "wb-g18-chip-disabled" : ""
                  }`}
                  style={{
                    border: `1px solid ${
                      isUsed ? BORDER_COLOR : ACTIVE_COLOR
                    }`,
                    backgroundColor: isUsed ? "#eeeeee" : "",
                    color: isUsed ? "#999" : "#222",
                    cursor:
                      isUsed || showAns || showResults
                        ? "not-allowed"
                        : "grab",
                  }}
                >
                  {item.value}
                </WorkbookUnit3DragItem>
              );
            })}
          </div>

          <div className="wb-g18-stage w-full">
            <div className="wb-g18-board">
              <img
                src={exerciseImg}
                alt="A toy shop scene with dolls, cars, balls, trains, and kites"
                className="wb-g18-image"
              />

              <div className="wb-g18-panel">
                {ITEMS.map((item) => (
                  <div key={item.id} className="wb-g18-row">
                    <span
                      className="wb-g18-prefix wb-unit3-audio-control wb-unit3-interactive"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        playAudio(`prefix-${item.id}`, prefixAudio)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`prefix-${item.id}`, prefixAudio);
                        }
                      }}
                    >
                      <WorkbookUnit3PlayingAudioIcon
                        active={activeAudioKey === `prefix-${item.id}`}
                      />
                      Do you have any
                    </span>
                    {renderDropBox(`a-${item.id}`, isWrong(item))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="wb-g18-buttons">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>

        {/* 🔥 DragOverlay */}
        <DragOverlay>
          {activeItem ? (
            <div
              className="wb-g18-chip"
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
