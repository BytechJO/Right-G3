import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex C 1.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page2_Q1.css";
import WrongMark from "../../WrongMark";

const Review3_Page2_Q1 = () => {
  const correctAnswers = ["sh", "ch", "ch", "sh", "ch", "sh"];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [locked, setLocked] = useState(false);

  const options = ["sh", "ch"];

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (value, index) => {
    if (locked) return;

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    setWrongInputs([]);
  };

  /* ================= CHECK ================= */
  const checkAnswers = () => {
    if (locked) return;

    if (answers.some((ans) => ans === "")) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let tempScore = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) tempScore++;
      else wrong.push(i);
    });

    setWrongInputs(wrong);

    const total = correctAnswers.length;
    const color =
      tempScore === total ? "green" : tempScore === 0 ? "red" : "orange";

    ValidationAlert[
      tempScore === total ? "success" : tempScore === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${tempScore} / ${total}
        </span>
      </div>
    `);

    setLocked(true);
  };

  const reset = () => {
    setAnswers(["", "", "", "", "", ""]);
    setWrongInputs([]);
    setLocked(false);
  };

  const showAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setLocked(true);
  };

  const sentences = [
    "There was a big spla____ when Jan dived in the pool.",
    "Mar____ is the third month of the year.",
    "Mrs. Bell is the best tea____er in the school.",
    "____ut the door when you leave.",
    "We used a knife to ____op the peppers.",
    "Aunt Jo went ____opping at the mall.",
  ];

  return (
    <div
      className="question-wrapper-unit3-page6-q1"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>C</span>
          Read and complete the sentences. Write{" "}
          <span style={{ color: "#2e3192" }}>sh</span> or{" "}
          <span style={{ color: "#2e3192" }}>ch</span>
        </h5>

        <div className="flex gap-5 items-center">
          {/* QUESTIONS */}
          <div className="flex flex-col gap-6">
            {sentences.map((text, i) => {
              const isWrong = wrongInputs.includes(i);

              return (
                <div
                  key={i}
                  style={{
                    fontSize: "18px",

                    // fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      fontWeight: 500,
                    }}
                  >
                    {i + 1}
                  </span>{" "}
                  {text.split("____").map((part, j) => (
                    <span key={j}>
                      {part}

                      {j === 0 && (
                         <div style={{ position: "relative", display: "inline-block" }}>
                          <select
                            value={answers[i]}
                            onChange={(e) => handleChange(e.target.value, i)}
                            disabled={locked}
                            style={{
                              margin: "0 6px",
                              padding: "4px 8px",
                              position: "relative",
                              // borderRadius: "6px",
                              borderBottom: isWrong
                                ? "2px solid red"
                                : "1px solid #ccc",
                              fontWeight: "bold",
                              // color: "#F79530",
                              outline: "none",
                              backgroundColor: isWrong ? "#ffe5e5" : "white",
                              minWidth: "70px",
                            }}
                          >
                            <option value=""> </option>
                            {options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}{" "}
                          </select>
                          {isWrong && (
                            <div className="absolute top-1 right-8">
                              <WrongMark />
                            </div>
                          )}
                        </div>
                      )}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>

          {/* IMAGE */}
          <div style={{ marginTop: "20px" }}>
            <img
              src={img1}
              alt="exercise"
              style={{ width: "auto", height: "350px" }}
            />
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswer} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review3_Page2_Q1;
