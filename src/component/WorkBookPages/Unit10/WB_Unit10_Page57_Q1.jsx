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
} from "@dnd-kit/core";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 57/SVG/6.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise A/Item_001_He_will_swim_in_the_sea.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise A/Item_002_She_won't_fly_a_kite.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise A/Item_003_They_will_go_to_the_beach.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise A/Item_004_She_will_do_her_homework.mp3";
import sentence5Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise A/Item_005_She_won't_plant_a_flower.mp3";
import sentence6Audio from "../../../assets/audio/WorkBook/unit10/Page 57 - Exercise A/Item_006_He_won't_play_the_drum.mp3";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const DRAG_COLOR = "#f6a14cff";
const BORDER_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const SENTENCES = [
  { id: 1, text: "He will swim in the sea.", audio: sentence1Audio },
  { id: 2, text: "She won't fly a kite.", audio: sentence2Audio },
  { id: 3, text: "They will go to the beach.", audio: sentence3Audio },
  { id: 4, text: "She will do her homework.", audio: sentence4Audio },
  { id: 5, text: "She won't plant a flower.", audio: sentence5Audio },
  { id: 6, text: "He won't play the drum.", audio: sentence6Audio },
];

const ITEMS = [
  { id: 1, img: img1, alt: "A girl doing her homework" },
  { id: 2, img: img2, alt: "A girl not flying a kite" },
  { id: 3, img: img3, alt: "Children going to the beach" },
  { id: 4, img: img4, alt: "A boy swimming in the sea" },
  { id: 5, img: img5, alt: "A girl not planting a flower" },
  { id: 6, img: img6, alt: "A boy not playing the drum" },
];

