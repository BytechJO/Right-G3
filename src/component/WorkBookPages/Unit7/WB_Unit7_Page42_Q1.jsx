import React, { useRef, useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import audio1 from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise G/Item_001_can_see_the_flowers_in_the_vase.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise G/Item_002_can_see_the_ball_near_the_table.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise G/Item_003_can_see_the_book_under_the_table.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise G/Item_004_can_see_the_cat_on_the_sofa.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit7/Page 42 - Exercise G/Item_005_can_see_the_picture_next_to_the_window.mp3";

import imgRoom from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 42/SVG/1.svg";

const INSTRUCTIONS = [
  {
    num: 1,
    text: "I can see the flowers in the vase.",
    audio: audio1,
  },
  {
    num: 2,
    text: "I can see the ball near the table.",
    audio: audio2,
  },
  {
    num: 3,
    text: "I can see the book under the table.",
    audio: audio3,
  },
  {
    num: 4,
    text: "I can see the cat on the sofa.",
    audio: audio4,
  },
  {
    num: 5,
    text: "I can see the picture next to the window.",
    audio: audio5,
  },
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
  "#ffffff",
  "#92400e",
];

const SIZES = [2, 4, 8, 14];

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 620;

export default function WB_Unit7_Page42_DrawColor() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const lastPos = useRef(null);

  const keyboardPosRef = useRef({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
  });

  const [isDrawing, setIsDrawing] = useState(false);

  const [tool, setTool] = useState("pencil");

  const [color, setColor] = useState("#ef4444");

  const [size, setSize] = useState(4);

  const [keyboardDrawing, setKeyboardDrawing] = useState(false);

  const [keyboardCursor, setKeyboardCursor] = useState({
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
  });

  const [canvasFocused, setCanvasFocused] = useState(false);

  /* =====================================================
     LOAD BACKGROUND
  ===================================================== */

  const loadImage = () => {
    const canvas = bgCanvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.src = imgRoom;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      imgRef.current = img;
    };
  };

  useEffect(() => {
    loadImage();
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

    ctx.beginPath();

    ctx.arc(
      pos.x,
      pos.y,
      (tool === "eraser" ? size * 3 : size) / 2,
      0,
      Math.PI * 2,
    );

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = color;
    }

    ctx.fill();

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

      ctx.lineWidth = size * 3;
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

    /* ===============================
       ENTER / SPACE
    =============================== */

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

    /* ===============================
       ESCAPE
    =============================== */

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();

      setKeyboardDrawing(false);

      return;
    }

    /* ===============================
       ARROWS
    =============================== */

    const arrows = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (!arrows.includes(event.key)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const step = event.shiftKey ? 25 : 8;

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
      x: CANVAS_WIDTH / 2,

      y: CANVAS_HEIGHT / 2,
    };

    keyboardPosRef.current = center;

    setKeyboardCursor(center);
  };

  /* =====================================================
     CHECK
  ===================================================== */

  const handleCheck = () => {
    ValidationAlert.success("Great drawing and coloring!");
  };

  /* =====================================================
     CURSOR
  ===================================================== */

  const getCursor = () => {
    if (tool === "eraser") {
      return "cell";
    }

    return "crosshair";
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "15px",
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <ExerciseHeader
          sectionLetter="G"
          title="Read, draw, and color."
          subTitle="Read each instruction first, then draw/place and color the living-room objects in the specified positions exactly where the sentence describes."
        />

        {/* =================================================
            INSTRUCTIONS + AUDIO
        ================================================= */}

        <div className="flex flex-col gap-1.5 mb-1 ml-5">
          {INSTRUCTIONS.map((inst) => (
            <div
              key={inst.num}
              role="button"
              tabIndex={0}
              aria-label={`Play instruction ${inst.num}`}
              className="unit4-audio-control unit4-interactive text-gray-800 text-[18px]"
              onClick={() => playAudio(`instruction-${inst.num}`, inst.audio)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  event.stopPropagation();

                  playAudio(`instruction-${inst.num}`, inst.audio);
                }
              }}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                minHeight: "30px",
                paddingRight: "26px",
                cursor: "pointer",
              }}
            >
              {/* AUDIO ICON */}

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "3px",
                  right: "2px",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `instruction-${inst.num}`}
                />
              </div>

              <span className="font-bold text-[20px] mr-2">{inst.num}</span>

              {inst.text}
            </div>
          ))}
        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
          {/* TOOLS */}

          <div className="flex gap-2">
            {[
              {
                id: "pencil",
                label: "✏️ Draw",
              },
              {
                id: "eraser",
                label: "🧹 Erase",
              },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={tool === t.id}
                onClick={() => setTool(t.id)}
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
                className={`w-7 h-7 rounded-full border-2 transition-all flex-shrink-0
                    ${
                      color === c && tool === "pencil"
                        ? "border-gray-700 scale-110 shadow"
                        : "border-gray-300 hover:scale-105"
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
                className={`flex items-center justify-center rounded-full border-2 bg-white transition-all
                    ${
                      size === s
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                style={{
                  width: 30,
                  height: 30,
                }}
              >
                <span
                  aria-hidden="true"
                  className="rounded-full bg-gray-700"
                  style={{
                    width: Math.min(s * 2.2, 22),

                    height: Math.min(s * 2.2, 22),
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
            🗑️ Clear all
          </button>
        </div>

        {/* =================================================
            CANVAS
        ================================================= */}

        <div className="flex justify-center">
          <div
            className="relative w-[60%] rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-sm"
            style={{
              cursor: getCursor(),

              borderColor: canvasFocused ? "#2563eb" : undefined,

              boxShadow: canvasFocused
                ? "0 0 0 4px rgba(37, 99, 235, 0.3)"
                : undefined,
            }}
          >
            {/* BACKGROUND */}

            <canvas
              ref={bgCanvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              aria-hidden="true"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />

            {/* DRAWING */}

            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              tabIndex={0}
              role="application"
              aria-label="Drawing area. Press Enter or Space to start or stop drawing. Use arrow keys to move the drawing cursor. Hold Shift with an arrow key to move faster. Press Escape to stop drawing."
              className="relative w-full h-auto touch-none block outline-none"
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

            {/* =================================================
                KEYBOARD CURSOR
            ================================================= */}

            {canvasFocused && (
              <>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",

                    left: `${(keyboardCursor.x / CANVAS_WIDTH) * 100}%`,

                    top: `${(keyboardCursor.y / CANVAS_HEIGHT) * 100}%`,

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
