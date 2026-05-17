import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex A 4.svg";

import Button from "../../Button";

const Review9_Page1_Q1 = () => {
  const questions = [
    { id: 1, img: img1, correct: "were", sentence: "at the park." },
    { id: 2, img: img2, correct: "wasn’t", sentence: "at the store." },
    { id: 3, img: img3, correct: "was", sentence: "at the farm." },
    { id: 4, img: img4, correct: "weren’t", sentence: "at the mall." },
  ];

  const words = ["was", "were", "wasn’t", "weren’t"];

  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const pronouns = {
    1: "They",
    2: "She",
    3: "He",
    4: "They",
  };

  const handleSelect = (id, value) => {
    if (locked) return;

    setAnswers((prev) => ({
      ...prev,
      [`slot-${id}`]: value,
    }));
  };

  const checkAnswers = () => {
    if (locked) return;

    const empty = questions.some((q) => !answers[`slot-${q.id}`]);

    if (empty) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (answers[`slot-${q.id}`] === q.correct) {
        score++;
      }
    });

    const total = questions.length;

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

    setShowResult(true);
    setLocked(true);
  };

  const showAnswers = () => {
    const correctAnswers = {};

    questions.forEach((q) => {
      correctAnswers[`slot-${q.id}`] = q.correct;
    });

    setAnswers(correctAnswers);
    setLocked(true);
    setShowResult(false);
  };

  const reset = () => {
    setAnswers({});
    setLocked(false);
    setShowResult(false);
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
          Look, read, and write. Use the words below.
        </h5>
  <div
          style={{
            display: "flex",
            // gap: "12px",
            padding: "10px",
            // border: "2px dashed #ccc",
            borderRadius: "10px",
            // marginTop: "20px",
            justifyContent: "space-around",
            width: "100%",
            // marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {words.map((word) => (
            <span
            className="bg-[#fdc791]"
              key={word}
              style={{
                // padding: "7px 14px",
                height:"40px",width:"100px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                // border: "2px solid #2c5287",
                backgroundColor:"#fdc791",
                borderRadius: "50px",
                // background: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {word}
            </span>
          ))}
        </div>
        {/* الأسئلة */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: "20px",
            // justifyContent: "center",
            columnGap: "80px",
            rowGap: "20px",
          }}
        >
          {questions.map((q) => {
            const isWrong =
              showResult &&
              answers[`slot-${q.id}`] &&
              answers[`slot-${q.id}`] !== q.correct;

            return (
              <div key={q.id} style={{ marginBottom: "20px" }}>
                <div className="flex gap-3">
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {q.id}
                  </span>

                  <img
                    src={q.img}
                    style={{
                      width: "auto",
                      height: "150px",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "18px",
                    gap: "5px",
                  }}
                >
                  <span>{pronouns[q.id]}</span>

                  <div style={{ fontSize: "20px", position: "relative" }}>
                    <select
                      disabled={locked}
                      value={answers[`slot-${q.id}`] || ""}
                      onChange={(e) => handleSelect(q.id, e.target.value)}
                      style={{
                        minWidth: "120px",
                        padding: "6px 10px",
                        // borderRadius: "6px",
                        borderBottom: `1px solid ${isWrong ? "red" : "#000"}`,
                        fontSize: "18px",
                        fontWeight: "500",
                        outline: "none",
                        background: "#fff",
                      }}
                    >
                      <option value="">Select</option>

                      {words.map((word) => (
                        <option key={word} value={word}>
                          {word}
                        </option>
                      ))}
                    </select>

                    {/* ❌ Wrong mark */}
                    {isWrong && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
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
                          boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>

                  <span>{q.sentence}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review9_Page1_Q1;
