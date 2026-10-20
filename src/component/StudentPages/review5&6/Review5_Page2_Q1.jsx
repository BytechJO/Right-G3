/* eslint-disable react-refresh/only-export-components */
import React, { useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Button from "../../Button";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 53/Ex C 6.svg";
import skyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise C/Item_001_sky.mp3";
import babyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise C/Item_002_baby.mp3";
import partyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise C/Item_003_party.mp3";
import julyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise C/Item_004_July.mp3";
import candyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise C/Item_005_candy.mp3";
import flyAudio from "../../../assets/audio/ClassBook/Unit 6/Page 53 - Exercise C/Item_006_fly.mp3";

const WORDS = [
  { id: "sky", value: "sky", audio: skyAudio },
  { id: "baby", value: "baby", audio: babyAudio },
  { id: "party", value: "party", audio: partyAudio },
  { id: "July", value: "July", audio: julyAudio },
  { id: "candy", value: "candy", audio: candyAudio },
  { id: "fly", value: "fly", audio: flyAudio },
];
const QUESTIONS = [
  { id: 1, img: imgA, answer: "sky", alt: "Blue sky and clouds" },
  { id: 2, img: imgB, answer: "baby", alt: "A baby crawling" },
  { id: 3, img: imgC, answer: "party", alt: "Children at a birthday party" },
  { id: 4, img: imgD, answer: "July", alt: "A July calendar page" },
  { id: 5, img: imgE, answer: "candy", alt: "Colorful pieces of candy" },
  { id: 6, img: imgF, answer: "fly", alt: "A fly" },
];

export function WordChip({ item, used, register, pick, play, playing }) {
  const pointerStart = useRef(null);
  const pointerMoved = useRef(false);
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: item.id,
    disabled: used,
  });
  return (
    <span
      ref={(element) => {
        setNodeRef(element);
        register(item.id, element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-disabled={used}
      aria-label={`${used ? "Listen to" : "Pick"} ${item.value}`}
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
        if (event.detail !== 0 && !pointerMoved.current) play();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        if (used) play();
        else pick();
      }}
      className="season-chip unit4-audio-control unit4-interactive"
      style={{
        padding: "7px 20px",
        border: "1px solid #F79530",
        borderRadius: 8,
        background: "white",
        fontWeight: "bold",
        cursor: used ? "pointer" : "grab",
        fontSize: 16,
        opacity: used ? 0.4 : 1,
        touchAction: "none",
        transform: transform
          ? `translate3d(${transform.x}px,${transform.y}px,0)`
          : undefined,
      }}
    >
      <Unit4PlayingAudioIcon active={playing} />
      {item.value}
    </span>
  );
}

export function AnswerSlot({
  id,
  value,
  preview,
  wrong,
  locked,
  register,
  onRemove,
  onKeyDown,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(id, element);
      }}
      role="button"
      tabIndex={preview || (value && !locked) ? 0 : -1}
      aria-disabled={locked}
      aria-label={`Answer slot${value ? `, ${value}` : ""}`}
      onClick={() => value && !locked && onRemove()}
      onKeyDown={onKeyDown}
      className="unit4-drop-target unit4-interactive"
      style={{
        width: 200,
        borderBottom: wrong
          ? "2px solid red"
          : isOver
            ? "2px solid #F79530"
            : "1px solid black",
        minHeight: 35,
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span className={preview ? "unit4-keyboard-preview" : undefined}>
        {preview || value}
      </span>
      {wrong && (
        <span
          style={{
            position: "absolute",
            right: -10,
            top: -8,
            width: 20,
            height: 20,
            background: "red",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            border: "2px solid white",
          }}
        >
          ✕
        </span>
      )}
    </div>
  );
}

