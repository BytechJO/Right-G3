import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 4.svg";
import "./Review10_Page1_Q2.css";
const Review10_Page1_Q2 = () => {
  const questions = [
    {
      img: img1,
      q: "What will she do on the weekend?",
      type: "input",
      blank: ["She", "will", "read", "a", "book", "."],
      correct: "She will read a book",
      wrong: "She will play football",
    },
    {
      img: img2,
      q: "What will they do on the weekend?",
      type: "input",
      blank: ["will", "They", "eat", "at", "restaurant", "a"],
      correct: "They will eat at a restaurant",
      wrong: "She will build a sandcastle.",
    },
    {
      img: img3,
      type: "reverse",
      answer: "He will build a sandcastle.",
      blank: ["he", "What", "do", "will", "weekend", "the", "on"],
      correct: "What will he do on the weekend",
      wrong: "What will she do on the weekend",
    },
    {
      img: img4,
      q: "What will she do on the weekend?",
      type: "input",
      blank: ["do", "She", "homework", "will", "her"],
      correct: "She will do her homework",
      wrong: "She will build a sandcastle.",
    },
  ];

  const correct = {};
  questions.forEach((q, i) => {
    if (q.type === "input" || q.type === "reverse") {
      correct[i] = q.correct;
    }
  });

  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const reset = () => {
    setAnswers({});
    setLocked(false);
  };

  const showAnswers = () => {
    const formatted = {};

    questions.forEach((q, i) => {
      if (q.type === "input" || q.type === "reverse") {
        formatted[i] = q.correct;
      }
    });

    setAnswers(formatted);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;
    let score = 0;

    const empty = questions.some(
      (q, i) => (q.type === "input" || q.type === "reverse") && !answers[i],
    );
    if (empty) {
      ValidationAlert.info();
      return;
    }

    Object.keys(correct).forEach((key) => {
      if (answers[key] === correct[key]) score++;
    });

    const total = Object.keys(correct).length;
    if (score < total) {
      ValidationAlert.warning(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:orange;">Score: ${score} / ${total}</b>
        </div>
      `);
    } else {
      ValidationAlert.success(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:green;">Score: ${score} / ${total}</b>
        </div>
      `);
    }
    setLocked(true);
  };

  const isWrong = (index) => {
    if (!locked) return false;

    return answers[index] !== questions[index].correct;
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
      <div className="div-forall" style={{gap:"20px"}}>
        <h5 className="header-title-page8 mb-7">
          <span className="mr-3">B</span>Look, read, and write the questions or
          answers.
        </h5>

        <div className="questions-grid">
          {questions.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                // height: "300px",
              }}
            >
              {/* الرقم - جزء من الـ flex بدل absolute */}
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  // minWidth: "24px",
                  paddingTop: "4px",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>

              {/* محتوى السؤال */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",

                  // flex: 1,
                  // height: "100%", // 🔥 مهم
                  // justifyContent: "space-between",
                }}
              >
                {/* الصورة */}
                <img
                  src={item.img}
                  alt="question"
                  style={{
                    width: "180px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />

                {/* نص السؤال */}
                {item.q && (
                  <p style={{ margin: 0, fontWeight: "500" }}>{item.q}</p>
                )}

                {/* نوع fixed */}
                {item.type === "fixed" && (
                  <div
                    style={{
                      borderBottom: "2px solid black",
                      padding: "5px 0",
                      fontWeight: "bold",
                      width: "250px",
                      color: "#000",
                    }}
                  >
                    {item.answer}
                  </div>
                )}

                {(item.type === "input" || item.type === "reverse") && (
                  <>
                    {/* dropdown */}
                    <div
                      style={{
                        position: "relative",
                        width: "250px",
                      }}
                    >
                      <select
                        disabled={locked}
                        value={answers[i] || ""}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [i]: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          padding: "10px",
                          // borderRadius: "8px",
                          borderBottom: isWrong(i)
                            ? "2px solid red"
                            : "1px solid gray",
                          background: "white",
                          fontSize: "17px",
                          // fontWeight: "bold",
                          outline: "none",
                          // color: answers[i] ? "#1e3a8a" : "#000",
                          appearance: "none",
                        }}
                      >
                        <option value="">Choose</option>

                        {/* الخيار الصحيح */}
                        <option value={item.correct}>{item.correct}</option>

                        <option value={item.wrong}>{item.wrong}</option>
                      </select>

                      {/* علامة الخطأ */}
                      {isWrong(i) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            width: "22px",
                            height: "22px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                            zIndex: 2,
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>

                    {/* الجواب النهائي لسؤال reverse */}
                    {item.type === "reverse" && (
                      <div
                        style={{
                          padding: "5px 0",
                          fontWeight: "bold",
                          width: "250px",
                        }}
                      >
                        {item.answer}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* الأزرار */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
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

export default Review10_Page1_Q2;
