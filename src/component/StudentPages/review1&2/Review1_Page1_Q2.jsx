import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 3.svg";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import "../unit2/unit2Interactions.css";
import fastAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_001_fast.mp3";
import fastestAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_002_is_the_fastest.mp3";
import slowestAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_003_is_the_slowest.mp3";
import shortAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_004_short.mp3";
import shortestAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_005_is_the_shortest.mp3";
import tallestAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_006_is_the_tallest.mp3";
import oldAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_007_old.mp3";
import oldestAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_008_is_the_oldest.mp3";
import youngestAudio from "../../../assets/audio/ClassBook/Unit 2/Page 16 - Exercise B/Item_009_is_the_youngest.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const LABEL_AUDIO = { fast: fastAudio, short: shortAudio, old: oldAudio };
const ENDING_AUDIO = {
  fastest: fastestAudio,
  slowest: slowestAudio,
  shortest: shortestAudio,
  tallest: tallestAudio,
  oldest: oldestAudio,
  youngest: youngestAudio,
};
const IMAGE_ALTS = [
  "A bicycle, a car, and an airplane labeled A, B, and C",
  "Three clowns of different heights labeled A, B, and C",
  "An older man, a young man, and a baby labeled A, B, and C",
];

const Review1_Page1_Q2 = () => {
  const answersBank = ["A", "B", "C"];

  const questions = [
    {
      id: 1,
      label: "fast",
      images: img1,
      answers: { fastest: "C", slowest: "A" },
    },
    {
      id: 2,
      label: "short",
      images: img2,
      answers: { shortest: "C", tallest: "B" },
    },
    {
      id: 3,
      label: "old",
      images: img3,
      answers: { oldest: "A", youngest: "C" },
    },
  ];

  const [answers, setAnswers] = useState({});
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [correctKeys, setCorrectKeys] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const handleSelect = (key, value) => {
    if (showAnswer || correctKeys.includes(key)) return;

    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCheckedKeys((previous) => previous.filter((item) => item !== key));
  };
  const reset = () => {
    setAnswers({});
    setCheckedKeys([]);
    setCorrectKeys([]);
    setShowAnswer(false);
    stopAudio();
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        filled[`${qIndex}-${type}`] = value;
      });
    });
    setAnswers(filled);
    setCheckedKeys(Object.keys(filled));
    setCorrectKeys(Object.keys(filled));
    setShowAnswer(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAnswer || correctKeys.length === 6) return;
    const totalInputs = questions.reduce(
      (acc, q) => acc + Object.keys(q.answers).length,
      0,
    );

    if (Object.keys(answers).length < totalInputs) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        total++;
        if (answers[`${qIndex}-${type}`] === value) correct++;
      });
    });
    const nextCorrect = [];
    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        const key = `${qIndex}-${type}`;
        if (answers[key] === value) nextCorrect.push(key);
      });
    });
    setCorrectKeys(nextCorrect);
    setCheckedKeys(
      questions.flatMap((q, qIndex) =>
        Object.keys(q.answers).map((type) => `${qIndex}-${type}`),
      ),
    );

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
      <div
        className="div-forall"
        style={{
          gap: "40px",
        }}
      >
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Read, look, and write. You can answer in two ways."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />
        {/* QUESTIONS */}
        <div className="flex flex-col gap-10 w-full">
          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                // marginBottom: "40px",
              }}
            >
              {/* LEFT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "50%",

                  gap: "10px",
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="unit2-audio-control unit2-interactive flex text-[20px] w-[60px]"
                  onClick={() =>
                    playAudio(`label-${qIndex}`, LABEL_AUDIO[q.label])
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`label-${qIndex}`, LABEL_AUDIO[q.label]);
                    }
                  }}
                >
                  <span className="font-bold text-[20px] mr-2">{q.id}</span>{" "}
                  {q.label}
                  <Unit2PlayingAudioIcon
                    active={activeAudioKey === `label-${qIndex}`}
                  />
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                  <div key={q.id} style={{ textAlign: "center" }}>
                    <img
                      src={q.images}
                      alt={IMAGE_ALTS[qIndex]}
                      style={{
                        width: "300px",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ width: "50%" }}>
                {Object.keys(q.answers).map((type) => (
                  <div
                    key={type}
                    style={{
                      marginBottom: "12px",
                      minHeight: "40px",
                      borderBottom: checkedKeys.includes(`${qIndex}-${type}`)
                        ? answers[`${qIndex}-${type}`] === q.answers[type]
                          ? "1px solid #000"
                          : "2px solid #ef4444"
                        : "1px solid #000",
                      padding: "5px",
                      position: "relative",
                    }}
                  >
                    <p className="flex items-center gap-2 flex-wrap">
                      <select
                        value={answers[`${qIndex}-${type}`] || ""}
                        onChange={(e) =>
                          handleSelect(`${qIndex}-${type}`, e.target.value)
                        }
                        disabled={
                          showAnswer ||
                          correctKeys.includes(`${qIndex}-${type}`)
                        }
                        className="border-b px-2 py-1 outline-none bg-white"
                      >
                        <option value="">Select</option>

                        {answersBank.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <span
                        role="button"
                        tabIndex={0}
                        className="unit2-audio-control unit2-interactive"
                        onClick={() =>
                          playAudio(
                            `ending-${qIndex}-${type}`,
                            ENDING_AUDIO[type],
                          )
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            playAudio(
                              `ending-${qIndex}-${type}`,
                              ENDING_AUDIO[type],
                            );
                          }
                        }}
                      >
                        is the {type}.
                        <Unit2PlayingAudioIcon
                          active={activeAudioKey === `ending-${qIndex}-${type}`}
                        />
                      </span>
                    </p>

                    {/* WRONG MARK */}
                    {checkedKeys.includes(`${qIndex}-${type}`) &&
                      answers[`${qIndex}-${type}`] &&
                      answers[`${qIndex}-${type}`] !== q.answers[type] && (
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
                ))}
              </div>
            </div>
          ))}
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

export default Review1_Page1_Q2;
