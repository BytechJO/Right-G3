import React, { useState } from "react";
import "./Unit6_Page6_Q1.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Ex D 4.svg";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import WrongMark from "../../WrongMark";
import "../unit4/unit4Interactions.css";
const IMAGE_ALT = [
  "A girl studying at a desk",
  "A boy standing under the hot sun",
  "Children being quiet in class",
  "A girl brushing her hair",
];
const Unit6_Page6_Q1 = () => {
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      subject: "She",
      action: "study better",
      img: img1,
      correct: "must",
    },
    {
      id: 2,
      subject: "He",
      action: "stand under the hot sun",
      img: img2,
      correct: "mustnt",
    },
    { id: 3, subject: "You", action: "be quiet", img: img3, correct: "must" },
    {
      id: 4,
      subject: "She",
      action: "brush her hair",
      img: img4,
      correct: "must",
    },
  ];

  const handleAnswer = (id, value) => {
    if (lockedIds.includes(id) || showAnswer) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongIds((previous) => previous.filter((itemId) => itemId !== id));
  };
  const reset = () => {
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    setAnswers({});
  };
  const showAnswers = () => {
    const correctAnswers = {};
    questions.forEach((q) => {
      correctAnswers[q.id] = q.correct;
    });

    setAnswers(correctAnswers);
    setLockedIds(questions.map((q) => q.id));
    setWrongIds([]);
    setShowAnswer(true);
  };
  const checkAnswers = () => {
    if (lockedIds.length === questions.length || showAnswer) return;

    // تأكد إنو كل الأسئلة مجاوبة
    const unanswered = questions.some((q) => !answers[q.id]);
    if (unanswered) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
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

    setLockedIds(
      questions.flatMap((q) => (answers[q.id] === q.correct ? [q.id] : [])),
    );
    setWrongIds(
      questions.flatMap((q) => (answers[q.id] !== q.correct ? [q.id] : [])),
    );
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
          gap: "10px",
          // width: "60%",
        }}
      >
        <ExerciseHeader
          sectionLetter="D"
          title="Look and write ✓ or ✗. Then write."
          subTitle="Read each statement and compare it with the picture or sentence before choosing the two-way answer."
        />
        <div className="w-full" style={{ padding: "20px" }}>
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div className="flex gap-5 items-start">
                {/* الرقم */}
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {index + 1}
                </span>

                {/* الصورة */}
                <div
                  style={{
                    height: "110px",
                    overflow: "hidden",
                    // border: "3px solid orange",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={q.img}
                    alt={IMAGE_ALT[index]}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
              {/* بوكسات الصح والخطا */}
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  onClick={() => handleAnswer(q.id, "must")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleAnswer(q.id, "must");
                    }
                  }}
                  role="button"
                  tabIndex={lockedIds.includes(q.id) || showAnswer ? -1 : 0}
                  aria-label="Choose check mark"
                  aria-pressed={answers[q.id] === "must"}
                  className="unit4-interactive"
                  style={{
                    width: "40px",
                    height: "40px",
                    border:
                      answers[q.id] === "must"
                        ? wrongIds.includes(q.id)
                          ? "2px solid red"
                          : "2px solid orange"
                        : "1px solid gray",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    // background: answers[q.id] === "must" ? "#2a4e7c" : "white",
                    color: answers[q.id] === "must" ? "white" : "black",
                  }}
                >
                  <img
                    src={trueIcon}
                    alt="Check mark"
                    style={{ height: "25px" }}
                  />
                </div>

                <div
                  onClick={() => handleAnswer(q.id, "mustnt")}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleAnswer(q.id, "mustnt");
                    }
                  }}
                  role="button"
                  tabIndex={lockedIds.includes(q.id) || showAnswer ? -1 : 0}
                  aria-label="Choose X mark"
                  aria-pressed={answers[q.id] === "mustnt"}
                  className="unit4-interactive"
                  style={{
                    width: "40px",
                    height: "40px",
                    border:
                      answers[q.id] === "mustnt"
                        ? wrongIds.includes(q.id)
                          ? "2px solid red"
                          : "2px solid orange"
                        : "1px solid gray",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    // background:
                    // answers[q.id] === "mustnt" ? "#2a4e7c" : "white",
                    color: answers[q.id] === "mustnt" ? "white" : "black",
                  }}
                >
                  <img
                    src={falseIcon}
                    alt="X mark"
                    style={{ height: "25px" }}
                  />
                </div>
              </div>

              {/* الخط + الجملة */}
              <div
                style={{
                  position: "relative",
                  flex: 1,
                  borderBottom: `2px solid ${
                    wrongIds.includes(q.id) ? "red" : "black"
                  }`,
                  paddingBottom: "5px",
                  minHeight: "24px",
                  // color: "#2a4e7c",
                  fontWeight: "500",
                }}
              >
                {answers[q.id] && (
                  <span>
                    {q.subject} {answers[q.id] === "must" ? "must" : "mustn't"}{" "}
                    {q.action}.{/* ❌ فقط عند الغلط */}
                    {wrongIds.includes(q.id) && (
                      <span className="absolute -top-2 -right-1 ">
                        <WrongMark />
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}
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

export default Unit6_Page6_Q1;
