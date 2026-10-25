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
import fruitsAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise C/Item_001_fruits.mp3";
import capsAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise C/Item_002_caps.mp3";
import sweetsAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise C/Item_003_sweets.mp3";
import prefixAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise C/Item_004_They_have_some.mp3";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex C 3.svg";

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#d9d9d9";

const ITEMS = [
  { id: 1, img: img1, prefix: "They have some", correct: "fruits." },
  { id: 2, img: img2, prefix: "They have some", correct: "caps." },
  { id: 3, img: img3, prefix: "They have some", correct: "sweets." },
];

const DRAG_ITEMS = [
  { id: 1, value: "fruits.", audio: fruitsAudio },
  { id: 2, value: "caps.", audio: capsAudio },
  { id: 3, value: "sweets.", audio: sweetsAudio },
];

const IMAGE_ALTS = {
  1: "Children with a bowl of fruit",
  2: "Children wearing caps",
  3: "Boys with sweets and a cake",
};

export default function WB_Unit3_Page16_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [lockedKeys, setLockedKeys] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );
  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const handleCheck = () => {
    if (showAns || lockedKeys.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length;

    ITEMS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
    });

    setShowResults(true);
    setLockedKeys(
      ITEMS.filter(
        (item) => answers[`a-${item.id}`]?.value === item.correct,
      ).map((item) => `a-${item.id}`),
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
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedKeys(ITEMS.map((item) => `a-${item.id}`));
    keyboard.cancel();
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedKeys([]);
    keyboard.cancel();
    stopAudio();
  };

  const handleRemoveAnswer = (boxKey) => {
    if (showAns || lockedKeys.includes(boxKey)) return;

    const removedId = answers[boxKey]?.dragId;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    if (removedId) keyboard.focusItem(removedId);
  };

  const isWrongAnswer = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  // ✅ draggable
  const placeItem = (dragId, boxKey) => {
    if (showAns || lockedKeys.includes(boxKey)) return;
    const draggedItem = DRAG_ITEMS.find((item) => item.id === dragId);
    if (!draggedItem) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key]?.dragId === dragId) delete updated[key];
      });
      updated[boxKey] = { dragId, value: draggedItem.value };
      return updated;
    });
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
    onPlace: placeItem,
  });
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
        ariaLabel={`${value || "Empty answer slot"}${lockedKeys.includes(boxKey) ? ", correct and locked" : ""}`}
        onRemove={() => handleRemoveAnswer(boxKey)}
        onKeyDown={(event) => {
          if (keyboard.keyboardItemId) {
            keyboard.handleTargetKeyDown(event, boxKey);
          } else if (
            filledEditable &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            handleRemoveAnswer(boxKey);
          }
        }}
        className={`wb-c16-drop-box wb-unit3-drop-target ${isWrong ? "wrong" : ""}`}
        getStyle={(isOver) => ({
          color: showAns ? "#000000ff" : "#111",
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
        wrongNode={isWrong ? <div className="wb-c16-wrong">✕</div> : null}
      />
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-c16-bank {
          display: flex;
          flex-wrap: wrap;
          gap: 50px;
          justify-content: center;
          align-items: center;
          padding: clamp(4px, 0.8vw, 6px) 0 0;
        }

        .wb-c16-chip {
          padding: 8px 22px;
          border-radius: clamp(10px, 1.4vw, 14px);
          font-size: clamp(14px, 1.6vw, 18px);
          // font-weight: 500;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: 0.2s ease;
          user-select: none;
          touch-action: none;
          text-align: center;
          z-index:999999
        }

        .wb-c16-list {
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 18px);
          width: 100%;
        }

        .wb-c16-row {
          display: flex; 
          gap: clamp(10px, 1.5vw, 14px);
          align-items: center;
          width: 90%;
        }

        .wb-c16-num {
          font-size: clamp(16px, 1.7vw, 20px);
          font-weight: 700;
          color: #222;
          line-height: 1;
          
        }

        .wb-c16-img {
          width: 100%;
          // max-width: clamp(220px, 31vw, 310px);
          // height: clamp(120px, 16vw, 170px);
          object-fit: contain;
          display: block;
                    // border: 2px solid #f39b42;
object-fit: cover;

        }

        .wb-c16-sentence-wrap {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 1vw, 8px);
          justify-content: center;
          min-width: 0;
        }

        .wb-c16-sentence-line {
          display: flex;
          // align-items: flex-end;
          flex-direction :column;
          gap: clamp(8px, 1vw, 10px);
          flex-wrap: wrap;
          position: relative;
          min-width: 0;
        }

        .wb-c16-prefix {
          font-size: clamp(14px, 1.7vw, 18px);
          color: #222;
          line-height: 1.2;
        }

        .wb-c16-drop-box {
          width: (100%, clamp(150px, 22vw, 190px));
          min-height: clamp(38px, 5vw, 42px);
          border-bottom: 1px solid #111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(14px, 1.7vw, 18px);
          color: #111;
          border-radius: 8px 8px 0 0;
          padding: 0 8px 4px;
          box-sizing: border-box;
          position: relative;
          text-align: center;
          word-break: break-word;
          transition: 0.2s ease;
        }

        .wb-c16-long-line {
          width: 100%;
          border-bottom: 1px solid #111;
          height: 12px;
        }

        .wb-c16-wrong {
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

        .wb-c16-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        .wb-c16-touch-preview {
          position: fixed;
          background: #fff;
          padding: 8px 12px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          pointer-events: none;
          z-index: 9999;
          font-size: clamp(15px, 1.7vw, 18px);
          font-weight: 600;
          color: #222;
          max-width: 180px;
          text-align: center;
        }

        @media (max-width: 900px) {
          .wb-c16-row {
            grid-template-columns: clamp(24px, 3vw, 34px) clamp(160px, 32vw, 280px) minmax(0, 1fr);
          }
        }

        @media (max-width: 760px) {
          .wb-c16-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wb-c16-num {
            margin-bottom: -4px;
          }

          .wb-c16-img {
            max-width: clamp(220px, 56vw, 320px);
            height: clamp(120px, 34vw, 190px);
          }

          .wb-c16-sentence-wrap {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .wb-c16-chip {
            width: 100%;
          }

          .wb-c16-prefix,
          .wb-c16-drop-box {
            font-size: clamp(16px, 4.4vw, 18px);
          }

          .wb-c16-drop-box {
            width: min(100%, 170px);
          }
        }
      `}</style>
      <DndContext
        sensors={sensors}
        onDragStart={(event) => {
          const item = DRAG_ITEMS.find((i) => i.id === event.active.id);
          setActiveItem(item);
        }}
        onDragEnd={(event) => {
          const { active, over } = event;

          if (over && !showAns) placeItem(active.id, over.id);

          setActiveItem(null);
        }}
      >
        <div className="div-forall" style={{ gap: "25px" }}>
          <ExerciseHeader
            sectionLetter="C"
            title="Look and complete the sentences."
            subTitle="Identify each fruit, caps, or sweets word into the correct sentence before dragging it, then place one item at a time and review every target before checking."
          />

          {/* DRAG ITEMS */}
          <div className="wb-c16-bank w-full">
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
                  className="wb-c16-chip wb-unit3-drag-item wb-unit3-audio-control"
                  style={{
                    border: `1px solid ${
                      isUsed ? BORDER_COLOR : ACTIVE_COLOR
                    }`,
                    backgroundColor: isUsed ? "#efefef" : "",
                    color: isUsed ? "#9a9a9a" : "#222",
                    cursor:
                      isUsed || showAns || showResults
                        ? "not-allowed"
                        : "grab",
                    opacity: isUsed ? 0.55 : 1,
                    zIndex: "9999999",
                  }}
                >
                  {item.value}
                </WorkbookUnit3DragItem>
              );
            })}
          </div>

          {/* LIST */}
          <div className="wb-c16-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-c16-row">
                <div className="flex gap-5 items-start justify-center w-[100%]">
                  <span className="wb-c16-num">{item.id}</span>

                  <img
                    src={item.img}
                    alt={IMAGE_ALTS[item.id]}
                    className="wb-c16-img"
                    style={{ height: "120px", width: "auto" }}
                  />
                </div>

                <div className="wb-c16-sentence-wrap">
                  <div className="wb-c16-sentence-line">
                    <span
                      className="wb-c16-prefix wb-unit3-audio-control wb-unit3-interactive"
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
                      {item.prefix}
                    </span>

                    {renderDropBox(`a-${item.id}`, isWrongAnswer(item))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
              checkAnswers={handleCheck}
            />
          </div>
        </div>
        <DragOverlay>
          {activeItem ? (
            <div
              className="wb-c16-chip"
              style={{
                border: `1px solid ${ACTIVE_COLOR}`,
                // backgroundColor: SOFT_COLOR,
                backgroundColor: "white",
                color: "#222",
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                cursor: "grabbing",
                transform: "scale(1.05)",
                zIndex: "999999999",
              }}
            >
              {activeItem.value}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
