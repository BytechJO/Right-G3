/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit1PlayingAudioIcon from "./WorkbookUnit1PlayingAudioIcon";
import useWorkbookUnit1Audio from "./useWorkbookUnit1Audio";
import useWorkbookUnit1TabDrag from "./useWorkbookUnit1TabDrag";
import scoreboardAudio from "../../../assets/audio/WorkBook/unit1/Page 6 - Exercise H/Item_001_scoreboard.mp3";
import refereeAudio from "../../../assets/audio/WorkBook/unit1/Page 6 - Exercise H/Item_002_referee.mp3";
import whistleAudio from "../../../assets/audio/WorkBook/unit1/Page 6 - Exercise H/Item_003_whistle.mp3";
import bikeAudio from "../../../assets/audio/WorkBook/unit1/Page 6 - Exercise H/Item_004_bike.mp3";
import "./workbookUnit1Interactions.css";

import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/0000.svg";
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/00000.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 12.svg";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const DRAG_COLOR = "#f6a14cff";
const BORDER_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const SENTENCES = [
  { id: 1, text: "scoreboard", audio: scoreboardAudio },
  { id: 2, text: "referee", audio: refereeAudio },
  { id: 3, text: "whistle", audio: whistleAudio },
  { id: 4, text: "bike", audio: bikeAudio },
];

const ITEMS = [
  { id: 3, img: img2, alt: "whistle" },
  { id: 1, img: img1, alt: "scoreboard" },
  { id: 2, img: img3, alt: "referee" },
  { id: 4, img: img4, alt: "bike" },
];

const NUMBERS = [1, 2, 3, 4];
const CORRECT_ANSWERS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
};

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
  registerItem,
  onKeyDown,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: String(num),
    disabled,
  });

  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(String(num), element);
      }}
      {...listeners}
      {...attributes}
      onMouseDown={() => setDraggedNumber(num)}
      onTouchStart={() => setDraggedNumber(num)}
      onKeyDown={onKeyDown}
      className="wb-unit1-drag-item"
      style={{
        width: "clamp(38px,5vw,52px)",
        height: "clamp(38px,5vw,52px)",
        border: 0,
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

        transition: "0.2s",
        boxShadow:
          draggedNumber === num
            ? "0 0 0 4px rgba(243,155,66,.35)"
            : "0 3px 10px rgba(0,0,0,.12)",
      }}
    >
      {num}
    </button>
  );
}

