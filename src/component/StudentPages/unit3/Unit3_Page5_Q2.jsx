/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import "./Unit3_Page5_Q2.css";
import "./unit3Interactions.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3PlayingAudioIcon from "./Unit3PlayingAudioIcon";
import useUnit3Audio from "./useUnit3Audio";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex B 6.svg";
import thereAreAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_001_There_are.mp3";
import theresAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_002_There's.mp3";
import orangeJuiceAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_003_orange_juice.mp3";
import bananasAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_004_bananas_in_the_fridge.mp3";
import thereIsAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_005_There_is.mp3";
import waterAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_006_water_in_the_glass.mp3";
import cakeAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_007_chocolate_cake.mp3";
import sugarAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_008_sugar.mp3";
import applesAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise B/Item_009_apples_in_the_bowl.mp3";

const data = [
  {
    img: img1,
    alt: "A bunch of bananas",
    before: "There are",
    beforeAudio: thereAreAudio,
    after: "bananas in the fridge.",
    afterAudio: bananasAudio,
    answer: "a few",
  },
  {
    img: img2,
    alt: "A glass of orange juice",
    before: "There’s",
    beforeAudio: theresAudio,
    after: "orange juice.",
    afterAudio: orangeJuiceAudio,
    answer: "a little",
  },
  {
    img: img3,
    alt: "A glass with a small amount of water",
    before: "There is",
    beforeAudio: thereIsAudio,
    after: "water in the glass.",
    afterAudio: waterAudio,
    answer: "a little",
  },
  {
    img: img4,
    alt: "A slice of chocolate cake",
    before: "There is",
    beforeAudio: thereIsAudio,
    after: "chocolate cake.",
    afterAudio: cakeAudio,
    answer: "a little",
  },
  {
    img: img5,
    alt: "A spoonful of sugar",
    before: "There’s",
    beforeAudio: theresAudio,
    after: "sugar.",
    afterAudio: sugarAudio,
    answer: "a little",
  },
  {
    img: img6,
    alt: "A bowl with a few apples",
    before: "There are",
    beforeAudio: thereAreAudio,
    after: "apples in the bowl.",
    afterAudio: applesAudio,
    answer: "a few",
  },
];

const options = ["a little", "a few"];

function AudioText({ children, audioKey, audio, activeAudioKey, playAudio }) {
  return (
    <button
      type="button"
      className="unit3-audio-control unit3-interactive cursor-pointer bg-transparent"
      onClick={() => playAudio(audioKey, audio)}
      aria-label={`Play: ${children}`}
    >
      {children}
      <Unit3PlayingAudioIcon active={activeAudioKey === audioKey} />
    </button>
  );
}

export default function Unit3_Page5_Q2() {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit3Audio();

  const handleSelect = (index, value) => {
    if (showAnswer || correctIds.includes(index)) return;
    setInputs((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
    setCheckedIds((previous) => previous.filter((id) => id !== index));
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === data.length) return;
    if (inputs.some((value) => value === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please fill in all the answers before checking.",
      );
      return;
    }

    const nextCorrectIds = data.flatMap((item, index) =>
      inputs[index] === item.answer ? [index] : [],
    );
    const correct = nextCorrectIds.length;
    const total = data.length;
    setCorrectIds(nextCorrectIds);
    setCheckedIds(data.map((_, index) => index));

    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    else if (correct === 0)
      ValidationAlert.error(`Score: ${correct} / ${total}`);
    else ValidationAlert.warning(`Score: ${correct} / ${total}`);
  };

  const handleShowAnswer = () => {
    setInputs(data.map((item) => item.answer));
    setCheckedIds(data.map((_, index) => index));
    setCorrectIds(data.map((_, index) => index));
    setShowAnswer(true);
    stopAudio();
  };

  const handleReset = () => {
    setInputs(Array(data.length).fill(""));
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
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "60px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title="Look, read, and write."
          subTitle="Use the picture and quantity clue, then complete each sentence with the correct form."
        />

        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px 60px",
          }}
        >
          {data.map((item, index) => {
            const isWrong =
              checkedIds.includes(index) && inputs[index] !== item.answer;
            return (
              <div
                key={item.alt}
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "5px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      {index + 1}
                    </span>
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  {isWrong && (
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "-6px",
                        width: "22px",
                        height: "22px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        border: "2px solid white",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  <AudioText
                    audioKey={`before-${index}`}
                    audio={item.beforeAudio}
                    activeAudioKey={activeAudioKey}
                    playAudio={playAudio}
                  >
                    {item.before}
                  </AudioText>

                  <select
                    value={inputs[index]}
                    aria-label={`Quantity phrase for item ${index + 1}`}
                    onChange={(event) =>
                      handleSelect(index, event.target.value)
                    }
                    disabled={showAnswer || correctIds.includes(index)}
                    style={{
                      minWidth: "120px",
                      border: "none",
                      borderBottom: isWrong
                        ? "2px solid red"
                        : "1px solid #000",
                      background: "transparent",
                      fontSize: "18px",
                      textAlign: "center",
                      cursor:
                        showAnswer || correctIds.includes(index)
                          ? "default"
                          : "pointer",
                    }}
                  >
                    <option value="">Select</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <AudioText
                    audioKey={`after-${index}`}
                    audio={item.afterAudio}
                    activeAudioKey={activeAudioKey}
                    playAudio={playAudio}
                  >
                    {item.after}
                  </AudioText>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleReset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
}
