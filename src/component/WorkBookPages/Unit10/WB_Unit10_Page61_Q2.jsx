import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/8.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/9.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/10.svg";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const DRAG_COLOR = "#f29a1f";
const BORDER_COLOR = "#f39b42";

// ── الفقرة ─────────────────────────────────────────────────────
const PARAGRAPH = `We are planning our vacation to the beach. Tonight, Dad will show us a brochure of the hotel where we will stay. We'll go to the store to buy new swimsuits tomorrow. On Tuesday, I'll choose what to pack. I'll start packing in three days. Next week, we'll be at the beach! We'll come home from the vacation in two weeks. I can't wait!`;

// ── بيانات الأسئلة ─────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    label: "tonight",
    correctOption:
      "Tonight, dad will show us a brochure of the hotel where we will stay.",
    options: [
      "Tonight, dad will show us a brochure of the hotel where we will stay.",
      "We'll go to the store to buy new swimsuits tomorrow.",
      "On Tuesday, I'll choose what to pack.",
      "We'll come home from the vacation in two weeks.",
    ],
  },

  {
    id: 2,
    label: "tomorrow",
    correctOption: "We'll go to the store to buy new swimsuits tomorrow.",
    options: [
      "We'll go to the store to buy new swimsuits tomorrow.",
      "Tonight, dad will show us a brochure of the hotel where we will stay.",
      "I'll start packing in three days.",
      "We'll come home from the vacation in two weeks.",
    ],
  },

  {
    id: 3,
    label: "Tuesday",
    correctOption: "On Tuesday, I'll choose what to pack.",
    options: [
      "On Tuesday, I'll choose what to pack.",
      "We'll go to the store to buy new swimsuits tomorrow.",
      "Next week, we'll be at the beach!",
      "Tonight, dad will show us a brochure of the hotel where we will stay.",
    ],
  },

  {
    id: 4,
    label: "two weeks",
    correctOption: "We'll come home from the vacation in two weeks.",
    options: [
      "We'll come home from the vacation in two weeks.",
      "On Tuesday, I'll choose what to pack.",
      "We'll go to the store to buy new swimsuits tomorrow.",
      "Next week, we'll be at the beach!",
    ],
  },
];
// ── بيانات الصور + الترتيب الصحيح ─────────────────────────────
const IMAGE_CARDS = [
  { id: 1, img: img1, correctNumber: 1 },
  { id: 2, img: img2, correctNumber: 3 },
  { id: 3, img: img3, correctNumber: 2 },
  { id: 4, img: img4, correctNumber: 6 },
  { id: 5, img: img5, correctNumber: 4 },
  { id: 6, img: img6, correctNumber: 5 },
];

const DRAG_NUMBERS = [1, 2, 3, 4, 5, 6];

// ── normalize للمقارنة ──────────────────────────────────────────
const normalize = (t) =>
  (t || "")
    .replace(/[""،".!?']/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -8,
      right: -8,
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      backgroundColor: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      fontWeight: "700",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

      zIndex: 5,
      pointerEvents: "none",
    }}
  >
    ✕
  </div>
);

function DraggableNumber({ num, disabled, draggedNumber, setDraggedNumber }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(num),
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseDown={() => setDraggedNumber(num)}
      onTouchStart={() => setDraggedNumber(num)}
      style={{
        width: "clamp(32px,4vw,46px)",
        height: "clamp(32px,4vw,46px)",
        borderRadius: "50%",
        backgroundColor: disabled ? "#cfcfd4" : DRAG_COLOR,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "clamp(15px,2vw,24px)",
        cursor: disabled ? "not-allowed" : "grab",
        opacity: disabled ? 0.55 : 1,
        userSelect: "none",
        touchAction: "none",
        transition: "0.2s ease",

        boxShadow:
          draggedNumber === num
            ? "0 0 0 4px rgba(242,154,31,0.35)"
            : "0 2px 8px rgba(0,0,0,0.12)",
      }}
    >
      {num}
    </div>
  );
}

