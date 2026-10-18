/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit1PlayingAudioIcon from "./WorkbookUnit1PlayingAudioIcon";
import useWorkbookUnit1Audio from "./useWorkbookUnit1Audio";
import useWorkbookUnit1TabDrag from "./useWorkbookUnit1TabDrag";
import cakeAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_001_cake.mp3";
import tedAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_002_Ted.mp3";
import nightAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_003_night.mp3";
import coatAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_004_coat.mp3";
import blueAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_005_blue.mp3";
import glueAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_006_glue.mp3";
import antAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_007_ant.mp3";
import feetAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_008_feet.mp3";
import catAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_009_cat.mp3";
import sickAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_010_sick.mp3";
import boxAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_011_box.mp3";
import beeAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_012_bee.mp3";
import fishAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_013_fish.mp3";
import cupAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_014_cup.mp3";
import kiteAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_015_kite.mp3";
import rainAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_016_rain.mp3";
import homeAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_017_home.mp3";
import bedAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_018_bed.mp3";
import runAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_019_run.mp3";
import sockAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_020_sock.mp3";
import longAAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_021_long_a.mp3";
import longEAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_022_long_e.mp3";
import longIAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_023_long_i.mp3";
import longOAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_024_long_o.mp3";
import longUAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_025_long_u.mp3";
import shortAAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_026_short_a.mp3";
import shortEAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_027_short_e.mp3";
import shortIAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_028_short_i.mp3";
import shortOAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_029_short_o.mp3";
import shortUAudio from "../../../assets/audio/WorkBook/unit1/Page 8 - Exercise A/Item_030_short_u.mp3";
import "./workbookUnit1Interactions.css";
const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#f39b42";
const TABLE_BORDER = "#f39b42";
const FILLED_COLOR = "#000000ff";

import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

const DRAG_ITEMS = [
  { id: 1, value: "cake" },
  { id: 2, value: "Ted" },
  { id: 3, value: "night" },
  { id: 4, value: "coat" },
  { id: 5, value: "blue" },
  { id: 6, value: "glue" },
  { id: 7, value: "ant" },
  { id: 8, value: "feet" },
  { id: 9, value: "cat" },
  { id: 10, value: "sick" },
  { id: 11, value: "box" },
  { id: 12, value: "bee" },
  { id: 13, value: "fish" },
  { id: 14, value: "cup" },
  { id: 15, value: "kite" },
  { id: 16, value: "rain" },
  { id: 17, value: "home" },
  { id: 18, value: "bed" },
  { id: 19, value: "run" },
  { id: 20, value: "sock" },
];

const WORD_AUDIO = [
  cakeAudio,
  tedAudio,
  nightAudio,
  coatAudio,
  blueAudio,
  glueAudio,
  antAudio,
  feetAudio,
  catAudio,
  sickAudio,
  boxAudio,
  beeAudio,
  fishAudio,
  cupAudio,
  kiteAudio,
  rainAudio,
  homeAudio,
  bedAudio,
  runAudio,
  sockAudio,
];
const SOUND_AUDIO = {
  "long a": longAAudio,
  "long e": longEAudio,
  "long i": longIAudio,
  "long o": longOAudio,
  "long u": longUAudio,
  "short a": shortAAudio,
  "short e": shortEAudio,
  "short i": shortIAudio,
  "short o": shortOAudio,
  "short u": shortUAudio,
};

const GROUPS = [
  {
    id: "long",
    title: ["long a", "long e", "long i", "long o", "long u"],
    rows: [
      [
        { key: "long-a-1", correct: "cake" },
        { key: "long-e-1", correct: "bee" },
        { key: "long-i-1", correct: "night" },
        { key: "long-o-1", correct: "coat" },
        { key: "long-u-1", correct: "blue" },
      ],
      [
        { key: "long-a-2", correct: "rain" },
        { key: "long-e-2", correct: "feet" },
        { key: "long-i-2", correct: "kite" },
        { key: "long-o-2", correct: "home" },
        { key: "long-u-2", correct: "glue" },
      ],
    ],
  },
  {
    id: "short",
    title: ["short a", "short e", "short i", "short o", "short u"],
    rows: [
      [
        { key: "short-a-1", correct: "ant" },
        { key: "short-e-1", correct: "Ted" },
        { key: "short-i-1", correct: "fish" },
        { key: "short-o-1", correct: "box" },
        { key: "short-u-1", correct: "cup" },
      ],
      [
        { key: "short-a-2", correct: "cat" },
        { key: "short-e-2", correct: "bed" },
        { key: "short-i-2", correct: "sick" },
        { key: "short-o-2", correct: "sock" },
        { key: "short-u-2", correct: "run" },
      ],
    ],
  },
];
const GROUP_COLUMNS = GROUPS.map((group) =>
  group.title.map((_, colIndex) => {
    const correctValues = group.rows.map((row) => row[colIndex].correct);
    const keys = group.rows.map((row) => row[colIndex].key);
    return { keys, correctValues };
  }),
);
// جميع الخلايا في قائمة واحدة للاستخدام في الفحص
const ALL_CELLS = GROUPS.flatMap((g) => g.rows.flatMap((r) => r));

