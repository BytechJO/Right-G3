/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit1PlayingAudioIcon from "./WorkbookUnit1PlayingAudioIcon";
import useWorkbookUnit1Audio from "./useWorkbookUnit1Audio";
import useWorkbookUnit1TabDrag from "./useWorkbookUnit1TabDrag";
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 7/SVG/Asset 1.svg";
import tallAudio from "../../../assets/audio/WorkBook/unit1/Page 7 - Exercise I/Item_001_tall.mp3";
import shortAudio from "../../../assets/audio/WorkBook/unit1/Page 7 - Exercise I/Item_002_short.mp3";
import fastAudio from "../../../assets/audio/WorkBook/unit1/Page 7 - Exercise I/Item_003_fast.mp3";
import slowAudio from "../../../assets/audio/WorkBook/unit1/Page 7 - Exercise I/Item_004_slow.mp3";
import oldAudio from "../../../assets/audio/WorkBook/unit1/Page 7 - Exercise I/Item_005_old.mp3";
import youngAudio from "../../../assets/audio/WorkBook/unit1/Page 7 - Exercise I/Item_006_young.mp3";
import "./workbookUnit1Interactions.css";

import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

const ACTIVE_COLOR = "#f89631";
const BORDER_COLOR = "#d9d9d9";

const ANSWERS = [
  { id: 1, correct: "tall" },
  { id: 2, correct: "short" },
  { id: 3, correct: "fast" },
  { id: 4, correct: "slow" },
  { id: 5, correct: "old" },
  { id: 6, correct: "young" },
];

const DRAG_ITEMS = [
  { id: 1, value: "tall", audio: tallAudio },
  { id: 2, value: "short", audio: shortAudio },
  { id: 3, value: "fast", audio: fastAudio },
  { id: 4, value: "slow", audio: slowAudio },
  { id: 5, value: "old", audio: oldAudio },
  { id: 6, value: "young", audio: youngAudio },
];

/* ================= DRAG ================= */
function DraggableItem({
  item,
  disabled,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  active,
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: String(item.id),
    data: item,
    disabled,
  });

  const style = { opacity: isDragging ? 0.5 : 1 };
  const pointerStartRef = useRef(null);
  const pointerMovedRef = useRef(false);

  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(String(item.id), element);
      }}
      {...listeners}
      {...attributes}
      aria-disabled={disabled}
      onPointerDownCapture={(event) => {
        pointerStartRef.current = { x: event.clientX, y: event.clientY };
        pointerMovedRef.current = false;
      }}
      onPointerMoveCapture={(event) => {
        if (!pointerStartRef.current) return;
        const dx = event.clientX - pointerStartRef.current.x;
        const dy = event.clientY - pointerStartRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > 5) pointerMovedRef.current = true;
      }}
      onPointerUpCapture={() =>
        window.requestAnimationFrame(() => {
          pointerStartRef.current = null;
        })
      }
      onClick={() => {
        if (pointerMovedRef.current || isDragging) {
          pointerMovedRef.current = false;
          return;
        }
        onPlayAudio();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        if (disabled) onPlayAudio();
        else onKeyboardPick();
      }}
      style={style}
      className={`wb-unit1-audio-control wb-unit1-drag-item h-[40px] w-[70px] flex items-center justify-center rounded-xl border-1 font-medium text-[17px] touch-none transition-all
        ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            : "bg-white text-gray-800 border-orange-400 cursor-grab hover:scale-105 hover:shadow-md"
        }`}
    >
      {item.value}
      <WorkbookUnit1PlayingAudioIcon active={active} />
    </button>
  );
}

/* ================= DROP ================= */
function DropBox({
  id,
  value,
  wrong,
  locked,
  onRemove,
  registerTarget,
  onKeyDown,
  tabIndex,
  preview,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(id, element);
      }}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      onClick={() => value && !locked && onRemove(id)}
      className={`wb-unit1-drop-target relative w-full max-w-[320px] h-[42px] flex items-center px-2 text-[20px] font-medium border-b-1 transition-all ${!locked ? "cursor-pointer hover:text-red-600" : "cursor-default"}
        ${isOver ? "border-orange-500 bg-orange-50 scale-105" : ""}
        ${wrong ? "border-red-500" : "border-gray-400"}
      `}
    >
      {preview ? (
        <span className="wb-unit1-keyboard-preview">{preview}</span>
      ) : (
        value
      )}

      {wrong && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white shadow">
          ✕
        </div>
      )}
    </div>
  );
}

