import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import audio1 from "../../../assets/audio/WorkBook/unit8/Page 48 - Exercise H/Item_001_My_grandfather_had_a_small,_old_house.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit8/Page 48 - Exercise H/Item_002_It_had_a_red_roof_and_two_tall_chimneys.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit8/Page 48 - Exercise H/Item_003_It_had_little_windows_and_a_big_green_door.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/8.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/9.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 48/SVG/10.svg";

const COLORS = [
  "#111827",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#ffffff",
];

const SIZES = [2, 4, 8, 12];

const ITEMS = [
  {
    id: 1,
    img: img1,
    width: 320,
    height: 250,
    text: [
      "My grandfather had a small, old house.",
      "It had a red roof and two tall chimneys.",
      "It had little windows and a big green door.",
    ],
    alt: "Outline of Grandpa’s old house for coloring",
    audios: [audio1, audio2, audio3],
  },
  {
    id: 2,
    img: img2,
    width: 320,
    height: 250,
    text: [
      "Grandpa had a pretty garden, too.",
      "There was a swing in the tree.",
      "There were lots of pink and yellow flowers.",
    ],
    alt: "Garden scene for drawing and coloring",
  },
  {
    id: 3,
    img: img3,
    width: 320,
    height: 220,
    text: [
      "Grandpa had a car. It was very old, slow, and noisy,",
      "but it was beautiful. It was red and black.",
    ],
    alt: "Grandpa’s old car for coloring",
  },
];

