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
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/core";
import raceImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 36/H.1.svg";
import firstAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_001_Who_is_first.mp3";
import thirdAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_002_Who_is_third.mp3";
import fifthAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_003_Who_is_fifth.mp3";
import ninthAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_004_Who_is_ninth.mp3";
import fourthAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_005_Who_is_fourth.mp3";
import eleventhAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_006_Who_is_eleventh.mp3";
import seventhAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_007_Who_is_seventh.mp3";
import tenthAudio from "../../../assets/audio/WorkBook/unit6/Page 36 - Exercise H/Item_008_Who_is_tenth.mp3";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const HOVER_COLOR = "#f59e0b";
const DRAG_BG = "#f29a1f";
const LINE_COLOR = "#2f2f2f";

/* ───────── Draggable ───────── */
function DraggableItem({ item, disabled, register, onKeyDown }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
    disabled,
  });

  const style = {
    // transform: transform
    //   ? `translate(${transform.x}px, ${transform.y}px)`
    //   : undefined,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
      className="unit4-interactive"
      style={{
        ...style,
        width: "45px",
        height: "45px",
        borderRadius: "10px",
        border: `1px solid ${BORDER_COLOR}`,
        background: disabled ? "#eee" : "",
        // color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "20px",
        touchAction: "none",
        // boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
        transition: "0.2s",
      }}
    >
      {item.value}
    </div>
  );
}

/* ───────── Droppable ───────── */
function DropBox({ id, children, wrong }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: isOver ? "scale(1.05)" : "scale(1)",
        borderBottom: `2px solid ${
          wrong ? "red" : isOver ? "#f59e0b" : "#2f2f2f"
        }`,
        backgroundColor: isOver ? "#fce8d3ff" : "",
        transition: "0.2s",
      }}
    >
      {children(isOver)}
    </div>
  );
}

/* ───────── Data ───────── */
const DRAG_ITEMS = [
  { id: "dA", value: "A" },
  { id: "dB", value: "B" },
  { id: "dC", value: "C" },
  { id: "dD", value: "D" },
  { id: "dE", value: "E" },
  { id: "dF", value: "F" },
  { id: "dG", value: "G" },
  { id: "dH", value: "H" },
  { id: "dI", value: "I" },
  { id: "dJ", value: "J" },
  { id: "dK", value: "K" },
  { id: "dL", value: "L" },
];

const ITEMS = [
  { id: 1, question: "Who is first?", correct: "L" },
  { id: 2, question: "Who is third?", correct: "J" },
  { id: 3, question: "Who is ninth?", correct: "D" },
  { id: 4, question: "Who is fifth?", correct: "H" },
  { id: 5, question: "Who is fourth?", correct: "I" },
  { id: 6, question: "Who is eleventh?", correct: "B" },
  { id: 7, question: "Who is seventh?", correct: "F" },
  { id: 8, question: "Who is tenth?", correct: "C" },
];
const QUESTION_AUDIO = {
  1: firstAudio,
  2: thirdAudio,
  3: ninthAudio,
  4: fifthAudio,
  5: fourthAudio,
  6: eleventhAudio,
  7: seventhAudio,
  8: tenthAudio,
};

/* ───────── Component ───────── */
export default function WB_ReadAndWrite_PageH() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [shakeDrops, setShakeDrops] = useState(false);
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

    // remove from other boxes
    Object.keys(updated).forEach((k) => {
      if (updated[k]?.dragId === itemId) delete updated[k];
    });

    updated[boxKey] = {
      dragId: item.id,
      value: item.value,
    };

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
    const allAnswered = ITEMS.every((i) => answers[`a-${i.id}`]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[`a-${i.id}`]?.value === i.correct) score++;
    });

    setShowResults(true);
    const correctIds = ITEMS.filter(
      (item) => answers[`a-${item.id}`]?.value === item.correct,
    ).map((item) => item.id);
    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);
    setWrongIds(
      ITEMS.filter(
        (item) => answers[`a-${item.id}`]?.value !== item.correct,
      ).map((item) => item.id),
    );

    if (score === ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      const d = DRAG_ITEMS.find((d) => d.value === i.correct);
      filled[`a-${i.id}`] = { dragId: d.id, value: i.correct };
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
      <div className="main-container-component mb-10">
        <div className="div-forall" style={{ gap: "20px" }}>
          <ExerciseHeader
            sectionLetter="H"
            title="Read and write the answers."
            subTitle="Identify each runner letter to each ordinal question before dragging it, then place one item at a time and review every target before checking."
          />
          <div className="flex flex-col gap-10 w-full">
            {/* Image */}
            <img
              src={raceImg}
              alt="Twelve runners labeled A through L approaching a finish line"
              style={{ width: "100%", height: "150px" }}
            />

            {/* Drag letters */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {DRAG_ITEMS.map((item) => (
                <DraggableItem
                  key={item.id}
                  item={item}
                  disabled={usedIds.includes(item.id) || showAns}
                  register={(element) => tabDrag.registerItem(item.id, element)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter" && event.key !== " ") return;
                    event.preventDefault();
                    event.stopPropagation();
                    if (!usedIds.includes(item.id) && !showAns) {
                      tabDrag.pickItem(item.id);
                    }
                  }}
                />
              ))}
            </div>

            {/* Questions */}
            <div
              className={shakeDrops ? "unit4-invalid-selection-shake" : ""}
              onAnimationEnd={() => setShakeDrops(false)}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "20px",
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
                      alignItems: "flex-end",
                      gap: "10px",
                    }}
                  >
                    <span className="text-xl font-semibold">{item.id}</span>
                    <span
                      className="unit4-audio-control unit4-interactive text-[18px] w-40"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        playAudio(
                          `question-${item.id}`,
                          QUESTION_AUDIO[item.id],
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(
                            `question-${item.id}`,
                            QUESTION_AUDIO[item.id],
                          );
                        }
                      }}
                      style={{ position: "relative", cursor: "pointer" }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `question-${item.id}`}
                      />
                      {item.question}
                    </span>

                    <DropBox id={boxKey} wrong={wrong}>
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
                          aria-disabled={lockedIds.includes(item.id) || showAns}
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
                            background:
                              tabDrag.keyboardItemId != null &&
                              tabDrag.keyboardTargetId === boxKey
                                ? "rgba(243, 155, 66, 0.18)"
                                : "transparent",
                            minWidth: "150px",
                            height: "40px",
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
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
                              style={{
                                color: "#000",
                                // fontWeight: "700",

                                fontSize: "22px",
                              }}
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
                  </div>
                );
              })}
            </div>
          </div>
          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeItem ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "white",
              border: "1px solid #f39b42",
              // color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "26px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              transform: "scale(1.1)",
              opacity: 0.95,
            }}
          >
            {activeItem.value}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
