import React, { useEffect, useRef, useState } from "react";

import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I6.svg";
import ExerciseHeader from "../../ExerciseHeader";

const BORDER_COLOR = "#f39b42";
const FOUND_COLOR = "#ef4444";
const SELECT_COLOR = "rgba(251,191,36,0.45)";
const WRONG_BG = "rgba(239,68,68,0.35)";

const GRID = [
  ["l", "b", "a", "t", "h", "r", "o", "o", "m", "m"],
  ["i", "i", "g", "a", "r", "a", "g", "e", "n", "b"],
  ["v", "o", "e", "e", "k", "a", "n", "m", "n", "a"],
  ["i", "m", "o", "e", "i", "s", "b", "x", "e", "s"],
  ["n", "a", "r", "a", "t", "e", "e", "q", "s", "e"],
  ["g", "e", "v", "r", "c", "m", "d", "a", "c", "m"],
  ["r", "k", "o", "r", "h", "l", "r", "g", "s", "e"],
  ["o", "o", "p", "r", "e", "n", "o", "v", "i", "n"],
  ["o", "c", "o", "r", "n", "t", "o", "b", "q", "t"],
  ["m", "n", "w", "r", "v", "m", "m", "r", "m", "n"],
];

const WORDS = [
  {
    id: 1,
    word: "bathroom",
    cells: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
    ],
  },

  {
    id: 2,
    word: "garage",
    cells: [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
    ],
  },

  {
    id: 3,
    word: "kitchen",
    cells: [
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 4],
      [6, 4],
      [7, 4],
      [8, 4],
    ],
  },

  {
    id: 4,
    word: "bedroom",
    cells: [
      [3, 6],
      [4, 6],
      [5, 6],
      [6, 6],
      [7, 6],
      [8, 6],
      [9, 6],
    ],
  },

  {
    id: 5,
    word: "living room",
    cells: [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ],
  },

  {
    id: 6,
    word: "basement",
    cells: [
      [1, 9],
      [2, 9],
      [3, 9],
      [4, 9],
      [5, 9],
      [6, 9],
      [7, 9],
      [8, 9],
    ],
  },
];

const SIDE_IMAGES = [
  {
    id: 1,
    img: img1,
    wordId: 3, // kitchen
    alt: "A kitchen.",
  },
  {
    id: 2,
    img: img2,
    wordId: 6, // basement
    alt: "A basement.",
  },
  {
    id: 3,
    img: img3,
    wordId: 2, // garage
    alt: "A garage.",
  },
  {
    id: 4,
    img: img4,
    wordId: 4, // bedroom
    alt: "A bedroom.",
  },
  {
    id: 5,
    img: img5,
    wordId: 1, // bathroom
    alt: "A bathroom.",
  },
  {
    id: 6,
    img: img6,
    wordId: 5, // living room
    alt: "A living room.",
  },
];

const cellKey = (r, c) => `${r}-${c}`;

/* =====================================================
   PATH COMPARISON
   accepts forward OR reverse
===================================================== */

const samePath = (a, b) => {
  if (a.length !== b.length) return false;

  const forward = a.every(
    ([r, c], index) => r === b[index][0] && c === b[index][1],
  );

  if (forward) {
    return true;
  }

  return a.every(([r, c], index) => {
    const reverseCell = b[b.length - 1 - index];

    return r === reverseCell[0] && c === reverseCell[1];
  });
};

/* =====================================================
   BUILD PATH
   Horizontal / Vertical / Diagonal
===================================================== */

const buildPath = (r1, c1, r2, c2) => {
  const rowDiff = r2 - r1;

  const colDiff = c2 - c1;

  const isHorizontal = rowDiff === 0;

  const isVertical = colDiff === 0;

  const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

  if (!isHorizontal && !isVertical && !isDiagonal) {
    return null;
  }

  const rowStep = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;

  const colStep = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;

  const length = Math.max(Math.abs(rowDiff), Math.abs(colDiff)) + 1;

  const cells = [];

  for (let i = 0; i < length; i++) {
    cells.push([r1 + rowStep * i, c1 + colStep * i]);
  }

  return cells;
};

/* =====================================================
   COMPONENT
===================================================== */

