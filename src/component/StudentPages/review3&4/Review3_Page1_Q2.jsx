/* eslint-disable react-refresh/only-export-components */
import React, { useMemo, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page1_Q2.css";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import answer1Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_001_Yes,_they_have_some.mp3";
import answer2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_002_No,_she_hasn't_any.mp3";
import answer3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_003_No,_he_hasn't_any.mp3";
import answer4Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_004_Yes,_she_has_some.mp3";
import question1Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_005_Do_they_have_any_milkshakes.mp3";
import question2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_006_Does_she_have_any_potatoes.mp3";
import question3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_007_Does_he_have_any_salad.mp3";
import question4Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/Item_008_Does_she_have_any_fruit.mp3";
import full1Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/full1.mp3";
import full2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/full2.mp3";
import full3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/full3.mp3";
import full4Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise B/full4.mp3";

const ANSWER_AUDIO = [answer1Audio, answer2Audio, answer3Audio, answer4Audio];
const QUESTION_AUDIO = [
  question1Audio,
  question2Audio,
  question3Audio,
  question4Audio,
];
const FULL_AUDIO = [full1Audio, full2Audio, full3Audio, full4Audio];

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex B 1.svg";

/* =========================
   DRAGGABLE WORD
========================= */
const DraggableWord = ({
  word,
  index,
  disabled,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  activeAudio,
}) => {
  const pointerStart = useRef(null);
  const pointerMoved = useRef(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: word,
    disabled,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    padding: "7px 14px",
    border: "1px solid #F79530",
    borderRadius: "8px",
    background: "white",
    fontWeight: "bold",
    cursor: disabled ? "not-allowed" : "grab",
    fontSize: "16px",
    opacity: disabled ? 0.4 : 1,
    touchAction: "none",

    // ✅ مهم حتى أيقونة الصوت تنربط بنفس الكلمة
    position: "relative",
  };
  return (
    <span
      ref={(element) => {
        setNodeRef(element);
        registerItem(`word-${index}`, element);
      }}
      style={style}
      {...listeners}
      {...attributes}
      className="season-chip"
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onPointerDownCapture={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
        pointerMoved.current = false;
      }}
      onPointerMoveCapture={(event) => {
        if (
          pointerStart.current &&
          Math.hypot(
            event.clientX - pointerStart.current.x,
            event.clientY - pointerStart.current.y,
          ) > 5
        )
          pointerMoved.current = true;
      }}
      onClick={(event) => {
        if (event.detail !== 0 && !pointerMoved.current) onPlayAudio();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (disabled) onPlayAudio();
        else onKeyboardPick();
      }}
    >
      <Unit4PlayingAudioIcon active={activeAudio} />
      {word}
    </span>
  );
};

