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

function DraggableLetter({ item, locked }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item,
    disabled: locked,
  });

  return (
    <div
      ref={setNodeRef}
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
        cursor: locked ? "default" : "grab",
        minWidth: "35px",
        boxShadow: isDragging
          ? "0 4px 10px rgba(247,149,48,0.25)"
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
      className="hover:border-[#F79530]"
    >
      {item}
    </div>
  );
}

/* ===== drop slot ===== */

function DropSlot({ id, content, locked, onRemove }) {
  const { setNodeRef, isOver } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        width: "30px",
        height: "30px",
        border: `1px solid ${isOver ? "#fb923c" : "#F79530"}`,
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
      {content && (
        <span
          onClick={() => {
            if (!locked) {
              onRemove(id);
            }
          }}
          className={`text-[20px] ${
            locked ? "" : "cursor-pointer hover:text-red-500"
          }`}
        >
          {content}
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
  const [showResults, setShowResults] = useState(false);
  const [locked, setLocked] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
  );

  const checkAnswers = () => {
    if (locked) return;

    if (Object.values(answers).includes(null)) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });

    const total = ITEMS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);

    setShowResults(true);
    setLocked(true);
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(ITEMS.map((i) => [i.id, null])));
    setShowResults(false);
    setLocked(false);
  };

  const removeAnswer = (slotId) => {
    if (locked) return;

    setAnswers((prev) => ({
      ...prev,
      [slotId]: null,
    }));
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={(e) => {
        if (locked) return;
        if (e.over) {
          setAnswers((prev) => ({
            ...prev,
            [e.over.id]: e.active.id,
          }));
        }
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
          <h5 className="header-title-page8">
            <span style={{ marginRight: "20px" }}>C</span>
            Listen, read, and write the{" "}
            <span style={{ color: "#2e3192" }}>vowel sound</span>.
          </h5>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={7.6}
          />

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 🔤 البنك */}
              <div className="p-3 rounded-2xl border-2 border-gray-200 h-fit w-fit">
                <h3 className="font-bold text-orange-600 mb-4 text-center">
                  Letters
                </h3>

                <div className="flex flex-col gap-3 items-center">
                  <SortableContext items={LETTERS}>
                    {LETTERS.map((l) => (
                      <DraggableLetter key={l} item={l} locked={locked} />
                    ))}
                  </SortableContext>
                </div>
              </div>

              {/* 🧩 الصور */}
              <div className="flex-2 grid grid-cols-5 gap-x-3 gap-y-3">
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
                          correct={item.correct}
                          isSubmitted={showResults}
                          locked={locked}
                          onRemove={removeAnswer}
                        />
                      </div>

                      {/* 🖼️ الصورة */}
                      <img
                        src={item.img}
                        style={{
                          width: "150px",
                          height: "120px",
                          border: "1px solid #F79530",
                          borderRadius: "10px",
                        }}
                      />
                      {showResults &&
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
                    <div style={{ marginTop: "5px" }}>{item.word}</div>
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
                setShowResults(true);
                setLocked(true);
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
