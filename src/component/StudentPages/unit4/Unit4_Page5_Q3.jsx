import React, { useState, useEffect } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex C 2.svg";

const Unit4_Page5_Q3 = () => {
  const grid = [
    "t",
    "u",
    "e",
    "j",
    "k",
    "h",
    "t",
    "h",
    "e",
    "b",
    "v",
    "e",
    "d",
    "v",
    "e",
    "d",
    "n",
    "a",
    "m",
    "e",
    "p",
    "l",
    "o",
    "f",
    "y",
    "u",
    "j",
    "u",
    "l",
    "i",
    "a",
    "s",
    "q",
    "w",
    "a",
    "c",
    "v",
    "x",
    "z",
    "c",
    "v",
    "o",
    "s",
    "c",
    "h",
    "o",
    "o",
    "l",
    "k",
    "i",
    "s",
    "f",
    "r",
    "t",
    "h",
    "e",
    "s",
    "x",
    "z",
    "l",
    "o",
    "n",
    "d",
    "o",
    "n",
    "e",
    "h",
    "g",
    "m",
    "c",
    "o",
    "u",
    "r",
    "t",
    "j",
    "r",
    "e",
    "w",
    "d",
    "c",
    "s",
    "c",
    "h",
    "o",
    "o",
    "l",
    "m",
    "b",
    "v",
  ];

  const letters = grid;
  const wordsToFind = [
    "the",
    "name",
    "of",
    "julia",
    "school",
    "is",
    "london",
    "court",
    "school",
  ];
  const [locked, setLocked] = useState(false);
  const [sentence, setSentence] = useState("");
  const [selected, setSelected] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);

  const handleClick = (letter, index) => {
    if (locked) return;
    if (coloredCells.includes(index)) return;

    if (selected.includes(index)) {
      const cutIndex = selected.indexOf(index);
      const newSelected = selected.slice(0, cutIndex);
      const newWord = newSelected.map((i) => letters[i]).join("");

      setSelected(newSelected);
      setCurrentWord(newWord);
      return;
    }

    setSelected((prev) => [...prev, index]);
    setCurrentWord((prev) => prev + letter);
  };

  useEffect(() => {
    if (
      wordsToFind.includes(currentWord) &&
      !foundWords.includes(currentWord)
    ) {
      setFoundWords((prev) => [...prev, currentWord]);
      setColoredCells((prev) => [...prev, ...selected]);

      setSentence((prev) =>
        prev === "" ? currentWord : prev + " " + currentWord,
      );

      setSelected([]);
      setCurrentWord("");
    }
  }, [currentWord]);

  const reset = () => {
    setSelected([]);
    setCurrentWord("");
    setFoundWords([]);
    setColoredCells([]);
    setSentence("");
    setLocked(false);
  };
  const showAnswers = () => {
    let allCells = [];
    const fullString = letters.join("");

    wordsToFind.forEach((word) => {
      const startIndex = fullString.indexOf(word);

      if (startIndex !== -1) {
        for (let i = 0; i < word.length; i++) {
          allCells.push(startIndex + i);
        }
      }
    });

    setFoundWords(wordsToFind);
    setColoredCells(allCells);
    setSelected([]);
    setCurrentWord("");
    setSentence(wordsToFind.join(" "));
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const total = wordsToFind.length;
    const score = foundWords.length;

    if (score === 0) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    if (score < total) {
      ValidationAlert.warning(`
      <div style="font-size:20px;text-align:center;">
        <b style="color:orange;">Score: ${score} / ${total}</b>
      </div>
    `);
    } else {
      ValidationAlert.success(`
      <div style="font-size:20px;text-align:center;">
        <b style="color:green;">Score: ${score} / ${total}</b>
      </div>
    `);
    }

    setLocked(true); // 🔒 قفل بعد التصحيح
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
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            C
          </span>
          What color gloves does the shopkeeper have in Picky Shopper on page
          23?
        </h5>

        <div>
          {/* Words */}
          <div className="flex flex-wrap justify-center gap-5 mb-5 border-2 border-dashed border-gray-300 rounded-[14px] p-3">
            {wordsToFind.map((word) => (
              <span
                key={word}
                className={`
        px-[18px] py-2
        rounded-[10px]
        border-2 border-[#2c5287]
        text-[15px] font-semibold
        transition duration-200
        ${
          foundWords.includes(word)
            ? "bg-[#2c5287] text-white border-[#2c5287]"
            : "bg-white text-black"
        }
      `}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Grid Wrapper */}
          <div className="border-2 border-[#f28c63] px-[35px] pt-[25px] pb-[30px] w-full">
            <div className="bg-[#daf5ff] rounded-[15px] px-[25px] py-[15px] flex flex-wrap gap-1">
              {letters.map((letter, index) => {
                const isSelected = selected.includes(index);
                const isFound = coloredCells.includes(index);

                return (
                  <span
                    key={index}
                    onClick={() => handleClick(letter, index)}
                    className={`
            w-[35px] h-[35px]
            flex items-center justify-center
            text-[20px]
            cursor-pointer
            transition
            ${isSelected ? "bg-[#ffd54f] rounded-sm p-2.5" : ""}
            ${isFound ? "bg-[#4caf50] text-white rounded-sm p-2.5" : ""}
          `}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <img
                src={img1}
                alt="start"
                style={{
                  width: "12vw",
                  height: "auto",
                }}
              />

              <div
                style={{
                  flex: 1,
                  borderBottom: "2px solid black",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  value={sentence}
                  readOnly
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "18px",
                  }}
                />
              </div>
              <img
                src={img2}
                alt="end"
                style={{
                  width: "12vw",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit4_Page5_Q3;
