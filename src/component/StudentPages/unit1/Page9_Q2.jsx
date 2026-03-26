import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Page9_Q2 = () => {
  const questions = [
    {
      parts: [
        { type: "text", value: "basketball player / young / referee" },
        {
          type: "input",
          answer: "The basketball player is younger than the referee.",
        },
      ],
    },
    {
      parts: [
        { type: "text", value: "cat / short / bear" },
        { type: "input", answer: "The cat is shorter than the bear." },
      ],
    },
    {
      parts: [
        { type: "text", value: "mouse / small / dog" },
        { type: "input", answer: "The mouse is smaller than the dog." },
      ],
    },
    {
      parts: [
        { type: "text", value: "basketball court / big / scoreboard" },
        {
          type: "input",
          answer: "The basketball court is bigger than the scoreboard.",
        },
      ],
    },
  ];

  const [answers, setAnswers] = useState(
    questions.map((q) => q.parts.map((p) => (p.type === "input" ? "" : null))),
  );
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);

  const wordBank = [
    { id: "w1", text: "The basketball player is younger than the referee." },
    { id: "w3", text: "The mouse is smaller than the dog." },
    { id: "w4", text: "The basketball court is bigger than the scoreboard." },
    { id: "w2", text: "The cat is shorter than the bear." },
  ];
  const onDragEnd = (result) => {
    if (!result.destination || locked) return;

    const { draggableId, destination } = result;

    setAnswers((prev) => {
      const copy = prev.map((row) => [...row]);

      // remove word from previous place
      copy.forEach((row, qi) =>
        row.forEach((val, pi) => {
          if (val === draggableId) copy[qi][pi] = "";
        }),
      );

      if (destination.droppableId.startsWith("drop-")) {
        const [qIndex, pIndex] = destination.droppableId
          .replace("drop-", "")
          .split("-")
          .map(Number);
        copy[qIndex][pIndex] = draggableId;
      }

      return copy;
    });

    setWrongInputs([]);
  };
  const usedWords = answers.flat().filter(Boolean);
  const checkAnswers = () => {
    if (locked) return;
    if (answers.some((row) => row.includes(""))) {
      ValidationAlert.info();
      return;
    }
    let wrong = [];
    let score = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      q.parts.forEach((p, pIndex) => {
        if (p.type === "input") {
          total++;
          const word =
            wordBank.find((w) => w.id === answers[qIndex][pIndex])?.text || "";
          if (word === p.answer) score++;
          else wrong.push(`${qIndex}-${pIndex}`);
        }
      });
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
      questions.map((q) =>
        q.parts.map((p) =>
          p.type === "input"
            ? wordBank.find((w) => w.text === p.answer)?.id || ""
            : null,
        ),
      ),
    );
    setWrongInputs([]);
    setLocked(true);
  };

  const reset = () => {
    setAnswers(
      questions.map((q) =>
        q.parts.map((p) => (p.type === "input" ? "" : null)),
      ),
    );
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
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "20px" }}>
            E
          </span>
          Read and write the sentences.
        </h5>
        <div className="w-[60%]">
          {/* WORD BANK */}
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

          {/* QUESTIONS */}
          <div className="flex flex-col gap-7">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="flex items-center gap-5">
                <span className="font-bold text-sm w-5 text-center">
                  {qIndex + 1}
                </span>
                <div className="flex flex-col gap-2 flex-1">
                  <span className="text-[16px] font-medium">
                    {q.parts[0].value}
                  </span>

                  <Droppable
                    droppableId={`drop-${qIndex}-1`}
                    isDropDisabled={locked}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`w-full min-h-7 border-b-2  border-black flex items-center text-[16px] font-semibold px-1 relative ${
                          snapshot.isDraggingOver ? "bg-blue-100" : ""
                        }`}
                      >
                        <span
                          className={`
                            ${
                              answers[qIndex][1]
                                ? locked
                                  ? wrongInputs.includes(`${qIndex}-1`)
                                    ? "text-red-500"
                                    : "text-green-600"
                                  : "text-red-500"
                                : "text-black"
                            }
                          `}
                        >
                          {wordBank.find((w) => w.id === answers[qIndex][1])
                            ?.text || ""}
                        </span>

                        {provided.placeholder}

                        {/* ❌ WRONG */}
                        {wrongInputs.includes(`${qIndex}-1`) && <WrongMark />}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ❌ الأزرار كما هي */}
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </DragDropContext>
  );
};

export default Page9_Q2;
