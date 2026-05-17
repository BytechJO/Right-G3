import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page1_Q2.css";

const Review7_Page1_Q2 = () => {
  const items = [
    { text: "Where is the boy? I can’t see", answer: "him" },
    { text: "There’s a rainbow in the sky. Look at", answer: "it" },
    { text: "Where are my shoes? Can you see", answer: "them" },
    { text: "Your sister is laughing. I can hear", answer: "her" },
    { text: "Look! A dolphin! Can you see", answer: "it" },
    { text: "Our teacher is Miss May. We like", answer: "her" },
    { text: "The birds are singing. Can you hear", answer: "them" },
    { text: "Hooray! John is the winner! Look at", answer: "him" },
  ];

  const wordBank = ["him", "her", "it", "them"];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

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
      <div className="div-forall" style={{ gap: "40px" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>B</span>
          Complete the sentences. Use the words below.
        </h5>

        {/* CONTENT */}
        <div className="grid" style={{ gridTemplateColumns: "1.5fr 0.5fr" }}>
          <div className="space-y-6">
            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  whiteSpace: "nowrap", // 🔥 هذا المهم
                }}
              >
                {/* TEXT */}
                <span className="text-[18px]">
                  {i + 1}. {item.text}
                </span>
                <div
                  style={{
                    position: "relative",
                    minWidth: "120px",
                  }}
                >
                  <select
                    value={answers[i]}
                    disabled={showCorrect}
                    onChange={(e) => {
                      const updated = [...answers];
                      updated[i] = e.target.value;
                      setAnswers(updated);
                    }}
                    style={{
                      border: "none",
                      borderBottom: `1px solid ${
                        showCorrect
                          ? wrongMarks.some((w) => w.qIndex === i)
                            ? "red"
                            : "black"
                          : "black"
                      }`,
                      outline: "none",
                      background: "transparent",
                      fontWeight: "500",
                      fontSize: "18px",
                      // color: answers[i] ? "#1C398E" : "black",
                      padding: "4px",
                      minWidth: "120px",
                      textAlign: "center",
                      cursor: showCorrect ? "not-allowed" : "pointer",
                    }}
                  >
                    <option value="">Select</option>

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
                {i === 5 && <span className="text-[18px]"> very much.</span>}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-10 items-center">
            <span className="text-[18px] bg-[#fdc791] h-8 w-20 flex justify-center items-center rounded-lg">
              him
            </span>
            <span className="text-[18px] bg-[#fdc791] h-8 w-20 flex justify-center items-center rounded-lg">
              her
            </span>{" "}
            <span className="text-[18px] bg-[#fdc791] h-8 w-20 flex justify-center items-center rounded-lg">
              it
            </span>{" "}
            <span className="text-[18px] bg-[#fdc791] h-8 w-20 flex justify-center items-center rounded-lg">
              them
            </span>
          </div>
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

export default Review7_Page1_Q2;
