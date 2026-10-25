import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 88/Ex B 4.svg";
import Button from "../../Button";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page88B = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 88 - Exercise B/${file}`,
    import.meta.url,
  ).href;
const sentenceAudio = {
  "He had a bike.": page88B("Item_001_He_had_a_bike.mp3"),
  "She had a kite.": page88B("Item_002_She_had_a_kite.mp3"),
  "He didn’t have a bike.": page88B("Item_003_He_didn't_have_a_bike.mp3"),
  "She didn’t have a kite.": page88B("Item_004_She_didn't_have_a_kite.mp3"),
  "He had a computer.": page88B("Item_005_He_had_a_computer.mp3"),
  "She had a bunny.": page88B("Item_006_She_had_a_bunny.mp3"),
  "He didn’t have a computer.": page88B(
    "Item_007_He_didn't_have_a_computer.mp3",
  ),
  "She didn’t have a bunny.": page88B("Item_008_She_didn't_have_a_bunny.mp3"),
};

const Review9_Page1_Q2 = () => {
  const items = [
    {
      img: img1,
      options: ["He had a bike.", "He didn’t have a bike."],
      correct: "He had a bike.",
    },
    {
      img: img2,
      options: ["She had a kite.", "She didn’t have a kite."],
      correct: "She had a kite.",
    },
    {
      img: img3,
      options: ["He had a computer.", "He didn’t have a computer."],
      correct: "He had a computer.",
    },
    {
      img: img4,
      options: ["She had a bunny.", "She didn’t have a bunny."],
      correct: "She had a bunny.",
    },
  ];

  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const chooseOption = (i, value) => {
    if (revealed || lockedIds.includes(i)) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];
    newAnswers[i] = items[i].start + value + items[i].end;
    setAnswers(newAnswers);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLockedIds([]);
    setRevealed(false);
    setWrongIds([]);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setLockedIds(items.map((_, index) => index));
    setRevealed(true);
    setWrongIds([]);
    stopAudio();
  };

  const checkAnswers = () => {
    if (revealed || lockedIds.length === items.length) return;

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
    <span style="color:${color}; font-weight:bold;">
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
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Read, look, and circle."
          subTitle="Use the picture and time clue, then tap the past-tense sentence that matches."
        />

        <div
          className="grid grid-cols-2 gap-y-10 gap-x-20 w-full"
          style={{ justifyItems: "center" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                // marginBottom: "30px",
              }}
            >
              <div className="flex gap-2">
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {i + 1}
                </span>

                <img
                  src={item.img}
                  alt={
                    [
                      "A happy boy with a bicycle.",
                      "A sad girl with a kite.",
                      "A happy boy using a computer.",
                      "A happy girl holding a bunny.",
                    ][i]
                  }
                  style={{
                    width: "auto",
                    height: "120px",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 text-[18px]">
                {item.options.map((opt, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <span
                      role="button"
                      tabIndex={lockedIds.includes(i) ? -1 : 0}
                      aria-disabled={lockedIds.includes(i)}
                      className="unit4-interactive unit4-audio-control"
                      onClick={() => {
                        if (!lockedIds.includes(i)) {
                          playAudio(`option-${i}-${idx}`, sentenceAudio[opt]);
                          chooseOption(i, opt);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (
                          (event.key === "Enter" || event.key === " ") &&
                          !lockedIds.includes(i)
                        ) {
                          event.preventDefault();
                          playAudio(`option-${i}-${idx}`, sentenceAudio[opt]);
                          chooseOption(i, opt);
                        }
                      }}
                      style={{
                        display: "inline-block",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",

                        border:
                          selected[i] === opt
                            ? lockedIds.includes(i)
                              ? opt === item.correct
                                ? "1px solid #F79530"
                                : "2px solid red"
                              : "1px solid #F79530"
                            : "1px solid transparent",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `option-${i}-${idx}`}
                      />
                      {opt}
                    </span>

                    {wrongIds.includes(i) &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "-15px",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </span>
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
    </div>
  );
};

export default Review9_Page1_Q2;
