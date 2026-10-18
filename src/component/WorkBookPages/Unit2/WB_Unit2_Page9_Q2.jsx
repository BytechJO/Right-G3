/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import useWorkbookUnit2TabDrag from "./useWorkbookUnit2TabDrag";
import "./workbookUnit2Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 6.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 9/SVG/Asset 11.svg";
import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import full1 from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/full1.mp3";
import full2 from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/full2.mp3";
import full3 from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/full3.mp3";
import full4 from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/full4.mp3";
import full5 from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/full5.mp3";
import full6 from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/full6.mp3";
import taxiSentenceAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_001_goes_to_the_library_by_taxi.mp3";
import busSentenceAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_002_goes_to_the_library_by_bus.mp3";
import bikeSentenceAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_003_goes_to_the_mall_by_bike.mp3";
import carSentenceAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_004_goes_to_the_mall_by_car.mp3";
import subwaySentenceAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_005_goes_to_the_mall_by_the_subway.mp3";
import saturdayAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_006_Sat.mp3";
import sundayAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_007_Sun.mp3";
import mondayAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_008_Mon.mp3";
import tuesdayAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_009_Tues.mp3";
import wednesdayAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_010_Wed.mp3";
import thursdayAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_011_Thu.mp3";
import goingLibraryAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_012_going_to_the_library.mp3";
import harleySometimesAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_014_Harley_sometimes.mp3";
import harleyUsuallyAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/Item_015_Harley_usually.mp3";
import harleyRarelyAudio from "../../../assets/audio/WorkBook/unit2/Page 9 - Exercise B/item-016-harley-rarely.mp3";

const DAY_AUDIO = [
  { label: "Saturday", audio: saturdayAudio },
  { label: "Sunday", audio: sundayAudio },
  { label: "Monday", audio: mondayAudio },
  { label: "Tuesday", audio: tuesdayAudio },
  { label: "Wednesday", audio: wednesdayAudio },
  { label: "Thursday", audio: thursdayAudio },
];

const ACTIVE_COLOR = "#f39b42";
const SOFT_COLOR = "#ffca94";
const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const ANSWER_COLOR = "#000000";
function DraggableItem({
  item,
  isUsed,
  showAns,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  activeAudio,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
    disabled: isUsed || showAns,
  });

  const style = {
    ...styles.dragItem,
    border: `1px solid ${isUsed ? BORDER_COLOR : ACTIVE_COLOR}`,
    backgroundColor: isUsed ? "#eeeeee" : "white",
    color: isUsed ? "#999" : "#222",
    cursor: isUsed || showAns ? "not-allowed" : "grab",
    opacity: isUsed ? 0.6 : 1,
    boxShadow: isUsed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
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
        registerItem(item.id, element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-disabled={isUsed || showAns}
      className="wb-unit2-audio-control wb-unit2-drag-item"
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
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (isUsed || showAns) onPlayAudio();
        else onKeyboardPick();
      }}
      style={style}
    >
      {item.value}
      <WorkbookUnit2PlayingAudioIcon active={activeAudio} />
    </div>
  );
}
const DRAG_ITEMS = [
  { id: 1, value: "goes to the library by taxi.", audio: taxiSentenceAudio },
  { id: 2, value: "goes to the library by bus.", audio: busSentenceAudio },
  { id: 3, value: "goes to the mall by bike.", audio: bikeSentenceAudio },
  { id: 4, value: "goes to the mall by car.", audio: carSentenceAudio },
  {
    id: 5,
    value: "goes to the mall by the subway.",
    audio: subwaySentenceAudio,
  },
];

