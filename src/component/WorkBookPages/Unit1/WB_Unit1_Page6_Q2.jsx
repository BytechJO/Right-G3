import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/0000.svg";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00000.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 12.svg";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const DRAG_COLOR = "#f6a14cff";
const BORDER_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const SENTENCES = [
  { id: 1, text: "scoreboard" },
  { id: 2, text: "referee" },
  { id: 3, text: "whistle" },
  { id: 4, text: "bike" },
];

const ITEMS = [
  { id: 3, img: img2, alt: "whistle" },
  { id: 1, img: img1, alt: "scoreboard" },
  { id: 2, img: img3, alt: "referee" },
  { id: 4, img: img4, alt: "bike" },
];

const NUMBERS = [1, 2, 3, 4];
const CORRECT_ANSWERS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
};

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -8,
      right: -8,
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      backgroundColor: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "700",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

      zIndex: 99999,
      pointerEvents: "none",
    }}
  >
    ✕
  </div>
);
function DraggableNumber({ num, disabled, draggedNumber, setDraggedNumber }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(num),
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseDown={() => setDraggedNumber(num)}
      onTouchStart={() => setDraggedNumber(num)}
      style={{
        width: "clamp(38px,5vw,52px)",
        height: "clamp(38px,5vw,52px)",
        borderRadius: "50%",
        backgroundColor: disabled ? "#cfcfd4" : DRAG_COLOR,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "clamp(17px,2.2vw,26px)",
        cursor: disabled ? "not-allowed" : "grab",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        touchAction: "none",

        transition: "0.2s",
        boxShadow:
          draggedNumber === num
            ? "0 0 0 4px rgba(243,155,66,.35)"
            : "0 3px 10px rgba(0,0,0,.12)",
      }}
    >
      {num}
    </div>
  );
}

function DroppableImage({ item, num, wrong, showAns, handleRemove }) {
  const { setNodeRef, isOver } = useDroppable({
    id: String(item.id),
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        width: "180px",
        // aspectRatio: "3 / 2",

        boxSizing: "border-box",
        transition: "0.25s ease",
        transform: isOver ? "scale(1.03)" : "scale(1)",
        boxShadow: isOver
          ? "0 0 0 4px rgba(243,155,66,.25)"
          : "0 3px 10px rgba(0,0,0,.08)",
      }}
    >
      <img
        src={item.img}
        alt={`item-${item.id}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* صندوق الرقم */}
      <div
        onClick={() => handleRemove(item.id)}
        style={{
          position: "absolute",
          top: "0%",
          right: "0%",
          width: "35px",
          height: "35px",
          borderRadius: "4px",
          border: `2px solid #f39b42`,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(14px,1.8vw,22px)",
          fontWeight: 500,
          // color: wrong ? WRONG_COLOR : DRAG_COLOR,
          boxShadow: "0 2px 8px rgba(0,0,0,.15)",
          zIndex: 10,
          cursor: num && !showAns ? "pointer" : "default",
          transition: "0.25s ease",
          transform: isOver ? "scale(1.05)" : "scale(1)",
          filter: isOver ? "brightness(1.05)" : "brightness(1)",
          boxSizing: "border-box",
        }}
      >
        {num || ""}
      </div>

      {/* بادج الخطأ */}
      {wrong && <ErrorBadge />}
    </div>
  );
}
// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit1_Page6_QH() {
  const [answers, setAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);

  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
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
  const applyDrop = (id, num) => {
    if (!num || showAns) return;

    setChecked(false);

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((k) => {
        if (updated[k] === num) delete updated[k];
      });

      updated[id] = num;

      return updated;
    });
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setDraggedNumber(null);

    if (!over || showAns) return;

    applyDrop(Number(over.id), Number(active.id));
  };
  const handleRemove = (id) => {
    if (showAns || checked) return;
    setChecked(false);
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[id];
      return u;
    });
  };

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns || checked) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === CORRECT_ANSWERS[item.id]) correct++;
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

  const handleShowAnswer = () => {
    setAnswers({ ...CORRECT_ANSWERS });
    setChecked(false);
    setShowAns(true);

    setDraggedNumber(null);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedNumber(null);

    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (id) => checked && answers[id] !== CORRECT_ANSWERS[id];

  return (
    <div className="main-container-component">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="div-forall" style={{ gap: "clamp(16px,2vw,24px)" }}>
          {/* ── العنوان ── */}
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">H</span> Read, look, and number.
          </h1>

          {/* ── الأرقام للسحب ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(10px,1.5vw,16px)",
              flexWrap: "wrap",
            }}
          >
            {NUMBERS.map((num) => {
              return (
                <DraggableNumber
                  key={num}
                  num={num}
                  disabled={usedNumbers.includes(num) || showAns}
                  draggedNumber={draggedNumber}
                  setDraggedNumber={setDraggedNumber}
                />
              );
            })}
          </div>

          {/* ── اليسار: الجمل | اليمين: الصور ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.95fr 1.3fr",
              gap: "clamp(16px,3vw,30px)",
              alignItems: "start",
            }}
          >
            {/* الجمل */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                gap: "clamp(14px,2vw,24px)",
              }}
            >
              {SENTENCES.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    border: `1px solid ${DRAG_COLOR}`,
                    padding: "10px",
                    borderRadius: "9px",
                    width: "60%",
                    gap: "clamp(8px,1vw,14px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "#111",
                      minWidth: "clamp(16px,1.9vw,22px)",
                      lineHeight: 1.4,
                      flexShrink: 0,
                    }}
                  >
                    {item.id}
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#222",
                      lineHeight: 1.45,
                      // fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* الصور 2×3 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                gap: "clamp(8px,1.2vw,14px)",
              }}
            >
              {ITEMS.map((item) => {
                const wrong = isWrong(item.id);
                const num = answers[item.id];

                return (
                  <DroppableImage
                    key={item.id}
                    item={item}
                    num={num}
                    wrong={wrong}
                    showAns={showAns || checked}
                    handleRemove={handleRemove}
                  />
                );
              })}
            </div>
          </div>

          {/* ── الأزرار ── */}
          <div className="mt-4 flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>

        <DragOverlay>
          {draggedNumber ? (
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: DRAG_COLOR,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "24px",
                boxShadow: "0 4px 12px rgba(0,0,0,.25)",
              }}
            >
              {draggedNumber}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
