import React, { useMemo, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit1PlayingAudioIcon from "./Unit1PlayingAudioIcon";
import useUnit1Audio from "./useUnit1Audio";
import shortA from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A1/Item_001_Short_a.mp3";
import shortE from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A1/Item_002_Short_e.mp3";
import shortI from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A1/Item_003_Short_i.mp3";
import shortO from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A1/Item_004_Short_o.mp3";
import shortU from "../../../assets/audio/ClassBook/Unit 1/Page 8 - Exercise A1/Item_005_Short_u.mp3";
import "./Page8_Q1.css";
import "./unit1Interactions.css";

const ROWS = [
  {
    vowel: "a",
    color: "#2ecc71",
    letters: "nsmaphicatybagaot".split(""),
    words: ["map", "cat", "bag"],
    audio: shortA,
  },
  {
    vowel: "e",
    color: "#e84393",
    letters: "penbybedmnetbevct".split(""),
    words: ["pen", "bed", "net"],
    audio: shortE,
  },
  {
    vowel: "i",
    color: "#0984e3",
    letters: "dbdxgsitfishdsick".split(""),
    words: ["sit", "fish", "sick"],
    audio: shortI,
  },
  {
    vowel: "o",
    color: "#8e44ad",
    letters: "ptboxmmopgisockun".split(""),
    words: ["box", "mop", "sock"],
    audio: shortO,
  },
  {
    vowel: "u",
    color: "#e74c3c",
    letters: "apisnutzygumcbusr".split(""),
    words: ["nut", "gum", "bus"],
    audio: shortU,
  },
];

const cellId = (row, col) => `${row}-${col}`;

export default function Page8_Q1() {
  const { activeAudioKey, playAudio, stopAudio } = useUnit1Audio();
  const [found, setFound] = useState([]);
  const [pointerSelection, setPointerSelection] = useState([]);
  const [pointerRow, setPointerRow] = useState(null);
  const [keyboardStart, setKeyboardStart] = useState(null);
  const [keyboardPreview, setKeyboardPreview] = useState([]);
  const [checked, setChecked] = useState(false);
  const [locked, setLocked] = useState(false);
  const [invalidSelectionRow, setInvalidSelectionRow] = useState(null);

  const foundCellIds = useMemo(
    () =>
      new Set(
        found.flatMap((entry) =>
          entry.cells.map((cell) => cellId(cell.row, cell.col)),
        ),
      ),
    [found],
  );

  const selectionWord = (cells) => {
    if (!cells.length) return null;
    const row = ROWS[cells[0].row];
    const text = cells
      .map((cell) => row.letters[cell.col])
      .join("")
      .toLowerCase();
    const reverse = text.split("").reverse().join("");
    return row.words.includes(text)
      ? text
      : row.words.includes(reverse)
        ? reverse
        : null;
  };

  const commitSelection = (cells) => {
    const word = selectionWord(cells);
    if (!word) return false;
    if (found.some((entry) => entry.word === word)) return true;
    setFound((previous) => [...previous, { word, row: cells[0].row, cells }]);
    setChecked(false);
    return true;
  };

  const showInvalidSelection = (row) => {
    setInvalidSelectionRow(null);
    window.requestAnimationFrame(() => setInvalidSelectionRow(row));
  };

  const startPointer = (row, col) => {
    if (locked) return;
    setPointerRow(row);
    setPointerSelection([{ row, col }]);
  };

  const extendPointer = (row, col) => {
    if (locked || pointerRow !== row) return;
    setPointerSelection((previous) => {
      const first = previous[0]?.col;
      if (first === undefined) return previous;
      const direction = col >= first ? 1 : -1;
      const next = [];
      for (
        let current = first;
        direction > 0 ? current <= col : current >= col;
        current += direction
      ) {
        next.push({ row, col: current });
      }
      return next;
    });
  };

  const endPointer = () => {
    if (locked) return;
    if (pointerSelection.length && !commitSelection(pointerSelection)) {
      showInvalidSelection(pointerSelection[0].row);
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

    const direction = col >= keyboardStart.col ? 1 : -1;
    const cells = [];
    for (
      let current = keyboardStart.col;
      direction > 0 ? current <= col : current >= col;
      current += direction
    ) {
      cells.push({ row, col: current });
    }
    if (!commitSelection(cells)) showInvalidSelection(row);
    setKeyboardStart(null);
    setKeyboardPreview([]);
  };

  const handleCellFocus = (row, col) => {
    if (!keyboardStart || keyboardStart.row !== row) return;
    const direction = col >= keyboardStart.col ? 1 : -1;
    const cells = [];
    for (
      let current = keyboardStart.col;
      direction > 0 ? current <= col : current >= col;
      current += direction
    ) {
      cells.push({ row, col: current });
    }
    setKeyboardPreview(cells);
  };

  const checkAnswers = () => {
    if (locked) return;
    const total = ROWS.reduce((sum, row) => sum + row.words.length, 0);
    if (!found.length)
      return ValidationAlert.info("Find the words before checking.");
    const score = found.length;
    setChecked(true);
    if (score === total) {
      setLocked(true);
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    }
  };

  const showAnswers = () => {
    const answers = [];
    ROWS.forEach((row, rowIndex) => {
      const full = row.letters.join("");
      row.words.forEach((word) => {
        const start = full.indexOf(word);
        const cells = Array.from({ length: word.length }, (_, offset) => ({
          row: rowIndex,
          col: start + offset,
        }));
        answers.push({ word, row: rowIndex, cells });
      });
    });
    setFound(answers);
    setChecked(true);
    setLocked(true);
    setPointerSelection([]);
    setKeyboardPreview([]);
    stopAudio();
  };

  const reset = () => {
    setFound([]);
    setPointerSelection([]);
    setPointerRow(null);
    setKeyboardStart(null);
    setKeyboardPreview([]);
    setChecked(false);
    setLocked(false);
    setInvalidSelectionRow(null);
    stopAudio();
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
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="A"
          questionNumber="1"
          title={
            <>
              Find and circle three words in each box with{" "}
              <span className="text-blue-800">short vowel</span> sounds.
            </>
          }
          subTitle="Find one word at a time in each short-vowel row, then tap all the letters that form the three correct words."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {ROWS.map((row, rowIndex) => (
            <div
              key={row.vowel}
              className={
                invalidSelectionRow === rowIndex
                  ? "unit1-invalid-selection-shake"
                  : undefined
              }
              onAnimationEnd={(event) => {
                if (
                  event.animationName === "shake-invalid-selection-unit1" &&
                  invalidSelectionRow === rowIndex
                ) {
                  setInvalidSelectionRow(null);
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                margin: "15px 0",
              }}
            >
              <div
                style={{
                  position: "relative",
                  color: row.color,
                  fontWeight: "bold",
                  minWidth: "80px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  className="unit1-audio-control unit1-interactive"
                  onClick={() => playAudio(`row-${row.vowel}`, row.audio)}
                  aria-label={`Play short ${row.vowel}`}
                  style={{
                    width: "100%",
                    padding: 0,
                    border: 0,
                    background: "transparent",
                    color: "inherit",
                    fontWeight: "inherit",
                    cursor: "pointer",
                  }}
                >
                  Short {row.vowel}
                  <Unit1PlayingAudioIcon
                    active={activeAudioKey === `row-${row.vowel}`}
                  />
                </button>
                {checked &&
                  found.filter((entry) => entry.row === rowIndex).length <
                    row.words.length && (
                    <span
                      aria-label={`Short ${row.vowel} row is incomplete`}
                      style={{
                        position: "absolute",
                        top: "-12px",
                        right: "-12px",
                        display: "flex",
                        width: "22px",
                        height: "22px",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                        background: "#dc2626",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 700,
                        boxShadow: "0 2px 6px rgba(0,0,0,.2)",
                      }}
                    >
                      ✕
                    </span>
                  )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px 10px",
                  border: "1.5px solid orange",
                  borderRadius: "20px",
                  background: "#fff",
                }}
              >
                {row.letters.map((letter, colIndex) => {
                  const id = cellId(rowIndex, colIndex);
                  const pointerActive = pointerSelection.some(
                    (cell) => cellId(cell.row, cell.col) === id,
                  );
                  const keyboardActive = keyboardPreview.some(
                    (cell) => cellId(cell.row, cell.col) === id,
                  );
                  const isFound = foundCellIds.has(id);
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
                      onKeyDown={(event) =>
                        handleCellKeyDown(event, rowIndex, colIndex)
                      }
                      onFocus={() => handleCellFocus(rowIndex, colIndex)}
                      aria-label={`${letter}, row short ${row.vowel}, position ${colIndex + 1}`}
                      style={{
                        width: "32px",
                        height: "32px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        background: isFound
                          ? "rgba(52, 152, 219, 0.4)"
                          : pointerActive || keyboardActive
                            ? "rgba(180, 218, 241, 0.4)"
                            : "#fff",
                        color: "#111",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: locked ? "default" : "pointer",
                        userSelect: "none",
                      }}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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
