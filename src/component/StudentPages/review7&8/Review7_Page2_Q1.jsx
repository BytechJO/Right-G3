import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex C 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex C 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex C 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex C 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex C 6.svg";
import Button from "../../Button";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import keyAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_001_key.mp3";
import doorAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_002_door.mp3";
import duckAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_003_duck.mp3";
import sixAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_004_six.mp3";
import jacketAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_005_jacket.mp3";
import horseAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_006_horse.mp3";
import nurseAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_007_nurse.mp3";
import queenAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_008_queen.mp3";
import cakeAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_009_cake.mp3";
import meatAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_010_meat.mp3";
import vetAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_011_vet.mp3";
import singAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_012_sing.mp3";
import tapeAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_013_tape.mp3";
import windowAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_014_window.mp3";
import legAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_015_leg.mp3";
import gumAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_016_gum.mp3";
import zeroAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_017_zero.mp3";
import popcornAudio from "../../../assets/audio/ClassBook/Unit 8/Page 71 - Exercise C/Item_018_popcorn.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const Review7_Page2_Q1 = () => {
  const items = [
    {
      img: img1,
      alt: "A key",
      options: [
        { text: "key", audio: keyAudio },
        { text: "door", audio: doorAudio },
        { text: "nurse", audio: nurseAudio },
      ],
      correct: "key",
    },
    {
      img: img2,
      alt: "A queen",
      options: [
        { text: "duck", audio: duckAudio },
        { text: "six", audio: sixAudio },
        { text: "queen", audio: queenAudio },
      ],
      correct: "queen",
    },
    {
      img: img3,
      alt: "A horse",
      options: [
        { text: "jacket", audio: jacketAudio },
        { text: "horse", audio: horseAudio },
        { text: "cake", audio: cakeAudio },
      ],
      correct: "horse",
    },
    {
      img: img4,
      alt: "Meat",
      options: [
        { text: "meat", audio: meatAudio },
        { text: "vet", audio: vetAudio },
        { text: "sing", audio: singAudio },
      ],
      correct: "meat",
    },
    {
      img: img5,
      alt: "A leg",
      options: [
        { text: "tape", audio: tapeAudio },
        { text: "window", audio: windowAudio },
        { text: "leg", audio: legAudio },
      ],
      correct: "leg",
    },
    {
      img: img6,
      alt: "The number zero",
      options: [
        { text: "gum", audio: gumAudio },
        { text: "zero", audio: zeroAudio },
        { text: "popcorn", audio: popcornAudio },
      ],
      correct: "zero",
    },
  ];
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
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
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setLockedIds(items.map((_, index) => index));
    setWrongIds([]);
    setShowAns(true);
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
          sectionLetter="C"
          title="Look, read, and circle."
          subTitle="Say each picture name, listen to its first sound, then tap the matching word."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-15 mb-10 lg:gap-y-16 gap-x-4 sm:gap-x-8 md:gap-x-16 lg:gap-x-1 xl:gap-x-20 mt-10 w-full">
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                marginRight: 4,
              }}
            >
              <div className="flex gap-5">
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
                  alt={item.alt}
                  style={{
                    width: "auto",
                    height: "120px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="flex flex-col gap-1 text-[18px]">
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
                        onClick={() => {
                          if (!lockedIds.includes(i) && !showAns) {
                            playAudio(audioKey, option.audio);
                            chooseOption(i, opt);
                          }
                        }}
                        onKeyDown={(event) => {
                          if (
                            (event.key === "Enter" || event.key === " ") &&
                            !lockedIds.includes(i) &&
                            !showAns
                          ) {
                            event.preventDefault();
                            playAudio(audioKey, option.audio);
                            chooseOption(i, opt);
                          }
                        }}
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
                            !lockedIds.includes(i) &&
                            !showAns &&
                            hovered === i + "-" + idx
                              ? "#fef2e0ff"
                              : "transparent",

                          border:
                            selected[i] === opt
                              ? lockedIds.includes(i) || showAns
                                ? opt === item.correct
                                  ? "1px solid #F79530"
                                  : "2px solid red"
                                : "1px solid #F79530"
                              : !lockedIds.includes(i) &&
                                  !showAns &&
                                  hovered === i + "-" + idx
                                ? "1px solid #F79530"
                                : "1px solid transparent",

                          transition: "0.2s", // 🔥 حركة ناعمة
                        }}
                      >
                        <Unit4PlayingAudioIcon
                          active={activeAudioKey === audioKey}
                        />
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
                  );
                })}
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

export default Review7_Page2_Q1;
