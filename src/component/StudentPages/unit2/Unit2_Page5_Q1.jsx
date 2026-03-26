import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Button from "../../Button";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/test6.png";
import img2 from "../../../assets/imgs/test6.png";
import img3 from "../../../assets/imgs/test6.png";

const Unit2_Page5_Q1 = () => {
  const questions = [
    { image: img1, answer: "glue" },
    { image: img2, answer: "tune" },
    { image: img3, answer: "bug" },
  ];

  const wordBank = [
    { id: "bug", text: "bug" },
    { id: "glue", text: "glue" },
    { id: "tune", text: "tune" },
  ];

  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const { draggableId, destination } = result;

    setAnswers((prev) => {
      const copy = [...prev];

      for (let i = 0; i < copy.length; i++) {
        if (copy[i] === draggableId) copy[i] = "";
      }

      if (destination.droppableId.startsWith("drop-")) {
        const qIndex = Number(destination.droppableId.replace("drop-", ""));
        copy[qIndex] = draggableId;
      }

      return copy;
    });

    setWrongInputs([]);
  };

  const usedWords = answers.filter(Boolean);

  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((a) => a === "")) {
      ValidationAlert.info();
      return;
    }

    let wrong = [];
    let score = 0;
    const total = questions.length;

    questions.forEach((q, qIndex) => {
      const selectedWord =
        wordBank.find((w) => w.id === answers[qIndex])?.text || "";

      if (selectedWord === q.answer) score++;
      else wrong.push(`${qIndex}`);
    });

    setWrongInputs(wrong);
    setLocked(true);

    const msg = `Score: ${score} / ${total}`;
    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  const showAnswers = () => {
    setAnswers(
      questions.map((q) => wordBank.find((w) => w.text === q.answer)?.id || ""),
    );
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(questions.map(() => ""));
    setWrongInputs([]);
    setLocked(false);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A" style={{ marginRight: "20px" }}>
            A
          </span>
          <span style={{ color: "#2e3192", marginRight: "20px" }}>1</span>
          Look and write.
        </h5>

        <div className="w-[60%] mt-2">
          <Droppable droppableId="word-bank" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-3 p-3 border-2 border-dashed border-gray-300 rounded-xl justify-center mb-6"
              >
                {wordBank
                  .filter((w) => !usedWords.includes(w.id))
                  .map((w, i) => (
                    <Draggable
                      key={w.id}
                      draggableId={w.id}
                      index={i}
                      isDragDisabled={locked}
                    >
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="px-4 py-1 rounded-lg border-2 border-[#2c5287] font-bold bg-white text-sm cursor-grab select-none"
                          style={provided.draggableProps.style}
                        >
                          {w.text}
                        </span>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className="flex justify-center gap-20 mt-10">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="flex flex-col items-center gap-3">
                {/* حاوية الصورة + الرقم */}
                <div className="relative">
                  {/* الرقم على زاوية الصورة */}
                  <span className="absolute -top-2 -left-4 font-bold text-lg">
                    {qIndex + 1}
                  </span>

                  {/* الصورة */}
                  <img
                    src={q.image}
                    alt=""
                    style={{
                      width: "20vw",
                      height: "20vh",
                      objectFit: "cover",
                      marginBottom: "20px",
                    }}
                  />

                  <Droppable
                    droppableId={`drop-${qIndex}`}
                    isDropDisabled={locked}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`w-full min-h-10 border-b-2 border-black flex items-center justify-center text-center text-[16px] font-semibold px-1 relative ${
                          snapshot.isDraggingOver ? "bg-blue-100" : ""
                        }`}
                      >
                        <span
                          className={`${
                            answers[qIndex]
                              ? locked
                                ? wrongInputs.includes(`${qIndex}`)
                                  ? "text-red-500"
                                  : "text-green-600"
                                : "text-black"
                              : "text-black"
                          }`}
                        >
                          {wordBank.find((w) => w.id === answers[qIndex])
                            ?.text || ""}
                        </span>

                        {provided.placeholder}

                        {wrongInputs.includes(`${qIndex}`) && <WrongMark />}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </DragDropContext>
  );
};

export default Unit2_Page5_Q1;