function DroppableImageCard({ card, num, wrong, showAns, handleRemoveImg }) {
  const { setNodeRef, isOver } = useDroppable({
    id: String(card.id),
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
      }}
    >
      {/* الصورة */}
      <img
        src={card.img}
        alt={`card-${card.id}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
           transition: "all .2s ease",

          transform: isOver ? "scale(1.03)" : "scale(1)",

          boxShadow: isOver
            ? "0 0 0 4px rgba(242,154,31,.18)"
            : "0 2px 8px rgba(0,0,0,.08)",
        }}
      />

      {/* مربع الرقم */}
      <div
        onClick={() => handleRemoveImg(card.id)}
        className={`${!showAns ? "hover:text-orange-500" : ""}`}
        style={{
          position: "absolute",

          top: "0px",
          right: "0px",

          width: "45px",
          height: "45px",

          borderRadius: "clamp(4px,.6vw,7px)",

          // border: `2px solid ${
          //   wrong ? WRONG_COLOR : BORDER_COLOR
          // }`,

          // backgroundColor: "#fff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "clamp(12px,1.8vw,22px)",
          fontWeight: 700,

          // color: wrong ? WRONG_COLOR : DRAG_COLOR,

          zIndex: 10,

          // boxShadow: "0 2px 6px rgba(0,0,0,.18)",

          cursor: num && !showAns ? "pointer" : "default",

          boxSizing: "border-box",
         
        }}
      >
        {num || ""}
      </div>

      {wrong && <ErrorBadge />}
    </div>
  );
}

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit10_Page61_QJ() {
  // ── state الصور ──
  const [imgAnswers, setImgAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);

  // ── state الجمل ──
  const [textAnswers, setTextAnswers] = useState({});

  // ── state عام ──
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );
  const usedNumbers = Object.values(imgAnswers);

  // ── applyDrop ──
  const applyDrop = (id, num) => {
    if (!num || showAns) return;
    setChecked(false);
    setImgAnswers((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => {
        if (updated[k] === num) delete updated[k];
      });
      updated[id] = num;
      return updated;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setDraggedNumber(null);

    if (!over || showAns) return;

    applyDrop(Number(over.id), Number(active.id));
  };

  const handleRemoveImg = (id) => {
    if (showAns || checked) return;
    setChecked(false);
    setImgAnswers((prev) => {
      const u = { ...prev };
      delete u[id];
      return u;
    });
  };

  // ── نص الجمل ──
  const handleTextChange = (id, value) => {
    if (showAns || checked) return;
    setChecked(false);
    setTextAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // ── isWrong helpers ──
  const isImgWrong = (id) =>
    checked &&
    imgAnswers[id] !== IMAGE_CARDS.find((c) => c.id === id)?.correctNumber;
  const isTextWrong = (id) =>
    checked &&
    normalize(textAnswers[id]) !==
      normalize(QUESTIONS.find((q) => q.id === id)?.correctOption);
  const isTextRight = (id) =>
    checked &&
    normalize(textAnswers[id]) ===
      normalize(QUESTIONS.find((q) => q.id === id)?.correctOption);

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns || checked) return;
    const allImgs = IMAGE_CARDS.every((c) => imgAnswers[c.id]);
    const allTexts = QUESTIONS.every((q) => textAnswers[q.id]?.trim());
    if (!allImgs || !allTexts) {
      ValidationAlert.info("Please complete all answers first! ✏️");
      return;
    }
    let imgScore = IMAGE_CARDS.filter(
      (c) => imgAnswers[c.id] === c.correctNumber,
    ).length;
    let textScore = QUESTIONS.filter(
      (q) => normalize(textAnswers[q.id]) === normalize(q.correctOption),
    ).length;
    const correct = imgScore + textScore;
    const total = IMAGE_CARDS.length + QUESTIONS.length;
    setChecked(true);
    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    else if (correct > 0)
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    else ValidationAlert.error(`Score: ${correct} / ${total}`);
  };

  const handleShowAnswer = () => {
    const imgs = {};
    IMAGE_CARDS.forEach((c) => {
      imgs[c.id] = c.correctNumber;
    });
    setImgAnswers(imgs);
    const texts = {};
    QUESTIONS.forEach((q) => {
      texts[q.id] = texts[q.id] = q.correctOption;
    });
    setTextAnswers(texts);
    setChecked(false);
    setShowAns(true);
    // setTouchItem(null);
    setDraggedNumber(null);
  };

  const handleReset = () => {
    setImgAnswers({});
    setTextAnswers({});
    setDraggedNumber(null);
    // setTouchItem(null);
    setChecked(false);
    setShowAns(false);
  };

  return (
    <div className="main-container-component">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="div-forall" style={{ gap: "clamp(16px,2.5vw,28px)" }}>
          {/* ── العنوان ── */}
          <h1 className="WB-header-title-page8">
            <span className="WB-ex-A">J</span> Read and write. Number the
            pictures in order.
          </h1>

          {/* ── الصف الأعلى: الصور + الفقرة ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 0.95fr",
              gap: "clamp(14px,2vw,24px)",
              alignItems: "center",
            }}
          >
            {/* الصور 3×2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px,1.5vw,16px)",
              }}
            >
              {/* الأرقام للسحب */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "clamp(8px,1.2vw,14px)",
                  flexWrap: "wrap",
                }}
              >
                {DRAG_NUMBERS.map((num) => (
                  <DraggableNumber
                    key={num}
                    num={num}
                    disabled={usedNumbers.includes(num) || showAns || checked}
                    draggedNumber={draggedNumber}
                    setDraggedNumber={setDraggedNumber}
                  />
                ))}
              </div>

              {/* الصور 3×2 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0,1fr))",
                  gap: "clamp(6px,1vw,12px)",
                }}
              >
                {IMAGE_CARDS.map((card) => {
                  const wrong = isImgWrong(card.id);
                  const num = imgAnswers[card.id];
                  return (
                    <DroppableImageCard
                      key={card.id}
                      card={card}
                      num={num}
                      wrong={wrong}
                      showAns={showAns || checked}
                      handleRemoveImg={handleRemoveImg}
                    />
                  );
                })}
              </div>
            </div>

            {/* الفقرة */}
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "clamp(10px,1.2vw,16px)",
                backgroundColor: "#fff",
                height:"100%",
                padding: "clamp(12px,1.5vw,20px)",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(13px,1.6vw,18px)",
                  lineHeight: 2.5,
                  color: "#222",
                  // fontWeight: 500,
                }}
              >
                {PARAGRAPH}
              </p>
            </div>
          </div>

          {/* ── الجمل ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px,1.5vw,18px)",
            }}
          >
            {QUESTIONS.map((q) => {
              const wrong = isTextWrong(q.id);
              const right = isTextRight(q.id);
              return (
                <div
                  key={q.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(6px,1vw,12px)",
                    flexWrap: "nowrap",
                  }}
                >
                  {/* رقم */}
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "#111",
                      flexShrink: 0,
                      minWidth: "clamp(14px,1.8vw,20px)",
                    }}
                  >
                    {q.id}
                  </span>

                  {/* التصنيف */}
                  <span
                    style={{
                      fontSize: "clamp(13px,1.6vw,18px)",
                      fontWeight: 600,
                      color: "#555",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    ({q.label})
                  </span>

                  {/* حقل الإجابة */}
                  <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                    <select
                      disabled={showAns || checked}
                      value={textAnswers[q.id] || ""}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      style={{
                        width: "100%",
                        borderBottom: wrong
                          ? `2px solid red`
                          : "1px solid #d1d5db",
                        // borderRadius: "10px",
                        outline: "none",
                        background: "#fff",
                        fontSize: "clamp(13px,1.6vw,17px)",
                        // fontWeight: 600,
                        // color: wrong ? WRONG_COLOR : "#222",
                        padding: "10px 12px",
                        cursor: showAns || checked ? "default" : "pointer",
                        boxSizing: "border-box",
                        transition: "0.2s ease",
                        // appearance: "none",
                      }}
                    >
                      <option value="">Select the correct sentence</option>

                      {q.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {wrong && <ErrorBadge />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── الأزرار ── */}
          <div className="mt-4 flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
        <DragOverlay>
          {draggedNumber ? (
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: DRAG_COLOR,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                fontSize: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,.25)",
              }}
            >
              {draggedNumber}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
