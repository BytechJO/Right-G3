import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import "./Unit6_Page5_Q1.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 6.svg";
import WrongMark from "../../WrongMark";
import slAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/Item_001_sl.mp3";
import plAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/Item_002_pl.mp3";
import clAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/Item_003_cl.mp3";
import flAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/Item_004_fl.mp3";
import full1Audio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/full1.mp3";
import full2Audio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/full2.mp3";
import full3Audio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/full3.mp3";
import full4Audio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/full4.mp3";
import full5Audio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/full5.mp3";
import full6Audio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise A/full6.mp3";

const OPTION_AUDIO = { sl: slAudio, pl: plAudio, cl: clAudio, fl: flAudio };
const FULL_AUDIO = [
  full1Audio,
  full2Audio,
  full3Audio,
  full4Audio,
  full5Audio,
  full6Audio,
];
const IMAGE_ALT = [
  "A sheep",
  "An airplane",
  "A clown",
  "A plate",
  "A playground slide",
  "A checkered flag",
];

const Unit6_Page5_Q1 = () => {
  const items = [
    {
      img: img1,
      options: ["sl", "pl"],
      correct: "sl",
      word: "__eep",
    },
    {
      img: img2,
      options: ["pl", "fl"],
      correct: "pl",
      word: "air__ane",
    },
    {
      img: img3,
      options: ["cl", "sl"],
      correct: "cl",
      word: "__own",
    },
    {
      img: img4,
      options: ["pl", "fl"],
      correct: "pl",
      word: "__ate",
    },
    {
      img: img5,
      options: ["fl", "sl"],
      correct: "sl",
      word: "__ide",
    },
    {
      img: img6,
      options: ["pl", "fl"],
      correct: "fl",
      word: "__ag",
      width: "70px",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const chooseOption = (i, value) => {
    if (lockedIds.includes(i) || showAnswer) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];

    newAnswers[i] = items[i].word.replace("__", value).replace("_", value);
    setAnswers(newAnswers);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));

    const newAnswers = items.map((i) => {
      return i.word.replace("__", i.correct).replace("_", i.correct);
    });

    setAnswers(newAnswers);
    setLockedIds(items.map((_, index) => index));
    setWrongIds([]);
    setShowAnswer(true);
    stopAudio();
  };
  const checkAnswers = () => {
    if (lockedIds.length === items.length || showAnswer) return;
    if (selected.includes("")) {
      ValidationAlert.info("Please complete all answers.");
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
        <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLockedIds(
      items.flatMap((item, index) =>
        selected[index] === item.correct ? [index] : [],
      ),
    );
    setWrongIds(
      items.flatMap((item, index) =>
        selected[index] !== item.correct ? [index] : [],
      ),
    );
  };
  const isWrong = (index) => {
    return wrongIds.includes(index);
  };
  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "5px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title="Look, circle, and write."
          subTitle="Say each picture name, circle the correct beginning blend, then write the blend in the blank."
        />
        <div className="flex w-full">
          <div className="grid grid-cols-3 gap-y-25 w-full gap-x-[70px] mt-10 justify-center">
            {items.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col justify-between items-center h-35 unit4-audio-control ${lockedIds.includes(i) ? "unit4-full-audio-enabled" : ""}`}
                role={lockedIds.includes(i) ? "button" : undefined}
                tabIndex={lockedIds.includes(i) ? 0 : -1}
                onClick={() =>
                  lockedIds.includes(i) && playAudio(`full-${i}`, FULL_AUDIO[i])
                }
                onKeyDown={(event) => {
                  if (
                    lockedIds.includes(i) &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    playAudio(`full-${i}`, FULL_AUDIO[i]);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${i}`}
                />
                <div className="flex items-start gap-2.5">
                  <span className="text-[20px] font-bold text-[#2a4e7c]">
                    {i + 1}
                  </span>

                  <img
                    src={item.img}
                    alt={IMAGE_ALT[i]}
                    style={{
                      width: item.width || "100px",
                      height: "auto",
                    }}
                  />

                  {/* OPTIONS */}
                  <div className="flex flex-col gap-1.5 text-[18px]">
                    {item.options.map((opt, idx) => (
                      <span
                        key={idx}
                        role="button"
                        tabIndex={lockedIds.includes(i) || showAnswer ? -1 : 0}
                        aria-pressed={selected[i] === opt}
                        onClick={(event) => {
                          event.stopPropagation();
                          playAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                          chooseOption(i, opt);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            event.stopPropagation();
                            playAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                            chooseOption(i, opt);
                          }
                        }}
                        className={`unit4-audio-control unit4-interactive cursor-pointer px-2 py-0.5 ${
                          selected[i] === opt
                            ? "border-2 border-[#F79530] rounded-full"
                            : "hover:bg-gray-100 rounded-full"
                        }`}
                      >
                        <Unit4PlayingAudioIcon
                          active={activeAudioKey === `option-${i}-${opt}`}
                        />
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative w-40 mt-2">
                  {/* ❌ */}
                  {isWrong(i) && (
                    <span className="absolute top-3 right-13">
                      <WrongMark />
                    </span>
                  )}

                  <div className="text-[22px] flex items-end justify-center gap-1">
                    {(() => {
                      const parts = item.word.split(/__|_/); // يقسم الكلمة

                      return (
                        <>
                          <span>{parts[0]}</span>

                          {/* الحرف بالمكان الصحيح */}
                          <span
                            className={`px-1 min-w-6 text-center border-b-2 ${
                              isWrong(i) ? "border-red-500" : "border-black"
                            } text-[#F79530]`}
                          >
                            {selected[i] || ""}
                          </span>

                          <span>{parts[1]}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit6_Page5_Q1;
