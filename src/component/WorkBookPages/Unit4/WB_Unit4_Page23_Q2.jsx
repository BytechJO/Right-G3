import React, { useEffect, useRef, useState, useMemo } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import marchAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_001_March.mp3";
import julyAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_002_July.mp3";
import septemberAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_003_September.mp3";
import novemberAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_004_November.mp3";
import juneAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_005_June.mp3";
import februaryAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_006_February.mp3";
import decemberAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_007_December.mp3";
import mayAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_008_May.mp3";
import augustAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_009_August.mp3";
import octoberAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_010_October.mp3";
import januaryAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_011_January.mp3";
import aprilAudio from "../../../assets/audio/WorkBook/unit4/Page 23 - Exercise F/Item_012_April.mp3";

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
import { FaVolumeUp } from "react-icons/fa";

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
const MONTH_AUDIO = {
  March: marchAudio,
  July: julyAudio,
  September: septemberAudio,
  November: novemberAudio,
  June: juneAudio,
  February: februaryAudio,
  December: decemberAudio,
  May: mayAudio,
  August: augustAudio,
  October: octoberAudio,
  January: januaryAudio,
  April: aprilAudio,
};
// eslint-disable-next-line react-refresh/only-export-components
function DraggableNumber({
  num,
  disabled,
  showAns,
  activeId,
  registerItem,
  onPick,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
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
      ref={(element) => {
        setNodeRef(element);
        registerItem(num, element);
      }}
      {...listeners}
      {...attributes}
      tabIndex={disabled || showAns ? -1 : 0}
      role="button"
      aria-label={`Pick number ${num}`}
      aria-disabled={disabled || showAns}
      onKeyDown={(event) => {
        if (
          (event.key === "Enter" || event.key === " ") &&
          !disabled &&
          !showAns
        ) {
          event.preventDefault();
          onPick(num);
        }
      }}
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
        touchAction: "none",
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
// eslint-disable-next-line react-refresh/only-export-components
function DroppableBox({
  month,
  children,
  registerTarget,
  onKeyDown,
  tabIndex,
  preview,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${month.id}`,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(month.id, element);
      }}
      tabIndex={tabIndex}
      role="button"
      aria-label={`Drop number for ${month.name}`}
      onKeyDown={onKeyDown}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(8px,1.2vw,16px)",
        minWidth: 0,
        position: "relative",
        border: "1px solid #1111117a",
        padding: "10px",

        // 🔥 الايفيكت
        boxShadow:
          isOver || preview ? "0 0 0 4px rgba(243,155,66,0.35)" : "none",

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
// eslint-disable-next-line react-refresh/only-export-components
function TraceCanvas({ img, resetKey }) {
  const canvasRef = useRef(null);
  const imgObjRef = useRef(null);

  const drawing = useRef(false);
  const lastPos = useRef(null);

  /* =====================================================
     UNDO HISTORY
  ===================================================== */

  const historyRef = useRef([]);

  /* =====================================================
     KEYBOARD DRAWING
  ===================================================== */

  const [canvasFocused, setCanvasFocused] = useState(false);

  const [keyboardDrawing, setKeyboardDrawing] = useState(false);

  const [cursorPos, setCursorPos] = useState({
    x: 50,
    y: 50,
  });

  const keyboardPosRef = useRef(null);

  /* =====================================================
     REDRAW BACKGROUND IMAGE
  ===================================================== */

  const redraw = (canvas, image) => {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.35;

    ctx.drawImage(image, 0, 0);

    ctx.globalAlpha = 1;
  };

  /* =====================================================
     LOAD IMAGE / RESET
  ===================================================== */

  useEffect(() => {
    const canvas = canvasRef.current;

    const image = new Image();

    image.onload = () => {
      imgObjRef.current = image;

      redraw(canvas, image);

      historyRef.current = [];

      keyboardPosRef.current = {
        x: canvas.width / 2,

        y: canvas.height / 2,
      };

      setCursorPos({
        x: 50,
        y: 50,
      });

      setKeyboardDrawing(false);
    };

    image.src = img;
  }, [img, resetKey]);

  /* =====================================================
     SAVE HISTORY
     Save once before each stroke
  ===================================================== */

  const saveHistory = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    historyRef.current.push(snapshot);

    if (historyRef.current.length > 50) {
      historyRef.current.shift();
    }
  };

  /* =====================================================
     UNDO
  ===================================================== */

  const undoCanvas = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const previous = historyRef.current.pop();

    if (!previous) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.putImageData(previous, 0, 0);

    setKeyboardDrawing(false);
  };

  /* =====================================================
     POINTER POSITION
  ===================================================== */

  const getPos = (e) => {
    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    const src = e.touches ? e.touches[0] : e;

    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),

      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  /* =====================================================
     MOUSE / TOUCH START
  ===================================================== */

  const startDraw = (e) => {
    e.preventDefault();

    e.stopPropagation();

    saveHistory();

    drawing.current = true;

    lastPos.current = getPos(e);
  };

  /* =====================================================
     MOUSE / TOUCH DRAW
  ===================================================== */

  const draw = (e) => {
    if (!drawing.current) {
      return;
    }

    e.preventDefault();

    e.stopPropagation();

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const pos = getPos(e);

    ctx.beginPath();

    ctx.moveTo(lastPos.current.x, lastPos.current.y);

    ctx.lineTo(pos.x, pos.y);

    ctx.strokeStyle = "#111827";

    ctx.lineWidth = 2;

    ctx.lineCap = "round";

    ctx.stroke();

    lastPos.current = pos;
  };

  /* =====================================================
     MOUSE / TOUCH END
  ===================================================== */

  const endDraw = (e) => {
    e?.stopPropagation();

    drawing.current = false;

    lastPos.current = null;
  };

  /* =====================================================
     CLEAR
  ===================================================== */

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    const image = imgObjRef.current;

    if (!canvas || !image) {
      return;
    }

    saveHistory();

    redraw(canvas, image);

    setKeyboardDrawing(false);
  };

  /* =====================================================
     KEYBOARD CURSOR INIT
  ===================================================== */

  const ensureKeyboardPos = () => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    if (!keyboardPosRef.current) {
      keyboardPosRef.current = {
        x: canvas.width / 2,

        y: canvas.height / 2,
      };
    }

    return keyboardPosRef.current;
  };

  /* =====================================================
     KEYBOARD DRAWING
  ===================================================== */

  const handleCanvasKeyDown = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const current = ensureKeyboardPos();

    if (!current) return;

    /* ENTER / SPACE */

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      event.stopPropagation();

      if (keyboardDrawing) {
        setKeyboardDrawing(false);
      } else {
        saveHistory();

        setKeyboardDrawing(true);
      }

      return;
    }

    /* ESC */

    if (event.key === "Escape") {
      event.preventDefault();

      event.stopPropagation();

      setKeyboardDrawing(false);

      return;
    }

    /* ARROWS */

    const directions = {
      ArrowLeft: {
        x: -1,
        y: 0,
      },

      ArrowRight: {
        x: 1,
        y: 0,
      },

      ArrowUp: {
        x: 0,
        y: -1,
      },

      ArrowDown: {
        x: 0,
        y: 1,
      },
    };

    const direction = directions[event.key];

    if (!direction) {
      return;
    }

    event.preventDefault();

    event.stopPropagation();

    const step = event.shiftKey ? 15 : 5;

    const next = {
      x: Math.min(canvas.width, Math.max(0, current.x + direction.x * step)),

      y: Math.min(canvas.height, Math.max(0, current.y + direction.y * step)),
    };

    /* DRAW WHILE ACTIVE */

    if (keyboardDrawing) {
      const ctx = canvas.getContext("2d");

      ctx.beginPath();

      ctx.moveTo(current.x, current.y);

      ctx.lineTo(next.x, next.y);

      ctx.strokeStyle = "#111827";

      ctx.lineWidth = 2;

      ctx.lineCap = "round";

      ctx.stroke();
    }

    keyboardPosRef.current = next;

    setCursorPos({
      x: (next.x / canvas.width) * 100,

      y: (next.y / canvas.height) * 100,
    });
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      style={{
        flex: 1,

        minWidth: 0,

        position: "relative",
      }}
    >
      {/* =================================================
          CANVAS
      ================================================= */}

      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="application"
        aria-label="Tracing area. Use arrow keys to move the cursor. Press Enter or Space to start or stop drawing. Press Escape to stop drawing."
        onFocus={() => {
          setCanvasFocused(true);

          ensureKeyboardPos();
        }}
        onBlur={() => {
          setCanvasFocused(false);

          setKeyboardDrawing(false);
        }}
        onKeyDown={handleCanvasKeyDown}
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

          outline: "none",
        }}
      />

      {/* =================================================
          KEYBOARD DRAWING CURSOR
      ================================================= */}

      {canvasFocused && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",

            left: `${cursorPos.x}%`,

            top: `${cursorPos.y}%`,

            background: "rgba(255,255,255,0.9)",

            pointerEvents: "none",

            zIndex: 10,

            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              position: "absolute",

              left: "50%",

              top: "50%",

              width: "5px",

              height: "5px",

              borderRadius: "50%",

              background: keyboardDrawing ? "#dc2626" : "#2563eb",

              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}

      {/* =================================================
          UNDO
          فوق X
      ================================================= */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();

          undoCanvas();
        }}
        aria-label="Undo last drawing"
        title="Undo"
        style={{
          position: "absolute",

          bottom: "34px",

          right: "4px",

          padding: "6px 6px",

          borderRadius: "6px",

          border: "1.5px solid #93c5fd",

          background: "#eff6ff",

          color: "#2563eb",

          fontSize: "10px",

          fontWeight: 700,

          cursor: "pointer",

          lineHeight: 1,

          zIndex: 5,
        }}
      >
        ↶
      </button>

      {/* =================================================
          CLEAR X
      ================================================= */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();

          clearCanvas();
        }}
        aria-label="Clear drawing"
        title="Clear drawing"
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
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const usedNumbers = useMemo(() => Object.values(answers), [answers]);
  const placeNumber = (num, monthId) => {
    if (showAns || lockedIds.includes(monthId)) return;
    setAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === num && !lockedIds.includes(Number(key)))
          delete updated[key];
      });
      updated[monthId] = num;
      return updated;
    });
    setWrongIds((prev) => prev.filter((id) => id !== monthId));
  };
  const tabDrag = useUnit4TabDrag({
    itemIds: DRAG_NUMBERS,
    targetIds: MONTHS.map((month) => month.id),
    isItemDisabled: (num) => usedNumbers.includes(num),
    isTargetDisabled: (id) => lockedIds.includes(id),
    onPlace: placeNumber,
  });

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const num = active.data.current.num;
    const monthId = Number(over.id.replace("drop-", ""));

    placeNumber(num, monthId);
  };

  const handleRemoveNumber = (monthId) => {
    if (showAns || lockedIds.includes(monthId)) return;
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[monthId];
      return u;
    });
    setWrongIds((prev) => prev.filter((id) => id !== monthId));
    const removed = answers[monthId];
    if (removed) tabDrag.focusItem(removed);
  };
  const handleCheck = () => {
    if (showAns || lockedIds.length === MONTHS.length) return;

    const allAnswered = MONTHS.every((m) => answers[m.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    MONTHS.forEach((m) => {
      if (answers[m.id] === m.correctNumber) score++;
    });

    const correctIds = MONTHS.filter(
      (month) => answers[month.id] === month.correctNumber,
    ).map((month) => month.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);
    setWrongIds(
      MONTHS.filter((month) => answers[month.id] !== month.correctNumber).map(
        (month) => month.id,
      ),
    );

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
    setLockedIds(MONTHS.map((month) => month.id));
    setWrongIds([]);
    setShowAns(true);
    setActiveId(null);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setActiveId(null);
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    setResetKey((k) => k + 1);
    stopAudio();
  };
  const isWrong = (monthId) => {
    return !showAns && wrongIds.includes(monthId);
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "35px" }}>
        <ExerciseHeader
          sectionLetter="F"
          title="Trace and number."
          subTitle="Trace each month name and its number in the year carefully, then use its correct sequence number before moving to the next word."
        />

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* Numbers */}
          <div
            className="w-full"
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
                registerItem={tabDrag.registerItem}
                onPick={tabDrag.pickItem}
              />
            ))}
          </div>

          {/* Grid */}
          <div
            className="w-full"
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
                <DroppableBox
                  key={month.id}
                  month={month}
                  registerTarget={tabDrag.registerTarget}
                  onKeyDown={(event) => {
                    if (tabDrag.keyboardItemId != null)
                      tabDrag.handleTargetKeyDown(event, month.id);
                    else if (
                      (event.key === "Enter" || event.key === " ") &&
                      num &&
                      !lockedIds.includes(month.id)
                    ) {
                      event.preventDefault();
                      handleRemoveNumber(month.id);
                    }
                  }}
                  tabIndex={
                    tabDrag.keyboardItemId != null ||
                    (num && !lockedIds.includes(month.id))
                      ? 0
                      : -1
                  }
                  preview={
                    tabDrag.keyboardItemId != null &&
                    tabDrag.keyboardTargetId === month.id
                  }
                >
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
                  {MONTH_AUDIO[month.name] && (
                    <button
                      type="button"
                      aria-label={`Play ${month.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        playAudio(`month-${month.id}`, MONTH_AUDIO[month.name]);
                      }}
                      style={{
                        position: "absolute",
                        bottom: "64px",
                        right: "10px",
                        width: "28px",
                        height: "28px",
                        padding: 0,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 5,
                      }}
                    >
                      <FaVolumeUp size={18} />
                    </button>
                  )}
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
