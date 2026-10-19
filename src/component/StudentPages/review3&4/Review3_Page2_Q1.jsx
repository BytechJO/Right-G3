import React, { useState } from "react";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex C 1.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Review3_Page2_Q1.css";
import WrongMark from "../../WrongMark";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise C/Item_001_There_was_a_big_spla_when_Jan_dived_in_the_pool.mp3";
import audio2 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise C/Item_002_Mar_is_the_third_month_of_the_year.mp3";
import audio3 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise C/Item_003_Mrs._Bell_is_the_best_tea_er_in_the_school.mp3";
import audio4 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise C/Item_004_ut_the_door_when_you_leave.mp3";
import audio5 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise C/Item_005_We_used_a_knife_to_op_the_peppers.mp3";
import audio6 from "../../../assets/audio/ClassBook/Unit 4/Page 35 - Exercise C/Item_006_Aunt_Jo_went_opping_at_the_mall.mp3";

const SENTENCE_AUDIO = [audio1, audio2, audio3, audio4, audio5, audio6];

const Review3_Page2_Q1 = () => {
  const correctAnswers = ["sh", "ch", "ch", "sh", "ch", "sh"];

  const [answers, setAnswers] = useState(["", "", "", "", "", ""]);
  const [wrongInputs, setWrongInputs] = useState([]);
  const [lockedInputs, setLockedInputs] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const options = ["sh", "ch"];

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (value, index) => {
    if (lockedInputs.includes(index)) return;

    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);

    setWrongInputs((previous) => previous.filter((id) => id !== index));
  };

  /* ================= CHECK ================= */
  const checkAnswers = () => {
    if (lockedInputs.length === correctAnswers.length) return;

    if (answers.some((ans) => ans === "")) {
      ValidationAlert.info("Please fill in all the blanks before checking!");
      return;
    }

    let tempScore = 0;
    let wrong = [];

    answers.forEach((ans, i) => {
      if (ans === correctAnswers[i]) tempScore++;
      else wrong.push(i);
    });

    setWrongInputs(wrong);
    setLockedInputs(
      correctAnswers.flatMap((answer, i) => (answers[i] === answer ? [i] : [])),
    );

    const total = correctAnswers.length;
    const color =
      tempScore === total ? "green" : tempScore === 0 ? "red" : "orange";

    ValidationAlert[
      tempScore === total ? "success" : tempScore === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${tempScore} / ${total}
        </span>
      </div>
    `);
  };

  const reset = () => {
    setAnswers(["", "", "", "", "", ""]);
    setWrongInputs([]);
    setLockedInputs([]);
    stopAudio();
  };

  const showAnswer = () => {
    setAnswers([...correctAnswers]);
    setWrongInputs([]);
    setLockedInputs(correctAnswers.map((_, i) => i));
    stopAudio();
  };

  const sentences = [
    "There was a big spla____ when Jan dived in the pool.",
    "Mar____ is the third month of the year.",
    "Mrs. Bell is the best tea____er in the school.",
    "____ut the door when you leave.",
    "We used a knife to ____op the peppers.",
    "Aunt Jo went ____opping at the mall.",
  ];

  return (
    <div
      className="question-wrapper-unit3-page6-q1"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <ExerciseHeaderReview
          sectionLetter="C"
          title={
            <>
              Read and complete the sentences. Write{" "}
              <span style={{ color: "#2e3192" }}>sh</span> or{" "}
              <span style={{ color: "#2e3192" }}>ch</span>.
            </>
          }
          subTitle="Say each completed word aloud, then add sh or ch to each blank."
        />

        <div className="flex gap-5 items-center">
          {/* QUESTIONS */}
          <div className="flex flex-col gap-6">
            {sentences.map((text, i) => {
              const isWrong = wrongInputs.includes(i);

              return (
                <div
                  key={i}
                  className={`unit4-audio-control ${lockedInputs.includes(i) ? "unit4-full-audio-enabled" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play sentence ${i + 1}`}
                  onClick={() => playAudio(`sentence-${i}`, SENTENCE_AUDIO[i])}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`sentence-${i}`, SENTENCE_AUDIO[i]);
                    }
                  }}
                  style={{
                    fontSize: "18px",

                    // fontWeight: 500,
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `sentence-${i}`}
                  />
                  <span
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      fontWeight: 500,
                    }}
                  >
                    {i + 1}
                  </span>{" "}
                  {text.split("____").map((part, j) => (
                    <span key={j}>
                      {part}

                      {j === 0 && (
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <select
                            value={answers[i]}
                            onChange={(e) => handleChange(e.target.value, i)}
                            disabled={lockedInputs.includes(i)}
                            style={{
                              margin: "0 6px",
                              padding: "4px 8px",
                              position: "relative",
                              // borderRadius: "6px",
                              borderBottom: isWrong
                                ? "2px solid red"
                                : "1px solid #ccc",
                              fontWeight: "bold",
                              // color: "#F79530",
                              backgroundColor: isWrong ? "#ffe5e5" : "white",
                              minWidth: "70px",
                            }}
                          >
                            <option value=""> </option>
                            {options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}{" "}
                          </select>
                          {isWrong && (
                            <div className="absolute top-1 right-8">
                              <WrongMark />
                            </div>
                          )}
                        </div>
                      )}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>

          {/* IMAGE */}
          <div style={{ marginTop: "20px" }}>
            <img
              src={img1}
              alt="Picture clues for splash, March, teacher, shut, chop, and shopping"
              style={{ width: "auto", height: "350px" }}
            />
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswer} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review3_Page2_Q1;
