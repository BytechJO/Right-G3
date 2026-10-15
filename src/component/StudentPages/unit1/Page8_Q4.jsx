import React, { useMemo, useState } from "react";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Page 8/Ex C 2.svg";
import "./Page8_Q4.css";
import "./unit1Interactions.css";

const GRID = [
  "eudplzzeheusltwhoaqwdxkbbi".split(""),
  "eelkeepstgoingtixgmuqzaxng".split(""),
  "winseoghwxpoitherznbolprem".split(""),
  "uracevbmxxzmk".split(""),
];

const WORDS = ["he", "who", "keeps", "going", "wins", "the", "race"];
const POSITIONS = {
  he: [
    [0, 8],
    [0, 9],
  ],
  who: [
    [0, 14],
    [0, 15],
    [0, 16],
  ],
  keeps: [
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
  going: [
    [1, 9],
    [1, 10],
    [1, 11],
    [1, 12],
    [1, 13],
  ],
  wins: [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
  ],
  the: [
    [2, 13],
    [2, 14],
    [2, 15],
  ],
  race: [
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ],
};

const idFor = (row, col) => `${row}-${col}`;

export default function Page8_Q4() {
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
          POSITIONS[word].map(([row, col]) => idFor(row, col)),
        ),
      ),
    [foundWords],
  );

  const commit = (cells) => {
    const matched = WORDS.find((word) => {
      const positions = POSITIONS[word];
      if (positions.length !== cells.length) return false;
      const forward = positions.every(
        ([row, col], index) =>
          row === cells[index].row && col === cells[index].col,
      );
      const reverse = [...positions]
        .reverse()
        .every(
          ([row, col], index) =>
            row === cells[index].row && col === cells[index].col,
        );
      return forward || reverse;
    });
    if (!matched) return false;
    if (!foundWords.includes(matched))
      setFoundWords((previous) => [...previous, matched]);
    return true;
  };

  const showInvalidSelection = () => {
    setShakeInvalidSelection(false);
    window.requestAnimationFrame(() => setShakeInvalidSelection(true));
  };

  const buildRange = (row, start, end) => {
    const direction = end >= start ? 1 : -1;
    const cells = [];
    for (
      let col = start;
      direction > 0 ? col <= end : col >= end;
      col += direction
    )
      cells.push({ row, col });
    return cells;
  };

  const startPointer = (row, col) => {
    if (locked) return;
    setPointerRow(row);
    setPointerSelection([{ row, col }]);
  };

  const extendPointer = (row, col) => {
    if (locked || pointerRow !== row || !pointerSelection.length) return;
    setPointerSelection(buildRange(row, pointerSelection[0].col, col));
  };

  const endPointer = () => {
    if (locked) return;
    if (pointerSelection.length && !commit(pointerSelection)) {
      showInvalidSelection();
    }
    setPointerSelection([]);
    setPointerRow(null);
  };

  const handleCellKeyDown = (event, row, col) => {
    if (locked || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    if (!keyboardStart || keyboardStart.row !== row) {
      setKeyboardStart({ row, col });
      setKeyboardPreview([{ row, col }]);
      return;
    }
    const cells = buildRange(row, keyboardStart.col, col);
    if (!commit(cells)) showInvalidSelection();
    setKeyboardStart(null);
    setKeyboardPreview([]);
  };

  const checkAnswers = () => {
    if (locked) return;
    if (!foundWords.length)
      return ValidationAlert.info("Find the hidden words before checking.");
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
    foundWords.includes(word) ? word : "_______",
  ).join(" ");
  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "40px" }}>
        <ExerciseHeader
          sectionLetter="C"
          title="What is the moral of Slow and Steady Wins the Race on page 5?"
          subTitle="Find the hidden words in order, then read the completed moral aloud."
        />

        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div
            style={{ width: "fit-content", maxWidth: "100%", margin: "0 auto" }}
          >
            <div
              className={
                shakeInvalidSelection
                  ? "unit1-invalid-selection-shake"
                  : undefined
              }
              onAnimationEnd={(event) => {
                if (event.animationName === "shake-invalid-selection-unit1") {
                  setShakeInvalidSelection(false);
                }
              }}
              style={{
                padding: "15px",
                width: "max-content",
                maxWidth: "100%",
                boxSizing: "border-box",
                borderRadius: "15px",
                background: "#daf5ff",
                userSelect: "none",
                touchAction: "none",
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
                  {row.map((letter, colIndex) => {
                    const id = idFor(rowIndex, colIndex);
                    const pointerActive = pointerSelection.some(
                      (cell) => idFor(cell.row, cell.col) === id,
                    );
                    const keyboardActive = keyboardPreview.some(
                      (cell) => idFor(cell.row, cell.col) === id,
                    );
                    const isFound = foundCells.has(id);
                    return (
                      <button
                        type="button"
                        key={id}
                        data-row={rowIndex}
                        data-col={colIndex}
                        className={`unit1-interactive ${keyboardActive ? "unit1-keyboard-preview" : ""}`}
                        onMouseDown={() => startPointer(rowIndex, colIndex)}
                        onMouseEnter={() => extendPointer(rowIndex, colIndex)}
                        onMouseUp={endPointer}
                        onTouchStart={() => startPointer(rowIndex, colIndex)}
                        onTouchMove={(event) => {
                          event.preventDefault();
                          const touch = event.touches[0];
                          const element = document.elementFromPoint(
                            touch.clientX,
                            touch.clientY,
                          );
                          const nextRow = element?.getAttribute("data-row");
                          const nextCol = element?.getAttribute("data-col");
                          if (nextRow !== null && nextCol !== null)
                            extendPointer(Number(nextRow), Number(nextCol));
                        }}
                        onTouchEnd={endPointer}
                        onFocus={() =>
                          keyboardStart?.row === rowIndex &&
                          setKeyboardPreview(
                            buildRange(rowIndex, keyboardStart.col, colIndex),
                          )
                        }
                        onKeyDown={(event) =>
                          handleCellKeyDown(event, rowIndex, colIndex)
                        }
                        aria-label={`${letter}, row ${rowIndex + 1}, position ${colIndex + 1}`}
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginTop: "22px",
                width: "100%",
              }}
            >
              <img
                src={img1}
                alt="Opening story character beside the moral sentence"
                style={{
                  width: "clamp(40px, 10vw, 100px)",
                  height: "auto",
                  flexShrink: 0,
                }}
              />
              <input
                className="answer-input-CB-unit3-p5-q4"
                aria-label="Completed moral sentence"
                value={displayedSentence}
                readOnly
                style={{
                  width: "100%",
                  minWidth: 0,
                  flex: 1,
                  fontFamily: "monospace",
                }}
              />
              <img
                src={img2}
                alt="Closing story character beside the moral sentence"
                style={{
                  width: "clamp(40px, 10vw, 100px)",
                  height: "auto",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
        </div>

        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
          checkDisabled={locked}
        />
      </div>
    </div>
  );
}
