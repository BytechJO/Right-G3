import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  useDraggable,
  DragOverlay,
  useDroppable,
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
  { id: 1, value: "fruits." },
  { id: 2, value: "caps." },
  { id: 3, value: "sweets." },
];

export default function WB_Unit3_Page16_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const handleCheck = () => {
    if (showAns || showResults) return;

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
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const handleRemoveAnswer = (boxKey) => {
    if (showAns || showResults) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setShowResults(false);
  };

  const isWrongAnswer = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  // ✅ draggable
  const DraggableItem = ({ item, isUsed }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: item.id,
      disabled: isUsed || showAns,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="wb-c16-chip"
        style={{
          border: `1px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
          backgroundColor: isUsed ? "#efefef" : "",
          color: isUsed ? "#9a9a9a" : "#222",
          cursor: isUsed || showAns || showResults ? "not-allowed" : "grab",
          opacity: isUsed ? 0.55 : 1,
          zIndex: "9999999",
        }}
      >
        {item.value}
      </div>
    );
  };

  // ✅ droppable
  const DropBox = ({ boxKey, isWrong }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: boxKey,
    });

    const value = answers[boxKey]?.value || "";

    return (
      <div
        ref={setNodeRef}
        className={`wb-c16-drop-box ${isWrong ? "wrong" : ""}`}
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
        {isWrong && <div className="wb-c16-wrong">✕</div>}
      </div>
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
        onDragStart={(event) => {
          const item = DRAG_ITEMS.find((i) => i.id === event.active.id);
          setActiveItem(item);
        }}
        onDragEnd={(event) => {
          const { active, over } = event;

          if (over && !showAns) {
            const draggedItem = DRAG_ITEMS.find((i) => i.id === active.id);
            const boxKey = over.id;

            const newAnswers = { ...answers };

            Object.keys(newAnswers).forEach((key) => {
              if (newAnswers[key]?.dragId === draggedItem.id) {
                delete newAnswers[key];
              }
            });

            newAnswers[boxKey] = {
              dragId: draggedItem.id,
              value: draggedItem.value,
            };

            setAnswers(newAnswers);
            setShowResults(false);
          }

          setActiveItem(null); // مهم جدًا
        }}
      >
        <div className="div-forall" style={{ gap: "25px" }}>
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">C</span> Look and complete the sentences.
          </h1>

          {/* DRAG ITEMS */}
          <div className="wb-c16-bank">
            {DRAG_ITEMS.map((item) => {
              const isUsed = usedDragIds.includes(item.id);
              return (
                <DraggableItem key={item.id} item={item} isUsed={isUsed} />
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
                    className="wb-c16-img"
                    style={{ height: "120px", width: "auto" }}
                  />
                </div>

                <div className="wb-c16-sentence-wrap">
                  <div className="wb-c16-sentence-line">
                    <span className="wb-c16-prefix">{item.prefix}</span>

                    <DropBox
                      boxKey={`a-${item.id}`}
                      isWrong={isWrongAnswer(item)}
                    />
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
