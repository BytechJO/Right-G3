import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgA from "../../../assets/imgs/test6.png";
import imgB from "../../../assets/imgs/test6.png";
import imgC from "../../../assets/imgs/test6.png";
import imgD from "../../../assets/imgs/test6.png";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Unit2_Page6_Q1 = () => {
  const questions = [
    {
      id: 1,
      img: imgA,
      options: ["take the subway", "take a taxi"],
      correct: "take the subway",
    },
    {
      id: 2,
      img: imgB,
      options: ["take a bus", "ride a bike"],
      correct: "ride a bike",
    },
    {
      id: 3,
      img: imgC,
      options: ["ride a bike", "walk"],
      correct: "walk",
    },
    {
      id: 4,
      img: imgD,
      options: ["take a bus", "take a train"],
      correct: "take a bus",
    },
  ];
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);
  const handleSelect = (qId, option) => {
    if (locked) return;

    setSelected((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };
  const reset = () => {
    setSelected({});
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q) => {
      filled[q.id] = q.correct;
    });
    setSelected(filled);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;
    const hasEmpty = questions.some((q) => !selected[q.id]);

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }
    let correct = 0;

    questions.forEach((q) => {
      if (selected[q.id] === q.correct) correct++;
    });

    const total = questions.length;

    const msg = `
    <div style="font-size:20px;text-align:center;">
      <b>Score: ${correct} / ${total}</b>
    </div>
  `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
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
      <h5 className="header-title-page8 pb-2.5">
        <span className="ex-A" style={{ marginRight: "20px" }}>
          D
        </span>
        Look, read, and circle.
      </h5>

      <div className="w-[50%] mx-auto">
        <div className="flex flex-col gap-10 items-center mb-10">
          {[0, 2].map((startIndex) => (
            <div key={startIndex} className="w-full">
              <div className="flex justify-between px-10">
                {questions.slice(startIndex, startIndex + 2).map((q) => (
                  <div
                    key={q.id}
                    className="flex flex-col items-start  w-[45%]"
                  >
                    {/* الصورة */}
                    <div className="flex gap-2 items-start">
                      <span className="font-bold text-lg">{q.id}</span>
                      <img
                        src={q.img}
                        style={{
                          height: "10vw",
                          border: "2px solid #F79530",
                          borderRadius: "10px",
                        }}
                      />
                    </div>

                    <div className="flex flex-col items-start  mt-2">
                      <div
                        onClick={() => handleSelect(q.id, q.options[0])}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          padding: "4px 8px",
                          marginLeft: "20px",
                          fontSize: "18px",
                          display: "inline-block",
                        }}
                      >
                        {q.options[0]}

                        {/* الدائرة */}
                        {selected[q.id] === q.options[0] && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-5px",
                              left: "-8px",
                              right: "-8px",
                              bottom: "-5px",
                              border: showResult
                                ? q.options[0] === q.correct
                                  ? "2px solid green"
                                  : "none"
                                : "2px solid red",
                              borderRadius: "20px",
                              pointerEvents: "none",
                            }}
                          />
                        )}

                        {/* ❌ إذا غلط */}
                        {showResult &&
                          selected[q.id] === q.options[0] &&
                          selected[q.id] !== q.correct && <WrongMark />}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "220px",
                          fontSize: "18px",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>I</span>
                        <span>to school.</span>
                      </div>

                      <div style={{ width: "100%" }}>
                        <div
                          onClick={() => handleSelect(q.id, q.options[1])}
                          style={{
                            position: "relative",
                            cursor: "pointer",
                            padding: "4px 8px",
                            marginLeft: "20px",
                            fontSize: "18px",
                            display: "inline-block",
                          }}
                        >
                          {q.options[1]}

                          {/* الدائرة */}
                          {selected[q.id] === q.options[1] && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-5px",
                                left: "-8px",
                                right: "-8px",
                                bottom: "-5px",
                                border: showResult
                                  ? q.options[1] === q.correct
                                    ? "2px solid green"
                                    : "none"
                                  : "2px solid red",
                                borderRadius: "20px",
                                pointerEvents: "none",
                              }}
                            />
                          )}

                          {/* ❌ إذا غلط */}
                          {showResult &&
                            selected[q.id] === q.options[1] &&
                            selected[q.id] !== q.correct && <WrongMark />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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

export default Unit2_Page6_Q1;
