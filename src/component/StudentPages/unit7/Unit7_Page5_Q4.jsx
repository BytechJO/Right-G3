import React, { useMemo, useRef, useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex C 2.svg";
import "../unit4/unit4Interactions.css";

const GRID = [
  "yidknddthephbsdlplayground".split(""),
  "tvgfdzawqisznjkumwasploijb".split(""),
  "fxbehindqwuibghnthelokmafc".split(""),
  "schoolruiokl".split(""),
];

// Keep both occurrences of "the" independent.
const WORDS = [
  { id: "the1", text: "the" },
  { id: "playground", text: "playground" },
  { id: "was", text: "was" },
  { id: "behind", text: "behind" },
  { id: "the2", text: "the" },
  { id: "school", text: "school" },
];

const POSITIONS = {
  the1: [
    [0, 7],
    [0, 8],
    [0, 9],
  ],
  playground: Array.from({ length: 10 }, (_, i) => [0, 16 + i]),
  was: [
    [1, 17],
    [1, 18],
    [1, 19],
  ],
  behind: Array.from({ length: 6 }, (_, i) => [2, 2 + i]),
  the2: [
    [2, 16],
    [2, 17],
    [2, 18],
  ],
  school: Array.from({ length: 6 }, (_, i) => [3, i]),
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
        foundWords.flatMap((wordId) =>
          POSITIONS[wordId].map(([row, column]) => cellId(row, column)),
        ),
      ),
    [foundWords],
  );

  const buildRange = (row, start, end) => {
    const step = start <= end ? 1 : -1;
    const cells = [];
    for (
      let column = start;
      step > 0 ? column <= end : column >= end;
      column += step
    ) {
      cells.push({ row, column });
    }
    return cells;
  };

  const commit = (cells) => {
    const matched = WORDS.find(({ id }) => {
      const positions = POSITIONS[id];
      if (positions.length !== cells.length) return false;
      const same = (sequence) =>
        sequence.every(
          ([row, column], index) =>
            row === cells[index].row && column === cells[index].column,
        );
      return same(positions) || same([...positions].reverse());
    });
    if (!matched) return false;
    setFoundWords((prev) =>
      prev.includes(matched.id) ? prev : [...prev, matched.id],
    );
    return true;
  };

  const invalidSelection = () => {
    setShakeInvalidSelection(false);
    window.requestAnimationFrame(() => setShakeInvalidSelection(true));
  };

  const startPointer = (event, row, column) => {
    if (locked || (event.pointerType === "mouse" && event.button !== 0)) return;
    event.preventDefault();
    pointerStartRef.current = { pointerId: event.pointerId, row, column };
    const cells = [{ row, column }];
    pointerSelectionRef.current = cells;
    setPointerSelection(cells);
    gridRef.current?.setPointerCapture?.(event.pointerId);
  };

  const movePointer = (event) => {
    const start = pointerStartRef.current;
    if (locked || !start || start.pointerId !== event.pointerId) return;
    const cell = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest?.("[data-word-cell]");
    if (!cell || !gridRef.current?.contains(cell)) return;
    const row = Number(cell.dataset.row);
    const column = Number(cell.dataset.column);
    if (row !== start.row) return;
    const cells = buildRange(row, start.column, column);
    pointerSelectionRef.current = cells;
    setPointerSelection(cells);
  };

  const endPointer = (event) => {
    if (!pointerStartRef.current) return;
    if (event && event.pointerId !== pointerStartRef.current.pointerId) return;
    pointerStartRef.current = null;
    if (
      !locked &&
      pointerSelectionRef.current.length &&
      !commit(pointerSelectionRef.current)
    ) {
      invalidSelection();
    }
    pointerSelectionRef.current = [];
    setPointerSelection([]);
  };

  const cancelPointer = () => {
    pointerStartRef.current = null;
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
    if (foundWords.length === 0) {
      ValidationAlert.info("Find the hidden words before checking.");
      return;
    }
    const score = foundWords.length;
    if (score === WORDS.length) {
      setLocked(true);
      ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    } else {
      ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    }
  };

  const showAnswers = () => {
    setFoundWords(WORDS.map((word) => word.id));
    cancelPointer();
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(true);
  };

  const reset = () => {
    setFoundWords([]);
    cancelPointer();
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setLocked(false);
    setShakeInvalidSelection(false);
  };

  const displayedSentence = WORDS.map(({ id, text }) =>
    foundWords.includes(id) ? text : "________",
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
          title="Where was the playground in The New Boy in School on page 59?"
          subTitle="Find the hidden location words in order, then read where the playground was."
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
              onPointerCancel={cancelPointer}
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
                          if (keyboardStart?.row === rowIndex) {
                            setKeyboardPreview(
                              buildRange(
                                rowIndex,
                                keyboardStart.column,
                                columnIndex,
                              ),
                            );
                          }
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
                alt="Illustration beside the beginning of the playground sentence"
                style={{ width: "clamp(40px, 10vw, 100px)", height: "auto" }}
              />
              <input
                className="answer-input-CB-unit3-p5-q4"
                value={displayedSentence}
                readOnly
                aria-label="Completed playground sentence"
                style={{ fontFamily: "monospace" }}
              />
              <img
                src={img2}
                alt="Illustration beside the end of the playground sentence"
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
