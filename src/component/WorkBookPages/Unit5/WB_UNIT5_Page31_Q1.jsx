import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I4.svg";
import img5 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I5.svg";
import img6 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I6.svg";

const BORDER_COLOR = "#f39b42";
const FOUND_COLOR  = "#ef4444";
const SELECT_COLOR = "rgba(251,191,36,0.45)";
const WRONG_BG     = "rgba(239,68,68,0.35)";

const GRID = [
  ["l","b","a","t","h","r","o","o","m","m"],
  ["i","i","g","a","r","a","g","e","n","b"],
  ["v","o","e","e","k","a","n","m","n","a"],
  ["i","m","o","e","i","s","b","x","e","s"],
  ["n","a","r","a","t","e","e","q","s","e"],
  ["g","e","v","r","c","m","d","a","c","m"],
  ["r","k","o","r","h","l","r","g","s","e"],
  ["o","o","p","r","e","n","o","v","i","n"],
  ["o","c","o","r","n","t","o","b","q","t"],
  ["m","n","w","r","v","m","m","r","m","n"],
];

// الكلمات الـ 6 بالزبط من الصورة:
// bathroom   → row0 أفقي  c1→c8
// garage     → row1 أفقي  c2→c7
// kitchen    → col4 عمودي r2→r8
// bedroom    → col9 عمودي r1→r7
// livingroom → col0 عمودي r0→r9
// basement   → col6 عمودي r2→r7  (n,b,e,d,r,o... اضبط إذا الحروف مختلفة)

const WORDS = [
  {
    id: 1,
    word: "bathroom",
    cells: [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8]],
  },
  {
    id: 2,
    word: "garage",
    cells: [[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],
  },
  {
    id: 3,
    word: "kitchen",
    cells: [[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],[8,4]],
  },
  {
    id: 4,
    word: "bedroom",
    cells: [[1,9],[2,9],[3,9],[4,9],[5,9],[6,9],[7,9]],
  },
  {
    id: 5,
    word: "living room",
    cells: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]],
  },
  {
    id: 6,
    word: "basement",
    cells: [[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6]],
  },
];

const SIDE_IMAGES = [
  { id: 1, img: img1, wordId: 4 },
  { id: 2, img: img2, wordId: 2 },
  { id: 3, img: img3, wordId: 6 },
  { id: 4, img: img4, wordId: 3 },
  { id: 5, img: img5, wordId: 5 },
  { id: 6, img: img6, wordId: 1 },
];

const cellKey = (r, c) => `${r}-${c}`;

const setsEqual = (a, b) => {
  if (a.length !== b.length) return false;
  const bSet = new Set(b.map(([r, c]) => cellKey(r, c)));
  return a.every(([r, c]) => bSet.has(cellKey(r, c)));
};

const getCellsBetween = (r1, c1, r2, c2) => {
  const cells = [];
  if (r1 === r2) {
    const [from, to] = c1 < c2 ? [c1, c2] : [c2, c1];
    for (let c = from; c <= to; c++) cells.push([r1, c]);
  } else if (c1 === c2) {
    const [from, to] = r1 < r2 ? [r1, r2] : [r2, r1];
    for (let r = from; r <= to; r++) cells.push([r, c1]);
  } else {
    cells.push([r1, c1]);
  }
  return cells;
};

