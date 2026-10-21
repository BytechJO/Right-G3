import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 13.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 15.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 14.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 68/Asset 16.svg";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_001_She_was_in_class.mp3";
import audio2 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_002_She_wasn't_in_class.mp3";
import audio3 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_003_He_was_at_the_beach.mp3";
import audio4 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_004_He_wasn't_at_the_beach.mp3";
import audio5 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_005_She_was_cleaning_the_car.mp3";
import audio6 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_006_She_wasn't_cleaning_the_car.mp3";
import audio7 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_007_They_were_at_the_farm.mp3";
import audio8 from "../../../assets/audio/ClassBook/Unit 8/Page 68 - Exercise B/Item_008_They_weren't_at_the_farm.mp3";

const Unit8_Page5_Q3 = () => {
  const items = [
    {
      img: img1,
      alt: "A girl in a classroom",
      options: [{ text: "She was in class.", audio: audio1 }, { text: "She wasn’t in class.", audio: audio2 }],
      correct: "She was in class.",
    },
    {
      img: img2,
      alt: "A boy at the beach",
      options: [{ text: "He was at the beach.", audio: audio3 }, { text: "He wasn’t at the beach.", audio: audio4 }],
      correct: "He wasn’t at the beach.",
    },
    {
      img: img3,
      alt: "A girl cleaning a car",
      options: [{ text: "She was cleaning the car.", audio: audio5 }, { text: "She wasn’t cleaning the car.", audio: audio6 }],
      correct: "She was cleaning the car.",
    },
    {
      img: img4,
      alt: "Children at a farm",
      options: [{ text: "They were at the farm.", audio: audio7 }, { text: "They weren’t at the farm.", audio: audio8 }],
      correct: "They weren’t at the farm.",
    },
  ];
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const chooseOption = (i, value) => {
    if (showAns || lockedIds.includes(i)) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    setWrongIds((previous) => previous.filter((id) => id !== i));
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setLockedIds([]);
    setShowAns(false);
    setWrongIds([]);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setLockedIds(items.map((_, index) => index));
    setShowAns(true);
    setWrongIds([]);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAns || lockedIds.length === items.length) return;

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

    setLockedIds(items.flatMap((item, index) => selected[index] === item.correct ? [index] : []));
    setWrongIds(items.flatMap((item, index) => selected[index] !== item.correct ? [index] : []));
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
        <ExerciseHeader sectionLetter="B" title="Look, read, and circle." subTitle="Use the picture and time clue, then tap the past-tense sentence that matches." />

        <div
          className="
grid grid-cols-1 
lg:grid-cols-2 
gap-y-16 
gap-x-50
xl:gap-x-20   /* 🔥 للويب فقط */
mt-10
"
        >
          {" "}
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "10px",
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
                alt={item.alt}
                style={{
                  width: "140px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <div className="flex flex-col gap-5 text-[18px]">
                {item.options.map((option, idx) => {
                  const opt = option.text;
                  const audioKey = `option-${i}-${idx}`;
                  return (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <button
                      type="button"
                      tabIndex={lockedIds.includes(i) || showAns ? -1 : 0}
                      aria-disabled={lockedIds.includes(i) || showAns}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() => { if (!lockedIds.includes(i) && !showAns) { playAudio(audioKey, option.audio); chooseOption(i, opt); } }}
                      onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && !lockedIds.includes(i) && !showAns) { event.preventDefault(); playAudio(audioKey, option.audio); chooseOption(i, opt); } }}
                      onMouseEnter={() => setHovered(i + "-" + idx)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        display: "inline-block",
                        padding: "6px 7px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",
                        whiteSpace: "nowrap",
                        background:
                         !lockedIds.includes(i) && !showAns && hovered === i + "-" + idx ? "#fee2c762" : "transparent",

                        border:
                          selected[i] === opt
                            ? lockedIds.includes(i) || showAns
                              ? opt === item.correct
                                ? "1px solid #F79530"
                                : "2px solid red"
                              : "1px solid #F79530"
                            : !lockedIds.includes(i) && !showAns && hovered === i + "-" + idx
                              ? "1px solid #F79530"
                              : "1px solid transparent",

                        transition: "0.2s", // 🔥 حركة ناعمة
                      }}
                    >
                      <Unit4PlayingAudioIcon active={activeAudioKey === audioKey} />
                      {opt}
                    </button>

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
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
                );})}
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

export default Unit8_Page5_Q3;
