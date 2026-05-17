import React, { useState, useRef } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review6_Page2_Q2.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 3.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 4.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 5.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 6.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex E 7.svg";

const Review6_Page2_Q2 = () => {
  const [locked, setLocked] = useState(false);
  const [showedAnswer, setShowedAnswer] = useState(false);
  const items = [
    { word: "an", correct: false, img: img1 },
    { word: "fl", correct: true, img: img2 },
    { word: "cr", correct: true, img: img3 },
    { word: "cra", correct: false, img: img4 },
    { word: "lio", correct: false, img: img5 },
    { word: "sk", correct: true, img: img6 },
  ];
  const [answers, setAnswers] = useState(Array(items.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const showAnswers = () => {
    const correct = items.map((item) => (item.correct ? "y" : ""));
    setAnswers(correct);
    setShowResult(true);
    setShowedAnswer(true);
    setLocked(true);
  };
  const resetAll = () => {
    setAnswers(Array(items.length).fill(""));
    setShowResult(false);
    setLocked(false);
    setShowedAnswer(false);
  };
  const checkAnswers = () => {
    if (locked) return;

    let score = 0;

    items.forEach((item, i) => {
      const userAnswer = answers[i];

      // فقط نحسب إذا في إجابة
      if (userAnswer === "" || userAnswer === null) return;

      const isCorrect =
        (item.correct && userAnswer === "y") ||
        (!item.correct && userAnswer === "");

      if (isCorrect) score++;
    });

    const total = items.length;

    const message = `Score: ${score} / ${total}`;

    setShowResult(true);
    setLocked(true);

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
  };

  const handleSelect = (index, value) => {
    if (locked) return;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        position: "relative",
      }}
    >
      <div className="div-forall" style={{ gap: "40px" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>E</span>
          Write <span style={{ color: "#2e3192" }}>y</span> in the blank only
          under the pictures that end with
          <span style={{ color: "#2e3192" }}>y</span>.
        </h5>
        <div className="grid grid-cols-3 gap-10">
          {items.map((item, i) => {
            const isWrong =
              showResult &&
              answers[i] !== "" &&
              ((item.correct && answers[i] !== "y") ||
                (!item.correct && answers[i] !== ""));

            return (
              <div
                key={i}
                className="relative text-center flex flex-col justify-center items-center gap-2"
              >
                {/* الصورة */}
                <img
                  src={item.img}
                  style={{ width: "auto", height: "150px" }}
                />

                {/* الكلمة + الخط */}
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-[18px]">
                  <span  className="text-[20px] font-bold mr-2">{i + 1}</span>   {item.word}
                  </span>

                  <select
                    value={answers[i]}
                    onChange={(e) => handleSelect(i, e.target.value)}
                    disabled={locked}
                    className="border-b px-2 py-1 text-[20px] font-bold"
                  >
                    <option value="">__</option>
                    <option value="y">y</option>
                  </select>
                  {/* ❌ الغلط */}
                  {isWrong && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right:"0px",
                        transform: "translateY(-50%)",
                        width: "22px",
                        height: "22px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "500",
                        fontSize:"12px",
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
            );
          })}
        </div>
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
    </div>
  );
};

export default Review6_Page2_Q2;
