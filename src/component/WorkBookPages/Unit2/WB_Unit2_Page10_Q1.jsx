/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import useWorkbookUnit2TabDrag from "./useWorkbookUnit2TabDrag";
import "./workbookUnit2Interactions.css";

import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 10/SVG/Asset 6.svg";
import franceAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise C/Item_001_France.mp3";
import nileAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise C/Item_002_Nile_River.mp3";
import pyramidsAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise C/Item_003_pyramids.mp3";
import towerAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise C/Item_004_clock_tower.mp3";
import egyptAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise C/Item_005_Egypt.mp3";
import busAudio from "../../../assets/audio/WorkBook/unit2/Page 10 - Exercise C/Item_006_bus.mp3";

const WORD_AUDIO = {
  France: franceAudio,
  "Nile River": nileAudio,
  pyramids: pyramidsAudio,
  "clock tower": towerAudio,
  Egypt: egyptAudio,
  bus: busAudio,
};

const DRAG_ITEMS = [
  { id: 1, value: "France" },
  { id: 2, value: "Nile River" },
  { id: 3, value: "pyramids" },
  { id: 4, value: "clock tower" },
  { id: 5, value: "Egypt" },
  { id: 6, value: "bus" },
];

const ANSWERS = [
  { id: 1, correct: "France", img: img1 },
  { id: 2, correct: "clock tower", img: img2 },
  { id: 3, correct: "Nile River", img: img3 },
  { id: 4, correct: "bus", img: img4 },
  { id: 5, correct: "pyramids", img: img5 },
  { id: 6, correct: "Egypt", img: img6 },
];

/* ================= DRAG ================= */
const DraggableWord = ({
  item,
  disabled,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  activeAudio,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.value,
    data: item,
    disabled,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;
  const pointerStart = useRef(null);
  const pointerMoved = useRef(false);

  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(item.value, element);
      }}
      {...listeners}
      {...attributes}
      aria-disabled={disabled}
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
        if (event.detail === 0 || pointerMoved.current) return;

        onPlayAudio();

        pointerStart.current = null;
        pointerMoved.current = false;
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (disabled) onPlayAudio();
        else onKeyboardPick();
      }}
      style={{ ...style, touchAction: "none" }}
      className={`wb-unit2-audio-control wb-unit2-drag-item px-4 py-2 rounded-xl border-1 text-sm font-medium transition
        ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-200 cursor-pointer"
            : "border-orange-400 cursor-grab hover:scale-105"
        }
      `}
    >
      {item.value}
      <WorkbookUnit2PlayingAudioIcon active={activeAudio} />
    </button>
  );
};

