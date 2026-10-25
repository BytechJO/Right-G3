import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 114.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 115.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 116.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 117.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 118.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 119.svg";
import Button from "../../Button";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page90A = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 90 - Exercise A/${file}`,
    import.meta.url,
  ).href;
const sentenceAudio = {
  "He will watch a movie.": page90A("Item_001_He_will_watch_a_movie.mp3"),
  "She will read a book.": page90A("Item_002_She_will_read_a_book.mp3"),
  "They will sit in the sun.": page90A("Item_003_They_will_sit_in_the_sun.mp3"),
  "He won’t watch a movie": page90A("Item_004_He_won't_watch_a_movie.mp3"),
  "She won’t read a book.": page90A("Item_005_She_won't_read_a_book.mp3"),
  "They won’t sit in the sun.": page90A(
    "Item_006_They_won't_sit_in_the_sun.mp3",
  ),
  "He will build a sandcastle.": page90A(
    "Item_007_He_will_build_a_sandcastle.mp3",
  ),
  "He will eat a sandwich.": page90A("Item_008_He_will_eat_a_sandwich.mp3"),
  "They will paint a picture.": page90A(
    "Item_009_They_will_paint_a_picture.mp3",
  ),
  "He won’t build a sandcastle.": page90A(
    "Item_010_He_won't_build_a_sandcastle.mp3",
  ),
  "He won’t eat a sandwich.": page90A("Item_011_He_won't_eat_a_sandwich.mp3"),
  "They won’t paint a picture.": page90A(
    "Item_012_They_won't_paint_a_picture.mp3",
  ),
};

const Review10_Page1_Q1 = () => {
  const items = [
    {
      img: img4,
      options: ["He will watch a movie.", "He won’t watch a movie"],
      correct: "He will watch a movie.",
    },
    {
      img: img3,
      options: ["She will read a book.", "She won’t read a book."],
      correct: "She won’t read a book.",
    },
    {
      img: img1,
      options: ["They will sit in the sun.", "They won’t sit in the sun."],
      correct: "They will sit in the sun.",
    },
    {
      img: img2,
      options: ["He will build a sandcastle.", "He won’t build a sandcastle."],
      correct: "He won’t build a sandcastle.",
    },
    {
      img: img6,
      options: ["He will eat a sandwich.", "He won’t eat a sandwich."],
      correct: "He will eat a sandwich.",
    },
    {
      img: img5,
      options: ["They will paint a picture.", "They won’t paint a picture."],
      correct: "They won’t paint a picture.",
    },
  ];
  const [hovered, setHovered] = useState(null);
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
          sectionLetter="A"
          title="Look, read, and underline the correct answer."
          subTitle="Look at the picture first, then select the future sentence that matches what will happen."
        />

        <div
          className="
                  grid grid-cols-1 
                  lg:grid-cols-3 
                  gap-y-10 
                  gap-x-10
                  xl:gap-x-10   /* 🔥 للويب فقط */
                  mb-10
                  w-full
                  "
        >
          {" "}
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <div className="flex gap-3">
                <span
                  style={{
                    // marginRight: "10px", // مسافة بسيطة
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
                      "A boy sitting in a movie theater.",
                      "A girl holding a book but not reading it.",
                      "Two children sitting under a beach umbrella.",
                      "A boy at the beach who will not build a sandcastle.",
                      "A boy eating a sandwich at a picnic.",
                      "Children outdoors who will not paint a picture.",
                    ][i]
                  }
                  style={{
                    width: "auto",
                    height: "110px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="flex flex-col gap-5 text-[18px]">
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
                      onMouseEnter={() => setHovered(i + "-" + idx)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        display: "inline-block",
                        padding: "6px 7px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",
                        whiteSpace: "nowrap",
                        fontSize: "17px",
                        background:
                          !lockedIds.includes(i) && hovered === i + "-" + idx
                            ? "#fef2e0ff"
                            : "transparent",

                        borderBottom:
                          selected[i] === opt
                            ? lockedIds.includes(i)
                              ? opt === item.correct
                                ? "1px solid #F79530" // صح
                                : "2px solid red" // غلط
                              : "1px solid #F79530"
                            : "1px solid transparent",

                        transition: "0.2s", // 🔥 حركة ناعمة
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
                        <div
                          style={{
                            position: "absolute",
                            right: "-20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              lineHeight: "1",
                              transform: "translateY(-1px)",
                            }}
                          >
                            ✕
                          </span>
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
    </div>
  );
};

export default Review10_Page1_Q1;
