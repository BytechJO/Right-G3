import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex F 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex F 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex F 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Asset 83.svg";

import blue from "../../../assets/audio/ClassBook/Unit 2/P 17/CD13.Pg17_Instruction1_Adult Lady.mp3";

import Button from "../../Button";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
const Review4_Page2_Q3 = () => {
  const items = [
    { img: img1, correct: "no" },
    { img: img2, correct: "yes" },
    { img: img3, correct: "yes" },
    { img: img4, correct: "yes" },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [locked, setLocked] = useState(false);
  const captions = [
    {
      start: 0,
      end: 4.23,
      text: "Page 8. Right Activities. Exercise A, number 1. ",
    },
    {
      start: 4.25,
      end: 8.28,
      text: "Listen and write the missing letters. Number the pictures.  ",
    },
    { start: 8.3, end: 11.05, text: "1-tiger." },
    { start: 11.07, end: 13.12, text: "2-taxi." },
    { start: 13.14, end: 15.14, text: "3-duck." },
    { start: 15.16, end: 17.13, text: "4-deer." },
  ];
  const choose = (i, value) => {
    if (locked) return;

    const updated = [...selected];
    updated[i] = value;
    setSelected(updated);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) score++;
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
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setLocked(true);
  };

  const reset = () => {
    setSelected(Array(items.length).fill(""));
    setLocked(false);
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
      <div className="div-forall">
        <h5 className="header-title-page8">
          <span style={{ marginRight: "20px" }}>E</span>
          Does the word have a{" "}
          <span style={{ color: "#2e3192" }}>voiceless th</span> sound? Listen
          and write<span style={{ color: "#D52328" }}> ✓ </span>or
          <span style={{ color: "#D52328" }}> ✗</span>
        </h5>
        <QuestionAudioPlayer src={blue} captions={captions} stopAtSecond={10} />

        {/* GRID */}
        <div className="grid grid-cols-4 gap-8 mt-10 justify-items-center">
          {items.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* الرقم */}
              <span className="absolute -top-3 -left-3 text-lg font-bold">
                {i + 1}
              </span>

              {/* الصورة */}
              <img
                src={item.img}
                style={{
                  width: "15vw",
                  height: "18vh",
                  objectFit: "contain",
                  border: "3px solid #F79530", // 🔥 برتقالي
                  borderRadius: "12px",
                  padding: "4px",
                }}
              />

              <div className="flex gap-3 mt-3 items-center">
                <div
                  className="flex items-center gap-1"
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() => choose(i, "yes")}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      cursor: "pointer",

                      background: selected[i] === "yes" ? "#1C398E" : "#fff", // 🔵 دايماً
                      color: selected[i] === "yes" ? "#fff" : "#000",

                      border: "2px solid #F79530",
                    }}
                  >
                    ✓
                  </button>

                  {locked &&
                    selected[i] === "yes" &&
                    item.correct !== "yes" && (
                      <div
                        style={{
                          position: "absolute",
                          left: "-35px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 10,
                        }}
                      >
                        <WrongMark />
                      </div>
                    )}
                </div>

                {/* NO */}
                <div
                  className="flex items-center gap-1"
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() => choose(i, "no")}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      cursor: "pointer",

                      background: selected[i] === "no" ? "#1C398E" : "#fff",
                      color: selected[i] === "no" ? "#fff" : "#000",

                      border: "2px solid #F79530",
                    }}
                  >
                    ✗
                  </button>
                  {locked && selected[i] === "no" && item.correct !== "no" && (
                    <div
                      style={{
                        position: "absolute",
                        left: "35px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                      }}
                    >
                      <WrongMark />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* buttons */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review4_Page2_Q3;
