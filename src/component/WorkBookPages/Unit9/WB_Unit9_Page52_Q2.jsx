import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/5.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/10.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/9.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/8.svg";

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

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const DRAG_COLOR = "#f29a1f";

// ── بيانات ─────────────────────────────────────────────────────
const SENTENCES = [
  "They were at the bakery yesterday.",
  "She is at the library now.",
  "He was at the bus stop a week ago.",
  "She is at the airport now.",
  "They were at the clinic last week.",
  "I was at work today.",
];

const ITEMS = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
];

const CORRECT_ANSWERS = {
  1: 4,
  2: 1,
  3: 2,
  4: 5,
  5: 6,
  6: 3,
};

const NUMBERS = [1, 2, 3, 4, 5, 6];

// ── Error Badge ────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
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
      zIndex: 10,
      pointerEvents: "none",
    }}
  >
    ✕
  </div>
);

// ── Draggable Number ───────────────────────────────────────────
function DraggableNumber({ num, disabled, activeId }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `number-${num}`,
      data: {
        num,
      },
      disabled,
    });

  const style = {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: disabled ? "#cfcfd4" : DRAG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: "20px",
    cursor: disabled ? "not-allowed" : "grab",
    opacity: isDragging ? 0.3 : disabled ? 0.55 : 1,
    userSelect: "none",
    touchAction: "none",
    transition: "0.2s ease",
    boxShadow:
      activeId === `number-${num}`
        ? `0 0 0 3px rgba(242,154,31,0.35)`
        : "0 3px 10px rgba(0,0,0,0.12)",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {num}
    </div>
  );
}

// ── Drop Zone ──────────────────────────────────────────────────
function DropImage({ item, num, wrong, checked, showAns, handleRemove }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${item.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        transition: "0.25s ease",
      }}
    >
      {/* wrapper خاص بالصورة */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "220px",
          transition: "0.25s ease",
          transform: isOver ? "scale(1.04)" : "scale(1)",
          filter: isOver
            ? "drop-shadow(0 0 12px rgba(242,154,31,0.45))"
            : "none",
        }}
      >
        {/* الصورة */}
        <img
          src={item.img}
          alt={`item-${item.id}`}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
            transition: "0.25s ease",
          }}
        />

        {/* Overlay وقت السحب */}
        {isOver && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(242,154,31,0.12)",
              // border: "3px dashed #f29a1f",
              borderRadius: "12px",
              pointerEvents: "none",
              animation: "pulseDrop 1s infinite",
            }}
          />
        )}

        {/* مربع الرقم */}
        <div
          onClick={() => handleRemove(item.id)}
          style={{
            position: "absolute",

            // هيك بصير ثابت مع الصورة نفسها
            top: "1%",
            right: "1%",

            width: "clamp(34px,4vw,45px)",
            height: "clamp(34px,4vw,45px)",

            borderRadius: "8px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: "clamp(16px,2vw,24px)",
            fontWeight: 700,

            zIndex: 5,

            cursor: num && !showAns && !checked ? "pointer" : "default",

            transition: "0.2s ease",
          }}
        >
          {num || ""}
        </div>

        {/* Error Badge */}
        {wrong && <ErrorBadge />}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function WB_Unit8_Page52_QD() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );

  const usedNumbers = Object.values(answers);

  // ── Drag Start ───────────────────────────────────────────────
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // ── Drag End ─────────────────────────────────────────────────
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || showAns) return;

    const draggedNum = active.data.current?.num;

    const dropId = Number(over.id.toString().replace("drop-", ""));

    if (!draggedNum || !dropId) return;

    setChecked(false);

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === draggedNum) {
          delete updated[key];
        }
      });

      updated[dropId] = draggedNum;

      return updated;
    });
  };

  // ── Remove ───────────────────────────────────────────────────
  const handleRemove = (id) => {
    if (showAns || checked) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    setChecked(false);
  };

  // ── Check ────────────────────────────────────────────────────
  const handleCheck = () => {
    if (showAns || checked) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.error("Please complete all answers first! ✏️");
      return;
    }

    let correct = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === CORRECT_ANSWERS[item.id]) {
        correct++;
      }
    });

    setChecked(true);

    const total = ITEMS.length;

    if (correct === total) {
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    } else if (correct > 0) {
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${correct} / ${total}`);
    }
  };

  // ── Show Answers ─────────────────────────────────────────────
  const handleShowAnswer = () => {
    setAnswers({ ...CORRECT_ANSWERS });
    setChecked(false);
    setShowAns(true);
  };

  // ── Reset ────────────────────────────────────────────────────
  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setActiveId(null);
  };

  const isWrong = (id) => checked && answers[id] !== CORRECT_ANSWERS[id];

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "35px",
        }}
      >
        {/* العنوان */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Read, look, and number the pictures.
        </h1>

        {/* الجمل */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(8px,1.2vw,14px) clamp(20px,4vw,48px)",
          }}
        >
          {SENTENCES.map((sentence, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "clamp(8px,1vw,12px)",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#111",
                  minWidth: "clamp(16px,1.9vw,24px)",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </span>

              <p
                style={{
                  margin: 0,
                  fontSize: "18px",
                  color: "#222",
                  lineHeight: 1.5,
                  // fontWeight: 500,
                }}
              >
                {sentence}
              </p>
            </div>
          ))}
        </div>

        {/* الأرقام */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(10px,1.5vw,16px)",
              flexWrap: "wrap",
            }}
          >
            {NUMBERS.map((num) => (
              <DraggableNumber
                key={num}
                num={num}
                disabled={usedNumbers.includes(num) || showAns}
                activeId={activeId}
              />
            ))}
          </div>

          {/* الصور */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: "10px",
              alignItems: "start",
            }}
          >
            {ITEMS.map((item) => (
              <DropImage
                key={item.id}
                item={item}
                num={answers[item.id]}
                wrong={isWrong(item.id)}
                checked={checked}
                showAns={showAns}
                handleRemove={handleRemove}
              />
            ))}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId ? (
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: DRAG_COLOR,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "28px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {activeId.replace("number-", "")}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* الأزرار */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
