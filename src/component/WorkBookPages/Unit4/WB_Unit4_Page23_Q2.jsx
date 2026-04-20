import React, { useEffect, useRef, useState, useMemo } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 68.svg"
import img2  from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 69.svg"
import img3  from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 70.svg"
import img4  from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 71.svg"
import img5  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 72.svg"
import img6  from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 73.svg"
import img7  from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 74.svg"
import img8  from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 75.svg"
import img9  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 76.svg"
import img10 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 77.svg"
import img11 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 78.svg"
import img12 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 23/SVG/SVG/Asset 79.svg"

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR  = "#ef4444";
const DRAG_BG      = "#f29a1f";

const MONTHS = [
  { id: 1,  name: "March",     img: img3,  correctNumber: 3  },
  { id: 2,  name: "July",      img: img7,  correctNumber: 7  },
  { id: 3,  name: "September", img: img9,  correctNumber: 9  },
  { id: 4,  name: "November",  img: img11, correctNumber: 11 },
  { id: 5,  name: "June",      img: img6,  correctNumber: 6  },
  { id: 6,  name: "February",  img: img2,  correctNumber: 2  },
  { id: 7,  name: "December",  img: img12, correctNumber: 12 },
  { id: 8,  name: "May",       img: img5,  correctNumber: 5  },
  { id: 9,  name: "August",    img: img8,  correctNumber: 8  },
  { id: 10, name: "October",   img: img10, correctNumber: 10 },
  { id: 11, name: "January",   img: img1,  correctNumber: 1  },
  { id: 12, name: "April",     img: img4,  correctNumber: 4  },
];

const DRAG_NUMBERS = [1,2,3,4,5,6,7,8,9,10,11,12];

// ── Canvas tracing per month ──
function TraceCanvas({ img, isWrong }) {
  const canvasRef    = useRef(null);
  const imgRef       = useRef(null);
  const drawing      = useRef(false);
  const lastPos      = useRef(null);
  const containerRef = useRef(null);

  // load SVG image onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      imgRef.current = image;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.35;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    };
    image.src = img;
  }, [img]);

  const resize = () => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const w = container.clientWidth;
    const h = Math.round(w * 0.38);
    canvas.width  = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (imgRef.current) {
      ctx.globalAlpha = 0.35;
      ctx.drawImage(imgRef.current, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width  / rect.width),
      y: (src.clientY - rect.top)  * (canvas.height / rect.height),
    };
  };

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    drawing.current = true;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isWrong ? WRONG_COLOR : "#000000ff";
    ctx.lineWidth   = Math.max(2, canvas.width * 0.022);
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
    lastPos.current = pos;
  };

  const endDraw = () => { drawing.current = false; };

  return (
    <div ref={containerRef} style={{ width: "100%", lineHeight: 0 }}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={(e) => { e.preventDefault(); startDraw(e); }}
        onTouchMove={(e)  => { e.preventDefault(); draw(e);      }}
        onTouchEnd={endDraw}
        style={{
          display:      "block",
          width:        "80%",
          cursor:       "crosshair",
          touchAction:  "none",
          borderRadius: "clamp(6px,0.8vw,10px)",
          background:   "#fff",
          boxSizing:    "border-box",
        }}
      />
    </div>
  );
}

