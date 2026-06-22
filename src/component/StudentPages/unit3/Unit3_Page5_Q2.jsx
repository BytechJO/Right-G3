import React, { useState } from "react";
import "./Unit3_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 6.svg";

const data = [
  {
    img: img1,
    before: "There are",
    after: "bananas in the fridge.",
    answer: "a few",
  },
  {
    img: img2,
    before: "There’s",
    after: "orange juice.",
    answer: "a little",
  },
  {
    img: img3,
    before: "There is",
    after: "water in the glass.",
    answer: "a little",
  },
  {
    img: img4,
    before: "There is",
    after: "chocolate cake.",
    answer: "a little",
  },
  {
    img: img5,
    before: "There’s",
    after: "sugar.",
    answer: "a little",
  },
  {
    img: img6,
    before: "There are",
    after: "apples in the bowl.",
    answer: "a few",
  },
];

const options = ["a little", "a few"];

export default function Unit3_Page5_Q2() {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (index, value) => {
    if (showAnswer) return;

    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });

    setWrongInputs(Array(data.length).fill(false));
  };

  const checkAnswers = () => {
    if (showAnswer) return;

    if (inputs.some((i) => i === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please fill in all the answers before checking.",
      );
      return;
    }

    let correct = 0;
    const wrong = [];

    data.forEach((item, i) => {
      if (inputs[i] === item.answer) {
        correct++;
        wrong[i] = false;
      } else {
        wrong[i] = true;
      }
    });

    setWrongInputs(wrong);
    setShowAnswer(true);

    const total = data.length;

    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    else if (correct === 0)
      ValidationAlert.error(`Score: ${correct} / ${total}`);
    else ValidationAlert.warning(`Score: ${correct} / ${total}`);
  };

  const handleShowAnswer = () => {
    setInputs(data.map((d) => d.answer));
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(true);
  };

  const handleReset = () => {
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
          gap: "60px",
        }}
      >
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            B
          </span>
          Look, read, and write.
        </h5>

        {/* QUESTIONS */}
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px 60px",
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              {/* IMAGE */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "5px",
                  }}
                >
                  <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {index + 1}
                  </span>
                  <img
                    src={item.img}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>

                {wrongInputs[index] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "-6px",
                      width: "22px",
                      height: "22px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      border: "2px solid white",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>

              {/* SENTENCE */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "18px",

                  flexWrap: "wrap",
                }}
              >
                <span>{item.before}</span>

                <select
                  value={inputs[index]}
                  onChange={(e) => handleSelect(index, e.target.value)}
                  disabled={showAnswer}
                  style={{
                    minWidth: "120px",
                    border: "none",
                    borderBottom: ` ${
                      wrongInputs[index] ? "2px solid red" : "1px solid #000"
                    }`,
                    background: "transparent",
                    // fontWeight: "bold",
                    fontSize: "18px",
                    outline: "none",
                    textAlign: "center",
                    // color: inputs[index] ? "#1C398E" : "#000",
                    cursor: showAnswer ? "default" : "pointer",
                  }}
                >
                  <option value="">Select</option>

                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>

                <span>{item.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <Button
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleReset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
}
