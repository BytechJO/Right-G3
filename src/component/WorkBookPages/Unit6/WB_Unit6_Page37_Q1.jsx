import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import "../../StudentPages/unit4/unit4Interactions.css";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.3.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.2.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 37/I.4.svg";
import julyAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise I/Item_001_It's_July.mp3";
import aprilAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise I/Item_002_It's_April.mp3";
import septemberAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise I/Item_003_It's_September.mp3";
import novemberAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise I/Item_004_It's_November.mp3";
import questionAudio from "../../../assets/audio/WorkBook/unit6/Page 37 - Exercise I/Item_005_What_month_is_it.mp3";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const HOVER_COLOR = "#f59e0b";
const SOFT_COLOR = "#ffca94";
const LINE_COLOR = "#333";

/* ───────── Draggable ───────── */
function DraggableItem({
  item,
  disabled,
  register,
  active,
  onClick,
  onKeyDown,
}) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
    disabled,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className="unit4-audio-control unit4-interactive"
      style={{
        // transform: transform
        //   ? `translate(${transform.x}px, ${transform.y}px)`
        //   : undefined,
        padding: "8px 14px",
        borderRadius: "12px",
        border: `1px solid ${BORDER_COLOR}`,
        background: disabled ? "#eee" : "",
        opacity: disabled ? 0.5 : 1,
        touchAction: "none",
        cursor: disabled ? "not-allowed" : "grab",
        fontWeight: "600",
        // boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Unit4PlayingAudioIcon active={active} />
      {item.value}
    </div>
  );
}

/* ───────── Drop ───────── */
function DropBox({ id, children, wrong, keyboardActive }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        minHeight: "38px",
        borderBottom: `2px solid ${
          wrong ? WRONG_COLOR : isOver ? HOVER_COLOR : LINE_COLOR
        }`,
        background: isOver || keyboardActive ? "#fce8d3" : "",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}

/* ───────── Data ───────── */
const ITEMS = [
  {
    id: 1,
    img: img1,
    example: false,
    question: "What month is it ?",
    answer: "It's July.",
  },
  {
    id: 2,
    img: img2,
    example: false,
    question: "What month is it ?",
    answer: "It's April.",
  },
  {
    id: 3,
    img: img3,
    example: false,
    question: "What month is it ?",
    answer: "It's September.",
  },
  {
    id: 4,
    img: img4,
    example: false,
    question: "What month is it ?",
    answer: "It's November.",
  },
];

const DRAG_ITEMS = ITEMS.filter((i) => !i.example).map((i) => ({
  id: `ans-${i.id}`,
  value: i.answer,
}));
const ANSWER_AUDIO = {
  "ans-1": julyAudio,
  "ans-2": aprilAudio,
  "ans-3": septemberAudio,
  "ans-4": novemberAudio,
};
const IMAGE_ALT = {
  1: "A calendar showing the number 7 for July",
  2: "A calendar showing the number 4 for April",
  3: "A calendar showing the number 9 for September",
  4: "A calendar showing the number 11 for November",
};

