import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3PlayingAudioIcon from "./Unit3PlayingAudioIcon";
import useUnit3Audio from "./useUnit3Audio";
import "./unit3Interactions.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 9.svg";
import chickenAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_001_icken.mp3";
import peachAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_002_pea.mp3";
import fishAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_003_fi.mp3";
import watchAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_004_wa.mp3";
import shellAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_005_ell.mp3";
import matchAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_006_ma.mp3";
import kitchenAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_007_ki..._en.mp3";
import beachAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_008_bea.mp3";
import shopAudio from "../../../assets/audio/ClassBook/Unit 3/Page 26 - Exercise A/Item_009_op.mp3";

const OPTIONS = ["ch", "sh", "tch"];

const data = [
  {
    img: img1,
    alt: "A chicken",
    pattern: "icken",
    answer: "ch",
    position: "start",
    audio: chickenAudio,
  },
  {
    img: img2,
    alt: "A peach",
    pattern: "pea",
    answer: "ch",
    position: "end",
    audio: peachAudio,
  },
  {
    img: img3,
    alt: "A fish",
    pattern: "fi",
    answer: "sh",
    position: "end",
    audio: fishAudio,
  },
  {
    img: img4,
    alt: "A wristwatch",
    pattern: "wa",
    answer: "tch",
    position: "end",
    audio: watchAudio,
  },
  {
    img: img5,
    alt: "A seashell",
    pattern: "ell",
    answer: "sh",
    position: "start",
    audio: shellAudio,
  },
  {
    img: img6,
    alt: "A matchstick",
    pattern: "ma",
    answer: "tch",
    position: "end",
    audio: matchAudio,
  },
  {
    img: img7,
    alt: "A kitchen",
    pattern: "kitchen",
    answer: "tch",
    position: "middle",
    audio: kitchenAudio,
  },
  {
    img: img8,
    alt: "A beach",
    pattern: "bea",
    answer: "ch",
    position: "end",
    audio: beachAudio,
  },
  {
    img: img9,
    alt: "A shop",
    pattern: "op",
    answer: "sh",
    position: "start",
    audio: shopAudio,
  },
];

const Unit3_Page5_Q1 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit3Audio();

  const handleChange = (index, value) => {
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
    if (inputs.some((value) => !value)) {
      ValidationAlert.info("Please fill all answers");
      return;
    }

    const nextCorrectIds = data.flatMap((item, index) =>
      inputs[index] === item.answer ? [index] : [],
    );
    const score = nextCorrectIds.length;
    const total = data.length;
    setCorrectIds(nextCorrectIds);
    setCheckedIds(data.map((_, index) => index));

    if (score === total) ValidationAlert.success(`Score: ${score}/${total}`);
    else if (score === 0) ValidationAlert.error(`Score: ${score}/${total}`);
    else ValidationAlert.warning(`Score: ${score}/${total}`);
  };

  const showCorrectAnswers = () => {
    setInputs(data.map((item) => item.answer));
    setCheckedIds(data.map((_, index) => index));
    setCorrectIds(data.map((_, index) => index));
    setShowAnswer(true);
    stopAudio();
  };

  const reset = () => {
    setInputs(Array(data.length).fill(""));
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
    stopAudio();
  };

  const renderWord = (item, index) => {
    const wordPart = (text) => (
      <span
        role="button"
        tabIndex={0}
        onClick={() => playAudio(`item-${index}`, item.audio)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            playAudio(`item-${index}`, item.audio);
          }
        }}
        aria-label={`Play ${item.alt} audio`}
        className="unit3-interactive"
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "pointer",
        }}
      >
        {text}

        <span
          style={{
            position: "absolute",
            top: "-12px",
            right: "-10px",
            pointerEvents: "none",
          }}
        >
          <Unit3PlayingAudioIcon active={activeAudioKey === `item-${index}`} />
        </span>
      </span>
    );

    const select = (
      <select
        value={inputs[index]}
        aria-label={`Missing letters for ${item.alt.toLowerCase()}`}
        className={`${
          checkedIds.includes(index) && inputs[index] !== item.answer
            ? "border-b-2 border-red-500"
            : "border-b-1"
        } outline-none w-[70px]`}
        onChange={(event) => handleChange(index, event.target.value)}
        disabled={showAnswer || correctIds.includes(index)}
      >
        <option value="">...</option>
        {OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );

    if (item.position === "start")
      return (
        <>
          {select}
          {wordPart(item.pattern)}
        </>
      );

    if (item.position === "end")
      return (
        <>
          {wordPart(item.pattern)}
          {select}
        </>
      );

    return (
      <>
        {wordPart("ki")}
        {select}
        {wordPart("en")}XR
      </>
    );
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
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Look and write <span style={{ color: "#2e3192" }}> ch , sh </span>{" "}
              or <span style={{ color: "#2e3192" }}>tch</span>.
            </>
          }
          subTitle="Say each picture name, then write ch, sh, or tch to complete the word."
        />

        <div className="unscramble-row-wb-unit1-p8-q1">
          {data.map((item, index) => {
            const isWrong =
              checkedIds.includes(index) && inputs[index] !== item.answer;
            return (
              <div className="unscramble-box" key={item.alt}>
                <div className="input-row-wb-unit1-p8-q1">
                  <div className="flex gap-2">
                    <span className="text-[20px] font-bold">{index + 1}</span>
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div>

                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>
                      {renderWord(item, index)}
                    </span>
                    {isWrong && <WrongMark />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            onClick={showCorrectAnswers}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit3_Page5_Q1;
