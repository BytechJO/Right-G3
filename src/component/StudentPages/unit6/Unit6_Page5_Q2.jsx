import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit6_Page5_Q1.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex B 4.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 50/CD39.Pg50_Instruction_Adult Lady.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
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
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const captions = [
    {
      start: 0.5,
      end: 8.34,
      text: "Page 62, Write Activities. Exercise A, number 1. Listen, circle, and write.",
    },
    { start: 9.639, end: 10.859, text: "1, window." },
    { start: 12.139, end: 13.279, text: "2, coat." },
    { start: 14.559, end: 15.799, text: "3, note." },
    { start: 17.219, end: 18.379, text: "5, boat" },
  ];
 const chooseOption = (i, value) => {
  if (locked) return;

  const newSelected = [...selected];
  newSelected[i] = value;
  setSelected(newSelected);
};

 const resetAll = () => {
  setSelected(Array(items.length).fill(""));
  setLocked(false);
  setShowResult(false);
};
  const showAnswers = () => {
  setSelected(items.map((i) => i.correct));
  setLocked(true);
};
  const checkAnswers = () => {
    if (locked) return;

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

    setLocked(true);
    setShowResult(true);
  };
  const isWrong = (index) => {
    return showResult && selected[index] !== items[index].correct;
  };
  return (
    <div className="main-container-component">
      <div className="div-forall">
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A mr-4">B</span>
          Look, listen, and choose
        </h5>
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={8.43}
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
                      alt=""
                      style={{
                        width: "80px",
                        height: "auto",
                      }}
                    />

                    {/* OPTIONS */}
                    <div className="flex flex-col gap-1.5 text-[18px] ml-4">
                      <div className="relative  mt-2">
                        {/* ❌ */}
                        {isWrong(i) && (
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                            ✕
                          </span>
                        )}
                      </div>
                      {item.options.map((opt, idx) => (
                        <span
                          key={idx}
                          onClick={() => chooseOption(i, opt)}
                          className={`cursor-pointer px-2 py-0.5 rounded-full ${
                            selected[i] === opt
                              ? isWrong(i)
                                ? "border-2 border-red-500"
                                : "border-2 border-[#1C398E]"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {opt}
                        </span>
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
