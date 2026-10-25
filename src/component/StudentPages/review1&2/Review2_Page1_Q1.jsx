/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";

import { SortableContext, useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 18.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 19.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 21.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Asset 20.svg";
import Button from "../../Button";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import useUnit2TabDrag from "../unit2/useUnit2TabDrag";
import "../unit2/unit2Interactions.css";
import alwaysAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_001_always.mp3";
import usuallyAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_002_usually.mp3";
import sometimesAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_003_sometimes.mp3";
import neverAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_004_never.mp3";
import iAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_005_I.mp3";
import cleanAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_006_clean_my_room.mp3";
import jumpAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_007_jump_rope.mp3";
import storeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_008_go_to_the_store.mp3";
import bedAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/Item_009_go_to_bed.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
// Full audio //
import full1 from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/full1.mp3";
import full2 from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/full2.mp3";
import full3 from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/full3.mp3";
import full4 from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise A/full4.mp3";
const WORD_AUDIO = {
  always: alwaysAudio,
  usually: usuallyAudio,
  sometimes: sometimesAudio,
  never: neverAudio,
};
const SENTENCE_AUDIO = {
  1: cleanAudio,
  2: jumpAudio,
  3: storeAudio,
  4: bedAudio,
};

function DraggableWord({
  word,
  isUsed,
  registerItem,
  onKeyboardPick,
  onPlayAudio,
  activeAudio,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: word,
    disabled: isUsed,
  });
  const pointerStart = useRef(null);
  const pointerMoved = useRef(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    opacity: isDragging || isUsed ? 0.4 : 1,
  };
  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(word, element);
      }}
      {...attributes}
      {...listeners}
      style={style}
      aria-disabled={isUsed}
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
        if (isUsed) onPlayAudio();
        else onKeyboardPick();
      }}
      className={`unit2-audio-control unit2-drag-item flex items-center gap-2 bg-[#fff1e4] px-3 py-2 rounded-[20px]
${isUsed ? "cursor-pointer" : "cursor-grab"}
`}
    >
      <div className="flex">
        {[1, 2, 3, 4].map((i) => {
          const activeCount =
            word === "always"
              ? 4
              : word === "usually"
                ? 3
                : word === "sometimes"
                  ? 2
                  : 0;

          return (
            <div
              key={i}
              style={{
                width: "20px",
                height: "15px",
                background: i <= activeCount ? "#ef4444" : "#fff",
                border: "1px solid #c72b2bff",
              }}
            />
          );
        })}
      </div>

      <span className="text-[18px]">= {word}</span>
      <Unit2PlayingAudioIcon active={activeAudio} />
    </button>
  );
}

