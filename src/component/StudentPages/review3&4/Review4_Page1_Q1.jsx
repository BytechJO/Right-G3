import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  useDraggable,
} from "@dnd-kit/core";
import WrongMark from "../../WrongMark";
import { useDroppable } from "@dnd-kit/core";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 36/Ex A 4.svg";
const ImageDrop = ({ i, children }) => {
  const { setNodeRef } = useDroppable({
    id: `image-${i}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "relative",
        borderRadius: "16px",
        padding: "6px",
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
};
const WrongIcon = () => (
  <span
    style={{
      width: "22px",
      height: "22px",
      background: "red",
      color: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      fontSize: "14px",
    }}
  >
    ✕
  </span>
);
const Review4_Page1_Q1 = () => {
  const questions = [
    {
      text: "It is cold. There is snow on the ground. The trees have no leaves.",
      answer: "winter",
      correctImage: 3,
    },
    {
      text: "It is hot. The sun is shining. We are playing in the yard.",
      answer: "summer",
      correctImage: 4,
    },
    {
      text: "It is cool. The leaves on the trees are turning brown. We like to play in the leaves.",
      answer: "autumn",
      correctImage: 1,
    },
    {
      text: "It is warm. The flowers and plants are growing. There are baby birds in the trees.",
      answer: "spring",
      correctImage: 2,
    },
  ];

  const wordBank = ["spring", "summer", "autumn", "winter"];
  const images = [img1, img2, img3, img4];

  const [answers, setAnswers] = useState(Array(4).fill(""));
  const [imageNumbers, setImageNumbers] = useState([null, null, null, null]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // =========================
  // dnd-kit sensors
  // =========================
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  // =========================
  // DRAG END
  // =========================
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggableId = active.id;
    const destinationId = over.id;

    // ✨ words
    if (draggableId.startsWith("season-")) {
      const value = draggableId.replace("season-", "");
      const index = Number(destinationId);

      if (!isNaN(index)) {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
      }
    }

    // 🔢 numbers
    if (draggableId.startsWith("num-")) {
      const number = Number(draggableId.split("-")[1]);

      if (destinationId.startsWith("image-")) {
        const index = Number(destinationId.split("-")[1]);

        const updated = [...imageNumbers];
        updated[index] = number;
        setImageNumbers(updated);
      }
    }
  };

  // =========================
  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setImageNumbers(questions.map((q) => q.correctImage));
    setShowCorrect(true);
    setWrongMarks([]);
  };

  const resetAll = () => {
    setAnswers(questions.map(() => ""));
    setImageNumbers([null, null, null, null]);
    setShowCorrect(false);
    setWrongMarks([]);
  };

  const checkAnswers = () => {
    if (showCorrect) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let wrong = [];

    questions.forEach((q, i) => {
      const wordCorrect =
        answers[i]?.trim().toLowerCase() === q.answer.toLowerCase();

      const imageCorrect = imageNumbers[i] === q.correctImage;

      if (!wordCorrect || !imageCorrect) {
        wrong.push({
          qIndex: i,
          wordWrong: !wordCorrect,
          imageWrong: !imageCorrect,
        });
      }

      if (wordCorrect) score++;
      if (imageCorrect) score++;
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

    const total = questions.length * 2;
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

  // =========================
  // DRAGGABLE NUMBER (same UI)
  // =========================
  const NumberItem = ({ num, isUsed }) => {
    const { setNodeRef, listeners, attributes, transform, isDragging } =
      useDraggable({
        id: `num-${num}`,
      });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          backgroundColor: isUsed ? "#cfcfd4" : "#f39b42",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "20px",
          cursor: isUsed ? "not-allowed" : "grab",
          opacity: isUsed ? 0.5 : 1,
          userSelect: "none",
          zIndex: 9999999,
          ...(transform
            ? {
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              }
            : {}),
        }}
      >
        {num}
      </div>
    );
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "5px" }}>
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>A</span> Read and write the
            season. Number the pictures .
          </h5>

          {/* ========================= */}
          {/* NUMBERS BANK */}
          {/* ========================= */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              padding: "8px",
              // border: "2px dashed #ccc",
              borderRadius: "10px",
              marginTop: "10px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[1, 2, 3, 4].map((num) => {
              const isUsed = imageNumbers.includes(num);
              return <NumberItem key={num} num={num} isUsed={isUsed} />;
            })}
          </div>

          {/* ========================= */}
          {/* QUESTIONS */}
          {/* ========================= */}
          <div>
            {questions.map((q, i) => {
              const wrongItem = wrongMarks.find((w) => w.qIndex === i);
              const isWordWrong = wrongItem?.wordWrong;
              const isImageWrong = wrongItem?.imageWrong;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    gap: "20px",
                  }}
                >
                  {/* TEXT */}
                  <div style={{ flex: 1, fontSize: "18px" }}>
                    <span style={{ fontWeight: "bold" }}>{i + 1}</span> {q.text}
                    <br />
                    It’s{" "}
                    <div
                      id={`${i}`}
                      style={{
                        display: "inline-block",
                        borderBottom: showCorrect && isWordWrong ?"2px solid red":"1px solid",
                        minWidth: "120px",
                        // fontWeight: "bold",
                        position: "relative",
                        marginLeft: "8px",
                      }}
                    >
                      <select
                        value={answers[i]}
                        disabled={showCorrect}
                        onChange={(e) => {
                          const updated = [...answers];
                          updated[i] = e.target.value;
                          setAnswers(updated);
                        }}
                        style={{
                          border: "none",
                          outline: "none",
                          // fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        <option value="">Choose</option>
                        {wordBank.map((word) => (
                          <option
                            key={word}
                            value={word}
                            disabled={showCorrect}
                          >
                            {word}
                          </option>
                        ))}
                      </select>
                      {showCorrect && isWordWrong && (
                        <span
                          style={{
                            position: "absolute",
                            right: "-10px",
                            top: "0px",
                          }}
                        >
                          <WrongIcon />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* IMAGE */}
                  <ImageDrop i={i}>
                    <img
                      src={images[i]}
                      style={{
                        width: "auto",
                        height: "100px",
                        objectFit: "contain",
                        borderRadius: "12px",
                      }}
                    />
                    {showCorrect && isImageWrong && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-2px",
                          right: "11px",
                        }}
                      >
                        <WrongIcon />
                      </span>
                    )}
                    <div
                      onClick={() => {
                        if (showCorrect) return;
                        const updated = [...imageNumbers];
                        updated[i] = null;
                        setImageNumbers(updated);
                      }}
                      style={{
                        position: "absolute",
                        right: "8px",
                        bottom: "8px",
                        width: "40px",
                        height: "40px",
                        // background: "white",
                        // border: "2px solid orange",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "20px",
                        color: showCorrect && isImageWrong ? "red" : "black",
                      }}
                    >
                      {imageNumbers[i]}
                    </div>
                  </ImageDrop>
                </div>
              );
            })}
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
    </DndContext>
  );
};

export default Review4_Page1_Q1;
