import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import "./Unit6_Page5_Q1.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 4.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 50/unit6-pg50-EXB.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import glAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise B/Item_001_gl.mp3";
import clAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise B/Item_002_cl.mp3";
import flAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise B/Item_003_fl.mp3";
import blAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise B/Item_004_bl.mp3";
import plAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise B/Item_005_pl.mp3";
import slAudio from "../../../assets/audio/ClassBook/Unit 6/Page 50 - Exercise B/Item_006_sl.mp3";

const OPTION_AUDIO = { gl: glAudio, cl: clAudio, fl: flAudio, bl: blAudio, pl: plAudio, sl: slAudio };
const IMAGE_ALT = ["A glass", "A blender", "A classroom", "A floating sailboat"];
const Unit6_Page5_Q2 = () => {
  const items = [
    {
      img: img1,
      options: ["gl", "fl", "pl"],
      correct: "gl",
    },
    {
      img: img2,
      options: ["cl", "bl", "sl"],
      correct: "bl",
    },
    {
      img: img3,
      options: ["cl", "gl", "fl"],
      correct: "cl",
    },
    {
      img: img4,
      options: ["fl", "sl", "gl"],
      correct: "fl",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [forceStop, setForceStop] = useState(0);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const playItemAudio = (key, source) => {
    setForceStop((value) => value + 1);
    playAudio(key, source);
  };
  const captions = [
    {
      start: 0.14,
      end: 16.02,
      text: "Page 50, write activities. Exercise B. Look, listen, and choose. One, glass. Two, blender. Three, class. Four, float.",
    },
  ];
  const chooseOption = (i, value) => {
    if (lockedIds.includes(i) || showAnswer) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    setForceStop((value) => value + 1);
    stopAudio();
  };
  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setLockedIds(items.map((_, index) => index));
    setWrongIds([]);
    setShowAnswer(true);
    setForceStop((value) => value + 1);
    stopAudio();
  };
  const checkAnswers = () => {
    if (lockedIds.length === items.length || showAnswer) return;

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
        <span style="color:${color};font-weight:bold">
        Score: ${score} / ${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLockedIds(items.flatMap((item, index) => selected[index] === item.correct ? [index] : []));
    setWrongIds(items.flatMap((item, index) => selected[index] !== item.correct ? [index] : []));
  };
  const isWrong = (index) => {
    return wrongIds.includes(index);
  };
  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "5px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title="Look, listen, and choose."
          subTitle="Listen to the beginning blend, then choose the letters that match the sound you hear."
        />
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={6.9}
          pageId="unit6-page5-q2"
          forceStop={forceStop}
          onInteract={stopAudio}
        />
        <div className="flex w-full">
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-y-10 gap-x-[200px] mt-10">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col justify-between h-40">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[20px] font-bold text-[#2a4e7c]">
                      {i + 1}
                    </span>

                    <img
                      src={item.img}
                      alt={IMAGE_ALT[i]}
                      style={{
                        width: "110px",
                        height: "120px",
                      }}
                    />

                    {/* OPTIONS */}
                    <div className="flex flex-col gap-1.5 text-[18px] ml-4">
                      {/* ❌ */}

                      {item.options.map((opt) => (
                        <div className="relative" key={opt}>
                          <span
                            role="button"
                            tabIndex={lockedIds.includes(i) || showAnswer ? -1 : 0}
                            aria-pressed={selected[i] === opt}
                            onClick={() => {
                              playItemAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                              chooseOption(i, opt);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                playItemAudio(`option-${i}-${opt}`, OPTION_AUDIO[opt]);
                                chooseOption(i, opt);
                              }
                            }}
                            className={`unit4-audio-control unit4-interactive cursor-pointer px-2 py-0.5 rounded-full ${
                              selected[i] === opt
                                ? isWrong(i)
                                  ? "border-2 border-red-500"
                                  : "border-2 border-[#F79530]"
                                : lockedIds.includes(i) || showAnswer
                                  ? ""
                                  : "hover:bg-gray-100"
                            }`}
                          >
                            <Unit4PlayingAudioIcon active={activeAudioKey === `option-${i}-${opt}`} />
                            {opt}
                          </span>
                          {isWrong(i) && selected[i] === opt && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                              ✕
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

export default Unit6_Page5_Q2;
