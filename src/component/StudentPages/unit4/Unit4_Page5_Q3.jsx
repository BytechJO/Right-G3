import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex C 2.svg";
import "./unit4Interactions.css";

const Page8_Q4 = () => {
  const grid = [
    [
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
    ],
    [
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
    ],
    [
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
    ],
    ["w", "d", "c", "s", "c", "h", "o", "o", "l", "m", "b", "v"],
  ];

  const letters = grid;
  const wordsToFind = [
    { id: "the", word: "the" },
    { id: "name", word: "name" },
    { id: "of", word: "of" },
    { id: "julias", word: "julias" },
    { id: "school1", word: "school" },
    { id: "is", word: "is" },
    { id: "london", word: "london" },
    { id: "court", word: "court" },
    { id: "school2", word: "school" },
  ];

  const correctPositions = {
    the: [6, 7, 8],

    name: [16, 17, 18, 19],

    of: [22, 23],

    julias: [100 + 0, 100 + 1, 100 + 2, 100 + 3, 100 + 4, 100 + 5],

    school1: [100 + 17, 100 + 18, 100 + 19, 100 + 20, 100 + 21, 100 + 22],

    is: [100 + 24, 100 + 25],

    london: [200 + 8, 200 + 9, 200 + 10, 200 + 11, 200 + 12, 200 + 13],

    court: [200 + 18, 200 + 19, 200 + 20, 200 + 21, 200 + 22],

    school2: [300 + 3, 300 + 4, 300 + 5, 300 + 6, 300 + 7, 300 + 8],
  };
  const correctAnswers = [
    { word: "the", order: 0 },
    { word: "name", order: 1 },
    { word: "of", order: 2 },
    { word: "julias", order: 3 },
    { word: "school1", order: 4 },
    { word: "is", order: 5 },
    { word: "london", order: 6 },
    { word: "court", order: 7 },
    { word: "school2", order: 8 },
  ];
  const [locked, setLocked] = useState(false);
  const [foundWords, setFoundWords] = useState([]);
  const [pointerSelection, setPointerSelection] = useState([]);
  const [pointerRow, setPointerRow] = useState(null);
  const [keyboardStart, setKeyboardStart] = useState(null);
  const [keyboardPreview, setKeyboardPreview] = useState([]);
  const [shakeInvalidSelection, setShakeInvalidSelection] = useState(false);
  const fullSentence = [
    "the",
    "name",
    "of",
    "julias",
    "school",
    "is",
    "london",
    "court",
    "school",
  ];

  const foundCells = new Set(
    foundWords.flatMap((word) => correctPositions[word] || []),
  );
  const buildRange = (row, startColumn, endColumn) => {
    const direction = endColumn >= startColumn ? 1 : -1;
    const cells = [];
    for (let column = startColumn; direction > 0 ? column <= endColumn : column >= endColumn; column += direction) {
      cells.push(row * 100 + column);
    }
    return cells;
  };
  const commit = (cells) => {
    const matched = wordsToFind.find((item) => {
      const positions = correctPositions[item.id];
      if (!positions || positions.length !== cells.length) return false;
      const forward = positions.every((position, index) => position === cells[index]);
      const reverse = [...positions].reverse().every((position, index) => position === cells[index]);
      return forward || reverse;
    });
    if (!matched) return false;
    if (!foundWords.includes(matched.id)) setFoundWords((previous) => [...previous, matched.id]);
    return true;
  };
  const showInvalidSelection = () => {
    setShakeInvalidSelection(false);
    window.requestAnimationFrame(() => setShakeInvalidSelection(true));
  };
  const startPointer = (row, column) => {
    if (locked) return;
    setPointerRow(row);
    setPointerSelection([row * 100 + column]);
  };
  const extendPointer = (row, column) => {
    if (locked || pointerRow !== row || !pointerSelection.length) return;
    setPointerSelection(buildRange(row, pointerSelection[0] % 100, column));
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
  const endPointer = () => {
    if (locked) return;
    if (pointerSelection.length && !commit(pointerSelection)) showInvalidSelection();
    setPointerSelection([]);
    setPointerRow(null);
  };

  const reset = () => {
    setFoundWords([]);
    setPointerSelection([]);
    setPointerRow(null);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(false);
    setShakeInvalidSelection(false);
  };

  const showAnswers = () => {
    setFoundWords(wordsToFind.map((item) => item.id));
    setPointerSelection([]);
    setPointerRow(null);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(true);
  };
  const handleCellKeyDown = (event, row, column) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setKeyboardStart(null);
      setKeyboardPreview([]);
      return;
    }
    if (locked || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    if (!keyboardStart || keyboardStart.row !== row) {
      setKeyboardStart({ row, column });
      setKeyboardPreview([row * 100 + column]);
      return;
    }
    const cells = buildRange(row, keyboardStart.column, column);
    if (!commit(cells)) showInvalidSelection();
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
    if (score === total) setLocked(true);
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
        <ExerciseHeader sectionLetter="C" title="What's the name of Julia's school in Helen and Stella Get an e-Mail on page 29?" subTitle="Find the hidden school-name words in order, then read the completed name." />

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {/* Grid Wrapper */}
          <div
            className="px-4 pt-4 pb-5"
            style={{ width: "fit-content", margin: "0 auto" }}
          >
            <div
              className={`bg-[#daf5ff] rounded-[15px] p-2 sm:p-[15px] mb-10 ${shakeInvalidSelection ? "unit4-invalid-selection-shake" : ""}`}
              onAnimationEnd={() => setShakeInvalidSelection(false)}
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
                    const isSelected = pointerSelection.includes(index);
                    const keyboardActive = keyboardPreview.includes(index);
                    const isFound = foundCells.has(index);

                    return (
                      <button
                        type="button"
                        key={index}
                        data-row={rowIndex}
                        data-column={colIndex}
                        aria-label={`Letter ${letter}, row ${rowIndex + 1}, column ${colIndex + 1}`}
                        onKeyDown={(event) => handleCellKeyDown(event, rowIndex, colIndex)}
                        onFocus={() => {
                          if (keyboardStart?.row === rowIndex) {
                            setKeyboardPreview(buildRange(rowIndex, keyboardStart.column, colIndex));
                          }
                        }}
                        onMouseDown={() => startPointer(rowIndex, colIndex)}
                        onMouseEnter={() => extendPointer(rowIndex, colIndex)}
                        onMouseUp={endPointer}
                        onDragStart={(e) => e.preventDefault()}
                        onTouchStart={() => startPointer(rowIndex, colIndex)}
                        onTouchMove={(event) => {
                          event.preventDefault();
                          const touch = event.touches[0];
                          const element = document.elementFromPoint(touch.clientX, touch.clientY);
                          const nextRow = element?.getAttribute("data-row");
                          const nextColumn = element?.getAttribute("data-column");
                          if (nextRow !== null && nextColumn !== null) extendPointer(Number(nextRow), Number(nextColumn));
                        }}
                        onTouchEnd={endPointer}
                        className={`
                          unit4-interactive
                          flex items-center justify-center
                          cursor-pointer
                          transition
                          ${keyboardActive ? "unit4-keyboard-preview" : ""}
                          ${isFound ? "bg-[#4caf50] text-white rounded-sm" : ""}
                        `}
                        style={{
                          width: "clamp(16px, 2.5vw, 25px)", // 🔥 عرض ديناميكي
                          height: "clamp(22px, 3.5vw, 35px)", // 🔥 طول ديناميكي
                          fontSize: "clamp(12px, 1.8vw, 18px)", // 🔥 حجم خط ديناميكي
                          flexShrink: 0,
                          padding: 0,
                          border: 0,
                          borderRadius: "4px",
                          background: isFound ? "#4caf50" : isSelected || keyboardActive ? "#ffd54f" : "transparent",
                          color: isFound ? "#fff" : "#111",
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
                alt="A monkey representing the first word in the hidden school name"
                style={{
                  width: "clamp(40px, 10vw, 100px)", // 🔥 حجم ديناميكي للصور
                  height: "auto",
                }}
              />

              <input
                className="answer-input-CB-unit3-p5-q4"
                value={displayedSentence.join(" ")}
                readOnly
                style={{ fontFamily: "monospace" }} // 🔥 مهم جدا
              />

              <img
                src={img2}
                alt="Bananas representing the last word in the hidden school name"
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
