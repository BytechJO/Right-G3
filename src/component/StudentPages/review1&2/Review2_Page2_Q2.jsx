import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";

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
  const [locked, setLocked] = useState(false);

  const [selectedWord, setSelectedWord] = useState(null);

  const handleWordClick = (word) => {
    if (locked) return;

    setSelectedWord((prev) => (prev === word ? null : word));
  };

  const handleSelectColor = (colorKey) => {
    if (!selectedWord || locked) return;

    setAnswers((prev) => ({
      ...prev,
      [selectedWord]: colorKey,
    }));

    setSelectedWord(null);
  };

  const checkAnswers = () => {
    if (locked) return;

    const allWords = Object.keys(CORRECT);

    if (allWords.some((w) => !answers[w])) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    allWords.forEach((w) => {
      if (answers[w] === CORRECT[w]) score++;
    });

    const total = allWords.length;

    if (score === total) ValidationAlert.success(`Score: ${score}/${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score}/${total}`);
    else ValidationAlert.error(`Score: ${score}/${total}`);

    setLocked(true);
  };

  const reset = () => {
    setAnswers({});
    setSelectedWord(null);
    setLocked(false);
  };

  const showAnswer = () => {
    setAnswers(CORRECT);
    setLocked(true);
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
      <div className="div-forall" style={{ gap: "45px" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "20px" }}>D</span>
          Color each square according to the{" "}
          <span className="text-blue-800 w-30">vowel sound</span> you hear in the
          word.
        </h5>

        {/* COLOR TABLE */}
        <table className="border-1 border-gray-500 text-center">
          <tbody>
            <tr>
              <td className="border px-3 py-2">color</td>
              {COLORS.map((c) => (
                <td
                  key={c.key}
                  className="border text-[18px]"
                  style={{ background: c.color, width: 80, height: 40 }}
                />
              ))}
            </tr>

            <tr>
              <td className="border px-3 py-2">sound</td>
              {COLORS.map((c) => (
                <td key={c.key} className="border px-2 text-[18px]">
                  {c.key}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* WORDS */}
        <div className="flex flex-col gap-10 mt-6 w-full">
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
                  locked && colorKey && colorKey !== CORRECT[word];

                return (
                  <div key={word} className="relative overflow-visible">
                    <div
                      onClick={() => handleWordClick(word)}
                      className="relative py-5 text-lg font-semibold flex items-center justify-center cursor-pointer transition-all"
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
                    {isSelected && !locked && (
                      <div
                        className="absolute left-1/2 -top-[65px] -translate-x-1/2 z-[9999]
bg-white rounded-xl px-3 py-2 flex gap-2
shadow-[0_10px_25px_rgba(0,0,0,0.2)] border"
                      >
                        {COLORS.map((c) => (
                          <div
                            key={c.key}
                            onClick={() => handleSelectColor(c.key)}
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
