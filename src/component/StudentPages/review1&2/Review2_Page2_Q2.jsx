import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import "../unit2/unit2Interactions.css";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const AUDIO_MODULES = import.meta.glob(
  "../../../assets/audio/ClassBook/Unit 2/Page 19 - Exercise D/*.mp3",
  { eager: true, query: "?url", import: "default" },
);
const audioEndingWith = (ending) =>
  Object.entries(AUDIO_MODULES).find(([path]) => path.endsWith(ending))?.[1];

const COLORS = [
  { key: "long a", color: "#D1232A" },
  { key: "long e", color: "#FFF101" },
  { key: "long i", color: "#ED028C" },
  { key: "long o", color: "#962A90" },
  { key: "long u", color: "#EE5625" },
  { key: "short a", color: "#40AE49" },
  { key: "short e", color: "#A3CF9A" },
  { key: "short i", color: "#7B4521" },
  { key: "short o", color: "#3730A3" },
  { key: "short u", color: "#00AEEF" },
];

const WORDS = [
  ["snow", "soap", "cup", "date", "may", "make", "cape", "coat", "grow"],
  ["five", "time", "chat", "hat", "desk", "man", "act", "glue", "mine"],
  ["kid", "sit", "bee", "log", "pop", "pen", "he", "see", "blue"],
];

const CORRECT = {
  snow: "long o",
  soap: "long o",
  cup: "short u",
  date: "long a",
  may: "long a",
  make: "long a",
  cape: "long a",
  coat: "long o",
  grow: "long o",
  five: "long i",
  time: "long i",
  chat: "short a",
  hat: "short a",
  desk: "short e",
  man: "short a",
  act: "short a",
  glue: "long u",
  mine: "long i",
  kid: "short i",
  sit: "short i",
  bee: "long e",
  log: "short o",
  pop: "short o",
  pen: "short e",
  he: "long e",
  see: "long e",
  blue: "long u",
};

