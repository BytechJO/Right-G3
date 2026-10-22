import React, { useMemo, useRef, useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 80/Ex C 2.svg";
import "../unit4/unit4Interactions.css";

const WORDS = ["there", "was", "a", "big", "fat", "cat", "in", "the", "park"];
const POSITIONS = {
  there: Array.from({ length: 5 }, (_, i) => [0, 4 + i]),
  was: Array.from({ length: 3 }, (_, i) => [0, 15 + i]),
  a: [[0, 21]],
  big: Array.from({ length: 3 }, (_, i) => [1, 3 + i]),
  fat: Array.from({ length: 3 }, (_, i) => [1, 11 + i]),
  cat: Array.from({ length: 3 }, (_, i) => [2, 2 + i]),
  in: Array.from({ length: 2 }, (_, i) => [2, 11 + i]),
  the: Array.from({ length: 3 }, (_, i) => [2, 19 + i]),
  park: Array.from({ length: 4 }, (_, i) => [3, 4 + i]),
};
const cellId = (row, column) => `${row}-${column}`;

export default function Page8_Q4() {
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

  const [foundWords, setFoundWords] = useState([]);
  const [pointerSelection, setPointerSelection] = useState([]);
  const [keyboardStart, setKeyboardStart] = useState(null);
  const [keyboardPreview, setKeyboardPreview] = useState([]);
  const [locked, setLocked] = useState(false);
  const [shakeInvalidSelection, setShakeInvalidSelection] = useState(false);
  const pointerStartRef = useRef(null);
  const pointerSelectionRef = useRef([]);
  const gridRef = useRef(null);

  const foundCells = useMemo(
    () =>
      new Set(
        foundWords.flatMap((word) =>
          POSITIONS[word].map(([r, c]) => cellId(r, c)),
        ),
      ),
    [foundWords],
  );

  const buildRange = (row, start, end) => {
    const step = start <= end ? 1 : -1;
    const result = [];
    for (let col = start; step > 0 ? col <= end : col >= end; col += step) {
      result.push({ row, column: col });
    }
    return result;
  };

  const commit = (cells) => {
    const word = WORDS.find((candidate) => {
      const positions = POSITIONS[candidate];
      if (positions.length !== cells.length) return false;
      const equal = (list) =>
        list.every(([r, c], i) => r === cells[i].row && c === cells[i].column);
      return equal(positions) || equal([...positions].reverse());
    });
    if (!word) return false;
    setFoundWords((previous) =>
      previous.includes(word) ? previous : [...previous, word],
    );
    return true;
  };

  const invalidSelection = () => {
    setShakeInvalidSelection(false);
    window.requestAnimationFrame(() => setShakeInvalidSelection(true));
  };

  const updatePointerSelection = (cells) => {
    pointerSelectionRef.current = cells;
    setPointerSelection(cells);
  };

  const startPointer = (event, row, column) => {
    if (locked || event.button !== 0) return;
    event.preventDefault();
    pointerStartRef.current = { pointerId: event.pointerId, row, column };
    updatePointerSelection([{ row, column }]);
    gridRef.current?.setPointerCapture?.(event.pointerId);
  };

  const movePointer = (event) => {
    const origin = pointerStartRef.current;
    if (locked || !origin || origin.pointerId !== event.pointerId) return;
    const el = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest?.("[data-word-cell]");
    if (!el || !gridRef.current?.contains(el)) return;
    const row = Number(el.dataset.row);
    const column = Number(el.dataset.column);
    if (row === origin.row) {
      updatePointerSelection(buildRange(origin.row, origin.column, column));
    }
  };

  const endPointer = () => {
    if (!pointerStartRef.current) return;
    pointerStartRef.current = null;
    const cells = pointerSelectionRef.current;
    if (!locked && cells.length && !commit(cells)) invalidSelection();
    updatePointerSelection([]);
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
      setKeyboardPreview([{ row, column }]);
      return;
    }
    const cells = buildRange(row, keyboardStart.column, column);
    if (!commit(cells)) invalidSelection();
    setKeyboardStart(null);
    setKeyboardPreview([]);
  };

  const checkAnswers = () => {
    if (locked) return;
    if (!foundWords.length) {
      ValidationAlert.info("Find the hidden words before checking.");
      return;
    }
    if (foundWords.length === WORDS.length) {
      setLocked(true);
      ValidationAlert.success(`Score: ${WORDS.length} / ${WORDS.length}`);
    } else {
      ValidationAlert.warning(`Score: ${foundWords.length} / ${WORDS.length}`);
    }
  };

  const showAnswers = () => {
    setFoundWords([...WORDS]);
    pointerStartRef.current = null;
    updatePointerSelection([]);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(true);
  };

  const reset = () => {
    setFoundWords([]);
    pointerStartRef.current = null;
    updatePointerSelection([]);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(false);
    setShakeInvalidSelection(false);
  };

  const displayedSentence = WORDS.map((word) =>
    foundWords.includes(word) ? word : "________",
  ).join(" ");

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
          title="What kind of animal was in the park in the afternoon in A Brave Mouse on page 77?"
          subTitle="Find the hidden animal word, then check it against the park scene in the reading."
        />
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            className="px-4 pt-4 pb-5"
            style={{ width: "fit-content", margin: "0 auto" }}
          >
            <div
              ref={gridRef}
              className={`bg-[#daf5ff] rounded-[15px] p-2 sm:p-[15px] mb-10 ${
                shakeInvalidSelection ? "unit4-invalid-selection-shake" : ""
              }`}
              onAnimationEnd={(event) => {
                if (event.animationName === "shake-invalid-selection-unit4")
                  setShakeInvalidSelection(false);
              }}
              onPointerMove={movePointer}
              onPointerUp={endPointer}
              onPointerCancel={() => {
                pointerStartRef.current = null;
                updatePointerSelection([]);
              }}
              style={{
                userSelect: "none",
                width: "max-content",
                touchAction: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {grid.map((letters, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    gap: "clamp(1px, 0.3vw, 4px)",
                    width: "fit-content",
                  }}
                >
                  {letters.map((letter, columnIndex) => {
                    const id = cellId(rowIndex, columnIndex);
                    const pointerActive = pointerSelection.some(
                      (cell) => cellId(cell.row, cell.column) === id,
                    );
                    const keyboardActive = keyboardPreview.some(
                      (cell) => cellId(cell.row, cell.column) === id,
                    );
                    const isFound = foundCells.has(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        data-word-cell="true"
                        data-row={rowIndex}
                        data-column={columnIndex}
                        className={`unit4-interactive ${keyboardActive ? "unit4-keyboard-preview" : ""}`}
                        onPointerDown={(event) =>
                          startPointer(event, rowIndex, columnIndex)
                        }
                        onFocus={() => {
                          if (keyboardStart?.row === rowIndex)
                            setKeyboardPreview(
                              buildRange(
                                rowIndex,
                                keyboardStart.column,
                                columnIndex,
                              ),
                            );
                        }}
                        onKeyDown={(event) =>
                          handleCellKeyDown(event, rowIndex, columnIndex)
                        }
                        aria-label={`${letter}, row ${rowIndex + 1}, position ${columnIndex + 1}`}
                        tabIndex={locked ? -1 : 0}
                        style={{
                          width: "clamp(16px, 2.5vw, 25px)",
                          height: "clamp(22px, 3.5vw, 35px)",
                          flexShrink: 0,
                          padding: 0,
                          border: 0,
                          borderRadius: "4px",
                          background: isFound
                            ? "#4caf50"
                            : pointerActive || keyboardActive
                              ? "#ffd54f"
                              : "transparent",
                          color: isFound ? "#fff" : "#111",
                          fontSize: "clamp(12px, 1.8vw, 18px)",
                          cursor: locked ? "default" : "pointer",
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
                alt="Illustration beside the beginning of the sentence"
                style={{ width: "clamp(40px, 10vw, 100px)", height: "auto" }}
              />
              <input
                className="answer-input-CB-unit3-p5-q4"
                value={displayedSentence}
                readOnly
                aria-label="Completed sentence about the animal in the park"
                style={{ fontSize: "17.5px", fontFamily: "monospace" }}
              />
              <img
                src={img2}
                alt="Illustration beside the end of the sentence"
                style={{ width: "clamp(40px, 10vw, 100px)", height: "auto" }}
              />
            </div>
          </div>
        </div>
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
}
