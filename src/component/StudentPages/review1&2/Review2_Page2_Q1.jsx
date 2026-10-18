/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import sound from "../../../assets/audio/ClassBook/Unit 2/P 19/unit2-page19-EXC.mp3";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 12.svg";
import img13 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 13.svg";
import img14 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 14.svg";
import img15 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 19/Ex C 15.svg";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import useUnit2TabDrag from "../unit2/useUnit2TabDrag";
import "../unit2/unit2Interactions.css";
import toastAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_001_toast.mp3";
import biteAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_002_bite.mp3";
import fiveAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_003_five.mp3";
import meAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_004_me.mp3";
import topAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_005_top.mp3";
import capAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_006_cap.mp3";
import cupAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_007_cup.mp3";
import bikeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_008_bike.mp3";
import cubeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_009_cube.mp3";
import kittenAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise C/Item_010_kitten.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const WORD_AUDIO = {
  q1: toastAudio,
  q2: biteAudio,
  q3: fiveAudio,
  q4: meAudio,
  q5: topAudio,
  q6: capAudio,
  q7: cupAudio,
  q8: bikeAudio,
  q9: cubeAudio,
  q10: kittenAudio,
};

/* ===== البيانات ===== */

const LETTERS = ["a", "e", "i", "o", "u"];

const ITEMS = [
  { id: "q1", word: "toast", img: img1, correct: "o" },
  { id: "q2", word: "bite", img: img2, correct: "i" },
  { id: "q3", word: "five", img: img3, correct: "i" },
  { id: "q4", word: "me", img: img4, correct: "e" },
  { id: "q5", word: "top", img: img5, correct: "o" },

  { id: "q6", word: "cap", img: img6, correct: "a" },
  { id: "q7", word: "cup", img: img7, correct: "u" },
  { id: "q8", word: "bike", img: img8, correct: "i" },
  { id: "q9", word: "cube", img: img9, correct: "u" },
  { id: "q10", word: "kitten", img: img10, correct: "i" },

  { id: "q11", word: "bed", img: img11, correct: "e" },
  { id: "q12", word: "soap", img: img12, correct: "o" },
  { id: "q13", word: "hen", img: img13, correct: "e" },
  { id: "q14", word: "music", img: img14, correct: "u" },
  { id: "q15", word: "boat", img: img15, correct: "o" },
];
const captions = [
  {
    start: 0.179,
    end: 7.5,
    text: "Page 19, review two, exercise C. Listen, read, and write the vowel sound.",
  },

  { start: 8.039, end: 8.559, text: "Toast," },
  { start: 9.159, end: 9.579, text: "bite," },
  { start: 10.46, end: 10.96, text: "five," },
  { start: 11.639, end: 12.039, text: "knee," },
  { start: 13.039, end: 13.46, text: "top," },
  { start: 14.359, end: 14.779, text: "cap," },
  { start: 15.579, end: 15.939, text: "cup," },
  { start: 16.879, end: 17.279, text: "bike," },
  { start: 18.139, end: 18.619, text: "cube," },
  { start: 19.439, end: 19.879, text: "kitten," },
  { start: 20.84, end: 21.219, text: "bed," },
  { start: 22.199, end: 22.559, text: "soap," },
  { start: 23.519, end: 23.899, text: "hen," },
  { start: 24.779, end: 25.299, text: "music," },
  { start: 26.099, end: 26.52, text: "boat" },
];
/* ===== draggable ===== */

function DraggableLetter({ item, registerItem, onKeyboardPick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item,
  });

  return (
    <button
      type="button"
      ref={(element) => {
        setNodeRef(element);
        registerItem(item, element);
      }}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 10px",
        border: "1px solid",
        borderColor: isDragging ? "#F79530" : "#e5e7eb",
        borderRadius: "8px",
        background: "white",
        color: "#F79530",
        fontWeight: "bold",
        fontSize: "18px",
        cursor: "grab",
        minWidth: "35px",
        touchAction: "none",
        boxShadow: isDragging
          ? "0 4px 10px rgba(247,149,48,0.25)"
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
      className="unit2-drag-item hover:border-[#F79530]"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onKeyboardPick();
        }
      }}
    >
      {item}
    </button>
  );
}

/* ===== drop slot ===== */