/* 🔹 Draggable */
function DragItem({
  item,
  isUsed,
  showAns,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  active,
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: String(item.id),
    data: item,
    disabled: isUsed || showAns,
  });

  const pointerStartRef = useRef(null);
  const pointerMovedRef = useRef(false);

  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(String(item.id), element);
      }}
      {...listeners}
      {...attributes}
      aria-disabled={isUsed || showAns}
      onPointerDownCapture={(event) => {
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
        pointerMovedRef.current = false;
      }}
      onPointerMoveCapture={(event) => {
        if (!pointerStartRef.current) return;
        const dx = event.clientX - pointerStartRef.current.x;
        const dy = event.clientY - pointerStartRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > 5) pointerMovedRef.current = true;
      }}
      onPointerUpCapture={() =>
        window.requestAnimationFrame(() => {
          pointerStartRef.current = null;
        })
      }
      onClick={() => {
        if (pointerMovedRef.current || isDragging) {
          pointerMovedRef.current = false;
          return;
        }
        onPlayAudio();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        if (isUsed || showAns) onPlayAudio();
        else onKeyboardPick();
      }}
      className={`wb-a-drag-item wb-unit1-audio-control wb-unit1-drag-item ${isUsed || showAns ? "used" : "available"}`}
    >
      {item.value}
      <WorkbookUnit1PlayingAudioIcon active={active} />
    </button>
  );
}

/* 🔹 Drop */
function DropBox({
  cell,
  value,
  wrong,
  active,
  locked,
  onRemove,
  registerTarget,
  onKeyDown,
  tabIndex,
  preview,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: cell.key,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(cell.key, element);
      }}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onClick={() => value && !locked && onRemove(cell.key)}
      className={`wb-a-drop-box
        ${value ? "filled" : ""}
        ${wrong ? "wrong" : ""}
        ${isOver || active ? "active scale-105" : ""}
      `}
    >
      <span
        className={`wb-a-drop-text ${preview ? "wb-unit1-keyboard-preview" : ""}`}
      >
        {preview || value}
      </span>
      {wrong && <div className="wb-a-wrong-mark">✕</div>}
    </div>
  );
}

