import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex E 8.svg";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2PlayingAudioIcon from "./Unit2PlayingAudioIcon";
import useUnit2Audio from "./useUnit2Audio";
import "./unit2Interactions.css";
import taxiAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_001_a_taxi.mp3";
import busAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_002_a_bus.mp3";
import airplaneAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_003_an_airplane.mp3";
import trainAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_004_a_train.mp3";
import boatAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_005_a_boat.mp3";
import shipAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_006_a_ship.mp3";
import carAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_007_a_car.mp3";
import bikeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_008_a_bike.mp3";
import scooterAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_009_a_scooter.mp3";
import subwayAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise E/Item_010_the_subway.mp3";

const OPTION_AUDIO = {
  "a taxi": taxiAudio,
  "a bus": busAudio,
  "an airplane": airplaneAudio,
  "a train": trainAudio,
  "a boat": boatAudio,
  "a ship": shipAudio,
  "a car": carAudio,
  "a bike": bikeAudio,
  "a scooter": scooterAudio,
  "the subway": subwayAudio,
};

const IMAGE_ALTS = [
  "A bus",
  "A train",
  "An airplane",
  "A ship",
  "A bicycle",
  "A taxi",
  "A car",
  "A subway train",
];

const Unit2_Page6_Q2 = () => {
  const questions = [
    { img: img1, option: ["a taxi", "a bus"], answer: "a bus" },
    { img: img2, option: ["an airplane", "a train"], answer: "a train" },
    { img: img3, option: ["a boat", "an airplane"], answer: "an airplane" },
    { img: img4, option: ["a car", "a ship"], answer: "a ship" },
    { img: img5, option: ["a bike", "a bus"], answer: "a bike" },
    { img: img6, option: ["a ship", "a taxi"], answer: "a taxi" },
    { img: img7, option: ["a car", "a scooter"], answer: "a car" },
    { img: img8, option: ["the subway", "a bike"], answer: "the subway" },
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

    const message = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color};font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);
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
      <div className="div-forall mb-10" style={{ gap: "15px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title="Look, read, and circle."
          subTitle="Read the clue and check the picture, then tap the one option that fits best."
        />
        {/* 🔥 GRID */}
        <div className="grid grid-cols-4 gap-x-10 gap-y-15 text-center mt-5 w-full">
          {" "}
          {questions.map((q, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              {/* IMAGE + NUMBER */}
              <div className="relative">
                <img
                  src={q.img}
                  alt={IMAGE_ALTS[index]}
                  style={{
                    height: "100px",
                    objectFit: "cover",
                  }}
                />

                <div className="absolute -top-3 -left-3 font-bold text-lg">
                  {index + 1}
                </div>
              </div>

              <div
                className="bg-orange-100 rounded-xl px-2 py-3  flex flex-col  items-center"
                style={{
                  width: "160px",
                }}
              >
                {q.option.map((type) => {
                  const selected = answers[index] === type;

                  return (
                    <div
                      key={type}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      aria-disabled={showAnswer || correctIds.includes(index)}
                      onClick={() => {
                        playAudio(
                          `option-${index}-${type}`,
                          OPTION_AUDIO[type],
                        );
                        choose(index, type);
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        playAudio(
                          `option-${index}-${type}`,
                          OPTION_AUDIO[type],
                        );
                        choose(index, type);
                      }}
                      className="unit2-audio-control unit2-interactive cursor-pointer px-2 py-1 rounded-full"
                      style={{
                        border: selected
                          ? checkedIds.includes(index)
                            ? type === q.answer
                              ? "1px solid #f39b42" // 🔵 صح
                              : "2px solid red" // 🔴 غلط
                            : "1px solid #f39b42" // قبل check
                          : "1px solid transparent",
                        position: "relative",
                      }}
                    >
                      {type}
                      {checkedIds.includes(index) &&
                        selected &&
                        type !== q.answer && <WrongMark />}
                      <Unit2PlayingAudioIcon
                        active={activeAudioKey === `option-${index}-${type}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit2_Page6_Q2;
