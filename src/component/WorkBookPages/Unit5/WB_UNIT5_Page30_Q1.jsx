import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import instruction1Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise G/Item_001_The_hat_is_under_the_table.mp3";
import instruction2Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise G/Item_002_The_cat_is_next_to_the_chair.mp3";
import instruction3Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise G/Item_003_The_ball_is_on_the_bed.mp3";
import instruction4Audio from "../../../assets/audio/WorkBook/unit5/Page 30 - Exercise G/Item_004_The_apple_is_in_the_fridge.mp3";

import imgHat from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G1.svg";
import imgCat from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G2.svg";
import imgBall from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G3.svg";
import imgApple from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G4.svg";

import imgFridge from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G5.svg";
import imgBed from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G6.svg";
import imgTable from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G7.svg";
import imgChair from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G8.svg";

const BORDER_COLOR = "#f39b42";

const SENTENCES = [
  { id: 1, before: "The hat", img: imgHat, after: "is under the table." },
  { id: 2, before: "The cat", img: imgCat, after: "is next to the chair." },
  { id: 3, before: "The ball", img: imgBall, after: "is on the bed." },
  { id: 4, before: "The apple", img: imgApple, after: "is in the fridge." },
];
const SENTENCE_AUDIO = {
  1: instruction1Audio,
  2: instruction2Audio,
  3: instruction3Audio,
  4: instruction4Audio,
};

const FURNITURE = [
  { id: 1, img: imgFridge, alt: "fridge" },
  { id: 2, img: imgBed, alt: "bed" },
  { id: 3, img: imgTable, alt: "table" },
  { id: 4, img: imgChair, alt: "chair" },
];

const COLORS = [
  "#111827",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#eab308",
  "#a855f7",
  "#ec4899",
  "#ffffff",
];
const SIZES = [2, 4, 8, 12];

