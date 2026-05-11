import React, { useState } from "react";

import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/4.svg";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const DRAG_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    img: img1,
    lines: ["Where's Helen's mom?", "She's in a taxi."],
  },
  {
    id: 2,
    img: img2,
    lines: ["Where's Stella's mom?", "She's in the kitchen."],
  },
  {
    id: 3,
    img: img3,
    lines: ["Where are Jack and Sarah?", "They're on the playground."],
  },
  {
    id: 4,
    img: img4,
    lines: ["Where is Tom?", "He's at school."],
  },
];

const CORRECT_ANSWERS = {
  1: 3,
  2: 4,
  3: 1,
  4: 2,
};

const NUMBERS = [1, 2, 3, 4];

// ── Error Badge ────────────────────────────────────────────────
const ErrorBadge = ({ top = -8, right = -8 }) => (
  <div
    style={{
      position: "absolute",
      top,
      right,

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

      zIndex: 10,
    }}
  >
    ✕
  </div>
);

// ── Draggable Number ───────────────────────────────────────────
function DraggableNumber({ num, disabled, activeId }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `number-${num}`,
    data: {
      num,
    },
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: "45px",
        height: "45px",

        borderRadius: "50%",

        backgroundColor: disabled ? "#cfcfd4" : DRAG_COLOR,

        color: "#fff",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontWeight: 700,
        fontSize: "clamp(18px,2.4vw,28px)",

        cursor: disabled ? "not-allowed" : "grab",

        opacity: isDragging ? 0.35 : disabled ? 0.55 : 1,

        userSelect: "none",
        touchAction: "none",

        transition: "0.2s ease",

        transform: activeId === `number-${num}` ? "scale(1.1)" : "scale(1)",

        boxShadow:
          activeId === `number-${num}`
            ? `0 0 0 3px rgba(242,154,31,0.35)`
            : "0 3px 10px rgba(0,0,0,0.12)",
      }}
    >
      {num}
    </div>
  );
}

// ── Drop Zone ──────────────────────────────────────────────────
function DropZone({ item, num, wrong, checked, showAns, handleRemove }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${item.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",

        width: "140px",

        transition: "0.25s ease",

        transform: isOver ? "scale(1.03)" : "scale(1)",
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

          objectFit: "contain",

          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* Overlay وقت السحب */}
      {isOver && (
        <div
          style={{
            position: "absolute",
            inset: 0,

            borderRadius: "12px",

            background: "rgba(243,155,66,0.12)",

            pointerEvents: "none",
          }}
        />
      )}

      {/* مربع الرقم */}
      <div
        onClick={() => handleRemove(item.id)}
        style={{
          position: "absolute",

          top: "0%",
          right: "0%",

          width: "30px",
          height: "30px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "clamp(14px,2vw,24px)",

          fontWeight: 700,

          zIndex: 5,

          cursor: num && !showAns && !checked ? "pointer" : "default",

          transition: "0.2s ease",
        }}
      >
        {num || ""}
      </div>

      {/* Error Badge */}
      {wrong && <ErrorBadge top={-6} right={-6} />}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function WB_Unit9_Page55_QI() {
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

    if (!over || showAns || checked) return;

    const draggedNum = active.data.current?.num;

    const dropId = Number(over.id.toString().replace("drop-", ""));

    if (!draggedNum || !dropId) return;

    setChecked(false);

    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((k) => {
        if (updated[k] === draggedNum) {
          delete updated[k];
        }
      });

      updated[dropId] = draggedNum;

      return updated;
    });
  };

  // ── Remove ───────────────────────────────────────────────────
  const handleRemove = (id) => {
    if (showAns || checked) return;

    setChecked(false);

    setAnswers((prev) => {
      const updated = { ...prev };

      delete updated[id];

      return updated;
    });
  };

  // ── Check ────────────────────────────────────────────────────
  const handleCheck = () => {
    if (showAns || checked) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first! ✏️");

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

  // ── Show Answer ──────────────────────────────────────────────
  const handleShowAnswer = () => {
    setAnswers({
      ...CORRECT_ANSWERS,
    });

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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="div-forall"
          style={{
            gap: "5px",
          }}
        >
          {/* العنوان */}
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">I</span>
            Read, look, and number.
          </h1>

          {/* الأرقام */}
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
                disabled={usedNumbers.includes(num) || showAns || checked}
                activeId={activeId}
              />
            ))}
          </div>

          {/* الأسئلة */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              gap: "10px",
            }}
          >
            {ITEMS.map((item) => {
              const wrong = isWrong(item.id);

              const num = answers[item.id];

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",

                    alignItems: "center",

                    gap: "clamp(10px,2vw,24px)",

                    flexWrap: "wrap",
                  }}
                >
                  {/* النص */}
                  <div
                    style={{
                      display: "flex",

                      alignItems: "flex-start",

                      gap: "clamp(8px,1vw,14px)",

                      // flex: 1,

                     width: "70%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(16px,1.9vw,24px)",
                        fontWeight: 500,
                        color: "#111",
                        minWidth: "clamp(16px,1.9vw,24px)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      {item.id}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      {item.lines.map((line, i) => (
                        <p
                          key={i}
                          style={{
                            margin: 0,
                            fontSize: "clamp(16px,1.9vw,22px)",
                            color: "#222",
                            lineHeight: 1.45,
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* الصورة */}
                  <DropZone
                    item={item}
                    num={num}
                    wrong={wrong}
                    checked={checked}
                    showAns={showAns}
                    handleRemove={handleRemove}
                  />
                </div>
              );
            })}
          </div>

          {/* الأزرار */}
          <div className="mt-4 flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleStartAgain={handleReset}
              handleShowAnswer={handleShowAnswer}
            />
          </div>
        </div>

        {/* Overlay */}
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

                fontSize: "28px",

                fontWeight: 700,

                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {activeId.replace("number-", "")}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
