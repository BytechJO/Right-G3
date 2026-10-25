import React, { useState } from "react";
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
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import useUnit4TabDrag from "../unit4/useUnit4TabDrag";
import "../unit4/unit4Interactions.css";
import sound from "../../../assets/audio/ClassBook/Unit 8/P 73/unit8-pg73-EXC.mp3";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 12.svg";
import img13 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 13.svg";
import img14 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 14.svg";
import img15 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 15.svg";
import img16 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 16.svg";
import img17 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 17.svg";
import img18 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 18.svg";
import img19 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 19.svg";
import img20 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex C 20.svg";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const LETTERS = [
  "j",
  "v",
  "w",
  "c",
  "y",
  "n",
  "k",
  "b",
  "m",
  "f",
  "x",
  "e",
  "s",
  "z",
  "t",
  "h",
  "a",
  "d",
];
const ITEMS = [
  { id: "q1", word: "calendar", img: img1, correct: "c" },
  { id: "q2", word: "van", img: img2, correct: "v" },
  { id: "q3", word: "wagon", img: img3, correct: "w" },
  { id: "q4", word: "cat", img: img4, correct: "c" },
  { id: "q5", word: "yo-yo", img: img5, correct: "y" },
  { id: "q6", word: "jeep", img: img6, correct: "j" },
  { id: "q7", word: "nine", img: img7, correct: "n" },
  { id: "q8", word: "kite", img: img8, correct: "k" },
  { id: "q9", word: "bubbles", img: img9, correct: "b" },
  { id: "q10", word: "moon", img: img10, correct: "m" },
  { id: "q11", word: "fries", img: img11, correct: "f" },
  { id: "q12", word: "book", img: img12, correct: "b" },
  { id: "q13", word: "X-ray", img: img13, correct: "x" },
  { id: "q14", word: "elephant", img: img14, correct: "e" },
  { id: "q15", word: "snail", img: img15, correct: "s" },
  { id: "q16", word: "zebra", img: img16, correct: "z" },
  { id: "q17", word: "tomato", img: img17, correct: "t" },
  { id: "q18", word: "house", img: img18, correct: "h" },
  { id: "q19", word: "apple", img: img19, correct: "a" },
  { id: "q20", word: "dog", img: img20, correct: "d" },
];
const captions = [
  {
    start: 0.099,
    end: 24.739,
    text: "Page 73, review eight, exercise C. Listen and write the beginning sound for each word. Calendar, van, wagon, cat, yo-yo, jeep, nine, kite, bubbles, moon, fries, book,",
  },
  {
    start: 25.899,
    end: 36.22,
    text: "X-ray, elephant, snail, zebra, tomatoes, house, apple, dog",
  },
];

function LetterTile({ letter, disabled, register, pick }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: letter,
    disabled,
  });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(letter, element);
      }}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`${letter}, press Enter or Space to pick up`}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
      className="unit4-interactive"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 10px",
        border: "1px solid #F79530",
        borderRadius: 8,
        background: "white",
        fontWeight: "bold",
        fontSize: 18,
        cursor: disabled ? "default" : "grab",
        minWidth: 35,
        touchAction: "none",
        userSelect: "none",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {letter}
    </div>
  );
}

