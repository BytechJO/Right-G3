import React, { useState, useRef, useEffect, useCallback } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
// ─── استبدل هذه المسارات بمساراتك الحقيقية ──────────────────
import imgCar1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgCar2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgCar3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.1.svg";
import imgMedals from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 33/B.2.svg";
// ─────────────────────────────────────────────────────────────

// ─── ألوان الفرشاة ───────────────────────────────────────────
const BRUSH_COLORS = [
  { name: "red", hex: "#ef4444" },
  { name: "blue", hex: "#3b82f6" },
  { name: "orange", hex: "#f97316" },
  { name: "green", hex: "#22c55e" },
  { name: "yellow", hex: "#eab308" },
  { name: "purple", hex: "#a855f7" },
  { name: "pink", hex: "#ec4899" },
  { name: "brown", hex: "#92400e" },
];

// ─── بيانات الجمل ────────────────────────────────────────────
const SENTENCES = [
  {
    id: 1,
    parts: [
      { type: "text", value: "The " },
      { type: "slot", slotId: "1-color", answer: "red" },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "1-place", answer: "second" },
      { type: "text", value: " place." },
    ],
  },
  {
    id: 2,
    parts: [
      { type: "text", value: "The " },
      { type: "slot", slotId: "2-color", answer: "blue" },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "2-place", answer: "first" },
      { type: "text", value: " place." },
    ],
  },
  {
    id: 3,
    parts: [
      { type: "text", value: "The " },
      { type: "slot", slotId: "3-color", answer: "orange" },
      { type: "text", value: " car is in " },
      { type: "slot", slotId: "3-place", answer: "third" },
      { type: "text", value: " place." },
    ],
  },
];

const WORD_BANK_WORDS = ["second", "blue", "first", "red", "third", "orange"];
function DraggableWord({ word, disabled }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: word,
    disabled,
  });

  const style = {
    // transform: transform
    //   ? `translate(${transform.x}px, ${transform.y}px)`
    //   : undefined,
    cursor: disabled ? "not-allowed" : "grab",
    opacity: disabled ? 0.4 : 1,
  };

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="px-4 py-1 rounded-full text-[17px] border border-[#f39b42]"
      style={style}
    >
      {word}
    </span>
  );
}

