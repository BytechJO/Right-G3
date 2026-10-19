/* eslint-disable react-refresh/only-export-components */
import React, { useMemo, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import "./Review3_Page2_Q2.css";

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import WrongMark from "../../WrongMark";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import lunchAudio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_001_lunch.mp3";
import benchAudio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_002_bench.mp3";
import sandwichAudio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_003_sandwich.mp3";
import fishAudio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_004_fish.mp3";
import dishAudio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_005_dish.mp3";
import brushAudio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_006_brush.mp3";
import clue1Audio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_007_I_end_with_ch.mp3";
import clue2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_008_I_rhyme_with_crunch.mp3";
import clue3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_009_I_am_an_afternoon_meal.mp3";
import clue4Audio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_010_What_am_I.mp3";
import clue5Audio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_011_I_end_with_sh.mp3";
import clue6Audio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_012_I_am_an_animal.mp3";
import clue7Audio from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise D/Item_013_I_am_a_super_swimmer.mp3";

const WORD_AUDIO = {
  lunch: lunchAudio,
  bench: benchAudio,
  sandwich: sandwichAudio,
  fish: fishAudio,
  dish: dishAudio,
  brush: brushAudio,
};
const CLUE_AUDIO = [
  [clue1Audio, clue2Audio, clue3Audio, clue4Audio],
  [clue5Audio, clue6Audio, clue7Audio, clue4Audio],
];

/* =========================
   DRAGGABLE WORD
========================= */
const DraggableWord = ({
  word,
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

  return (
    <span
      ref={(element) => {
        setNodeRef(element);
        registerItem(word, element);
      }}
      {...listeners}
      {...attributes}
      style={{
        padding: "7px 14px",
        border: "1px solid #F79530",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        cursor: disabled ? "not-allowed" : "grab",
        opacity: disabled ? 0.4 : 1,
        touchAction: "none",
        position: "relative",

        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
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
   DROP SLOT
========================= */
const DropSlot = ({
  id,
  value,
  isWrong,
  children,
  locked,
  registerTarget,
  preview,
  onRemove,
  onKeyDown,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        registerTarget(id, element);
      }}
      role="button"
      tabIndex={preview || (value && !locked) ? 0 : -1}
      aria-disabled={locked}
      onClick={() => value && !locked && onRemove()}
      onKeyDown={onKeyDown}
      className="unit4-drop-target"
      style={{
        width: "80%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "22px",
        height: "60px",
        borderBottom: `1px solid ${
          isWrong ? "red" : isOver ? "#F79530" : "black"
        }`,
        position: "relative",
        paddingTop: 20,
      }}
    >
      <span
        className={preview ? "unit4-keyboard-preview" : undefined}
        style={{ color: "#1C398E" }}
      >
        {preview || value}
      </span>
      {children}
    </div>
  );
};

const Review3_Page2_Q2 = () => {
  const questions = [
    {
      lines: [
        "I end with ch.",
        "I rhyme with crunch.",
        "I am an afternoon meal.",
        "What am I?",
      ],
    },
    {
      lines: [
        "I end with sh.",
        "I am an animal.",
        "I am a super swimmer.",
        "What am I?",
      ],
    },
  ];

  const correctAnswers = ["lunch", "fish"];

  const words = ["lunch", "bench", "sandwich", "fish", "dish", "brush"];

  const [answers, setAnswers] = useState(["", ""]);
  const [wrongInput, setWrongInputs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lockedTargets, setLockedTargets] = useState([]);
  const [activeWord, setActiveWord] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const usedWords = useMemo(() => answers.filter(Boolean), [answers]);

  /* =========================
     DRAG END
  ========================= */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveWord(null);
    if (!over || showAnswer || lockedTargets.includes(String(over.id))) return;

    const word = active.id;

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);

      const updated = [...answers];

      // remove old position
      const oldIndex = updated.findIndex((a) => a === word);
      if (oldIndex !== -1) updated[oldIndex] = "";

      updated[index] = word;

      setAnswers(updated);
      setWrongInputs((previous) => previous.filter((id) => id !== index));
    }

    setActiveWord(null);
  };

  const targetIds = questions.map((_, i) => `slot-${i}`);
  const placeWord = (word, targetId) =>
    handleDragEnd({ active: { id: word }, over: { id: targetId } });
  const keyboard = useUnit4TabDrag({
    itemIds: words,
    targetIds,
    isItemDisabled: (word) => usedWords.includes(word) || showAnswer,
    isTargetDisabled: (id) => lockedTargets.includes(id) || showAnswer,
    onPick: (word) => playAudio(`word-${word}`, WORD_AUDIO[word]),
    onPlace: placeWord,
  });
  const removeAnswer = (index) => {
    const targetId = `slot-${index}`;
    if (showAnswer || lockedTargets.includes(targetId)) return;
    const removed = answers[index];
    setAnswers((previous) =>
      previous.map((answer, i) => (i === index ? "" : answer)),
    );
    setWrongInputs((previous) => previous.filter((id) => id !== index));
    if (removed) keyboard.focusItem(removed);
  };

  /* =========================
     CHECK
  ========================= */
  const checkAnswers = () => {
    if (showAnswer || lockedTargets.length === questions.length) return;

    if (answers.some((a) => a === "")) {
      ValidationAlert.info("Please fill all blanks");
      return;
    }

    let score = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) score++;
      else wrong.push(i);
    });

    setWrongInputs(wrong);
    setLockedTargets(
      questions.flatMap((_, i) =>
        answers[i] === correctAnswers[i] ? [`slot-${i}`] : [],
      ),
    );

    const total = correctAnswers.length;
    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `);
  };

  const reset = () => {
    setAnswers(["", ""]);
    setWrongInputs([]);
    setShowAnswer(false);
    setLockedTargets([]);
    keyboard.cancel();
    stopAudio();
  };

  const showAnswerFun = () => {
    setAnswers(correctAnswers);
    setWrongInputs([]);
    setShowAnswer(true);
    setLockedTargets(targetIds);
    keyboard.cancel();
    stopAudio();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveWord(e.active.id)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveWord(null)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "55px" }}>
          <ExerciseHeaderReview
            sectionLetter="D"
            title="Answer each riddle with a ch or sh word."
            subTitle="Read each riddle carefully, then choose the ch or sh word that fits the clue."
          />

          {/* WORD BANK */}
          <div
            className="w-full"
            style={{
              display: "flex",
              gap: "30px",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {words.map((w) => (
              <DraggableWord
                key={w}
                word={w}
                disabled={usedWords.includes(w) || showAnswer}
                registerItem={keyboard.registerItem}
                onKeyboardPick={() => keyboard.pickItem(w)}
                onPlayAudio={() => playAudio(`word-${w}`, WORD_AUDIO[w])}
                activeAudio={activeAudioKey === `word-${w}`}
              />
            ))}
          </div>

          {/* QUESTIONS */}
          <div
            className="grid grid-cols-2 gap-6 w-full"
            style={{
              justifyItems: "center",
            }}
          >
            {questions.map((q, i) => (
              <div key={i}>
                {q.lines.map((l, idx) => (
                  <div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    className="unit4-audio-control unit4-interactive"
                    onClick={() =>
                      playAudio(`clue-${i}-${idx}`, CLUE_AUDIO[i][idx])
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`clue-${i}-${idx}`, CLUE_AUDIO[i][idx]);
                      }
                    }}
                    style={{
                      // width: "90px",
                      // textAlign: "center",
                      // fontWeight: "bold",
                      fontSize: "22px",

                      position: "relative",
                      paddingTop: 20,
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `clue-${i}-${idx}`}
                    />
                    {l}
                  </div>
                ))}

                <DropSlot
                  id={`slot-${i}`}
                  value={answers[i]}
                  isWrong={wrongInput.includes(i)}
                  locked={showAnswer || lockedTargets.includes(`slot-${i}`)}
                  registerTarget={keyboard.registerTarget}
                  preview={
                    keyboard.keyboardTargetId === `slot-${i}`
                      ? keyboard.keyboardItemId
                      : ""
                  }
                  onRemove={() => removeAnswer(i)}
                  onKeyDown={(event) => {
                    if (
                      !keyboard.keyboardItemId &&
                      answers[i] &&
                      !lockedTargets.includes(`slot-${i}`) &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      removeAnswer(i);
                      return;
                    }
                    keyboard.handleTargetKeyDown(event, `slot-${i}`);
                  }}
                >
                  {wrongInput.includes(i) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                      }}
                    >
                      <WrongMark />
                    </div>
                  )}
                </DropSlot>
              </div>
            ))}
          </div>

          <Button
            handleShowAnswer={showAnswerFun}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
      {/* DRAG OVERLAY */}
      <DragOverlay>
        {activeWord ? (
          <div
            style={{
              padding: "7px 14px",
              border: "1px solid #F79530",
              background: "white",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review3_Page2_Q2;
