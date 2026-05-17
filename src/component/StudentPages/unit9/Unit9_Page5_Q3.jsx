import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Ex C 2.svg";

const Page8_Q4 = () => {
  const grid = [
    [
      "u",
      "t",
      "y",
      "k",
      "t",
      "h",
      "e",
      "r",
      "e",
      "o",
      "o",
      "l",
      "k",
      "i",
      "u",
      "w",
      "a",
      "s",
      "d",
      "x",
      "s",
      "a",
      "b",
      "i",
      "c",
    ],
    [
      "v",
      "r",
      "e",
      "b",
      "i",
      "g",
      "k",
      "l",
      "o",
      "o",
      "p",
      "f",
      "a",
      "t",
      "q",
      "e",
      "r",
      "w",
      "s",
      "f",
      "g",
      "r",
      "o",
      "f",
      "h",
      "g",
    ],
    [
      "l",
      "k",
      "c",
      "a",
      "t",
      "o",
      "m",
      "n",
      "b",
      "q",
      "a",
      "i",
      "n",
      "c",
      "x",
      "f",
      "d",
      "e",
      "r",
      "t",
      "h",
      "e",
      "i",
      "y",
      "b",
    ],
    ["v", "u", "h", "j", "p", "a", "r", "k", "s", "w", "g", "h", "f", "r", "e"],
  ];

  const letters = grid;

  const wordsToFind = [
    { id: "there", word: "there" },
    { id: "was", word: "was" },
    { id: "a", word: "a" },
    { id: "big", word: "big" },
    { id: "fat", word: "fat" },
    { id: "cat", word: "cat" },
    { id: "in", word: "in" },
    { id: "the", word: "the" },
    { id: "park", word: "park" },
  ];
  const correctPositions = {
    there: [4, 5, 6, 7, 8],
    was: [15, 16, 17],
    a: [21],
    big: [100 + 3, 100 + 4, 100 + 5],
    fat: [100 + 11, 100 + 12, 100 + 13],
    cat: [200 + 2, 200 + 3, 200 + 4],
    in: [200 + 11, 200 + 12],
    the: [200 + 19, 200 + 20, 200 + 21],

    park: [300 + 4, 300 + 5, 300 + 6, 300 + 7],
  };
  const correctAnswers = [
    { word: "there", order: 0 },
    { word: "was", order: 1 },
    { word: "a", order: 2 },
    { word: "big", order: 3 },
    { word: "fat", order: 4 },
    { word: "cat", order: 5 },
    { word: "in", order: 6 },
    { word: "the", order: 7 },
    { word: "park", order: 8 },
  ];

  const [locked, setLocked] = useState(false);
  const [sentence, setSentence] = useState("");
  const [selected, setSelected] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fullSentence = [
    "there",
    "was",
    "a",
    "big",
    "fat",
    "cat",
    "in",
    "the",
    "park",
  ];

  const handleMouseDown = (index) => {
    if (locked) return;

    const row = Math.floor(index / 100);
    const col = index % 100;

    setIsDragging(true);
    setSelected([index]);
    setCurrentWord(letters[row][col]);
  };
  const handleMouseEnter = (index) => {
    if (!isDragging || locked) return;

    const lastIndex = selected[selected.length - 1];

    if (index === lastIndex + 1 || index === lastIndex - 1) {
      if (!selected.includes(index)) {
        const row = Math.floor(index / 100);
        const col = index % 100;

        setSelected((prev) => [...prev, index]);
        setCurrentWord((prev) => prev + letters[row][col]);
      }
    }
  };
  const displayedSentence = fullSentence.map((word, index) => {
    const isFound = foundWords.some(
      (foundWord) =>
        correctAnswers.find((c) => c.word === foundWord)?.order === index,
    );

    const SLOT_LENGTH = 8;

    if (isFound) {
      return word.padEnd(SLOT_LENGTH, "");
    }

    return "_".repeat(SLOT_LENGTH);
  });
  const handleTouchMove = (e) => {
    if (!isDragging || locked) return;
    e.preventDefault(); // منع التمرير في الصفحة أثناء السحب

    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!element) return;

    const index = element.getAttribute("data-index");
    if (index !== null) {
      handleMouseEnter(Number(index));
    }
  };

  const handleMouseUp = () => {
    if (locked) return;
    setIsDragging(false);

    const reversedWord = currentWord.split("").reverse().join("");

    const matchedWord = wordsToFind.find(
      (item) =>
        (item.word === currentWord || item.word === reversedWord) &&
        !foundWords.includes(item.id),
    );

    if (matchedWord && !foundWords.includes(matchedWord.id)) {
      setFoundWords((prev) => [...prev, matchedWord.id]);
      setColoredCells((prev) => [...prev, ...selected]);
      setSentence(
        wordsToFind
          .filter((item) => [...foundWords, matchedWord.id].includes(item.id))
          .map((item) => item.word)
          .join(" "),
      );
    }

    setSelected([]);
    setCurrentWord("");
  };

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
    wordsToFind.forEach((item) => {
      if (correctPositions[item.id]) {
        allCells.push(...correctPositions[item.id]);
      }
    });
    setFoundWords(wordsToFind.map((item) => item.id));
    setColoredCells(allCells);
    setSelected([]);
    setCurrentWord("");
    setSentence(wordsToFind.map((item) => item.word).join(" "));
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

        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div className="div-forall">
        <h5 className="header-title-page8 pb-2.5">
          <span className="ex-A" style={{ marginRight: "10px" }}>
            C
          </span>
          What kind of animal was in the park in the
