import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit4_Page6_Q1.css";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "./Unit4PlayingAudioIcon";
import useUnit4Audio from "./useUnit4Audio";
import "./unit4Interactions.css";
import summerAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_001_summer.mp3";
import springAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_002_spring.mp3";
import autumnAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_003_autumn.mp3";
import winterAudio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_004_winter.mp3";
import sentence1Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_005_It's_hot!_We_can_wear_shorts_and_T-shirts.mp3";
import sentence2Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_006_Sometimes_we_can_ice_skate.mp3";
import sentence3Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_007_It's_often_cool._We_wear_jackets.mp3";
import sentence4Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_008_We_can_see_baby_birds.mp3";
import sentence5Audio from "../../../assets/audio/ClassBook/Unit 4/Page 33 - Exercise D/Item_009_It's_cold._There_aren't_any_leaves_on_the_trees.mp3";
const SEASON_AUDIO = {
  spring: springAudio,
  summer: summerAudio,
  autumn: autumnAudio,
  winter: winterAudio,
};
const SENTENCE_AUDIO = [
  sentence1Audio,
  sentence2Audio,
  sentence3Audio,
  sentence4Audio,
  sentence5Audio,
];

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 33/Ex D 4.svg";

const Unit4_Page6_Q1 = () => {
  const items = [
    { text: "It's hot! We can wear shorts and T-shirts.", answer: "summer" },
    { text: "Sometimes we can ice skate.", answer: "winter" },
    { text: "It's often cool. We wear jackets.", answer: "autumn" },
    { text: "We can see baby birds.", answer: "spring" },
    {
      text: "It's cold. There aren’t any leaves on the trees.",
      answer: "winter",
    },
    { text: "We can go to the beach, and we can swim.", answer: "summer" },
    { text: "It’s often warm. We can see flowers.", answer: "spring" },
  ];

  const wordBank = ["spring", "summer", "autumn", "winter"];

  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [showCorrect, setShowCorrect] = useState(false);
  const [wrongMarks, setWrongMarks] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  // ✅ handle select
  const handleChange = (index, value) => {
    if (lockedIds.includes(index)) return;

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    setWrongMarks((prev) => prev.filter((id) => id !== index));
  };

  // ✅ SHOW ANSWERS
  const showAnswers = () => {
    setAnswers(items.map((item) => item.answer));
    setShowCorrect(true);
    setWrongMarks([]);
    setLockedIds(items.map((_, i) => i));
    stopAudio();
  };

  // ✅ RESET
  const resetAll = () => {
    setAnswers(items.map(() => ""));
    setShowCorrect(false);
    setWrongMarks([]);
    setLockedIds([]);
    stopAudio();
  };

  // ✅ CHECK ANSWERS
  const checkAnswers = () => {
    if (lockedIds.length === items.length) return;

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
        wrong.push(i);
      }
    });

    setWrongMarks(wrong);
    setShowCorrect(true);
    setLockedIds(
      items
        .map((item, i) =>
          answers[i]?.trim().toLowerCase() === item.answer.toLowerCase()
            ? i
            : null,
        )
        .filter((id) => id !== null),
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
        marginBottom: "50px",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "40px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Read and write. Which season is it?"
          subTitle="Use the weather clues in each picture, then write the correct season before checking."
        />

        {/* IMAGES */}
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {[
            { word: "spring", img: img1 },
            { word: "autumn", img: img2 },
            { word: "summer", img: img3 },
            { word: "winter", img: img4 },
          ].map((item, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              className="unit4-audio-control unit4-interactive"
              onClick={() =>
                playAudio(`season-${item.word}`, SEASON_AUDIO[item.word])
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  playAudio(`season-${item.word}`, SEASON_AUDIO[item.word]);
                }
              }}
              style={{ position: "relative" }}
            >
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `season-${item.word}`}
              />
              <img
                src={item.img}
                alt={`${item.word} season scene`}
                style={{
                  width: "auto",
                  height: "130px",
                  borderRadius: "12px",
                }}
              />
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="space-y-6 w-full">
          {items.map((item, i) => {
            const isWrong = wrongMarks.includes(i);

            return (
              <div
                key={i}
                className="flex items-center gap-7 unit4-audio-control"
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `sentence-${i}`}
                />
                {/* TEXT */}
                <span
                  className="text-[18px] unit4-interactive"
                  role={SENTENCE_AUDIO[i] ? "button" : undefined}
                  tabIndex={SENTENCE_AUDIO[i] ? 0 : -1}
                  onClick={() => playAudio(`sentence-${i}`, SENTENCE_AUDIO[i])}
                  onKeyDown={(event) => {
                    if (
                      SENTENCE_AUDIO[i] &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`sentence-${i}`, SENTENCE_AUDIO[i]);
                    }
                  }}
                >
                  <span className="text-[20px] font-bold mr-2">{i + 1}</span>{" "}
                  {item.text}
                </span>

                {/* DROPDOWN */}
                <div
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <select
                    value={answers[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    disabled={lockedIds.includes(i)}
                    style={{
                      minWidth: "140px",
                      padding: "6px 10px",
                      // borderRadius: "8px",
                      borderBottom: `${
                        showCorrect
                          ? isWrong
                            ? "2px solid red"
                            : "1px solid  #999"
                          : "1px solid #999"
                      }`,
                      // fontWeight: "bold",
                      // color: answers[i] ? "#1C398E" : "#000",
                      background: "#fff",
                      fontSize: "18px",
                      cursor: lockedIds.includes(i) ? "default" : "pointer",
                    }}
                  >
                    <option value="">Select</option>

                    {wordBank.map((word) => (
                      <option key={word} value={word}>
                        {word}
                      </option>
                    ))}
                  </select>

                  {/* ❌ Wrong Mark */}
                  {showCorrect && isWrong && (
                    <div
                      className="absolute top-0 -right-3 -translate-y-1/2
      w-[22px] h-[22px]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-nonel"
                    >
                      ✕
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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

export default Unit4_Page6_Q1;
