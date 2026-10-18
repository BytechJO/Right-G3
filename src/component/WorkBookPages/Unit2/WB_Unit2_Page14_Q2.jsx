/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import useWorkbookUnit2TabDrag from "./useWorkbookUnit2TabDrag";
import "./workbookUnit2Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 10.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 13.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 1.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 17.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 16.svg";
import glueAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise B/Item_001_glue.mp3";
import cupAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise B/Item_002_cup.mp3";
import bugAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise B/Item_003_bug.mp3";
import tuneAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise B/Item_004_tune.mp3";
import blueAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise B/Item_005_blue.mp3";
import runAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise B/Item_006_run.mp3";

const WORD_AUDIO = {
  glue: glueAudio,
  cup: cupAudio,
  bug: bugAudio,
  tune: tuneAudio,
  blue: blueAudio,
  run: runAudio,
};

const ACTIVE_COLOR = "#f39b42";
const BORDER_COLOR = "#d9d9d9";
const ANSWER_COLOR = "#d62828";

const DRAG_ITEMS = [
  { id: 1, value: "glue" },
  { id: 2, value: "cup" },
  { id: 3, value: "bug" },
  { id: 4, value: "tune" },
  { id: 5, value: "blue" },
  { id: 6, value: "run" },
];

const ANSWERS = [
  { id: 1, correct: "glue", img: img1 },
  { id: 2, correct: "cup", img: img2 },
  { id: 3, correct: "bug", img: img3 },
  { id: 4, correct: "tune", img: img4 },
  { id: 5, correct: "blue", img: img5 },
  { id: 6, correct: "run", img: img6 },
];

// ✅ draggable wrapper (بدون ما نغير الشكل)
function DraggableWrapper({
  item,
  disabled,
  showAns,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  activeAudio,
  children,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.value,
    disabled: disabled || showAns,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };
  const pointerStart = useRef(null);
  const pointerMoved = useRef(false);

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerItem(item.value, element);
      }}
      role="button"
      tabIndex={0}
      aria-disabled={disabled || showAns}
      className="wb-unit2-audio-control wb-unit2-drag-item"
      style={{ ...style, touchAction: "none" }}
      {...listeners}
      {...attributes}
      onPointerDownCapture={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        pointerMoved.current = false;
      }}
      onPointerMoveCapture={(event) => {
        if (!pointerStart.current) return;
        if (
          Math.hypot(
            event.clientX - pointerStart.current.x,
            event.clientY - pointerStart.current.y,
          ) > 5
        )
          pointerMoved.current = true;
      }}
      onClick={(event) => {
        if (event.detail === 0) return;

        if (!pointerMoved.current) {
          onPlayAudio();
        }

        pointerStart.current = null;
        pointerMoved.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (disabled || showAns) onPlayAudio();
        else onKeyboardPick();
      }}
    >
      {children}
      <WorkbookUnit2PlayingAudioIcon active={activeAudio} />
    </div>
  );
}

// ✅ drop wrapper (بدون تغيير renderDropBox)
function DropWrapper({ id, children }) {
  const { setNodeRef } = useDroppable({ id });

  return <div ref={setNodeRef}>{children}</div>;
}

