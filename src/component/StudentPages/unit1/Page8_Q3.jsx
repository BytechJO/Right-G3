import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import img from "../../../assets/imgs/test6.png";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Page8_Q3 = () => {
  const [showResult, setShowResult] = useState(false);
  const questions = [
    {
      id: 1,
      text: "Jad is older than his dad.",
      answer: "false",
    },
    {
      id: 2,
      text: "The giraffe is taller than the bear.",
      answer: "true",
    },
    {
      id: 3,
      text: "The bus is faster than the airplane.",
      answer: "false",
    },
    {
      id: 4,
      text: "The car is bigger than the bike.",
      answer: "true",
    },
  ];

  const [answers, setAnswers] = useState({});

  const [locked, setLocked] = useState(false);

  const reset = () => {
    setAnswers({ 1: "", 2: "", 3: "" });
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q) => {
      filled[q.id] = q.answer;
    });
    setAnswers(filled);
    setLocked(true);
    setShowResult(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    if (questions.some((q) => !answers[q.id])) {
      ValidationAlert.info("Please answer all questions");
      return;
    }

    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });

    const total = questions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const message = `
<div style="font-size:20px;text-align:center;">
<b style="color:${color};">Score: ${correct} / ${total}</b>
</div>
`;

    if (correct === total) ValidationAlert.success(message);
    else if (correct === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
    setShowResult(true);
    setLocked(true);
  };

  return (
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
          B
        </span>
        Look and write
        <span style={{ color: "#2e3192" }}>true</span>or
        <span style={{ color: "#2e3192" }}>false</span>.
      </h5>
      <div className="w-[50%] flex flex-col gap-8 mt-8">
        {questions.map((q) => (
          <div key={q.id} className="flex items-center">
            <div className="flex items-center gap-4 w-[55%]">
              <span className="font-bold text-xl">{q.id}</span>
              <span className="text-[1.2rem]">{q.text}</span>
            </div>

            <div className="flex flex-col items-center w-[25%]">
              <div className="flex gap-6 mb-2">
                {["true", "false"].map((val) => {
                  const isSelected = answers[q.id] === val;
                  const isCorrect = q.answer === val;

                  return (
                    <span
                      key={val}
                      onClick={() => {
                        if (locked) return;
                        setAnswers({ ...answers, [q.id]: val });
                      }}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        padding: "4px 12px",
                        display: "inline-block",
                      }}
                    >
                      {val}

                      {/* الدائرة */}
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            left: "-10px",
                            right: "-10px",
                            bottom: "-6px",
                            border: showResult
                              ? isCorrect
                                ? "2px solid green"
                                : "none"
                              : "2px solid red",
                            borderRadius: "20px",
                            pointerEvents: "none",
                          }}
                        />
                      )}

                      {showResult && isSelected && !isCorrect && (
                        <div>
                          <WrongMark />
                        </div>
                      )}
                    </span>
                  );
                })}
              </div>

              {/* الخط */}
              <div className="w-[70%] border-b-[3px] border-gray-500"></div>
            </div>

            {/* الصورة */}
            <div className="w-[20%] flex justify-center relative">
              <img
                src={img}
                alt=""
                style={{
                  width: "100px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* BUTTONS */}
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Page8_Q3;
