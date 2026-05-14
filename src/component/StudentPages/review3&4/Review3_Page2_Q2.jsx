import React, { useMemo, useState } from "react";
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

/* =========================
   DRAGGABLE WORD
========================= */
const DraggableWord = ({ word, disabled }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: word,
    disabled,
  });

  return (
    <span
      ref={setNodeRef}
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
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
    >
      {word}
    </span>
  );
};

/* =========================
   DROP SLOT
========================= */
const DropSlot = ({ id, value, isWrong, children }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
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
      <span style={{ color: "#1C398E" }}>{value}</span>
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
  const [activeWord, setActiveWord] = useState(null);

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
    if (!over || showAnswer) return;

    const word = active.id;

    if (over.id.startsWith("slot-")) {
      const index = Number(over.id.split("-")[1]);

      const updated = [...answers];

      // remove old position
      const oldIndex = updated.findIndex((a) => a === word);
      if (oldIndex !== -1) updated[oldIndex] = "";

      updated[index] = word;

      setAnswers(updated);
      setWrongInputs([]);
    }

    setActiveWord(null);
  };

  /* =========================
     CHECK
  ========================= */
  const checkAnswers = () => {
    if (showAnswer) return;

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
    setShowAnswer(true);

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
  };

  const showAnswerFun = () => {
    setAnswers(correctAnswers);
    setWrongInputs([]);
    setShowAnswer(true);
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
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>D</span> Answer each riddle
            with a <span style={{ color: "#2e3192" }}>ch</span>or{" "}
            <span style={{ color: "#2e3192" }}>sh</span> word.
          </h5>

          {/* WORD BANK */}
          <div
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
/>
            ))}
          </div>

          {/* QUESTIONS */}
          <div
            className="grid grid-cols-2 gap-6"
            style={{
              justifyItems: "center",
            }}
          >
            {questions.map((q, i) => (
              <div key={i}>
                {q.lines.map((l, idx) => (
                  <div
                    key={idx}
                    style={{
                      // width: "90px",
                      // textAlign: "center",
                      // fontWeight: "bold",
                      fontSize: "22px",

                      position: "relative",
                      paddingTop: 20,
                    }}
                  >
                    {l}
                  </div>
                ))}

                <DropSlot
                  id={`slot-${i}`}
                  value={answers[i]}
                  isWrong={wrongInput.includes(i)}
                >
                  {showAnswer && wrongInput.includes(i) && (
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