const CORRECT_ANSWERS = { 1: 4, 2: 2, 3: 5, 4: 3, 5: 6, 6: 1 };
const NUMBERS = [1, 2, 3, 4, 5, 6];

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

      zIndex: 99999,
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
      data-unit4-bank-item={num}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Number ${num}${disabled ? ", already used" : ""}`}
      aria-disabled={disabled}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && !disabled) {
          event.preventDefault();
          keyboard.pickItem(num);
        }
      }}
      onMouseDown={() => setDraggedNumber(num)}
      onTouchStart={() => setDraggedNumber(num)}
      style={{
        width: "clamp(38px,5vw,52px)",
        height: "clamp(38px,5vw,52px)",
        borderRadius: "50%",
        backgroundColor: disabled ? "#cfcfd4" : DRAG_COLOR,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "clamp(17px,2.2vw,26px)",
        cursor: disabled ? "not-allowed" : "grab",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        touchAction: "none",
        // transform: transform
        //   ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        //   : undefined,
        transition: "0.2s",
        boxShadow:
          draggedNumber === num
            ? "0 0 0 4px rgba(243,155,66,.35)"
            : "0 3px 10px rgba(0,0,0,.12)",
      }}
    >
      {num}
    </div>
  );
}

function DroppableImage({
  item,
  num,
  wrong,
  locked,
  showAns,
  handleRemove,
  keyboard,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: String(item.id),
  });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        keyboard.registerTarget(item.id, node);
      }}
      data-unit4-drop-slot={item.id}
      tabIndex={!locked && (keyboard.keyboardItemId !== null || num) ? 0 : -1}
      role="button"
      aria-label={`Picture ${item.id}${num ? `, number ${num}` : ", empty"}`}
      aria-disabled={locked}
      onKeyDown={(event) => {
        if (keyboard.keyboardItemId !== null) {
          keyboard.handleTargetKeyDown(event, item.id);
        } else if (num && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          handleRemove(item.id);
        }
      }}
      style={{
        position: "relative",
        width: "180px",
        // aspectRatio: "3 / 2",

        boxSizing: "border-box",
        transition: "0.25s ease",
        transform: isOver ? "scale(1.03)" : "scale(1)",
        boxShadow: isOver
          ? "0 0 0 4px rgba(243,155,66,.25)"
          : "0 3px 10px rgba(0,0,0,.08)",
      }}
    >
      <img
        src={item.img}
        alt={item.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      {/* صندوق الرقم */}
      <div
        onClick={() => handleRemove(item.id)}
        style={{
          position: "absolute",
          top: "0%",
          right: "0%",
          width: "35px",
          height: "35px",
          borderRadius: "4px",
          border: `2px solid #f39b42`,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(14px,1.8vw,22px)",
          fontWeight: 500,
          // color: wrong ? WRONG_COLOR : DRAG_COLOR,
          boxShadow: "0 2px 8px rgba(0,0,0,.15)",
          zIndex: 10,
          cursor: num && !showAns ? "pointer" : "default",
          transition: "0.25s ease",
          transform: isOver ? "scale(1.05)" : "scale(1)",
          filter: isOver ? "brightness(1.05)" : "brightness(1)",
          boxSizing: "border-box",
        }}
      >
        {keyboard.keyboardItemId !== null &&
        keyboard.keyboardTargetId === item.id ? (
          <span className="unit4-keyboard-preview">
            {keyboard.keyboardItemId}
          </span>
        ) : (
          num || ""
        )}
      </div>

      {/* بادج الخطأ */}
      {wrong && <ErrorBadge />}
    </div>
  );
}
// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit10_Page57_QA() {
  const [answers, setAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);

  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
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
  const applyDrop = (id, num) => {
    if (!num || showAns || lockedIds.includes(Number(id))) return;

    setChecked(false);

    setAnswers((prev) => {
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
  const handleRemove = (id) => {
    if (showAns || lockedIds.includes(Number(id))) return;
    const returnedNumber = answers[id];
    setChecked(false);
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[id];
      return u;
    });
    if (returnedNumber) keyboard.focusItem(returnedNumber);
  };
  const keyboard = useUnit4TabDrag({
    itemIds: NUMBERS,
    targetIds: ITEMS.map((item) => item.id),
    isItemDisabled: (num) => usedNumbers.includes(num) || showAns,
    isTargetDisabled: (id) => lockedIds.includes(Number(id)),
    onPlace: (num, id) => applyDrop(Number(id), num),
  });

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === CORRECT_ANSWERS[item.id]) correct++;
    });
    setChecked(true);
    setLockedIds(
      ITEMS.filter((item) => answers[item.id] === CORRECT_ANSWERS[item.id]).map(
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

  const handleShowAnswer = () => {
    setAnswers({ ...CORRECT_ANSWERS });
    setChecked(false);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));

    setDraggedNumber(null);
    keyboard.cancel();
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedNumber(null);

    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (id) => checked && answers[id] !== CORRECT_ANSWERS[id];

  return (
    <div className="main-container-component">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="div-forall" style={{ gap: "clamp(16px,2vw,24px)" }}>
          {/* ── العنوان ── */}
          <ExerciseHeader
            sectionLetter="A"
            title="Read, look, and number the pictures."
            subTitle="Read all future sentence to the correct picture clues first, then assign the numbers carefully so the picture or order is used correctly."
          />

          {/* ── الأرقام للسحب ── */}
          <div
            className="w-full"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(10px,1.5vw,16px)",
              flexWrap: "wrap",
            }}
          >
            {NUMBERS.map((num) => {
              return (
                <DraggableNumber
                  key={num}
                  num={num}
                  disabled={usedNumbers.includes(num) || showAns}
                  draggedNumber={draggedNumber}
                  setDraggedNumber={setDraggedNumber}
                  keyboard={keyboard}
                />
              );
            })}
          </div>

          {/* ── اليسار: الجمل | اليمين: الصور ── */}
          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "0.95fr 1.3fr",
              gap: "clamp(16px,3vw,30px)",
              alignItems: "start",
            }}
          >
            {/* الجمل */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                // gap: "clamp(14px,2vw,24px)",
              }}
            >
              {SENTENCES.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(8px,1vw,14px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "#111",
                      minWidth: "clamp(16px,1.9vw,22px)",
                      lineHeight: 1.4,
                      flexShrink: 0,
                    }}
                  >
                    {item.id}
                  </span>
                  <p
                    className="unit4-audio-control"
                    role="button"
                    tabIndex={0}
                    aria-label={`Play: ${item.text}`}
                    onClick={() => playAudio(`sentence-${item.id}`, item.audio)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`sentence-${item.id}`, item.audio);
                      }
                    }}
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#222",
                      lineHeight: 1.45,
                      // fontWeight: 500,
                    }}
                  >
                    {item.text}
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `sentence-${item.id}`}
                    />
                  </p>
                </div>
              ))}
            </div>

            {/* الصور 2×3 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0,1fr))",
                gap: "clamp(8px,1.2vw,14px)",
              }}
            >
              {ITEMS.map((item) => {
                const wrong = isWrong(item.id);
                const num = answers[item.id];

                return (
                  <DroppableImage
                    key={item.id}
                    item={item}
                    num={num}
                    wrong={wrong}
                    showAns={showAns || checked}
                    locked={lockedIds.includes(item.id)}
                    handleRemove={handleRemove}
                    keyboard={keyboard}
                  />
                );
              })}
            </div>
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
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: DRAG_COLOR,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "24px",
                boxShadow: "0 4px 12px rgba(0,0,0,.25)",
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