afternoon in A Brave Mouse on page 77?
        </h5>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/* Grid Wrapper */}
          <div
            className="px-4 pt-4 pb-5"
            style={{ width: "fit-content", margin: "0 auto" }}
          >
            <div
              className="bg-[#daf5ff] rounded-[15px] p-2 sm:p-[15px] mb-10"
              style={{
                userSelect: "none",
                width: "max-content",
                touchAction: "none", // 🔥 الحل السحري لمنع تحريك الصفحة أثناء السحب على الآيباد
                WebkitOverflowScrolling: "touch",
              }}
            >
              {letters.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    gap: "clamp(1px, 0.3vw, 4px)", // مسافة تتغير حسب الشاشة
                    width: "fit-content",
                  }}
                >
                  {row.map((letter, colIndex) => {
                    const index = rowIndex * 100 + colIndex;
                    const isSelected = selected.includes(index);
                    const isFound = coloredCells.includes(index);

                    return (
                      <span
                        key={index}
                        data-index={index}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseUp={handleMouseUp}
                        onDragStart={(e) => e.preventDefault()}
                        onTouchStart={(e) => {
                          e.preventDefault(); // 🔥 منع تحريك الصفحة عند بدء اللمس
                          handleMouseDown(index);
                        }}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleMouseUp}
                        className={`
                          flex items-center justify-center
                          cursor-pointer
                          transition
                          ${isSelected ? "bg-[#ffd54f] rounded-sm" : ""}
                          ${isFound ? "bg-[#4caf50] text-white rounded-sm" : ""}
                        `}
                        style={{
                          width: "clamp(16px, 2.5vw, 25px)", // 🔥 عرض ديناميكي
                          height: "clamp(22px, 3.5vw, 35px)", // 🔥 طول ديناميكي
                          fontSize: "clamp(12px, 1.8vw, 18px)", // 🔥 حجم خط ديناميكي
                        }}
                      >
                        {letter}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center">
              <img
                src={img1}
                alt="start"
                style={{
                  width: "clamp(40px, 10vw, 100px)", // 🔥 حجم ديناميكي للصور
                  height: "auto",
                }}
              />

              <input
                className="answer-input-CB-unit3-p5-q4"
                value={displayedSentence.join(" ")}
                readOnly
                style={{ fontSize: "17.5px", fontFamily: "monospace" }} // 🔥 مهم جدا
              />

              <img
                src={img2}
                alt="end"
                style={{
                  width: "clamp(40px, 10vw, 100px)", // 🔥 حجم ديناميكي للصور
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

export default Page8_Q4;