const Review2_Page2_Q2 = () => {
  const [answers, setAnswers] = useState({});
  const [checkedWords, setCheckedWords] = useState([]);
  const [correctWords, setCorrectWords] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const [selectedWord, setSelectedWord] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const wordAudio = (word) =>
    audioEndingWith(`_${word.replaceAll(" ", "_")}.mp3`);
  const soundAudio = (sound) =>
    audioEndingWith(`_${sound.replaceAll(" ", "_")}.mp3`);

  const handleWordClick = (word) => {
    if (showAnswers || correctWords.includes(word)) return;

    const audio = wordAudio(word);
    if (audio) playAudio(`word-${word}`, audio);

    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handleSelectColor = (colorKey) => {
    if (!selectedWord || showAnswers || correctWords.includes(selectedWord))
      return;

    setAnswers((prev) => ({
      ...prev,
      [selectedWord]: colorKey,
    }));

    setSelectedWord(null);
    setCheckedWords((previous) =>
      previous.filter((word) => word !== selectedWord),
    );
  };

  const checkAnswers = () => {
    if (showAnswers || correctWords.length === Object.keys(CORRECT).length)
      return;

    const allWords = Object.keys(CORRECT);

    if (allWords.some((w) => !answers[w])) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    allWords.forEach((w) => {
      if (answers[w] === CORRECT[w]) score++;
    });
    setCorrectWords(allWords.filter((word) => answers[word] === CORRECT[word]));
    setCheckedWords(allWords);

    const total = allWords.length;

    if (score === total) ValidationAlert.success(`Score: ${score}/${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score}/${total}`);
    else ValidationAlert.error(`Score: ${score}/${total}`);
  };

  const reset = () => {
    setAnswers({});
    setSelectedWord(null);
    setCheckedWords([]);
    setCorrectWords([]);
    setShowAnswers(false);
    stopAudio();
  };

  const showAnswer = () => {
    setAnswers(CORRECT);
    setCheckedWords(Object.keys(CORRECT));
    setCorrectWords(Object.keys(CORRECT));
    setShowAnswers(true);
    setSelectedWord(null);
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
      <div className="div-forall" style={{ gap: "25px" }}>
        <ExerciseHeaderReview
          sectionLetter="D"
          title={
            <>
              Color each square according to the{" "}
              <span style={{ color: "#2e3192" }}>vowel sound</span> you hear in
              the word.
            </>
          }
          subTitle="Listen to each word, identify its target sound, then apply the matching color carefully."
        />

        {/* COLOR TABLE */}
        <table className="border-1 border-gray-500 text-center  w-full">
          <tbody>
            <tr>
              <td className="border px-3 py-2">
                <button
                  type="button"
                  className="unit2-audio-control unit2-interactive"
                  onClick={() =>
                    playAudio("header-color", audioEndingWith("_color.mp3"))
                  }
                >
                  color
                  <Unit2PlayingAudioIcon
                    active={activeAudioKey === "header-color"}
                  />
                </button>
              </td>
              {COLORS.map((c) => (
                <td
                  key={c.key}
                  className="border text-[18px]"
                  style={{ background: c.color, width: 80, height: 40 }}
                />
              ))}
            </tr>

            <tr>
              <td className="border px-3 py-2">
                <button
                  type="button"
                  className="unit2-audio-control unit2-interactive"
                  onClick={() =>
                    playAudio("header-sound", audioEndingWith("_sound.mp3"))
                  }
                >
                  sound
                  <Unit2PlayingAudioIcon
                    active={activeAudioKey === "header-sound"}
                  />
                </button>
              </td>
              {COLORS.map((c) => (
                <td key={c.key} className="border px-2 text-[18px]">
                  <button
                    type="button"
                    className="unit2-audio-control unit2-interactive"
                    onClick={() =>
                      playAudio(`sound-${c.key}`, soundAudio(c.key))
                    }
                  >
                    {c.key}
                    <Unit2PlayingAudioIcon
                      active={activeAudioKey === `sound-${c.key}`}
                    />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* WORDS */}
        <div className="flex flex-col gap-10 mt-6 mb-10 w-full z-0">
          {" "}
          {WORDS.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-9 border-1 border-orange-400 rounded-xl overflow-visible"
            >
              {row.map((word) => {
                const colorKey = answers[word];
                const colorObj = COLORS.find((c) => c.key === colorKey);

                const isSelected = selectedWord === word;

                const isWrong =
                  checkedWords.includes(word) &&
                  colorKey &&
                  colorKey !== CORRECT[word];

                return (
                  <div key={word} className="relative overflow-visible">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-disabled={showAnswers || correctWords.includes(word)}
                      onClick={() => handleWordClick(word)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleWordClick(word);
                        }
                      }}
                      className="unit2-audio-control unit2-interactive relative py-5 text-lg font-semibold flex items-center justify-center cursor-pointer transition-all"
                      style={{
                        backgroundColor: colorObj?.color || "white",
                        border: isSelected
                          ? "3px solid #F79530"
                          : "1px solid #F79530",
                        transform: isSelected ? "scale(1.05)" : "",
                        boxShadow: isSelected
                          ? "0 0 10px rgba(247,149,48,0.6)"
                          : "none",
                        zIndex: isSelected ? 20 : 1,
                      }}
                    >
                      {word}
                      <Unit2PlayingAudioIcon
                        active={activeAudioKey === `word-${word}`}
                      />

                      {isWrong && (
                        <div
                          className="absolute -top-2 -right-2 w-[22px] h-[22px] z-[9999]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-none"
                        >
                          ✕
                        </div>
                      )}
                    </div>

                    {/* COLOR PALETTE فوق البوكس */}
                    {isSelected &&
                      !showAnswers &&
                      !correctWords.includes(word) && (
                        <div
                          className="absolute left-1/2 -top-[65px] -translate-x-1/2 z-[9999]
bg-white rounded-xl px-3 py-2 flex gap-2
shadow-[0_10px_25px_rgba(0,0,0,0.2)] border"
                        >
                          {COLORS.map((c) => (
                            <button
                              type="button"
                              key={c.key}
                              onClick={() => handleSelectColor(c.key)}
                              aria-label={`Color ${word} as ${c.key}`}
                              style={{
                                width: 25,
                                height: 25,
                                borderRadius: "50%",
                                background: c.color,
                                cursor: "pointer",
                                border: "2px solid white",
                              }}
                              title={c.key}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <Button
          handleShowAnswer={showAnswer}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review2_Page2_Q2;
