import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex D 5.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex D 6.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex D 7.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 17/Ex D 8.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import blue from "../../../assets/audio/ClassBook/Unit 2/P 17/unit2-pg17-EXE.mp3";

import Button from "../../Button";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
const Review1_Page2_Q3 = () => {
  const items = [
    { img: img1, correct: "no" },
    { img: img2, correct: "no" },
    { img: img3, correct: "yes" },
    { img: img4, correct: "yes" },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [forceStop, setForceStop] = useState(false);
  const captions = [
    {
      start: 0.199,
      end: 17.7,
      text: "Page 17, review one, exercise E. Does it have a short vowel sound? Listen and write check or X. One, ice. Two, train. Three, pot. Four, bat",
    },
  ];
  const choose = (i, value) => {
    if (showAnswer || correctIds.includes(i)) return;

    const updated = [...selected];
    updated[i] = value;
    setSelected(updated);
    setCheckedIds((previous) => previous.filter((id) => id !== i));
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === items.length) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) score++;
    });
    setCorrectIds(
      items.flatMap((item, index) =>
        selected[index] === item.correct ? [index] : [],
      ),
    );
    setCheckedIds(items.map((_, index) => index));

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
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setCheckedIds(items.map((_, index) => index));
    setCorrectIds(items.map((_, index) => index));
    setShowAnswer(true);
    setForceStop(true);
    window.requestAnimationFrame(() => setForceStop(false));
  };

  const reset = () => {
    setSelected(Array(items.length).fill(""));
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
    setForceStop(true);
    window.requestAnimationFrame(() => setForceStop(false));
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
        <ExerciseHeaderReview
          sectionLetter="E"
          title={
            <>
              Does it have a{" "}
              <span style={{ color: "#2e3192" }}>short vowel sound</span>?
              Listen and write <span style={{ color: "red" }}>✓</span> or{" "}
              <span style={{ color: "red" }}>✗</span>.
            </>
          }
          subTitle="Listen for the vowel sound, replay if needed, then select only the words with the short sound."
        />
        <QuestionAudioPlayer
          src={blue}
          captions={captions}
          stopAtSecond={9.5}
          pageId="review1-page2-q3"
          forceStop={forceStop}
        />

        {/* GRID */}
        <div className="grid grid-cols-4 gap-8 mt-10 justify-items-center">
          {items.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center">
              <span className="absolute -top-2 -left-2 text-lg font-bold">
                {i + 1}
              </span>

              <img
                src={item.img}
                alt={
                  i === 0
                    ? "An ice cube"
                    : i === 1
                      ? "A train"
                      : i === 2
                        ? "A cooking pot"
                        : "A bat"
                }
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
                    aria-label={`Item ${i + 1}: yes, it has a short vowel sound`}
                    aria-pressed={selected[i] === "yes"}
                    aria-disabled={showAnswer || correctIds.includes(i)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      cursor:
                        showAnswer || correctIds.includes(i)
                          ? "default"
                          : "pointer",
                      border:
                        selected[i] === "yes"
                          ? checkedIds.includes(i) &&
                            selected[i] === "yes" &&
                            item.correct !== "yes"
                            ? "2px solid red"
                            : "2px solid #f39b42"
                          : "2px solid #ccc",
                    }}
                  >
                    <img src={trueIcon} alt="" style={{ height: "25px" }} />
                  </button>

                  {checkedIds.includes(i) &&
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
                    aria-label={`Item ${i + 1}: no, it does not have a short vowel sound`}
                    aria-pressed={selected[i] === "no"}
                    aria-disabled={showAnswer || correctIds.includes(i)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      cursor:
                        showAnswer || correctIds.includes(i)
                          ? "default"
                          : "pointer",
                      border:
                        selected[i] === "no"
                          ? checkedIds.includes(i) &&
                            selected[i] === "no" &&
                            item.correct !== "no"
                            ? "2px solid red"
                            : "2px solid #f39b42"
                          : "2px solid #ccc",
                    }}
                  >
                    <img src={falseIcon} alt="" style={{ height: "25px" }} />
                  </button>
                  {checkedIds.includes(i) &&
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

export default Review1_Page2_Q3;