function DropSlot({
  id,
  value,
  locked,
  wrong,
  preview,
  tabIndex,
  registerTarget,
  onRemove,
  onKeyDown,
}) {
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
      onKeyDown={onKeyDown}
      onClick={() => value && !locked && onRemove()}
      className="unit2-drop-target"
      style={{
        display: "inline-block",
        width: "100px",
        height: "30px",
        borderBottom: wrong ? "2px solid red" : "1px solid #000",
        textAlign: "center",
        margin: "0 5px",
        background: isOver ? "#fff7ed" : "transparent",
      }}
    >
      {(value || preview) && (
        <span
          className={`${locked ? "cursor-default" : "cursor-pointer hover:text-red-500"} ${preview ? "unit2-keyboard-preview" : ""} font-medium`}
        >
          {preview || value}
        </span>
      )}
    </div>
  );
}
const Review2_Page1_Q1 = () => {
  const questions = [
    {
      id: 1,
      img: img1,
      correct: "never",
      sentence: "clean my room.",
      fullAudio: full1,
    },
    {
      id: 2,
      img: img2,
      correct: "usually",
      sentence: "jump rope.",
      fullAudio: full2,
    },
    {
      id: 3,
      img: img3,
      correct: "always",
      sentence: "go to the store.",
      fullAudio: full3,
    },
    {
      id: 4,
      img: img4,
      correct: "sometimes",
      sentence: "go to bed.",
      fullAudio: full4,
    },
  ];

  const words = ["always", "usually", "sometimes", "never"];
  const [answers, setAnswers] = useState({});
  const [correctTargets, setCorrectTargets] = useState([]);
  const [wrongTargets, setWrongTargets] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [shakeGrid, setShakeGrid] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor),
  );
  const usedWords = Object.values(answers).filter(Boolean);

  const placeWord = (word, slotId) => {
    if (showAnswer || correctTargets.includes(slotId)) return;
    setAnswers((previous) => {
      const next = { ...previous };
      Object.keys(next).forEach((key) => {
        if (next[key] === word) next[key] = "";
      });
      next[slotId] = word;
      return next;
    });
    setWrongTargets((previous) =>
      previous.filter((target) => target !== slotId),
    );
  };

  const keyboard = useUnit2TabDrag({
    itemIds: words,
    targetIds: questions.map((question) => `slot-${question.id}`),
    isItemDisabled: (id) => usedWords.includes(id) || showAnswer,
    isTargetDisabled: (id) => correctTargets.includes(id) || showAnswer,
    onPick: (id) => playAudio(`word-${id}`, WORD_AUDIO[id]),
    onPlace: placeWord,
  });
  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveId(null);

    if (!over || showAnswer || !String(over.id).startsWith("slot-")) {
      setShakeGrid(false);
      window.requestAnimationFrame(() => setShakeGrid(true));
      return;
    }

    const draggedWord = active.id;
    const slotId = over.id;

    if (!slotId.startsWith("slot-")) return;

    placeWord(String(draggedWord), String(slotId));
  };

  const checkAnswers = () => {
    if (showAnswer || correctTargets.length === questions.length) return;

    const empty = questions.some((q) => !answers[`slot-${q.id}`]);

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (answers[`slot-${q.id}`] === q.correct) {
        score++;
      }
    });
    const nextCorrect = questions.flatMap((question) =>
      answers[`slot-${question.id}`] === question.correct
        ? [`slot-${question.id}`]
        : [],
    );
    setCorrectTargets(nextCorrect);
    setWrongTargets(
      questions.flatMap((question) =>
        answers[`slot-${question.id}`] !== question.correct
          ? [`slot-${question.id}`]
          : [],
      ),
    );

    const total = questions.length;

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
  const showAnswers = () => {
    const correctAnswers = {};

    questions.forEach((q) => {
      correctAnswers[`slot-${q.id}`] = q.correct;
    });

    setAnswers(correctAnswers);
    setCorrectTargets(questions.map((question) => `slot-${question.id}`));
    setWrongTargets([]);
    setShowAnswer(true);
    setActiveId(null);
    keyboard.cancel();
    stopAudio();
  };

  const reset = () => {
    setAnswers({});
    setCorrectTargets([]);
    setWrongTargets([]);
    setShowAnswer(false);
    setActiveId(null);
    setShakeGrid(false);
    keyboard.cancel();
    stopAudio();
  };

  const removeAnswer = (slotId) => {
    if (showAnswer || correctTargets.includes(slotId)) return;

    const removedWord = answers[slotId];

    setAnswers((prev) => ({
      ...prev,
      [slotId]: "",
    }));
    setWrongTargets((previous) =>
      previous.filter((target) => target !== slotId),
    );
    if (removedWord) keyboard.focusItem(removedWord);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveId(event.active.id)}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "20px" }}>
          <ExerciseHeaderReview
            sectionLetter="A"
            title="Write sentences. Use the words below."
            subTitle="Say the complete answer first, then arrange the word tiles in sentence order and add punctuation."
          />
          <div className="flex flex-col gap-10 w-full">
            {/* بنك الكلمات */}
            <SortableContext items={words}>
              <div className="flex gap-3 p-3 justify-center mt-3 flex-wrap">
                {words.map((w) => (
                  <DraggableWord
                    key={w}
                    word={w}
                    isUsed={usedWords.includes(w) || showAnswer}
                    registerItem={keyboard.registerItem}
                    onKeyboardPick={() => keyboard.pickItem(w)}
                    onPlayAudio={() => playAudio(`word-${w}`, WORD_AUDIO[w])}
                    activeAudio={activeAudioKey === `word-${w}`}
                  />
                ))}
              </div>
            </SortableContext>
            {/* الأسئلة */}
            <div
              className={shakeGrid ? "unit2-invalid-drop-shake" : undefined}
              onAnimationEnd={() => setShakeGrid(false)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr", // 🔥 بدل 1fr
                gap: "20px",
                // justifyContent: "center",
                columnGap: "80px",
                rowGap: "2px",
              }}
            >
              {questions.map((q) => {
                const fullAudioEnabled = correctTargets.includes(
                  `slot-${q.id}`,
                );

                return (
                <div
                  key={q.id}
                  role={fullAudioEnabled ? "button" : undefined}
                  tabIndex={fullAudioEnabled ? 0 : undefined}
                  aria-label={
                    fullAudioEnabled
                      ? `Play the complete correct sentence for question ${q.id}.`
                      : undefined
                  }
                  className={`unit2-audio-control rounded-[14px] p-2 ${fullAudioEnabled ? "unit2-completed-audio" : ""}`}
                  style={{ marginBottom: "20px" }}
                  onClick={() => {
                    if (fullAudioEnabled) {
                      playAudio(`full-${q.id}`, q.fullAudio);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (
                      fullAudioEnabled &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`full-${q.id}`, q.fullAudio);
                    }
                  }}
                >
                  <Unit2PlayingAudioIcon
                    active={activeAudioKey === `full-${q.id}`}
                  />
                  <div className="flex gap-5">
                    <div className="text-[20px] font-bold">{q.id}</div>
                    <div className="flex flex-col gap-3">
                      <img
                        src={q.img}
                        alt={
                          q.id === 1
                            ? "A girl in a messy bedroom with a chart showing never"
                            : q.id === 2
                              ? "Children jumping rope with a chart showing usually"
                              : q.id === 3
                                ? "A boy thinking about going to the store with a chart showing always"
                                : "A family in a store with a chart showing sometimes"
                        }
                        style={{
                          width: "auto",
                          height: "120px",
                          objectFit: "contain",
                        }}
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          minHeight: "35px",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            role="button"
                            tabIndex={fullAudioEnabled ? -1 : 0}
                            className="unit2-audio-control unit2-interactive"
                            onClick={(event) => {
                              if (fullAudioEnabled) return;
                              event.stopPropagation();
                              playAudio(`i-${q.id}`, iAudio);
                            }}
                            onKeyDown={(event) => {
                              if (fullAudioEnabled) return;
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                event.stopPropagation();
                                playAudio(`i-${q.id}`, iAudio);
                              }
                            }}
                          >
                            I
                            <Unit2PlayingAudioIcon
                              active={activeAudioKey === `i-${q.id}`}
                            />
                          </span>{" "}
                          <DropSlot
                            id={`slot-${q.id}`}
                            value={answers[`slot-${q.id}`]}
                            locked={
                              showAnswer ||
                              correctTargets.includes(`slot-${q.id}`)
                            }
                            wrong={wrongTargets.includes(`slot-${q.id}`)}
                            registerTarget={keyboard.registerTarget}
                            tabIndex={
                              !showAnswer &&
                              !correctTargets.includes(`slot-${q.id}`) &&
                              (keyboard.keyboardItemId ||
                                answers[`slot-${q.id}`])
                                ? 0
                                : -1
                            }
                            preview={
                              keyboard.keyboardTargetId === `slot-${q.id}`
                                ? keyboard.keyboardItemId
                                : ""
                            }
                            onRemove={() => removeAnswer(`slot-${q.id}`)}
                            onKeyDown={(event) => {
                              if (
                                !keyboard.keyboardItemId &&
                                answers[`slot-${q.id}`] &&
                                (event.key === "Enter" || event.key === " ")
                              ) {
                                event.preventDefault();
                                removeAnswer(`slot-${q.id}`);
                                return;
                              }
                              keyboard.handleTargetKeyDown(
                                event,
                                `slot-${q.id}`,
                              );
                            }}
                          />{" "}
                          <span
                            role="button"
                            tabIndex={fullAudioEnabled ? -1 : 0}
                            className="unit2-audio-control unit2-interactive"
                            onClick={(event) => {
                              if (fullAudioEnabled) return;
                              event.stopPropagation();
                              playAudio(
                                `sentence-${q.id}`,
                                SENTENCE_AUDIO[q.id],
                              );
                            }}
                            onKeyDown={(event) => {
                              if (fullAudioEnabled) return;
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                event.stopPropagation();
                                playAudio(
                                  `sentence-${q.id}`,
                                  SENTENCE_AUDIO[q.id],
                                );
                              }
                            }}
                          >
                            {q.sentence}
                            <Unit2PlayingAudioIcon
                              active={activeAudioKey === `sentence-${q.id}`}
                            />
                          </span>
                          {/* ❌ WrongMark */}
                          {wrongTargets.includes(`slot-${q.id}`) &&
                            answers[`slot-${q.id}`] &&
                            answers[`slot-${q.id}`] !== q.correct && (
                              <div
                                style={{
                                  position: "absolute",
                                  left: "40%",
                                  marginLeft: "8px",
                                  top: "6%",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                <WrongMark />
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
          <Button
            handleShowAnswer={showAnswers}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="bg-white border border-orange-400 px-3 py-2 rounded-xl shadow-xl">
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Review2_Page1_Q1;