export default function WB_TraceAndNumber_PageF() {
  const [answers,      setAnswers]      = useState({});
  const [draggedNumber,setDraggedNumber]= useState(null);
  const [touchItem,    setTouchItem]    = useState(null);
  const [touchPos,     setTouchPos]     = useState({ x: 0, y: 0 });
  const [checked,      setChecked]      = useState(false);
  const [showAns,      setShowAns]      = useState(false);

  const dropRefs    = useRef({});
  const usedNumbers = useMemo(() => Object.values(answers), [answers]);

  const applyDrop = (monthId, num) => {
    const updated = { ...answers };
    Object.keys(updated).forEach((k) => { if (updated[k] === num) delete updated[k]; });
    updated[monthId] = num;
    setAnswers(updated);
    setDraggedNumber(null);
    setChecked(false);
  };

  const handleDragStart = (num) => {
    if (showAns || usedNumbers.includes(num)) return;
    setDraggedNumber(num);
  };

  const handleDrop = (monthId) => {
    if (showAns || draggedNumber === null) return;
    applyDrop(monthId, draggedNumber);
  };

  const handleTouchStart = (e, num) => {
    if (showAns || usedNumbers.includes(num)) return;
    const t = e.touches[0];
    setTouchItem(num);
    setDraggedNumber(num);
    setTouchPos({ x: t.clientX, y: t.clientY });
  };

  const handleTouchMove = (e) => {
    if (touchItem === null) return;
    const t = e.touches[0];
    setTouchPos({ x: t.clientX, y: t.clientY });
  };

  const handleTouchEnd = () => {
    if (touchItem === null) return;
    Object.entries(dropRefs.current).forEach(([key, ref]) => {
      if (!ref) return;
      const r = ref.getBoundingClientRect();
      if (
        touchPos.x >= r.left && touchPos.x <= r.right &&
        touchPos.y >= r.top  && touchPos.y <= r.bottom
      ) applyDrop(Number(key), touchItem);
    });
    setTouchItem(null);
    setDraggedNumber(null);
  };

  const handleRemoveNumber = (monthId) => {
    if (showAns) return;
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[monthId];
      return u;
    });
    setChecked(false);
  };

  const handleCheck = () => {
    if (showAns) return;
    const allAnswered = MONTHS.every((m) => answers[m.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    MONTHS.forEach((m) => { if (answers[m.id] === m.correctNumber) score++; });
    setChecked(true);
    const total = MONTHS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    MONTHS.forEach((m) => { correct[m.id] = m.correctNumber; });
    setAnswers(correct);
    setChecked(true);
    setShowAns(true);
    setDraggedNumber(null);
    setTouchItem(null);
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedNumber(null);
    setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  const isWrong = (monthId) => {
    if (!checked || showAns) return false;
    const m = MONTHS.find((m) => m.id === monthId);
    return answers[monthId] !== m.correctNumber;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "18px",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin:     0,
            display:    "flex",
            alignItems: "center",
            gap:        "12px",
            flexWrap:   "wrap",
          }}
        >
          <span className="WB-ex-A">F</span> Trace and number.
        </h1>

        {/* Drag numbers bank */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            flexWrap:       "wrap",
            gap:            "clamp(8px,1.2vw,14px)",
          }}
        >
          {DRAG_NUMBERS.map((num) => {
            const disabled = usedNumbers.includes(num);
            const selected = draggedNumber === num || touchItem === num;
            return (
              <div
                key={num}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(num)}
                onTouchStart={(e) => handleTouchStart(e, num)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                  width:          "clamp(36px,4.5vw,52px)",
                  height:         "clamp(36px,4.5vw,52px)",
                  borderRadius:   "50%",
                  background:     disabled || showAns ? "#cfcfd4" : DRAG_BG,
                  color:          "#fff",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  fontSize:       "clamp(15px,2vw,26px)",
                  fontWeight:     700,
                  cursor:         disabled || showAns ? "not-allowed" : "grab",
                  userSelect:     "none",
                  opacity:        disabled ? 0.5 : 1,
                  touchAction:    "none",
                  transition:     "0.2s ease",
                  transform:      selected ? "scale(1.1)" : "scale(1)",
                  boxShadow:      selected
                    ? "0 0 0 3px rgba(242,154,31,0.35)"
                    : "0 3px 8px rgba(0,0,0,0.12)",
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Months grid 2×6 */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap:                 "clamp(14px,2vw,24px)",
            width:               "100%",
          }}
        >
          {MONTHS.map((month) => {
            const wrong = isWrong(month.id);
            const num   = answers[month.id];

            return (
              <div
                key={month.id}
                ref={(el) => (dropRefs.current[month.id] = el)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(month.id)}
                style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           "clamp(8px,1.2vw,16px)",
                  minWidth:      0,
                  position:      "relative",
                }}
              >
                {/* number box — دايماً موجود */}
                <div
                  onClick={() => handleRemoveNumber(month.id)}
                  style={{
                    width:           "clamp(32px,4.5vw,54px)",
                    height:          "clamp(32px,4.5vw,54px)",
                    borderRadius:    "clamp(6px,0.8vw,10px)",
                    border:          `2.5px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                    backgroundColor: "#fff",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    fontSize:        "clamp(14px,2vw,26px)",
                    fontWeight:      700,
                    color:           wrong ? WRONG_COLOR : DRAG_BG,
                    flexShrink:      0,
                    cursor:          num && !showAns ? "pointer" : "default",
                    boxShadow:       "0 2px 6px rgba(0,0,0,0.1)",
                    transition:      "border-color 0.2s, color 0.2s",
                    boxSizing:       "border-box",
                    position:        "relative",
                  }}
                >
                  {num || ""}

                  {/* wrong badge */}
                  {wrong && (
                    <div
                      style={{
                        position:        "absolute",
                        top:             "-7px",
                        right:           "-7px",
                        width:           "clamp(14px,1.6vw,20px)",
                        height:          "clamp(14px,1.6vw,20px)",
                        borderRadius:    "50%",
                        backgroundColor: WRONG_COLOR,
                        color:           "#fff",
                        display:         "flex",
                        alignItems:      "center",
                        justifyContent:  "center",
                        fontSize:        "clamp(8px,0.8vw,11px)",
                        fontWeight:      700,
                        boxShadow:       "0 1px 4px rgba(0,0,0,0.25)",
                        zIndex:          5,
                        pointerEvents:   "none",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>

                {/* canvas tracing */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <TraceCanvas img={month.img} isWrong={wrong} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>

      {/* Touch ghost */}
      {touchItem !== null && (
        <div
          style={{
            position:       "fixed",
            left:           touchPos.x - 26,
            top:            touchPos.y - 26,
            width:          "clamp(36px,4.5vw,52px)",
            height:         "clamp(36px,4.5vw,52px)",
            borderRadius:   "50%",
            background:     DRAG_BG,
            color:          "#fff",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       "clamp(15px,2vw,26px)",
            fontWeight:     700,
            pointerEvents:  "none",
            zIndex:         9999,
            boxShadow:      "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          {touchItem}
        </div>
      )}
    </div>
  );
}