import React, { useMemo, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page1_Q1.css";

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
const DropZone = ({ id, value, showCorrect, isWrong, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <span
      ref={setNodeRef}
      onClick={() => value && onRemove()}
      className={`${showCorrect ? "":"hover:text-red-500"}`}
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
        backgroundColor: value
          ? "white"
          : isOver
            ? "#ffd2a56d"
            : "transparent",

        padding: "2px 6px",
        // borderRadius: "6px",
        fontSize:"18px",
        height:"25px",
        margin: "0 5px",
        textAlign: "center",
        fontWeight: "bold",
        position: "relative",
        transition: "0.2s",
        cursor: value ? "pointer" : "default",
      }}
    >
      {value}

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
    if (showCorrect) return;

    const updated = [...answers];

    updated[qIndex][blankIndex] = "";

    setAnswers(updated);
  };
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
  };

  /* =========================
     CHECK ANSWERS
  ========================= */
  const checkAnswers = () => {
    if (showCorrect) return;

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
        item.answer.forEach((ans, j) => {
          total++;

          if (answers[i][j]?.trim().toLowerCase() === ans.toLowerCase()) {
            score++;
          } else {
            wrong.push({ qIndex: i, blankIndex: j });
          }
        });
      } else {
        total++;

        if (answers[i][0]?.trim().toLowerCase() === item.answer.toLowerCase()) {
          score++;
        } else {
          wrong.push({ qIndex: i, blankIndex: 0 });
        }
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
        <div className="div-forall" style={{ gap: "30px" }}>
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>A</span>
            Read and complete the conversation. Use the words below.
          </h5>

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
              />
            ))}
          </div>

          {/* CONTENT */}
          <div
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <img
                      src={item.speaker === "boy" ? boy : girl}
                      alt="avatar"
                      style={{ width: "35px", height: "35px" }}
                    />

                    <div>
                      {!item.answer ? (
                        <span>{item.text}</span>
                      ) : (
                        item.text.split("______").map((part, j) => {
                          const isWrong = wrongMarks.some(
                            (w) => w.qIndex === i && w.blankIndex === j,
                          );

                          return (
                            <span key={j}>
                              {part}

                              {j < (answers[i]?.length || 0) && (
                                <DropZone
                                  id={`${i}-${j}`}
                                  value={answers[i][j]}
                                  showCorrect={showCorrect}
                                  isWrong={isWrong}
                                  onRemove={() => removeWordFromBlank(i, j)}
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
                alt="sarah"
                style={{ width: "150px", height: "120px" }}
              />

              <img
                src={jack}
                alt="jack"
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