export default function WB_Vocabulary_Page_A() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [wrongCells, setWrongCells] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [correctCells, setCorrectCells] = useState([]);
  const [shakeCharts, setShakeCharts] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit1Audio();

  const sensors = useSensors(useSensor(PointerSensor));

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);
  const keyboard = useWorkbookUnit1TabDrag({
    itemIds: DRAG_ITEMS.map((item) => String(item.id)),
    targetIds: ALL_CELLS.map((cell) => cell.key),
    isItemDisabled: (id) => usedDragIds.includes(Number(id)) || showAns,
    isTargetDisabled: (id) => correctCells.includes(id) || showAns,
    onPick: (id) => playAudio(`word-${id}`, WORD_AUDIO[Number(id) - 1]),
    onPlace: (itemId, targetId) => {
      const item = DRAG_ITEMS.find((entry) => String(entry.id) === itemId);
      applyDrop(targetId, item);
    },
  });

  const applyDrop = (boxKey, item) => {
    if (showAns || correctCells.includes(boxKey)) return;
    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) delete newAnswers[key];
    });

    newAnswers[boxKey] = { dragId: item.id, value: item.value };
    setAnswers(newAnswers);
    setWrongCells((previous) =>
      previous.filter((cellKey) => cellKey !== boxKey),
    );
  };

  /* 🔥 Drag End */
  const handleDragEnd = ({ active, over }) => {
    if (!over || showAns) {
      setShakeCharts(false);
      window.requestAnimationFrame(() => setShakeCharts(true));
      setActiveItem(null);
      return;
    }

    const item = active.data.current;
    applyDrop(String(over.id), item);
    setActiveItem(null);
  };

  const handleCheck = () => {
    if (showAns || correctCells.length === ALL_CELLS.length) return;

    const allAnswered = ALL_CELLS.every((cell) => answers[cell.key]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const nextCorrect = [];

    GROUP_COLUMNS.forEach((group) => {
      group.forEach((column) => {
        const correctValues = [...column.correctValues];

        column.keys.forEach((key) => {
          const value = answers[key]?.value;
          const index = correctValues.indexOf(value);
          if (index !== -1) {
            nextCorrect.push(key);
            correctValues.splice(index, 1);
          }
        });
      });
    });
    const score = nextCorrect.length;
    const total = ALL_CELLS.length;
    const nextWrong = ALL_CELLS.filter(
      (cell) => !nextCorrect.includes(cell.key),
    ).map((cell) => cell.key);

    setCorrectCells(nextCorrect);
    setWrongCells(nextWrong);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const correct = {};
    ALL_CELLS.forEach((cell) => {
      const matched = DRAG_ITEMS.find((d) => d.value === cell.correct);
      correct[cell.key] = {
        dragId: matched ? matched.id : `auto-${cell.key}`,
        value: cell.correct,
      };
    });

    setAnswers(correct);
    setShowAns(true);
    setWrongCells([]);
    setCorrectCells(ALL_CELLS.map((cell) => cell.key));
    keyboard.cancel();
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setWrongCells([]);
    setShowAns(false);
    setCorrectCells([]);
    setShakeCharts(false);
    keyboard.cancel();
    stopAudio();
  };

  const removeAnswer = (key) => {
    if (showAns || correctCells.includes(key)) return;
    const removed = answers[key]?.dragId;
    setAnswers((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
    setWrongCells((previous) => previous.filter((cellKey) => cellKey !== key));
    if (removed) keyboard.focusItem(String(removed));
  };

  const isWrong = (cell) => {
    return wrongCells.includes(cell.key);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveItem(active.data.current)}
      onDragEnd={handleDragEnd}
    >
      <style>{`
        .wb-a-wrap {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .wb-a-word-bank {
          width: 90%;
          border: 2px solid ${BORDER_COLOR};
          border-radius: 16px;
          background: #fff;
          padding: 10px;
          box-sizing: border-box;
        }

        .wb-a-word-grid {
          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          gap: clamp(10px, 1.4vw, 16px) clamp(12px, 1.8vw, 20px);
          align-items: center;
          justify-items: center;
        }

        .wb-a-drag-item {
          min-width: 0;
          width: 100%;
          text-align: center;
          padding: 6px 4px;
          height:40px;
          width:60px;
          display:flex;
          justify-content:center;
          align-items :center;
          border-radius: 12px;
          // border: 2px solid ${BORDER_COLOR};
          color: #222;
          font-size: clamp(14px, 1.7vw, 18px);
          font-weight: 500;
          line-height: 1.1;
          user-select: none;
          cursor: grab;
          transition: 0.2s ease;
          box-sizing: border-box;
          touch-action: none;
        }
.wb-a-drop-box.active {
  // border: 2px solid #f39b42;
  background: rgba(243, 155, 66, 0.15);
  transform: scale(1.05);
}

.wb-a-drop-box {
  transition: all 0.2s ease;
}
        .wb-a-drag-item.available { background: transparent; }

        .wb-a-drag-item.used {
          opacity: 0.35;
          color: #999;
          cursor: not-allowed;
        }

        .wb-a-drag-item.touching {
          border-color: ${ACTIVE_COLOR};
          background: "white";
        }

        .wb-a-section {
          width: 90%;

          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wb-a-head-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 0;
          padding: 0 0 2px 0;
        }

        .wb-a-head-cell {
          text-align: center;
                    font-size: clamp(14px, 1.7vw, 18px);

          font-weight: 500;
          color: #111;
          line-height: 1.2;
          padding-bottom: 4px;
        }

        .wb-a-table {
          width: 100%;
          border: 2px solid ${TABLE_BORDER};
          border-radius: 12px;
          // overflow: hidden;
          background: #fff;
        }

        .wb-a-row {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .wb-a-row + .wb-a-row { border-top: 2px solid ${TABLE_BORDER}; }

        .wb-a-cell {
              min-height: clamp(28px, -8vw, 21px);
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 6px; */
    box-sizing: border-box;
    position: relative;
    // background: #fff;
        }

        .wb-a-cell + .wb-a-cell { border-left: 2px solid ${TABLE_BORDER}; }

        .wb-a-drop-box {
          width: 100%;
          min-height: clamp(40px, 5vw, 45px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 10px;
          padding: 4px 8px;
          box-sizing: border-box;
          cursor: default;
          transition: 0.2s ease;
        }

        .wb-a-drop-box.filled  { cursor: pointer; }
        .wb-a-drop-box.wrong   { background: rgba(239, 68, 68, 0.06); }

        .wb-a-drop-text {
                    font-size: clamp(14px, 1.7vw, 18px);

          font-weight: 500;
          line-height: 1.1;
          text-align: center;
          color: ${FILLED_COLOR};
          word-break: break-word;
        }

        .wb-a-wrong-mark {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: red;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          border:2px solid white;
          z-index:9
        }

        .wb-a-buttons {
          margin-top: 6px;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 980px) {
          .wb-a-word-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        }
        @media (max-width: 700px) {
          .wb-a-word-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        @media (max-width: 560px) {
          .wb-a-word-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .wb-a-head-cell { font-size: 16px; }
          .wb-a-cell      { min-height: 48px; padding: 4px; }
          .wb-a-drop-text { font-size: 16px; }
        }
      `}</style>
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "25px" }}>
          <ExerciseHeader
            sectionLetter="A"
            title="Read and fill in the charts."
            subTitle="Say each short- and long-vowel word aloud, identify its sound, then place it in the correct chart group."
          />

          <div className="flex flex-col gap-10 items-center justify-center w-full">
            {/* Word Bank */}
            <div className="wb-a-word-bank">
              <div className="wb-a-word-grid">
                {DRAG_ITEMS.map((item) => (
                  <DragItem
                    key={item.id}
                    item={item}
                    isUsed={usedDragIds.includes(item.id)}
                    showAns={showAns}
                    registerItem={keyboard.registerItem}
                    onKeyboardPick={() => keyboard.pickItem(String(item.id))}
                    onPlayAudio={() =>
                      playAudio(`word-${item.id}`, WORD_AUDIO[item.id - 1])
                    }
                    active={activeAudioKey === `word-${item.id}`}
                  />
                ))}
              </div>
            </div>
            <div
              className={`flex flex-col gap-5 w-full items-center justify-center ${shakeCharts ? "wb-unit1-invalid-drop-shake" : ""}`}
              onAnimationEnd={(event) => {
                if (event.animationName === "shake-invalid-drop-wb-unit1")
                  setShakeCharts(false);
              }}
            >
              {/* Groups */}
              {GROUPS.map((group) => (
                <div key={group.id} className="wb-a-section">
                  <div className="wb-a-head-row">
                    {group.title.map((title) => (
                      <button
                        type="button"
                        key={title}
                        className="wb-a-head-cell wb-unit1-audio-control wb-unit1-interactive"
                        onClick={() =>
                          playAudio(`sound-${title}`, SOUND_AUDIO[title])
                        }
                        style={{
                          border: 0,
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        {title}
                        <WorkbookUnit1PlayingAudioIcon
                          active={activeAudioKey === `sound-${title}`}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="wb-a-table">
                    {group.rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="wb-a-row">
                        {row.map((cell) => (
                          <div key={cell.key} className="wb-a-cell">
                            <DropBox
                              cell={cell}
                              value={answers[cell.key]?.value || ""}
                              wrong={isWrong(cell)}
                              locked={
                                showAns || correctCells.includes(cell.key)
                              }
                              onRemove={removeAnswer}
                              registerTarget={keyboard.registerTarget}
                              tabIndex={
                                !showAns &&
                                !correctCells.includes(cell.key) &&
                                (keyboard.keyboardItemId ||
                                  answers[cell.key]?.value)
                                  ? 0
                                  : -1
                              }
                              preview={
                                keyboard.keyboardTargetId === cell.key
                                  ? DRAG_ITEMS.find(
                                      (entry) =>
                                        String(entry.id) ===
                                        keyboard.keyboardItemId,
                                    )?.value
                                  : null
                              }
                              onKeyDown={(event) => {
                                const value = answers[cell.key]?.value;

                                if (
                                  !keyboard.keyboardItemId &&
                                  value &&
                                  !showAns &&
                                  !correctCells.includes(cell.key) &&
                                  (event.key === "Enter" || event.key === " ")
                                ) {
                                  event.preventDefault();
                                  event.stopPropagation();

                                  removeAnswer(cell.key);

                                  return;
                                }

                                keyboard.handleTargetKeyDown(event, cell.key);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="wb-a-buttons">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
              checkDisabled={
                showAns || correctCells.length === ALL_CELLS.length
              }
            />
          </div>
        </div>

        {/* 🔥 Drag Overlay */}
        <DragOverlay>
          {activeItem && (
            <div className="px-3 py-1 bg-white border-1 border-orange-500 rounded-lg shadow-xl font-bold">
              {activeItem.value}
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
