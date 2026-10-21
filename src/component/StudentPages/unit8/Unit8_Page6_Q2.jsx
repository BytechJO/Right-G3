import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit8_Page6_Q1.css";

import bigImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Asset 11.svg";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Asset 12.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Ex E 4.svg";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import cleanAudio from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise E/Item_001_(clean).mp3";
import noSheAudio from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise E/Item_002_No,_she_didn't.mp3";
import helpAudio from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise E/Item_003_(help).mp3";
import yesHeAudio from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise E/Item_004_Yes,_he_did.mp3";
import playAudioFile from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise E/Item_005_(play).mp3";

const Unit8_Page6_Q2 = () => {
  const items = [
    {
      text: "(clean)",
      answer: "Did Stella clean her shoes?",
      options: ["Did Stella clean her shoes?", "Did Stella comb her hair?"],
      img: img1,
      sentenc: "No, she didn’t.",
      alt: "A pair of shoes",
      promptAudio: cleanAudio,
      answerAudio: noSheAudio,
    },
    {
      text: "(help)",
      answer: "Did Tom help his mom?",
      options: ["Did Tom help his mom?", "Did Tom wash the dishes?"],
      img: img2,
      sentenc: "Yes, he did.",
      alt: "A boy helping his mother",
      promptAudio: helpAudio,
      answerAudio: yesHeAudio,
    },
    {
      text: "(play)",
      answer: "Did Jack play soccer?",
      options: ["Did Jack play soccer?", "Did Jack play basketball?"],
      img: img3,
      sentenc: "No, he didn’t.",
      alt: "A soccer ball",
      promptAudio: playAudioFile,
    },
    {
      text: "(watch)",
      answer: "Did John watch TV?",
      options: ["Did John watch TV?", "Did John clean his shoes?"],
      img: img4,
      sentenc: "Yes, he did.",
      alt: "A television",
    },
  ];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const handleChange = (index, value) => {
    if (showAns || lockedIds.includes(index)) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    setWrongMarks((previous) =>
      previous.filter((wrong) => wrong.qIndex !== index),
    );
  };

  // =========================
  // SHOW ANSWERS (🔥 FIXED)
  // =========================
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));
    setLockedIds(items.map((_, index) => index));
    setShowAns(true);
    setWrongMarks([]);
    stopAudio();
  };

  // =========================
  // RESET
  // =========================
  const resetAll = () => {
    setAnswers(items.map(() => ""));
    setLockedIds([]);
    setShowAns(false);
    setWrongMarks([]);
    stopAudio();
  };

  // =========================
  // CHECK ANSWERS (🔥 FIXED)
  // =========================
  const checkAnswers = () => {
    if (showAns || lockedIds.length === items.length) return;

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
    setLockedIds(
      items.flatMap((item, index) =>
        answers[index]?.trim().toLowerCase() === item.answer.toLowerCase()
          ? [index]
          : [],
      ),
    );

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
      <div className="div-forall" style={{ marginBottom: "40px", gap: "40px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title="Look, read, and write the questions. Use the pictures from Ex. D."
          subTitle="Use each picture from Exercise D, then build a complete question before checking."
        />
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <img
            src={bigImage}
            alt="A family diagram showing daily activities from Exercise D"
            style={{ width: "auto", height: "auto", objectFit: "cover" }}
          />
        </div>

        {/* CONTENT */}

        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* TEXT */}
              <span
                role={item.promptAudio ? "button" : undefined}
                tabIndex={item.promptAudio ? 0 : -1}
                className={
                  item.promptAudio
                    ? "unit4-audio-control unit4-interactive text-2xl md:text-xl lg:text-1xl w-[100px]"
                    : "text-2xl md:text-xl lg:text-1xl w-[100px]"
                }
                onClick={() =>
                  item.promptAudio && playAudio(`prompt-${i}`, item.promptAudio)
                }
                onKeyDown={(event) => {
                  if (
                    item.promptAudio &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    playAudio(`prompt-${i}`, item.promptAudio);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `prompt-${i}`}
                />
                {i + 1}. {item.text}
              </span>

              {/* INLINE DROP */}
              <div
                style={{
                  position: "relative",
                  // flex: 1,
                }}
              >
                <select
                  value={answers[i]}
                  disabled={showAns || lockedIds.includes(i)}
                  aria-label={`Question for item ${i + 1}`}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    width: "350px",
                    border: "none",
                    borderBottom: `1px solid ${
                      wrongMarks.some((w) => w.qIndex === i) ? "red" : "black"
                    }`,
                    background: "transparent",
                    paddingBottom: "4px",
                    fontSize: "18px",
                    fontWeight: "500",
                    // color: answers[i] ? "#1C398E" : "black",
                    // outline: "none",
                    cursor:
                      showAns || lockedIds.includes(i) ? "default" : "pointer",
                  }}
                >
                  <option value="">Select question</option>

                  {item.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {wrongMarks.some((w) => w.qIndex === i) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-28px",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      background: "#ef4444",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center", // 🔥 نفس المستوى
                  gap: "10px", // مسافة بينهم
                }}
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  style={{
                    width: "auto",
                    height: "70px",
                    objectFit: "cover",
                  }}
                />

                <span
                  role={item.answerAudio ? "button" : undefined}
                  tabIndex={item.answerAudio ? 0 : -1}
                  className={
                    item.answerAudio
                      ? "unit4-audio-control unit4-interactive"
                      : undefined
                  }
                  onClick={() =>
                    item.answerAudio &&
                    playAudio(`answer-${i}`, item.answerAudio)
                  }
                  onKeyDown={(event) => {
                    if (
                      item.answerAudio &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`answer-${i}`, item.answerAudio);
                    }
                  }}
                  style={{ fontSize: 18 }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `answer-${i}`}
                  />
                  {item.sentenc}
                </span>
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

export default Unit8_Page6_Q2;
