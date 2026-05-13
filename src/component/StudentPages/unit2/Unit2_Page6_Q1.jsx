import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 15/Ex D 4.svg";

const QUESTIONS = [
  {
    id: 1,
    img: imgA,
    options: ["take the subway", "take a taxi"],
    correct: "take the subway",
  },
  {
    id: 2,
    img: imgB,
    options: ["take a bus", "ride a bike"],
    correct: "ride a bike",
  },
  {
    id: 3,
    img: imgC,
    options: ["ride a bike", "walk"],
    correct: "walk",
  },
  {
    id: 4,
    img: imgD,
    options: ["take a bus", "take a train"],
    correct: "take a bus",
  },
];

const OptionItem = ({ option, isSelected, isCorrect, showResult, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer px-2 py-1 ml-5 text-[18px] inline-block"
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
    </div>
  );
};

const Unit2_Page6_Q1 = () => {
  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [locked, setLocked] = useState(false);

  const handleSelect = (qId, option) => {
    if (locked) return;

    setSelected((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const reset = () => {
    setSelected({});
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};

    QUESTIONS.forEach((q) => {
      filled[q.id] = q.correct;
    });

    setSelected(filled);
    setLocked(true);
    setShowResult(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const hasEmpty = QUESTIONS.some((q) => !selected[q.id]);

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;

    QUESTIONS.forEach((q) => {
      if (selected[q.id] === q.correct) correct++;
    });

    const total = QUESTIONS.length;

    if (correct === total) {
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    } else if (correct === 0) {
      ValidationAlert.error(`Score: ${correct} / ${total}`);
    } else {
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    }

    setShowResult(true);
    setLocked(true);
  };

  return (
    <div className="flex flex-col items-center p-[30px]">
      <div className="div-forall gap-5" style={{gap:"25px"}}>
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A mr-2.5">D</span>
          Look, read, and circle.
        </h5>

        <div className="flex flex-wrap justify-center gap-x-25 gap-y-10">
          {QUESTIONS.map((q) => (
            <div key={q.id} className="flex flex-col gap-3">
              <div className="flex gap-3 items-start">
                <span className="font-bold text-[20px]">{q.id}</span>

                <img
                  src={q.img}
                  alt=""
                  className="object-contain"
                  style={{ height: "130px" }}
                />
              </div>

              <div className="flex items-center gap-5 mt-2">
                <span className="text-[20px]"> I</span>
                <div className="flex flex-col gap-2">
                  {q.options.map((option) => (
                    <OptionItem
                      key={option}
                      option={option}
                      isSelected={selected[q.id] === option}
                      isCorrect={option === q.correct}
                      showResult={showResult}
                      onClick={() => handleSelect(q.id, option)}
                    />
                  ))}
                </div>
                <span className="text-[20px]">to school.</span>
              </div>
            </div>
          ))}
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
