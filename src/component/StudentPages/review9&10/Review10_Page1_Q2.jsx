import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Ex B 4.svg";
import "./Review10_Page1_Q2.css";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";
import full1 from "../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise B/full1.mp3";
import full2 from "../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise B/full2.mp3";
import full3 from "../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise B/full3.mp3";
import full4 from "../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise B/full4.mp3";
import question1Audio from "../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise B/Item_001_What_will_she_do_on_the_weekend.mp3";
import question2Audio from "../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise B/Item_002_What_will_they_do_on_the_weekend.mp3";
import statement3Audio from "../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise B/Item_003_He_will_build_a_sandcastle.mp3";

const fullAudio = [full1, full2, full3, full4];
const promptAudio = [question1Audio, question2Audio, statement3Audio, null];
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
  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const reset = () => {
    setAnswers({});
    setLockedIds([]);
    setRevealed(false);
    setWrongIds([]);
    stopAudio();
  };

  const showAnswers = () => {
    const formatted = {};

    questions.forEach((q, i) => {
      if (q.type === "input" || q.type === "reverse") {
        formatted[i] = q.correct;
      }
    });

    setAnswers(formatted);
    setLockedIds(questions.map((_, index) => index));
    setRevealed(true);
    setWrongIds([]);
    stopAudio();
  };
  const checkAnswers = () => {
    if (revealed || lockedIds.length === questions.length) return;
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
    setLockedIds(
      questions.flatMap((question, index) =>
        answers[index] === question.correct ? [index] : [],
      ),
    );
    setWrongIds(
      questions.flatMap((question, index) =>
        answers[index] !== question.correct ? [index] : [],
      ),
    );
  };

  const isWrong = (index) => {
    return wrongIds.includes(index);
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
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Look, read, and write the questions or answers."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />

        <div className="questions-grid">
          {questions.map((item, i) => (
            <div
              key={i}
              role={lockedIds.includes(i) ? "button" : undefined}
              tabIndex={lockedIds.includes(i) ? 0 : undefined}
              className={
                lockedIds.includes(i)
                  ? "unit4-audio-control unit4-full-audio-enabled"
                  : ""
              }
              onClick={() =>
                lockedIds.includes(i) && playAudio(`full-${i}`, fullAudio[i])
              }
              onKeyDown={(event) => {
                if (
                  lockedIds.includes(i) &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  playAudio(`full-${i}`, fullAudio[i]);
                }
              }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                // height: "300px",
              }}
            >
              <Unit4PlayingAudioIcon active={activeAudioKey === `full-${i}`} />
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
                  alt={
                    [
                      "A girl reading a book.",
                      "A family eating at a restaurant.",
                      "A boy building a sandcastle at the beach.",
                      "A girl doing her homework.",
                    ][i]
                  }
                  style={{
                    width: "180px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />

                {/* نص السؤال */}
                {item.q && (
                  <p
                    style={{ margin: 0, fontWeight: "500" }}
                    role={promptAudio[i] ? "button" : undefined}
                    tabIndex={promptAudio[i] ? 0 : undefined}
                    className={
                      promptAudio[i]
                        ? "unit4-interactive unit4-audio-control"
                        : ""
                    }
                    onClick={(event) => {
                      if (!lockedIds.includes(i)) {
                        event.stopPropagation();
                        if (promptAudio[i])
                          playAudio(`prompt-${i}`, promptAudio[i]);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (
                        !lockedIds.includes(i) &&
                        promptAudio[i] &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        event.stopPropagation();
                        playAudio(`prompt-${i}`, promptAudio[i]);
                      }
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `prompt-${i}`}
                    />
                    {item.q}
                  </p>
                )}

                {/* نوع fixed */}
                {item.type === "fixed" && (
                  <div
                    role={promptAudio[i] ? "button" : undefined}
                    tabIndex={promptAudio[i] ? 0 : undefined}
                    className={
                      promptAudio[i]
                        ? "unit4-interactive unit4-audio-control"
                        : ""
                    }
                    onClick={(event) => {
                      if (!lockedIds.includes(i)) {
                        event.stopPropagation();
                        if (promptAudio[i])
                          playAudio(`prompt-${i}`, promptAudio[i]);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (
                        !lockedIds.includes(i) &&
                        promptAudio[i] &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        event.stopPropagation();
                        playAudio(`prompt-${i}`, promptAudio[i]);
                      }
                    }}
                    style={{
                      borderBottom: "2px solid black",
                      padding: "5px 0",
                      fontWeight: "bold",
                      width: "250px",
                      color: "#000",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `prompt-${i}`}
                    />
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
                        disabled={revealed || lockedIds.includes(i)}
                        onClick={(event) => event.stopPropagation()}
                        value={answers[i] || ""}
                        onChange={(e) => {
                          setAnswers((prev) => ({
                            ...prev,
                            [i]: e.target.value,
                          }));
                          setWrongIds((previous) =>
                            previous.filter((id) => id !== i),
                          );
                        }}
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
