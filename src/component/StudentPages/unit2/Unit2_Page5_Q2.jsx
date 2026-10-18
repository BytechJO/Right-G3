/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 14/cd12pg14-instruction1-adult-lady_odrSfnYJ.mp3";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import Unit2PlayingAudioIcon from "./Unit2PlayingAudioIcon";
import useUnit2Audio from "./useUnit2Audio";
import "./unit2Interactions.css";
import tuneAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_001_tune.mp3";
import runAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_002_run.mp3";
import juneAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_003_June.mp3";
import cubeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_004_cube.mp3";
import gumAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_005_gum.mp3";
import hutAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_006_hut.mp3";
import blueAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_007_blue.mp3";
import duckAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_008_duck.mp3";
import upAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_009_up.mp3";
import sunAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_010_sun.mp3";
import glueAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_011_glue.mp3";
import funAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_012_fun.mp3";
import spunAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_013_spun.mp3";
import cuteAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_014_cute.mp3";
import tubeAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_015_tube.mp3";
import sueAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_016_Sue.mp3";
import busAudio from "../../../assets/audio/ClassBook/Unit 2/Page 14 - Exercise A2/Item_017_bus.mp3";

const WORD_AUDIO = [
  [tuneAudio, runAudio, juneAudio],
  [cubeAudio, gumAudio, hutAudio],
  [blueAudio, duckAudio, upAudio],
  [sunAudio, glueAudio, funAudio],
  [spunAudio, cuteAudio, tubeAudio],
  [sueAudio, blueAudio, busAudio],
];

const Unit2_Page5_Q2 = () => {
  const groups = [
    { words: ["tune", "run", "June"], correct: [0, 2] },
    { words: ["cube", "gum", "hut"], correct: [1, 2] },
    { words: ["blue", "duck", "up"], correct: [1, 2] },
    { words: ["sun", "glue", "fun"], correct: [0, 2] },
    { words: ["spun", "cute", "tube"], correct: [1, 2] },
    { words: ["Sue", "blue", "bus"], correct: [0, 1] },
  ];
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [selected, setSelected] = useState(groups.map(() => []));
  const [correctGroups, setCorrectGroups] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    {
      start: 0,
      end: 6.01,
      text: "Page 14, Write Activities. Exercise A, Number 2.",
    },
    {
      start: 7.05,
      end: 10.73,
      text: "Listen and circle the words with the same U sound.",
    },
    {
      start: 11.97,
      end: 15.5,
      text: "1. tune, run, June.",
    },
    {
      start: 15.51,
      end: 20.2,
      text: "2. cube, gum, hut.",
    },
    {
      start: 20.21,
      end: 25.05,
      text: "3. blue, duck, up.",
    },
    {
      start: 26.11,
      end: 30.15,
      text: "4. sun, glue, fun.",
    },
    {
      start: 31.43,
      end: 35.75,
      text: "5. spun, cute, tube.",
    },
    {
      start: 36.89,
      end: 40.83,
      text: "6. Sue, blue, bus.",
    },
  ];
  const showAnswers = () => {
    const correctSelections = groups.map((g) => g.correct);

    setSelected(correctSelections);
    setCheckedGroups(groups.map((_, index) => index));
    setCorrectGroups(groups.map((_, index) => index));
    setShowAnswer(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (showAnswer || correctGroups.length === groups.length) return;
    const hasEmpty = selected.some((arr) => arr.length === 0);

    if (hasEmpty) {
      ValidationAlert.info();
      return;
    }
    let correctCount = 0;
    let total = 0;

    groups.forEach((group, index) => {
      total += group.correct.length;

      group.correct.forEach((correctIndex) => {
        if (selected[index].includes(correctIndex)) {
          correctCount++;
        }
      });
    });

    const msg = `
        Score: ${correctCount} / ${total}
  `;

    if (correctCount === total) ValidationAlert.success(msg);
    else if (correctCount === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    const exactGroups = groups.flatMap((group, index) => {
      const current = [...selected[index]].sort();
      const correct = [...group.correct].sort();
      return current.length === correct.length &&
        current.every((value, itemIndex) => value === correct[itemIndex])
        ? [index]
        : [];
    });
    setCheckedGroups(groups.map((_, index) => index));
    setCorrectGroups(exactGroups);
  };

  const reset = () => {
    setSelected(groups.map(() => []));
    setCheckedGroups([]);
    setCorrectGroups([]);
    setShowAnswer(false);
    stopAudio();
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
      <div
        className="div-forall"
        style={{
          gap: "45px",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          questionNumber="2"
          title={
            <>
              Listen and circle the words with the same{" "}
              <span style={{ color: "#2e3192" }}> u sound</span>.
            </>
          }
          subTitle="Listen once, replay if needed, then select the sound or answer that matches what you hear."
        />

        <QuestionAudioPlayer
          src={sound1}
          captions={captions}
          stopAtSecond={11}
          pageId="unit2-page5-q2"
          onInteract={stopAudio}
        />

        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            gap: "10px",
            marginTop: "30px",
          }}
        >
          {groups.map((group, index) => (
            <div key={index} className="flex gap-2 w-full">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {index + 1}
              </div>

              <div
                style={{
                  background: "#FEF3E6",
                  padding: "15px 25px",
                  borderRadius: "1vw",
                  minWidth: "7vw",
                  display: "flex",
                  height: "170px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {group.words.map((word, i) => {
                  const isSelected = selected[index].includes(i);
                  const isCorrect = group.correct.includes(i);
                  const groupLocked =
                    showAnswer || correctGroups.includes(index);
                  const wasChecked = checkedGroups.includes(index);

                  return (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-disabled={groupLocked}
                      aria-label={`${word}${isSelected ? ", selected" : ""}`}
                      className="unit2-audio-control unit2-interactive"
                      onClick={() => {
                        playAudio(`word-${index}-${i}`, WORD_AUDIO[index][i]);
                        if (groupLocked) return;

                        const newSelected = [...selected];

                        if (newSelected[index].includes(i)) {
                          newSelected[index] = newSelected[index].filter(
                            (x) => x !== i,
                          );
                        } else {
                          newSelected[index].push(i);
                        }

                        setSelected(newSelected);
                        setCheckedGroups((previous) =>
                          previous.filter((groupIndex) => groupIndex !== index),
                        );
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        playAudio(`word-${index}-${i}`, WORD_AUDIO[index][i]);
                        if (groupLocked) return;
                        const next = selected.map((items) => [...items]);
                        next[index] = next[index].includes(i)
                          ? next[index].filter((item) => item !== i)
                          : [...next[index], i];
                        setSelected(next);
                        setCheckedGroups((previous) =>
                          previous.filter((groupIndex) => groupIndex !== index),
                        );
                      }}
                      style={{
                        fontSize: "18px",
                        cursor: "pointer",
                        padding: "4px 5px",
                        position: "relative",
                      }}
                    >
                      {word}

                      {isSelected && (
                        <>
                          {isSelected && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-4px",
                                left: "-6px",
                                right: "-6px",
                                bottom: "-4px",
                                border: isSelected
                                  ? wasChecked
                                    ? isCorrect
                                      ? "1px solid #f39b42"
                                      : "2px solid red"
                                    : "1px solid #f39b42"
                                  : "none",
                                borderRadius: "20px",
                                pointerEvents: "none",
                              }}
                            />
                          )}

                          {/* ❌ علامة الغلط */}
                          {wasChecked && !isCorrect && <WrongMark />}
                        </>
                      )}
                      <Unit2PlayingAudioIcon
                        active={activeAudioKey === `word-${index}-${i}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Unit2_Page5_Q2;