function DroppableSlot({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: isOver ? "scale(1.05)" : "scale(1)",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}
const processSvgForColoring = (svgContent) => {
  if (!svgContent) return svgContent;

  let modified = svgContent;

  modified = modified.replace(/<style>[\s\S]*?<\/style>/g, (styleTag) => {
    return styleTag.replace(/fill:\s*[^;]*;?/g, "fill: currentColor;");
  });

  modified = modified.replace(/fill="[^"]*"/g, 'fill="currentColor"');

  return modified;
};
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -6,
      right: -6,
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "bold",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    }}
  >
    ✕
  </div>
);
function ColorableSVG({
  svgSrc,
  id,
  colors,
  setColors,
  activeItem,
  setActiveItem,
}) {
  const [svgContent, setSvgContent] = useState("");
  const [processedSvg, setProcessedSvg] = useState("");

  useEffect(() => {
    fetch(svgSrc)
      .then((res) => res.text())
      .then((data) => {
        setSvgContent(data);
        setProcessedSvg(processSvgForColoring(data));
      });
  }, [svgSrc]);

  const handleColorSelect = (color) => {
    setColors((prev) => ({ ...prev, [id]: color }));
    setActiveItem(null);
  };

  return (
    <div
      onClick={() => setActiveItem(id)}
      style={{
        width: 200,
        height: 120,
        cursor: "pointer",
        position: "relative",
        border: activeItem === id ? "2px solid #333" : "1.5px solid #e2e8f0",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      {/* SVG */}
      {processedSvg && (
        <div
          style={{
            width: "100%",
            height: "100%",
            color: colors[id] || "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          dangerouslySetInnerHTML={{ __html: processedSvg }}
        />
      )}

      {/* 🎨 Palette */}
      {activeItem === id && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            display: "flex",
            gap: 6,
            background: "#fff",
            padding: 6,
            borderRadius: 10,
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          {BRUSH_COLORS.map((c) => (
            <div
              key={c.name}
              onClick={(e) => {
                e.stopPropagation();
                handleColorSelect(c.hex);
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: c.hex,
                cursor: "pointer",
                border: "2px solid #fff",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
// ─── المكوّن الرئيسي ──────────────────────────────────────────
export default function WB_Unit6_Page33_Q2() {
  const [selectedColor, setSelectedColor] = useState(BRUSH_COLORS[0].hex);
  const [brushSize, setBrushSize] = useState(12);
  const [activeDrag, setActiveDrag] = useState(null);
  const [colors, setColors] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  // drag & drop
  const [slots, setSlots] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wrongIds, setWrongIds] = useState({});

  const usedWords = Object.values(slots).filter(Boolean);

  // ── Check ──
  const handleCheck = () => {
    if (showAns || checked) return;

    const allSlotIds = SENTENCES.flatMap((s) =>
      s.parts.filter((p) => p.type === "slot").map((p) => p.slotId),
    );
    if (!allSlotIds.every((id) => slots[id])) {
      ValidationAlert.info("Please fill all the blanks first! ✏️");
      return;
    }
    const newWrong = {};
    let correct = 0;
    SENTENCES.forEach((s) =>
      s.parts
        .filter((p) => p.type === "slot")
        .forEach((p) => {
          if (slots[p.slotId] === p.answer) correct++;
          else newWrong[p.slotId] = true;
        }),
    );
    setWrongIds(newWrong);
    setChecked(true);
    setShowAns(false);
    const total = allSlotIds.length;
    if (correct === total)
      ValidationAlert.success(`Score :${correct} / ${total}`);
    else if (correct > 0)
      ValidationAlert.warning(`Score :${correct} / ${total}`);
    else ValidationAlert.error(`Score :${correct} / ${total}`);
  };

  // ── Show Answer ──
  const handleShowAnswer = () => {
    const newSlots = {};
    SENTENCES.forEach((s) =>
      s.parts
        .filter((p) => p.type === "slot")
        .forEach((p) => {
          newSlots[p.slotId] = p.answer;
        }),
    );
    setSlots(newSlots);
    setWrongIds({});
    setChecked(false);
    setShowAns(true);
  };

  // ── Reset ──
  const handleReset = () => {
    setSlots({});
    setChecked(false);
    setShowAns(false);
    setWrongIds({});

    // 👇 هاي المهمة
    setColors({});
    setActiveItem(null);
  };

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveDrag(event.active.id);
      }}
      onDragEnd={(event) => {
        const { active, over } = event;
        setActiveDrag(null);

        if (!over) return;

        const slotId = over.id;

        setChecked(false);
        setWrongIds({});

        const newSlots = { ...slots };

        // شيل من أي مكان
        Object.keys(newSlots).forEach((k) => {
          if (newSlots[k] === active.id) newSlots[k] = null;
        });

        // حط بالمكان الجديد
        newSlots[slotId] = active.id;

        setSlots(newSlots);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: 40 }}>
          {/* ── العنوان ── */}
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">B</span> Read, color, and complete.
          </h1>

          {/* ── السيارات للتلوين ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            <ColorableSVG
              svgSrc={imgCar1}
              id="car1"
              colors={colors}
              setColors={setColors}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />

            <ColorableSVG
              svgSrc={imgCar2}
              id="car2"
              colors={colors}
              setColors={setColors}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />

            <ColorableSVG
              svgSrc={imgCar3}
              id="car3"
              colors={colors}
              setColors={setColors}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </div>

          {/* ── بنك الكلمات ── */}
          <div className="flex flex-wrap gap-2 justify-center p-3 rounded-2xl">
            {WORD_BANK_WORDS.map((word) => {
              const isUsed = usedWords.includes(word);

              return (
                <DraggableWord
                  key={word}
                  word={word}
                  disabled={isUsed || showAns}
                />
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "40px",
              width: "100%",
            }}
          >
            {/* ── صورة الميداليات ── */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <img
                src={imgMedals}
                alt="medals 1st 2nd 3rd"
                style={{ height: 130, objectFit: "contain" }}
              />
            </div>
            {/* ── الجمل ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SENTENCES.map((sentence) => (
                <div
                  key={sentence.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      // color: "#f97316",
                      fontSize: 20,
                      marginRight: 2,
                    }}
                  >
                    {sentence.id}
                  </span>

                  {sentence.parts.map((part, i) => {
                    if (part.type === "text") {
                      return (
                        <span
                          key={i}
                          style={{
                            fontSize: 18,
                            color: "#1f2937",
                            // fontWeight: 500,
                          }}
                        >
                          {part.value}
                        </span>
                      );
                    }

                    const word = slots[part.slotId];
                    const isWrong = checked && wrongIds[part.slotId];

                    return (
                      <DroppableSlot id={part.slotId}>
                        {(isOver) => (
                          <span
                            style={{
                              minWidth: 120,
                              minHeight: 34,
                              borderBottom: `2px solid ${
                                isOver
                                  ? "#f59e0b"
                                  : wrongIds[part.slotId]
                                    ? "red"
                                    : "#e5e7eb"
                              }`,
                              // borderRadius: 12,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: isOver ? "#fff7ed" : "#fff",
                              transition: "0.2s",
                              cursor: "pointer",
                              position: "relative",
                              padding: "0 10px",
                            }}
                            onClick={() => {
                              if (showAns || checked) return;

                              setSlots((prev) => ({
                                ...prev,
                                [part.slotId]: null,
                              }));

                              setChecked(false);
                              setWrongIds({});
                            }}
                          >
                            {slots[part.slotId]}

                            {checked && wrongIds[part.slotId] && <ErrorBadge />}
                          </span>
                        )}
                      </DroppableSlot>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <DragOverlay>
            {activeDrag ? (
              <span
                className="px-4 py-1 rounded-full text-[17px] border border-[#f39b42]"
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {activeDrag}
              </span>
            ) : null}
          </DragOverlay>
          {/* ── الأزرار ── */}
          <div className="flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleStartAgain={handleReset}
              handleShowAnswer={handleShowAnswer}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
