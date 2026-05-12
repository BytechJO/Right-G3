import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex B 4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    fixedQuestion: "What does he have?",
    fixedAnswer: "He has a glove.",
    correctQuestion: "What does he have?",
    correctAnswer: "He has a glove.",
    
    lockQuestion: false,
    lockAnswer: false,optionsQuestion: ["What does he has?", "What does he have?"],
    optionsAnswer: ["He has a glove.", "He has a banana.", "He has a doll."],
  },
  {
    id: 2,
    img: img2,
    fixedQuestion: "What does she have?",
    correctQuestion: "What does she have?",
    correctAnswer: "She has an apple.",
    
    lockQuestion: false,
    lockAnswer: false,optionsQuestion: ["What does she has?", "What does she have?"],
    optionsAnswer: [
      "She has an apple.",
      "She has a doll.",
      "She has a banana.",
    ],
  },
  {
    id: 3,
    img: img4,
    correctQuestion: "What does she have?",
    correctAnswer: "She has a banana.",
    lockQuestion: false,
    lockAnswer: false,
    optionsQuestion: ["What does she has?", "What does she have?"],
    optionsAnswer: [
      "She has an apple.",
      "She has a banana.",
      "She has a doll.",
    ],
  },
  {
    id: 4,
    img: img3,
    correctQuestion: "What does she have?",
    correctAnswer: "She has a doll.",
    lockQuestion: false,
    lockAnswer: false,
    optionsQuestion: ["What does she has?", "What does she have?"],
    optionsAnswer: [
      "She has an apple.",
      "She has a glove..",
      "She has a doll.",
    ],
  },
];

export default function WB_Unit3_Page15_QB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleCheck = () => {
    if (showAns ||showResults) return;

    const allAnswered = ITEMS.every((item) => {
      const qReady = item.lockQuestion || answers[`q-${item.id}`];
      const aReady = item.lockAnswer || answers[`a-${item.id}`];
      return qReady && aReady;
    });

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    let total = 0;

    ITEMS.forEach((item) => {
      const userQ = item.lockQuestion
        ? item.correctQuestion
        : answers[`q-${item.id}`];

      const userA = item.lockAnswer
        ? item.correctAnswer
        : answers[`a-${item.id}`];

      if (userQ === item.correctQuestion) score++;
      if (userA === item.correctAnswer) score++;

      total += 2;
    });

    setShowResults(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((item) => {
      if (!item.lockQuestion) {
        filled[`q-${item.id}`] = item.correctQuestion;
      }
      if (!item.lockAnswer) {
        filled[`a-${item.id}`] = item.correctAnswer;
      }
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrongQuestion = (item) =>
    showResults &&
    !item.lockQuestion &&
    answers[`q-${item.id}`] !== item.correctQuestion;

  const isWrongAnswer = (item) =>
    showResults &&
    !item.lockAnswer &&
    answers[`a-${item.id}`] !== item.correctAnswer;

  const renderSelect = (item, type, isWrong) => {
    const key = `${type}-${item.id}`;
    const value = answers[key] || "";

    const options = type === "q" ? item.optionsQuestion : item.optionsAnswer;

    return (
      <div style={{ position: "relative" ,marginBottom:"15px"}}>
        <select
          value={value}
          disabled={showAns||showResults}
          onChange={(e) =>
            setAnswers((prev) => ({
              ...prev,
              [key]: e.target.value,
            }))
          }
          className="w-[70%] text-[18px] curser-pointer"
          style={{
            borderBottom: isWrong ? "2px solid red" : "1px solid black",
          }}
        >
          <option value="">Select...</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {isWrong && (
          <div
            style={{
              position: "absolute",
              top: "-7px",
              right: "64px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              border: "2px solid white",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  const renderFixedLine = (text) => (
    <div className="border-b w-[80%] text-[18px]">{text}</div>
  );

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{gap:"40px"}}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span> Look and write the questions and
          answers.
        </h1>

        <div
          className="grid grid-cols-2 justify-center gap-y-5 px-5"
          style={{ justifyItems: "center" }}
        >
          {ITEMS.map((item) => (
            <div key={item.id} className="w-full flex flex-col gap-5">
              <div className="flex gap-10">
                <span className="text-xl font-semibold">{item.id}</span>{" "}
                <img
                  src={item.img}
                  
                  style={{ height: "auto", width: "140px" }}
                />
              </div>

              <div className="flex flex-col gap-5">
                {item.lockQuestion
                  ? renderFixedLine(item.fixedQuestion)
                  : renderSelect(item, "q", isWrongQuestion(item))}

                {item.lockAnswer
                  ? renderFixedLine(item.fixedAnswer)
                  : renderSelect(item, "a", isWrongAnswer(item))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-b15-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}