function DroppableImage({
  item,
  num,
  wrong,
  locked,
  handleRemove,
  registerTarget,
  onKeyDown,
  tabIndex,
  previewNumber,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: String(item.id),
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(`target-${item.id}`, element);
      }}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={`wb-unit1-drop-target ${previewNumber ? "wb-unit1-keyboard-preview" : ""}`}
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
          cursor: num && !locked ? "pointer" : "default",
          transition: "0.25s ease",
          transform: isOver ? "scale(1.05)" : "scale(1)",
          filter: isOver ? "brightness(1.05)" : "brightness(1)",
          boxSizing: "border-box",
        }}
      >
        {previewNumber || num || ""}
      </div>

      {/* بادج الخطأ */}
      {wrong && <ErrorBadge />}
    </div>
  );
}
// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit1_Page6_QH() {
  const [answers, setAnswers] = useState({});
  const [draggedNumber, setDraggedNumber] = useState(null);

  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [correctTargets, setCorrectTargets] = useState([]);
  const [shakeGrid, setShakeGrid] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit1Audio();
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
  const keyboard = useWorkbookUnit1TabDrag({
    itemIds: NUMBERS.map(String),
    targetIds: ITEMS.map((item) => `target-${item.id}`),
    isItemDisabled: (id) => usedNumbers.includes(Number(id)) || showAns,
    isTargetDisabled: (id) =>
      correctTargets.includes(Number(id.replace("target-", ""))) || showAns,
    onPlace: (itemId, targetId) =>
      applyDrop(Number(targetId.replace("target-", "")), Number(itemId)),
  });
  const applyDrop = (id, num) => {
    if (!num || showAns || correctTargets.includes(id)) return;

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

    if (!over || showAns) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
      return;
    }

    applyDrop(Number(over.id), Number(active.id));
  };
  const handleRemove = (id) => {
    if (showAns || correctTargets.includes(id)) return;
    setChecked(false);
    setAnswers((prev) => {
      const u = { ...prev };
      delete u[id];
      return u;
    });
  };

  // ── Check / Show / Reset ──
  const handleCheck = () => {
    if (showAns || correctTargets.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first! ✏️");
      return;
    }
    const nextCorrect = ITEMS.filter(
      (item) => answers[item.id] === CORRECT_ANSWERS[item.id],
    ).map((item) => item.id);
    const correct = nextCorrect.length;
    setCorrectTargets(nextCorrect);
    setChecked(true);
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
    setChecked(true);
    setShowAns(true);
    setCorrectTargets(ITEMS.map((item) => item.id));

    setDraggedNumber(null);
    keyboard.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setDraggedNumber(null);

    setChecked(false);
    setShowAns(false);
    setCorrectTargets([]);
    setShakeGrid(false);
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
            sectionLetter="H"
            title="Read, look, and number."
            subTitle="Read all scoreboard, referee, whistle, and bike picture clues first, then assign each number to its matching picture."
          />

          {/* ── الأرقام للسحب ── */}
          <div
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
                  registerItem={keyboard.registerItem}
                  onKeyDown={(event) =>
                    keyboard.handleItemKeyDown(event, String(num))
                  }
                />
              );
            })}
          </div>

          {/* ── اليسار: الجمل | اليمين: الصور ── */}
          <div
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
                gap: "clamp(14px,2vw,24px)",
              }}
            >
              {SENTENCES.map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className="wb-unit1-audio-control wb-unit1-interactive"
                  onClick={() => playAudio(`word-${item.id}`, item.audio)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`word-${item.id}`, item.audio);
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    border: `1px solid ${DRAG_COLOR}`,
                    padding: "10px",
                    borderRadius: "9px",
                    width: "60%",
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
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#222",
                      lineHeight: 1.45,
                      // fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </p>
                  <WorkbookUnit1PlayingAudioIcon
                    active={activeAudioKey === `word-${item.id}`}
                  />
                </div>
              ))}
            </div>

            {/* الصور 2×3 */}
            <div
              className={shakeGrid ? "wb-unit1-invalid-drop-shake" : undefined}
              onAnimationEnd={(event) => {
                if (event.animationName === "shake-invalid-drop-wb-unit1")
                  setShakeGrid(false);
              }}
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
                    locked={showAns || correctTargets.includes(item.id)}
                    handleRemove={handleRemove}
                    registerTarget={keyboard.registerTarget}
                    tabIndex={
                      !showAns &&
                      !correctTargets.includes(item.id) &&
                      (keyboard.keyboardItemId || num)
                        ? 0
                        : -1
                    }
                    previewNumber={
                      keyboard.keyboardTargetId === `target-${item.id}`
                        ? keyboard.keyboardItemId
                        : null
                    }
                    onKeyDown={(event) => {
                      /*
      إذا ما في رقم picked
      والخانة فيها رقم:
      Enter / Space يرجعه للبنك
    */
                      if (
                        !keyboard.keyboardItemId &&
                        num &&
                        !showAns &&
                        !correctTargets.includes(item.id) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        event.stopPropagation();

                        handleRemove(item.id);

                        return;
                      }

                      /*
      إذا في رقم picked:
      نفس drag keyboard العادي
    */
                      keyboard.handleTargetKeyDown(event, `target-${item.id}`);
                    }}
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
              checkDisabled={showAns || correctTargets.length === ITEMS.length}
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
