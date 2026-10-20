import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import instruction1Audio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise G/Item_001_Draw_a_face_in_the_first_square_and_an_umbrella_in_the_fifth_square.mp3";
import instruction2Audio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise G/Item_002_Color_the_second_square_green_and_the_eighth_square_red.mp3";
import instruction3Audio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise G/Item_003_Write_your_name_in_the_third_square_and_your_friend's_name_in_the_tenth.mp3";
import instruction4Audio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise G/Item_004_Draw_the_sun_in_the_ninth_square_and_the_moon_in_the_fourth_square.mp3";

const INSTRUCTIONS = [
  "1. Draw a face in the first square and an umbrella in the fifth square.",
  "2. Color the second square green and the eighth square red.",
  "3. Write your name in the third square and your friend's name in the tenth square.",
  "4. Draw the sun in the ninth square and the moon in the fourth square.",
  "5. Draw a triangle in the seventh square and a star in the twelfth square.",
  "6. Write your birthday in the sixth square and your friend's birthday in the eleventh square.",
];

const INSTRUCTION_AUDIO = [
  instruction1Audio,
  instruction2Audio,
  instruction3Audio,
  instruction4Audio,
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

const BOX_SIZE = 110;

const BOX_LAYOUT = [
  { num: 4, row: 1, col: 1 },
  { num: 5, row: 1, col: 2 },
  { num: 6, row: 1, col: 3 },
  { num: 7, row: 1, col: 4 },
  { num: 8, row: 1, col: 5 },
  { num: 9, row: 1, col: 6 },

  { num: 3, row: 2, col: 1 },
  { num: 10, row: 2, col: 6 },

  { num: 2, row: 3, col: 1 },
  { num: 11, row: 3, col: 6 },

  { num: 1, row: 4, col: 1 },
  { num: 12, row: 4, col: 6 },
];

export default function WB_Unit6_Page36_QG() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#ef4444");
  const [size, setSize] = useState(4);

  const [selectedBox, setSelectedBox] = useState(1);

  const [isDrawing, setIsDrawing] = useState(false);

  const [keyboardDrawing, setKeyboardDrawing] = useState({});
  const [keyboardCursor, setKeyboardCursor] = useState({});

  const canvasRefs = useRef({});
  const ctxRefs = useRef({});
  const lastPos = useRef({});
  const keyboardPosRef = useRef({});

  /* =====================================================
     INITIALIZE CANVASES
  ===================================================== */

  useEffect(() => {
    BOX_LAYOUT.forEach(({ num }) => {
      const canvas = canvasRefs.current[num];

      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctxRefs.current[num] = ctx;

      clearCanvas(num);
    });
  }, []);

  /* =====================================================
     CLEAR ONE CANVAS
  ===================================================== */

  const clearCanvas = (num) => {
    const canvas = canvasRefs.current[num];
    const ctx = ctxRefs.current[num];

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  /* =====================================================
     CLEAR ALL
  ===================================================== */

  const clearAllCanvases = () => {
    stopAudio();

    BOX_LAYOUT.forEach(({ num }) => {
      clearCanvas(num);
    });

    setKeyboardDrawing({});
    setKeyboardCursor({});
    keyboardPosRef.current = {};
  };

  /* =====================================================
     GET POINTER POSITION
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
     START DRAWING WITH MOUSE / TOUCH
  ===================================================== */

  const startDrawing = (e, num) => {
    e.preventDefault();

    setSelectedBox(num);

    const canvas = canvasRefs.current[num];
    const ctx = ctxRefs.current[num];

    if (!canvas || !ctx) return;

    if (tool === "fill") {
      ctx.fillStyle = color;

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      return;
    }

    const pos = getPos(e, canvas);

    lastPos.current[num] = pos;

    setIsDrawing(true);

    ctx.beginPath();

    ctx.arc(
      pos.x,
      pos.y,
      (tool === "eraser" ? size * 2 : size) / 2,
      0,
      Math.PI * 2,
    );

    ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;

    ctx.fill();
  };

  /* =====================================================
     DRAW WITH MOUSE / TOUCH
  ===================================================== */

  const draw = (e, num) => {
    e.preventDefault();

    if (!isDrawing || selectedBox !== num) {
      return;
    }

    const canvas = canvasRefs.current[num];
    const ctx = ctxRefs.current[num];

    if (!canvas || !ctx) return;

    if (tool !== "pencil" && tool !== "eraser") {
      return;
    }

    const pos = getPos(e, canvas);
    const prev = lastPos.current[num];

    if (!prev) return;

    ctx.beginPath();

    ctx.moveTo(prev.x, prev.y);

    ctx.lineTo(pos.x, pos.y);

    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;

    ctx.lineWidth = tool === "eraser" ? size * 3 : size;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();

    lastPos.current[num] = pos;
  };

  /* =====================================================
     STOP DRAWING
  ===================================================== */

  const stopDrawing = (e, num) => {
    e?.preventDefault();

    setIsDrawing(false);

    lastPos.current[num] = null;
  };

  /* =====================================================
     CURSOR TYPE
  ===================================================== */

  const getCursor = () => {
    if (tool === "eraser") {
      return "cell";
    }

    return "crosshair";
  };

  /* =====================================================
     ENSURE KEYBOARD CURSOR
  ===================================================== */

  const ensureKeyboardPos = (num) => {
    if (!keyboardPosRef.current[num]) {
      const pos = {
        x: BOX_SIZE / 2,
        y: BOX_SIZE / 2,
      };

      keyboardPosRef.current[num] = pos;

      setKeyboardCursor((prev) => ({
        ...prev,
        [num]: pos,
      }));
    }

    return keyboardPosRef.current[num];
  };

  /* =====================================================
     KEYBOARD DOT
  ===================================================== */

  const drawKeyboardDot = (num, pos) => {
    const ctx = ctxRefs.current[num];

    if (!ctx) return;

    ctx.beginPath();

    ctx.arc(
      pos.x,
      pos.y,
      (tool === "eraser" ? size * 2 : size) / 2,
      0,
      Math.PI * 2,
    );

    ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;

    ctx.fill();
  };

  /* =====================================================
     KEYBOARD LINE
  ===================================================== */

  const drawKeyboardLine = (num, from, to) => {
    const ctx = ctxRefs.current[num];

    if (!ctx) return;

    ctx.beginPath();

    ctx.moveTo(from.x, from.y);

    ctx.lineTo(to.x, to.y);

    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;

    ctx.lineWidth = tool === "eraser" ? size * 3 : size;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.stroke();
  };

  /* =====================================================
     KEYBOARD DRAWING
  ===================================================== */

  const handleCanvasKeyDown = (event, num) => {
    const canvas = canvasRefs.current[num];

    const ctx = ctxRefs.current[num];

    if (!canvas || !ctx) return;

    const currentPos = ensureKeyboardPos(num);

    const isActivate = event.key === "Enter" || event.key === " ";

    /* ===============================
       ENTER / SPACE
    =============================== */

    if (isActivate) {
      event.preventDefault();
      event.stopPropagation();

      setSelectedBox(num);

      /* FILL */

      if (tool === "fill") {
        ctx.fillStyle = color;

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return;
      }

      /*
        Pencil / Eraser:
        toggle drawing mode
      */

      const nextDrawing = !keyboardDrawing[num];

      setKeyboardDrawing((prev) => ({
        ...prev,
        [num]: nextDrawing,
      }));

      if (nextDrawing) {
        drawKeyboardDot(num, currentPos);
      }

      return;
    }

    /* ===============================
       ESCAPE
    =============================== */

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();

      setKeyboardDrawing((prev) => ({
        ...prev,
        [num]: false,
      }));

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

    const step = event.shiftKey ? 15 : 5;

    const oldPos = {
      ...currentPos,
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

    /*
      DRAW ONLY IF KEYBOARD DRAWING MODE IS ACTIVE
    */

    if (keyboardDrawing[num] && (tool === "pencil" || tool === "eraser")) {
      drawKeyboardLine(num, oldPos, newPos);
    }

    keyboardPosRef.current[num] = newPos;

    setKeyboardCursor((prev) => ({
      ...prev,
      [num]: newPos,
    }));
  };

  /* =====================================================
     RENDER BOX
  ===================================================== */

  const renderBox = (num) => {
    const cursor = keyboardCursor[num];

    const drawingWithKeyboard = !!keyboardDrawing[num];

    return (
      <div
        key={num}
        onClick={() => setSelectedBox(num)}
        style={{
          position: "relative",
          width: `${BOX_SIZE}px`,
          height: `${BOX_SIZE}px`,

          border:
            selectedBox === num ? "3px solid #2563eb" : "2px solid #f59e0b",

          borderRadius: "10px",

          backgroundColor: "#fff",

          overflow: "hidden",

          boxSizing: "border-box",

          boxShadow:
            selectedBox === num ? "0 0 0 3px rgba(37, 99, 235, 0.15)" : "none",
        }}
      >
        {/* BOX NUMBER */}

        <div
          aria-hidden="true"
          style={{
            position: "absolute",

            top: "4px",
            left: "4px",

            width: "18px",
            height: "18px",

            borderRadius: "50%",

            border: "1px solid #111",

            backgroundColor: "#fff",

            fontSize: "11px",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            zIndex: 4,

            pointerEvents: "none",
          }}
        >
          {num}
        </div>

        {/* CANVAS */}

        <canvas
          ref={(el) => {
            if (el) {
              canvasRefs.current[num] = el;
            }
          }}
          width={BOX_SIZE}
          height={BOX_SIZE}
          tabIndex={0}
          role="application"
          aria-label={`Drawing square ${num}. Press Enter or Space to start drawing, use the arrow keys to move, and press Enter or Space again to stop drawing.`}
          onFocus={() => {
            setSelectedBox(num);

            ensureKeyboardPos(num);
          }}
          onBlur={() => {
            setKeyboardDrawing((prev) => ({
              ...prev,
              [num]: false,
            }));
          }}
          onKeyDown={(event) => handleCanvasKeyDown(event, num)}
          style={{
            width: "100%",
            height: "100%",

            display: "block",

            cursor: getCursor(),

            touchAction: "none",

            outline: "none",
          }}
          onMouseDown={(e) => startDrawing(e, num)}
          onMouseMove={(e) => draw(e, num)}
          onMouseUp={(e) => stopDrawing(e, num)}
          onMouseLeave={(e) => stopDrawing(e, num)}
          onTouchStart={(e) => startDrawing(e, num)}
          onTouchMove={(e) => draw(e, num)}
          onTouchEnd={(e) => stopDrawing(e, num)}
        />

        {/* KEYBOARD CURSOR */}

        {selectedBox === num && cursor && (
          <>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",

                left: `${(cursor.x / BOX_SIZE) * 100}%`,

                top: `${(cursor.y / BOX_SIZE) * 100}%`,

                transform: "translate(-50%, -50%)",

                width: "12px",

                height: "12px",

                borderRadius: "50%",

                border: drawingWithKeyboard
                  ? "3px solid #dc2626"
                  : "3px solid #2563eb",

                background: "rgba(255,255,255,0.7)",

                pointerEvents: "none",

                zIndex: 5,

                boxShadow: "0 0 0 2px rgba(255,255,255,0.8)",
              }}
            />

            <div
              aria-hidden="true"
              style={{
                position: "absolute",

                right: "5px",

                top: "5px",

                padding: "2px 6px",

                borderRadius: "999px",

                background: drawingWithKeyboard ? "#dc2626" : "#2563eb",

                color: "#fff",

                fontSize: "9px",

                fontWeight: 700,

                pointerEvents: "none",

                zIndex: 5,
              }}
            >
              {drawingWithKeyboard ? "Drawing" : "Move"}
            </div>
          </>
        )}
      </div>
    );
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "16px",
          marginBottom: "70px",
        }}
      >
        <ExerciseHeader
          sectionLetter="G"
          title="Read and complete."
          subTitle="Read one instruction at a time and draw only the requested shapes and objects in the numbered grid squares before moving to the next instruction."
        />

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",

            padding: "12px 16px",

            border: "1px solid #e5e7eb",

            borderRadius: "16px",

            background: "#f9fafb",
          }}
        >
          {/* TOOLS */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                id: "pencil",
                label: "✏️ Draw",
              },
              {
                id: "eraser",
                label: "🧽 Erase",
              },
              {
                id: "fill",
                label: "🪣 Fill",
              },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTool(item.id)}
                style={{
                  padding: "8px 12px",

                  borderRadius: "10px",

                  border:
                    tool === item.id
                      ? "2px solid #3b82f6"
                      : "2px solid #d1d5db",

                  background: tool === item.id ? "#eff6ff" : "#fff",

                  color: tool === item.id ? "#1d4ed8" : "#374151",

                  fontWeight: "600",

                  cursor: "pointer",
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
            }}
          />

          {/* COLORS */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Select color ${c}`}
                onClick={() => setColor(c)}
                style={{
                  width: "28px",
                  height: "28px",

                  borderRadius: "50%",

                  border:
                    color === c ? "3px solid #111827" : "2px solid #d1d5db",

                  background: c,

                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <div
            style={{
              width: "1px",
              height: "28px",
              background: "#d1d5db",
            }}
          />

          {/* SIZES */}

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-label={`Brush size ${s}`}
                onClick={() => setSize(s)}
                style={{
                  width: "32px",
                  height: "32px",

                  borderRadius: "50%",

                  border:
                    size === s ? "2px solid #3b82f6" : "2px solid #d1d5db",

                  background: "#fff",

                  cursor: "pointer",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: `${Math.min(s * 2, 16)}px`,

                    height: `${Math.min(s * 2, 16)}px`,

                    borderRadius: "50%",

                    background: "#111827",

                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>

          {/* CLEAR SELECTED */}

          <button
            type="button"
            onClick={() => clearCanvas(selectedBox)}
            style={{
              padding: "8px 12px",

              borderRadius: "10px",

              border: "2px solid #fca5a5",

              background: "#fef2f2",

              color: "#dc2626",

              fontWeight: "600",

              cursor: "pointer",
            }}
          >
            Clear Selected
          </button>

          {/* CLEAR ALL */}

          <button
            type="button"
            onClick={clearAllCanvases}
            style={{
              padding: "8px 12px",

              borderRadius: "10px",

              border: "2px solid #fecaca",

              background: "#fff",

              color: "#b91c1c",

              fontWeight: "600",

              cursor: "pointer",
            }}
          >
            Clear All
          </button>
        </div>

        {/* =================================================
            MAIN DRAWING GRID
        ================================================= */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns: `${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px`,

            gridTemplateRows: `${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px ${BOX_SIZE}px`,

            gap: "0",

            justifyContent: "center",

            alignItems: "center",

            maxWidth: "900px",

            margin: "0 auto",

            position: "relative",
          }}
        >
          {BOX_LAYOUT.map((box) => (
            <div
              key={box.num}
              style={{
                gridColumn: box.col,

                gridRow: box.row,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              {renderBox(box.num)}
            </div>
          ))}

          {/* =================================================
              INSTRUCTIONS IN CENTER
          ================================================= */}

          <div
            style={{
              gridColumn: "2 / 6",

              gridRow: "2 / 5",

              padding: "12px 20px",

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              gap: "10px",

              fontSize: "18px",

              lineHeight: "1.45",

              color: "#222",

              marginTop: "50px",
            }}
          >
            {INSTRUCTIONS.map((item, index) => (
              <div
                key={index}
                className={
                  INSTRUCTION_AUDIO[index]
                    ? "unit4-audio-control unit4-interactive"
                    : ""
                }
                role={INSTRUCTION_AUDIO[index] ? "button" : undefined}
                tabIndex={INSTRUCTION_AUDIO[index] ? 0 : undefined}
                aria-label={
                  INSTRUCTION_AUDIO[index]
                    ? `Play instruction ${index + 1}`
                    : undefined
                }
                onClick={() => {
                  if (INSTRUCTION_AUDIO[index]) {
                    playAudio(`instruction-${index}`, INSTRUCTION_AUDIO[index]);
                  }
                }}
                onKeyDown={(event) => {
                  if (
                    INSTRUCTION_AUDIO[index] &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();

                    playAudio(`instruction-${index}`, INSTRUCTION_AUDIO[index]);
                  }
                }}
                style={{
                  display: "flex",

                  gap: "10px",

                  alignItems: "flex-start",

                  position: "relative",

                  cursor: INSTRUCTION_AUDIO[index] ? "pointer" : "default",
                }}
              >
                {INSTRUCTION_AUDIO[index] && (
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `instruction-${index}`}
                  />
                )}

                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================
            START AGAIN
        ================================================= */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            marginTop: "12px",
          }}
        >
          <Button handleStartAgain={clearAllCanvases} />
        </div>
      </div>
    </div>
  );
}
