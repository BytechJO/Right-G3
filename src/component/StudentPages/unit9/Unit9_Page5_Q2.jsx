import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import "./Unit9_Page5_Q2.css";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 51.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 52.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 53.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Asset 54.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 80/unit9-pg80-EXB.mp3";
import socksAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_001_socks.mp3";
import spoonsAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_002_spoons.mp3";
import dogsAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_003_dogs.mp3";
import rocksAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_004_rocks.mp3";
import bumpsAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_005_bumps.mp3";
import frogsAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_006_frogs.mp3";
import racksAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_007_racks.mp3";
import booksAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_008_books.mp3";
import foldersAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_009_folders.mp3";
import capsAudio from "../../../assets/audio/ClassBook/Unit 9/Page 80 - Exercise B/Item_010_caps.mp3";

import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
const Unit9_Page5_Q2 = () => {
  const items = [
    {
      img: img1,
      imageAlt: "Three colorful pairs of socks.",
      word: "socks",
      wordAudio: socksAudio,
      options: ["dogs", "rocks", "bumps"],
      optionAudio: { dogs: dogsAudio, rocks: rocksAudio, bumps: bumpsAudio },
      correct: ["rocks"],
    },
    {
      img: img2,
      imageAlt: "Three silver spoons.",
      word: "spoons",
      wordAudio: spoonsAudio,
      options: ["frogs", "racks", "books"],
      optionAudio: { frogs: frogsAudio, racks: racksAudio, books: booksAudio },
      correct: ["racks", "books"],
    },
    {
      img: img3,
      imageAlt: "Several colorful file folders.",
      word: "folders",
      wordAudio: foldersAudio,
      options: ["shoulders", "bats", "tacos"],
      correct: ["shoulders"],
    },
    {
      img: img4,
      imageAlt: "Two blue and red baseball caps.",
      word: "caps",
      wordAudio: capsAudio,
      options: ["sacks", "maps", "chairs"],
      correct: ["maps"],
    },
  ];

  const [selected, setSelected] = useState(items.map(() => []));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const captions = [
    {
      start: 0.119,
      end: 11.699,
      text: "Page 80. Write activities. Exercise B. Listen and circle the words with the same final S sound. One, socks,",
    },
    { start: 12.859, end: 17.739, text: "dogs, rocks, bumps. Two, spoons," },
    { start: 18.979, end: 24.6, text: "frogs, racks, books. Three, folders," },
    { start: 25.76, end: 31.679, text: "shoulders, bats, tacos. Four, caps," },
    { start: 32.919, end: 35.399, text: "sacks, maps, chairs" },
  ];
  const itemIsCorrect = (item, values) =>
    values.length === item.correct.length &&
    item.correct.every((answer) => values.includes(answer));

  const chooseOption = (i, value) => {
    if (showAns || lockedIds.includes(i)) return;

    const newSelected = [...selected];
    const current = newSelected[i];

    if (current.includes(value)) {
      // remove
      newSelected[i] = current.filter((v) => v !== value);
    } else {
      // add
      newSelected[i] = [...current, value];
    }

    setSelected(newSelected);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };
  const resetAll = () => {
    setSelected(items.map(() => []));
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

    if (selected.some((answers) => answers.length === 0)) {
      ValidationAlert.info();
      return;
    }
    const nextLockedIds = items.flatMap((item, index) =>
      itemIsCorrect(item, selected[index]) ? [index] : [],
    );
    const nextWrongIds = items.flatMap((item, index) =>
      itemIsCorrect(item, selected[index]) ? [] : [index],
    );
    const total = items.reduce((sum, item) => sum + item.correct.length, 0);
    const score = Math.max(
      0,
      items.reduce((sum, item, index) => {
        const correctSelections = selected[index].filter((answer) =>
          item.correct.includes(answer),
        ).length;
        const wrongSelections = selected[index].filter(
          (answer) => !item.correct.includes(answer),
        ).length;
        return sum + correctSelections - wrongSelections;
      }, 0),
    );

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

    setLockedIds(nextLockedIds);
    setWrongIds(nextWrongIds);
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
      <div className="div-forall" style={{ gap: "25px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Listen and circle the words with the same final
              <span style={{ color: "#2e3192" }}> -s sound</span>?
            </>
          }
          subTitle="Listen to the final sound in each word, then select or mark the matching -s sound."
        />
        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={9.5}
          pageId="unit9-page80-b"
        />
        <div className="flex w-full">
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-2 gap-y-10 gap-x-64 mt-1 mb-12">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col justify-center h-50">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-5">
                      <span className="text-[20px] font-bold text-[#2a4e7c]">
                        {i + 1}
                      </span>

                      <span
                        role="button"
                        tabIndex={0}
                        className="unit4-audio-control unit4-interactive"
                        aria-label={`Play ${item.word}`}
                        onClick={() => playAudio(`word-${i}`, item.wordAudio)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            playAudio(`word-${i}`, item.wordAudio);
                          }
                        }}
                        style={{ position: "relative", display: "inline-flex" }}
                      >
                        <Unit4PlayingAudioIcon
                          active={activeAudioKey === `word-${i}`}
                        />
                        <img
                          src={item.img}
                          alt={item.imageAlt}
                          style={{ width: "150px", height: "auto" }}
                        />
                      </span>
                    </div>
                    {/* OPTIONS تحت الصورة وبالعرض */}
                    <div className="flex gap-3 text-[18px] mt-2">
                      {item.options.map((opt, idx) => (
                        <span
                          key={idx}
                          role="button"
                          tabIndex={
                            showAns || lockedIds.includes(i)
                              ? item.optionAudio?.[opt]
                                ? 0
                                : -1
                              : 0
                          }
                          aria-disabled={showAns || lockedIds.includes(i)}
                          onClick={() => {
                            chooseOption(i, opt);
                            if (item.optionAudio?.[opt])
                              playAudio(`option-${i}-${idx}`, item.optionAudio[opt]);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              chooseOption(i, opt);
                              if (item.optionAudio?.[opt])
                                playAudio(
                                  `option-${i}-${idx}`,
                                  item.optionAudio[opt],
                                );
                            }
                          }}
                          className={`relative cursor-pointer px-3 py-1 rounded-full border-1 ${
                            selected[i]?.includes(opt)
                              ? wrongIds.includes(i) && !items[i].correct.includes(opt)
                                ? "border-red-500"
                                : "border-[#F79530] bg-orange-50"
                              : "border-transparent hover:border-[#F79530]"
                          }`}
                        >
                          <Unit4PlayingAudioIcon
                            active={activeAudioKey === `option-${i}-${idx}`}
                          />
                          {opt}

                          {/* ❌ على الخيار الغلط */}
                          {wrongIds.includes(i) &&
                            selected[i]?.includes(opt) &&
                            !items[i].correct.includes(opt) && (
                              <span className="absolute top-0 right-6">
                                <WrongMark />
                              </span>
                            )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons-container">
        <button onClick={resetAll} className="try-again-button">
          Start Again ↻
        </button>

        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>

        <button onClick={checkAnswers} className="check-button2">
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit9_Page5_Q2;
