import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex C 2.svg";

const Page8_Q4 = () => {
  const grid = [
    [
      "n",
      "e",
      "h",
      "j",
      "h",
      "e",
      "o",
      "k",
      "j",
      "h",
      "q",
      "w",
      "i",
      "l",
      "l",
      "f",
      "r",
      "t",
      "y",
      "b",
      "n",
      "v",
      "h",
      "a",
      "v",
      "e",
      "j",
    ],
    [
      "g",
      "h",
      "t",
      "o",
      "k",
      "x",
      "z",
      "c",
      "s",
      "e",
      "l",
      "l",
      "i",
      "j",
      "k",
      "n",
      "v",
      "d",
      "e",
      "h",
      "i",
      "s",
      "q",
      "c",
      "b",
      "h",
    ],
    [
      "s",
      "k",
      "a",
      "t",
      "e",
      "b",
      "o",
      "a",
      "r",
      "d",
      "l",
      "k",
      "a",
      "n",
      "d",
      "p",
      "l",
      "u",
      "v",
      "i",
      "d",
      "e",
      "o",
      "n",
      "d",
      "o",
      "b",
    ],
    ["g", "g", "a", "m", "e", "u", "j", "s", "e", "t", "m", "j"],
  ];

  const letters = grid;

  const wordsToFind = [
    { id: "he", word: "he" },
    { id: "will", word: "will" },
    { id: "have", word: "have" },
    { id: "to", word: "to" },
    { id: "sell", word: "sell" },
    { id: "his", word: "his" },
    { id: "skateboard", word: "skateboard" },
    { id: "and", word: "and" },
    { id: "video", word: "video" },
    { id: "game", word: "game" },
    { id: "set", word: "set" },
  ];

  const correctAnswers = [
    { word: "he", order: 0 },
    { word: "will", order: 1 },
    { word: "have", order: 2 },
    { word: "to", order: 3 },
    { word: "sell", order: 4 },
    { word: "his", order: 5 },
    { word: "skateboard", order: 6 },
    { word: "and", order: 7 },
    { word: "video", order: 8 },
    { word: "game", order: 9 },
    { word: "set", order: 10 },
  ];

  const correctPositions = {
    he: [4, 5],

    will: [11, 12, 13, 14],

    have: [22, 23, 24, 25],

    to: [100 + 2, 100 + 3],

    sell: [100 + 8, 100 + 9, 100 + 10, 100 + 11],

    his: [100 + 19, 100 + 20, 100 + 21],

    skateboard: [
      200 + 0,
      200 + 1,
      200 + 2,
      200 + 3,
      200 + 4,
      200 + 5,
      200 + 6,
      200 + 7,
      200 + 8,
      200 + 9,
    ],
    and: [200 + 12, 200 + 13, 200 + 14],
    video: [200 + 18, 200 + 19, 200 + 20, 200 + 21, 200 + 22],

    game: [300 + 1, 300 + 2, 300 + 3, 300 + 4],

    set: [300 + 7, 300 + 8, 300 + 9],
  };

  const [locked, setLocked] = useState(false);
  const [sentence, setSentence] = useState("");
  const [selected, setSelected] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fullSentence = [
    "he",
    "will",
    "have",
    "to",
    "sell",
    "his",
    "skateboard",
    "and",
    "video",
    "game",
    "set",
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
        <h5 className="header-title-page8 pb-2.5"  style={{ whiteSpace: "wrap" ,width:"100%"}}>
          <span className="ex-A" style={{ marginRight: "10px" }}>
            C
          </span>
          What does Tom have to sell in order to buy a new bike in Preparing for
          a Garage Sale on page 83?
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
