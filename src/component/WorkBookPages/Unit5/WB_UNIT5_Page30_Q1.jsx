import React, { useRef, useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgHat   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G1.svg";
import imgCat   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G2.svg";
import imgBall  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G3.svg";
import imgApple from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G4.svg";

import imgFridge from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G5.svg";
import imgBed    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G6.svg";
import imgTable  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G7.svg";
import imgChair  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G8.svg";

const SENTENCES = [
  { id: 1, itemImg: imgHat,   text: "The", itemName: "hat",   rest: "is under the table."   },
  { id: 2, itemImg: imgCat,   text: "The", itemName: "cat",   rest: "is next to the chair." },
  { id: 3, itemImg: imgBall,  text: "The", itemName: "ball",  rest: "is on the bed."        },
  { id: 4, itemImg: imgApple, text: "The", itemName: "apple", rest: "is in the fridge."     },
];

const FURNITURE_IMAGES = [
  { id: "fridge", img: imgFridge },
  { id: "bed",    img: imgBed    },
  { id: "table",  img: imgTable  },
  { id: "chair",  img: imgChair  },
];

const TOOLS  = [
  { id: "pencil", label: "✏️ Pencil" },
  { id: "eraser", label: "🧹 Eraser" },
];
const COLORS = ["#1e293b","#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#a855f7","#ec4899"];
const SIZES  = [2, 4, 7, 12];

// ─────────────────────────────────────────────
// Canvas منفرد مع ref للمسح
// ─────────────────────────────────────────────
function SingleCanvas({ furniture, tool, color, size, registerRef }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos   = useRef(null);

  useEffect(() => {
    loadImage();
    registerRef({
      clear: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        loadImage();
      },
    });
  }, []);

  const loadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src   = furniture.img;
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  };

  const onStart = (e) => {
    e.preventDefault();
    lastPos.current   = getPos(e);
    isDrawing.current = true;
  };

  const onMove = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth   = tool === "eraser" ? size * 4  : size;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
    lastPos.current = pos;
  };

  const onStop = (e) => {
    e?.preventDefault();
    isDrawing.current = false;
    lastPos.current   = null;
  };

  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: tool === "eraser" ? "cell" : "crosshair",
      }}
    >
      <canvas
        ref={canvasRef}
        width={200}
        height={160}
        style={{
          width: "100%",
          height: "auto",
          touchAction: "none",
          display: "block",
        }}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onStop}
        onMouseLeave={onStop}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onStop}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// المكوّن الرئيسي
// ─────────────────────────────────────────────
export default function WB_UNIT5_Page30_Q1() {
  const [tool,  setTool]  = useState("pencil");
  const [color, setColor] = useState("#1e293b");
  const [size,  setSize]  = useState(4);
  const [hoveredTool,  setHoveredTool]  = useState(null);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [hoveredSize,  setHoveredSize]  = useState(null);
  const [hoveredClear, setHoveredClear] = useState(false);

  const canvasRefs = useRef({});

  const handleClear = () => {
    Object.values(canvasRefs.current).forEach(ref => {
      if (ref?.clear) ref.clear();
    });
  };

  const handleCheck = () => {
    ValidationAlert.success("Great drawing! 🎨");
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "15px" }}>

        {/* العنوان */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">G</span> Read and draw.
        </h1>

        {/* المحتوى الرئيسي: جمل + صور */}
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>

          {/* الجمل على اليسار */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
            {SENTENCES.map((s) => (
              <p
                key={s.id}
                style={{
                  color: "#374151",
                  fontSize: "18px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  margin: 0,
                }}
              >
                <span style={{ color: "#f97316", fontWeight: 700, minWidth: "16px" }}>
                  {s.id}
                </span>
                <span>{s.text}</span>
                <img
                  src={s.itemImg}
                  alt={s.itemName}
                  style={{ width: 50, height: 50, objectFit: "contain", verticalAlign: "middle" }}
                />
                <span>{s.rest}</span>
              </p>
            ))}
          </div>

          {/* صور الأثاث 2x2 على اليمين */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              width: "400px",
            }}
          >
            {FURNITURE_IMAGES.map((f) => (
              <SingleCanvas
                key={f.id}
                furniture={f}
                tool={tool}
                color={color}
                size={size}
                registerRef={(ref) => { canvasRefs.current[f.id] = ref; }}
              />
            ))}
          </div>

        </div>

        {/* شريط الأدوات */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "12px",
          }}
        >

          {/* أدوات */}
          <div style={{ display: "flex", gap: "8px" }}>
            {TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                onMouseEnter={() => setHoveredTool(t.id)}
                onMouseLeave={() => setHoveredTool(null)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "2px solid",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  borderColor: tool === t.id ? "#3b82f6" : hoveredTool === t.id ? "#d1d5db" : "#e5e7eb",
                  backgroundColor: tool === t.id ? "#eff6ff" : "#ffffff",
                  color: tool === t.id ? "#1d4ed8" : "#4b5563",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* فاصل */}
          <div style={{ width: "1px", height: "24px", backgroundColor: "#e5e7eb" }} />

          {/* الألوان */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setTool("pencil"); }}
                onMouseEnter={() => setHoveredColor(c)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "2px solid",
                  cursor: "pointer",
                  backgroundColor: c,
                  transition: "all 0.15s",
                  borderColor: color === c && tool === "pencil" ? "#374151" : "transparent",
                  transform: (color === c && tool === "pencil") || hoveredColor === c
                    ? "scale(1.1)"
                    : "scale(1)",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* فاصل */}
          <div style={{ width: "1px", height: "24px", backgroundColor: "#e5e7eb" }} />

          {/* حجم الفرشاة */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                onMouseEnter={() => setHoveredSize(s)}
                onMouseLeave={() => setHoveredSize(null)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "2px solid",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff",
                  transition: "all 0.15s",
                  borderColor: size === s ? "#3b82f6" : hoveredSize === s ? "#d1d5db" : "#e5e7eb",
                  padding: 0,
                }}
              >
                <span
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#374151",
                    display: "block",
                    width: Math.min(s * 2, 20),
                    height: Math.min(s * 2, 20),
                  }}
                />
              </button>
            ))}
          </div>

          {/* فاصل */}
          <div style={{ width: "1px", height: "24px", backgroundColor: "#e5e7eb" }} />

          {/* مسح الكل */}
          <button
            onClick={handleClear}
            onMouseEnter={() => setHoveredClear(true)}
            onMouseLeave={() => setHoveredClear(false)}
            style={{
              padding: "6px 12px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              border: "2px solid",
              cursor: "pointer",
              transition: "all 0.15s",
              borderColor: hoveredClear ? "#f87171" : "#fecaca",
              backgroundColor: "#fff1f2",
              color: "#ef4444",
            }}
          >
            🗑️ Clear
          </button>
        </div>

        {/* الأزرار */}
        <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleClear}
          />
        </div>

      </div>
    </div>
  );
}