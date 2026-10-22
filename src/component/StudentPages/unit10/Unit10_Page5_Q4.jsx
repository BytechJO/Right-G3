import React, { useMemo, useRef, useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 86/Ex C 2.svg";
import "../unit4/unit4Interactions.css";
import ExerciseHeader from "../../ExerciseHeader";

const GRID = [
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
const WORDS = [
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
const POSITIONS = {
  he: [
    [0, 4],
    [0, 5],
  ],
  will: [11, 12, 13, 14].map((c) => [0, c]),
  have: [22, 23, 24, 25].map((c) => [0, c]),
  to: [
    [1, 2],
    [1, 3],
  ],
  sell: [8, 9, 10, 11].map((c) => [1, c]),
  his: [19, 20, 21].map((c) => [1, c]),
  skateboard: Array.from({ length: 10 }, (_, c) => [2, c]),
  and: [12, 13, 14].map((c) => [2, c]),
  video: [18, 19, 20, 21, 22].map((c) => [2, c]),
  game: [1, 2, 3, 4].map((c) => [3, c]),
  set: [7, 8, 9].map((c) => [3, c]),
};
const cellId = (row, column) => `${row}-${column}`;

export default function Page8_Q4() {
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
    for (
      let column = start;
      step > 0 ? column <= end : column >= end;
      column += step
    )
      result.push({ row, column });
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
    setFoundWords((prev) => (prev.includes(word) ? prev : [...prev, word]));
    return true;
  };

  const invalidSelection = () => {
    setShakeInvalidSelection(false);
    window.requestAnimationFrame(() => setShakeInvalidSelection(true));
  };

  const startPointer = (event, row, column) => {
    if (locked || event.button !== 0) return;
    event.preventDefault();
    pointerStartRef.current = { pointerId: event.pointerId, row, column };
    const selection = [{ row, column }];
    pointerSelectionRef.current = selection;
    setPointerSelection(selection);
    gridRef.current?.setPointerCapture?.(event.pointerId);
  };

  const movePointer = (event) => {
    const origin = pointerStartRef.current;
    if (locked || !origin || origin.pointerId !== event.pointerId) return;
    const cell = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest?.("[data-word-cell]");
    if (!cell || !gridRef.current?.contains(cell)) return;
    const row = Number(cell.dataset.row);
    const column = Number(cell.dataset.column);
    if (row !== origin.row) return;
    const selection = buildRange(row, origin.column, column);
    pointerSelectionRef.current = selection;
    setPointerSelection(selection);
  };

  const endPointer = () => {
    if (!pointerStartRef.current) return;
    pointerStartRef.current = null;
    const cells = pointerSelectionRef.current;
    if (!locked && cells.length && !commit(cells)) invalidSelection();
    pointerSelectionRef.current = [];
    setPointerSelection([]);
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
    } else
      ValidationAlert.warning(`Score: ${foundWords.length} / ${WORDS.length}`);
  };

  const showAnswers = () => {
    setFoundWords([...WORDS]);
    pointerStartRef.current = null;
    pointerSelectionRef.current = [];
    setPointerSelection([]);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(true);
  };

  const reset = () => {
    setFoundWords([]);
    pointerStartRef.current = null;
    pointerSelectionRef.current = [];
    setPointerSelection([]);
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
          title="What does Tom have to sell in order to buy a new bike in Preparing for a Garage Sale on page 83?"
          subTitle="Find the hidden item Tom must sell, then reread the completed answer."
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
              className={`bg-[#daf5ff] rounded-[15px] p-2 sm:p-[15px] mb-10 ${shakeInvalidSelection ? "unit4-invalid-selection-shake" : ""}`}
              onAnimationEnd={(event) => {
                if (event.animationName === "shake-invalid-selection-unit4")
                  setShakeInvalidSelection(false);
              }}
              onPointerMove={movePointer}
              onPointerUp={endPointer}
              onPointerCancel={() => {
                pointerStartRef.current = null;
                pointerSelectionRef.current = [];
                setPointerSelection([]);
              }}
              style={{
                userSelect: "none",
                width: "max-content",
                touchAction: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {GRID.map((letters, rowIndex) => (
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
                          tabIndex: locked ? -1 : 0,
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
                alt="Illustration beside the beginning of the answer"
                style={{ width: "clamp(40px, 10vw, 100px)", height: "auto" }}
              />
              <input
                className="answer-input-CB-unit3-p5-q4"
                value={displayedSentence}
                readOnly
                aria-label="Tom's complete garage sale answer"
                style={{ fontSize: "17.5px", fontFamily: "monospace" }}
              />
              <img
                src={img2}
                alt="Illustration beside the end of the answer"
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
