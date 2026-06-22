import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page1_Q1.css";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Ex A 6.svg";
import big from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 70/Asset 17.svg";

const Review7_Page1_Q1 = () => {
  const wordBank = ["A", "B", "C", "D", "E", "F"];
  const questions = [
    { id: 1, img: imgA, object: "1", correct: "C" },
    { id: 2, img: imgB, object: "2", correct: "D" },
    { id: 3, img: imgC, object: "3", correct: "A" },
    { id: 4, img: imgD, object: "4", correct: "E" },
    { id: 5, img: imgE, object: "5", correct: "B" },
    { id: 6, img: imgF, object: "6", correct: "F" },
  ];
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [showAns, setShowAns] = useState(false);
const handleChange = (id, value) => {
  setAnswers((prev) => ({
    ...prev,
    [id]: value,
  }));
};
 
  const reset = () => {
    setAnswers({});
    setWrongAnswers({});
    setShowAns(false)
    setLocked(false);
  };
  const showAnswers = () => {
    const filled = {};

    questions.forEach((q) => {
      filled[q.id] = q.correct;
    });

    setAnswers(filled);
    setShowAns(true);
  };

  const checkAnswers = () => {
    if (locked||showAns) return;

    const empty = questions.some((q) => !answers[q.id]);
    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let correct = 0;
    const wrong = {};

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      } else {
        wrong[q.id] = true;
      }
    });

    setWrongAnswers(wrong);

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

  return (
    
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "10px" }}>
          <h5 className="header-title-page8">
            <span style={{ marginRight: "10px" }}>A</span>
            Read and match. Write the letters.
          </h5>

          <div className="w-full mx-auto mb-10">
            <div
              style={{
                display: "flex",
                // justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={big}
                alt="sentences"
                style={{
                  width: "auto",
                  height: "150px",
                }}
              />
            </div>
            {/*  BANK */}
      

            {/* QUESTIONS GRID */}
            <div className="grid grid-cols-3 gap-5 mb-10">
              {questions.map((q) => (
                <div key={q.id} className="flex flex-col items-start">
                  <div className="flex gap-2 items-start">
                    <span className="font-bold text-lg">{q.id}</span>
                    <img
                      src={q.img}
                      style={{
                        height: "120px",
                        // border: "2px solid orange",
                        // borderRadius: "10px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              {questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>{q.id}</span>
              <div
  style={{
    position: "relative",
    minWidth: "120px",
  }}
>
  <select
    value={answers[q.id] || ""}
    disabled={locked}
    onChange={(e) => handleChange(q.id, e.target.value)}
    style={{
      width: "90px",
      border: "none",
      borderBottom: `1px solid ${
        locked
          ? wrongAnswers[q.id]&&!showAns
            ? "red"
            : "black"
          : "black"
      }`,
      background: "transparent",
      outline: "none",
      textAlign: "center",
      fontWeight: "400",
      // color: answers[q.id] ? "#2c5287" : "black",
      fontSize: "18px",
      paddingBottom: "4px",
      cursor: locked ? "not-allowed" : "pointer",
    }}
  >
    <option value="">Select</option>

    {wordBank.map((word) => (
      <option key={word} value={word}>
        {word}
      </option>
    ))}
  </select>

  {locked && wrongAnswers[q.id] &&!showAns&& (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "25px",
        transform: "translateY(-50%)",
        width: "22px",
        height: "22px",
        background: "red",
        color: "white",
        borderRadius: "50%",
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        border: "2px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        pointerEvents: "none",
      }}
    >
      ✕
    </div>
  )}
</div>
                </div>
              ))}
            </div>
          </div>
          <div className="action-buttons-container mt-10">
            <button onClick={reset} className="try-again-button">
              Start Again ↻
            </button>
            <button
              onClick={showAnswers}
              className="show-answer-btn swal-continue"
            >
              Show Answer
            </button>
            <button onClick={checkAnswers} className="check-button2">
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>

  );
};

export default Review7_Page1_Q1;