export default function WB_Unit3_Page17_QB() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [shakeGrid, setShakeGrid] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );
  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (wordValue, boxKey) => {
    if (showAns || correctIds.includes(boxKey)) return;
    const item = DRAG_ITEMS.find((entry) => entry.value === wordValue);
    if (!item) return;
    const newAnswers = { ...answers };

    Object.keys(newAnswers).forEach((key) => {
      if (newAnswers[key]?.dragId === item.id) {
        delete newAnswers[key];
      }
    });

    newAnswers[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

    setAnswers(newAnswers);
    setCheckedIds((previous) => previous.filter((id) => id !== boxKey));
  };

  const keyboard = useWorkbookUnit2TabDrag({
    itemIds: DRAG_ITEMS.map((item) => item.value),
    targetIds: ANSWERS.map((item) => `a-${item.id}`),
    isItemDisabled: (id) =>
      usedDragIds.some(
        (dragId) => DRAG_ITEMS.find((item) => item.id === dragId)?.value === id,
      ) || showAns,
    isTargetDisabled: (id) => correctIds.includes(id) || showAns,
    onPick: (id) => playAudio(`word-${id}`, WORD_AUDIO[id]),
    onPlace: applyDrop,
  });

  // ✅ dnd-kit handler
  const handleDragEnd = (event) => {
    if (showAns) return;

    const { active, over } = event;
    if (!over) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
      return;
    }

    applyDrop(String(active.id), String(over.id));
  };

  const handleRemoveAnswer = (boxKey) => {
    if (showAns || correctIds.includes(boxKey)) return;
    const removedWord = answers[boxKey]?.value;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setCheckedIds((previous) => previous.filter((id) => id !== boxKey));
    if (removedWord) keyboard.focusItem(removedWord);
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === ANSWERS.length) return;

    const allAnswered = ANSWERS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = ANSWERS.length;

    ANSWERS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
    });

    setCheckedIds(ANSWERS.map((item) => `a-${item.id}`));
    setCorrectIds(
      ANSWERS.filter(
        (item) => answers[`a-${item.id}`]?.value === item.correct,
      ).map((item) => `a-${item.id}`),
    );

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    ANSWERS.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setCheckedIds(ANSWERS.map((item) => `a-${item.id}`));
    setCorrectIds(ANSWERS.map((item) => `a-${item.id}`));
    setShowAns(true);
    keyboard.cancel();
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    setShakeGrid(false);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (item) => {
    if (!checkedIds.includes(`a-${item.id}`)) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  const renderDropBox = (boxKey, wrong) => {
    const value = answers[boxKey]?.value || "";
    const locked = showAns || correctIds.includes(boxKey);

    const preview =
      keyboard.keyboardTargetId === boxKey ? keyboard.keyboardItemId : "";

    return (
      <div
        ref={(element) => {
          keyboard.registerTarget(boxKey, element);
        }}
        role="button"
        tabIndex={!locked && (keyboard.keyboardItemId || value) ? 0 : -1}
        aria-disabled={locked}
        onClick={() => handleRemoveAnswer(boxKey)}
        onKeyDown={(event) => {
          if (
            !keyboard.keyboardItemId &&
            value &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            handleRemoveAnswer(boxKey);
            return;
          }

          keyboard.handleTargetKeyDown(event, boxKey);
        }}
        className="wb-unit2-drop-target"
        style={{
          width: "100%",
          minWidth: "220px",
          minHeight: "42px",
          borderBottom: wrong ? "2px solid red" : "1px solid #2f2f2f",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          textAlign: "center",
          fontSize: "clamp(12px, 1.7vw, 18px)",
          color: "#111",
          cursor: value && !showAns ? "pointer" : "default",
          position: "relative",
        }}
      >
        <span className={preview ? "wb-unit2-keyboard-preview" : undefined}>
          {preview || value}
        </span>

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
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
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {" "}
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "35px" }}>
          <ExerciseHeader
            sectionLetter="B"
            title="Look and write."
            subTitle="Identify each u-sound word to the matching picture before dragging it, then place one item at a time and review every target before checking."
          />
          {/* 🔹 نفس UI بدون تغيير */}
          <div className="w-full mb-10">
            <div
              className="mb-5"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ display: "flex", gap: "25px", flexWrap: "wrap" }}>
                {DRAG_ITEMS.map((item) => {
                  const isUsed = usedDragIds.includes(item.id);

                  return (
                    <DraggableWrapper
                      key={item.id}
                      item={item}
                      disabled={isUsed}
                      showAns={showAns}
                      registerItem={keyboard.registerItem}
                      onKeyboardPick={() => keyboard.pickItem(item.value)}
                      onPlayAudio={() =>
                        playAudio(`word-${item.value}`, WORD_AUDIO[item.value])
                      }
                      activeAudio={activeAudioKey === `word-${item.value}`}
                    >
                      <div
                        style={{
                          padding: "8px 25px",
                          borderRadius: "16px",
                          border: `1px solid ${
                            isUsed ? BORDER_COLOR : ACTIVE_COLOR
                          }`,
                          opacity: isUsed ? 0.6 : 1,
                          cursor: isUsed || showAns ? "not-allowed" : "grab",
                        }}
                      >
                        {item.value}
                      </div>
                    </DraggableWrapper>
                  );
                })}
              </div>
            </div>

            <div
              className={shakeGrid ? "wb-unit2-invalid-drop-shake" : undefined}
              onAnimationEnd={() => setShakeGrid(false)}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
              }}
            >
              {ANSWERS.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 justify-center items-center w-full"
                >
                  <div className="flex gap-5">
                    <span className="text-[20px] font-semibold">
                      {item.id}{" "}
                    </span>
                    <img
                      src={item.img}
                      alt={`Illustration of ${item.correct}`}
                      style={{ width: "90px", height: "110px" }}
                    />
                  </div>
                  <DropWrapper id={`a-${item.id}`}>
                    {renderDropBox(`a-${item.id}`, isWrong(item))}
                  </DropWrapper>{" "}
                </div>
              ))}
            </div>
          </div>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </DndContext>
  );
}
