import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex C 4.svg";
import Button from "../../Button";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import "../unit2/unit2Interactions.css";
import longAAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_001_long_a.mp3";
import shortAAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_002_short_a.mp3";
import longOAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_003_long_o.mp3";
import shortOAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_004_short_o.mp3";
import longIAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_005_long_i.mp3";
import shortIAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_006_short_i.mp3";
import longEAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_007_long_e.mp3";
import shortEAudio from "../../../assets/audio/ClassBook/Unit 2/Page 17 - Exercise C/Item_008_short_e.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const OPTION_AUDIO = {
  "long a": longAAudio,
  "short a": shortAAudio,
  "long o": longOAudio,
  "short o": shortOAudio,
  "long i": longIAudio,
  "short i": shortIAudio,
  "long e": longEAudio,
  "short e": shortEAudio,
};
const IMAGE_ALTS = ["A birthday cake", "A house", "A fish", "A bee"];

const Review1_Page2_Q1 = () => {
  const items = [
    {
      img: img1,
      options: ["long a", "short a"],
      correct: "long a",
    },
    {
      img: img2,
      options: ["long o", "short o"],
      correct: "long o",
    },
    {
      img: img3,
      options: ["long i", "short i"],
      correct: "short i",
    },
    {
      img: img4,
      options: ["long e", "short e"],
      correct: "long e",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const chooseOption = (i, value) => {
    if (showAnswer || correctIds.includes(i)) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];
    newAnswers[i] = items[i].start + value + items[i].end;
    setAnswers(newAnswers);
    setCheckedIds((previous) => previous.filter((id) => id !== i));
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setCheckedIds(items.map((_, index) => index));
    setCorrectIds(items.map((_, index) => index));
    setShowAnswer(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === items.length) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) {
        score++;
      }
    });
    setCorrectIds(
      items.flatMap((item, index) =>
        selected[index] === item.correct ? [index] : [],
      ),
    );
    setCheckedIds(items.map((_, index) => index));

    const total = items.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
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
          sectionLetter="C"
          title="Look and choose."
          subTitle="Say each pair aloud, compare the vowel sounds, then tap the correct sound label."
        />

        <div className="grid grid-cols-2 gap-y-16 gap-x-20 mt-10 w-full">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-15px",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {i + 1}
              </span>

              <img
                src={item.img}
                alt={IMAGE_ALTS[i]}
                style={{
                  width: "15vw",
                  height: "20vh",
                }}
              />

              <div className="flex flex-col gap-5 text-[20px]">
                {item.options.map((opt, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <span
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected[i] === opt}
                      aria-disabled={showAnswer || correctIds.includes(i)}
                      className="unit2-audio-control unit2-interactive"
                      onClick={() => {
                        playAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                        chooseOption(i, opt);
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        playAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                        chooseOption(i, opt);
                      }}
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",

                        border:
                          selected[i] === opt
                            ? checkedIds.includes(i)
                              ? opt === item.correct
                                ? "1px solid #f39b42"
                                : "2px solid red"
                              : "1px solid #f39b42"
                            : "1px solid transparent",
                      }}
                    >
                      {opt}
                      <Unit2PlayingAudioIcon
                        active={activeAudioKey === `option-${i}-${opt}`}
                      />
                    </span>

                    {checkedIds.includes(i) &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <div
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "5%",
                            transform: "translateY(-50%)",
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
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review1_Page2_Q1;