const EXERCISE_GROUPS = [
  {
    id: "harley",
    personImg: img1,
    placeText: "going to\nthe library",

    questions: [
      {
        id: 1,
        prefix: "Harley rarely",
        fixed: "goes to the library by car.",
        mode: "fixed",
        fullAudio: full1,
        prefixAudio: full1,
      },
      {
        id: 2,
        prefix: "Harley sometimes",
        correct: "goes to the library by taxi.",
        mode: "drop",
        fullAudio: full2,
        prefixAudio: harleySometimesAudio,
      },
      {
        id: 3,
        prefix: "Harley usually",
        correct: "goes to the library by bus.",
        mode: "drop",
        fullAudio: full3,
        prefixAudio: harleyUsuallyAudio,
      },
    ],
  },
  {
    id: "helen",
    personImg: img2,
    placeText: "going to\nthe mall",

    questions: [
      {
        id: 4,
        prefix: "Helen sometimes",
        correct: "goes to the mall by bike.",
        mode: "drop",
        prefixAudio: harleySometimesAudio,
        fullAudio: full4,
      },
      {
        id: 5,
        prefix: "Helen usually",
        correct: "goes to the mall by car.",
        mode: "drop",
        prefixAudio: harleyUsuallyAudio,
        fullAudio: full5,
      },
      {
        id: 6,
        prefix: "Helen rarely",
        correct: "goes to the mall by the subway.",
        mode: "drop",
        prefixAudio: harleyRarelyAudio,
        fullAudio: full6,
      },
    ],
  },
];
function DropBox({
  boxKey,
  value,
  wrong,
  locked,
  preview,
  tabIndex,
  registerTarget,
  onRemove,
  onKeyDown,
}) {
  const { setNodeRef } = useDroppable({
    id: boxKey,
  });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(boxKey, element);
      }}
      role="button"
      tabIndex={tabIndex}
      aria-disabled={locked}
      onClick={() => value && !locked && onRemove()}
      onKeyDown={onKeyDown}
      className="wb-unit2-drop-target"
      style={{
        ...styles.dropBox,

        // ✅ هذا السطر المهم
        borderBottom: wrong ? `2px solid ${WRONG_COLOR}` : "1px solid #3f3f3f",

        color: value ? ANSWER_COLOR : "#111",
        cursor: value && !locked ? "pointer" : locked ? "default" : "pointer",
      }}
    >
      <span className={preview ? "wb-unit2-keyboard-preview" : undefined}>
        {preview || value}
      </span>
      {wrong && <div style={styles.wrongBadge}>✕</div>}
    </div>
  );
}
const styles = {
  pageWrap: {
    width: "100%",
  },

  contentWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 2.5vw, 30px)",
    width: "100%",
  },

  wordBankWrap: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  wordBank: {
    width: "100%",
    // maxWidth: "1000px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "clamp(2px, 0.5vw, 5px)",
    padding: "clamp(2px, 1vw, 8px)",
    // border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    boxSizing: "border-box",
    background: "#fff",
  },

  dragItem: {
    minHeight: "clamp(30px, 4vw, 52px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "clamp(5px, 0.8vw, 10px) clamp(8px, 1vw, 16px)",
    borderRadius: "clamp(8px, 1vw, 14px)",
    fontSize: "clamp(10px, 1.45vw, 18px)",
    // fontWeight: 500,
    userSelect: "none",
    // transition: "0.2s ease",
    boxSizing: "border-box",
    touchAction: "none",
    lineHeight: 1.2,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    // gap: "clamp(14px, 1.8vw, 22px)",
    width: "100%",
  },

  questionsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(10px, 1.4vw, 14px)",
    width: "100%",
  },

  questionRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "clamp(6px, 1vw, 12px)",
    width: "100%",
    minWidth: 0,
  },

  qNumber: {
    fontSize: "clamp(14px, 1.7vw, 20px)",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1,
    minWidth: "clamp(16px, 1.7vw, 30px)",
    flexShrink: 0,
  },

  qPrefix: {
    fontSize: "clamp(12px, 1.4vw, 18px)",
    color: "#111",
    lineHeight: 1.15,
    flexShrink: 1,
    minWidth: 0,
  },

  fixedAnswerLine: {
    flex: 1,
    height: "clamp(28px, 2.8vw, 54px)",
    borderBottom: "1px solid #3f3f3f",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 4px 3px",
    boxSizing: "border-box",
    fontSize: "clamp(12px, 1.4vw, 18px)",
    color: "#111",
    lineHeight: 1.1,
    minWidth: 0,
    wordBreak: "break-word",
  },

  dropBox: {
    flex: 1,
    minHeight: "clamp(28px, 3.8vw, 54px)",
    borderBottom: "1px solid #3f3f3f",
    display: "flex",
    alignItems: "flex-end",
    padding: "0 4px 3px",
    boxSizing: "border-box",
    position: "relative",
    fontSize: "clamp(13px, 1.4vw, 18px)",
    lineHeight: 1.1,
    fontWeight: 500,
    minWidth: 0,
    wordBreak: "break-word",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(15px, 1.8vw, 24px)",
    height: "clamp(15px, 1.8vw, 24px)",
    borderColor: "#fff",
    borderWidth: "2px",
    borderRadius: "50%",
    backgroundColor: "red",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "6px",
  },
};

