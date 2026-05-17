import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 37/Ex E 4.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import blue from "../../../assets/audio/ClassBook/Unit 4/P 37/full1.mp3";

import Button from "../../Button";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";

const Review4_Page2_Q2 = () => {
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
      start: 0.239,
      end: 11.599,
      text: "Page 37, review four, exercise E. Does the word have a voiced T-H sound? Listen and write check or X.",
    },
    {
      start: 11.599,
      end: 19.739,
      text: "One, thief. Two, weather. Three, thorn. Four, father.",
    },
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
      <div className="div-forall" >
        <h5 className="header-title-page8">
          <span style={{ marginRight: "20px" }}>E</span>
          Does the word have a
          <span style={{ color: "#2e3192" }}>voiced th </span>sound? Listen and
          write<span style={{ color: "#D52328" }}> ✓ </span>or
          <span style={{ color: "#D52328" }}> ✗</span>
        </h5>
        <QuestionAudioPlayer src={blue} captions={captions} stopAtSecond={11} />

        {/* GRID */}
        <div className="grid grid-cols-4 gap-8 mt-10 justify-items-center">
          {items.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* الرقم */}
              <div className="flex gap-2">
                <span className="text-[20px] font-bold">{i + 1}</span>

                {/* الصورة */}
                <div className="flex flex-col items-center">
                  <img
                    src={item.img}
                    style={{
                      width: "auto",
                      height: "20vh",
                      objectFit: "contain",
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
                          cursor: locked ? "default" : "pointer",
                          border:
                            selected[i] === "yes"
                              ? locked &&
                                selected[i] === "yes" &&
                                item.correct !== "yes"
                                ? "2px solid red"
                                : "2px solid #f39b42"
                              : "2px solid #ccc",
                        }}
                      >
                        <img src={trueIcon} style={{ height: "25px" }} />
                      </button>

                      {locked &&
                        selected[i] === "yes" &&
                        item.correct !== "yes" && (
                          <div
                            style={{
                              position: "absolute",
                              left: "20px",
                              top: "5%",
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
                          cursor: locked ? "default" : "pointer",
                          border:
                            selected[i] === "no"
                              ? locked &&
                                selected[i] === "no" &&
                                item.correct !== "no"
                                ? "2px solid red"
                                : "2px solid #f39b42"
                              : "2px solid #ccc",
                        }}
                      >
                        <img src={falseIcon} style={{ height: "25px" }} />
                      </button>
                      {locked &&
                        selected[i] === "no" &&
                        item.correct !== "no" && (
                          <div
                            style={{
                              position: "absolute",
                              left: "20px",
                              top: "5%",
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

export default Review4_Page2_Q2;
