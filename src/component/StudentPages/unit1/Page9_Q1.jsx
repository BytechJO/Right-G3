import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 2.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 3.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 4.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 5.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 6.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 9/Asset 7.svg";
import WrongMark from "../../WrongMark";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page9_Q1.css";
import Button from "../../Button";

import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

const DraggableItem = ({ word, isUsed }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `season-${word}`,
      disabled: isUsed,
    });

  return (
    <span
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
        touchAction: "none",
        cursor: isUsed ? "not-allowed" : "grab",
        opacity: isUsed ? 0.5 : 1,
        userSelect: "none",

        // ❌ احذف هاد:
        // transform: CSS.Transform.toString(transform),

        // ✔ خليه بدون transform نهائيًا
        boxShadow: isDragging
          ? "0 20px 40px rgba(0,0,0,0.3)"
          : "0 3px 10px rgba(0,0,0,0.12)",

        zIndex: isDragging ? 9999 : "auto",
      }}
    >
      {word}
    </span>
  );
};

const BankDrop = ({ children }) => {
  const { setNodeRef } = useDroppable({
    id: "bank",
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        width: "100%",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

const ImageDrop = ({ i, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `image-${i}`,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "16px",

        transition: "all 0.25s ease",
        transform: isOver ? "scale(1.03)" : "scale(1)",

        boxShadow: isOver ? "0 0 12px #f39b429a" : "none",
        zIndex: 5,
      }}
    >
      {children}
    </div>
  );
};

const Page9_Q1 = () => {
  const questions = [
    { id: 1, text: "The clown is taller than the boy.", answer: 2 },
    { id: 2, text: "The car is faster than the bike.", answer: 3 },
    { id: 3, text: "The couch is bigger than the TV.", answer: 6 },
    { id: 4, text: "The book is heavier than the pen.", answer: 1 },
    { id: 5, text: "The clown is thinner than the panda bear.", answer: 5 },
    { id: 6, text: "The feather is lighter than the bag.", answer: 4 },
  ];
  const wordBank = ["1", "2", "3", "4", "5", "6"];
  const images = [img1, img2, img3, img4, img5, img6];
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل
  const [activeId, setActiveId] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over || locked) return;

    const value = Number(active.id.replace("season-", ""));

    if (over.id === "bank") {
      setAnswers((prev) => {
        const newAnswers = { ...prev };

        Object.keys(newAnswers).forEach((key) => {
          if (newAnswers[key] === value) {
            delete newAnswers[key];
          }
        });

        return newAnswers;
      });
      return;
    }

    const imageIndex = Number(over.id.split("-")[1]);

    setAnswers((prev) => ({
      ...prev,
      [imageIndex]: value,
    }));
  };
  const checkAnswers = () => {
    if (locked) return;

    if (Object.keys(answers).length < images.length) {
      ValidationAlert.info();
      return;
    }

    setShowResult(true); // 🔥 مهم

    let correct = 0;

    questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        correct++;
      }
    });

    const total = questions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <b style="color:${color};">Score: ${correct} / ${total}</b>
    </div>
  `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
  };

  const reset = () => {
    setAnswers({});
    setLocked(false); // ⭐ NEW — إعادة التعديل
    setShowResult(false);
  };

  // ⭐⭐⭐ NEW — showAnswer
  const showAnswer = () => {
    const correct = {};

    questions.forEach((q, index) => {
      correct[index] = q.answer;
    });

    setAnswers(correct);
    setLocked(true);
  };
  const usedWords = Object.values(answers).filter(Boolean);
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "15px" }}>
          <h5 className="header-title-page8 pb-2.5">
            <span className="ex-A" style={{ marginRight: "10px" }}>
              D
            </span>
            Read and number the pictures.
          </h5>

          <BankDrop>
            {wordBank.map((word, index) => (
              <DraggableItem
                key={word}
                word={word}
                isUsed={usedWords.includes(Number(word))}
              />
            ))}
          </BankDrop>
          <div className=" mt-6 flex gap-10">
            <div className="flex flex-col gap-10 w-1/2">
              {questions.map((q) => (
                <p key={q.id} className="text-[18px]">
                  <span className="font-bold mr-2 text-[20px]">{q.id}</span>
                  {q.text}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 w-1/2">
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ position: "relative", width: "fit-content" }}>
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: "100%",
                        // maxWidth: "220px",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />

                    {/* ⭐ هنا بتحط ImageDrop */}
                    <ImageDrop i={i}>
                      {/* الرقم */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "1px",
                          left: "10px",
                          width: "clam(26px,2vw,32px)",
                          height: "clam(26px,2vw,32px)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          fontSize: "20px",
                          fontWeight: "bold",
                          zIndex: 20,
                        }}
                      >
                        {answers[i]}
                      </div>

                      {/* ❌ WrongMark */}
                      {showResult &&
                        answers[i] &&
                        Number(answers[i]) !== questions[i].answer && (
                          <div
                            style={{
                              position: "absolute",
                              top: "1px",
                              right: "21px",
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}
                    </ImageDrop>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* BUTTONS */}
          <Button
            handleShowAnswer={showAnswer}
            handleStartAgain={reset}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
      <DragOverlay>
        {activeId ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f39b42",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "20px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            }}
          >
            {activeId.replace("season-", "")}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Page9_Q1;