export default function WB_ReadLookWrite_Page() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [shakeGroup, setShakeGroup] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // لازم تحركي 5px قبل ما يبدأ السحب
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // ضغطة خفيفة قبل السحب
        tolerance: 5,
      },
    }),
  );

  const dropQuestions = EXERCISE_GROUPS.flatMap((group) =>
    group.questions.filter((q) => q.mode === "drop"),
  );

  const usedDragIds = Object.values(answers)
    .filter(Boolean)
    .map((entry) => entry.dragId);

  const applyDrop = (itemId, boxKey) => {
    if (showAns || correctIds.includes(boxKey)) return;
    const item = DRAG_ITEMS.find((entry) => entry.id === Number(itemId));
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
    itemIds: DRAG_ITEMS.map((item) => item.id),
    targetIds: dropQuestions.map((item) => `a-${item.id}`),
    isItemDisabled: (id) => usedDragIds.includes(id) || showAns,
    isTargetDisabled: (id) => correctIds.includes(id) || showAns,
    onPick: (id) => {
      const item = DRAG_ITEMS.find((entry) => entry.id === id);
      playAudio(`drag-${id}`, item?.audio);
    },
    onPlace: applyDrop,
  });

  const handleDragEnd = (event) => {
    if (showAns) return;

    const { active, over } = event;

    if (!over) {
      setShakeGroup(String(active.id));
      window.requestAnimationFrame(() => setShakeGroup("all"));
      return;
    }

    applyDrop(active.id, String(over.id));
  };
  const handleRemoveAnswer = (boxKey) => {
    if (showAns || correctIds.includes(boxKey)) return;
    const removedId = answers[boxKey]?.dragId;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[boxKey];
      return updated;
    });

    setCheckedIds((previous) => previous.filter((id) => id !== boxKey));
    if (removedId) keyboard.focusItem(removedId);
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === dropQuestions.length) return;

    const allAnswered = dropQuestions.every(
      (item) => answers[`a-${item.id}`]?.value,
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = dropQuestions.length;

    dropQuestions.forEach((item) => {
      if (answers[`a-${item.id}`]?.value === item.correct) {
        score++;
      }
    });

    setShowResults(true);
    setCheckedIds(dropQuestions.map((item) => `a-${item.id}`));
    setCorrectIds(
      dropQuestions
        .filter((item) => answers[`a-${item.id}`]?.value === item.correct)
        .map((item) => `a-${item.id}`),
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

    dropQuestions.forEach((item) => {
      const matched = DRAG_ITEMS.find((d) => d.value === item.correct);

      filled[`a-${item.id}`] = {
        dragId: matched?.id ?? item.id,
        value: item.correct,
      };
    });

    setAnswers(filled);
    setShowResults(true);
    setCheckedIds(dropQuestions.map((item) => `a-${item.id}`));
    setCorrectIds(dropQuestions.map((item) => `a-${item.id}`));
    setShowAns(true);
    keyboard.cancel();
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    setShakeGroup(null);
    keyboard.cancel();
    stopAudio();
  };

  const isWrong = (question) => {
    if (!checkedIds.includes(`a-${question.id}`) || question.mode !== "drop")
      return false;
    return answers[`a-${question.id}`]?.value !== question.correct;
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: "25px" }}>
          <ExerciseHeader
            sectionLetter="B"
            title="Read, look, and write."
            subTitle="Identify each frequency sentence to Harley or Helen travel pattern before dragging it, then place one item at a time and review every target before checking."
          />

          <div style={styles.pageWrap}>
            <div style={styles.contentWrap}>
              <div style={styles.wordBankWrap}>
                <div style={styles.wordBank}>
                  {DRAG_ITEMS.map((item) => {
                    const isUsed = usedDragIds.includes(item.id);

                    return (
                      <DraggableItem
                        key={item.id}
                        item={item}
                        isUsed={isUsed}
                        showAns={showAns}
                        registerItem={keyboard.registerItem}
                        onKeyboardPick={() => keyboard.pickItem(item.id)}
                        onPlayAudio={() =>
                          playAudio(`drag-${item.id}`, item.audio)
                        }
                        activeAudio={activeAudioKey === `drag-${item.id}`}
                      />
                    );
                  })}
                </div>
              </div>

              {EXERCISE_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className={
                    shakeGroup === "all"
                      ? "wb-unit2-invalid-drop-shake"
                      : undefined
                  }
                  onAnimationEnd={() => setShakeGroup(null)}
                  style={styles.section}
                >
                  {/* ✅ الصورة + النص */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ position: "relative", width: "100%" }}>
                      <img
                        src={group.personImg}
                        alt={
                          group.id === "harley"
                            ? "Harley's weekly transportation chart"
                            : "Helen's weekly transportation chart"
                        }
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                      {DAY_AUDIO.map((day, dayIndex) => (
                        <button
                          key={day.label}
                          type="button"
                          aria-label={`Play ${day.label}`}
                          className="wb-unit2-audio-control wb-unit2-interactive"
                          onClick={() =>
                            playAudio(`day-${group.id}-${day.label}`, day.audio)
                          }
                          style={{
                            position: "absolute",
                            left: `${14 + dayIndex * 14.3}%`,
                            top: 0,
                            width: "14.3%",
                            height: "42%",
                            border: 0,
                            background: "transparent",
                            cursor: "pointer",
                          }}
                        >
                          <WorkbookUnit2PlayingAudioIcon
                            active={
                              activeAudioKey === `day-${group.id}-${day.label}`
                            }
                          />
                        </button>
                      ))}
                      {group.id === "harley" && (
                        <button
                          type="button"
                          aria-label="Play going to the library"
                          className="wb-unit2-audio-control wb-unit2-interactive"
                          onClick={() =>
                            playAudio("going-library", goingLibraryAudio)
                          }
                          style={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            width: "14%",
                            height: "58%",
                            border: 0,
                            background: "transparent",
                            cursor: "pointer",
                          }}
                        >
                          <WorkbookUnit2PlayingAudioIcon
                            active={activeAudioKey === "going-library"}
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ✅ الأسئلة */}
                  <div style={styles.questionsWrap}>
                    {group.questions.map((question) => {
                      const targetId = `a-${question.id}`;
                      const fullAudioEnabled =
                        question.mode === "fixed"
                          ? showResults || showAns
                          : correctIds.includes(targetId);

                      return (
                        <div
                          key={question.id}
                          role={fullAudioEnabled ? "button" : undefined}
                          tabIndex={fullAudioEnabled ? 0 : undefined}
                          aria-label={
                            fullAudioEnabled
                              ? `Play complete sentence ${question.id}`
                              : undefined
                          }
                          className={`wb-unit2-audio-control ${fullAudioEnabled ? "wb-unit2-completed-audio" : ""}`}
                          onClick={() => {
                            if (fullAudioEnabled)
                              playAudio(
                                `full-${question.id}`,
                                question.fullAudio,
                              );
                          }}
                          onKeyDown={(event) => {
                            if (
                              fullAudioEnabled &&
                              (event.key === "Enter" || event.key === " ")
                            ) {
                              event.preventDefault();
                              playAudio(
                                `full-${question.id}`,
                                question.fullAudio,
                              );
                            }
                          }}
                          style={styles.questionRow}
                        >
                          <WorkbookUnit2PlayingAudioIcon
                            active={activeAudioKey === `full-${question.id}`}
                          />
                          <span style={styles.qNumber}>{question.id}</span>

                          <span
                            role={question.prefixAudio ? "button" : undefined}
                            tabIndex={
                              question.prefixAudio && !fullAudioEnabled ? 0 : -1
                            }
                            className="wb-unit2-audio-control wb-unit2-interactive"
                            onClick={(event) => {
                              if (fullAudioEnabled || !question.prefixAudio)
                                return;
                              event.stopPropagation();
                              playAudio(
                                `prefix-${question.id}`,
                                question.prefixAudio,
                              );
                            }}
                            onKeyDown={(event) => {
                              if (
                                !fullAudioEnabled &&
                                question.prefixAudio &&
                                (event.key === "Enter" || event.key === " ")
                              ) {
                                event.preventDefault();
                                event.stopPropagation();
                                playAudio(
                                  `prefix-${question.id}`,
                                  question.prefixAudio,
                                );
                              }
                            }}
                            style={styles.qPrefix}
                          >
                            {question.prefix}
                            <WorkbookUnit2PlayingAudioIcon
                              active={
                                activeAudioKey === `prefix-${question.id}`
                              }
                            />
                          </span>

                          {question.mode === "fixed" ? (
                            <div style={styles.fixedAnswerLine}>
                              {question.fixed}
                            </div>
                          ) : (
                            <DropBox
                              boxKey={targetId}
                              value={answers[targetId]?.value || ""}
                              wrong={isWrong(question)}
                              locked={fullAudioEnabled}
                              preview={
                                keyboard.keyboardTargetId === targetId
                                  ? DRAG_ITEMS.find(
                                      (item) =>
                                        item.id === keyboard.keyboardItemId,
                                    )?.value
                                  : ""
                              }
                              tabIndex={
                                !fullAudioEnabled &&
                                (keyboard.keyboardItemId || answers[targetId])
                                  ? 0
                                  : -1
                              }
                              registerTarget={keyboard.registerTarget}
                              onRemove={() => handleRemoveAnswer(targetId)}
                              onKeyDown={(event) => {
                                if (
                                  !keyboard.keyboardItemId &&
                                  answers[targetId] &&
                                  (event.key === "Enter" || event.key === " ")
                                ) {
                                  event.preventDefault();
                                  handleRemoveAnswer(targetId);
                                  return;
                                }
                                keyboard.handleTargetKeyDown(event, targetId);
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.buttonsWrap}>
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
