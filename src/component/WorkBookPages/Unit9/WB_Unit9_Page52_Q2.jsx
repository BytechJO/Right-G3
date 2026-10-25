import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/5.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/10.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/9.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 52/SVG/8.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise D/Item_001_They_were_at_the_bakery_yesterday.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise D/Item_002_She_is_at_the_library_now.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise D/Item_003_He_was_at_the_bus_stop_a_week_ago.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise D/Item_004_She_is_at_the_airport_now.mp3";
import sentence5Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise D/Item_005_They_were_at_the_clinic_last_week.mp3";
import sentence6Audio from "../../../assets/audio/WorkBook/unit 9/Page 52 - Exercise D/Item_006_was_at_work_today.mp3";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";

import { useDraggable, useDroppable } from "@dnd-kit/core";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const DRAG_COLOR = "#f29a1f";

// ── بيانات ─────────────────────────────────────────────────────
const SENTENCES = [
  "They were at the bakery yesterday.",
  "She is at the library now.",
  "He was at the bus stop a week ago.",
  "She is at the airport now.",
  "They were at the clinic last week.",
  "I was at work today.",
];
const SENTENCE_AUDIO = [
  sentence1Audio,
  sentence2Audio,
  sentence3Audio,
  sentence4Audio,
  sentence5Audio,
  sentence6Audio,
];

const ITEMS = [
  { id: 1, img: img1, alt: "A woman at an airport" },
  { id: 2, img: img2, alt: "People at a bakery" },
  { id: 3, img: img3, alt: "A girl at a library" },
  { id: 4, img: img4, alt: "People at a clinic" },
  { id: 5, img: img5, alt: "A person at work" },
  { id: 6, img: img6, alt: "A boy at a bus stop" },
];

const CORRECT_ANSWERS = {
  1: 4,
  2: 1,
  3: 2,
  4: 5,
  5: 6,
  6: 3,
};

const NUMBERS = [1, 2, 3, 4, 5, 6];

// ── Error Badge ────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: "-8px",
      right: "-8px",
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
      zIndex: 10,
      pointerEvents: "none",
    }}
  >
    ✕
  </div>
);

// ── Draggable Number ───────────────────────────────────────────
function DraggableNumber({ num, disabled, activeId, register, pick }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `number-${num}`,
    data: {
      num,
    },
    disabled,
  });

  const style = {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: disabled ? "#cfcfd4" : DRAG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: "20px",
    cursor: disabled ? "not-allowed" : "grab",
    opacity: isDragging ? 0.3 : disabled ? 0.55 : 1,
    userSelect: "none",
    touchAction: "none",
    transition: "0.2s ease",
    boxShadow:
      activeId === `number-${num}`
        ? `0 0 0 3px rgba(242,154,31,0.35)`
        : "0 3px 10px rgba(0,0,0,0.12)",
  };

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(`number-${num}`, element);
      }}
      style={style}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`Number ${num}, press Enter or Space to pick up`}
      className="unit4-interactive"
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
    >
      {num}
    </div>
  );
}