/* ================= DROP ================= */
const DropBox = ({
  id,
  value,
  isWrong,
  locked,
  preview,
  tabIndex,
  registerTarget,
  onRemove,
  onKeyDown,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(id, element);
      }}
      role="button"
      tabIndex={tabIndex}
      aria-disabled={locked}
      onClick={() => value && !locked && onRemove()}
      onKeyDown={onKeyDown}
      className={`relative w-full h-[42px] flex items-end justify-center border-b-1 text-lg
        ${isOver ? "border-orange-400 bg-orange-50" : "border-[#2e3192]"}
        ${isWrong ? "border-red-500" : ""}
      `}
    >
      <span className={preview ? "wb-unit2-keyboard-preview" : undefined}>
        {preview || value}
      </span>
      {isWrong && (
        <div
          style={{
            position: "absolute",
            top: "clamp(-8px, -0.8vw, -7px)",
            right: "clamp(-8px, -0.8vw, -7px)",
            width: "clamp(16px, 2.2vw, 22px)",
            height: "clamp(16px, 2.2vw, 22px)",
            borderRadius: "50%",
            backgroundColor: "red",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "clamp(9px, 1vw, 12px)",
            fontWeight: 700,
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.18)",
            zIndex: 2,
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

export default function WB_LookAndWrite_PageC() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const [shakeGrid, setShakeGrid] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    }),
  );
  const usedWords = Object.values(answers).map((a) => a.value);

  /* ================= DROP LOGIC ================= */
  const placeWord = (wordValue, dropId) => {
    if (showAns || correctIds.includes(dropId)) return;

    const word = DRAG_ITEMS.find((item) => item.value === wordValue);
    if (!word) return;

    setAnswers((prev) => {
      const updated = { ...prev };

      // remove from old place
      Object.keys(updated).forEach((key) => {
        if (updated[key]?.value === wordValue) {
          delete updated[key];
        }
      });

      updated[dropId] = word;

      return updated;
    });

    setCheckedIds((previous) => previous.filter((id) => id !== dropId));
  };

  const keyboard = useWorkbookUnit2TabDrag({
    itemIds: DRAG_ITEMS.map((item) => item.value),
    targetIds: ANSWERS.map((item) => `a-${item.id}`),
    isItemDisabled: (id) => usedWords.includes(id) || showAns,
    isTargetDisabled: (id) => correctIds.includes(id) || showAns,
    onPick: (id) => playAudio(`word-${id}`, WORD_AUDIO[id]),
    onPlace: placeWord,
  });

  const handleDragEnd = ({ active, over }) => {
    setActiveWord(null);
    if (!over || showAns) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
      return;
    }

    placeWord(String(active.id), String(over.id));
  };

  const removeAnswer = (dropId) => {
    if (showAns || correctIds.includes(dropId)) return;
    const removedWord = answers[dropId]?.value;
    setAnswers((previous) => {
      const next = { ...previous };
      delete next[dropId];
      return next;
    });
    setCheckedIds((previous) => previous.filter((id) => id !== dropId));
    if (removedWord) keyboard.focusItem(removedWord);
  };

  /* ================= CHECK ================= */
  const handleCheck = () => {
    if (showAns || correctIds.length === ANSWERS.length) return;

    const allAnswered = ANSWERS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ANSWERS.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) score++;
    });

    setCheckedIds(ANSWERS.map((item) => `a-${item.id}`));
    setCorrectIds(
      ANSWERS.filter(
        (item) => answers[`a-${item.id}`]?.value === item.correct,
      ).map((item) => `a-${item.id}`),
    );

    const msg = `Score: ${score} / ${ANSWERS.length}`;

    if (score === ANSWERS.length) ValidationAlert.success(msg);
    else if (score > 0) ValidationAlert.warning(msg);
    else ValidationAlert.error(msg);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ANSWERS.forEach((item) => {
      const match = DRAG_ITEMS.find((d) => d.value === item.correct);
      filled[`a-${item.id}`] = match;
    });

    setAnswers(filled);
    setCheckedIds(ANSWERS.map((item) => `a-${item.id}`));
    setCorrectIds(ANSWERS.map((item) => `a-${item.id}`));
    setShowAns(true);
    setActiveWord(null);
    keyboard.cancel();
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    setActiveWord(null);
    setShakeGrid(false);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (item) => {
    if (!checkedIds.includes(`a-${item.id}`)) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveWord(e.active.data.current)}
      onDragEnd={handleDragEnd}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "25px" }}>
          <ExerciseHeader
            sectionLetter="C"
            title="Look and write."
            subTitle="Identify each place or transportation word to the matching picture before dragging it, then place one item at a time and review every target before checking."
          />
          <div className="w-full">
            {/* WORD BANK */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 ">
              {DRAG_ITEMS.map((item) => (
                <DraggableWord
                  key={item.id}
                  item={item}
                  disabled={usedWords.includes(item.value)}
                  registerItem={keyboard.registerItem}
                  onKeyboardPick={() => keyboard.pickItem(item.value)}
                  onPlayAudio={() =>
                    playAudio(`word-${item.value}`, WORD_AUDIO[item.value])
                  }
                  activeAudio={activeAudioKey === `word-${item.value}`}
                />
              ))}
            </div>

            {/* GRID */}
            <div
              className={`grid grid-cols-3 gap-10 ${shakeGrid ? "wb-unit2-invalid-drop-shake" : ""}`}
              onAnimationEnd={() => setShakeGrid(false)}
            >
              {ANSWERS.map((item) => (
                <div key={item.id} className="flex flex-col items-center gap-3">
                  <img
                    src={item.img}
                    alt={
                      item.id === 1
                        ? "A map of France"
                        : item.id === 2
                          ? "A clock tower"
                          : item.id === 3
                            ? "A map showing the Nile River"
                            : item.id === 4
                              ? "A double-decker bus"
                              : item.id === 5
                                ? "The pyramids"
                                : "A map of Egypt"
                    }
                    className="h-32 object-contain"
                    style={{ height: "110px" }}
                  />

                  <DropBox
                    id={`a-${item.id}`}
                    value={answers[`a-${item.id}`]?.value}
                    isWrong={isWrong(item)}
                    locked={showAns || correctIds.includes(`a-${item.id}`)}
                    preview={
                      keyboard.keyboardTargetId === `a-${item.id}`
                        ? keyboard.keyboardItemId
                        : ""
                    }
                    tabIndex={
                      !showAns &&
                      !correctIds.includes(`a-${item.id}`) &&
                      (keyboard.keyboardItemId || answers[`a-${item.id}`])
                        ? 0
                        : -1
                    }
                    registerTarget={keyboard.registerTarget}
                    onRemove={() => removeAnswer(`a-${item.id}`)}
                    onKeyDown={(event) => {
                      if (
                        !keyboard.keyboardItemId &&
                        answers[`a-${item.id}`] &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        removeAnswer(`a-${item.id}`);
                        return;
                      }
                      keyboard.handleTargetKeyDown(event, `a-${item.id}`);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* BUTTONS */}
          <div className="flex justify-center">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>

        {/* DRAG PREVIEW */}
        <DragOverlay>
          {activeWord && (
            <div
              className="wb-unit2-audio-control wb-unit2-drag-item px-4 py-2 rounded-xl border-1 text-sm font-medium"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #fb923c",
                color: "#000",
                whiteSpace: "nowrap",
                width: "max-content",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                boxShadow: "none",
                pointerEvents: "none",
              }}
            >
              {activeWord.value}
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
