import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex G 1.svg";

import {
  DndContext,
  useDraggable,
  useDroppable,
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
  { id: 1, value: "dolls?" },
  { id: 2, value: "cars?" },
  { id: 3, value: "balls?" },
  { id: 4, value: "trains?" },
  { id: 5, value: "kites?" },
];

export default function WB_Unit3_Page18_QB() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    if (showAns || !item ||showResults) return;

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
    setShowResults(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const dragged = DRAG_ITEMS.find((d) => d.id === active.id);
    applyDrop(over.id, dragged);
  };

  /* draggable */
  const DraggableChip = ({ item }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: item.id,
    });

    const isUsed = usedDragIds.includes(item.id);

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`wb-g18-chip ${
          isUsed || showAns ||showResults? "wb-g18-chip-disabled" : ""
        }`}
        style={{
          border: `1px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
          backgroundColor: isUsed ? "#eeeeee" : "",
          color: isUsed ? "#999" : "#222",
          cursor: isUsed || showAns ||showResults ? "not-allowed" : "grab",
        }}
      >
        {item.value}
      </div>
    );
  };

  /* droppable */
  const DropBox = ({ boxKey, wrong }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: boxKey,
    });

    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={setNodeRef}
        className={`wb-g18-drop-box ${wrong ? "wrong" : ""}`}
        style={{
          color:  "#111",

          /* 🔥 hover effect */
          backgroundColor: isOver
            ? "rgba(243, 155, 66, 0.15)"
            :"transparent",

          borderBottom: isOver
            ? "1px solid #f39b42"
            : wrong
              ? "2px solid red"
              : "1px solid #3f3f3f",

          transform: isOver ? "scale(1.05)" : "scale(1)",

          transition: "all 0.2s ease",
        }}
      >
        {value}

        {wrong && <div className="wb-g18-wrong-badge">✕</div>}
      </div>
    );
  };

const isWrong = () => false;

 const handleCheck = () => {
  if (showAns || showResults) return;

  const allAnswered = ITEMS.every(
    (item) => answers[`a-${item.id}`]?.value
  );

  if (!allAnswered) {
    ValidationAlert.info("Please complete all answers first.");
    return;
  }

  const studentAnswers = ITEMS.map(
    (item) => answers[`a-${item.id}`]?.value
  );

  const correctAnswers = ITEMS.map((item) => item.correct);

  const score = studentAnswers.filter((ans) =>
    correctAnswers.includes(ans)
  ).length;

  setShowResults(true);

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
  };

  const handleStartAgain = () => {
    setAnswers({});
    setActiveItem(null);
    setShowResults(false);
    setShowAns(false);
  };

  return (
    <DndContext
      onDragStart={(e) =>
        setActiveItem(DRAG_ITEMS.find((d) => d.id === e.active.id))
      }
      onDragEnd={handleDragEnd}
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
          width: 95%;
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
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">B</span> Look and write the questions and
            answers.
          </h1>

          <div className="wb-g18-bank">
            {DRAG_ITEMS.map((item) => (
              <DraggableChip key={item.id} item={item} />
            ))}
          </div>

          <div className="wb-g18-stage">
            <div className="wb-g18-board">
              <img src={exerciseImg} alt="exercise" className="wb-g18-image" />

              <div className="wb-g18-panel">
                {ITEMS.map((item) => (
                  <div key={item.id} className="wb-g18-row">
                    <span className="wb-g18-prefix">Do you have any</span>
                    <DropBox boxKey={`a-${item.id}`} wrong={isWrong(item)} />
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
