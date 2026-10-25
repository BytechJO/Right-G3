import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Asset 17 (1).svg";
import WrongMark from "../../WrongMark";
import Button from "../../Button";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import "../unit2/unit2Interactions.css";
import oldestQuestionAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise A/Item_001_Who_is_the_oldest.mp3";
import tallestQuestionAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise A/Item_002_Who_is_the_tallest.mp3";
import shortestQuestionAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise A/Item_006_Who_is_the_shortest.mp3";
import saddestQuestionAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise A/Item_007_Who_is_the_saddest.mp3";
import loudestQuestionAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise A/Item_010_Who_is_the_loudest.mp3";
import thinnestQuestionAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise A/Item_011_Who_is_the_thinnest.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
const QUESTION_AUDIO = {
  1: oldestQuestionAudio,
  2: tallestQuestionAudio,
  3: shortestQuestionAudio,
  4: saddestQuestionAudio,
  5: loudestQuestionAudio,
  6: thinnestQuestionAudio,
};

const Review1_Page1_Q1 = () => {
  const answersBank = ["A", "B", "C", "D", "E", "F"];

  const questions = [
    { id: 1, text: "Who is the oldest?", answer: "B" },
    { id: 2, text: "Who is the tallest?", answer: "F" },
    { id: 3, text: "Who is the shortest?", answer: "C" },
    { id: 4, text: "Who is the saddest?", answer: "A" },
    { id: 5, text: "Who is the loudest?", answer: "D" },
    { id: 6, text: "Who is the thinnest?", answer: "E" },
    {
      id: 7,
      text: "Which is your favorite clown? Why?",
      answer: "",
    },
  ];
  const [textAnswer, setTextAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();
  const handleSelect = (questionId, value) => {
    if (showAnswer || correctIds.includes(questionId)) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setCheckedIds((previous) => previous.filter((id) => id !== questionId));
  };
  const reset = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
    setTextAnswer("");
    stopAudio();
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q) => {
      filled[q.id] = q.answer;
    });
    setAnswers(filled);
    setCheckedIds(questions.slice(0, 6).map((question) => question.id));
    setCorrectIds(questions.slice(0, 6).map((question) => question.id));
    setShowAnswer(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === 6) return;
    const requiredQuestions = questions.slice(0, 6);

    if (Object.keys(answers).length < requiredQuestions.length) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;

    requiredQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });
    setCorrectIds(
      requiredQuestions
        .filter((question) => answers[question.id] === question.answer)
        .map((question) => question.id),
    );
    setCheckedIds(requiredQuestions.map((question) => question.id));

    const total = requiredQuestions.length;

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${correct} / ${total}
    </span>
  </div>
`;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);
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
          sectionLetter="A"
          title="Look, read, and answer the questions."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />

        {/* IMAGES */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-center gap-8 ">
            <div className="relative">
              <img
                src={imgA}
                alt="Seven labeled clowns with different ages, heights, expressions, body shapes, and one using a megaphone"
                style={{
                  width: "100%",
                  height: "40vh",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* QUESTIONS GRID */}

          <div className="grid grid-cols-2 gap-x-16 mb-15 w-full">
            {questions.map((q) => (
              <div key={q.id}>
                <div className="flex gap-3 text-lg">
                  <span className="font-bold">{q.id}</span>
                  <p
                    role={q.id <= 6 ? "button" : undefined}
                    tabIndex={q.id <= 6 ? 0 : undefined}
                    className={
                      q.id <= 6
                        ? "unit2-audio-control unit2-interactive"
                        : undefined
                    }
                    onClick={() =>
                      q.id <= 6 &&
                      playAudio(`question-${q.id}`, QUESTION_AUDIO[q.id])
                    }
                    onKeyDown={(event) => {
                      if (
                        q.id <= 6 &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`question-${q.id}`, QUESTION_AUDIO[q.id]);
                      }
                    }}
                  >
                    {q.text}
                    {q.id <= 6 && (
                      <Unit2PlayingAudioIcon
                        active={activeAudioKey === `question-${q.id}`}
                      />
                    )}
                  </p>
                </div>

                {q.id === 7 ? (
                  <input
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    disabled={showAnswer}
                    placeholder="Type your answer..."
                    className="border-b-1 border-black w-full mt-2"
                  />
                ) : (
                  <div
                    style={{
                      borderBottom: checkedIds.includes(q.id)
                        ? answers[q.id] === q.answer
                          ? "1px solid #656565ff"
                          : "2px solid #ef4444"
                        : "1px solid #000",
                    }}
                    className="min-h-10 mt-2"
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <p className="flex items-center gap-2 flex-wrap">
                        Clown
                        <select
                          value={answers[q.id] || ""}
                          onChange={(e) => handleSelect(q.id, e.target.value)}
                          disabled={showAnswer || correctIds.includes(q.id)}
                          className="border-b px-2 py-1 bg-white"
                        >
                          <option value="">Select</option>

                          {answersBank.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        is the {q.text.split("the ")[1].replace("?", "")}.
                      </p>

                      {checkedIds.includes(q.id) &&
                        answers[q.id] &&
                        answers[q.id] !== q.answer && (
                          <div
                            style={{
                              position: "absolute",
                              right: "-20px",
                              top: "0",
                            }}
                          >
                            <WrongMark />
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* BUTTONS */}

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review1_Page1_Q1;
