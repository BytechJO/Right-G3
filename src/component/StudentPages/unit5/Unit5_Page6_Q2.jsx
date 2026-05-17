import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex E 1.svg";
const questions = [
  {
    id: "q0",
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    qEnd: ["bike", "?"],
    aBlanks: [
      {
        correct: "It’s in the garage",
        options: [
          "It’s in the garage",
          "It’s in the bedroom",
          "It’s in the kitchen",
          "It’s in the bathroom",
        ],
      },
    ],
  },
  {
    id: "q1",
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    qEnd: ["TV", "?"],
    aBlanks: [
      {
        correct: "It’s in the living room",
        options: [
          "It’s in the garage",
          "It’s in the kitchen",
          "It’s in the living room",
          "It’s in the bathroom",
        ],
      },
    ],
  },
  {
    id: "q2",
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    qEnd: ["bed", "?"],
    aBlanks: [
      {
        correct: "It’s in the bedroom",
        options: [
          "It’s in the garage",
          "It’s in the bedroom",
          "It’s in the kitchen",
          "It’s in the bathroom",
        ],
      },
    ],
  },
  {
    id: "q3",
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    qEnd: ["washing machine", "?"],
    aBlanks: [
      {
        correct: "It’s in the basement",
        options: [
          "It’s in the garage",
          "It’s in the kitchen",
          "It’s in the basement",
          "It’s in the bathroom",
        ],
      },
    ],
  },
];

export default function Unit5_Page6_Q2() {
  const [answers, setAnswers] = useState(
    questions.map((q) => ({
      qAnswer: "",
      aAnswer: q.aBlanks.map(() => ""),
    })),
  );

  const [locked, setLocked] = useState(false);
  const [wrongInputs, setWrongInputs] = useState({});
  /* ================= CHANGE HANDLERS ================= */

  const handleQChange = (i, value) => {
    if (locked) return;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[i].qAnswer = value;
      return updated;
    });
  };

  const handleAChange = (i, j, value) => {
    if (locked) return;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[i].aAnswer[j] = value;
      return updated;
    });
  };

  /* ================= CHECK ================= */

  const checkAnswers = () => {
    if (locked) return;

    let score = 0;
    let total = questions.length * 2;

    const wrong = {};

    questions.forEach((q, i) => {
      wrong[i] = {
        q: false,
        a: [],
      };

      if (answers[i].qAnswer === q.qCorrect) {
        score++;
      } else {
        wrong[i].q = true;
      }

      q.aBlanks.forEach((b, j) => {
        if (answers[i].aAnswer[j] === b.correct) {
          score++;
          wrong[i].a[j] = false;
        } else {
          wrong[i].a[j] = true;
        }
      });
    });

    setWrongInputs(wrong);

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`Score: ${score}/${total}`);
   
    setLocked(true);
  };

  /* ================= RESET ================= */

  const reset = () => {
    setAnswers(
      questions.map((q) => ({
        qAnswer: "",
        aAnswer: q.aBlanks.map(() => ""),
      })),
    );
     setWrongInputs({});
    setLocked(false);
  };

  /* ================= SHOW ANSWER ================= */

  const showAnswers = () => {
    setAnswers(
      questions.map((q) => ({
        qAnswer: q.qCorrect,
        aAnswer: q.aBlanks.map((b) => b.correct),
      })),
    );
     setWrongInputs({});
    setLocked(true);
  };

  /* ================= UI ================= */

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="div-forall" style={{ gap: "40px" }}>
        <h5 className="header-title-page8">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            E
          </span>
          Look and answer.
        </h5>
        <div className="flex gap-2">
          <div className="w-full">
            {questions.map((q, i) => (
              <div
                key={q.id}
                style={{
                  marginBottom: "30px",
                  // padding: "20px",
                  display: "flex",
                  gap: "10px",
                  width: "100%",
                  alignItems: "flex-start",
                }}
              >
                <span className="text-[20px] font-bold">{i + 1}</span>
                {/* 🔵 QUESTION */}
                <div className="flex flex-col gap-5 w-full">
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      fontSize: "18px",

                      width: "80%",
                    }}
                  >
                    <select
                      value={answers[i].qAnswer}
                      onChange={(e) => handleQChange(i, e.target.value)}
                      disabled={locked}
                      style={{
                        width: "80%",
                        outline: "none",
                        borderBottom: `1px solid ${
                          wrongInputs[i]?.q ? "red" : "gray"
                        }`,
                      }}
                    >
                      <option value="">select answer </option>
                      {q.qOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {wrongInputs[i]?.q && (
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "100px",
                        }}
                      >
                        <WrongMark />
                      </div>
                    )}

                    {q.qEnd.join(" ")}
                  </div>

                  {/* 🟢 ANSWER */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "18px",
                      flexWrap: "wrap",
                    }}
                  >
                    {q.aBlanks.map((blank, j) => (
                      <div
                        key={j}
                        style={{
                          position: "relative",
                          display: "inline-block",
                          width: "80%",
                        }}
                      >
                        <select
                          value={answers[i].aAnswer[j]}
                          onChange={(e) => handleAChange(i, j, e.target.value)}
                          disabled={locked}
                          style={{
                            width: "100%",
                            padding: "6px",
                            outline: "none",
                            borderBottom: `1px solid ${
                              wrongInputs[i]?.a?.[j] ? "red" : "gray"
                            }`,
                          }}
                        >
                          <option value="">select answer</option>
                          {blank.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {wrongInputs[i]?.a?.[j] && (
                          <div
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}
                      </div>
                    ))}

                    {q.aBlanks.map((b, j) => (
                      <span key={j} style={{ marginLeft: "5px" }}>
                        .
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <img src={img1} style={{ height: "450px" }} />
        </div>
        {/* BUTTONS */}
        <Button
          handleStartAgain={reset}
          handleShowAnswer={showAnswers}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
}
