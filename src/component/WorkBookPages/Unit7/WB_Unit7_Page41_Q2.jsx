import React, { useRef, useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import audio1 from "../../../assets/audio/WorkBook/unit7/Page 41 - Exercise F/Item_001_Draw_a_nest_in_the_tree.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit7/Page 41 - Exercise F/Item_002_Draw_a_box_next_to_the_tree.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit7/Page 41 - Exercise F/Item_003_Draw_a_cat_between_the_flowers.mp3";

import imgTree from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 41/SVG/2.svg";

const INSTRUCTIONS = [
  "Draw a nest in the tree.",
  "Draw a box next to the tree.",
  "Draw a cat between the flowers.",
];

const INSTRUCTION_AUDIO = [audio1, audio2, audio3];

const TOOLS = [
  { id: "pencil", label: "✏️ Pencil" },
  { id: "eraser", label: "🧹 Eraser" },
];

const COLORS = [
  "#1e293b",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
];

const SIZES = [2, 4, 7, 12];

const CANVAS_SIZE = 500;

export default function WB_Unit7_Page41_Draw() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const lastPos = useRef(null);

  const keyboardPosRef = useRef({
    x: CANVAS_SIZE / 2,
    y: CANVAS_SIZE / 2,
  });

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#1e293b");
  const [size, setSize] = useState(4);

  const [keyboardDrawing, setKeyboardDrawing] = useState(false);

  const [keyboardCursor, setKeyboardCursor] = useState({
    x: CANVAS_SIZE / 2,
    y: CANVAS_SIZE / 2,
  });

  const [canvasFocused, setCanvasFocused] = useState(false);

  /* =====================================================
     BACKGROUND IMAGE
  ===================================================== */

  useEffect(() => {
    const canvas = bgCanvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = imgTree;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  /* =====================================================
     POINTER POSITION
  ===================================================== */

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  /* =====================================================
     DRAW DOT
  ===================================================== */

  const drawDot = (pos) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.save();

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";

      ctx.beginPath();

      ctx.arc(pos.x, pos.y, size * 2, 0, Math.PI * 2);

      ctx.fill();
    } else {
      ctx.globalCompositeOperation = "source-over";

      ctx.beginPath();

      ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);

      ctx.fillStyle = color;
      ctx.fill();
    }

    ctx.restore();
  };

  /* =====================================================
     DRAW LINE
  ===================================================== */

  const drawLine = (from, to) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.save();

    ctx.beginPath();

    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = size * 4;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();

    ctx.restore();
  };

  /* =====================================================
     MOUSE / TOUCH START
  ===================================================== */

  const startDrawing = (e) => {
    e.preventDefault();

    const canvas = canvasRef.current;

    if (!canvas) return;

    const pos = getPos(e, canvas);

    lastPos.current = pos;

    setIsDrawing(true);

    drawDot(pos);
  };

  /* =====================================================
     MOUSE / TOUCH DRAW
  ===================================================== */

  const draw = (e) => {
    e.preventDefault();

    if (!isDrawing) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const pos = getPos(e, canvas);

    if (!lastPos.current) {
      lastPos.current = pos;
      return;
    }

    drawLine(lastPos.current, pos);

    lastPos.current = pos;
  };

  /* =====================================================
     STOP DRAWING
  ===================================================== */

  const stopDrawing = (e) => {
    e?.preventDefault();

    setIsDrawing(false);

    lastPos.current = null;
  };

  /* =====================================================
     KEYBOARD DRAWING
  ===================================================== */

  const handleCanvasKeyDown = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const isActivate = event.key === "Enter" || event.key === " ";

    /* START / STOP DRAWING */

    if (isActivate) {
      event.preventDefault();
      event.stopPropagation();

      const nextDrawing = !keyboardDrawing;

      setKeyboardDrawing(nextDrawing);

      if (nextDrawing) {
        drawDot(keyboardPosRef.current);
      }

      return;
    }

    /* ESCAPE */

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();

      setKeyboardDrawing(false);

      return;
    }

    /* ARROWS */

    const arrows = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (!arrows.includes(event.key)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const step = event.shiftKey ? 20 : 6;

    const oldPos = {
      ...keyboardPosRef.current,
    };

    let x = oldPos.x;
    let y = oldPos.y;

    if (event.key === "ArrowLeft") {
      x -= step;
    }

    if (event.key === "ArrowRight") {
      x += step;
    }

    if (event.key === "ArrowUp") {
      y -= step;
    }

    if (event.key === "ArrowDown") {
      y += step;
    }

    x = Math.max(0, Math.min(canvas.width, x));

    y = Math.max(0, Math.min(canvas.height, y));

    const newPos = {
      x,
      y,
    };

    if (keyboardDrawing) {
      drawLine(oldPos, newPos);
    }

    keyboardPosRef.current = newPos;

    setKeyboardCursor(newPos);
  };

  /* =====================================================
     CLEAR
  ===================================================== */

  const handleClear = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stopAudio();

    setIsDrawing(false);
    setKeyboardDrawing(false);

    lastPos.current = null;

    const center = {
      x: CANVAS_SIZE / 2,
      y: CANVAS_SIZE / 2,
    };

    keyboardPosRef.current = center;

    setKeyboardCursor(center);
  };

  /* =====================================================
     CHECK
  ===================================================== */

  const handleCheck = () => {
    ValidationAlert.success("Great drawing!");
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "15px",
        }}
      >
        <ExerciseHeader
          sectionLetter="F"
          title="Read and draw."
          subTitle="Read one instruction at a time and draw only the requested nest, box, and cat around the tree as instructed before moving to the next instruction."
        />

        {/* =================================================
            INSTRUCTIONS + AUDIO
        ================================================= */}

        <div className="flex flex-col gap-1 mb-2 ml-5 w-full">
          {INSTRUCTIONS.map((inst, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Play instruction ${i + 1}`}
              className="unit4-audio-control unit4-interactive text-gray-700 text-[18px]"
              onClick={() =>
                playAudio(`instruction-${i}`, INSTRUCTION_AUDIO[i])
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();

                  playAudio(`instruction-${i}`, INSTRUCTION_AUDIO[i]);
                }
              }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                minHeight: "30px",
                cursor: "pointer",
                paddingRight: "24px",
              }}
            >
              {/* AUDIO ICON ONLY WHILE PLAYING */}

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `instruction-${i}`}
                />
              </div>

              <p
                style={{
                  margin: 0,
                }}
              >
                • {inst}
              </p>
            </div>
          ))}
        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3 w-full">
          {/* TOOLS */}

          <div className="flex gap-2">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTool(t.id)}
                aria-pressed={tool === t.id}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all
                    ${
                      tool === t.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* COLORS */}

          <div className="flex gap-1.5 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Select color ${c}`}
                aria-pressed={color === c && tool === "pencil"}
                onClick={() => {
                  setColor(c);
                  setTool("pencil");
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  color === c && tool === "pencil"
                    ? "border-gray-700 scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{
                  backgroundColor: c,
                }}
              />
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* SIZES */}

          <div className="flex items-center gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-label={`Brush size ${s}`}
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={`flex items-center justify-center rounded-full border-2 transition-all bg-white
                    ${
                      size === s
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                style={{
                  width: 28,
                  height: 28,
                }}
              >
                <span
                  aria-hidden="true"
                  className="rounded-full bg-gray-700"
                  style={{
                    width: Math.min(s * 2, 20),

                    height: Math.min(s * 2, 20),
                  }}
                />
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* CLEAR */}

          <button
            type="button"
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl text-sm font-medium border-2 border-red-200 bg-red-50 text-red-500 hover:border-red-400 transition-all"
          >
            🗑️ Clear
          </button>
        </div>

        {/* =================================================
            CANVAS
        ================================================= */}

        <div className="flex justify-center w-full">
          <div
            className="relative w-[60%] rounded-2xl overflow-hidden border-2 border-gray-200 bg-white flex justify-center items-center"
            style={{
              cursor: tool === "eraser" ? "cell" : "crosshair",

              boxShadow: canvasFocused
                ? "0 0 0 4px rgba(37, 99, 235, 0.3)"
                : "none",

              borderColor: canvasFocused ? "#2563eb" : undefined,
            }}
          >
            {/* BACKGROUND */}

            <canvas
              ref={bgCanvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              aria-hidden="true"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />

            {/* DRAWING */}

            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              tabIndex={0}
              role="application"
              aria-label="Drawing area. Press Enter or Space to start or stop drawing. Use arrow keys to move the cursor. Hold Shift with an arrow key to move faster. Press Escape to stop drawing."
              className="relative w-full h-full touch-none outline-none"
              onFocus={() => {
                setCanvasFocused(true);
              }}
              onBlur={() => {
                setCanvasFocused(false);
                setKeyboardDrawing(false);
              }}
              onKeyDown={handleCanvasKeyDown}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />

            {/* KEYBOARD CURSOR */}

            {canvasFocused && (
              <>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",

                    left: `${(keyboardCursor.x / CANVAS_SIZE) * 100}%`,

                    top: `${(keyboardCursor.y / CANVAS_SIZE) * 100}%`,

                    transform: "translate(-50%, -50%)",

                    width: "14px",
                    height: "14px",

                    borderRadius: "50%",

                    border: keyboardDrawing
                      ? "3px solid #dc2626"
                      : "3px solid #2563eb",

                    background: "rgba(255,255,255,0.75)",

                    boxShadow: "0 0 0 2px rgba(255,255,255,0.85)",

                    pointerEvents: "none",

                    zIndex: 10,
                  }}
                />

                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",

                    top: "8px",
                    right: "8px",

                    padding: "4px 8px",

                    borderRadius: "999px",

                    background: keyboardDrawing ? "#dc2626" : "#2563eb",

                    color: "#fff",

                    fontSize: "12px",

                    fontWeight: "700",

                    pointerEvents: "none",

                    zIndex: 10,
                  }}
                >
                  {keyboardDrawing ? "Drawing" : "Move"}
                </div>
              </>
            )}
          </div>
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="mt-6 flex justify-center">
          <Button checkAnswers={handleCheck} handleStartAgain={handleClear} />
        </div>
      </div>
    </div>
  );
}
