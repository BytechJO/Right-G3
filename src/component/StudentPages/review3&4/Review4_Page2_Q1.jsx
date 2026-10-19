import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex D 4.svg";
import Button from "../../Button";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import thatAudio from "../../../assets/audio/ClassBook/Unit 4/Page 37 - Exercise D/Item_001_that.mp3";
import bathAudio from "../../../assets/audio/ClassBook/Unit 4/Page 37 - Exercise D/Item_002_bath.mp3";
import thisAudio from "../../../assets/audio/ClassBook/Unit 4/Page 37 - Exercise D/Item_003_this.mp3";
import thursdayAudio from "../../../assets/audio/ClassBook/Unit 4/Page 37 - Exercise D/Item_004_Thursday.mp3";
import motherAudio from "../../../assets/audio/ClassBook/Unit 4/Page 37 - Exercise D/Item_005_mother.mp3";
import thirstyAudio from "../../../assets/audio/ClassBook/Unit 4/Page 37 - Exercise D/Item_006_thirsty.mp3";
const WORD_AUDIO = {
  that: thatAudio,
  bath: bathAudio,
  this: thisAudio,
  Thursday: thursdayAudio,
  mother: motherAudio,
  thirsty: thirstyAudio,
};

const Review4_Page2_Q1 = () => {
  const items = [
    {
      img: img1,
      options: ["that", "bath"],
      correct: "bath",
    },
    {
      img: img2,
      options: ["this", "Thursday"],
      correct: "Thursday",
    },
    {
      img: img3,
      options: ["mother", "Thursday"],
      correct: "mother",
    },
    {
      img: img4,
      options: ["bath", "thirsty"],
      correct: "thirsty",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const chooseOption = (i, value) => {
    playAudio(`option-${i}-${value}`, WORD_AUDIO[value]);
    if (lockedIds.includes(i)) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];
    newAnswers[i] = items[i].start + value + items[i].end;
    setAnswers(newAnswers);
    setWrongIds((prev) => prev.filter((id) => id !== i));
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLockedIds([]);
    setShowResult(false);
    setWrongIds([]);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setLockedIds(items.map((_, i) => i));
    setWrongIds([]);
    setShowResult(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (lockedIds.length === items.length) return;

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

    setLockedIds(
      items
        .map((item, i) => (selected[i] === item.correct ? i : null))
        .filter((id) => id !== null),
    );
    setWrongIds(
      items
        .map((item, i) => (selected[i] !== item.correct ? i : null))
        .filter((id) => id !== null),
    );
    setShowResult(true); // 🔥 مهم
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
      <div className="div-forall" style={{ gap: "50px" }}>
        <ExerciseHeaderReview
          sectionLetter="D"
          title="Look, read, and choose."
          subTitle="Read each word aloud and use the picture clue to choose the correct th word."
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
                  fontSize: "20px",
                }}
              >
                {i + 1}
              </span>

              <img
                src={item.img}
                alt={
                  [
                    "A bathtub",
                    "A calendar showing Thursday",
                    "A mother holding her child",
                    "A thirsty girl drinking from a cup",
                  ][i]
                }
                style={{
                  width: "15vw",
                  height: "20vh",
                  // border: "2px solid orange",
                  // borderRadius: 5,
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
                      onClick={() => chooseOption(i, opt)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          chooseOption(i, opt);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-disabled={lockedIds.includes(i)}
                      aria-pressed={selected[i] === opt}
                      className="unit4-audio-control unit4-interactive"
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",

                        border:
                          selected[i] === opt
                            ? showResult
                              ? opt === item.correct
                                ? "1px solid #F79530"
                                : "2px solid red"
                              : "1px solid #F79530"
                            : "1px solid transparent",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `option-${i}-${opt}`}
                      />
                      {opt}
                    </span>

                    {wrongIds.includes(i) &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <div
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "10%",
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

export default Review4_Page2_Q1;
