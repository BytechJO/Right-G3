import React, { useState } from "react";
import "./Unit10_Page5_Q1.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex A 4.svg";

import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";
import part1 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/Item_001_--_uck.mp3";
import part2 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/Item_002_--_eam.mp3";
import part3 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/Item_003_--_ess.mp3";
import part4 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/Item_004_--_ee.mp3";
import full1 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/full1.mp3";
import full2 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/full2.mp3";
import full3 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/full3.mp3";
import full4 from "../../../assets/audio/ClassBook/Unit 10/Page 86 - Exercise A1/full4.mp3";

const data = [
  { img: img1, pattern: "uck", answer: "tr", audio: part1, fullAudio: full1 },
  { img: img2, pattern: "eam", answer: "dr", audio: part2, fullAudio: full2 },
  { img: img3, pattern: "ess", answer: "dr", audio: part3, fullAudio: full3 },
  { img: img4, pattern: "ee", answer: "tr", audio: part4, fullAudio: full4 },
];

const options = ["dr", "tr"];

const Unit10_Page5_Q1 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const handleSelect = (index, value) => {
    if (revealed || lockedIds.includes(index)) return;

    const updated = [...inputs];
    updated[index] = value;

    setInputs(updated);

    const wrongReset = [...wrongInputs];
    wrongReset[index] = false;
    setWrongInputs(wrongReset);
  };

  const checkAnswers = () => {
    if (revealed || lockedIds.length === data.length) return;

    if (inputs.some((val) => val.trim() === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please fill in all the answers before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrongFlags = [];

    data.forEach((item, index) => {
      if (inputs[index].toLowerCase() === item.answer) {
        correctCount++;
        wrongFlags[index] = false;
      } else {
        wrongFlags[index] = true;
      }
    });

    setWrongInputs(wrongFlags);
    setLockedIds(
      data.flatMap((item, index) =>
        inputs[index].toLowerCase() === item.answer ? [index] : [],
      ),
    );

    const total = data.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size: 20px; text-align:center;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    const correct = data.map((item) => item.answer);

    setInputs(correct);
    setWrongInputs(Array(data.length).fill(false));
    setRevealed(true);
    setLockedIds(data.map((_, index) => index));
    stopAudio();
  };

  const reset = () => {
    setInputs(Array(data.length).fill(""));
    setWrongInputs(Array(data.length).fill(false));
    setRevealed(false);
    setLockedIds([]);
    stopAudio();
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
          gap: "120px",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          questionNumber="1"
          title={
            <>
              Look and write <span style={{ color: "#2e3192" }}>dr</span> or{" "}
              <span style={{ color: "#2e3192" }}>tr</span>.
            </>
          }
          subTitle="Say each picture name, then write dr or tr to complete the word."
        />

        {/* QUESTIONS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-7 w-full">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-10 relative p-3 ${lockedIds.includes(index) ? "unit4-audio-control unit4-full-audio-enabled" : ""}`}
              role={lockedIds.includes(index) ? "button" : undefined}
              tabIndex={lockedIds.includes(index) ? 0 : undefined}
              aria-label={
                lockedIds.includes(index)
                  ? `Play completed word ${item.answer}${item.pattern}`
                  : undefined
              }
              onClick={() =>
                lockedIds.includes(index) &&
                playAudio(`full-${index}`, item.fullAudio)
              }
              onKeyDown={(event) => {
                if (
                  lockedIds.includes(index) &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  playAudio(`full-${index}`, item.fullAudio);
                }
              }}
            >
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `full-${index}`}
              />
              {/* NUMBER */}
              <span className="absolute -top-2 -left-2 text-lg font-bold">
                {index + 1}
              </span>

              {/* IMAGE */}
              <div className="w-[150px] h-24 flex items-center justify-center">
                <img
                  src={item.img}
                  alt={
                    [
                      "A blue and red truck.",
                      "A person dreaming while asleep.",
                      "A red dress.",
                      "A green tree.",
                    ][index]
                  }
                  className="max-w-full max-h-full"
                />
              </div>

              {/* WORD */}

              {/* WORD */}
              <div className="relative flex items-center gap-1 text-xl">
                <select
                  value={inputs[index]}
                  disabled={revealed || lockedIds.includes(index)}
                  onClick={(event) => event.stopPropagation()}
                  onChange={(e) => handleSelect(index, e.target.value)}
                  style={{
                    minWidth: "75px",
                    height: "38px",
                    borderBottom: `1px solid ${
                      wrongInputs[index] ? "red" : "black"
                    }`,
                    fontWeight: "bold",
                    fontSize: "18px",
                    textAlign: "center",
                    // outline: "none",
                    padding: "0 8px",
                    cursor:
                      revealed || lockedIds.includes(index)
                        ? "default"
                        : "pointer",
                  }}
                >
                  <option value="">--</option>

                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {/* WRONG MARK */}
                {wrongInputs[index] && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <WrongMark />
                  </div>
                )}

                {/* WORD PART AUDIO */}
                <div
                  className={
                    !lockedIds.includes(index)
                      ? "unit4-audio-control unit4-interactive"
                      : ""
                  }
                  role={!lockedIds.includes(index) ? "button" : undefined}
                  tabIndex={lockedIds.includes(index) ? -1 : 0}
                  aria-label={`Play word ending ${item.pattern}`}
                  onClick={(event) => {
                    event.stopPropagation();

                    if (!lockedIds.includes(index)) {
                      playAudio(`part-${index}`, item.audio);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (
                      !lockedIds.includes(index) &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      event.stopPropagation();

                      playAudio(`part-${index}`, item.audio);
                    }
                  }}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "20px",
                    cursor: lockedIds.includes(index) ? "default" : "pointer",
                    borderRadius: "4px",
                  }}
                >
                  <span>{item.pattern}</span>

                  {!lockedIds.includes(index) && (
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `part-${index}`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit10_Page5_Q1;
