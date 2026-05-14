import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 3.svg";
import WrongMark from "../../WrongMark";

const Unit5_Page6_Q1 = () => {
  const questions = [
    {
      id: 1,
      img: img1,
      question: "Is there a bathtub behind the toilet?",
      correct: "No, there isn’t.",
    },
    {
      id: 2,
      img: img2,
      question: "Are there books in front of the door?",
      correct: "No, there aren’t",
    },
    {
      id: 3,
      img: img3,
      question: "Is there a telephone next to the sink?",
      correct: "Yes, there is.",
    },
  ];

  const sentences = [
    "No, there isn’t.",
    "No, there aren’t",
    "Yes, there is.",
    "Yes, there are.",
  ];

  const [answers, setAnswers] = useState(questions.map(() => ""));
  const [locked, setLocked] = useState(false);

  /* ================= SELECT ================= */
  const handleSelect = (value, index) => {
    if (locked) return;

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  /* ================= CHECK ================= */
  const checkAnswers = () => {
    if (locked) return;

    if (answers.includes("")) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }

    let score = 0;

    answers.forEach((ans, i) => {
      if (ans === questions[i].correct) score++;
    });

    const total = questions.length;

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`Score: ${score} / ${total}`);

    setLocked(true);
  };

  const reset = () => {
    setAnswers(questions.map(() => ""));
    setLocked(false);
  };

  const showAnswer = () => {
    setAnswers(questions.map((q) => q.correct));
    setLocked(true);
  };

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="div-forall" style={{ gap: "40px" }}>
        <h5 className="header-title-page8">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Look, read, and answer.
        </h5>

        {/* QUESTIONS */}
        {questions.map((q, index) => {
          const isWrong = locked && answers[index] !== q.correct;

          return (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <span className="text-[20px] font-bold">{q.id}</span>
              {/* IMAGE */}
              <img
                src={q.img}
                alt=""
                style={{ height: "110px", borderRadius: "10px" }}
              />

              {/* QUESTION */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "110px",
                }}
              >
                <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                  {q.question}
                </p>

                {/* DROPDOWN */}
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <select
                    value={answers[index]}
                    disabled={locked}
                    onChange={(e) => handleSelect(e.target.value, index)}
                    style={{
                      padding: "8px 12px",
                      fontSize: "16px",
                      // borderRadius: "6px",
                      width: "100%",
                      borderBottom: isWrong
                        ? "2px solid red"
                        : "1px solid #ccc",
                      fontWeight: "bold",
                      cursor: locked ? "not-allowed" : "pointer",
                    }}
                  >
                    <option value="">Choose answer</option>
                    {sentences.map((s, i) => (
                      <option key={i} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  {/* ❌ Wrong mark */}
                  {isWrong && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "0px",
                      }}
                    >
                      <WrongMark />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswer}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit5_Page6_Q1;
