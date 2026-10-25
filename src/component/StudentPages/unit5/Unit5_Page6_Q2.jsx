import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import houseImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 45/Ex E 1.svg";
import bikeAudio from "../../../assets/audio/ClassBook/Unit 5/Page 45 - Exercise E/Item_001_bike.mp3";
import tvAudio from "../../../assets/audio/ClassBook/Unit 5/Page 45 - Exercise E/Item_002_TV.mp3";
import bedAudio from "../../../assets/audio/ClassBook/Unit 5/Page 45 - Exercise E/Item_003_bed.mp3";
import washingMachineAudio from "../../../assets/audio/ClassBook/Unit 5/Page 45 - Exercise E/Item_004_washing_machine.mp3";

const QUESTIONS = [
  {
    id: "q0",
    noun: "bike",
    audio: bikeAudio,
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    answer: "It’s in the garage",
    answerOptions: [
      "It’s in the garage",
      "It’s in the bedroom",
      "It’s in the kitchen",
      "It’s in the bathroom",
    ],
  },
  {
    id: "q1",
    noun: "TV",
    audio: tvAudio,
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    answer: "It’s in the living room",
    answerOptions: [
      "It’s in the garage",
      "It’s in the kitchen",
      "It’s in the living room",
      "It’s in the bathroom",
    ],
  },
  {
    id: "q2",
    noun: "bed",
    audio: bedAudio,
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    answer: "It’s in the bedroom",
    answerOptions: [
      "It’s in the garage",
      "It’s in the bedroom",
      "It’s in the kitchen",
      "It’s in the bathroom",
    ],
  },
  {
    id: "q3",
    noun: "washing machine",
    audio: washingMachineAudio,
    qOptions: ["Where is the", "Where are the"],
    qCorrect: "Where is the",
    answer: "It’s in the basement",
    answerOptions: [
      "It’s in the garage",
      "It’s in the kitchen",
      "It’s in the basement",
      "It’s in the bathroom",
    ],
  },
];

const fieldKey = (type, index) => `${type}-${index}`;

export default function Unit5_Page6_Q2() {
  const [answers, setAnswers] = useState(
    QUESTIONS.map(() => ({ qAnswer: "", aAnswer: "" })),
  );
  const [wrongFields, setWrongFields] = useState([]);
  const [lockedFields, setLockedFields] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const totalFields = QUESTIONS.length * 2;

  const handleChange = (index, type, value) => {
    const key = fieldKey(type, index);
    if (lockedFields.includes(key)) return;
    setAnswers((previous) =>
      previous.map((answer, answerIndex) =>
        answerIndex === index
          ? { ...answer, [type === "q" ? "qAnswer" : "aAnswer"]: value }
          : answer,
      ),
    );
    setWrongFields((previous) => previous.filter((id) => id !== key));
  };

  const checkAnswers = () => {
    if (lockedFields.length === totalFields) return;
    if (answers.some((answer) => !answer.qAnswer || !answer.aAnswer)) {
      ValidationAlert.info(
        "Please complete every question and answer before checking.",
      );
      return;
    }

    const correct = [];
    const wrong = [];
    QUESTIONS.forEach((question, index) => {
      const qKey = fieldKey("q", index);
      const aKey = fieldKey("a", index);
      (answers[index].qAnswer === question.qCorrect ? correct : wrong).push(
        qKey,
      );
      (answers[index].aAnswer === question.answer ? correct : wrong).push(aKey);
    });
    setLockedFields((previous) => [...new Set([...previous, ...correct])]);
    setWrongFields(wrong);
    const score = correct.length;
    ValidationAlert[
      score === totalFields ? "success" : score === 0 ? "error" : "warning"
    ](`Score: ${score} / ${totalFields}`);
  };

  const showAnswers = () => {
    setAnswers(
      QUESTIONS.map((question) => ({
        qAnswer: question.qCorrect,
        aAnswer: question.answer,
      })),
    );
    setWrongFields([]);
    setLockedFields(
      QUESTIONS.flatMap((_, index) => [
        fieldKey("q", index),
        fieldKey("a", index),
      ]),
    );
    stopAudio();
  };

  const reset = () => {
    setAnswers(QUESTIONS.map(() => ({ qAnswer: "", aAnswer: "" })));
    setWrongFields([]);
    setLockedFields([]);
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
          sectionLetter="E"
          title="Look and answer."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />
        <div className="flex  w-full">
          <div className="w-full">
            {QUESTIONS.map((question, index) => {
              const qKey = fieldKey("q", index);
              const aKey = fieldKey("a", index);
              const qWrong = wrongFields.includes(qKey);
              const aWrong = wrongFields.includes(aKey);
              return (
                <div
                  key={question.id}
                  style={{
                    marginBottom: "30px",
                    display: "flex",
                    gap: "10px",
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <span className="text-[20px] font-bold">{index + 1}</span>
                  <div className="flex flex-col gap-5 w-full">
                    <div
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "18px",
                        width: "80%",
                      }}
                    >
                      <select
                        value={answers[index].qAnswer}
                        onChange={(event) =>
                          handleChange(index, "q", event.target.value)
                        }
                        disabled={lockedFields.includes(qKey)}
                        aria-label={`Question beginning for ${question.noun}`}
                        style={{
                          width: "80%",
                          outline: "none",
                          borderBottom: `1px solid ${qWrong ? "red" : "gray"}`,
                        }}
                      >
                        <option value="">select answer</option>
                        {question.qOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <span
                        role="button"
                        tabIndex={0}
                        className="unit4-audio-control unit4-interactive"
                        aria-label={`Play ${question.noun}`}
                        onClick={() =>
                          playAudio(`noun-${index}`, question.audio)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            playAudio(`noun-${index}`, question.audio);
                          }
                        }}
                      >
                        <Unit4PlayingAudioIcon
                          active={activeAudioKey === `noun-${index}`}
                        />
                        {question.noun}
                      </span>
                      <span>?</span>
                      {qWrong && (
                        <span
                          style={{
                            position: "absolute",
                            top: "8px",
                            right: "5px",
                          }}
                        >
                          <WrongMark />
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "80%",
                        fontSize: "18px",
                      }}
                    >
                      <select
                        value={answers[index].aAnswer}
                        onChange={(event) =>
                          handleChange(index, "a", event.target.value)
                        }
                        disabled={lockedFields.includes(aKey)}
                        aria-label={`Answer about the ${question.noun}`}
                        style={{
                          width: "100%",
                          padding: "6px",
                          outline: "none",
                          borderBottom: `1px solid ${aWrong ? "red" : "gray"}`,
                        }}
                      >
                        <option value="">select answer</option>
                        {question.answerOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {aWrong && (
                        <span
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                          }}
                        >
                          <WrongMark />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <img
            src={houseImage}
            alt="A cutaway house showing the bedroom, bathroom, living room, kitchen, basement, and garage"
            style={{ height: "450px" }}
          />
        </div>
        <Button
          handleStartAgain={reset}
          handleShowAnswer={showAnswers}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
}
