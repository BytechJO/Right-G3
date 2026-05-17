import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex A 9.svg";

const OPTIONS = ["ch", "sh", "tch"];

const data = [
  { img: img1, pattern: "icken", answer: "ch", position: "start" },
  { img: img2, pattern: "pea", answer: "ch", position: "end" },
  { img: img3, pattern: "fi", answer: "sh", position: "end" },
  { img: img4, pattern: "wa", answer: "tch", position: "end" },
  { img: img5, pattern: "ell", answer: "sh", position: "start" },
  { img: img6, pattern: "ma", answer: "tch", position: "end" },
  { img: img7, pattern: "kitchen", answer: "tch", position: "middle" },
  { img: img8, pattern: "bea", answer: "ch", position: "end" },
  { img: img9, pattern: "op", answer: "sh", position: "start" },
];

const Unit3_Page5_Q1 = () => {
  const [inputs, setInputs] = useState(Array(data.length).fill(""));
  const [wrongInputs, setWrongInputs] = useState(
    Array(data.length).fill(false),
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [locked, setLocked] = useState(false);
  const handleChange = (index, value) => {
    if (showAnswer || locked) return;

    setInputs((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });

    setWrongInputs(Array(data.length).fill(false));
  };

  const checkAnswers = () => {
    if (showAnswer || locked) return;

    if (inputs.some((v) => !v)) {
      ValidationAlert.info("Please fill all answers");
      return;
    }

    let score = 0;
    const wrong = [];

    data.forEach((item, i) => {
      if (inputs[i] === item.answer) {
        score++;
        wrong[i] = false;
      } else {
        wrong[i] = true;
      }
    });

    setWrongInputs(wrong);
    setShowAnswer(true);
    setLocked(true);
    const total = data.length;

    if (score === total) ValidationAlert.success(`Score: ${score}/${total}`);
    else if (score === 0) ValidationAlert.error(`Score: ${score}/${total}`);
    else ValidationAlert.warning(`Score: ${score}/${total}`);
  };

  const showCorrectAnswers = () => {
    setInputs(data.map((d) => d.answer));
    setShowAnswer(true);
    setLocked(false);
  };

  const reset = () => {
    setInputs(Array(data.length).fill(""));
    setWrongInputs(Array(data.length).fill(false));
    setShowAnswer(false);
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
      <div className="div-forall" style={{ gap: "30px" }}>
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            A
          </span>
          Look and write <span style={{ color: "#2e3192" }}>ch , sh</span> or{" "}
          <span style={{ color: "#2e3192" }}>tch</span>
        </h5>

        {/* GRID */}
        <div className="unscramble-row-wb-unit1-p8-q1">
          {data.map((item, index) => (
            <div className="unscramble-box" key={index}>
              <div className="input-row-wb-unit1-p8-q1">
                <div className="flex gap-2">
                  <span className="text-[20px] font-bold">{index + 1}</span>
                  <img
                    src={item.img}
                    alt=""
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
                    {item.position === "start" && (
                      <>
                        <select
                          value={inputs[index]}
                          className={`${wrongInputs[index] && locked ? "border-b-2  border-red-500" : "border-b-1 "} outline-none w-[70px]`}
                          onChange={(e) => handleChange(index, e.target.value)}
                          disabled={showAnswer || locked}
                        >
                          <option value="">...</option>
                          {OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        {item.pattern}
                      </>
                    )}

                    {item.position === "end" && (
                      <>
                        {item.pattern}
                        <select
                          value={inputs[index]}
                          className={`${wrongInputs[index] && locked ? "border-b-2  border-red-500" : "border-b-1 "} outline-none w-[70px]`}
                          onChange={(e) => handleChange(index, e.target.value)}
                          disabled={showAnswer || locked}
                        >
                          <option value="">...</option>
                          {OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </>
                    )}

                    {item.position === "middle" && (
                      <>
                        {"ki"}
                        <select
                          value={inputs[index]}
                          className={`${wrongInputs[index] && locked ? "border-b-2  border-red-500" : "border-b-1 "} outline-none w-[70px]`}
                          onChange={(e) => handleChange(index, e.target.value)}
                          disabled={showAnswer || locked}
                        >
                          <option value="">...</option>
                          {OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        {"en"}
                      </>
                    )}
                  </span>

                  {wrongInputs[index] && locked && (
                    <div style={{ position: "absolute", right: "10px" }}>
                      <WrongMark />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
