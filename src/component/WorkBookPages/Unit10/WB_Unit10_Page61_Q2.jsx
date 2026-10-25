import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
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
import paragraphAudio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise J/Item_001_We_are_planning_our_vacation_to_the_beach._Tonight,_Dad_will_show_us_a_b.mp3";

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
  { id: 1, img: img1, alt: "Dad showing a hotel brochure", correctNumber: 1 },
  { id: 2, img: img2, alt: "Choosing clothes to pack", correctNumber: 3 },
  { id: 3, img: img3, alt: "Buying new swimsuits", correctNumber: 2 },
  { id: 4, img: img4, alt: "Returning home after vacation", correctNumber: 6 },
  { id: 5, img: img5, alt: "Packing a suitcase", correctNumber: 4 },
  { id: 6, img: img6, alt: "A family at the beach", correctNumber: 5 },
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

function DraggableNumber({
  num,
  disabled,
  draggedNumber,
  setDraggedNumber,
  keyboard,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: String(num),
    disabled,
  });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        keyboard.registerItem(num, node);
      }}
      {...listeners}
      {...attributes}
      onMouseDown={() => setDraggedNumber(num)}
      onTouchStart={() => setDraggedNumber(num)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`Number ${num}${disabled ? ", already used" : ""}`}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && !disabled) {
          event.preventDefault();
          keyboard.pickItem(num);
        }
      }}
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

function DroppableImageCard({
  card,
  num,
  wrong,
  locked,
  showAns,
  handleRemoveImg,
  keyboard,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: String(card.id),
  });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        keyboard.registerTarget(card.id, node);
      }}
      role="button"
      tabIndex={!locked && (keyboard.keyboardItemId !== null || num) ? 0 : -1}
      aria-disabled={locked}
      aria-label={`${card.alt}${num ? `, number ${num}` : ", empty"}`}
      onKeyDown={(event) => {
        if (keyboard.keyboardItemId !== null)
          keyboard.handleTargetKeyDown(event, card.id);
        else if (num && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          handleRemoveImg(card.id);
        }
      }}
      style={{
        position: "relative",
      }}
    >
      {/* الصورة */}
      <img
        src={card.img}
        alt={card.alt}
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
        {keyboard.keyboardItemId !== null &&
        keyboard.keyboardTargetId === card.id ? (
          <span className="unit4-keyboard-preview">
            {keyboard.keyboardItemId}
          </span>
        ) : (
          num || ""
        )}
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
  const [lockedImgIds, setLockedImgIds] = useState([]);
  const [lockedTextIds, setLockedTextIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

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
    if (!num || showAns || lockedImgIds.includes(Number(id))) return;
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
    if (showAns || lockedImgIds.includes(Number(id))) return;
    const returnedNumber = imgAnswers[id];
    setChecked(false);
    setImgAnswers((prev) => {
      const u = { ...prev };
      delete u[id];
      return u;
    });
    if (returnedNumber) keyboard.focusItem(returnedNumber);
  };
  const keyboard = useUnit4TabDrag({
    itemIds: DRAG_NUMBERS,
    targetIds: IMAGE_CARDS.map((card) => card.id),
    isItemDisabled: (num) => usedNumbers.includes(num) || showAns,
    isTargetDisabled: (id) => lockedImgIds.includes(Number(id)),
    onPlace: (num, id) => applyDrop(Number(id), num),
  });

  // ── نص الجمل ──
  const handleTextChange = (id, value) => {
    if (showAns || lockedTextIds.includes(Number(id))) return;
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
  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (
      showAns ||
      lockedImgIds.length + lockedTextIds.length ===
        IMAGE_CARDS.length + QUESTIONS.length
    )
      return;
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
    setLockedImgIds(
      IMAGE_CARDS.filter(
        (card) => imgAnswers[card.id] === card.correctNumber,
      ).map((card) => card.id),
    );
    setLockedTextIds(
      QUESTIONS.filter(
        (q) => normalize(textAnswers[q.id]) === normalize(q.correctOption),
      ).map((q) => q.id),
    );
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
    setLockedImgIds(IMAGE_CARDS.map((card) => card.id));
    setLockedTextIds(QUESTIONS.map((q) => q.id));
    // setTouchItem(null);
    setDraggedNumber(null);
    keyboard.cancel();
  };

  const handleReset = () => {
    setImgAnswers({});
    setTextAnswers({});
    setDraggedNumber(null);
    keyboard.cancel();
    // setTouchItem(null);
    setChecked(false);
    setShowAns(false);
    setLockedImgIds([]);
    setLockedTextIds([]);
    stopAudio();
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
          <ExerciseHeader
            sectionLetter="J"
            title="Read and write. Number the pictures in order."
            subTitle="Read all vacation events in chronological order and the matching time expression clues first, then assign the numbers carefully so the picture or order is used correctly."
          />

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
                    disabled={usedNumbers.includes(num) || showAns}
                    draggedNumber={draggedNumber}
                    setDraggedNumber={setDraggedNumber}
                    keyboard={keyboard}
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
                      locked={lockedImgIds.includes(card.id)}
                      handleRemoveImg={handleRemoveImg}
                      keyboard={keyboard}
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
                height: "100%",
                padding: "clamp(12px,1.5vw,20px)",
              }}
            >
              <p
                className="unit4-audio-control"
                role="button"
                tabIndex={0}
                aria-label="Play the vacation passage"
                onClick={() => playAudio("paragraph", paragraphAudio)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio("paragraph", paragraphAudio);
                  }
                }}
                style={{
                  margin: 0,
                  fontSize: "clamp(13px,1.6vw,18px)",
                  lineHeight: 2.5,
                  color: "#222",
                  // fontWeight: 500,
                }}
              >
                {PARAGRAPH}
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === "paragraph"}
                />
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
                      disabled={showAns || lockedTextIds.includes(q.id)}
                      value={textAnswers[q.id] || ""}
                      onChange={(e) => {
                        handleTextChange(q.id, e.target.value);
                      }}
                      style={{
                        width: "100%",
                        borderBottom: wrong
                          ? `2px solid red`
                          : "1px solid #d1d5db",
                        // borderRadius: "10px",
                        background: "#fff",
                        fontSize: "clamp(13px,1.6vw,17px)",
                        // fontWeight: 600,
                        // color: wrong ? WRONG_COLOR : "#222",
                        padding: "10px 12px",
                        cursor:
                          showAns || lockedTextIds.includes(q.id)
                            ? "default"
                            : "pointer",
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
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `text-${q.id}`}
                    />
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
