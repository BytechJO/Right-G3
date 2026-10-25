import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex D 3.svg";
import question1Audio from "../../../assets/audio/ClassBook/Unit 5/Page 45 - Exercise D/Item_001_Is_there_a_bathtub_behind_the_toilet.mp3";
import question2Audio from "../../../assets/audio/ClassBook/Unit 5/Page 45 - Exercise D/Item_002_Are_there_books_in_front_of_the_door.mp3";
import question3Audio from "../../../assets/audio/ClassBook/Unit 5/Page 45 - Exercise D/Item_003_Is_there_a_telephone_next_to_the_sink.mp3";

const QUESTIONS = [
  {
    id: 1,
    img: img1,
    alt: "A bathroom with a toilet, a pedestal sink, and a bathtub",
    question: "Is there a bathtub behind the toilet?",
    correct: "No, there isn’t.",
    audio: question1Audio,
  },
  {
    id: 2,
    img: img2,
    alt: "A dining room with a bookcase, table, chairs, and a door",
    question: "Are there books in front of the door?",
    correct: "No, there aren’t",
    audio: question2Audio,
  },
  {
    id: 3,
    img: img3,
    alt: "A sink with a telephone on the wall next to it",
    question: "Is there a telephone next to the sink?",
    correct: "Yes, there is.",
    audio: question3Audio,
  },
];

const SENTENCES = [
  "No, there isn’t.",
  "No, there aren’t",
  "Yes, there is.",
  "Yes, there are.",
];

export default function Unit5_Page6_Q1() {
  const [answers, setAnswers] = useState(QUESTIONS.map(() => ""));
  const [wrongIds, setWrongIds] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (value, index) => {
    if (lockedIds.includes(index)) return;
    setAnswers((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
    setWrongIds((previous) => previous.filter((id) => id !== index));
  };

  const checkAnswers = () => {
    if (lockedIds.length === QUESTIONS.length) return;
    if (answers.includes("")) {
      ValidationAlert.info("Please answer all questions.");
      return;
    }
    const correctIds = QUESTIONS.flatMap((question, index) =>
      answers[index] === question.correct ? [index] : [],
    );
    const wrong = QUESTIONS.flatMap((question, index) =>
      answers[index] !== question.correct ? [index] : [],
    );
    setLockedIds((previous) => [...new Set([...previous, ...correctIds])]);
    setWrongIds(wrong);
    const score = correctIds.length;
    ValidationAlert[
      score === QUESTIONS.length ? "success" : score === 0 ? "error" : "warning"
    ](`Score: ${score} / ${QUESTIONS.length}`);
  };

  const showAnswer = () => {
    setAnswers(QUESTIONS.map((question) => question.correct));
    setWrongIds([]);
    setLockedIds(QUESTIONS.map((_, index) => index));
    stopAudio();
  };

  const reset = () => {
    setAnswers(QUESTIONS.map(() => ""));
    setWrongIds([]);
    setLockedIds([]);
    stopAudio();
  };

  return (
    <div
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="div-forall mb-10" style={{ gap: "40px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Look, read, and answer."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />
        {QUESTIONS.map((question, index) => {
          const isWrong = wrongIds.includes(index);
          const isLocked = lockedIds.includes(index);
          return (
            <div
              key={question.id}
              className="w-full"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <span className="text-[20px] font-bold">{question.id}</span>
              <img
                src={question.img}
                alt={question.alt}
                style={{ height: "110px", borderRadius: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "110px",
                }}
              >
                <p
                  role="button"
                  tabIndex={0}
                  className="unit4-audio-control unit4-interactive"
                  aria-label={`Play: ${question.question}`}
                  onClick={() => playAudio(`question-${index}`, question.audio)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`question-${index}`, question.audio);
                    }
                  }}
                  style={{ fontSize: "20px", marginBottom: "10px" }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `question-${index}`}
                  />
                  {question.question}
                </p>
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <select
                    value={answers[index]}
                    disabled={isLocked}
                    aria-label={`Answer question ${question.id}`}
                    onChange={(event) =>
                      handleSelect(event.target.value, index)
                    }
                    style={{
                      padding: "8px 12px",
                      fontSize: "16px",
                      width: "100%",
                      borderBottom: isWrong
                        ? "2px solid red"
                        : "1px solid #ccc",
                      fontWeight: "bold",
                      cursor: isLocked ? "default" : "pointer",
                    }}
                  >
                    <option value="">Choose answer</option>
                    {SENTENCES.map((sentence) => (
                      <option key={sentence} value={sentence}>
                        {sentence}
                      </option>
                    ))}
                  </select>
                  {isWrong && (
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "0px",
                      }}
                    >
                      <WrongMark />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <Button
          handleShowAnswer={showAnswer}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
}
