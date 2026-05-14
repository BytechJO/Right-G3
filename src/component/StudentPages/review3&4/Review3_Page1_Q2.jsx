import React, { useMemo, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page1_Q2.css";

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
const DraggableWord = ({ word, disabled }) => {
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
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="season-chip"
    >
      {word}
    </span>
  );
};

/* =========================
   DROP ZONE
========================= */
const DropZone = ({ id, value, isWrong, showCorrect, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${showCorrect ? "" : "hover:text-red-500"}`}
      onClick={() => value && onRemove()}
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
      {value}

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
  const [activeWord, setActiveWord] = useState(null);

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

    if (!over) return;

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
  };

  /* =========================
     REMOVE WORD
  ========================= */
  const removeWord = (index) => {
    if (showCorrect) return;

    const updated = [...answers];

    updated[index] = "";

    setAnswers(updated);
  };

  /* =========================
     SHOW ANSWERS
  ========================= */
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));

    setShowCorrect(true);
    setWrongMarks([]);
  };

  /* =========================
     RESET
  ========================= */
  const resetAll = () => {
    setAnswers(Array(items.length).fill(""));

    setShowCorrect(false);
    setWrongMarks([]);
  };

  /* =========================
     CHECK ANSWERS
  ========================= */
  const checkAnswers = () => {
    if (showCorrect) return;

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
        <div className="div-forall" style={{ gap: "20px" }}>
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>B</span>
            Read, look, and answer. Use the sentences below
          </h5>

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
            {wordBank.map((word) => (
              <DraggableWord
                key={word}
                word={word}
                disabled={usedWords.includes(word)}
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
              alt="exercise"
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
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",

                      marginBottom: "15px",
                    }}
                  >
                    <span
                      className="text-base"
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      {i + 1}. {item.text}
                    </span>

                    <DropZone
                      id={`${i}`}
                      value={answers[i]}
                      isWrong={isWrong}
                      showCorrect={showCorrect}
                      onRemove={() => removeWord(i)}
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
