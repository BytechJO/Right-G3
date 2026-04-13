import React, { useRef, useState, useEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ✅ صور الأشياء (تظهر داخل الجمل فقط)
import imgHat   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G1.svg";
import imgCat   from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G2.svg";
import imgBall  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G3.svg";
import imgApple from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G4.svg";

// ✅ صور الأثاث (تظهر كـ canvas يرسم عليها الطالب)
import imgFridge from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G5.svg";
import imgBed    from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G6.svg";
import imgTable  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G7.svg";
import imgChair  from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 30/G8.svg";

// ─────────────────────────────────────────────
const SENTENCES = [
  { id: 1, itemImg: imgHat,   text: "The", itemName: "hat",   rest: "is under the table."   },
  { id: 2, itemImg: imgCat,   text: "The", itemName: "cat",   rest: "is next to the chair." },
  { id: 3, itemImg: imgBall,  text: "The", itemName: "ball",  rest: "is on the bed."        },
  { id: 4, itemImg: imgApple, text: "The", itemName: "apple", rest: "is in the fridge."     },
];

// الصور الأربعة للأثاث بالترتيب كما تظهر في الكتاب
// يمين الجمل: fridge + bed (صف أول)، table + chair (صف ثاني)
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
// Canvas واحد لصورة أثاث واحدة
// ─────────────────────────────────────────────
function FurnitureCanvas({ furniture, tool, color, size }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const img    = new Image();
    img.src      = furniture.img;
    img.onload   = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [furniture.img]);

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

  // expose clear via ref — نمرر الـ ref للأب
  FurnitureCanvas.clearCanvas = (id) => {
    if (furniture.id !== id) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img  = new Image();
    img.src    = furniture.img;
    img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  return (
    <div
      className="rounded-xl overflow-hidden border border-gray-200 bg-white"
      style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}
    >
      <canvas
        ref={canvasRef}
        width={200}
        height={160}
        className="w-full h-auto touch-none block"
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

  // refs للـ canvas الأربعة حتى نقدر نمسحهم
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

        {/* ── المحتوى الرئيسي: جمل + صور ── */}
        <div className="flex gap-4 items-start">

          {/* الجمل على اليسار */}
          <div className="flex flex-col gap-3 flex-1">
            {SENTENCES.map((s) => (
              <p
                key={s.id}
                className="text-gray-700 text-sm font-medium flex items-center flex-wrap"
                style={{ gap: 4 }}
              >
                <span className="text-orange-500 font-bold" style={{ minWidth: 16 }}>
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

          {/* صور الأثاث (2x2) على اليمين */}
          <div className="grid grid-cols-2 gap-2" style={{ width: 400 }}>
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
        <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3">

          {/* أدوات */}
          <div className="flex gap-2">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all
                  ${tool === t.id
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* الألوان */}
          <div className="flex gap-1.5 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setTool("pencil"); }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  color === c && tool === "pencil"
                    ? "border-gray-700 scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* حجم الفرشاة */}
          <div className="flex items-center gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex items-center justify-center rounded-full border-2 transition-all bg-white
                  ${size === s ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}`}
                style={{ width: 28, height: 28 }}
              >
                <span
                  className="rounded-full bg-gray-700"
                  style={{ width: Math.min(s * 2, 20), height: Math.min(s * 2, 20) }}
                />
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-gray-200" />

          {/* مسح الكل */}
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl text-sm font-medium border-2 border-red-200 bg-red-50 text-red-500 hover:border-red-400 transition-all"
          >
            🗑️ Clear
          </button>
        </div>

        {/* الأزرار */}
        <div className="mt-6 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleClear}
          />
        </div>

      </div>
    </div>
  );
}

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
      className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm"
      style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}
    >
      <canvas
        ref={canvasRef}
        width={200}
        height={160}
        className="w-full h-auto touch-none block"
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