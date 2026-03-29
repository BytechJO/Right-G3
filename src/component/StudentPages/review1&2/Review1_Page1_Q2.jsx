import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/test6.png";
import img2 from "../../../assets/imgs/test6.png";
import img3 from "../../../assets/imgs/test6.png";
import img4 from "../../../assets/imgs/test6.png";
import img5 from "../../../assets/imgs/test6.png";
import img6 from "../../../assets/imgs/test6.png";
import img7 from "../../../assets/imgs/test6.png";
import img8 from "../../../assets/imgs/test6.png";
import img9 from "../../../assets/imgs/test6.png";

const Review1_Page1_Q2 = () => {
  const answersBank = ["A", "B", "C"];

  const questions = [
    {
      id: 1,
      label: "fast",
      images: [img1, img2, img3],
      answers: { fastest: "C", slowest: "A" },
    },
    {
      id: 2,
      label: "short",
      images: [img4, img5, img6],
      answers: { shortest: "C", tallest: "B" },
    },
    {
      id: 3,
      label: "old",
      images: [img7, img8, img9],
      answers: { oldest: "A", youngest: "C" },
    },
  ];

  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const key = result.destination.droppableId;
    const draggedLetter = result.draggableId;

    const qIndex = key.split("-")[0];

    const alreadyUsed = Object.keys(answers).some(
      (k) => k.startsWith(qIndex + "-") && answers[k] === draggedLetter,
    );

    if (alreadyUsed) return;

    setAnswers((prev) => ({
      ...prev,
      [key]: draggedLetter,
    }));
  };

  const reset = () => {
    setAnswers({});
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        filled[`${qIndex}-${type}`] = value;
      });
    });
    setAnswers(filled);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    const totalInputs = questions.reduce(
      (acc, q) => acc + Object.keys(q.answers).length,
      0,
    );

    if (Object.keys(answers).length < totalInputs) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        total++;
        if (answers[`${qIndex}-${type}`] === value) correct++;
      });
    });

    const msg = `Score: ${correct} / ${total}`;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult(true);
    setLocked(true);
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
          <span style={{ marginRight: "20px" }}>B</span>
          Read, look, and write. You can answer in two ways.
        </h5>

        {/* ANSWER BANK */}
        <Droppable droppableId="bank" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
            >
              {answersBank.map((a, index) => (
                <Draggable
                  key={a}
                  draggableId={a}
                  index={index}
                  isDragDisabled={locked}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "10px 15px",
                        background: "#fde68a",
                        borderRadius: "8px",
                        cursor: "grab",
                        ...provided.draggableProps.style,
                      }}
                    >
                      {a}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* QUESTIONS */}
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
              marginBottom: "40px",
              width: "60%",
            }}
          >
            {/* LEFT */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px auto",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ fontWeight: "bold", gap: "10px" }}>
                {q.id} {q.label}
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                {q.images.map((img, i) => {
                  const letter = ["A", "B", "C"][i];
                  return (
                    <div key={i} style={{ textAlign: "center" }}>
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                      />
                      <p style={{ fontWeight: "bold" }}>{letter}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ width: "320px" }}>
              {Object.keys(q.answers).map((type) => (
                <Droppable key={type} droppableId={`${qIndex}-${type}`}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        marginBottom: "12px",
                        minHeight: "40px",
                        background: snapshot.isDraggingOver
                          ? "#dbeafe"
                          : "#f9f9f9",
                        borderBottom: "2px solid black",
                        padding: "5px",
                        position: "relative",
                      }}
                    >
                      <p>
                        <span
                          style={{
                            color: showResult
                              ? answers[`${qIndex}-${type}`] === q.answers[type]
                                ? "green"
                                : "red"
                              : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {answers[`${qIndex}-${type}`] || "___"}
                        </span>{" "}
                        is the {type}.
                      </p>

                      {/* WRONG MARK */}
                      {showResult &&
                        answers[`${qIndex}-${type}`] &&
                        answers[`${qIndex}-${type}`] !== q.answers[type] && (
                          <div
                            style={{
                              position: "absolute",
                              right: "-20px",
                              top: "0",
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        ))}

        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </DragDropContext>
  );
};

export default Review1_Page1_Q2;