export default function WB_Unit8_Page48_QH() {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#ef4444");
  const [size, setSize] = useState(4);
  const [selectedCanvas, setSelectedCanvas] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);

  const [keyboardDrawing, setKeyboardDrawing] = useState({});
  const [keyboardCursor, setKeyboardCursor] = useState({});
  const [focusedCanvas, setFocusedCanvas] = useState(null);

  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const canvasRefs = useRef({});
  const ctxRefs = useRef({});
  const lastPos = useRef({});
  const keyboardPosRef = useRef({});

  /* =====================================================
     INITIALIZE
  ===================================================== */

  useEffect(() => {
    ITEMS.forEach((item) => {
      const canvas = canvasRefs.current[item.id];

      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctxRefs.current[item.id] = ctx;
    });
  }, []);

  /* =====================================================
     CLEAR
  ===================================================== */

  const clearCanvas = (id) => {
    const canvas = canvasRefs.current[id];
    const ctx = ctxRefs.current[id];

    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setKeyboardDrawing((prev) => ({
      ...prev,
      [id]: false,
    }));

    keyboardPosRef.current[id] = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    setKeyboardCursor((prev) => ({
      ...prev,
      [id]: {
        x: canvas.width / 2,
        y: canvas.height / 2,
      },
    }));
  };

  const clearAllCanvases = () => {
    ITEMS.forEach((item) => {
      clearCanvas(item.id);
    });

    setIsDrawing(false);
    stopAudio();
  };

  /* =====================================================
     POINTER POSITION
  ===================================================== */

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;

    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
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

  const drawDot = (id, pos) => {
    const ctx = ctxRefs.current[id];

    if (!ctx) return;

    ctx.save();

    ctx.beginPath();

    ctx.arc(
      pos.x,
      pos.y,
      (tool === "eraser" ? size * 2.5 : size) / 2,
      0,
      Math.PI * 2,
    );

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";

      ctx.fillStyle = "rgba(0,0,0,1)";
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

  const drawLine = (id, from, to) => {
    const ctx = ctxRefs.current[id];

    if (!ctx) return;

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
     MOUSE / TOUCH
  ===================================================== */

  const startDrawing = (e, id) => {
    e.preventDefault();

    setSelectedCanvas(id);

    const canvas = canvasRefs.current[id];

    const ctx = ctxRefs.current[id];

    if (!canvas || !ctx) return;

    if (tool === "fill") {
      ctx.save();

      ctx.globalCompositeOperation = "source-over";

      ctx.fillStyle = color;

      ctx.globalAlpha = 0.35;

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.restore();

      return;
    }

    const pos = getPos(e, canvas);

    lastPos.current[id] = pos;

    setIsDrawing(true);

    drawDot(id, pos);
  };

  const draw = (e, id) => {
    e.preventDefault();

    if (!isDrawing || selectedCanvas !== id) {
      return;
    }

    if (tool !== "pencil" && tool !== "eraser") {
      return;
    }

    const canvas = canvasRefs.current[id];

    if (!canvas) return;

    const pos = getPos(e, canvas);

    const previous = lastPos.current[id];

    if (!previous) return;

    drawLine(id, previous, pos);

    lastPos.current[id] = pos;
  };

  const stopDrawing = (e, id) => {
    e?.preventDefault?.();

    setIsDrawing(false);

    lastPos.current[id] = null;
  };

  /* =====================================================
     KEYBOARD POSITION
  ===================================================== */

  const ensureKeyboardPos = (id) => {
    const canvas = canvasRefs.current[id];

    if (!canvas) return null;

    if (!keyboardPosRef.current[id]) {
      const center = {
        x: canvas.width / 2,

        y: canvas.height / 2,
      };

      keyboardPosRef.current[id] = center;

      setKeyboardCursor((prev) => ({
        ...prev,
        [id]: center,
      }));
    }

    return keyboardPosRef.current[id];
  };

  /* =====================================================
     KEYBOARD DRAWING
  ===================================================== */

  const handleCanvasKeyDown = (event, id) => {
    const canvas = canvasRefs.current[id];

    const ctx = ctxRefs.current[id];

    if (!canvas || !ctx) return;

    const currentPos = ensureKeyboardPos(id);

    if (!currentPos) return;

    const isActivate = event.key === "Enter" || event.key === " ";

    /* ===============================
       ENTER / SPACE
    =============================== */

    if (isActivate) {
      event.preventDefault();
      event.stopPropagation();

      setSelectedCanvas(id);

      /* FILL */

      if (tool === "fill") {
        ctx.save();

        ctx.globalCompositeOperation = "source-over";

        ctx.fillStyle = color;

        ctx.globalAlpha = 0.35;

        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.restore();

        return;
      }

      /*
        Pencil / Eraser
        toggle keyboard drawing
      */

      const nextDrawing = !keyboardDrawing[id];

      setKeyboardDrawing((prev) => ({
        ...prev,
        [id]: nextDrawing,
      }));

      if (nextDrawing) {
        drawDot(id, currentPos);
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
        [id]: false,
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

    const step = event.shiftKey ? 18 : 6;

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

    if (keyboardDrawing[id] && (tool === "pencil" || tool === "eraser")) {
      drawLine(id, oldPos, newPos);
    }

    keyboardPosRef.current[id] = newPos;

    setKeyboardCursor((prev) => ({
      ...prev,
      [id]: newPos,
    }));
  };

  /* =====================================================
     CHECK
  ===================================================== */

  const handleCheck = () => {
    ValidationAlert.success("Great! Check your drawing and coloring.");
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
      <style>{`
        .wb-unit8-drawing-canvas {
          outline: none;
        }

        .wb-unit8-drawing-wrapper:has(
          .wb-unit8-drawing-canvas:focus-visible
        ) {
          border: 3px solid #2563eb !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <ExerciseHeader
          sectionLetter="H"
          title="Read, draw, and color."
          subTitle="Read each instruction first, then draw/place and color the old house and car from the written description exactly where the sentence describes."
        />

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",

            gap: "10px",

            padding: "12px 14px",

            border: "1px solid #e5e7eb",

            borderRadius: "16px",

            backgroundColor: "#f9fafb",

            width: "100%",

            boxSizing: "border-box",
          }}
        >
          {/* TOOLS */}

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
              aria-pressed={tool === item.id}
              onClick={() => setTool(item.id)}
              style={{
                padding: "8px 12px",

                borderRadius: "10px",

                border:
                  tool === item.id ? "2px solid #3b82f6" : "2px solid #d1d5db",

                backgroundColor: tool === item.id ? "#eff6ff" : "#fff",

                color: tool === item.id ? "#1d4ed8" : "#374151",

                fontWeight: "600",

                cursor: "pointer",
              }}
            >
              {item.label}
            </button>
          ))}

          <div
            style={{
              width: "1px",
              height: "28px",
              backgroundColor: "#d1d5db",
            }}
          />

          {/* COLORS */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Select color ${c}`}
                aria-pressed={color === c}
                onClick={() => {
                  setColor(c);

                  /*
                    Keep original behavior:
                    color does not force tool change.
                  */
                }}
                style={{
                  width: "28px",

                  height: "28px",

                  borderRadius: "50%",

                  border:
                    color === c ? "3px solid #111827" : "2px solid #d1d5db",

                  backgroundColor: c,

                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <div
            style={{
              width: "1px",
              height: "28px",
              backgroundColor: "#d1d5db",
            }}
          />

          {/* SIZES */}

          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-label={`Brush size ${s}`}
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                style={{
                  width: "32px",

                  height: "32px",

                  borderRadius: "50%",

                  border:
                    size === s ? "2px solid #3b82f6" : "2px solid #d1d5db",

                  backgroundColor: "#fff",

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

                    backgroundColor: "#111827",

                    display: "block",
                  }}
                />
              </button>
            ))}
          </div>

          {/* CLEAR SELECTED */}

          <button
            type="button"
            onClick={() => clearCanvas(selectedCanvas)}
            style={{
              padding: "8px 12px",

              borderRadius: "10px",

              border: "2px solid #fca5a5",

              backgroundColor: "#fef2f2",

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

              backgroundColor: "#fff",

              color: "#b91c1c",

              fontWeight: "600",

              cursor: "pointer",
            }}
          >
            Clear All
          </button>
        </div>

        {/* =================================================
            SECTIONS
        ================================================= */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const cursor = keyboardCursor[item.id];

            const isKeyboardDrawing = !!keyboardDrawing[item.id];

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",

                  gap: "22px",

                  width: "100%",

                  flexWrap: "wrap",
                }}
              >
                {/* =========================================
                    IMAGE + CANVAS
                ========================================= */}

                <div
                  className="wb-unit8-drawing-wrapper"
                  style={{
                    position: "relative",

                    width: `${item.width}px`,

                    height: `${item.height}px`,

                    flexShrink: 0,

                    border:
                      selectedCanvas === item.id
                        ? "1px solid #f59e0b"
                        : "1px solid #e5e7eb",

                    borderRadius: "14px",

                    overflow: "hidden",

                    backgroundColor: "#fff",

                    boxSizing: "border-box",

                    cursor: getCursor(),
                  }}
                  onClick={() => setSelectedCanvas(item.id)}
                >
                  {/* IMAGE */}

                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{
                      position: "absolute",

                      inset: 0,

                      width: "100%",

                      height: "100%",

                      objectFit: "contain",

                      pointerEvents: "none",

                      userSelect: "none",
                    }}
                  />

                  {/* DRAWING CANVAS */}

                  <canvas
                    ref={(el) => {
                      if (el) {
                        canvasRefs.current[item.id] = el;
                      }
                    }}
                    width={item.width}
                    height={item.height}
                    tabIndex={0}
                    role="application"
                    aria-label={`Drawing area ${item.id}. Press Enter or Space to start or stop drawing. Use the arrow keys to move. Hold Shift with an arrow key to move faster. Press Escape to stop drawing.`}
                    className="wb-unit8-drawing-canvas"
                    onFocus={() => {
                      setSelectedCanvas(item.id);

                      setFocusedCanvas(item.id);

                      ensureKeyboardPos(item.id);
                    }}
                    onBlur={() => {
                      setFocusedCanvas(null);

                      setKeyboardDrawing((previous) => ({
                        ...previous,

                        [item.id]: false,
                      }));
                    }}
                    onKeyDown={(event) => handleCanvasKeyDown(event, item.id)}
                    style={{
                      position: "absolute",

                      inset: 0,

                      width: "100%",

                      height: "100%",

                      display: "block",

                      cursor: getCursor(),

                      touchAction: "none",

                      outline: "none",
                    }}
                    onMouseDown={(e) => startDrawing(e, item.id)}
                    onMouseMove={(e) => draw(e, item.id)}
                    onMouseUp={(e) => stopDrawing(e, item.id)}
                    onMouseLeave={(e) => stopDrawing(e, item.id)}
                    onTouchStart={(e) => startDrawing(e, item.id)}
                    onTouchMove={(e) => draw(e, item.id)}
                    onTouchEnd={(e) => stopDrawing(e, item.id)}
                  />

                  {/* NUMBER */}

                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",

                      top: "6px",

                      left: "6px",

                      width: "24px",

                      height: "24px",

                      borderRadius: "50%",

                      backgroundColor: "#fff",

                      border: "1px solid #111",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      fontSize: "13px",

                      fontWeight: "700",

                      zIndex: 5,

                      pointerEvents: "none",
                    }}
                  >
                    {item.id}
                  </div>

                  {/* =========================================
                      KEYBOARD CURSOR
                  ========================================= */}

                  {focusedCanvas === item.id && cursor && (
                    <>
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",

                          left: `${(cursor.x / item.width) * 100}%`,

                          top: `${(cursor.y / item.height) * 100}%`,

                          transform: "translate(-50%, -50%)",

                          width: "13px",

                          height: "13px",

                          borderRadius: "50%",

                          border: isKeyboardDrawing
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

                          top: "6px",

                          right: "6px",

                          padding: "3px 7px",

                          borderRadius: "999px",

                          background: isKeyboardDrawing ? "#dc2626" : "#2563eb",

                          color: "#fff",

                          fontSize: "10px",

                          fontWeight: "700",

                          pointerEvents: "none",

                          zIndex: 10,
                        }}
                      >
                        {isKeyboardDrawing ? "Drawing" : "Move"}
                      </div>
                    </>
                  )}
                </div>

                {/* =========================================
                    TEXT / AUDIO
                ========================================= */}

                <div
                  style={{
                    flex: "1 1 420px",

                    minWidth: "280px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "6px",

                    justifyContent: "center",
                  }}
                >
                  {item.text.map((line, index) => {
                    const audio = item.audios?.[index];

                    return (
                      <div
                        key={index}
                        role={audio ? "button" : undefined}
                        tabIndex={audio ? 0 : undefined}
                        aria-label={audio ? `Play: ${line}` : undefined}
                        className={
                          audio
                            ? "unit4-audio-control unit4-interactive"
                            : undefined
                        }
                        onClick={() => {
                          if (audio) {
                            playAudio(`instruction-${item.id}-${index}`, audio);
                          }
                        }}
                        onKeyDown={(event) => {
                          if (
                            audio &&
                            (event.key === "Enter" || event.key === " ")
                          ) {
                            event.preventDefault();
                            event.stopPropagation();

                            playAudio(`instruction-${item.id}-${index}`, audio);
                          }
                        }}
                        style={{
                          margin: 0,

                          fontSize: "18px",

                          lineHeight: "1.45",

                          color: "#222",

                          position: "relative",

                          width: "fit-content",

                          paddingRight: audio ? "24px" : 0,

                          cursor: audio ? "pointer" : "default",
                        }}
                      >
                        {/* AUDIO ICON ONLY FOR LINES WITH AUDIO */}

                        {audio && (
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
                              active={
                                activeAudioKey ===
                                `instruction-${item.id}-${index}`
                              }
                            />
                          </div>
                        )}

                        {index === 0 ? (
                          <>
                            <span
                              style={{
                                fontWeight: "700",

                                marginRight: "8px",
                              }}
                            >
                              {item.id}
                            </span>

                            {line}
                          </>
                        ) : (
                          line
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={clearAllCanvases}
          />
        </div>
      </div>
    </div>
  );
}
