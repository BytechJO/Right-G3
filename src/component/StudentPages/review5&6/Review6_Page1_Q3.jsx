import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

const Review6_Page1_Q3 = () => {
  const months = ["June", "July", "August", "September", "October"];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const correctAnswers = [
    ["June", "Monday"],
    ["September", "Thursday"],
  ];

  const [answers, setAnswers] = useState([
    ["", ""],
    ["", ""],
  ]);

  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);

  // ================= CHANGE =================
  const handleChange = (qIndex, blankIndex, value) => {
    if (showCorrect) return;

    const updated = [...answers];
    updated[qIndex][blankIndex] = value;
    setAnswers(updated);
  };

  // ================= SHOW =================
  const showAnswers = () => {
    setAnswers(correctAnswers);
    setShowCorrect(true);
    setWrongMarks([]);
  };

  // ================= RESET =================
  const resetAll = () => {
    setAnswers([
      ["", ""],
      ["", ""],
    ]);
    setShowCorrect(false);
    setWrongMarks([]);
  };

  // ================= CHECK =================
  const checkAnswers = () => {
    if (showCorrect) return;

    if (answers.some((q) => q.includes(""))) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let score = 0;
    let wrong = [];

    answers.forEach((q, qi) => {
      q.forEach((ans, i) => {
        if (ans === correctAnswers[qi][i]) {
          score++;
        } else {
          wrong.push(`${qi}-${i}`);
        }
      });
    });

    setWrongMarks(wrong);
    setShowCorrect(true);

    const total = 4;
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
    <div className="flex flex-col items-center p-8">
      <div className="div-forall w-[60%]">
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>C</span>
          Read and write.
        </h5>

        {/* QUESTIONS */}
        <div className="mt-10 space-y-30 text-[22px]">
          {[0, 1].map((qIndex) => (
            <div key={qIndex}>
              <div className="mb-2">
                <b>{qIndex + 1}</b>{" "}
                {qIndex === 0
                  ? "It is the sixth month of the year and the second day of the week."
                  : "It is the ninth month of the year and the fifth day of the week."}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span>The month is</span>

                {/* MONTH DROPDOWN */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <select
                  disabled={showCorrect}
                    value={answers[qIndex][0]}
                    onChange={(e) => handleChange(qIndex, 0, e.target.value)}
                    style={{
                      borderBottom:
                        showCorrect && wrongMarks.includes(`${qIndex}-0`)
                          ? "2px solid red"
                          : "1px solid black",
                      fontWeight: "bold",
                      outline:"none",
                      padding: "4px",
                      // color: "#1C398E",
                    }}
                  >
                    <option value=""></option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>

                  {/* ✕ icon */}
                  {showCorrect && wrongMarks.includes(`${qIndex}-0`) && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                       width: "24px",
                        height: "24px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                <span>, and the day is</span>

                {/* DAY DROPDOWN */}
                <div style={{ position: "relative", display: "inline-block" }}>
                  <select
                    value={answers[qIndex][1]}
                    disabled={showCorrect}
                    onChange={(e) => handleChange(qIndex, 1, e.target.value)}
                    style={{
                      borderBottom:
                        showCorrect && wrongMarks.includes(`${qIndex}-1`)
                          ? "2px solid red"
                          : "1px solid black",
                      fontWeight: "bold",
                      outline:"none",
                      padding: "4px",
                      // color: "#1C398E",
                    }}
                  >
                    <option value=""></option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  {showCorrect && wrongMarks.includes(`${qIndex}-1`) && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        width: "24px",
                        height: "24px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>

                <span>.</span>
              </div>

              <div className="border-b mt-2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container mt-6">
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

export default Review6_Page1_Q3;
