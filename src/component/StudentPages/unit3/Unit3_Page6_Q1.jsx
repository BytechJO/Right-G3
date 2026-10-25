import React, { useState } from "react";
import "./Unit3_Page6_Q1.css";
import "./unit3Interactions.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3PlayingAudioIcon from "./Unit3PlayingAudioIcon";
import useUnit3Audio from "./useUnit3Audio";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 27/Ex D 4.svg";
import question1Audio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_001_Do_they_have_any_vegetables.mp3";
import question2Audio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_002_Does_she_have_any_hats.mp3";
import yesTheyAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_003_Yes,_they_do_have_some.mp3";
import yesSheAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_004_Yes,_she_has_some.mp3";
import noTheyAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_005_No,_they_don't_have_any.mp3";
import noSheAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_006_No,_she_doesn't_have_any.mp3";
import question3Audio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_007_Do_they_have_any_hot_drinks.mp3";
import question4Audio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise D/Item_008_Does_she_have_any_ice_cream.mp3";

const OPTION_AUDIO = {
  "Yes, they do have some.": yesTheyAudio,
  "Yes, she has some.": yesSheAudio,
  "No, they don’t have any.": noTheyAudio,
  "No, she doesn’t have any.": noSheAudio,
};

const questions = [
  {
    id: 1,
    text: "Do they have any vegetables?",
    audio: question1Audio,
    image: img1,
    alt: "Children sitting at a table with a bowl of fruit and no vegetables",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 2,
    text: "Does she have any hats?",
    audio: question2Audio,
    image: img2,
    alt: "A shopper wearing a hat beside a shopkeeper",
    options: ["Yes, she has some.", "No, she doesn’t have any."],
    correct: "Yes, she has some.",
  },
  {
    id: 3,
    text: "Do they have any hot drinks?",
    audio: question3Audio,
    image: img3,
    alt: "Children at a table with cold drink cartons and glasses",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 4,
    text: "Does she have any ice cream?",
    audio: question4Audio,
    image: img4,
    alt: "Two children at a table with milk and no ice cream",
    options: ["Yes, she has some.", "No, she doesn’t have any."],
    correct: "No, she doesn’t have any.",
  },
];

export default function Unit3_Page6_Q1() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit3Audio();

  const handleSelect = (questionId, option) => {
    if (showAnswer || correctIds.includes(questionId)) return;
    setAnswers((previous) => ({ ...previous, [questionId]: option }));
    setCheckedIds((previous) => previous.filter((id) => id !== questionId));
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === questions.length) return;
    if (questions.some((question) => !answers[question.id])) {
      ValidationAlert.info(
        "Oops!",
        "Please answer all questions before checking.",
      );
      return;
    }

    const nextCorrectIds = questions
      .filter((question) => answers[question.id] === question.correct)
      .map((question) => question.id);
    const correctCount = nextCorrectIds.length;
    const total = questions.length;
    setCorrectIds(nextCorrectIds);
    setCheckedIds(questions.map((question) => question.id));

    if (correctCount === total)
      ValidationAlert.success(`Score: ${correctCount} / ${total}`);
    else if (correctCount === 0)
      ValidationAlert.error(`Score: ${correctCount} / ${total}`);
    else ValidationAlert.warning(`Score: ${correctCount} / ${total}`);
  };

  const showAnswers = () => {
    setAnswers(
      Object.fromEntries(
        questions.map((question) => [question.id, question.correct]),
      ),
    );
    setCheckedIds(questions.map((question) => question.id));
    setCorrectIds(questions.map((question) => question.id));
    setShowAnswer(true);
    stopAudio();
  };

  const reset = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
    stopAudio();
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
      <div className="div-forall" style={{ gap: "10px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Read and circle."
          subTitle="Read the clue and check the picture, then tap the one option that fits best."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px 60px",
            width: "100%",
            maxWidth: "900px",
            marginBottom: "40px",
          }}
        >
          {questions.map((question) => (
            <div
              key={question.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span className="text-[20px]" style={{ fontWeight: "bold" }}>
                  {question.id}
                </span>
                <button
                  type="button"
                  className="unit3-audio-control unit3-interactive text-[18px] cursor-pointer bg-transparent"
                  onClick={() =>
                    playAudio(`question-${question.id}`, question.audio)
                  }
                  aria-label={`Play question ${question.id}: ${question.text}`}
                >
                  {question.text}
                  <Unit3PlayingAudioIcon
                    active={activeAudioKey === `question-${question.id}`}
                  />
                </button>
              </div>

              <img
                src={question.image}
                alt={question.alt}
                style={{ width: "auto", height: "110px" }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option;
                  const isCorrect = option === question.correct;
                  const isWrong =
                    checkedIds.includes(question.id) &&
                    isSelected &&
                    !isCorrect;
                  return (
                    <button
                      type="button"
                      key={option}
                      aria-pressed={isSelected}
                      aria-disabled={
                        showAnswer || correctIds.includes(question.id)
                      }
                      onClick={() => {
                        playAudio(
                          `option-${question.id}-${option}`,
                          OPTION_AUDIO[option],
                        );
                        handleSelect(question.id, option);
                      }}
                      className="unit3-audio-control unit3-interactive cursor-pointer bg-white"
                      style={{
                        cursor: "pointer",
                        padding: "5px 10px",
                        borderRadius: "25px",
                        width: "fit-content",
                        fontSize: "16px",
                        position: "relative",
                        border: isSelected
                          ? isWrong
                            ? "2px solid red"
                            : "1px solid #f39b42"
                          : "1px solid transparent",
                      }}
                    >
                      {option}
                      {isWrong && <WrongMark />}
                      <Unit3PlayingAudioIcon
                        active={
                          activeAudioKey === `option-${question.id}-${option}`
                        }
                      />
                    </button>
                  );
                })}
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
}
