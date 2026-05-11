import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  useDraggable,
  useDroppable,
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
  { id: 1, value: "They have gloves." },
  { id: 2, value: "What do they have?" },
  { id: 3, value: "They have some dolls." },
];
export default function WB_Unit3_Page16_QE() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (boxKey, item) => {
    if (showAns || !item) return;

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
        className={`wb-e17-chip ${isUsed ? "disabled" : ""}`}
        style={{
          border: `1px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
          backgroundColor: isUsed ? "#efefef" : "",
          color: isUsed ? "#9a9a9a" : "#222",
          cursor: isUsed || showAns ? "not-allowed" : "grab",
        }}
      >
        {item.value}
      </div>
    );
  };

  /* droppable */
  const DropBox = ({ boxKey, isWrong }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: boxKey,
    });

    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={setNodeRef}
        className={`wb-e17-drop ${isWrong ? "wrong" : ""}`}
        style={{
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
        }}
      >
        {value}
        {isWrong && <div className="wb-e17-wrong-badge">✕</div>}
      </div>
    );
  };
  const handleCheck = () => {
    if (showAns) return;

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
  };
  const handleStartAgain = () => {
    setAnswers({});
    setActiveItem(null);
    setShowResults(false);
    setShowAns(false);
  };
  const isWrongQuestion = (item) =>
    showResults &&
    !item.lockQuestion &&
    answers[`q-${item.id}`]?.value !== item.correctQuestion;

  const isWrongAnswer = (item) =>
    showResults &&
    !item.lockAnswer &&
    answers[`a-${item.id}`]?.value !== item.correctAnswer;

  const renderFixedLine = (text, color = "#111") => (
    <div className="wb-e17-drop wb-e17-fixed" style={{ color }}>
      {text}
    </div>
  );

  return (
    <DndContext
      onDragStart={(e) =>
        setActiveItem(DRAG_ITEMS.find((d) => d.id === e.active.id))
      }
      onDragEnd={handleDragEnd}
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
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">E</span> Look and write the questions or
            answers.
          </h1>

          <div className="wb-e17-wrap">
            <div className="wb-e17-bank">
              {DRAG_ITEMS.map((item) => (
                <DraggableChip key={item.id} item={item} />
              ))}
            </div>

            <div className="wb-e17-list">
              {ITEMS.map((item) => (
                <div key={item.id} className="wb-e17-row">
                  <div className="wb-e17-num">{item.id}</div>

                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    className="wb-e17-img"
                  />

                  <div className="wb-e17-lines">
                    {item.lockQuestion ? (
                      renderFixedLine(item.fixedQuestion)
                    ) : (
                      <DropBox
                        boxKey={`q-${item.id}`}
                        isWrong={isWrongQuestion(item)}
                      />
                    )}

                    {item.lockAnswer ? (
                      renderFixedLine(item.fixedAnswer)
                    ) : (
                      <DropBox
                        boxKey={`a-${item.id}`}
                        isWrong={isWrongAnswer(item)}
                      />
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