export default function SB_WordSearch_PageI() {
  /* =====================================================
     SELECTION
  ===================================================== */

  const [selecting, setSelecting] = useState(false);

  const [startCell, setStartCell] = useState(null);

  const [currentCells, setCurrentCells] = useState([]);

  /* =====================================================
     FOUND / WRONG
  ===================================================== */

  const [foundWords, setFoundWords] = useState([]);

  const [wrongCells, setWrongCells] = useState([]);

  /* =====================================================
     CHECK
  ===================================================== */

  const [showAns, setShowAns] = useState(false);

  const [checked, setChecked] = useState(false);

  const [completed, setCompleted] = useState(false);

  /* =====================================================
     KEYBOARD
  ===================================================== */

  const [activeCell, setActiveCell] = useState([0, 0]);

  const [keyboardSelecting, setKeyboardSelecting] = useState(false);

  const [keyboardStartCell, setKeyboardStartCell] = useState(null);

  /* =====================================================
     POINTER
  ===================================================== */

  const pointerIdRef = useRef(null);

  const gridRef = useRef(null);

  const cellRefs = useRef({});

  /* =====================================================
     HELPERS
  ===================================================== */

  const isCellFound = (r, c) =>
    foundWords.some((found) =>
      found.cells.some(([fr, fc]) => fr === r && fc === c),
    );

  const isCellSelecting = (r, c) =>
    currentCells.some(([sr, sc]) => sr === r && sc === c);

  const isCellWrong = (r, c) => wrongCells.includes(cellKey(r, c));

  const isWordFound = (wordId) =>
    foundWords.some((found) => found.wordId === wordId);

  const isWordMissed = (wordId) => checked && !showAns && !isWordFound(wordId);

  /* =====================================================
     FOCUS CELL
  ===================================================== */

  const focusCell = (r, c) => {
    window.requestAnimationFrame(() => {
      cellRefs.current[cellKey(r, c)]?.focus({
        preventScroll: true,
      });
    });
  };

  /* =====================================================
     CHECK SELECTION
  ===================================================== */

  const checkSelection = (cells) => {
    if (!cells || cells.length < 2) {
      return;
    }

    const match = WORDS.find(
      (word) =>
        samePath(cells, word.cells) &&
        !foundWords.some((found) => found.wordId === word.id),
    );

    if (match) {
      setFoundWords((previous) => [
        ...previous,
        {
          wordId: match.id,
          cells: match.cells,
        },
      ]);
    } else {
      setWrongCells(cells.map(([r, c]) => cellKey(r, c)));

      window.setTimeout(() => {
        setWrongCells([]);
      }, 600);
    }
  };
  /* =====================================================
     CANCEL SELECTION
  ===================================================== */

  const cancelSelection = () => {
    setSelecting(false);

    setStartCell(null);

    setCurrentCells([]);

    pointerIdRef.current = null;

    setKeyboardSelecting(false);

    setKeyboardStartCell(null);
  };

  /* =====================================================
     POINTER START
  ===================================================== */

  const handlePointerDown = (event, r, c) => {
    if (showAns || completed) {
      return;
    }

    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    event.preventDefault();

    pointerIdRef.current = event.pointerId;

    setKeyboardSelecting(false);

    setKeyboardStartCell(null);

    setSelecting(true);

    setStartCell([r, c]);

    setCurrentCells([[r, c]]);
  };

  /* =====================================================
     POINTER MOVE
  ===================================================== */

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!selecting || !startCell) {
        return;
      }

      if (
        pointerIdRef.current !== null &&
        event.pointerId !== pointerIdRef.current
      ) {
        return;
      }

      const element = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-grid-cell='true']");

      if (!element) {
        return;
      }

      const r = Number(element.dataset.row);

      const c = Number(element.dataset.col);

      const path = buildPath(startCell[0], startCell[1], r, c);

      /*
        Invalid direction:
        keep the last valid preview
      */

      if (!path) {
        return;
      }

      setCurrentCells(path);
    };

    const handlePointerUp = (event) => {
      if (!selecting) {
        return;
      }

      if (
        pointerIdRef.current !== null &&
        event.pointerId !== pointerIdRef.current
      ) {
        return;
      }

      checkSelection(currentCells);

      setSelecting(false);

      setStartCell(null);

      setCurrentCells([]);

      pointerIdRef.current = null;
    };

    const handlePointerCancel = () => {
      setSelecting(false);

      setStartCell(null);

      setCurrentCells([]);

      pointerIdRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("pointerup", handlePointerUp);

    window.addEventListener("pointercancel", handlePointerCancel);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", handlePointerUp);

      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [selecting, startCell, currentCells, foundWords]);

  /* =====================================================
     KEYBOARD MOVE
  ===================================================== */

  const moveKeyboardCell = (key) => {
    const [currentRow, currentCol] = activeCell;

    const rows = GRID.length;

    const cols = GRID[0].length;

    let nextRow = currentRow;

    let nextCol = currentCol;

    if (key === "ArrowLeft") {
      nextCol = (currentCol - 1 + cols) % cols;
    }

    if (key === "ArrowRight") {
      nextCol = (currentCol + 1) % cols;
    }

    if (key === "ArrowUp") {
      nextRow = (currentRow - 1 + rows) % rows;
    }

    if (key === "ArrowDown") {
      nextRow = (currentRow + 1) % rows;
    }

    setActiveCell([nextRow, nextCol]);

    /*
      If selecting:
      update preview using new cell.
    */

    if (keyboardSelecting && keyboardStartCell) {
      const path = buildPath(
        keyboardStartCell[0],
        keyboardStartCell[1],
        nextRow,
        nextCol,
      );

      if (path) {
        setCurrentCells(path);
      }
    }

    focusCell(nextRow, nextCol);
  };

  /* =====================================================
     KEYBOARD
  ===================================================== */

  const handleCellKeyDown = (event, r, c) => {
    if (showAns || completed) {
      return;
    }

    if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    ) {
      event.preventDefault();

      moveKeyboardCell(event.key);

      return;
    }

    /* ENTER / SPACE */

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      event.stopPropagation();

      if (!keyboardSelecting) {
        setKeyboardSelecting(true);

        setKeyboardStartCell([r, c]);

        setStartCell([r, c]);

        setCurrentCells([[r, c]]);

        return;
      }

      /*
        Second Enter/Space:
        commit selection
      */

      checkSelection(currentCells);

      setKeyboardSelecting(false);

      setKeyboardStartCell(null);

      setStartCell(null);

      setCurrentCells([]);

      return;
    }

    /* ESCAPE */

    if (event.key === "Escape") {
      event.preventDefault();

      event.stopPropagation();

      setKeyboardSelecting(false);

      setKeyboardStartCell(null);

      setStartCell(null);

      setCurrentCells([]);

      return;
    }
  };

  /* =====================================================
     CHECK
  ===================================================== */

  const handleCheck = () => {
    if (showAns || completed) {
      return;
    }

    const score = foundWords.length;
    const total = WORDS.length;

    setChecked(true);

    if (score === total) {
      setCompleted(true);
      setChecked(false);

      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };
  /* =====================================================
     SHOW ANSWER
  ===================================================== */

  const handleShowAnswer = () => {
    setFoundWords(
      WORDS.map((word) => ({
        wordId: word.id,

        cells: word.cells,
      })),
    );

    setWrongCells([]);

    setShowAns(true);

    setChecked(false);

    setCompleted(true);

    cancelSelection();
  };

  /* =====================================================
     START AGAIN
  ===================================================== */

  const handleStartAgain = () => {
    setSelecting(false);

    setStartCell(null);

    setCurrentCells([]);

    setFoundWords([]);

    setWrongCells([]);

    setShowAns(false);

    setChecked(false);

    setCompleted(false);

    setKeyboardSelecting(false);

    setKeyboardStartCell(null);

    setActiveCell([0, 0]);

    pointerIdRef.current = null;

    window.requestAnimationFrame(() => {
      focusCell(0, 0);
    });
  };

  /* =====================================================
     BACKGROUND
  ===================================================== */

  const getCellBg = (r, c) => {
    if (isCellWrong(r, c)) {
      return WRONG_BG;
    }

    if (isCellFound(r, c)) {
      return "rgba(239,68,68,0.18)";
    }

    if (isCellSelecting(r, c) && !showAns) {
      return SELECT_COLOR;
    }

    return "#fff";
  };

  const CELL = "clamp(26px,3.0vw,42px)";

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="main-container-component">
      <style>{`
        /* =================================================
           LAYOUT
        ================================================= */

        .wb-i-layout {
          display: grid;

          grid-template-columns:
            auto 1fr;

          gap:
            clamp(16px, 3vw, 40px);

          align-items:
            start;

          width:
            100%;
        }

        /* =================================================
           GRID CELL FOCUS

           Important:
           no fake active outline.
           Only real keyboard focus.
        ================================================= */

        .wb-i-grid-cell {
          outline:
            none;
        }

        .wb-i-grid-cell:focus {
          outline:
            none;
        }

        .wb-i-grid-cell:focus-visible {
          outline:
            3px solid #2563eb;

          outline-offset:
            -3px;

          position:
            relative;

          z-index:
            5;
        }

        /*
          While keyboard selection is active:
          show dashed focus
        */

        .wb-i-grid.keyboard-selecting
          .wb-i-grid-cell:focus-visible {
          outline:
            3px dashed #2563eb;

          outline-offset:
            -3px;
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 700px) {
          .wb-i-layout {
            grid-template-columns:
              1fr;
          }

          .wb-i-grid-wrap {
            width:
              100% !important;

            overflow-x:
              auto;
          }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          gap: "40px",
        }}
      >
        {/* =================================================
            TITLE
        ================================================= */}

        <ExerciseHeader
          sectionLetter="I"
          title="Find and circle the words."
          subTitle="Find one room word hidden in the grid at a time and verify it against the picture/list before selecting the letters."
        />
        {/* =================================================
            LAYOUT
        ================================================= */}

        <div className="wb-i-layout">
          {/* =================================================
              WORD SEARCH GRID
          ================================================= */}

          <div className="wb-i-grid-wrap">
            <div
              ref={gridRef}
              className={`wb-i-grid ${
                keyboardSelecting ? "keyboard-selecting" : ""
              }`}
              style={{
                display: "inline-grid",

                gridTemplateColumns: `repeat(${GRID[0].length}, ${CELL})`,

                border: `1px solid ${BORDER_COLOR}`,

                borderRadius: "clamp(10px,1.2vw,16px)",

                overflow: "hidden",

                touchAction: "none",

                userSelect: "none",

                flexShrink: 0,
              }}
            >
              {GRID.map((row, r) =>
                row.map((letter, c) => {
                  const isActive = activeCell[0] === r && activeCell[1] === c;

                  return (
                    <div
                      key={`${r}-${c}`}
                      ref={(element) => {
                        cellRefs.current[cellKey(r, c)] = element;
                      }}
                      data-grid-cell="true"
                      data-row={r}
                      data-col={c}
                      role="gridcell"
                      aria-label={`Row ${r + 1}, column ${
                        c + 1
                      }, letter ${letter}`}
                      tabIndex={isActive ? 0 : -1}
                      className="wb-i-grid-cell"
                      onFocus={() => {
                        setActiveCell([r, c]);

                        /*
                              Focus only moves state.
                              It does NOT select.
                            */
                      }}
                      onKeyDown={(event) => handleCellKeyDown(event, r, c)}
                      onPointerDown={(event) => handlePointerDown(event, r, c)}
                      style={{
                        width: CELL,

                        height: CELL,

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        fontSize: "clamp(11px,1.4vw,18px)",

                        color: isCellFound(r, c) ? FOUND_COLOR : "#111",

                        background: getCellBg(r, c),

                        border: "1px solid #e5e7eb",

                        cursor: showAns || completed ? "default" : "pointer",

                        boxSizing: "border-box",

                        transition: "background 0.12s ease, color 0.12s ease",

                        touchAction: "none",

                        userSelect: "none",
                      }}
                    >
                      {letter}
                    </div>
                  );
                }),
              )}
            </div>
          </div>

          {/* =================================================
              SIDE IMAGES
          ================================================= */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns: "repeat(2, minmax(0,1fr))",

              gap: "clamp(8px,1.7vw,18px)",

              width: "100%",

              height: "100%",

              alignItems: "center",
            }}
          >
            {SIDE_IMAGES.map((item) => {
              const missed = isWordMissed(item.wordId);
              const found = isWordFound(item.wordId);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",

                    alignItems: "flex-start",

                    gap: "clamp(3px,0.4vw,6px)",
                  }}
                >
                  {/* NUMBER */}

                  <span
                    style={{
                      fontSize: "clamp(13px,1.4vw,20px)",

                      fontWeight: 500,

                      color: "#111",

                      lineHeight: 1,
                    }}
                  >
                    {item.id}
                  </span>

                  {/* IMAGE */}

                  <div
                    style={{
                      position: "relative",

                      width: "100%",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{
                        width: "100%",

                        height: "100%",

                        objectFit: "contain",

                        display: "block",
                      }}
                    />
                    {found && (
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          backgroundColor: "#22c55e",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          fontWeight: 700,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          border: "2px solid white",
                          zIndex: 2,
                        }}
                      >
                        ✓
                      </span>
                    )}
                    {/* WRONG X */}

                    {missed && (
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",

                          top: "-8px",

                          right: "-8px",

                          width: "22px",

                          height: "22px",

                          borderRadius: "50%",

                          backgroundColor: "red",

                          color: "#fff",

                          display: "flex",

                          alignItems: "center",

                          justifyContent: "center",

                          fontSize: "clamp(9px,0.9vw,12px)",

                          fontWeight: 700,

                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",

                          border: "2px solid white",

                          zIndex: 2,
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
