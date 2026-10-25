import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import "../unit2/unit2Interactions.css";
import sentenceOneAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise E/Item_001_Can_you_please_fill_my_cup_with_milk.mp3";
import longUAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise E/Item_002_long_u.mp3";
import shortUAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise E/Item_003_short_u.mp3";
import sentenceTwoAudio from "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise E/Item_004_In_math_class,_we_studied_the_cube.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const OPTION_AUDIO = { "long u": longUAudio, "short u": shortUAudio };
const SENTENCE_AUDIO = [sentenceOneAudio, sentenceTwoAudio];

const Review2_Page2_Q3 = () => {
  const questions = [
    {
      text: "I can you please fill my cup with milk?",
      underline: "cup",
      answer: "short u",
    },
    {
      text: "In math class, we studied the cube.",
      underline: "cube",
      answer: "long u",
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const choose = (index, value) => {
    if (showAnswer || correctIds.includes(index)) return;
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    setCheckedIds((previous) => previous.filter((id) => id !== index));
  };

  const resetAll = () => {
    setAnswers(Array(questions.length).fill(""));
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
    stopAudio();
  };

  const showAnswers = () => {
    setAnswers(questions.map((q) => q.answer));
    setCheckedIds(questions.map((_, index) => index));
    setCorrectIds(questions.map((_, index) => index));
    setShowAnswer(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === questions.length) return;

    if (answers.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    answers.forEach((a, i) => {
      if (a === questions[i].answer) score++;
    });
    setCorrectIds(
      questions.flatMap((question, index) =>
        answers[index] === question.answer ? [index] : [],
      ),
    );
    setCheckedIds(questions.map((_, index) => index));

    const total = questions.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `);
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
      <div className="div-forall" style={{ gap: "110px" }}>
        <ExerciseHeaderReview
          sectionLetter="E"
          title={
            <>
              Does the underlined word have a{" "}
              <span style={{ color: "#2e3192" }}>long u</span> or{" "}
              <span style={{ color: "#2e3192" }}>short u</span> sound? Read and
              circle.
            </>
          }
          subTitle="Read the underlined word aloud, then decide whether its u sound is long or short."
        />

        {questions.map((q, i) => {
          const parts = q.text.split(q.underline);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "2px solid #f97316",
                borderRadius: "10px",
                fontSize: "22px",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              {/* الجملة */}
              <div
                role="button"
                tabIndex={0}
                className="unit2-audio-control unit2-interactive"
                onClick={() => playAudio(`sentence-${i}`, SENTENCE_AUDIO[i])}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`sentence-${i}`, SENTENCE_AUDIO[i]);
                  }
                }}
              >
                <b>{i + 1}.</b> {parts[0]}
                <span
                  style={{
                    textDecoration: "underline",
                    fontWeight: "500",
                    color: "#F79530",
                    fontSize: "22px",
                  }}
                >
                  {q.underline}
                </span>
                {parts[1]}
                <Unit2PlayingAudioIcon
                  active={activeAudioKey === `sentence-${i}`}
                />
              </div>

              {/* الخيارات */}
              <div style={{ display: "flex", gap: "10px" }}>
                {["long u", "short u"].map((opt) => {
                  const selected = answers[i] === opt;

                  return (
                    <div
                      key={opt}
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected}
                        aria-disabled={showAnswer || correctIds.includes(i)}
                        className="unit2-audio-control unit2-interactive"
                        onClick={() => {
                          playAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                          choose(i, opt);
                        }}
                        onKeyDown={(event) => {
                          if (event.key !== "Enter" && event.key !== " ")
                            return;
                          event.preventDefault();
                          playAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                          choose(i, opt);
                        }}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          border: selected
                            ? "2px solid #F79530"
                            : "2px solid #ccc",
                          cursor:
                            showAnswer || correctIds.includes(i)
                              ? "default"
                              : "pointer",
                          // background: selected ? "#1C398E" : "#fff",
                          // color: selected ? "#fff" : "#000",
                        }}
                      >
                        {opt}
                        <Unit2PlayingAudioIcon
                          active={activeAudioKey === `option-${i}-${opt}`}
                        />
                      </div>

                      {checkedIds.includes(i) &&
                        selected &&
                        opt !== q.answer && (
                          <div
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "0px",
                              zIndex: 10,
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review2_Page2_Q3;
