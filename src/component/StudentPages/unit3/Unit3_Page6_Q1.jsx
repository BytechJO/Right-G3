import React, { useState } from "react";
import "./Unit3_Page6_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 4.svg";

const questions = [
  {
    id: 1,
    text: "Do they have any vegetables?",
    image: img1,
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 2,
    text: "Does she have any hats?",
    image: img2,
    options: ["Yes, she has some.", "No, she doesn’t have any."],
    correct: "Yes, she has some.",
  },
  {
    id: 3,
    text: "Do they have any hot drinks?",
    image: img3,
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 4,
    text: "Does she have any ice cream?",
    image: img4,
    options: ["Yes, she has some.", "No, she doesn’t have any."],
    correct: "No, she doesn’t have any.",
  },
];

export default function CircleQuestions() {
  const [answers, setAnswers] = useState({});
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qId, option) => {
    if (showResult) return;
    setAnswers({ ...answers, [qId]: option });
  };

  // ✅ CHECK
  const checkAnswers = () => {
    if (showResult) return;

    if (Object.keys(answers).length !== questions.length) {
      ValidationAlert.info(
        "Oops!",
        "Please answer all questions before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrong = {};

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
        wrong[q.id] = false;
      } else {
        wrong[q.id] = true;
      }
    });

    setWrongAnswers(wrong);
    setShowResult(true);

    const total = questions.length;
    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  // ✅ SHOW ANSWERS
  const showAnswers = () => {
    const correct = {};
    questions.forEach((q) => {
      correct[q.id] = q.correct;
    });

    setAnswers(correct);
    setWrongAnswers({});
    setShowResult(true);
  };

  // ✅ RESET
  const reset = () => {
    setAnswers({});
    setWrongAnswers({});
    setShowResult(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        // paddingBottom: "120px",
      }}
    >
      <div className="div-forall" style={{ gap: "10px" }}>
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Read and circle.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // 🔥 عمودين
            gap: "20px 60px",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {questions.map((q) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* QUESTION */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span className="text-[20px]" style={{ fontWeight: "bold" }}>
                  {q.id}
                </span>
                <span className="text-[18px]">{q.text}</span>
              </div>

              {/* IMAGE */}

              <img
                src={q.image}
                style={{
                  width: "auto",
                  height: "110px",
                }}
              />

              {/* OPTIONS */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {q.options.map((opt, i) => {
                  const isSelected = answers[q.id] === opt;
                  const isCorrect = opt === q.correct;

                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(q.id, opt)}
                      style={{
                        cursor: showResult ? "default" : "pointer",
                        padding: "5px 10px",
                        borderRadius: "25px",
                        // border: "2px solid",
                        width: "fit-content",
                        fontSize: "16px",
                        position: "relative",
                        border: isSelected
                          ? showResult
                            ? isCorrect
                              ? "1px solid #f39b42"
                              : "2px solid red"
                            : "1px solid #f39b42"
                          : "1px solid transparent",

                        // color: isSelected ? "#1C398E" : "black",

                        background: "#fff",
                      }}
                    >
                      {opt}

                      {/* ❌ WRONG */}
                      {showResult && isSelected && !isCorrect && (
                        <span
                          className={`absolute top-0 right-0  -translate-y-1/2
      w-[22px] h-[22px]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-none`}
                        >
                          ✕
                        </span>
                      )}
                    </div>
                  );
                })}
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
    </div>
  );
}
