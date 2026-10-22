import React, { useState } from "react";

import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 55/SVG/4.svg";
import q1Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_001_Where's_Helen's_mom.mp3";
import a1Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_002_She's_in_a_taxi.mp3";
import q2Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_003_Where's_Stella's_mom.mp3";
import a2Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_004_She's_in_the_kitchen.mp3";
import q3Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_005_Where_are_Jack_and_Sarah.mp3";
import a3Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_006_They're_on_the_playground.mp3";
import q4Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_007_Where_is_Tom.mp3";
import a4Audio from "../../../assets/audio/WorkBook/unit 9/Page 55 - Exercise I/Item_008_He's_at_school.mp3";

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

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const DRAG_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    img: img1,
    lines: ["Where's Helen's mom?", "She's in a taxi."],
    audios: [q1Audio, a1Audio],
    alt: "Helen's mother riding in a taxi",
  },
  {
    id: 2,
    img: img2,
    lines: ["Where's Stella's mom?", "She's in the kitchen."],
    audios: [q2Audio, a2Audio],
    alt: "Stella's mother standing in a kitchen",
  },
  {
    id: 3,
    img: img3,
    lines: ["Where are Jack and Sarah?", "They're on the playground."],
    audios: [q3Audio, a3Audio],
    alt: "Jack and Sarah playing on a playground",
  },
  {
    id: 4,
    img: img4,
    lines: ["Where is Tom?", "He's at school."],
    audios: [q4Audio, a4Audio],
    alt: "Tom standing at school",
  },
];

const CORRECT_ANSWERS = {
  1: 3,
  2: 4,
  3: 1,
  4: 2,
};

const NUMBERS = [1, 2, 3, 4];

// ── Error Badge ────────────────────────────────────────────────
const ErrorBadge = ({ top = -8, right = -8 }) => (
  <div
    style={{
      position: "absolute",
      top,
      right,

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

      zIndex: 10,
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

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(`number-${num}`, element);
      }}
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
      style={{
        width: "45px",
        height: "45px",

        borderRadius: "50%",

        backgroundColor: disabled ? "#cfcfd4" : DRAG_COLOR,

        color: "#fff",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontWeight: 700,
        fontSize: "clamp(18px,2.4vw,28px)",

        cursor: disabled ? "not-allowed" : "grab",

        opacity: isDragging ? 0.35 : disabled ? 0.55 : 1,

        userSelect: "none",
        touchAction: "none",

        transition: "0.2s ease",

        transform: activeId === `number-${num}` ? "scale(1.1)" : "scale(1)",

        boxShadow:
          activeId === `number-${num}`
            ? `0 0 0 3px rgba(242,154,31,0.35)`
            : "0 3px 10px rgba(0,0,0,0.12)",
      }}
    >
      {num}
    </div>
  );
}

// ── Drop Zone ──────────────────────────────────────────────────
function DropZone({
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
        position: "relative",

        width: "140px",

        transition: "0.25s ease",

        transform: isOver ? "scale(1.03)" : "scale(1)",
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

          objectFit: "contain",

          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* Overlay وقت السحب */}
      {isOver && (
        <div
          style={{
            position: "absolute",
            inset: 0,

            borderRadius: "12px",

            background: "rgba(243,155,66,0.12)",

            pointerEvents: "none",
          }}
        />
      )}

      {/* مربع الرقم */}
      <div
        onClick={() => num && !locked && handleRemove(item.id)}
        style={{
          position: "absolute",

          top: "0%",
          right: "0%",

          width: "30px",
          height: "30px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "clamp(14px,2vw,24px)",

          fontWeight: 700,

          zIndex: 5,

          cursor: num && !locked ? "pointer" : "default",

          transition: "0.2s ease",
        }}
      >
        {num || preview || ""}
      </div>

      {/* Error Badge */}
      {wrong && <ErrorBadge top={-6} right={-6} />}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function WB_Unit9_Page55_QI() {
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

      Object.keys(updated).forEach((k) => {
        if (updated[k] === draggedNum) {
          delete updated[k];
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

    setChecked(false);

    setAnswers((prev) => {
      const updated = { ...prev };

      delete updated[id];

      return updated;
    });
    setWrongIds((prev) => prev.filter((itemId) => itemId !== id));
    const removed = answers[id];
    if (removed) keyboard.focusItem(`number-${removed}`);
  };

  // ── Check ────────────────────────────────────────────────────
  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first! ✏️");

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

  // ── Show Answer ──────────────────────────────────────────────
  const handleShowAnswer = () => {
    setAnswers({
      ...CORRECT_ANSWERS,
    });

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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="div-forall"
          style={{
            gap: "5px",
          }}
        >
          {/* العنوان */}
          <ExerciseHeader
            sectionLetter="I"
            title="Read, look, and number."
            subTitle="Read all location question and answer to the correct scene clues first, then assign the numbers carefully so the picture or order is used correctly."
          />

          {/* الأرقام */}
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

          {/* الأسئلة */}
          <div
            className="w-full"
            style={{
              display: "flex",
              flexDirection: "column",

              gap: "10px",
            }}
          >
            {ITEMS.map((item) => {
              const wrong = isWrong(item.id);

              const num = answers[item.id];

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",

                    alignItems: "center",

                    gap: "clamp(10px,2vw,24px)",

                    flexWrap: "wrap",
                  }}
                >
                  {/* النص */}
                  <div
                    style={{
                      display: "flex",

                      alignItems: "flex-start",

                      gap: "clamp(8px,1vw,14px)",

                      // flex: 1,

                      width: "70%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(16px,1.9vw,24px)",
                        fontWeight: 500,
                        color: "#111",
                        minWidth: "clamp(16px,1.9vw,24px)",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      {item.id}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      {item.lines.map((line, i) => (
                        <p
                          key={i}
                          className="unit4-audio-control unit4-interactive"
                          role="button"
                          tabIndex={0}
                          aria-label={`Play: ${line}`}
                          onClick={() =>
                            playAudio(`line-${item.id}-${i}`, item.audios[i])
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              playAudio(`line-${item.id}-${i}`, item.audios[i]);
                            }
                          }}
                          style={{
                            margin: 0,
                            fontSize: "clamp(16px,1.9vw,22px)",
                            color: "#222",
                            lineHeight: 1.45,
                          }}
                        >
                          {line}
                          <Unit4PlayingAudioIcon
                            active={activeAudioKey === `line-${item.id}-${i}`}
                          />
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* الصورة */}
                  <DropZone
                    item={item}
                    num={num}
                    preview={
                      keyboard.keyboardTargetId === `drop-${item.id}`
                        ? Number(
                            String(keyboard.keyboardItemId).replace(
                              "number-",
                              "",
                            ),
                          )
                        : ""
                    }
                    wrong={wrong}
                    locked={showAns || lockedIds.includes(item.id)}
                    handleRemove={handleRemove}
                    register={keyboard.registerTarget}
                    onKeyDown={(event) => {
                      if (
                        !keyboard.keyboardItemId &&
                        num &&
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
                </div>
              );
            })}
          </div>

          {/* الأزرار */}
          <div className="mt-4 flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleStartAgain={handleReset}
              handleShowAnswer={handleShowAnswer}
            />
          </div>
        </div>

        {/* Overlay */}
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

                fontSize: "28px",

                fontWeight: 700,

                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {activeId.replace("number-", "")}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