/* =========================
   DROP ZONE
========================= */
const DropZone = ({
  id,
  value,
  isWrong,
  showCorrect,
  onRemove,
  locked,
  registerTarget,
  onKeyDown,
  preview,
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
      onClick={() => value && !locked && onRemove()}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={preview || (value && !locked) ? 0 : -1}
      aria-disabled={locked}
      className={`${showCorrect ? "" : "hover:text-red-500"} unit4-drop-target`}
      style={{
        position: "relative",
        minWidth: "250px",
        width: "100%",
        maxWidth: "400px",
        fontWeight: "bold",

        // color: value ? "#1C398E" : "black",

        borderBottom: `1px solid ${
          showCorrect
            ? isWrong
              ? "red"
              : "black"
            : isOver
              ? "#F79530"
              : "black"
        }`,

        // 🔥 لون خلفية لما يكون فيه كلمة
        backgroundColor: value ? "white" : isOver ? "#ffd2a56d" : "transparent",
        // borderRadius: "6px",
        fontSize: "18px",
        height: "35px",
        // borderRadius: "6px",
        // marginTop: "20px",
        padding: "6px",
        paddingBottom: "8px",

        transition: "0.2s",
        cursor: value ? "pointer" : "default",
      }}
    >
      <span className={preview ? "unit4-keyboard-preview" : undefined}>
        {preview || value}
      </span>

      {showCorrect && isWrong && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "-28px",
            transform: "translateY(-50%)",
            width: "22px",
            height: "22px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

const Review3_Page1_Q2 = () => {
  const items = [
    { text: "Do they have any milkshakes?", answer: "Yes, they have some." },

    { text: "Does she have any potatoes?", answer: "No, she hasn’t any" },

    { text: "Does he have any salad?", answer: "No, he hasn’t any." },

    { text: "Does she have any fruit?", answer: "Yes, she has some." },
  ];

  const wordBank = [
    "Yes, they have some.",
    "No, she hasn’t any",
    "No, he hasn’t any.",
    "Yes, she has some.",
  ];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));

  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);
  const [lockedTargets, setLockedTargets] = useState([]);
  const [activeWord, setActiveWord] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  /* =========================
     SENSORS
  ========================= */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  /* =========================
     USED WORDS
  ========================= */
  const usedWords = useMemo(() => {
    return answers.filter(Boolean);
  }, [answers]);

  /* =========================
     DRAG END
  ========================= */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || lockedTargets.includes(String(over.id))) return;

    const draggedWord = active.id;
    const index = Number(over.id);

    const updated = [...answers];

    // remove old place
    updated.forEach((val, idx) => {
      if (val === draggedWord) {
        updated[idx] = "";
      }
    });

    updated[index] = draggedWord;

    setAnswers(updated);
    setWrongMarks((previous) =>
      previous.filter((mark) => mark.qIndex !== index),
    );
  };

  /* =========================
     REMOVE WORD
  ========================= */
  const removeWord = (index) => {
    if (lockedTargets.includes(String(index))) return;

    const updated = [...answers];

    updated[index] = "";

    setAnswers(updated);
    setWrongMarks((previous) =>
      previous.filter((mark) => mark.qIndex !== index),
    );
  };

  const itemIds = wordBank.map((_, index) => `word-${index}`);
  const targetIds = items.map((_, index) => String(index));
  const placeWord = (itemId, targetId) => {
    const wordIndex = Number(itemId.replace("word-", ""));
    const word = wordBank[wordIndex];
    handleDragEnd({ active: { id: word }, over: { id: targetId } });
  };
  const keyboard = useUnit4TabDrag({
    itemIds,
    targetIds,
    isItemDisabled: (id) =>
      usedWords.includes(wordBank[Number(id.replace("word-", ""))]),
    isTargetDisabled: (id) => lockedTargets.includes(id),
    onPick: (id) => {
      const index = Number(id.replace("word-", ""));
      playAudio(`answer-${index}`, ANSWER_AUDIO[index]);
    },
    onPlace: placeWord,
  });

  /* =========================
     SHOW ANSWERS
  ========================= */
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));

    setShowCorrect(true);
    setWrongMarks([]);
    setLockedTargets(targetIds);
    keyboard.cancel();
    stopAudio();
  };

  /* =========================
     RESET
  ========================= */
  const resetAll = () => {
    setAnswers(Array(items.length).fill(""));

    setShowCorrect(false);
    setWrongMarks([]);
    setLockedTargets([]);
    keyboard.cancel();
    stopAudio();
  };

  /* =========================
     CHECK ANSWERS
  ========================= */
  const checkAnswers = () => {
    if (lockedTargets.length === items.length) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let total = items.length;
    let wrong = [];

    items.forEach((item, i) => {
      if (answers[i]?.trim().toLowerCase() === item.answer.toLowerCase()) {
        score++;
      } else {
        wrong.push({ qIndex: i });
      }
    });

    setWrongMarks(wrong);
    setShowCorrect(true);
    setLockedTargets(
      items.flatMap((item, i) =>
        answers[i]?.trim().toLowerCase() === item.answer.toLowerCase()
          ? [String(i)]
          : [],
      ),
    );

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveWord(event.active.id);
      }}
      onDragEnd={(event) => {
        handleDragEnd(event);
        setActiveWord(null);
      }}
      onDragCancel={() => {
        setActiveWord(null);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall mb-10" style={{ gap: "20px" }}>
          <ExerciseHeaderReview
            sectionLetter="B"
            title="Read, look, and answer. Use the sentences below."
            subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
          />

          {/* WORD BANK */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "10px",
              borderRadius: "10px",
              marginTop: "20px",
              justifyContent: "center",
              width: "100%",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {wordBank.map((word, index) => (
              <DraggableWord
                key={word}
                word={word}
                index={index}
                disabled={usedWords.includes(word)}
                registerItem={keyboard.registerItem}
                onKeyboardPick={() => keyboard.pickItem(`word-${index}`)}
                onPlayAudio={() =>
                  playAudio(`answer-${index}`, ANSWER_AUDIO[index])
                }
                activeAudio={activeAudioKey === `answer-${index}`}
              />
            ))}
          </div>

          {/* CONTENT */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "45px",
            }}
          >
            {/* IMAGE */}

            <img
              src={img1}
              alt="Three children having a picnic with milkshakes, pizza, potatoes, salad, and fruit"
              style={{
                width: "auto",
                height: "350px",
              }}
            />

            {/* QUESTIONS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "350px",
                justifyContent: "space-between",
                // alignItems: "flex-start",
              }}
            >
              {items.map((item, i) => {
                const isWrong = wrongMarks.some((w) => w.qIndex === i);

                return (
                  <div
                    key={i}
                    className={`unit4-audio-control ${lockedTargets.includes(String(i)) ? "unit4-full-audio-enabled" : ""}`}
                    role={
                      lockedTargets.includes(String(i)) ? "button" : undefined
                    }
                    tabIndex={lockedTargets.includes(String(i)) ? 0 : -1}
                    onClick={() => {
                      if (lockedTargets.includes(String(i)))
                        playAudio(`full-${i}`, FULL_AUDIO[i]);
                    }}
                    onKeyDown={(event) => {
                      if (
                        lockedTargets.includes(String(i)) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`full-${i}`, FULL_AUDIO[i]);
                      }
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",

                      marginBottom: "15px",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `full-${i}`}
                    />
                    <span
                      role="button"
                      tabIndex={lockedTargets.includes(String(i)) ? -1 : 0}
                      className="unit4-audio-control unit4-interactive text-base"
                      onClick={(event) => {
                        if (!lockedTargets.includes(String(i))) {
                          event.stopPropagation();
                          playAudio(`question-${i}`, QUESTION_AUDIO[i]);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (
                          !lockedTargets.includes(String(i)) &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(`question-${i}`, QUESTION_AUDIO[i]);
                        }
                      }}
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `question-${i}`}
                      />
                      {i + 1}. {item.text}
                    </span>

                    <DropZone
                      id={`${i}`}
                      value={answers[i]}
                      isWrong={isWrong}
                      showCorrect={showCorrect}
                      onRemove={() => removeWord(i)}
                      locked={lockedTargets.includes(String(i))}
                      registerTarget={keyboard.registerTarget}
                      preview={
                        keyboard.keyboardTargetId === String(i)
                          ? wordBank[
                              Number(
                                keyboard.keyboardItemId?.replace("word-", ""),
                              )
                            ]
                          : ""
                      }
                      onKeyDown={(event) => {
                        event.stopPropagation();
                        if (
                          !keyboard.keyboardItemId &&
                          answers[i] &&
                          !lockedTargets.includes(String(i)) &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          const removedIndex = wordBank.indexOf(answers[i]);
                          removeWord(i);
                          if (removedIndex >= 0)
                            keyboard.focusItem(`word-${removedIndex}`);
                          return;
                        }
                        keyboard.handleTargetKeyDown(event, String(i));
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button onClick={resetAll} className="try-again-button">
            Start Again ↻
          </button>

          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>

          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>

      {/* DRAG OVERLAY */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "7px 14px",
              border: "1px solid #F79530",
              borderRadius: "8px",
              background: "white",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              cursor: "grabbing",
              transform: "scale(1.05)",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review3_Page1_Q2;
