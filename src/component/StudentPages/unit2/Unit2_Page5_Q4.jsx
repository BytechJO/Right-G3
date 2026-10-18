import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 14/Ex C 2.svg";
import ExerciseHeader from "../../ExerciseHeader";
import "./unit2Interactions.css";

const Page8_Q4 = () => {
  const grid = [
    [
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
      "e",
      "l",
      "y",
    ],
    [
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
    ],
    [
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
    ],
    ["z", "a", "q"],
  ];

  const letters = grid;
  const wordsToFind = [
    "they",
    "enjoy",
    "the",
    "food",
    "and",
    "places",
    "there",
  ];
  const correctAnswers = [
    { word: "they", order: 0 },
    { word: "enjoy", order: 1 },
    { word: "the", order: 2 },
    { word: "food", order: 3 },
    { word: "and", order: 4 },
    { word: "places", order: 5 },
    { word: "there", order: 6 },
  ];

  const correctPositions = {
    they: [3, 4, 5, 6], // الصف الأول

    enjoy: [10, 11, 12, 13, 14], // الصف الأول

    the: [18, 19, 20], // الصف الأول

    food: [100 + 3, 100 + 4, 100 + 5, 100 + 6], // الصف الثاني

    and: [100 + 12, 100 + 13, 100 + 14], // الصف الثاني

    places: [100 + 15, 100 + 16, 100 + 17, 100 + 18, 100 + 19, 100 + 20], // الصف الثاني

    there: [200 + 8, 200 + 9, 200 + 10, 200 + 11, 200 + 12], // الصف الثالث
  };

  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [keyboardStart, setKeyboardStart] = useState(null);
  const [keyboardPreview, setKeyboardPreview] = useState([]);
  const [invalidSelection, setInvalidSelection] = useState(false);
  const fullSentence = [
    "they",
    "enjoy",
    "the",
    "food",
    "and",
    "places",
    "there",
  ];
  const handleMouseDown = (index) => {
    if (locked) return;
    setIsDragging(true);
    setSelected([index]);
  };
  const handleMouseEnter = (index) => {
    if (!isDragging || locked) return;

    const lastIndex = selected[selected.length - 1];

    if (index === lastIndex + 1 || index === lastIndex - 1) {
      if (!selected.includes(index)) {
        setSelected((prev) => [...prev, index]);
      }
    }
  };

  const displayedSentence = fullSentence.map((word, index) => {
    const isFound = foundWords.some(
      (foundWord) =>
        correctAnswers.find((c) => c.word === foundWord)?.order === index,
    );

    const SLOT_LENGTH = 7;

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

  const commitSelection = (cells) => {
    const matchedWord = wordsToFind.find((word) => {
      const positions = correctPositions[word];
      if (!positions) return false;

      // تحقق نفس الترتيب
      const isSame =
        positions.length === cells.length &&
        positions.every((pos, i) => pos === cells[i]);

      // تحقق بالعكس (reverse)
      const isReverse =
        positions.length === selected.length &&
        positions
          .slice()
          .reverse()
          .every((pos, i) => pos === cells[i]);

      return isSame || isReverse;
    });
    if (matchedWord && !foundWords.includes(matchedWord)) {
      setFoundWords((prev) => [...prev, matchedWord]);
      setColoredCells((prev) => [...prev, ...cells]);
    } else if (cells.length) {
      setInvalidSelection(false);
      window.requestAnimationFrame(() => setInvalidSelection(true));
    }
  };

  const handleMouseUp = () => {
    if (locked) return;
    setIsDragging(false);
    commitSelection(selected);

    setSelected([]);
  };

  const handleCellKeyDown = (event, rowIndex, colIndex) => {
    if (locked) return;
    const index = rowIndex * 100 + colIndex;
    if (event.key === "Escape") {
      event.preventDefault();
      setKeyboardStart(null);
      setKeyboardPreview([]);
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (keyboardStart === null) {
      setKeyboardStart(index);
      setKeyboardPreview([index]);
      return;
    }
    commitSelection(keyboardPreview);
    setKeyboardStart(null);
    setKeyboardPreview([]);
  };

  const handleCellFocus = (rowIndex, colIndex) => {
    if (keyboardStart === null) return;
    const startRow = Math.floor(keyboardStart / 100);
    if (startRow !== rowIndex) return;
    const startCol = keyboardStart % 100;
    const direction = colIndex >= startCol ? 1 : -1;
    const cells = [];
    for (
      let current = startCol;
      direction > 0 ? current <= colIndex : current >= colIndex;
      current += direction
    ) {
      cells.push(rowIndex * 100 + current);
    }
    setKeyboardPreview(cells);
  };

  const reset = () => {
    setSelected([]);
    setFoundWords([]);
    setColoredCells([]);
    setLocked(false);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setInvalidSelection(false);
  };

  const showAnswers = () => {
    let allCells = [];
    wordsToFind.forEach((word) => {
      if (correctPositions[word]) {
        allCells.push(...correctPositions[word]);
      }
    });
    setFoundWords(wordsToFind);
    setColoredCells(allCells);
    setSelected([]);
    setLocked(true);
    setKeyboardStart(null);
    setKeyboardPreview([]);
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
    setLocked(score === total);
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
        <ExerciseHeader
          sectionLetter="C"
          title="What do Tom and his family enjoy about France in Vacation in France on page 11?"
          subTitle="Find the hidden words in order, then read the completed answer before checking."
        />

        {/* Words List */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-5 border-2 border-dashed border-gray-300 rounded-[14px] p-3">
          {wordsToFind.map((word) => (
            <span
              key={word}
              className={`px-3 py-1.5 rounded-[10px] border-2 border-[#2c5287] font-semibold transition duration-200 ${
                foundWords.includes(word)
                  ? "bg-[#2c5287] text-white border-[#2c5287]"
                  : "bg-white text-black"
              }`}
              style={{ fontSize: "clamp(12px, 2vw, 15px)" }}
            >
              {word}
            </span>
          ))}
        </div> */}

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/* Grid Wrapper */}
          <div
            className="px-4 pt-4 pb-5"
            style={{ width: "fit-content", margin: "0 auto" }}
          >
            <div
              className={`bg-[#daf5ff] mb-10 rounded-[15px] p-2 sm:p-[15px] ${
                invalidSelection ? "unit2-invalid-drop-shake" : ""
              }`}
              onAnimationEnd={() => setInvalidSelection(false)}
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
                    const isKeyboardPreview = keyboardPreview.includes(index);

                    return (
                      <button
                        type="button"
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
                        onKeyDown={(event) =>
                          handleCellKeyDown(event, rowIndex, colIndex)
                        }
                        onFocus={() => handleCellFocus(rowIndex, colIndex)}
                        aria-label={`${letter}, row ${rowIndex + 1}, position ${colIndex + 1}`}
                        className={`
                          unit2-interactive
                          flex items-center justify-center mb-2
                          cursor-pointer
                          transition
                          ${isSelected ? "bg-[#ffd54f] rounded-sm" : ""}
                          ${isFound ? "bg-[#4caf50] text-white rounded-sm" : ""}
                          ${isKeyboardPreview ? "unit2-keyboard-preview" : ""}
                        `}
                        style={{
                          width: "clamp(16px, 2.5vw, 25px)", // 🔥 عرض ديناميكي
                          height: "clamp(22px, 3.5vw, 35px)", // 🔥 طول ديناميكي
                          fontSize: "clamp(12px, 1.8vw, 18px)", // 🔥 حجم خط ديناميكي
                          background: isFound
                            ? "#4caf50"
                            : isSelected || isKeyboardPreview
                              ? "#ffd54f"
                              : "transparent",
                        }}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center">
              <img
                src={img1}
                alt="An airplane flying toward France"
                style={{
                  width: "clamp(40px, 10vw, 100px)", // 🔥 حجم ديناميكي للصور
                  height: "auto",
                }}
              />
              <input
                className="answer-input-CB-unit3-p5-q4"
                value={displayedSentence.join(" ")}
                readOnly
                style={{ fontFamily: "monospace", width: "100%" }} // 🔥 مهم جدا
              />

              <img
                src={img2}
                alt="The Eiffel Tower in France"
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