function PictureSlot({
  item,
  value,
  preview,
  wrong,
  locked,
  register,
  onKeyDown,
  onRemove,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: item.id,
    disabled: locked,
  });
  const editable = Boolean(value) && !locked;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div
          ref={(element) => {
            setNodeRef(element);
            register(item.id, element);
          }}
          role="button"
          tabIndex={!locked && (value || preview) ? 0 : -1}
          aria-disabled={locked}
          aria-label={`${item.word}. ${
            value ? `Beginning sound ${value}` : "Empty beginning sound slot"
          }`}
          onKeyDown={onKeyDown}
          onClick={() => editable && onRemove(item.id, value)}
          className={`unit4-drop-target unit4-interactive ${
            preview && !value ? "unit4-keyboard-preview" : ""
          }`}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 2,
            width: 30,
            height: 30,
            border:
              isOver || (preview && !value)
                ? "2px dashed #F79530"
                : "2px solid #F79530",
            borderRadius: 6,
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 16,
            cursor: editable ? "pointer" : "default",
          }}
        >
          {value || preview || ""}
        </div>
        <img
          src={item.img}
          alt={item.word}
          draggable={false}
          style={{
            width: 150,
            height: 120,
            border: "2px solid #F79530",
            borderRadius: 10,
            objectFit: "contain",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
        {wrong && (
          <div
            style={{ position: "absolute", bottom: 25, right: 45, zIndex: 10 }}
          >
            <WrongMark />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Review8_Page2_Q1() {
  const [answers, setAnswers] = useState(
    Object.fromEntries(ITEMS.map((item) => [item.id, null])),
  );
  const [activeLetter, setActiveLetter] = useState(null);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const placeLetter = (letter, targetId) => {
    if (showAnswer || lockedIds.includes(targetId)) return;
    setAnswers((previous) => ({ ...previous, [targetId]: letter }));
    setWrongIds((previous) => previous.filter((id) => id !== targetId));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: LETTERS,
    targetIds: ITEMS.map((item) => item.id),
    isItemDisabled: () => showAnswer,
    isTargetDisabled: (id) => showAnswer || lockedIds.includes(id),
    onPlace: placeLetter,
  });
  const removeLetter = (targetId, letter) => {
    if (showAnswer || lockedIds.includes(targetId)) return;
    setAnswers((previous) => ({ ...previous, [targetId]: null }));
    setWrongIds((previous) => previous.filter((id) => id !== targetId));
    keyboard.focusItem(letter);
  };
  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === ITEMS.length) return;
    if (ITEMS.some((item) => !answers[item.id])) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const correctIds = ITEMS.flatMap((item) =>
      answers[item.id] === item.correct ? [item.id] : [],
    );
    const incorrectIds = ITEMS.flatMap((item) =>
      answers[item.id] !== item.correct ? [item.id] : [],
    );
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);
    const score = correctIds.length;
    if (score === ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };
  const handleShowAnswer = () => {
    setAnswers(
      Object.fromEntries(ITEMS.map((item) => [item.id, item.correct])),
    );
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    setShowAnswer(true);
    setActiveLetter(null);
    keyboard.cancel();
  };
  const handleReset = () => {
    setAnswers(Object.fromEntries(ITEMS.map((item) => [item.id, null])));
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    setActiveLetter(null);
    keyboard.cancel();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveLetter(String(event.active.id))}
      onDragEnd={(event) => {
        if (event.over)
          placeLetter(String(event.active.id), String(event.over.id));
        setActiveLetter(null);
      }}
      onDragCancel={() => setActiveLetter(null)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 30,
        }}
      >
        <div className="div-forall" style={{ gap: 30 }}>
          <ExerciseHeaderReview
            sectionLetter="C"
            title={
              <>
                Listen and write the{" "}
                <span style={{ color: "#2e3192" }}>beginning sound</span> for
                each word.
              </>
            }
            subTitle="Replay the word if needed, identify its sound, then drag the matching sound tile into place."
          />
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={8}
            pageId="review8-page73-c"
          />
          <div className="w-full" style={{ marginBottom: 30 }}>
            <div className="p-3 mb-6">
              <div className="flex flex-wrap justify-center gap-3">
                {LETTERS.map((letter) => (
                  <LetterTile
                    key={letter}
                    letter={letter}
                    disabled={showAnswer}
                    register={keyboard.registerItem}
                    pick={() => keyboard.pickItem(letter)}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-x-3 gap-y-3">
              {ITEMS.map((item) => {
                const value = answers[item.id];
                const locked = showAnswer || lockedIds.includes(item.id);
                const preview =
                  keyboard.keyboardTargetId === item.id
                    ? keyboard.keyboardItemId
                    : null;
                return (
                  <PictureSlot
                    key={item.id}
                    item={item}
                    value={value}
                    preview={preview}
                    wrong={wrongIds.includes(item.id)}
                    locked={locked}
                    register={keyboard.registerTarget}
                    onRemove={removeLetter}
                    onKeyDown={(event) => {
                      if (
                        !keyboard.keyboardItemId &&
                        value &&
                        !locked &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        removeLetter(item.id, value);
                        return;
                      }
                      keyboard.handleTargetKeyDown(event, item.id);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
      <DragOverlay>
        {activeLetter ? (
          <div
            style={{
              padding: "6px 10px",
              background: "white",
              border: "2px solid #F79530",
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {activeLetter}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