// ── Drop Zone ──────────────────────────────────────────────────
function DropImage({
  item,
  num,
  preview,
  wrong,
  locked,
  handleRemove,
  register,
  onKeyDown,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${item.id}`,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(`drop-${item.id}`, element);
      }}
      role="button"
      tabIndex={!locked && (num || preview) ? 0 : -1}
      aria-disabled={locked}
      onKeyDown={onKeyDown}
      className={`unit4-drop-target unit4-interactive ${preview && !num ? "unit4-keyboard-preview" : ""}`}
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        transition: "0.25s ease",
      }}
    >
      {/* wrapper خاص بالصورة */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "220px",
          transition: "0.25s ease",
          transform: isOver ? "scale(1.04)" : "scale(1)",
          filter: isOver
            ? "drop-shadow(0 0 12px rgba(242,154,31,0.45))"
            : "none",
        }}
      >
        {/* الصورة */}
        <img
          src={item.img}
          alt={item.alt}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            userSelect: "none",
            pointerEvents: "none",
            transition: "0.25s ease",
          }}
        />

        {/* Overlay وقت السحب */}
        {isOver && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(242,154,31,0.12)",
              // border: "3px dashed #f29a1f",
              borderRadius: "12px",
              pointerEvents: "none",
              animation: "pulseDrop 1s infinite",
            }}
          />
        )}

        {/* مربع الرقم */}
        <div
          onClick={() => num && !locked && handleRemove(item.id)}
          style={{
            position: "absolute",

            // هيك بصير ثابت مع الصورة نفسها
            top: "1%",
            right: "1%",

            width: "clamp(34px,4vw,45px)",
            height: "clamp(34px,4vw,45px)",

            borderRadius: "8px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: "clamp(16px,2vw,24px)",
            fontWeight: 700,

            zIndex: 5,

            cursor: num && !locked ? "pointer" : "default",

            transition: "0.2s ease",
          }}
        >
          {num || preview || ""}
        </div>

        {/* Error Badge */}
        {wrong && <ErrorBadge />}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function WB_Unit8_Page52_QD() {
  const [answers, setAnswers] = useState({});
  const [, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
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

  const usedNumbers = Object.values(answers);

  // ── Drag Start ───────────────────────────────────────────────
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // ── Drag End ─────────────────────────────────────────────────
  const place = (numberId, targetId) => {
    const draggedNum = Number(String(numberId).replace("number-", ""));
    const dropId = Number(String(targetId).replace("drop-", ""));
    if (!draggedNum || !dropId || showAns || lockedIds.includes(dropId)) return;
    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((key) => {
        if (updated[key] === draggedNum) {
          delete updated[key];
        }
      });

      updated[dropId] = draggedNum;

      return updated;
    });
    setWrongIds((prev) => prev.filter((id) => id !== dropId));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: NUMBERS.map((num) => `number-${num}`),
    targetIds: ITEMS.map((item) => `drop-${item.id}`),
    isItemDisabled: (id) =>
      usedNumbers.includes(Number(String(id).replace("number-", ""))) ||
      showAns,
    isTargetDisabled: (id) =>
      lockedIds.includes(Number(String(id).replace("drop-", ""))) || showAns,
    onPlace: place,
  });
  const handleDragEnd = ({ active, over }) => {
    if (over) place(String(active.id), String(over.id));
    setActiveId(null);
  };

  // ── Remove ───────────────────────────────────────────────────
  const handleRemove = (id) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    setChecked(false);
    setWrongIds((prev) => prev.filter((itemId) => itemId !== id));
    const removed = answers[id];
    if (removed) keyboard.focusItem(`number-${removed}`);
  };

  // ── Check ────────────────────────────────────────────────────
  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.error("Please complete all answers first! ✏️");
      return;
    }

    let correct = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === CORRECT_ANSWERS[item.id]) {
        correct++;
      }
    });

    setChecked(true);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter(
          (item) => answers[item.id] === CORRECT_ANSWERS[item.id],
        ).map((item) => item.id),
      ]),
    ]);
    setWrongIds(
      ITEMS.filter((item) => answers[item.id] !== CORRECT_ANSWERS[item.id]).map(
        (item) => item.id,
      ),
    );

    const total = ITEMS.length;

    if (correct === total) {
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    } else if (correct > 0) {
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${correct} / ${total}`);
    }
  };

  // ── Show Answers ─────────────────────────────────────────────
  const handleShowAnswer = () => {
    setAnswers({ ...CORRECT_ANSWERS });
    setChecked(false);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    keyboard.cancel();
    stopAudio();
  };

  // ── Reset ────────────────────────────────────────────────────
  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setActiveId(null);
    setLockedIds([]);
    setWrongIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (id) => wrongIds.includes(id);

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "35px",
        }}
      >
        {/* العنوان */}
        <ExerciseHeader
          sectionLetter="D"
          title="Read, look, and number the pictures."
          subTitle="Read all past or present sentence to the correct place picture clues first, then assign the numbers carefully so the picture or order is used correctly."
        />

        {/* الجمل */}
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(8px,1.2vw,14px) clamp(20px,4vw,48px)",
          }}
        >
          {SENTENCES.map((sentence, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "clamp(8px,1vw,12px)",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#111",
                  minWidth: "clamp(16px,1.9vw,24px)",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </span>

              <p
                className="unit4-audio-control unit4-interactive"
                role="button"
                tabIndex={0}
                aria-label={`Play: ${sentence}`}
                onClick={() =>
                  playAudio(`sentence-${index}`, SENTENCE_AUDIO[index])
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`sentence-${index}`, SENTENCE_AUDIO[index]);
                  }
                }}
                style={{
                  margin: 0,
                  fontSize: "18px",
                  color: "#222",
                  lineHeight: 1.5,
                  // fontWeight: 500,
                }}
              >
                {sentence}
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `sentence-${index}`}
                />
              </p>
            </div>
          ))}
        </div>

        {/* الأرقام */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            className="w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(10px,1.5vw,16px)",
              flexWrap: "wrap",
            }}
          >
            {NUMBERS.map((num) => (
              <DraggableNumber
                key={num}
                num={num}
                disabled={usedNumbers.includes(num) || showAns}
                activeId={activeId}
                register={keyboard.registerItem}
                pick={() => keyboard.pickItem(`number-${num}`)}
              />
            ))}
          </div>

          {/* الصور */}
          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0,1fr))",
              gap: "10px",
              alignItems: "start",
            }}
          >
            {ITEMS.map((item) => (
              <DropImage
                key={item.id}
                item={item}
                num={answers[item.id]}
                preview={
                  keyboard.keyboardTargetId === `drop-${item.id}`
                    ? Number(
                        String(keyboard.keyboardItemId).replace("number-", ""),
                      )
                    : ""
                }
                wrong={isWrong(item.id)}
                locked={showAns || lockedIds.includes(item.id)}
                handleRemove={handleRemove}
                register={keyboard.registerTarget}
                onKeyDown={(event) => {
                  if (
                    !keyboard.keyboardItemId &&
                    answers[item.id] &&
                    !lockedIds.includes(item.id) &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    handleRemove(item.id);
                    return;
                  }
                  keyboard.handleTargetKeyDown(event, `drop-${item.id}`);
                }}
              />
            ))}
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeId ? (
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: DRAG_COLOR,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "28px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                {activeId.replace("number-", "")}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* الأزرار */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
