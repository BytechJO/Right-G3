import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit6_Page5_Q1.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 50/Ex A 6.svg";
import WrongMark from "../../WrongMark";

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
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const chooseOption = (i, value) => {
    if (locked) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];

    newAnswers[i] = items[i].word.replace("__", value).replace("_", value);
    setAnswers(newAnswers);
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));

    const newAnswers = items.map((i) => {
      return i.word.replace("__", i.correct).replace("_", i.correct);
    });

    setAnswers(newAnswers);
    setLocked(true);
  };
  const checkAnswers = () => {
    if (locked) return;
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

    setLocked(true);
    setShowResult(true);
  };
  const isWrong = (index) => {
    return showResult && selected[index] !== items[index].correct;
  };
  return (
    <div className="main-container-component">
      <div className="div-forall"  style={{gap:"5px"}}>
        <h5 className="header-title-page8 mb-5">
          <span className="ex-A mr-4">A</span>
          Look, circle, and write.
        </h5>
        <div className="flex w-full">
          <div className="grid grid-cols-3 gap-y-25 w-full gap-x-[70px] mt-10 justify-center">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col justify-between items-center h-35">
                <div className="flex items-start gap-2.5">
                  <span className="text-[20px] font-bold text-[#2a4e7c]">
                    {i + 1}
                  </span>

                  <img
                    src={item.img}
                    alt=""
                    style={{
                      width: "100px",
                      height: "auto",
                    }}
                  />

                  {/* OPTIONS */}
                  <div className="flex flex-col gap-1.5 text-[18px]">
                    {item.options.map((opt, idx) => (
                      <span
                        key={idx}
                        onClick={() => chooseOption(i, opt)}
                        className={`cursor-pointer px-2 py-0.5 ${
                          selected[i] === opt
                            ? "border-2 border-[#F79530] rounded-full"
                            : "hover:bg-gray-100 rounded-full"
                        }`}
                      >
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative w-40 mt-2">
                  {/* ❌ */}
                  {isWrong(i) && (
                    <span className="absolute top-3 right-13">
                     <WrongMark/>
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