/* ================= MAIN ================= */
export default function WB_Vocabulary_Page214_QI() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [correctTargets, setCorrectTargets] = useState([]);
  const [shakeAnswers, setShakeAnswers] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit1Audio();

  const sensors = useSensors(useSensor(PointerSensor));

  const usedIds = Object.values(answers).map((a) => a?.dragId);
  const keyboard = useWorkbookUnit1TabDrag({
    itemIds: DRAG_ITEMS.map((item) => String(item.id)),
    targetIds: ANSWERS.map((item) => `a-${item.id}`),
    isItemDisabled: (id) => usedIds.includes(Number(id)) || showAns,
    isTargetDisabled: (id) =>
      correctTargets.includes(Number(id.replace("a-", ""))) || showAns,
    onPick: (id) => {
      const item = DRAG_ITEMS.find((entry) => String(entry.id) === id);
      playAudio(`word-${id}`, item.audio);
    },
    onPlace: (itemId, targetId) => {
      const item = DRAG_ITEMS.find((entry) => String(entry.id) === itemId);
      applyDrop(targetId, item);
    },
  });

  const applyDrop = (boxKey, item) => {
    setAnswers((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((k) => {
        if (updated[k]?.dragId === item.id) delete updated[k];
      });

      updated[boxKey] = { dragId: item.id, value: item.value };
      return updated;
    });

    setShowResults(false);
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || showAns) {
      setShakeAnswers(false);
      window.requestAnimationFrame(() => setShakeAnswers(true));
      setActiveItem(null);
      return;
    }
    applyDrop(String(over.id), active.data.current);
    setActiveItem(null);
  };

  const handleRemove = (key) => {
    const answerId = Number(key.replace("a-", ""));
    if (showAns || correctTargets.includes(answerId)) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleCheck = () => {
    if (showAns || correctTargets.length === ANSWERS.length) return;

    const allAnswered = ANSWERS.every((item) => answers[`a-${item.id}`]?.value);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const nextCorrect = ANSWERS.filter(
      (item) => answers[`a-${item.id}`]?.value === item.correct,
    ).map((item) => item.id);
    const score = nextCorrect.length;

    setCorrectTargets(nextCorrect);
    setShowResults(true);

    const total = ANSWERS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ANSWERS.forEach((item) => {
      filled[`a-${item.id}`] = {
        dragId: item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowAns(true);
    setShowResults(true);
    setCorrectTargets(ANSWERS.map((item) => item.id));
    keyboard.cancel();
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setCorrectTargets([]);
    setShakeAnswers(false);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[`a-${item.id}`]?.value !== item.correct;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveItem(active.data.current)}
      onDragEnd={handleDragEnd}
    >
      <div className="main-container-component">
        <div className="div-forall mb-15" style={{ gap: "20px" }}>
          <ExerciseHeader
            sectionLetter="I"
            title="Look and write a vocabulary word."
            subTitle="Identify each adjective for the numbered people in the park, then place one word at a time and review every target before checking."
          />
          <div className="w-full flex justify-center">
            <div className="flex flex-col gap-10 items-center justify-center w-[80%] max-w-[950px] mx-auto">
              {" "}
              {/* IMAGE */}
              <img
                src={exerciseImg}
                alt="People of different heights and ages in a park, with children riding bicycles at different speeds"
                className="object-contain mx-auto"
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  height: "auto",
                }}
              />
              {/* WORD BANK */}
              <div className="flex flex-wrap justify-between gap-4 w-[100%]">
                {" "}
                {DRAG_ITEMS.map((item) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    disabled={usedIds.includes(item.id) || showAns}
                    registerItem={keyboard.registerItem}
                    onKeyboardPick={() => keyboard.pickItem(String(item.id))}
                    onPlayAudio={() => playAudio(`word-${item.id}`, item.audio)}
                    active={activeAudioKey === `word-${item.id}`}
                  />
                ))}
              </div>
              {/* ANSWERS */}
              <div
                className={`grid grid-cols-2 gap-x-12 gap-y-6 w-full max-w-[800px] mx-auto ${
                  shakeAnswers ? "wb-unit1-invalid-drop-shake" : ""
                }`}
                onAnimationEnd={(event) => {
                  if (event.animationName === "shake-invalid-drop-wb-unit1") {
                    setShakeAnswers(false);
                  }
                }}
              >
                {ANSWERS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="font-bold">{item.id}</span>

                    <DropBox
                      id={`a-${item.id}`}
                      value={answers[`a-${item.id}`]?.value}
                      wrong={isWrong(item)}
                      locked={showAns || correctTargets.includes(item.id)}
                      onRemove={handleRemove}
                      registerTarget={keyboard.registerTarget}
                      tabIndex={
                        !showAns &&
                        !correctTargets.includes(item.id) &&
                        (keyboard.keyboardItemId ||
                          answers[`a-${item.id}`]?.value)
                          ? 0
                          : -1
                      }
                      preview={
                        keyboard.keyboardTargetId === `a-${item.id}`
                          ? DRAG_ITEMS.find(
                              (entry) =>
                                String(entry.id) === keyboard.keyboardItemId,
                            )?.value
                          : null
                      }
                      onKeyDown={(event) => {
                        const value = answers[`a-${item.id}`]?.value;

                        /*
      إذا ما في كلمة picked
      والخانة فيها كلمة:
      Enter / Space يشيلها من الخانة
    */
                        if (
                          !keyboard.keyboardItemId &&
                          value &&
                          !showAns &&
                          !correctTargets.includes(item.id) &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          event.stopPropagation();

                          handleRemove(`a-${item.id}`);

                          return;
                        }

                        /*
      إذا في كلمة picked:
      نفس keyboard drag العادي
    */
                        keyboard.handleTargetKeyDown(event, `a-${item.id}`);
                      }}
                    />
                  </div>
                ))}
              </div>
              <Button
                checkAnswers={handleCheck}
                handleShowAnswer={handleShowAnswer}
                handleStartAgain={handleStartAgain}
                checkDisabled={
                  showAns || correctTargets.length === ANSWERS.length
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* DRAG OVERLAY */}
      <DragOverlay>
        {activeItem && (
          <div className="px-4 py-2 bg-white border-1 border-orange-400 rounded-lg shadow-xl">
            {activeItem.value}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
