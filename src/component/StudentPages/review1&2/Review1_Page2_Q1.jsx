import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/test6.png";
import img2 from "../../../assets/imgs/test6.png";
import img3 from "../../../assets/imgs/test6.png";
import img4 from "../../../assets/imgs/test6.png";
import Button from "../../Button";

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
      correct: "long i",
    },
    {
      img: img4,
      options: ["long e", "short e"],
      correct: "short e",
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
    newAnswers[i] = items[i].start + value + items[i].end;
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
    setAnswers(items.map((i) => i.start + i.correct + i.end));
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

    const msg = `Score: ${score} / ${total}`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
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
      <h5 className="header-title-page8">
        <span style={{ marginRight: "20px" }}>C</span>
        Look and choose.
      </h5>

      <div className="grid grid-cols-2 gap-y-16 gap-x-20 mt-10">
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
              alt=""
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
                    onClick={() => chooseOption(i, opt)}
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
                              ? "2px solid green"
                              : "2px solid red"
                            : "2px solid red"
                          : "2px solid transparent",

                      color:
                        showResult && selected[i] === opt
                          ? opt === item.correct
                            ? "green"
                            : "red"
                          : "black",
                    }}
                  >
                    {opt}
                  </span>

                  {showResult &&
                    selected[i] === opt &&
                    opt !== item.correct && (
                      <div
                        style={{
                          position: "absolute",
                          right: "-25px",
                          top: "50%",
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
  );
};

export default Review1_Page2_Q1;