export default function Review5_Page2_Q1() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [lockedTargets, setLockedTargets] = useState([]);
  const [wrongTargets, setWrongTargets] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );
  const used = answers.filter(Boolean);

  const place = (wordId, targetId) => {
    const index = Number(String(targetId).replace("answer-", ""));
    if (lockedTargets.includes(index) || showAnswer) return;
    setAnswers((previous) => {
      const updated = previous.map((value) => (value === wordId ? "" : value));
      updated[index] = wordId;
      return updated;
    });
    setWrongTargets((previous) => previous.filter((id) => id !== index));
  };

  const keyboard = useUnit4TabDrag({
    itemIds: WORDS.map((item) => item.id),
    targetIds: QUESTIONS.map((_, index) => `answer-${index}`),
    isItemDisabled: (id) => used.includes(id) || showAnswer,
    isTargetDisabled: (id) =>
      lockedTargets.includes(Number(String(id).replace("answer-", ""))) ||
      showAnswer,
    onPick: (id) => {
      const item = WORDS.find((word) => word.id === id);
      if (item) playAudio(`word-${id}`, item.audio);
    },
    onPlace: place,
  });

  const remove = (index) => {
    if (lockedTargets.includes(index) || showAnswer) return;
    const removed = answers[index];
    setAnswers((previous) =>
      previous.map((value, answerIndex) =>
        answerIndex === index ? "" : value,
      ),
    );
    setWrongTargets((previous) => previous.filter((id) => id !== index));
    if (removed) keyboard.focusItem(removed);
  };

  const checkAnswers = () => {
    if (showAnswer || lockedTargets.length === QUESTIONS.length) return;
    if (answers.some((answer) => !answer)) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    const correct = QUESTIONS.flatMap((question, index) =>
      answers[index] === question.answer ? [index] : [],
    );
    const wrong = QUESTIONS.flatMap((question, index) =>
      answers[index] !== question.answer ? [index] : [],
    );
    setLockedTargets(correct);
    setWrongTargets(wrong);
    if (correct.length === QUESTIONS.length)
      ValidationAlert.success(`Score: ${correct.length} / ${QUESTIONS.length}`);
    else if (correct.length)
      ValidationAlert.warning(`Score: ${correct.length} / ${QUESTIONS.length}`);
    else ValidationAlert.error(`Score: 0 / ${QUESTIONS.length}`);
  };

  const reveal = () => {
    setAnswers(QUESTIONS.map((question) => question.answer));
    setLockedTargets(QUESTIONS.map((_, index) => index));
    setWrongTargets([]);
    setShowAnswer(true);
    keyboard.cancel();
    stopAudio();
  };

  const reset = () => {
    setAnswers(Array(QUESTIONS.length).fill(""));
    setLockedTargets([]);
    setWrongTargets([]);
    setShowAnswer(false);
    setActiveWord(null);
    keyboard.cancel();
    stopAudio();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveWord(String(event.active.id))}
      onDragCancel={() => setActiveWord(null)}
      onDragEnd={(event) => {
        if (event.over) place(String(event.active.id), String(event.over.id));
        setActiveWord(null);
      }}
    >
      <div className="main-container-component">
        <div className="div-forall" style={{ gap: 30 }}>
          <ExerciseHeaderReview
            sectionLetter="C"
            title={<>Look and write the words ending in <span style={{ color: "#2e3192" }}>-y</span>.</>}
            subTitle="Match each word or answer to its target first, then drag it into place and check the snap position."
          />

          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-6 p-2 justify-center w-full flex-wrap">
              {WORDS.map((item) => (
                <WordChip
                  key={item.id}
                  item={item}
                  used={used.includes(item.id)}
                  register={keyboard.registerItem}
                  pick={() => keyboard.pickItem(item.id)}
                  play={() => playAudio(`word-${item.id}`, item.audio)}
                  playing={activeAudioKey === `word-${item.id}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-15 mb-5">
              {QUESTIONS.map((question, index) => {
                const previewId =
                  keyboard.keyboardTargetId === `answer-${index}`
                    ? keyboard.keyboardItemId
                    : "";
                return (
                  <div key={question.id} className="flex flex-col items-start">
                    <div className="flex gap-2 items-start">
                      <b className="text-lg">{question.id}</b>
                      <img
                        src={question.img}
                        alt={question.alt}
                        style={{ height: 120, borderRadius: 10 }}
                      />
                    </div>
                    <AnswerSlot
                      id={`answer-${index}`}
                      value={answers[index]}
                      preview={previewId}
                      wrong={wrongTargets.includes(index)}
                      locked={lockedTargets.includes(index) || showAnswer}
                      register={keyboard.registerTarget}
                      onRemove={() => remove(index)}
                      onKeyDown={(event) => {
                        if (
                          !keyboard.keyboardItemId &&
                          answers[index] &&
                          !lockedTargets.includes(index) &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          remove(index);
                          return;
                        }
                        keyboard.handleTargetKeyDown(event, `answer-${index}`);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <Button
            handleShowAnswer={reveal}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
      <DragOverlay>
        {activeWord && (
          <span
            style={{
              padding: "7px 20px",
              border: "1px solid #F79530",
              borderRadius: 8,
              background: "white",
              fontWeight: "bold",
            }}
          >
            {activeWord}
          </span>
        )}
      </DragOverlay>
    </DndContext>
  );
}
