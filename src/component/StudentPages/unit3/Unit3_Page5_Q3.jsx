import React, { useMemo, useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/Page 26/Ex C 2.svg";
import "./unit3Interactions.css";

const GRID = [
  "plkjthebghjnshopkeeperverxbhasuv".split(""),
  "ieypurpledcxdsxobxgreenrexnandc".split(""),
  "fdssnjbluekljminwqszglovesp".split(""),
];

const WORDS = ["the", "shopkeeper", "has", "purple", "green", "and", "blue", "gloves"];

const POSITIONS = {
  the: [[0, 4], [0, 5], [0, 6]],
  shopkeeper: [[0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 17], [0, 18], [0, 19], [0, 20], [0, 21]],
  has: [[0, 27], [0, 28], [0, 29]],
  purple: [[1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8]],
  green: [[1, 18], [1, 19], [1, 20], [1, 21], [1, 22]],
  and: [[1, 27], [1, 28], [1, 29]],
  blue: [[2, 6], [2, 7], [2, 8], [2, 9]],
  gloves: [[2, 20], [2, 21], [2, 22], [2, 23], [2, 24], [2, 25]],
};

const idFor = (row, column) => `${row}-${column}`;

export default function Unit3_Page5_Q3() {
  const [foundWords, setFoundWords] = useState([]);
  const [pointerSelection, setPointerSelection] = useState([]);
  const [pointerRow, setPointerRow] = useState(null);
  const [keyboardStart, setKeyboardStart] = useState(null);
  const [keyboardPreview, setKeyboardPreview] = useState([]);
  const [locked, setLocked] = useState(false);
  const [shakeInvalidSelection, setShakeInvalidSelection] = useState(false);

  const foundCells = useMemo(
    () =>
      new Set(
        foundWords.flatMap((word) =>
          POSITIONS[word].map(([row, column]) => idFor(row, column)),
        ),
      ),
    [foundWords],
  );

  const buildRange = (row, start, end) => {
    const direction = end >= start ? 1 : -1;
    const cells = [];
    for (
      let column = start;
      direction > 0 ? column <= end : column >= end;
      column += direction
    ) {
      cells.push({ row, column });
    }
    return cells;
  };

  const commit = (cells) => {
    const matched = WORDS.find((word) => {
      const positions = POSITIONS[word];
      if (positions.length !== cells.length) return false;

      const forward = positions.every(
        ([row, column], index) =>
          row === cells[index].row && column === cells[index].column,
      );
      const reverse = [...positions]
        .reverse()
        .every(
          ([row, column], index) =>
            row === cells[index].row && column === cells[index].column,
        );
      return forward || reverse;
    });

    if (!matched) return false;
    if (!foundWords.includes(matched)) {
      setFoundWords((previous) => [...previous, matched]);
    }
    return true;
  };

  const showInvalidSelection = () => {
    setShakeInvalidSelection(false);
    window.requestAnimationFrame(() => setShakeInvalidSelection(true));
  };

  const startPointer = (row, column) => {
    if (locked) return;
    setPointerRow(row);
    setPointerSelection([{ row, column }]);
  };

  const extendPointer = (row, column) => {
    if (locked || pointerRow !== row || !pointerSelection.length) return;
    setPointerSelection(buildRange(row, pointerSelection[0].column, column));
  };

  const endPointer = () => {
    if (locked) return;
    if (pointerSelection.length && !commit(pointerSelection)) {
      showInvalidSelection();
    }
    setPointerSelection([]);
    setPointerRow(null);
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
    if (!commit(cells)) showInvalidSelection();
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
    setPointerSelection([]);
    setPointerRow(null);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(true);
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
          title="What color gloves does the shopkeeper have in Picky Shopper on page 23?"
          subTitle="Find the hidden color word, then reread the answer about the shopkeeper's gloves."
        />

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className="px-4 pt-4 pb-5" style={{ width: "fit-content", margin: "0 auto" }}>
            <div
              className={`bg-[#daf5ff] mb-10 rounded-[15px] p-2 sm:p-[15px] ${shakeInvalidSelection ? "unit3-invalid-selection-shake" : ""}`}
              onAnimationEnd={(event) => {
                if (event.animationName === "shake-invalid-selection-unit3") {
                  setShakeInvalidSelection(false);
                }
              }}
              style={{
                userSelect: "none",
                width: "max-content",
                touchAction: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {GRID.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  style={{
                    display: "flex",
                    gap: "clamp(1px, 0.3vw, 4px)",
                    width: "fit-content",
                  }}
                >
                  {row.map((letter, columnIndex) => {
                    const id = idFor(rowIndex, columnIndex);
                    const pointerActive = pointerSelection.some(
                      (cell) => idFor(cell.row, cell.column) === id,
                    );
                    const keyboardActive = keyboardPreview.some(
                      (cell) => idFor(cell.row, cell.column) === id,
                    );
                    const isFound = foundCells.has(id);

                    return (
                      <button
                        type="button"
                        key={id}
                        data-row={rowIndex}
                        data-column={columnIndex}
                        className={`unit3-interactive unit3-word-cell ${keyboardActive ? "unit3-keyboard-preview" : ""}`}
                        onMouseDown={() => startPointer(rowIndex, columnIndex)}
                        onMouseEnter={() => extendPointer(rowIndex, columnIndex)}
                        onMouseUp={endPointer}
                        onTouchStart={() => startPointer(rowIndex, columnIndex)}
                        onTouchMove={(event) => {
                          event.preventDefault();
                          const touch = event.touches[0];
                          const element = document.elementFromPoint(touch.clientX, touch.clientY);
                          const nextRow = element?.getAttribute("data-row");
                          const nextColumn = element?.getAttribute("data-column");
                          if (nextRow !== null && nextColumn !== null) {
                            extendPointer(Number(nextRow), Number(nextColumn));
                          }
                        }}
                        onTouchEnd={endPointer}
                        onFocus={() => {
                          if (keyboardStart?.row === rowIndex) {
                            setKeyboardPreview(
                              buildRange(rowIndex, keyboardStart.column, columnIndex),
                            );
                          }
                        }}
                        onKeyDown={(event) =>
                          handleCellKeyDown(event, rowIndex, columnIndex)
                        }
                        aria-label={`${letter}, row ${rowIndex + 1}, position ${columnIndex + 1}`}
                        style={{
                          width: "clamp(16px, 2.5vw, 25px)",
                          height: "clamp(22px, 3.5vw, 35px)",
                          flexShrink: 0,
                          padding: 0,
                          marginBottom: "8px",
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
                alt="An orange cat beside the answer sentence"
                style={{ width: "clamp(40px, 10vw, 100px)", height: "auto" }}
              />
              <input
                className="answer-input-CB-unit3-p5-q4"
                value={displayedSentence}
                readOnly
                aria-label="Completed sentence from the word search"
                style={{ fontFamily: "monospace", width: "100%" }}
              />
              <img
                src={img2}
                alt="A brown mouse beside the answer sentence"
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