function DropSlot({
  id,
  content,
  locked,
  wrong,
  preview,
  tabIndex,
  registerTarget,
  onRemove,
  onKeyDown,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

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
      onClick={() => content && !locked && onRemove(id)}
      className="unit2-drop-target"
      style={{
        position: "relative",
        width: "30px",
        height: "30px",
        border: `${wrong ? 2 : 1}px solid ${
          wrong ? "#ef4444" : isOver ? "#fb923c" : "#F79530"
        }`,
        borderRadius: "6px",
        background: isOver ? "#fff7ed" : "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "16px",
        transform: isOver ? "scale(1.08)" : "scale(1)",
        transition: "all 0.18s ease",
        boxShadow: isOver ? "0 0 0 4px rgba(251,146,60,0.18)" : "none",
      }}
    >
      {(content || preview) && (
        <span
          className={`text-[20px] ${
            locked ? "" : "cursor-pointer hover:text-red-500"
          } ${preview ? "unit2-keyboard-preview" : ""}`}
        >
          {preview || content}
        </span>
      )}
    </div>
  );
}
/* ===== main ===== */

const Review2_Page2_Q1 = () => {
  const [answers, setAnswers] = useState(
    Object.fromEntries(ITEMS.map((i) => [i.id, null])),
  );
  const [activeId, setActiveId] = useState(null);
  const [correctTargets, setCorrectTargets] = useState([]);
  const [wrongTargets, setWrongTargets] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shakeGrid, setShakeGrid] = useState(false);
  const [forceStop, setForceStop] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
  );

  const placeLetter = (letter, slotId) => {
    if (showAnswer || correctTargets.includes(slotId)) return;
    setAnswers((previous) => ({ ...previous, [slotId]: letter }));
    setWrongTargets((previous) =>
      previous.filter((target) => target !== slotId),
    );
  };

  const keyboard = useUnit2TabDrag({
    itemIds: LETTERS,
    targetIds: ITEMS.map((item) => item.id),
    isItemDisabled: () => showAnswer,
    isTargetDisabled: (id) => correctTargets.includes(id) || showAnswer,
    onPlace: placeLetter,
  });

  const checkAnswers = () => {
    if (showAnswer || correctTargets.length === ITEMS.length) return;

    if (Object.values(answers).includes(null)) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });
    const nextCorrect = ITEMS.flatMap((item) =>
      answers[item.id] === item.correct ? [item.id] : [],
    );
    setCorrectTargets(nextCorrect);
    setWrongTargets(
      ITEMS.flatMap((item) =>
        answers[item.id] !== item.correct ? [item.id] : [],
      ),
    );

    const total = ITEMS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(ITEMS.map((i) => [i.id, null])));
    setCorrectTargets([]);
    setWrongTargets([]);
    setShowAnswer(false);
    setActiveId(null);
    setShakeGrid(false);
    keyboard.cancel();
    stopAudio();
    setForceStop(true);
    window.requestAnimationFrame(() => setForceStop(false));
  };

  const removeAnswer = (slotId) => {
    if (showAnswer || correctTargets.includes(slotId)) return;

    setAnswers((prev) => ({
      ...prev,
      [slotId]: null,
    }));
    setWrongTargets((previous) =>
      previous.filter((target) => target !== slotId),
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={(e) => {
        if (
          showAnswer ||
          !e.over ||
          !ITEMS.some((item) => item.id === e.over.id)
        ) {
          setActiveId(null);
          setShakeGrid(false);
          window.requestAnimationFrame(() => setShakeGrid(true));
          return;
        }
        placeLetter(String(e.active.id), String(e.over.id));
        setActiveId(null);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "25px" }}>
          <ExerciseHeaderReview
            sectionLetter="C"
            title={
              <>
                Listen, read, and write the{" "}
                <span style={{ color: "#2e3192" }}>vowel sound</span>.
              </>
            }
            subTitle="Replay the word if needed, identify its sound, then drag the matching sound tile into place."
          />
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={7.6}
            pageId="review2-page2-q1"
            forceStop={forceStop}
            onInteract={stopAudio}
          />

          <div
            className="w-full"
            style={{
              marginBottom: "30px",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              {/* 🔤 البنك */}
              <div className="p-3 rounded-2xl border-2 border-gray-200 h-fit w-fit">
                <h3 className="font-bold text-orange-600 mb-4 text-center">
                  Letters
                </h3>

                <div className="flex flex-col gap-3 items-center">
                  <SortableContext items={LETTERS}>
                    {LETTERS.map((l) => (
                      <DraggableLetter
                        key={l}
                        item={l}
                        registerItem={keyboard.registerItem}
                        onKeyboardPick={() => keyboard.pickItem(l)}
                      />
                    ))}
                  </SortableContext>
                </div>
              </div>

              {/* 🧩 الصور */}
              <div
                className={`flex-2 grid grid-cols-5 gap-x-3 gap-y-3 ${
                  shakeGrid ? "unit2-invalid-drop-shake" : ""
                }`}
                onAnimationEnd={() => setShakeGrid(false)}
              >
                {ITEMS.map((item) => (
                  <div key={item.id} style={{ textAlign: "center" }}>
                    {/* 🔥 wrapper للصورة فقط */}
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      {/* 📦 البوكس مربوط بالصورة */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          right: "0px",
                          zIndex: 2,
                        }}
                      >
                        <DropSlot
                          id={item.id}
                          content={answers[item.id]}
                          locked={
                            showAnswer || correctTargets.includes(item.id)
                          }
                          wrong={wrongTargets.includes(item.id)}
                          registerTarget={keyboard.registerTarget}
                          tabIndex={
                            !showAnswer &&
                            !correctTargets.includes(item.id) &&
                            (keyboard.keyboardItemId || answers[item.id])
                              ? 0
                              : -1
                          }
                          preview={
                            keyboard.keyboardTargetId === item.id
                              ? keyboard.keyboardItemId
                              : ""
                          }
                          onRemove={removeAnswer}
                          onKeyDown={(event) => {
                            if (
                              !keyboard.keyboardItemId &&
                              answers[item.id] &&
                              (event.key === "Enter" || event.key === " ")
                            ) {
                              event.preventDefault();
                              removeAnswer(item.id);
                              return;
                            }
                            keyboard.handleTargetKeyDown(event, item.id);
                          }}
                        />
                      </div>

                      {/* 🖼️ الصورة */}
                      <img
                        src={item.img}
                        alt={`Illustration of ${item.word}`}
                        style={{
                          width: "150px",
                          height: "120px",
                          border: "1px solid #F79530",
                          borderRadius: "10px",
                        }}
                      />
                      {wrongTargets.includes(item.id) &&
                        answers[item.id] &&
                        answers[item.id] !== item.correct && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: "25px",
                              right: "25px", // 🔥 زي المثال اللي بدك
                              zIndex: 10,
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}
                    </div>

                    {/* 📝 الكلمة */}
                    <div
                      role={WORD_AUDIO[item.id] ? "button" : undefined}
                      tabIndex={WORD_AUDIO[item.id] ? 0 : undefined}
                      className={
                        WORD_AUDIO[item.id]
                          ? "unit2-audio-control unit2-interactive"
                          : undefined
                      }
                      onClick={() =>
                        WORD_AUDIO[item.id] &&
                        playAudio(`word-${item.id}`, WORD_AUDIO[item.id])
                      }
                      onKeyDown={(event) => {
                        if (
                          WORD_AUDIO[item.id] &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          playAudio(`word-${item.id}`, WORD_AUDIO[item.id]);
                        }
                      }}
                      style={{ marginTop: "5px" }}
                    >
                      {item.word}
                      <Unit2PlayingAudioIcon
                        active={activeAudioKey === `word-${item.id}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔴 نفس البوتون */}
            <Button
              handleShowAnswer={() => {
                setAnswers(
                  Object.fromEntries(ITEMS.map((i) => [i.id, i.correct])),
                );
                setCorrectTargets(ITEMS.map((item) => item.id));
                setWrongTargets([]);
                setShowAnswer(true);
                setActiveId(null);
                keyboard.cancel();
                stopAudio();
                setForceStop(true);
                window.requestAnimationFrame(() => setForceStop(false));
              }}
              handleStartAgain={handleReset}
              checkAnswers={checkAnswers}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="p-2 bg-white border-1 border-[#F79530] rounded-xl shadow text-[20px]">
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review2_Page2_Q1;
