import React, { useMemo, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page1_Q1.css";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import sweetsAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_001_sweets.mp3";
import chipsAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_002_chips.mp3";
import someAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_003_some.mp3";
import lunchMeatAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_004_lunch_meat.mp3";
import hungryAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_005_hungry.mp3";
import anyAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_006_any.mp3";
import grapesAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_007_grapes.mp3";
import matterAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_008_matter.mp3";
import cherriesAudio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_009_cherries.mp3";
import full2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/full2.mp3";
import full3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/full3.mp3";
import full4Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/full4.mp3";
import full6Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/full6.mp3";
import full7Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/full7.mp3";
import full8Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/full8.mp3";
import fixed10Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_010_What_do_you_have_in_your_lunchbox.mp3";
import fixed11Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_011_I_have.mp3";
import fixed12Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_012_sandwiches.mp3";
import fixed13Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_013_Do_you_have.mp3";
import fixed14Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_014_fruit.mp3";
import fixed15Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_015_Yes,_I_have_some.mp3";
import fixed16Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_016_and.mp3";
import fixed17Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_017_Do_you_have_any_sweets.mp3";
import fixed18Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_018_No,_I_haven't_any.mp3";
import fixed19Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_019_but_I_have_some.mp3";
import fixed20Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_020_Can_I_have.mp3";
import fixed21Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_021_What's_the.mp3";
import fixed22Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_022_Are_you.mp3";
import fixed23Audio from "../../../assets/audio/ClassBook/Unit 4/Page 34 - Exercise A/Item_023_Yes,_I_am!.mp3";

const WORD_AUDIO = {
  sweets: sweetsAudio,
  chips: chipsAudio,
  some: someAudio,
  "lunch meat": lunchMeatAudio,
  hungry: hungryAudio,
  any: anyAudio,
  grapes: grapesAudio,
  matter: matterAudio,
  cherries: cherriesAudio,
};
const FULL_AUDIO = {
  1: full2Audio,
  2: full3Audio,
  3: full4Audio,
  5: full6Audio,
  6: full7Audio,
  7: full8Audio,
};
const FIXED_AUDIO = {
  0: [fixed10Audio],
  1: [fixed11Audio, fixed12Audio],
  2: [fixed13Audio, fixed14Audio],
  3: [fixed15Audio, fixed16Audio, null],
  4: [fixed17Audio],
  5: [fixed18Audio, fixed19Audio, null],
  6: [fixed20Audio, null],
  7: [fixed21Audio, fixed22Audio, null],
  8: [fixed23Audio],
};

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";

import { useDraggable, useDroppable } from "@dnd-kit/core";

import boy from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 1.svg";
import girl from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 2.svg";
import sarah from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 3.svg";
import jack from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 34/Ex A 4.svg";

/* =========================
   DRAGGABLE WORD
========================= */
// eslint-disable-next-line react-refresh/only-export-components
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

    // ✅ مهم للأيقونة
    position: "relative",
  };
  return (
    <span
      ref={(element) => {
        setNodeRef(element);
        registerItem(word, element);
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
// eslint-disable-next-line react-refresh/only-export-components
const DropZone = ({
  id,
  value,
  showCorrect,
  isWrong,
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
    <span
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
        display: "inline-block",
        minWidth: "100px",
        borderBottom: `1px solid ${
          showCorrect
            ? isWrong
              ? "red"
              : "#F79530"
            : isOver
              ? "#F79530"
              : "black"
        }`,

        // 🔥 لون خلفية لما يكون فيه كلمة
        backgroundColor: value ? "white" : isOver ? "#ffd2a56d" : "transparent",

        padding: "2px 6px",
        // borderRadius: "6px",
        fontSize: "18px",
        height: "25px",
        margin: "0 5px",
        textAlign: "center",
        fontWeight: "bold",
        position: "relative",
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
            top: "-6px",
            right: "-6px",
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
    </span>
  );
};
const Review3_Page1_Q1 = () => {
  const items = [
    {
      text: "What do you have in your lunchbox?",
      answer: null,
      speaker: "boy",
    },

    {
      text: "I have ______ sandwiches.",
      answer: "lunch meat",
      speaker: "girl",
    },

    { text: "Do you have ______ fruit?", answer: "any", speaker: "boy" },

    {
      text: "Yes, I have some ______ and ______.",
      answer: ["grapes", "cherries"],
      unordered: true,
      speaker: "girl",
    },

    { text: "Do you have any sweets?", answer: null, speaker: "boy" },

    {
      text: "No, I haven’t any ______, but I have some ______.",
      answer: ["sweets", "chips"],
      speaker: "girl",
    },

    { text: "Can I have ______?", answer: "some", speaker: "boy" },

    {
      text: "What’s the ______? Are you ______?",
      answer: ["matter", "hungry"],
      speaker: "girl",
    },

    { text: "Yes, I am!", answer: null, speaker: "boy" },
  ];
  const isAnswerCorrect = (item, blankIndex, value) => {
    const normalizedValue = value?.trim().toLowerCase();

    if (!normalizedValue) return false;

    if (Array.isArray(item.answer)) {
      // ✅ يسمح بتبديل ترتيب الكلمات
      if (item.unordered) {
        return item.answer.some(
          (answer) => answer.toLowerCase() === normalizedValue,
        );
      }

      return normalizedValue === item.answer[blankIndex].toLowerCase();
    }

    return normalizedValue === item.answer.toLowerCase();
  };
  const wordBank = [
    "sweets",
    "chips",
    "some",
    "lunch meat",
    "hungry",
    "any",
    "grapes",
    "matter",
    "cherries",
  ];

  const [answers, setAnswers] = useState(
    items.map((item) =>
      !item.answer ? [] : Array.isArray(item.answer) ? ["", ""] : [""],
    ),
  );

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
    return answers.flat().filter(Boolean);
  }, [answers]);

  /* =========================
     DRAG END
  ========================= */
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const draggedWord = active.id;
    const [qIndex, blankIndex] = over.id.split("-").map(Number);
    if (lockedTargets.includes(`${qIndex}-${blankIndex}`)) return;

    const updated = [...answers];

    // remove word from old place
    updated.forEach((arr) => {
      arr.forEach((val, idx) => {
        if (val === draggedWord) {
          arr[idx] = "";
        }
      });
    });

    updated[qIndex][blankIndex] = draggedWord;

    setAnswers(updated);
  };

  const removeWordFromBlank = (qIndex, blankIndex) => {
    if (lockedTargets.includes(`${qIndex}-${blankIndex}`)) return;

    const updated = [...answers];

    updated[qIndex][blankIndex] = "";

    setAnswers(updated);
    setWrongMarks((prev) =>
      prev.filter(
        (mark) => mark.qIndex !== qIndex || mark.blankIndex !== blankIndex,
      ),
    );
  };
  const placeWord = (word, targetId) => {
    const [qIndex, blankIndex] = targetId.split("-").map(Number);
    handleDragEnd({ active: { id: word }, over: { id: targetId } });
    setWrongMarks((prev) =>
      prev.filter(
        (mark) => mark.qIndex !== qIndex || mark.blankIndex !== blankIndex,
      ),
    );
  };
  const targetIds = items.flatMap((item, qIndex) =>
    !item.answer
      ? []
      : (Array.isArray(item.answer) ? item.answer : [item.answer]).map(
          (_, blankIndex) => `${qIndex}-${blankIndex}`,
        ),
  );
  const keyboard = useUnit4TabDrag({
    itemIds: wordBank,
    targetIds,
    isItemDisabled: (word) => usedWords.includes(word),
    isTargetDisabled: (id) => lockedTargets.includes(id),
    onPick: (word) => playAudio(`word-${word}`, WORD_AUDIO[word]),
    onPlace: placeWord,
  });
  /* =========================
     SHOW ANSWERS
  ========================= */
  const showAnswers = () => {
    setAnswers(
      items.map((item) =>
        Array.isArray(item.answer)
          ? item.answer
          : item.answer
            ? [item.answer]
            : [],
      ),
    );

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
    setAnswers(
      items.map((item) =>
        !item.answer ? [] : Array.isArray(item.answer) ? ["", ""] : [""],
      ),
    );

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
    if (lockedTargets.length === targetIds.length) return;

    const hasEmpty = answers.some((arr) => arr.some((val) => val === ""));

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let total = 0;
    let wrong = [];

    items.forEach((item, i) => {
      if (!item.answer) return;

      if (Array.isArray(item.answer)) {
        item.answer.forEach((_, j) => {
          total++;

          if (isAnswerCorrect(item, j, answers[i][j])) {
            score++;
          } else {
            wrong.push({
              qIndex: i,
              blankIndex: j,
            });
          }
        });
      } else {
        total++;

        if (isAnswerCorrect(item, 0, answers[i][0])) {
          score++;
        } else {
          wrong.push({
            qIndex: i,
            blankIndex: 0,
          });
        }
      }
    });

    setWrongMarks(wrong);
    setShowCorrect(true);
    setLockedTargets(
      targetIds.filter((id) => {
        const [qIndex, blankIndex] = id.split("-").map(Number);

        return isAnswerCorrect(
          items[qIndex],
          blankIndex,
          answers[qIndex][blankIndex],
        );
      }),
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
        <div className="div-forall" style={{ gap: "30px" }}>
          <ExerciseHeaderReview
            sectionLetter="A"
            title="Read and complete the conversation. Use the words below."
            subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
          />

          {/* WORD BANK */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "10px",
              // border: "2px dashed #ccc",
              borderRadius: "10px",
              // marginTop: "20px",
              justifyContent: "center",
              width: "100%",
              // marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            {wordBank.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                disabled={usedWords.includes(word)}
                registerItem={keyboard.registerItem}
                onKeyboardPick={() => keyboard.pickItem(word)}
                onPlayAudio={() => playAudio(`word-${word}`, WORD_AUDIO[word])}
                activeAudio={activeAudioKey === `word-${word}`}
              />
            ))}
          </div>

          {/* CONTENT */}
          <div
            className="w-full"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            {/* LEFT */}
            <div style={{ flex: 1 }}>
              <div className="space-y-6">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`unit4-audio-control ${FULL_AUDIO[i] && (showCorrect || lockedTargets.some((id) => id.startsWith(`${i}-`))) && targetIds.filter((id) => id.startsWith(`${i}-`)).every((id) => lockedTargets.includes(id)) ? "unit4-full-audio-enabled" : ""}`}
                    role={
                      FULL_AUDIO[i] &&
                      targetIds
                        .filter((id) => id.startsWith(`${i}-`))
                        .every((id) => lockedTargets.includes(id))
                        ? "button"
                        : undefined
                    }
                    tabIndex={
                      FULL_AUDIO[i] &&
                      targetIds
                        .filter((id) => id.startsWith(`${i}-`))
                        .every((id) => lockedTargets.includes(id))
                        ? 0
                        : -1
                    }
                    onClick={() => {
                      if (
                        FULL_AUDIO[i] &&
                        targetIds
                          .filter((id) => id.startsWith(`${i}-`))
                          .every((id) => lockedTargets.includes(id))
                      )
                        playAudio(`full-${i}`, FULL_AUDIO[i]);
                    }}
                    onKeyDown={(event) => {
                      if (
                        FULL_AUDIO[i] &&
                        targetIds
                          .filter((id) => id.startsWith(`${i}-`))
                          .every((id) => lockedTargets.includes(id)) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`full-${i}`, FULL_AUDIO[i]);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `full-${i}`}
                    />
                    <img
                      src={item.speaker === "boy" ? boy : girl}
                      alt={
                        item.speaker === "boy"
                          ? "Boy speaking in the lunchbox conversation"
                          : "Girl speaking in the lunchbox conversation"
                      }
                      style={{ width: "35px", height: "35px" }}
                    />

                    <div>
                      {!item.answer ? (
                        <span
                          role="button"
                          tabIndex={0}
                          className="unit4-audio-control unit4-interactive"
                          onClick={(event) => {
                            event.stopPropagation();
                            playAudio(`fixed-${i}-0`, FIXED_AUDIO[i]?.[0]);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              playAudio(`fixed-${i}-0`, FIXED_AUDIO[i]?.[0]);
                            }
                          }}
                        >
                          <Unit4PlayingAudioIcon
                            active={activeAudioKey === `fixed-${i}-0`}
                          />
                          {item.text}
                        </span>
                      ) : (
                        item.text.split("______").map((part, j) => {
                          const isWrong = wrongMarks.some(
                            (w) => w.qIndex === i && w.blankIndex === j,
                          );

                          return (
                            <span key={j}>
                              {part && (
                                <span
                                  role={
                                    FIXED_AUDIO[i]?.[j] ? "button" : undefined
                                  }
                                  tabIndex={
                                    FIXED_AUDIO[i]?.[j] &&
                                    !(
                                      FULL_AUDIO[i] &&
                                      targetIds
                                        .filter((id) => id.startsWith(`${i}-`))
                                        .every((id) =>
                                          lockedTargets.includes(id),
                                        )
                                    )
                                      ? 0
                                      : -1
                                  }
                                  className={
                                    FIXED_AUDIO[i]?.[j]
                                      ? "unit4-audio-control unit4-interactive"
                                      : undefined
                                  }
                                  onClick={(event) => {
                                    if (
                                      !FIXED_AUDIO[i]?.[j] ||
                                      (FULL_AUDIO[i] &&
                                        targetIds
                                          .filter((id) =>
                                            id.startsWith(`${i}-`),
                                          )
                                          .every((id) =>
                                            lockedTargets.includes(id),
                                          ))
                                    )
                                      return;
                                    event.stopPropagation();
                                    playAudio(
                                      `fixed-${i}-${j}`,
                                      FIXED_AUDIO[i][j],
                                    );
                                  }}
                                  onKeyDown={(event) => {
                                    if (
                                      FIXED_AUDIO[i]?.[j] &&
                                      !(
                                        FULL_AUDIO[i] &&
                                        targetIds
                                          .filter((id) =>
                                            id.startsWith(`${i}-`),
                                          )
                                          .every((id) =>
                                            lockedTargets.includes(id),
                                          )
                                      ) &&
                                      (event.key === "Enter" ||
                                        event.key === " ")
                                    ) {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      playAudio(
                                        `fixed-${i}-${j}`,
                                        FIXED_AUDIO[i][j],
                                      );
                                    }
                                  }}
                                >
                                  <Unit4PlayingAudioIcon
                                    active={
                                      activeAudioKey === `fixed-${i}-${j}`
                                    }
                                  />
                                  {part}
                                </span>
                              )}

                              {j < (answers[i]?.length || 0) && (
                                <DropZone
                                  id={`${i}-${j}`}
                                  value={answers[i][j]}
                                  showCorrect={showCorrect}
                                  isWrong={isWrong}
                                  onRemove={() => removeWordFromBlank(i, j)}
                                  locked={lockedTargets.includes(`${i}-${j}`)}
                                  registerTarget={keyboard.registerTarget}
                                  preview={
                                    keyboard.keyboardItemId &&
                                    keyboard.keyboardTargetId === `${i}-${j}`
                                      ? keyboard.keyboardItemId
                                      : ""
                                  }
                                  onKeyDown={(event) => {
                                    event.stopPropagation();
                                    if (keyboard.keyboardItemId)
                                      keyboard.handleTargetKeyDown(
                                        event,
                                        `${i}-${j}`,
                                      );
                                    else if (
                                      answers[i][j] &&
                                      !lockedTargets.includes(`${i}-${j}`) &&
                                      (event.key === "Enter" ||
                                        event.key === " ")
                                    ) {
                                      event.preventDefault();
                                      const removed = answers[i][j];
                                      removeWordFromBlank(i, j);
                                      keyboard.focusItem(removed);
                                    }
                                  }}
                                />
                              )}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGES */}
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "0px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={sarah}
                alt="Sarah's lunchbox with a sandwich, grapes, cherries, and vegetables"
                style={{ width: "150px", height: "120px" }}
              />

              <img
                src={jack}
                alt="Jack's lunchbox with an apple, drink, chips, and food"
                style={{ width: "150px", height: "120px" }}
              />
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

export default Review3_Page1_Q1;
