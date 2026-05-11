import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
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
function DragItem({ item, isUsed, showAns }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
    disabled: isUsed || showAns,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      // style={style}
      className={`wb-a-drag-item ${isUsed || showAns ? "used" : "available"}`}
    >
      {item.value}
    </div>
  );
}

/* 🔹 Drop */
function DropBox({ cell, value, wrong, active }) {
  const { setNodeRef, isOver } = useDroppable({
    id: cell.key,
  });

  return (
    <div
      ref={setNodeRef}
      className={`wb-a-drop-box
        ${value ? "filled" : ""}
        ${wrong ? "wrong" : ""}
        ${isOver || active ? "active scale-105" : ""}
      `}
    >
      <span className="wb-a-drop-text">{value}</span>
      {wrong && <div className="wb-a-wrong-mark">✕</div>}
    </div>
  );
}

export default function WB_Vocabulary_Page_A() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) delete newAnswers[key];
    });

    newAnswers[boxKey] = { dragId: item.id, value: item.value };
    setAnswers(newAnswers);
    setShowResults(false);
  };

  /* 🔥 Drag End */
  const handleDragEnd = ({ active, over }) => {
    if (!over || showAns) return;

    const item = active.data.current;
    applyDrop(over.id, item);
    setActiveItem(null);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;

    const allAnswered = ALL_CELLS.every((cell) => answers[cell.key]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    let total = 0;

    GROUP_COLUMNS.forEach((group) => {
      group.forEach((column) => {
        const userValues = column.keys
          .map((key) => answers[key]?.value)
          .filter(Boolean);

        const correctValues = [...column.correctValues];

        total += correctValues.length;

        userValues.forEach((val) => {
          const index = correctValues.indexOf(val);
          if (index !== -1) {
            score++;
            correctValues.splice(index, 1);
          }
        });
      });
    });

    setShowResults(true);

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
    setShowResults(false);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = (cell) => {
    if (!showResults || showAns) return false;

    for (const group of GROUP_COLUMNS) {
      for (const column of group) {
        if (column.keys.includes(cell.key)) {
          const value = answers[cell.key]?.value;
          return !column.correctValues.includes(value);
        }
      }
    }

    return false;
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
        <div className="div-forall" style={{gap:"25px"}}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">A</span>
            Read and fill in the charts.
          </h1>


<div className="flex flex-col gap-10 items-center justify-center">
          {/* Word Bank */}
          <div className="wb-a-word-bank">
            <div className="wb-a-word-grid">
              {DRAG_ITEMS.map((item) => (
                <DragItem
                  key={item.id}
                  item={item}
                  isUsed={usedDragIds.includes(item.id)}
                  showAns={showAns}
                />
              ))}
            </div>
          </div>
<div className="flex flex-col gap-5 w-full items-center justify-center">
          {/* Groups */}
          {GROUPS.map((group) => (
            <div key={group.id} className="wb-a-section">
              <div className="wb-a-head-row">
                {group.title.map((title) => (
                  <div key={title} className="wb-a-head-cell">
                    {title}
                  </div>
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
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}</div>
</div>
          <div className="wb-a-buttons">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
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