// ── Single canvas drawing box ──
// eslint-disable-next-line react-refresh/only-export-components
function DrawCanvas({ width, height, tool, color, size, resetKey }) {
  const canvasRef = useRef(null);

  const drawing = useRef(false);
  const lastPos = useRef(null);

  // Undo history
  const historyRef = useRef([]);

  // Keyboard drawing
  const [canvasFocused, setCanvasFocused] = useState(false);
  const [keyboardDrawing, setKeyboardDrawing] = useState(false);

  const [cursorPos, setCursorPos] = useState({
    x: width / 2,
    y: height / 2,
  });

  const keyboardPosRef = useRef({
    x: width / 2,
    y: height / 2,
  });

  /* =====================================================
     CLEAR WHITE BACKGROUND
  ===================================================== */

  const fillWhite = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  /* =====================================================
     RESET
  ===================================================== */

  useEffect(() => {
    fillWhite();

    historyRef.current = [];

    drawing.current = false;
    lastPos.current = null;

    setKeyboardDrawing(false);

    const center = {
      x: width / 2,
      y: height / 2,
    };

    keyboardPosRef.current = center;
    setCursorPos(center);
  }, [resetKey, width, height]);

  useEffect(() => {
    fillWhite();
  }, []);

  /* =====================================================
     SAVE FOR UNDO
  ===================================================== */

  const saveHistory = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    historyRef.current.push(snapshot);

    // نحتفظ بآخر 30 خطوة فقط
    if (historyRef.current.length > 30) {
      historyRef.current.shift();
    }
  };

  /* =====================================================
     UNDO
  ===================================================== */

  const undo = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const previous = historyRef.current.pop();

    if (!previous) return;

    const ctx = canvas.getContext("2d");

    ctx.putImageData(previous, 0, 0);

    drawing.current = false;
    lastPos.current = null;

    setKeyboardDrawing(false);
  };

  /* =====================================================
     POINTER POSITION
  ===================================================== */

  const getPos = (e) => {
    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;

    const scaleY = canvas.height / rect.height;

    const src = e.touches ? e.touches[0] : e;

    return {
      x: (src.clientX - rect.left) * scaleX,

      y: (src.clientY - rect.top) * scaleY,
    };
  };

  /* =====================================================
     DRAW DOT
  ===================================================== */

  const drawDot = (pos) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.arc(
      pos.x,
      pos.y,
      (tool === "eraser" ? size * 2 : size) / 2,
      0,
      Math.PI * 2,
    );

    ctx.fillStyle = tool === "eraser" ? "#fff" : color;

    ctx.fill();
  };

  /* =====================================================
     DRAW LINE BETWEEN TWO POINTS
  ===================================================== */

  const drawLine = (from, to) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.beginPath();

    ctx.moveTo(from.x, from.y);

    ctx.lineTo(to.x, to.y);

    ctx.strokeStyle = tool === "eraser" ? "#fff" : color;

    ctx.lineWidth = tool === "eraser" ? size * 3 : size;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();
  };

  /* =====================================================
     MOUSE / TOUCH START
  ===================================================== */

  const startDraw = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // قبل أي تغيير خزّن الحالة
    saveHistory();

    if (tool === "fill") {
      ctx.fillStyle = color;

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      return;
    }

    const pos = getPos(e);

    lastPos.current = pos;
    drawing.current = true;

    drawDot(pos);
  };

  /* =====================================================
     MOUSE / TOUCH MOVE
  ===================================================== */

  const draw = (e) => {
    if (!drawing.current) return;

    e.preventDefault();
    e.stopPropagation();

    if (tool !== "pencil" && tool !== "eraser") {
      return;
    }

    const pos = getPos(e);

    const prev = lastPos.current;

    if (!prev) return;

    drawLine(prev, pos);

    lastPos.current = pos;
  };

  /* =====================================================
     END DRAW
  ===================================================== */

  const endDraw = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    drawing.current = false;
    lastPos.current = null;
  };

  /* =====================================================
     CLEAR
  ===================================================== */

  const clear = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // حتى الـClear نقدر نعمله Undo
    saveHistory();

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawing.current = false;
    lastPos.current = null;

    setKeyboardDrawing(false);
  };

  /* =====================================================
     KEYBOARD
  ===================================================== */

  const handleCanvasKeyDown = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const isActivate = event.key === "Enter" || event.key === " ";

    /* ENTER / SPACE */

    if (isActivate) {
      event.preventDefault();
      event.stopPropagation();

      /*
        Fill:
        Enter / Space يلون الكانفس مباشرة
      */

      if (tool === "fill") {
        saveHistory();

        const ctx = canvas.getContext("2d");

        ctx.fillStyle = color;

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return;
      }

      /*
        Pencil / Eraser:
        أول Enter يبدأ الرسم
        ثاني Enter يوقفه
      */

      if (!keyboardDrawing) {
        saveHistory();

        setKeyboardDrawing(true);

        drawDot(keyboardPosRef.current);
      } else {
        setKeyboardDrawing(false);
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

    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (!arrowKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const step = event.shiftKey ? 15 : 5;

    const oldPos = {
      ...keyboardPosRef.current,
    };

    let newX = oldPos.x;

    let newY = oldPos.y;

    if (event.key === "ArrowLeft") {
      newX -= step;
    }

    if (event.key === "ArrowRight") {
      newX += step;
    }

    if (event.key === "ArrowUp") {
      newY -= step;
    }

    if (event.key === "ArrowDown") {
      newY += step;
    }

    newX = Math.max(0, Math.min(canvas.width, newX));

    newY = Math.max(0, Math.min(canvas.height, newY));

    const newPos = {
      x: newX,
      y: newY,
    };

    /*
      إذا وضع الرسم شغال:
      حركة الأسهم ترسم
    */

    if (keyboardDrawing && (tool === "pencil" || tool === "eraser")) {
      drawLine(oldPos, newPos);
    }

    keyboardPosRef.current = newPos;

    setCursorPos(newPos);
  };

  /* =====================================================
     KEYBOARD CURSOR POSITION
  ===================================================== */

  const cursorStyle = {
    position: "absolute",

    left: `${(cursorPos.x / width) * 100}%`,

    top: `${(cursorPos.y / height) * 100}%`,

    transform: "translate(-50%, -50%)",

    width: "14px",
    height: "14px",

    borderRadius: "50%",

    border: keyboardDrawing ? "3px solid #dc2626" : "3px solid #2563eb",

    background: "rgba(255,255,255,0.7)",

    pointerEvents: "none",

    zIndex: 4,

    boxShadow: "0 0 0 2px rgba(255,255,255,0.8)",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* ===============================
          CANVAS
      =============================== */}

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        tabIndex={0}
        role="application"
        aria-label="Drawing area. Press Enter or Space to start drawing, use the arrow keys to move, and press Enter or Space again to stop drawing."
        onFocus={() => {
          setCanvasFocused(true);
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
          height: "100%",
          display: "block",

          cursor: tool === "eraser" ? "cell" : "crosshair",

          touchAction: "none",

          outline: canvasFocused ? "3px solid #2563eb" : "none",

          outlineOffset: "-3px",
        }}
      />

      {/* ===============================
          KEYBOARD CURSOR
      =============================== */}

      {canvasFocused && (
        <>
          <div aria-hidden="true" style={cursorStyle} />

          <div
            aria-hidden="true"
            style={{
              position: "absolute",

              top: "6px",

              left: "6px",

              padding: "3px 7px",

              borderRadius: "999px",

              background: keyboardDrawing ? "#dc2626" : "#2563eb",

              color: "#fff",

              fontSize: "11px",

              fontWeight: 700,

              pointerEvents: "none",

              zIndex: 4,
            }}
          >
            {keyboardDrawing ? "Drawing" : "Move"}
          </div>
        </>
      )}

      {/* ===============================
          UNDO - فوق X
      =============================== */}

      <button
        type="button"
        aria-label="Undo last drawing"
        title="Undo"
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
          undo();
        }}
        style={{
          position: "absolute",

          bottom: "34px",

          right: "4px",

          width: "28px",

          height: "28px",

          padding: 0,

          borderRadius: "6px",

          border: "1.5px solid #93c5fd",

          background: "#eff6ff",

          color: "#2563eb",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          fontSize: "18px",

          fontWeight: 700,

          cursor: "pointer",

          zIndex: 5,

          lineHeight: 1,
        }}
      >
        ↶
      </button>

      {/* ===============================
          CLEAR X
      =============================== */}

      <button
        type="button"
        aria-label="Clear drawing"
        title="Clear drawing"
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
          clear();
        }}
        style={{
          position: "absolute",

          bottom: "4px",

          right: "4px",

          width: "28px",

          height: "28px",

          padding: 0,

          borderRadius: "6px",

          border: "1.5px solid #fca5a5",

          background: "#fef2f2",

          color: "#dc2626",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          fontSize: "13px",

          fontWeight: 700,

          cursor: "pointer",

          zIndex: 5,

          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default function SB_ReadAndDraw_PageG() {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#111827");
  const [size, setSize] = useState(4);
  const [resetKey, setResetKey] = useState(0);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const handleStartAgain = () => {
    setResetKey((prev) => prev + 1);
    stopAudio();
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="G"
          title="Read and draw."
          subTitle="Read one instruction at a time and draw only the requested hat, cat, ball, and apple in the specified locations before moving to the next instruction."
        />

        {/* ── Main layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(16px,2.5vw,32px)",
            alignItems: "start",
            width: "100%",
          }}
        >
          {/* LEFT: sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(14px,2vw,24px)",
              minWidth: 0,
            }}
          >
            {SENTENCES.map((s) => (
              <div
                key={s.id}
                className="unit4-audio-control unit4-interactive"
                role="button"
                tabIndex={0}
                aria-label={`Play instruction: ${s.before} ${s.after}`}
                onClick={() =>
                  playAudio(`sentence-${s.id}`, SENTENCE_AUDIO[s.id])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`sentence-${s.id}`, SENTENCE_AUDIO[s.id]);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(8px,1vw,14px)",
                  flexWrap: "wrap",
                  minWidth: 0,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `sentence-${s.id}`}
                />
                <span
                  style={{
                    fontSize: "clamp(16px,1.7vw,20px)",
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "clamp(14px,1.8vw,24px)",
                  }}
                >
                  {s.id}
                </span>
                <span
                  style={{
                    fontSize: "clamp(14px,1.4vw,18px)",
                    // fontWeight: 500,
                    color: "#111",
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                >
                  {s.before}
                </span>
                <img
                  src={s.img}
                  alt={s.before}
                  style={{
                    height: "clamp(28px,4vw,48px)",
                    width: "auto",
                    objectFit: "contain",
                    display: "inline-block",
                    flexShrink: 0,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    fontSize: "clamp(14px,1.4vw,18px)",
                    // fontWeight: 500,
                    color: "#111",
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                >
                  {s.after}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT: furniture images 2×2 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap: "clamp(8px,1.2vw,16px)",
              flexShrink: 0,
            }}
          >
            {FURNITURE.map((item) => (
              <div
                key={item.id}
                style={{
                  width: "clamp(90px,13vw,160px)",
                  aspectRatio: "1 / 1",
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* ── Toolbar ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(8px,1vw,12px)",
            padding: "clamp(8px,1vw,14px) clamp(10px,1.2vw,16px)",
            border: "1px solid #e5e7eb",
            borderRadius: "clamp(10px,1.2vw,16px)",
            background: "#f9fafb",
          }}
        >
          {/* tools */}
          <div
            style={{
              display: "flex",
              gap: "clamp(4px,0.6vw,8px)",
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "pencil", label: "✏️" },
              { id: "eraser", label: "🧽" },
              { id: "fill", label: "🪣" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTool(item.id)}
                title={item.id}
                style={{
                  padding: "clamp(5px,0.7vw,9px) clamp(8px,1vw,12px)",
                  borderRadius: "10px",
                  border:
                    tool === item.id
                      ? "2px solid #3b82f6"
                      : "2px solid #d1d5db",
                  background: tool === item.id ? "#eff6ff" : "#fff",
                  color: tool === item.id ? "#1d4ed8" : "#374151",
                  // fontWeight:   700,
                  cursor: "pointer",
                  fontSize: "clamp(14px,1.4vw,18px)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            style={{
              width: "1px",
              height: "28px",
              background: "#d1d5db",
              flexShrink: 0,
            }}
          />

          {/* colors */}
          <div
            style={{
              display: "flex",
              gap: "clamp(4px,0.6vw,8px)",
              flexWrap: "wrap",
            }}
          >
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: "clamp(22px,2.8vw,32px)",
                  height: "clamp(22px,2.8vw,32px)",
                  borderRadius: "50%",
                  border:
                    color === c
                      ? "3px solid #111827"
                      : c === "#ffffff"
                        ? "2px solid #d1d5db"
                        : "2px solid transparent",
                  background: c,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          <div
            style={{
              width: "1px",
              height: "28px",
              background: "#d1d5db",
              flexShrink: 0,
            }}
          />

          {/* sizes */}
          <div
            style={{
              display: "flex",
              gap: "clamp(4px,0.6vw,8px)",
              alignItems: "center",
            }}
          >
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width: "clamp(26px,3.2vw,36px)",
                  height: "clamp(26px,3.2vw,36px)",
                  borderRadius: "50%",
                  border:
                    size === s ? "2px solid #3b82f6" : "2px solid #d1d5db",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: `${Math.min(s * 2, 16)}px`,
                    height: `${Math.min(s * 2, 16)}px`,
                    borderRadius: "50%",
                    background: "#111827",
                    display: "block",
                    flexShrink: 0,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        {/* ── Drawing area — 4 canvas boxes ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(12px,1.8vw,22px)",
            width: "100%",
          }}
        >
          {SENTENCES.map((s) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(6px,0.8vw,10px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(6px,0.8vw,10px)",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(12px,1.4vw,18px)",
                    // fontWeight: 700,
                    color: "#fff",
                    background: BORDER_COLOR,
                    borderRadius: "50%",
                    width: "clamp(20px,2.4vw,30px)",
                    height: "clamp(20px,2.4vw,30px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {s.id}
                </span>
                <span
                  style={{
                    fontSize: "clamp(12px,1.4vw,18px)",
                    fontWeight: 500,
                    color: "#555",
                    lineHeight: 1.2,
                  }}
                >
                  {s.before} {s.after}
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  aspectRatio: "2 / 1",
                  border: `2px solid ${BORDER_COLOR}`,
                  borderRadius: "clamp(10px,1.2vw,16px)",
                  overflow: "hidden",
                  background: "#fff",
                  position: "relative",
                  boxSizing: "border-box",
                }}
              >
                <DrawCanvas
                  width={600}
                  height={300}
                  tool={tool}
                  color={color}
                  size={size}
                  resetKey={resetKey}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons — Start Again only */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
          <Button handleStartAgain={handleStartAgain} />
        </div>
      </div>
    </div>
  );
}