export default function SB_WordSearch_PageI() {
  const [selecting,    setSelecting]    = useState(false);
  const [startCell,    setStartCell]    = useState(null);
  const [currentCells, setCurrentCells] = useState([]);
  const [foundWords,   setFoundWords]   = useState([]);
  const [wrongCells,   setWrongCells]   = useState([]);
  const [showAns,      setShowAns]      = useState(false);
  const gridRef = useRef(null);

  const isCellFound     = (r, c) => foundWords.some((f) => f.cells.some(([fr, fc]) => fr === r && fc === c));
  const isCellSelecting = (r, c) => currentCells.some(([sr, sc]) => sr === r && sc === c);
  const isCellWrong     = (r, c) => wrongCells.includes(cellKey(r, c));
  const isWordFound     = (wordId) => foundWords.some((f) => f.wordId === wordId);

  const checkSelection = (cells) => {
    if (cells.length < 2) return;
    const match = WORDS.find(
      (w) => setsEqual(w.cells, cells) && !foundWords.find((f) => f.wordId === w.id)
    );
    if (match) {
      setFoundWords((prev) => [...prev, { wordId: match.id, cells: match.cells }]);
    } else {
      setWrongCells(cells.map(([r, c]) => cellKey(r, c)));
      setTimeout(() => setWrongCells([]), 600);
    }
  };

  const handleMouseDown  = (r, c) => {
    if (showAns) return;
    setSelecting(true);
    setStartCell([r, c]);
    setCurrentCells([[r, c]]);
  };
  const handleMouseEnter = (r, c) => {
    if (!selecting || !startCell) return;
    setCurrentCells(getCellsBetween(startCell[0], startCell[1], r, c));
  };
  const handleMouseUp = () => {
    if (!selecting) return;
    setSelecting(false);
    checkSelection(currentCells);
    setStartCell(null);
    setCurrentCells([]);
  };

  const getCellFromTouch = (touch) => {
    const els = document.elementsFromPoint(touch.clientX, touch.clientY);
    for (const el of els) {
      if (el.dataset.row !== undefined && el.dataset.col !== undefined)
        return [parseInt(el.dataset.row), parseInt(el.dataset.col)];
    }
    return null;
  };
  const handleTouchStart = (e) => {
    if (showAns) return;
    const cell = getCellFromTouch(e.touches[0]);
    if (!cell) return;
    setSelecting(true);
    setStartCell(cell);
    setCurrentCells([cell]);
  };
  const handleTouchMove = (e) => {
    if (!selecting || !startCell) return;
    const cell = getCellFromTouch(e.touches[0]);
    if (!cell) return;
    setCurrentCells(getCellsBetween(startCell[0], startCell[1], cell[0], cell[1]));
  };
  const handleTouchEnd = () => {
    if (!selecting) return;
    setSelecting(false);
    checkSelection(currentCells);
    setStartCell(null);
    setCurrentCells([]);
  };

  const handleCheck = () => {
    if (showAns) return;
    if (foundWords.length === 0) {
      ValidationAlert.info("Find at least one word first.");
      return;
    }
    const score = foundWords.length;
    const total = WORDS.length;
    if (score === total)  ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0)   ValidationAlert.warning(`Score: ${score} / ${total}`);
    else                  ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setFoundWords(WORDS.map((w) => ({ wordId: w.id, cells: w.cells })));
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelecting(false);
    setStartCell(null);
    setCurrentCells([]);
    setFoundWords([]);
    setWrongCells([]);
    setShowAns(false);
  };

  const getCellBg = (r, c) => {
    if (isCellWrong(r, c))                 return WRONG_BG;
    if (isCellFound(r, c))                 return "rgba(239,68,68,0.18)";
    if (isCellSelecting(r, c) && !showAns) return SELECT_COLOR;
    return "#fff";
  };

  const CELL = "clamp(30px,4.2vw,50px)";

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "18px",
          maxWidth:      "1100px",
          margin:        "0 auto",
        }}
      >
        {/* Title */}
        <h1
          className="WB-header-title-page8"
          style={{
            margin:      0,
            display:     "flex",
            alignItems:  "center",
            gap:         "12px",
            flexWrap:    "wrap",
          }}
        >
          <span className="WB-ex-A">I</span> Find and circle the words.
        </h1>

        {/* Main layout */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "auto 1fr",
            gap:                 "clamp(20px,3vw,40px)",
            alignItems:          "start",
            width:               "100%",
          }}
        >
          {/* ── Word Search Grid ── */}
          <div
            ref={gridRef}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              display:             "inline-grid",
              gridTemplateColumns: `repeat(${GRID[0].length}, ${CELL})`,
              border:              `2px solid ${BORDER_COLOR}`,
              borderRadius:        "clamp(10px,1.2vw,16px)",
              overflow:            "hidden",
              background:          "#fff",
              touchAction:         "none",
              userSelect:          "none",
              flexShrink:          0,
            }}
          >
            {GRID.map((row, r) =>
              row.map((letter, c) => (
                <div
                  key={`${r}-${c}`}
                  data-row={r}
                  data-col={c}
                  onMouseDown={() => handleMouseDown(r, c)}
                  onMouseEnter={() => handleMouseEnter(r, c)}
                  onMouseUp={handleMouseUp}
                  style={{
                    width:          CELL,
                    height:         CELL,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       "clamp(13px,1.8vw,22px)",
                    fontWeight:     600,
                    color:          isCellFound(r, c) ? FOUND_COLOR : "#111",
                    background:     getCellBg(r, c),
                    border:         "1px solid #e5e7eb",
                    cursor:         showAns ? "default" : "pointer",
                    boxSizing:      "border-box",
                    transition:     "background 0.12s ease, color 0.12s ease",
                  }}
                >
                  {letter}
                </div>
              ))
            )}
          </div>

          {/* ── Side images 2×3 — بدون أسماء ── */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap:                 "clamp(10px,1.5vw,20px)",
              width:               "100%",
            }}
          >
            {SIDE_IMAGES.map((item) => {
              const found = isWordFound(item.wordId);
              return (
                <div
                  key={item.id}
                  style={{
                    display:       "flex",
                    flexDirection: "column",
                    alignItems:    "flex-start",
                    gap:           "clamp(4px,0.5vw,7px)",
                  }}
                >
                  {/* number */}
                  <span
                    style={{
                      fontSize:   "clamp(15px,1.8vw,26px)",
                      fontWeight: 700,
                      color:      "#111",
                      lineHeight: 1,
                    }}
                  >
                    {item.id}
                  </span>

                  {/* image فقط بدون label */}
                  <div
                    style={{
                      width:          "100%",
                      aspectRatio:    "1.6 / 1",
                      overflow:       "hidden",
                      borderRadius:   "clamp(8px,1vw,14px)",
                      border:         `2.5px solid ${found ? FOUND_COLOR : BORDER_COLOR}`,
                      background:     "#f0f0f0",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      boxSizing:      "border-box",
                      boxShadow:      found ? `0 0 0 2px ${FOUND_COLOR}` : "none",
                      transition:     "border-color 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`room-${item.id}`}
                      style={{
                        width:      "100%",
                        height:     "100%",
                        objectFit:  "cover",
                        display:    "block",
                        opacity:    found ? 1 : 0.85,
                        transition: "opacity 0.3s",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            marginTop:      "clamp(6px,1vw,12px)",
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