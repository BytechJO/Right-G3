import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit8_Page6_Q1.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 69/Asset 11.svg";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise D/Item_001_Did_Helen_comb_her_hair.mp3";
import audio2 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise D/Item_002_Did_Helen_brush_her_teeth.mp3";
import audio3 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise D/Item_003_Did_Tom_help_his_mom.mp3";
import audio4 from "../../../assets/audio/ClassBook/Unit 8/Page 69 - Exercise D/Item_004_Did_Tom_wash_the_dishes.mp3";

const Unit8_Page6_Q1 = () => {
  const items = [
    {
      text: "Did Helen comb her hair?",
      answer: "Yes, she did.",
      audio: audio1,
    },
    {
      text: "Did Helen brush her teeth?",
      answer: "Yes, she did.",
      audio: audio2,
    },
    { text: "Did Tom help his mom?", answer: "Yes, he did.", audio: audio3 },
    {
      text: "Did Tom wash the dishes?",
      answer: "No, he didn’t.",
      audio: audio4,
    },
  ];

  const wordBank = [
    "Yes, she did.",
    "Yes, he did.",
    "No, she didn’t.",
    "No, he didn’t.",
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
      <div className="div-forall mb-10" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Look and write the answers."
          subTitle="Look at each picture, decide what happened, then complete the Did question and answer."
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
            src={img1}
            alt="A family diagram showing Helen and Tom completing daily activities"
            style={{ width: "auto", height: "auto", objectFit: "cover" }}
          />
        </div>

        {/* CONTENT */}

        <div className="space-y-6 mt-5">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-7">
              {/* TEXT */}
              <span
                role="button"
                tabIndex={0}
                className="unit4-audio-control unit4-interactive text-[18px] w-[250px]"
                onClick={() => playAudio(`question-${i}`, item.audio)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`question-${i}`, item.audio);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `question-${i}`}
                />
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
                  disabled={showAns || lockedIds.includes(i)}
                  aria-label={`Answer question ${i + 1}`}
                  onChange={(e) => handleChange(i, e.target.value)}
                  style={{
                    minWidth: "180px",
                    textAlign: "center",
                    fontWeight: "500",
                    // color: answers[i] ? "#1C398E" : "black",
                    border: "none",
                    borderBottom: `2px solid ${
                      wrongMarks.some((w) => w.qIndex === i) ? "red" : "black"
                    }`,
                    paddingBottom: "4px",
                    background: "transparent",
                    fontSize: "18px",
                    cursor:
                      showAns || lockedIds.includes(i) ? "default" : "pointer",
                  }}
                >
                  <option value="">Select answer</option>

                  {wordBank.map((word, idx) => (
                    <option key={idx} value={word}>
                      {word}
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
