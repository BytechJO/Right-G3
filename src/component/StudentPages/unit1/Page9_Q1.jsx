import React, { useState } from "react";
import img1 from "../../../assets/imgs/test6.png";
import img2 from "../../../assets/imgs/test6.png";
import img3 from "../../../assets/imgs/test6.png";
import img4 from "../../../assets/imgs/test6.png";
import img5 from "../../../assets/imgs/test6.png";
import img6 from "../../../assets/imgs/test6.png";

import ValidationAlert from "../../Popup/ValidationAlert";
import "./Page9_Q1.css";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

const Page9_Q1 = () => {
  const questions = [
    { id: 1, text: "The clown is taller than the boy.", answer: 2 },
    { id: 2, text: "The car is faster than the bike.", answer: 3 },
    { id: 3, text: "The couch is bigger than the TV.", answer: 6 },
    { id: 4, text: "The book is heavier than the pen.", answer: 1 },
    { id: 5, text: "The clown is thinner than the panda bear.", answer: 5 },
    { id: 6, text: "The feather is lighter than the bag.", answer: 4 },
  ];
  const images = [img1, img2, img3, img4, img5, img6];
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false); // ⭐ NEW — قفل التعديل
  const [showResult, setShowResult] = useState(false);
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
        Read and number the pictures.
      </h5>
      <div className="w-[60%] mt-6 flex gap-10">
        <div className="flex flex-col gap-12 w-1/2">
          {questions.map((q) => (
            <p key={q.id}>
              <span className="font-bold mr-2">{q.id}</span>
              {q.text}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 w-1/2">
          {images.map((img, i) => (
            <div
              key={i}
              className="border-2 border-orange-400 rounded-xl relative overflow-hidden"
              style={{ height: "100px" }}
            >
              <img
                src={img}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* 🔥 الدائرة (بس بعد check) */}
              {showResult && answers[i] && (
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    left: "-6px",
                    right: "-6px",
                    bottom: "-6px",
                    border:
                      Number(answers[i]) === questions[i].answer
                        ? "3px solid green"
                        : "3px solid red",
                    borderRadius: "16px",
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* ❌ WrongMark */}
              {showResult &&
                answers[i] &&
                Number(answers[i]) !== questions[i].answer && (
                  <WrongMark top="bottom-1" left="left-10" marginLeft="" />
                )}

              {/* input */}
              <input
                type="number"
                min="1"
                max={images.length}
                value={answers[i] || ""}
                onChange={(e) => {
                  if (locked) return;

                  let value = Number(e.target.value);

                  if (!value) return;
                  if (value < 1 || value > images.length) return;

                  const alreadyUsed = Object.entries(answers).some(
                    ([key, val]) => Number(val) === value && Number(key) !== i,
                  );

                  if (alreadyUsed) return;

                  setAnswers((prev) => ({
                    ...prev,
                    [i]: value,
                  }));
                }}
                className="
                absolute bottom-0 left-0
                w-10 h-10
                border border-orange-400
                bg-white
                text-center
                outline-none
                 rounded-xl rounded-bl-none
                "
              />
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
  );
};

export default Page9_Q1;
