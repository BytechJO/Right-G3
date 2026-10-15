import React, { useState } from "react";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import Unit1PlayingAudioIcon from "./Unit1PlayingAudioIcon";
import useUnit1Audio from "./useUnit1Audio";
import track from "../../../assets/audio/ClassBook/Unit 1/P 8/unit1-pg8-EX-A.mp3";
import may from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_001_may.mp3";
import lake from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_002_lake.mp3";
import jam from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_003_jam.mp3";
import paint from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_004_paint.mp3";
import bee from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_005_bee.mp3";
import bed from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_006_bed.mp3";
import feet from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_007_feet.mp3";
import tea from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_008_tea.mp3";
import kite from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_009_kite.mp3";
import bike from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_010_bike.mp3";
import light from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_011_light.mp3";
import fish from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_012_fish.mp3";
import home from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_013_home.mp3";
import boat from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_014_boat.mp3";
import box from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_015_box.mp3";
import note from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_016_note.mp3";
import run from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_017_run.mp3";
import blue from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_018_blue.mp3";
import sue from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_019_sue.mp3";
import tube from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A2/Item_020_tube.mp3";
import "./Page8_Q2.css";
import "./unit1Interactions.css";

const GROUPS = [
  {
    words: [
      { text: "may", audio: may },
      { text: "lake", audio: lake },
      { text: "jam", audio: jam },
      { text: "paint", audio: paint },
    ],
    correct: [0, 1, 3],
  },
  {
    words: [
      { text: "bee", audio: bee },
      { text: "bed", audio: bed },
      { text: "feet", audio: feet },
      { text: "tea", audio: tea },
    ],
    correct: [0, 2, 3],
  },
  {
    words: [
      { text: "kite", audio: kite },
      { text: "bike", audio: bike },
      { text: "light", audio: light },
      { text: "fish", audio: fish },
    ],
    correct: [0, 1, 2],
  },
  {
    words: [
      { text: "home", audio: home },
      { text: "boat", audio: boat },
      { text: "box", audio: box },
      { text: "note", audio: note },
    ],
    correct: [0, 1, 3],
  },
  {
    words: [
      { text: "run", audio: run },
      { text: "blue", audio: blue },
      { text: "sue", audio: sue },
      { text: "tube", audio: tube },
    ],
    correct: [1, 2, 3],
  },
];

const CAPTIONS = [
  {
    start: 0.259,
    end: 18.899,
    text: "Page 8. Write activities. Exercise A, number two. Listen and circle the words with long vowel sounds. One: may, lake, jam, paint. Two: bee, bed.",
  },
  {
    start: 19.939,
    end: 28.379,
    text: "Feet, tea. Three: kite, bike, light, fish.",
  },
  {
    start: 29.739,
    end: 42.919,
    text: "Four: home, boat, box, note. Five: run, blue, Sue, tube.",
  },
];

export default function Page8_Q2() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit1Audio();
  const [selected, setSelected] = useState(GROUPS.map(() => []));
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [lockedChoices, setLockedChoices] = useState(GROUPS.map(() => []));
  const [completed, setCompleted] = useState(false);

  const toggleWord = (groupIndex, wordIndex) => {
    const word = GROUPS[groupIndex].words[wordIndex];
    playAudio(`word-${groupIndex}-${wordIndex}`, word.audio);
    if (revealed || completed || lockedChoices[groupIndex].includes(wordIndex))
      return;
    setSelected((previous) =>
      previous.map((group, index) => {
        if (index !== groupIndex) return group;
        return group.includes(wordIndex)
          ? group.filter((value) => value !== wordIndex)
          : [...group, wordIndex];
      }),
    );
    setChecked(false);
  };

  const checkAnswers = () => {
    if (completed || revealed) return;
    if (selected.some((group) => group.length === 0)) {
      ValidationAlert.info("Please select at least one word in each group.");
      return;
    }
    let score = 0;
    let total = 0;
    GROUPS.forEach((group, groupIndex) => {
      total += group.correct.length;
      group.correct.forEach((correctIndex) => {
        if (selected[groupIndex].includes(correctIndex)) score += 1;
      });
    });
    const hasWrongSelections = GROUPS.some((group, groupIndex) =>
      selected[groupIndex].some(
        (wordIndex) => !group.correct.includes(wordIndex),
      ),
    );
    const isPerfect = score === total && !hasWrongSelections;
    setLockedChoices(
      GROUPS.map((group, groupIndex) =>
        selected[groupIndex].filter((wordIndex) =>
          group.correct.includes(wordIndex),
        ),
      ),
    );
    setChecked(true);
    setCompleted(isPerfect);
    if (isPerfect) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score === 0) ValidationAlert.error(`Score: ${score} / ${total}`);
    else ValidationAlert.warning(`Score: ${score} / ${total}`);
  };

  const showAnswers = () => {
    setSelected(GROUPS.map((group) => [...group.correct]));
    setLockedChoices(GROUPS.map((group) => [...group.correct]));
    setChecked(true);
    setRevealed(true);
    setCompleted(true);
    stopAudio();
  };

  const reset = () => {
    setSelected(GROUPS.map(() => []));
    setChecked(false);
    setRevealed(false);
    setLockedChoices(GROUPS.map(() => []));
    setCompleted(false);
    stopAudio();
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="A"
          questionNumber="2"
          title="Listen and circle the words with long vowel sounds."
          subTitle="Listen for the vowel sound, replay if needed, then select only the words with the long sound."
        />
        <QuestionAudioPlayer
          src={track}
          captions={CAPTIONS}
          stopAtSecond={9.2}
          pageId="unit1-page8-q2"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "25px",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {GROUPS.map((group, groupIndex) => (
            <fieldset
              key={groupIndex}
              style={{
                position: "relative",
                minWidth: "135px",
                padding: "18px 28px",
                border: 0,
                borderRadius: "16px",
                background: "#FEF3E6",
              }}
            >
              <legend
                style={{
                  position: "absolute",
                  left: "-18px",
                  top: "8px",
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                {groupIndex + 1}
              </legend>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                {group.words.map((word, wordIndex) => {
                  const isSelected = selected[groupIndex].includes(wordIndex);
                  const isCorrect = group.correct.includes(wordIndex);
                  const wrong = checked && isSelected && !isCorrect;
                  return (
                    <button
                      type="button"
                      key={word.text}
                      className="unit1-audio-control unit1-interactive"
                      onClick={() => toggleWord(groupIndex, wordIndex)}
                      aria-pressed={isSelected}
                      aria-label={`${word.text}${isSelected ? ", selected" : ""}. Activate to play and select.`}
                      style={{
                        minWidth: "72px",
                        minHeight: "42px",
                        padding: "6px 12px",
                        border: isSelected
                          ? `2px solid ${wrong ? "#dc2626" : "#f39b42"}`
                          : "2px solid transparent",
                        borderRadius: "22px",
                        background: "transparent",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                    >
                      {word.text}
                      <Unit1PlayingAudioIcon
                        active={
                          activeAudioKey === `word-${groupIndex}-${wordIndex}`
                        }
                      />
                      {wrong && <WrongMark />}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
          checkDisabled={completed || revealed}
        />
      </div>
    </div>
  );
}
