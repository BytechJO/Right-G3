import React, { useState } from "react";
import "./Unit10_Page5_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 4.svg";

import WrongMark from "../../WrongMark";

const data = [
  { img: img1, pattern: "uck", answer: "tr" },
  { img: img2, pattern: "eam", answer: "dr" },
  { img: img3, pattern: "ess", answer: "dr" },
  { img: img4, pattern: "ee", answer: "tr" },
];

const options = ["dr", "tr"];

const Unit10_Page5_Q1 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false);
const [locked ,setLocked]=useState(false)
  const handleSelect = (index, value) => {
    if (showAnswer) return;

    const updated = [...inputs];
    updated[index] = value;

    setInputs(updated);

    const wrongReset = [...wrongInputs];
    wrongReset[index] = false;
    setWrongInputs(wrongReset);
  };

  const checkAnswers = () => {
    if (showAnswer||locked) return;

    if (inputs.some((val) => val.trim() === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please fill in all the answers before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrongFlags = [];

    data.forEach((item, index) => {
      if (inputs[index].toLowerCase() === item.answer) {
        correctCount++;
        wrongFlags[index] = false;
      } else {
        wrongFlags[index] = true;
      }
    });

    setWrongInputs(wrongFlags);
    setShowAnswer(true);

    const total = data.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    const correct = data.map((item) => item.answer);

    setInputs(correct);
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(true);
  };

  const reset = () => {
    setInputs(Array(data.length).fill(""));
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "120px",
          
        }}
      >
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A mr-3">A</span>
          <span style={{ color: "#2e3192", marginRight: "10px" }}>1</span>
          Look and write
          <span style={{ color: "#2e3192" }}> dr </span>
          or
          <span style={{ color: "#2e3192" }}> tr</span>.
        </h5>

    
        {/* QUESTIONS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-7">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-10 relative p-3"
            >
              {/* NUMBER */}
              <span className="absolute -top-2 -left-2 text-lg font-bold">
                {index + 1}
              </span>

              {/* IMAGE */}
              <div className="w-[150px] h-24 flex items-center justify-center">
                <img
                  src={item.img}
                  alt=""
                  className="max-w-full max-h-full"
                />
              </div>

              {/* WORD */}
              <div className="relative flex items-center gap-1 text-xl">
                <select
                  value={inputs[index]}
                  disabled={showAnswer}
                  onChange={(e) => handleSelect(index, e.target.value)}
                  style={{
                    minWidth: "75px",
                    height: "38px",
                    borderBottom: `1px solid ${
                      wrongInputs[index] ? "red" : "black"
                    }`,
                    // borderRadius: "8px",
                    // background: inputs[index] ? "#eff6ff" : "#fff",
                    // color: inputs[index] ? "#1e3a8a" : "#000",
                    fontWeight: "bold",
                    fontSize: "18px",
                    textAlign: "center",
                    outline: "none",
                    padding: "0 8px",
                    cursor: showAnswer ? "not-allowed" : "pointer",
                  }}
                >
                  <option value="">--</option>

                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

              {/* WRONG MARK */}
              {wrongInputs[index] && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <WrongMark />
                </div>
              )}
                <span>{item.pattern}</span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit10_Page5_Q1;