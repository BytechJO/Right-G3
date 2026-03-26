import React, { useState, useEffect } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/test6.png";
import img2 from "../../../assets/imgs/test6.png";

const Unit2_Page5_Q4 = () => {
  const grid = [
    "h",
    "j",
    "l",
    "t",
    "h",
    "e",
    "y",
    "o",
    "m",
    "l",
    "e",
    "n",
    "j",
    "o",
    "y",
    "r",
    "w",
    "s",
    "t",
    "h",
    "e",
    "l",
    "v",
    "v",
    "e",
    "l",
    "y",
    "u",
    "t",
    "y",
    "f",
    "o",
    "o",
    "d",
    "c",
    "h",
    "p",
    "u",
    "l",
    "a",
    "n",
    "d",
    "p",
    "l",
    "a",
    "c",
    "e",
    "s",
    "n",
    "d",
    "r",
    "a",
    "n",
    "d",
    "d",
    "u",
    "y",
    "g",
    "r",
    "u",
    "a",
    "t",
    "t",
    "h",
    "e",
    "r",
    "e",
    "o",
    "k",
    "u",
    "i",
    "f",
    "o",
    "o",
    "d",
    "q",
    "a",
    "u",
    "t",
    "y",
    "m",
    "z",
    "a",
    "q",
  ];

  const letters = grid;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wordsToFind = [
    "they",
    "enjoy",
    "the",
    "food",
    "and",
    "places",
    "there",
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const correctPositions = {
    they: [3, 4, 5, 6],
    enjoy: [10, 11, 12, 13, 14],
    the: [18, 19, 20],
    food: [30, 31, 32, 33],
    and: [39, 40, 41],
    places: [42, 43, 44, 45, 46, 47],
    there: [62, 63, 64, 65, 66],
  };

  const [locked, setLocked] = useState(false);
  const [sentence, setSentence] = useState("");
  const [selected, setSelected] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);

  const handleClick = (letter, index) => {
    if (locked) return;

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
    const matchedWord = wordsToFind.find((word) => currentWord === word);

    if (matchedWord && !foundWords.includes(matchedWord)) {
      const correctIndices = correctPositions[matchedWord];

      const isPositionCorrect =
        correctIndices &&
        correctIndices.length === selected.length &&
        correctIndices.every((val, idx) => val === selected[idx]);

      if (isPositionCorrect) {
        setFoundWords((prev) => [...prev, matchedWord]);
        setColoredCells((prev) => Array.from(new Set([...prev, ...selected])));
        setSentence((prev) =>
          prev === "" ? matchedWord : prev + " " + matchedWord,
        );

        setSelected([]);
        setCurrentWord("");
      }
    }
  }, [currentWord, selected, foundWords, wordsToFind, correctPositions]);
  const reset = () => {
    setSelected([]);
    setCurrentWord("");
    setFoundWords([]);
    setColoredCells([]);
    setSentence("");
    setLocked(false);
  };

  // --- 3. تعديل إظهار الإجابات ---
  const showAnswers = () => {
    let allCells = [];

    // نستخدم المواقع المخزنة مباشرة
    wordsToFind.forEach((word) => {
      if (correctPositions[word]) {
        allCells.push(...correctPositions[word]);
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
      ValidationAlert.info();
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
      <h5 className="header-title-page8 pb-2.5">
        <span className="ex-A" style={{ marginRight: "20px" }}>
          C
        </span>
        What do Tom and his family enjoy about France in Vacation in France on
        page 11?
      </h5>

      <div style={{ width: "60%" }}>
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
  );
};

export default Unit2_Page5_Q4;