/* ───────── Component ───────── */
export default function SB_ReadLookWrite_PageI() {
  const [answers, setAnswers] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [shakeDrops, setShakeDrops] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const usedIds = Object.values(answers).map((a) => a.dragId);
  const tabDrag = useUnit4TabDrag({
    itemIds: DRAG_ITEMS.map((item) => item.id),
    targetIds: ITEMS.map((item) => `a-${item.id}`),
    isItemDisabled: (id) => usedIds.includes(id) || showAns,
    isTargetDisabled: (id) =>
      lockedIds.includes(Number(String(id).replace("a-", ""))) || showAns,
    onPick: (id) => playAudio(`answer-${id}`, ANSWER_AUDIO[id]),
    onPlace: (itemId, boxKey) => applyDrop(boxKey, itemId),
  });

  const applyDrop = (boxKey, itemId) => {
    const targetId = Number(String(boxKey).replace("a-", ""));
    if (showAns || lockedIds.includes(targetId)) return;
    const previousBoxKey = Object.keys(answers).find(
      (key) => answers[key]?.dragId === itemId,
    );
    const previousTargetId = previousBoxKey
      ? Number(previousBoxKey.replace("a-", ""))
      : null;
    const item = DRAG_ITEMS.find((i) => i.id === itemId);

    const updated = { ...answers };

    Object.keys(updated).forEach((k) => {
      if (updated[k]?.dragId === itemId) delete updated[k];
    });

    updated[boxKey] = { dragId: item.id, value: item.value };

    setAnswers(updated);
    setWrongIds((previous) =>
      previous.filter(
        (id) =>
          id !== targetId &&
          (previousTargetId == null || id !== previousTargetId),
      ),
    );
  };

  const removeAnswer = (item) => {
    const boxKey = `a-${item.id}`;
    if (showAns || lockedIds.includes(item.id) || !answers[boxKey]) return;
    const removedId = answers[boxKey].dragId;
    setAnswers((previous) => {
      const updated = { ...previous };
      delete updated[boxKey];
      return updated;
    });
    setWrongIds((previous) => previous.filter((id) => id !== item.id));
    tabDrag.focusItem(removedId);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const editables = ITEMS.filter((i) => !i.example);

    const allAnswered = editables.every((i) => answers[`a-${i.id}`]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    editables.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === i.answer) score++;
    });

    setShowResults(true);
    const correctIds = editables
      .filter((item) => answers[`a-${item.id}`]?.value === item.answer)
      .map((item) => item.id);
    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);
    setWrongIds(
      editables
        .filter((item) => answers[`a-${item.id}`]?.value !== item.answer)
        .map((item) => item.id),
    );

    if (score === editables.length)
      ValidationAlert.success(`Score: ${score} / ${editables.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${editables.length}`);
    else ValidationAlert.error(`Score: ${score} / ${editables.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.example).forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.answer);
      filled[`a-${i.id}`] = { dragId: d.id, value: i.answer };
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    tabDrag.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    tabDrag.cancel();
    stopAudio();
  };

  const isWrong = (item) =>
    showResults && !showAns && wrongIds.includes(item.id);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        const item = DRAG_ITEMS.find((i) => i.id === active.id);
        setActiveItem(item);
      }}
      onDragEnd={({ active, over }) => {
        if (over) applyDrop(over.id, active.id);
        else {
          setShakeDrops(false);
          window.requestAnimationFrame(() => setShakeDrops(true));
        }
        setActiveItem(null);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "55px" }}>
          <ExerciseHeader
            sectionLetter="I"
            title="Read, look, and write."
            subTitle="Identify each month answer to each numbered calendar before dragging it, then place one item at a time and review every target before checking."
          />

          {/* Word Bank */}
          <div
            className="w-full"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {DRAG_ITEMS.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                disabled={usedIds.includes(item.id) || showAns}
                register={(element) => tabDrag.registerItem(item.id, element)}
                active={activeAudioKey === `answer-${item.id}`}
                onClick={(event) => {
                  if (event.detail > 0)
                    playAudio(`answer-${item.id}`, ANSWER_AUDIO[item.id]);
                }}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  if (usedIds.includes(item.id) || showAns)
                    playAudio(`answer-${item.id}`, ANSWER_AUDIO[item.id]);
                  else tabDrag.pickItem(item.id);
                }}
              />
            ))}
          </div>

          {/* Grid */}
          <div
            className={shakeDrops ? "unit4-invalid-selection-shake" : ""}
            onAnimationEnd={() => setShakeDrops(false)}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "40px",
            }}
          >
            {ITEMS.map((item) => {
              const boxKey = `a-${item.id}`;
              const value = answers[boxKey]?.value;
              const wrong = isWrong(item);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div className="flex">
                    <span className="text-xl font-semibold">{item.id}</span>
                    <img
                      src={item.img}
                      alt={IMAGE_ALT[item.id]}
                      style={{
                        width: "auto",
                        height: "120px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-5 w-70">
                    <div
                      className="unit4-audio-control unit4-interactive"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        playAudio(`question-${item.id}`, questionAudio)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`question-${item.id}`, questionAudio);
                        }
                      }}
                      style={{
                        borderBottom: `2px solid ${LINE_COLOR}`,
                        fontWeight: "600",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `question-${item.id}`}
                      />
                      {item.question}
                    </div>

                    {item.example ? (
                      <div style={{ borderBottom: `2px solid ${LINE_COLOR}` }}>
                        {item.answer}
                      </div>
                    ) : (
                      <DropBox
                        id={boxKey}
                        wrong={wrong}
                        keyboardActive={
                          tabDrag.keyboardItemId != null &&
                          tabDrag.keyboardTargetId === boxKey
                        }
                      >
                        {() => (
                          <div
                            ref={(element) =>
                              tabDrag.registerTarget(boxKey, element)
                            }
                            role="button"
                            tabIndex={
                              showAns || lockedIds.includes(item.id)
                                ? -1
                                : tabDrag.keyboardItemId != null || value
                                  ? 0
                                  : -1
                            }
                            aria-disabled={
                              lockedIds.includes(item.id) || showAns
                            }
                            onClick={() => removeAnswer(item)}
                            onKeyDown={(event) => {
                              if (tabDrag.keyboardItemId != null)
                                tabDrag.handleTargetKeyDown(event, boxKey);
                              else if (
                                (event.key === "Enter" || event.key === " ") &&
                                value &&
                                !lockedIds.includes(item.id)
                              ) {
                                event.preventDefault();
                                removeAnswer(item);
                              }
                            }}
                            className="unit4-interactive"
                            style={{
                              minHeight: "40px",
                              outlineOffset: "3px",
                              cursor:
                                showAns || lockedIds.includes(item.id)
                                  ? "default"
                                  : "pointer",
                            }}
                          >
                            {(value ||
                              (tabDrag.keyboardItemId != null &&
                                tabDrag.keyboardTargetId === boxKey)) && (
                              <span
                                className={
                                  tabDrag.keyboardItemId != null &&
                                  tabDrag.keyboardTargetId === boxKey
                                    ? "unit4-keyboard-preview"
                                    : ""
                                }
                              >
                                {tabDrag.keyboardItemId != null &&
                                tabDrag.keyboardTargetId === boxKey
                                  ? DRAG_ITEMS.find(
                                      (entry) =>
                                        entry.id === tabDrag.keyboardItemId,
                                    )?.value
                                  : value}
                              </span>
                            )}

                            {wrong && (
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
                                }}
                              >
                                ✕
                              </div>
                            )}
                          </div>
                        )}
                      </DropBox>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>

      {/* Overlay */}
      <DragOverlay>
        {activeItem && (
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "12px",
              background: "white",
              border: `1px solid ${BORDER_COLOR}`,
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              // fontWeight: "700",
              fontSize: "16px",
              transform: "scale(1.1)",
            }}
          >
            {activeItem.value}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
