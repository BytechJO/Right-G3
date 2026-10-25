/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2PlayingAudioIcon from "./Unit2PlayingAudioIcon";
import useUnit2Audio from "./useUnit2Audio";
import "./unit2Interactions.css";
import iAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_001_I.mp3";
import subwayAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_002_take_the_subway.mp3";
import taxiAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_003_take_a_taxi.mp3";
import schoolAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_004_to_school.mp3";
import busAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_005_take_a_bus.mp3";
import bikeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_006_ride_a_bike.mp3";
import walkAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_007_walk.mp3";
import trainAudio from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/Item_008_take_a_train.mp3";

const OPTION_AUDIO = {
  "take the subway": subwayAudio,
  "take a taxi": taxiAudio,
  "take a bus": busAudio,
  "ride a bike": bikeAudio,
  walk: walkAudio,
  "take a train": trainAudio,
};

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 4.svg";
// Full Audio  //
import full1 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/full1.mp3";
import full2 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/full2.mp3";
import full3 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/full3.mp3";
import full4 from "../../../assets/audio/ClassBook/Unit 2/Page 15 - Exercise D/full4.mp3";
const QUESTIONS = [
  {
    id: 1,
    img: imgA,
    options: ["take the subway", "take a taxi"],
    correct: "take the subway",
    fullAudio: full1,
  },
  {
    id: 2,
    img: imgB,
    options: ["take a bus", "ride a bike"],
    correct: "ride a bike",
    fullAudio: full2,
  },
  {
    id: 3,
    img: imgC,
    options: ["ride a bike", "walk"],
    correct: "walk",
    fullAudio: full3,
  },
  {
    id: 4,
    img: imgD,
    options: ["take a bus", "take a train"],
    correct: "take a bus",
    fullAudio: full4,
  },
];

const OptionItem = ({
  option,
  isSelected,
  isCorrect,
  showResult,
  locked,
  onClick,
  onPlayAudio,
  activeAudio,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-disabled={locked}
      onClick={(event) => {
        event.stopPropagation();
        onPlayAudio();
        if (!locked) onClick();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        event.stopPropagation();
        onPlayAudio();
        if (!locked) onClick();
      }}
      className="unit2-audio-control unit2-interactive relative cursor-pointer px-2 py-1 ml-5 text-[18px] inline-block"
    >
      {option}

      {isSelected && (
        <div
          className="absolute -top-1 -left-2 -right-2 -bottom-1 rounded-[20px] pointer-events-none"
          style={{
            border: showResult
              ? isCorrect
                ? "1px solid #f39b42"
                : "2px solid red"
              : "1px solid #f39b42",
          }}
        />
      )}

      {showResult && isSelected && !isCorrect && <WrongMark />}
      <Unit2PlayingAudioIcon active={activeAudio} />
    </div>
  );
};

const Unit2_Page6_Q1 = () => {
  const [selected, setSelected] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const handleSelect = (qId, option) => {
    if (showAnswer || correctIds.includes(qId)) return;

    setSelected((prev) => ({
      ...prev,
      [qId]: option,
    }));
    setCheckedIds((previous) => previous.filter((id) => id !== qId));
  };

  const reset = () => {
    setSelected({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
    stopAudio();
  };

  const showAnswers = () => {
    const filled = {};

    QUESTIONS.forEach((q) => {
      filled[q.id] = q.correct;
    });

    setSelected(filled);
    setCheckedIds(QUESTIONS.map((question) => question.id));
    setCorrectIds(QUESTIONS.map((question) => question.id));
    setShowAnswer(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === QUESTIONS.length) return;

    const hasEmpty = QUESTIONS.some((q) => !selected[q.id]);

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;

    QUESTIONS.forEach((q) => {
      if (selected[q.id] === q.correct) correct++;
    });

    setCorrectIds(
      QUESTIONS.filter((q) => selected[q.id] === q.correct).map((q) => q.id),
    );
    setCheckedIds(QUESTIONS.map((q) => q.id));

    const total = QUESTIONS.length;

    if (correct === total) {
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    } else if (correct === 0) {
      ValidationAlert.error(`Score: ${correct} / ${total}`);
    } else {
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    }
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-5 mb-10" style={{ gap: "25px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Look, read, and circle."
          subTitle="Read the clue and check the picture, then tap the one option that fits best."
        />

        <div className="grid grid-cols-2 gap-x-10  w-full">
          {" "}
          {QUESTIONS.map((q) => {
            const fullAudioEnabled = correctIds.includes(q.id);

            return (
            <div
              key={q.id}
              role={fullAudioEnabled ? "button" : undefined}
              tabIndex={fullAudioEnabled ? 0 : undefined}
              aria-label={
                fullAudioEnabled
                  ? `Play the complete correct sentence for question ${q.id}.`
                  : undefined
              }
              className={`unit2-audio-control flex flex-col gap-3 rounded-[14px] p-2 ${fullAudioEnabled ? "unit2-completed-audio" : ""}`}
              onClick={() => {
                if (fullAudioEnabled) {
                  playAudio(`full-${q.id}`, q.fullAudio);
                }
              }}
              onKeyDown={(event) => {
                if (
                  fullAudioEnabled &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  playAudio(`full-${q.id}`, q.fullAudio);
                }
              }}
            >
              <Unit2PlayingAudioIcon
                active={activeAudioKey === `full-${q.id}`}
              />
              <div className="flex gap-3 items-start">
                <span className="font-bold text-[20px]">{q.id}</span>

                <img
                  src={q.img}
                  alt={
                    q.id === 1
                      ? "A student walking beside a subway train"
                      : q.id === 2
                        ? "A student riding a bicycle to school"
                        : q.id === 3
                          ? "A student walking toward school"
                          : "Students getting off a school bus"
                  }
                  className="object-contain"
                  style={{ height: "130px" }}
                />
              </div>

              <div className="flex items-center gap-5 mt-2">
                <span
                  role="button"
                  tabIndex={0}
                  className="unit2-audio-control unit2-interactive text-[20px]"
                  onClick={(event) => {
                    event.stopPropagation();
                    playAudio(`i-${q.id}`, iAudio);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      playAudio(`i-${q.id}`, iAudio);
                    }
                  }}
                >
                  I
                  <Unit2PlayingAudioIcon
                    active={activeAudioKey === `i-${q.id}`}
                  />
                </span>
                <div className="flex flex-col gap-2">
                  {q.options.map((option) => (
                    <OptionItem
                      key={option}
                      option={option}
                      isSelected={selected[q.id] === option}
                      isCorrect={option === q.correct}
                      showResult={checkedIds.includes(q.id)}
                      locked={showAnswer || correctIds.includes(q.id)}
                      onClick={() => handleSelect(q.id, option)}
                      onPlayAudio={() =>
                        playAudio(
                          `option-${q.id}-${option}`,
                          OPTION_AUDIO[option],
                        )
                      }
                      activeAudio={
                        activeAudioKey === `option-${q.id}-${option}`
                      }
                    />
                  ))}
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  className="unit2-audio-control unit2-interactive text-[20px]"
                  onClick={(event) => {
                    event.stopPropagation();
                    playAudio(`school-${q.id}`, schoolAudio);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      playAudio(`school-${q.id}`, schoolAudio);
                    }
                  }}
                >
                  to school.
                  <Unit2PlayingAudioIcon
                    active={activeAudioKey === `school-${q.id}`}
                  />
                </span>
              </div>
            </div>
            );
          })}
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit2_Page6_Q1;
