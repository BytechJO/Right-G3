import React, { useEffect, useRef, useState, useMemo } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/6.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/7.svg";
import img8 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/8.svg";
import img9 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/9.svg";
import img10 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/10.svg";
import img11 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/11.svg";
import img12 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/12.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const DRAG_BG = "#f29a1f";

const MONTHS = [
  { id: 1, name: "March", img: img3, correctNumber: 3 },
  { id: 2, name: "July", img: img7, correctNumber: 7 },
  { id: 3, name: "September", img: img9, correctNumber: 9 },
  { id: 4, name: "November", img: img11, correctNumber: 11 },
  { id: 5, name: "June", img: img6, correctNumber: 6 },
  { id: 6, name: "February", img: img2, correctNumber: 2 },
  { id: 7, name: "December", img: img12, correctNumber: 12 },
  { id: 8, name: "May", img: img5, correctNumber: 5 },
  { id: 9, name: "August", img: img8, correctNumber: 8 },
  { id: 10, name: "October", img: img10, correctNumber: 10 },
  { id: 11, name: "January", img: img1, correctNumber: 1 },
  { id: 12, name: "April", img: img4, correctNumber: 4 },
];

const DRAG_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function DraggableNumber({ num, disabled, showAns, activeId }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `num-${num}`,
    data: { num },
    disabled: disabled || showAns,
    activationConstraint: {
      distance: 8, // 👈 مهم
    },
  });

  const selected = activeId === `num-${num}`;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        background: disabled || showAns ? "#cfcfd4" : DRAG_BG,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: 700,
        cursor: disabled || showAns ? "not-allowed" : "grab",
        userSelect: "none",
        opacity: disabled ? 0.5 : 1,
        // transition: "0.2s ease",
        // transform: transform
        //   ? `translate(${transform.x}px, ${transform.y}px)`
        //   : selected
        //   ? "scale(1.1)"
        //   : "scale(1)",
        boxShadow: selected
          ? "0 0 0 3px rgba(242,154,31,0.35)"
          : "0 3px 8px rgba(0,0,0,0.12)",
      }}
    >
      {num}
    </div>
  );
}
function DroppableBox({ month, children }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${month.id}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(8px,1.2vw,16px)",
        minWidth: 0,
        position: "relative",
        border:"1px solid #1111117a",
        padding:"10px",

        // 🔥 الايفيكت
        boxShadow: isOver ? "0 0 0 4px rgba(243,155,66,0.35)" : "none",

        transform: isOver ? "scale(1.03)" : "scale(1)",
        transition: "all 0.2s ease",
        borderRadius: "10px",
      }}
    >
      {children}
    </div>
  );
}

// TraceCanvas (بدون تغيير)
function TraceCanvas({ img, resetKey }) {
  const canvasRef = useRef(null);
  const imgObjRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef(null);

  const redraw = (canvas, image) => {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.35;
    ctx.drawImage(image, 0, 0);
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();

    image.onload = () => {
      imgObjRef.current = image;
      redraw(canvas, image);
    };

    image.src = img;
  }, [img, resetKey]);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;

    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    e.stopPropagation();

    drawing.current = true;
    lastPos.current = getPos(e);
  };

  const draw = (e) => {
    if (!drawing.current) return;

    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#111827";

    // 🔥 هون التعديل (stroke = 1)
    ctx.lineWidth = 2;

    ctx.lineCap = "round";
    ctx.stroke();

    lastPos.current = pos;
  };

  const endDraw = (e) => {
    e?.stopPropagation();
    drawing.current = false;
    lastPos.current = null;
  };

  // 🔥 زر المسح
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const image = imgObjRef.current;
    if (!canvas || !image) return;

    redraw(canvas, image);
  };

  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        style={{
          width: "100%",
          cursor: "crosshair",
          touchAction: "none",
        }}
      />

      {/* 🔥 زر X */}
      <button
        onClick={clearCanvas}
        style={{
          position: "absolute",
          bottom: "4px",
          right: "4px",
          padding: "6px 6px",
          borderRadius: "6px",
          border: "1.5px solid #fca5a5",
          background: "#fef2f2",
          color: "#dc2626",
          fontSize: "10px",
          fontWeight: 700,
          cursor: "pointer",
          lineHeight: 1,
          zIndex: 5,
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default function WB_TraceAndNumber_PageF() {
  const [answers, setAnswers] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const usedNumbers = useMemo(() => Object.values(answers), [answers]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const num = active.data.current.num;
    const monthId = Number(over.id.replace("drop-", ""));

    const updated = { ...answers };
    Object.keys(updated).forEach((k) => {
      if (updated[k] === num) delete updated[k];
    });
    updated[monthId] = num;

    setAnswers(updated);
    setChecked(false);
  };

  const handleRemoveNumber = (monthId) => {
    if (showAns || checked) return;
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[monthId];
      return u;
    });
    setChecked(false);
  };
  const handleCheck = () => {
    if (showAns || checked) return;

    const allAnswered = MONTHS.every((m) => answers[m.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    MONTHS.forEach((m) => {
      if (answers[m.id] === m.correctNumber) score++;
    });

    setChecked(true);

    const total = MONTHS.length;

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

    MONTHS.forEach((m) => {
      correct[m.id] = m.correctNumber;
    });

    setAnswers(correct);
    setChecked(true);
    setShowAns(true);
    setActiveId(null);
  };

  const handleReset = () => {
    setAnswers({});
    setActiveId(null);
    setChecked(false);
    setShowAns(false);
    setResetKey((k) => k + 1);
  };
  const isWrong = (monthId) => {
    if (!checked || showAns) return false;
    const m = MONTHS.find((m) => m.id === monthId);
    return answers[monthId] !== m.correctNumber;
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "35px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">F</span> Trace and number.
        </h1>

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* Numbers */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {DRAG_NUMBERS.map((num) => (
              <DraggableNumber
                key={num}
                num={num}
                disabled={usedNumbers.includes(num)}
                showAns={showAns}
                activeId={activeId}
              />
            ))}
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "20px",
            }}
          >
            {MONTHS.map((month) => {
              const wrong = isWrong(month.id);
              const num = answers[month.id];

              return (
                <DroppableBox key={month.id} month={month}>
                  <div
                    onClick={() => handleRemoveNumber(month.id)}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "8px",
                      border: `1px solid ${wrong ? "red" : "#1111117a"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "20px",
                      color: wrong ? DRAG_BG : DRAG_BG,
                      position: "relative", // 🔥 مهم
                    }}
                  >
                    {num || ""}

                    {/* 🔥 WRONG BADGE */}
                    {wrong && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: "red",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          border: "2px solid #fff",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                          zIndex: 5,
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>

                  <TraceCanvas img={month.img} resetKey={resetKey} />
                </DroppableBox>
              );
            })}
          </div>

          <DragOverlay>
            {activeId && (
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  background: DRAG_BG,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {activeId.replace("num-", "")}
              </div>
            )}
          </DragOverlay>
        </DndContext>

        <div style={{ display: "flex", justifyContent: "center" }}>
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
