import React, { useState } from "react";
import "./Review8_Page2_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 73/Ex D 3.svg";
import WrongMark from "../../WrongMark";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import anAudio from "../../../assets/audio/ClassBook/Unit 8/Page 73 - Exercise D/Item_001_an.mp3";
import ugAudio from "../../../assets/audio/ClassBook/Unit 8/Page 73 - Exercise D/Item_002_ug.mp3";
import igAudio from "../../../assets/audio/ClassBook/Unit 8/Page 73 - Exercise D/Item_003_ig.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const data = [
  { img: img1, alt: "A fan", pattern: "an", answer: "f", audio: anAudio },
  { img: img2, alt: "A rug", pattern: "ug", answer: "r", audio: ugAudio },
  {
    img: img3,
    alt: "Children digging",
    pattern: "ig",
    answer: "d",
    audio: igAudio,
  },
];

const options = ["d", "f", "r"];

const Review8_Page2_Q2 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [lockedIds, setLockedIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (index, value) => {
    if (showAnswer || lockedIds.includes(index)) return;

    const updated = [...inputs];
    updated[index] = value;

    setInputs(updated);
    setWrongInputs((previous) =>
      previous.map((wrong, itemIndex) => (itemIndex === index ? false : wrong)),
    );
  };

  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === data.length) return;

    if (inputs.some((val) => val.trim() === "")) {
      ValidationAlert.info(
        "Oops!",
        "Please fill in all the answers before checking.",
      );
      return;
    }

    let correctCount = 0;
    const wrongFlags = [];

    data.forEach((item, index) => {
      if (inputs[index].toLowerCase() === item.answer) {
        correctCount++;
        wrongFlags[index] = false;
      } else {
        wrongFlags[index] = true;
      }
    });

    setWrongInputs(wrongFlags);
    setLockedIds(
      data.flatMap((item, index) =>
        inputs[index].toLowerCase() === item.answer ? [index] : [],
      ),
    );

    const total = data.length;

    const color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const scoreMessage = `
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${correctCount} / ${total}
        </span>
      </div>
    `;

    if (correctCount === total) ValidationAlert.success(scoreMessage);
    else if (correctCount === 0) ValidationAlert.error(scoreMessage);
    else ValidationAlert.warning(scoreMessage);
  };

  const handleShowAnswer = () => {
    const correct = data.map((item) => item.answer);

    setInputs(correct);
    setWrongInputs(Array(data.length).fill(false));
    setLockedIds(data.map((_, index) => index));
    setShowAnswer(true);
    stopAudio();
  };

  const reset = () => {
    setInputs(Array(data.length).fill(""));
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(false);
    setLockedIds([]);
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
      <div
        className="div-forall"
        style={{
          gap: "95px",
        }}
      >
        <ExerciseHeaderReview
          sectionLetter="D"
          title={
            <>
              Look and write <span style={{ color: "#2e3192" }}>d</span>,{" "}
              <span style={{ color: "#2e3192" }}>f</span>, or{" "}
              <span style={{ color: "#2e3192" }}>r</span> for each picture.
            </>
          }
          subTitle="Say each picture name, then write d, f, or r for its beginning sound."
        />

        <div className="flex justify-center gap-25 mt-7 w-full">
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-10 relative"
              >
                {/* الصورة */}
                <div className=" flex items-start ">
                  {/* الرقم */}
                  <span className="text-[20px] font-bold">{index + 1}</span>
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{ width: "170px", height: "150px" }}
                  />
                </div>

                {/* الكلمة */}
                <div className="relative flex items-center gap-2 text-xl">
                  <select
                    value={inputs[index]}
                    disabled={showAnswer || lockedIds.includes(index)}
                    aria-label={`Beginning letter for ${item.alt}`}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className={`border-b outline-none bg-transparent text-center font-bold text-xl min-w-[70px]
                    ${wrongInputs[index] ? "border-red-500" : "border-black"}
                    ${inputs[index] ? "text-black" : "text-black"}`}
                  >
                    <option value=""> </option>

                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* Wrong mark */}
                  {wrongInputs[index] && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <WrongMark />
                    </div>
                  )}
                  <span
                    role="button"
                    tabIndex={0}
                    className="unit4-audio-control unit4-interactive"
                    onClick={() => playAudio(`pattern-${index}`, item.audio)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`pattern-${index}`, item.audio);
                      }
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `pattern-${index}`}
                    />
                    {item.pattern}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="action-buttons-container">
        <button onClick={reset} className="try-again-button">
          Start Again ↻
        </button>

        <button
          onClick={handleShowAnswer}
          className="show-answer-btn swal-continue"
        >
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Review8_Page2_Q2;
