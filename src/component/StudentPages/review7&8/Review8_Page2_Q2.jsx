import React, { useState } from "react";
import "./Review8_Page2_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex D 3.svg";
import WrongMark from "../../WrongMark";

const data = [
  { img: img1, pattern: "an", answer: "f" },
  { img: img2, pattern: "ug", answer: "r" },
  { img: img3, pattern: "ig", answer: "d" },
];

const options = ["d", "f", "r"];

const Review8_Page2_Q2 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const handleChange = (index, value) => {
    if (showAnswer) return;

    const updated = [...inputs];
    updated[index] = value;

    setInputs(updated);
  };

  const checkAnswers = () => {
    if (showAnswer) return;

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
          gap: "95px",
        }}
      >
        <h5 className="header-title-page8 pb-2.5">
          <span style={{ marginRight: "10px" }}>D</span>
          Look and write
          <span style={{ color: "#2e3192" }}> d</span>,
          <span style={{ color: "#2e3192" }}> f</span>
          or
          <span style={{ color: "#2e3192" }}> r</span>
          for each picture.
        </h5>

        <div className="flex justify-center gap-25 mt-7">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-10 relative"
            >
              {/* الصورة */}
              <div className=" flex items-start ">
                {/* الرقم */}
                <span className="text-[20px] font-bold">
                  {index + 1}
                </span>
                <img
                  src={item.img}
                  alt=""
                 
                  style={{width:"170px", height: "150px" }}
                />
              </div>

              {/* الكلمة */}
              <div className="relative flex items-center gap-2 text-xl">
                <select
                  value={inputs[index]}
                  disabled={showAnswer}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className={`border-b-1 outline-none bg-transparent text-center font-bold text-xl min-w-[70px]
                    ${wrongInputs[index] ? "border-red-500" : "border-black"}
                    ${inputs[index] ? "text-black" : "text-black"}`}
                >
                  <option value=""> </option>

                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
 {/* Wrong mark */}
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

export default Review8_Page2_Q2;
