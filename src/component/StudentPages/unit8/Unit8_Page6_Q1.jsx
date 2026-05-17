import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit8_Page6_Q1.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Asset 11.svg";

const Unit8_Page6_Q1 = () => {
  const items = [
    { text: "Did Helen comb her hair?", answer: "Yes, she did." },
    { text: "Did Helen brush her teeth?", answer: "Yes, she did." },
    { text: "Did Tom help his mom?", answer: "Yes, he did." },
    { text: "Did Tom wash the dishes?", answer: "No, he didn’t." },
  ];

  const wordBank = [
    "Yes, she did.",
    "Yes, he did.",
    "No, she didn’t.",
    "No, he didn’t.",
  ];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // =========================
  // SHOW ANSWERS (🔥 FIXED)
  // =========================
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));
    setShowCorrect(true);
    setWrongMarks([]);
  };

  // =========================
  // RESET
  // =========================
  const resetAll = () => {
    setAnswers(items.map(() => ""));
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // =========================
  // CHECK ANSWERS (🔥 FIXED)
  // =========================
  const checkAnswers = () => {
    if (showCorrect) return;

    // ❌ إذا في فراغ
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
        wrong.push({ qIndex: i });
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
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{ gap: "20px" }}
      >
        <h5 className="header-title-page8">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            D
          </span>
          Look and write the answers.
        </h5>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <img
            src={img1}
            style={{ width: "auto", height: "auto", objectFit: "cover" }}
          />
        </div>
       

        {/* CONTENT */}

        <div className="space-y-6 mt-5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-7">
              {/* TEXT */}
              <span className="text-[18px] w-[250px]">
                {i + 1}. {item.text}
              </span>

              {/* INLINE DROP */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <select
                  value={answers[i]}
                  disabled={showCorrect}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    minWidth: "180px",
                    textAlign: "center",
                    fontWeight: "500",
                    // color: answers[i] ? "#1C398E" : "black",
                    border: "none",
                    borderBottom: `2px solid ${
                      showCorrect
                        ? wrongMarks.some((w) => w.qIndex === i)
                          ? "red"
                          : "#black"
                        : "black"
                    }`,
                    paddingBottom: "4px",
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                    cursor: showCorrect ? "not-allowed" : "pointer",
                  }}
                >
                  <option value="">Select answer</option>

                  {wordBank.map((word, idx) => (
                    <option key={idx} value={word}>
                      {word}
                    </option>
                  ))}
                </select>

                {showCorrect && wrongMarks.some((w) => w.qIndex === i) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-28px",
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

export default Unit8_Page6_Q1;
