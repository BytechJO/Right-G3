import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review7_Page1_Q2.css";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_001_Where_is_the_boy.mp3";
import audio2 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_002_I_can't_see.mp3";
import audio3 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_003_There's_a_rainbow_in_the_sky._Look_at.mp3";
import audio4 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_004_Where_are_my_shoes_Can_you_see.mp3";
import audio5 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_005_Your_sister_is_laughing.mp3";
import audio6 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_006_I_can_hear.mp3";
import audio7 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_007_Look!_A_dolphin!_Can_you_see.mp3";
import audio8 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_008_Our_teacher_is_Miss_May._We_like.mp3";
import audio9 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_009_very_much.mp3";
import audio10 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_010_The_birds_are_singing._Can_you_hear.mp3";
import audio11 from "../../../assets/audio/ClassBook/Unit 8/Page 70 - Exercise B/Item_011_Hooray!_John_is_the_winner!_Look_at.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const Review7_Page1_Q2 = () => {
  const items = [
    {
      segments: [
        { text: "Where is the boy?", audio: audio1 },
        { text: "I can’t see", audio: audio2 },
      ],
      answer: "him",
    },
    {
      segments: [
        { text: "There’s a rainbow in the sky. Look at", audio: audio3 },
      ],
      answer: "it",
    },
    {
      segments: [{ text: "Where are my shoes? Can you see", audio: audio4 }],
      answer: "them",
    },
    {
      segments: [
        { text: "Your sister is laughing.", audio: audio5 },
        { text: "I can hear", audio: audio6 },
      ],
      answer: "her",
    },
    {
      segments: [{ text: "Look! A dolphin! Can you see", audio: audio7 }],
      answer: "it",
    },
    {
      segments: [{ text: "Our teacher is Miss May. We like", audio: audio8 }],
      answer: "her",
      suffix: "very much.",
      suffixAudio: audio9,
    },
    {
      segments: [
        { text: "The birds are singing. Can you hear", audio: audio10 },
      ],
      answer: "them",
    },
    {
      segments: [
        { text: "Hooray! John is the winner! Look at", audio: audio11 },
      ],
      answer: "him",
    },
  ];

  const wordBank = ["him", "her", "it", "them"];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

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
      <div className="div-forall" style={{ gap: "40px" }}>
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Complete the sentences. Use the words below."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />

        {/* CONTENT */}
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: "1.5fr 0.5fr" }}
        >
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
                <span
                  className="text-[18px]"
                  style={{ display: "inline-flex", gap: 5 }}
                >
                  <strong>{i + 1}.</strong>
                  {item.segments.map((segment, segmentIndex) => (
                    <span
                      key={segmentIndex}
                      role="button"
                      tabIndex={0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() =>
                        playAudio(`segment-${i}-${segmentIndex}`, segment.audio)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(
                            `segment-${i}-${segmentIndex}`,
                            segment.audio,
                          );
                        }
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={
                          activeAudioKey === `segment-${i}-${segmentIndex}`
                        }
                      />
                      {segment.text}
                    </span>
                  ))}
                </span>
                <div
                  style={{
                    position: "relative",
                    minWidth: "120px",
                  }}
                >
                  <select
                    value={answers[i]}
                    disabled={showAns || lockedIds.includes(i)}
                    aria-label={`Complete sentence ${i + 1}`}
                    onChange={(e) => {
                      const updated = [...answers];
                      updated[i] = e.target.value;
                      setAnswers(updated);
                      setWrongMarks((previous) =>
                        previous.filter((wrong) => wrong.qIndex !== i),
                      );
                    }}
                    style={{
                      border: "none",
                      borderBottom: `1px solid ${
                        wrongMarks.some((w) => w.qIndex === i) ? "red" : "black"
                      }`,
                      background: "transparent",
                      fontWeight: "500",
                      fontSize: "18px",
                      // color: answers[i] ? "#1C398E" : "black",
                      padding: "4px",
                      minWidth: "120px",
                      textAlign: "center",
                      cursor:
                        showAns || lockedIds.includes(i)
                          ? "default"
                          : "pointer",
                    }}
                  >
                    <option value="">Select</option>

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
                {item.suffix && (
                  <span
                    role="button"
                    tabIndex={0}
                    className="unit4-audio-control unit4-interactive text-[18px]"
                    onClick={() => playAudio(`suffix-${i}`, item.suffixAudio)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`suffix-${i}`, item.suffixAudio);
                      }
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `suffix-${i}`}
                    />{" "}
                    {item.suffix}
                  </span>
                )}
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
