import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
// استبدلي كل imports تبعون drag العادي بهاد
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import { useDraggable, useDroppable } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";
import girlImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/1.svg";
import boy1Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/2.svg";
import boy2Img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/3.svg";
import img from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/11.svg";
const PEOPLE = [
  {
    id: 1,
    img: girlImg,
    lines: [
      "She was in the swimming pool this morning.",
      "She is in the post office now.",
    ],
  },
  {
    id: 2,
    img: boy1Img,
    lines: ["He is at the gym now.", "He was at the bus stop this morning."],
  },
  {
    id: 3,
    img: boy2Img,
    lines: [
      "He was at the bakery this morning.",
      "He is on the playground now.",
    ],
  },
];

const DRAG_ITEMS = [
  "at the swimming pool",
  "at the bus stop",
  "at the bakery",
  "at the post office",
  "at the gym",
  "on the playground",
];

const CORRECT_ANSWERS = {
  "morning-1": "at the swimming pool",
  "morning-2": "at the bus stop",
  "morning-3": "at the bakery",
  "now-1": "at the post office",
  "now-2": "at the gym",
  "now-3": "on the playground",
};

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const DraggableItem = ({ item, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: item,
      disabled,
    });

  const style = {
    // transform: CSS.Translate.toString(transform),
    // transition,
    padding: "clamp(6px,0.8vw,8px) clamp(10px,1.2vw,14px)",
    borderRadius: "10px",
    border: "1px solid #f39b42",
    fontSize: "clamp(12px,1.4vw,15px)",
    fontWeight: "600",
    cursor: disabled ? "not-allowed" : "grab",
    opacity: disabled ? 0.5 : 1,
    userSelect: "none",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    background: "#fff",
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {item}
    </div>
  );
};

const DropCell = ({ cellKey, value, wrong, onRemove, showAns }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: cellKey,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        height: "clamp(48px,6vw,68px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "6px 10px",
        fontSize: "clamp(12px,1.5vw,18px)",
        lineHeight: "1.3",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
        background: isOver ? "rgba(243,155,66,0.12)" : "transparent",
        // border: isOver ? "2px dashed #f39b42" : "2px dashed transparent",

        transform: isOver ? "scale(1.03)" : "scale(1)",

        boxShadow: isOver ? "0 0 10px rgba(243,155,66,0.35)" : "none",
      }}
         className={`${!showAns && "hover:text-red-600 "} `}
    >
      {value && (
        <div
          onClick={() => onRemove(cellKey)}
          style={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
       
        >
          {value}
        </div>
      )}

      {wrong && (
        <div
          style={{
            position: "absolute",
            top: "-7px",
            right: "-7px",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "red",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};
export default function WB_Unit8_Page52_QC() {
  const [answers, setAnswers] = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const [activeItem, setActiveItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || showAns) return;

    const draggedValue = active.id;

    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key] === draggedValue) {
        delete newAnswers[key];
      }
    });

    newAnswers[over.id] = draggedValue;

    setAnswers(newAnswers);
    setActiveItem(null);
  };
  /* ─── Button handlers ─── */
  const handleCheck = () => {
    if (showAns||showResults) return;
    const allFilled = Object.keys(CORRECT_ANSWERS).every((key) => answers[key]);
    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    Object.keys(CORRECT_ANSWERS).forEach((key) => {
      if (answers[key] === CORRECT_ANSWERS[key]) score++;
    });
    setShowResults(true);
    const total = Object.keys(CORRECT_ANSWERS).length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setAnswers(CORRECT_ANSWERS);
    setShowResults(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedText(null);
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongCell = (cellKey) => {
    if (!showResults || showAns) return false;
    if (!answers[cellKey]) return false;
    return answers[cellKey] !== CORRECT_ANSWERS[cellKey];
  };

  /* ─── Drop cell renderer ─── */
  const renderDropCell = (cellKey) => {
    const value = answers[cellKey];
    const wrong = isWrongCell(cellKey);

    return (
      <DropCell
        cellKey={cellKey}
        value={value}
        wrong={wrong}
        onRemove={handleRemoveFromCell}
        showAns={showAns || showResults}
      />
    );
  };

  const handleRemoveFromCell = (cellKey) => {
    if (showAns || showResults) return;

    const newAnswers = { ...answers };
    delete newAnswers[cellKey];

    setAnswers(newAnswers);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveItem(event.active.id);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveItem(null)}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "30px",
          }}
        >
          {/* Title */}
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">C</span> Read and write in the chart.
          </h1>

          {/* Sentences */}
          <div className="flex justify-start">
            <img src={img} style={{ height: "250px", width: "auto" }} />
          </div>
          {/* Drag bank */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(6px,1vw,10px)",
              flexWrap: "wrap",
              marginBottom: "4px",
            }}
          >
            {DRAG_ITEMS.map((item, index) => {
              const disabled = usedValues.includes(item);

              return (
                <DraggableItem
                  key={`${item}-${index}`}
                  item={item}
                  disabled={disabled || showAns}
                />
              );
            })}
          </div>

          {/* Table */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              // overflowX: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "760px",
                minWidth: "320px",
                border: `1px solid ${BORDER_COLOR}`,
                borderRadius: "clamp(10px,1.5vw,18px)",
                // overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                  borderBottom: `1px solid ${BORDER_COLOR}`,
                }}
              >
                <div
                  style={{
                    minHeight: "clamp(60px,8vw,86px)",
                    borderRight: `1px solid ${BORDER_COLOR}`,
                  }}
                />
                {PEOPLE.map((person, index) => (
                  <div
                    key={person.id}
                    style={{
                      minHeight: "clamp(60px,8vw,86px)",
                      borderRight:
                        index !== PEOPLE.length - 1
                          ? `1px solid ${BORDER_COLOR}`
                          : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={person.img}
                      alt={`head-${person.id}`}
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Morning row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                  borderBottom: `1px solid ${BORDER_COLOR}`,
                }}
              >
                <div
                  style={{
                    minHeight: "clamp(56px,7vw,82px)",
                    borderRight: `1px solid ${BORDER_COLOR}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(14px,1.8vw,20px)",
                    color: "#222",
                    fontWeight: 600,
                  }}
                >
                  Morning
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("morning-1")}
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("morning-2")}
                </div>
                <div>{renderDropCell("morning-3")}</div>
              </div>

              {/* Now row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(70px,12vw,130px) 1fr 1fr 1fr",
                }}
              >
                <div
                  style={{
                    minHeight: "clamp(56px,7vw,82px)",
                    borderRight: `1px solid ${BORDER_COLOR}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(14px,1.8vw,20px)",
                    color: "#222",
                    fontWeight: 600,
                  }}
                >
                  Now
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("now-1")}
                </div>
                <div style={{ borderRight: `1px solid ${BORDER_COLOR}` }}>
                  {renderDropCell("now-2")}
                </div>
                <div>{renderDropCell("now-3")}</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "clamp(4px,0.8vw,8px)",
            }}
          >
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeItem ? (
          <div
            style={{
              padding: "8px 14px",
              borderRadius: "10px",
              // background: "#f39b42",
              border: "1px solid #f39b42",
              // color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            {activeItem}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
