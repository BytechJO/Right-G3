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
import sound from "../../../assets/audio/ClassBook/Unit 2/P 19/CD15.Pg19_Instruction1_Adult Lady.mp3";
import img1 from "../../../assets/imgs/test6.png";
import img2 from "../../../assets/imgs/test6.png";
import img3 from "../../../assets/imgs/test6.png";
import img4 from "../../../assets/imgs/test6.png";
import img5 from "../../../assets/imgs/test6.png";
import img6 from "../../../assets/imgs/test6.png";
import img7 from "../../../assets/imgs/test6.png";
import img8 from "../../../assets/imgs/test6.png";
import img9 from "../../../assets/imgs/test6.png";
import img10 from "../../../assets/imgs/test6.png";
import img11 from "../../../assets/imgs/test6.png";
import img12 from "../../../assets/imgs/test6.png";
import img13 from "../../../assets/imgs/test6.png";
import img14 from "../../../assets/imgs/test6.png";
import img15 from "../../../assets/imgs/test6.png";
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
    start: 0,
    end: 4.23,
    text: "Page 8. Right Activities. Exercise A, number 1. ",
  },
  {
    start: 4.25,
    end: 8.28,
    text: "Listen and write the missing letters. Number the pictures.  ",
  },
  { start: 8.3, end: 11.05, text: "1-tiger." },
  { start: 11.07, end: 13.12, text: "2-taxi." },
  { start: 13.14, end: 15.14, text: "3-duck." },
  { start: 15.16, end: 17.13, text: "4-deer." },
];
/* ===== draggable ===== */

function DraggableLetter({ item, locked }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item, disabled: locked });

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
        padding: "6px 10px", // 👈 أكبر
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        background: "white",
        fontWeight: "bold",
        fontSize: "18px", // 👈 أكبر
        cursor: "grab",
        minWidth: "35px", // 👈 حجم ثابت شوي
      }}
    >
      {item}
    </div>
  );
}

/* ===== drop slot ===== */

function DropSlot({ id, content }) {
  const { setNodeRef } = useSortable({ id });


  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        width: "30px",
        height: "30px",
        border: "2px solid #F79530", // 🔥 نفس اللون
        borderRadius: "6px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      {content && (
        <span
          style={{
            color: content ? "#1C398E" : "#000",
          }}
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
        <div className="div-forall">
          <h5 className="header-title-page8">
            <span style={{ marginRight: "20px" }}>C</span>
            Listen, read, and write the{" "}
            <span style={{ color: "#2e3192" }}>vowel sound</span>.
          </h5>
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={15}
          />

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* 🔤 البنك */}
              <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-100 h-fit w-fit">
                <h3 className="font-bold text-blue-800 mb-4 text-center">
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
                        />
                      </div>

                      {/* 🖼️ الصورة */}
                      <img
                        src={item.img}
                        style={{
                          width: "150px",
                          height: "120px",
                          border: "2px solid #F79530",
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
                              right: "45px", // 🔥 زي المثال اللي بدك
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
          <div className="p-3 bg-white border-2 rounded-xl shadow text-xs">
            {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Review2_Page2_Q1;
