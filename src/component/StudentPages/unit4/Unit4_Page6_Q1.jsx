import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit4_Page6_Q1.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 4.svg";

const Unit4_Page6_Q1 = () => {
  const items = [
    { text: "It's hot! We can wear shorts and T-shirts.", answer: "summer" },
    { text: "Sometimes we can ice skate.", answer: "winter" },
    { text: "It's often cool. We wear jackets.", answer: "autumn" },
    { text: "We can see baby birds.", answer: "spring" },
    {
      text: "It's cold. There aren’t any leaves on the trees.",
      answer: "winter",
    },
    { text: "We can go to the beach, and we can swim.", answer: "summer" },
    { text: "It’s often warm. We can see flowers.", answer: "spring" },
  ];

  const wordBank = ["spring", "summer", "autumn", "winter"];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // ✅ handle select
  const handleChange = (index, value) => {
    if (showCorrect) return;

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // ✅ SHOW ANSWERS
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));
    setShowCorrect(true);
    setWrongMarks([]);
  };

  // ✅ RESET
  const resetAll = () => {
    setAnswers(items.map(() => ""));
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // ✅ CHECK ANSWERS
  const checkAnswers = () => {
    if (showCorrect) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;
    let total = items.length;
    let wrong = [];

    items.forEach((item, i) => {
      if (answers[i]?.trim().toLowerCase() === item.answer.toLowerCase()) {
        score++;
      } else {
        wrong.push(i);
      }
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold">
          Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:"50px",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "40px" }}>
        <h5 className="header-title-page8">
          <span className="ex-A mr-3">D</span>
         Read and write. Which season is it?
        </h5>

        {/* IMAGES */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {[
            { word: "spring", img: img1 },
            { word: "autumn", img: img2 },
            { word: "summer", img: img3 },
            { word: "winter", img: img4 },
          ].map((item, index) => (
            <img
              key={index}
              src={item.img}
              alt={item.word}
              style={{
                width: "auto",
                height: "130px",
                borderRadius: "12px",
              }}
            />
          ))}
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          {items.map((item, i) => {
            const isWrong = wrongMarks.includes(i);

            return (
              <div key={i} className="flex items-center gap-7">
                {/* TEXT */}
                <span className="text-[18px]">
                  <span className="text-[20px] font-bold mr-2">{i + 1}</span> {item.text}
                </span>

                {/* DROPDOWN */}
                <div
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    disabled={showCorrect}
                    style={{
                      minWidth: "140px",
                      padding: "6px 10px",
                      // borderRadius: "8px",
                      borderBottom: `${
                        showCorrect
                          ? isWrong
                            ? "2px solid red"
                            : "1px solid  #999"
                          : "1px solid #999"
                      }`,
                      // fontWeight: "bold",
                      // color: answers[i] ? "#1C398E" : "#000",
                      background: "#fff",
                      fontSize:"18px",
                      outline: "none",
                      cursor: showCorrect ? "default" : "pointer",
                    }}
                  >
                    <option value="">Select</option>

                    {wordBank.map((word) => (
                      <option key={word} value={word}>
                        {word}
                      </option>
                    ))}
                  </select>

                  {/* ❌ Wrong Mark */}
                  {showCorrect && isWrong && (
                    <div
                       className="absolute top-0 -right-3 -translate-y-1/2
      w-[22px] h-[22px]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-nonel"
                    >
                      ✕
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit4_Page6_Q1;