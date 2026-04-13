import React, { useState, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ✅ استبدل هذه المسارات بمسارات صور الغرف عندك
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 31/I6.svg";

// ─────────────────────────────────────────────
// الكلمات المخفية + الصور المقابلة
// ─────────────────────────────────────────────
const WORDS = [
  { word: "bathroom",   img: img1, num: 1 },
  { word: "bedroom",    img: img2, num: 2 },
  { word: "kitchen",    img: img3, num: 3 },
  { word: "livingroom", img: img4, num: 4 },
  { word: "garage",     img: img5, num: 5 },
  { word: "garden",     img: img6, num: 6 },
];

// ─────────────────────────────────────────────
// الـ Grid
// ─────────────────────────────────────────────
const GRID = [
  ["l","r","b","a","t","h","r","o","o","m"],
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

// مواقع الكلمات الصحيحة
const WORD_POSITIONS = {
  bathroom:   [{r:0,c:2},{r:0,c:3},{r:0,c:4},{r:0,c:5},{r:0,c:6},{r:0,c:7},{r:0,c:8},{r:0,c:9}],
  bedroom:    [{r:1,c:1},{r:2,c:1},{r:3,c:1},{r:4,c:1},{r:5,c:1},{r:6,c:1},{r:7,c:1}],
  kitchen:    [{r:2,c:4},{r:3,c:4},{r:4,c:4},{r:5,c:3},{r:6,c:2},{r:7,c:5},{r:8,c:6}],
  livingroom: [{r:2,c:0},{r:3,c:0},{r:4,c:0},{r:5,c:0},{r:6,c:0},{r:7,c:0},{r:8,c:0},{r:9,c:0},{r:0,c:0},{r:1,c:0}],
  garage:     [{r:1,c:2},{r:1,c:3},{r:1,c:4},{r:1,c:5},{r:1,c:6},{r:1,c:7}],
  garden:     [{r:1,c:8},{r:2,c:8},{r:3,c:8},{r:4,c:8},{r:5,c:8},{r:6,c:8}],
};

// ألوان لكل كلمة
const WORD_COLORS = [
  "#f97316", "#3b82f6", "#22c55e",
  "#a855f7", "#ef4444", "#eab308",
];

// ─────────────────────────────────────────────
const WB_UNIT5_Page31_Q1 = ()=> {
  const [selecting, setSelecting]       = useState(false);
  const [selection, setSelection]       = useState([]);
  const [foundWords, setFoundWords]     = useState([]);
  const [circledCells, setCircledCells] = useState({});
  const [checked, setChecked]           = useState(false);
  const [answerShown, setAnswerShown]   = useState(false); // ✅ جديد

  const startCell = useRef(null);

  const key = (r, c) => `${r}-${c}`;

  const getCellsBetween = (a, b) => {
    const cells = [];
    const dr = Math.sign(b.r - a.r);
    const dc = Math.sign(b.c - a.c);
    const rowDiff = Math.abs(b.r - a.r);
    const colDiff = Math.abs(b.c - a.c);
    if (dr !== 0 && dc !== 0 && rowDiff !== colDiff) return [a];
    let cur = { ...a };
    while (cur.r !== b.r || cur.c !== b.c) {
      cells.push({ ...cur });
      cur = { r: cur.r + dr, c: cur.c + dc };
    }
    cells.push({ ...b });
    return cells;
  };

  const checkSelection = (cells) => {
    const selKeys = cells.map(c => key(c.r, c.c)).sort().join(",");
    for (const [word, positions] of Object.entries(WORD_POSITIONS)) {
      if (foundWords.includes(word)) continue;
      const posKeys = positions.map(p => key(p.r, p.c)).sort().join(",");
      if (selKeys === posKeys) return word;
    }
    return null;
  };

  const getCell = (e) => {
    const el = e.target.closest("[data-cell]");
    if (!el) return null;
    return { r: +el.dataset.r, c: +el.dataset.c };
  };

  const onStart = (e) => {
    if (answerShown) return; // ✅ لا تسمح بالتحديد بعد Show Answer
    const cell = getCell(e);
    if (!cell) return;
    startCell.current = cell;
    setSelecting(true);
    setSelection([cell]);
  };

  const onMove = (e) => {
    if (!selecting || !startCell.current) return;
    e.preventDefault();
    let cell;
    if (e.touches) {
      const touch = e.touches[0];
      const el = document.elementFromPoint(touch.clientX, touch.clientY)?.closest("[data-cell]");
      if (!el) return;
      cell = { r: +el.dataset.r, c: +el.dataset.c };
    } else {
      cell = getCell(e);
    }
    if (!cell) return;
    setSelection(getCellsBetween(startCell.current, cell));
  };

  const onEnd = () => {
    if (!selecting) return;
    setSelecting(false);
    const matched = checkSelection(selection);
    if (matched) {
      const colorIdx = foundWords.length % WORD_COLORS.length;
      const newCircled = { ...circledCells };
      selection.forEach(c => { newCircled[key(c.r, c.c)] = colorIdx; });
      setCircledCells(newCircled);
      setFoundWords(prev => [...prev, matched]);
    }
    setSelection([]);
    startCell.current = null;
  };

  // ── Check ──
  const handleCheck = () => {
    setChecked(true);
    if (foundWords.length === WORDS.length) {
      ValidationAlert.success("Excellent! All words found! 🎉");
    } else {
      ValidationAlert.error(`Found ${foundWords.length} of ${WORDS.length} words. Keep trying! 🔍`);
    }
  };

  // ── Show Answer ✅ ──
  const handleShowAnswer = () => {
    const newCircled = { ...circledCells };

    WORDS.forEach((w, i) => {
      if (foundWords.includes(w.word)) return; // الكلمات اللي اتوجدت ابقها بلونها
      const positions = WORD_POSITIONS[w.word];
      const colorIdx = i % WORD_COLORS.length;
      positions.forEach(p => {
        newCircled[key(p.r, p.c)] = colorIdx;
      });
    });

    setCircledCells(newCircled);
    setFoundWords(WORDS.map(w => w.word));
    setAnswerShown(true);
    setSelection([]);
  };

  // ── Reset ──
  const handleReset = () => {
    setFoundWords([]);
    setCircledCells({});
    setSelection([]);
    setChecked(false);
    setAnswerShown(false); // ✅ reset الـ answerShown
  };

  // ── لون الخلية ──
  const getCellStyle = (r, c) => {
    const k = key(r, c);
    if (selection.some(s => s.r === r && s.c === c)) {
      return { background: "#bfdbfe", borderRadius: 4 };
    }
    if (circledCells[k] !== undefined) {
      return {
        background: WORD_COLORS[circledCells[k]] + "33",
        outline: `2px solid ${WORD_COLORS[circledCells[k]]}`,
        borderRadius: 4,
      };
    }
    return {};
  };

  // ─────────────────────────────────────────────
  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "15px" }}>

        {/* العنوان */}
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">1</span> Find and circle the words.
        </h1>

        {/* المحتوى: grid + صور */}
        <div className="flex gap-4 items-start flex-wrap">

          {/* ── الـ Grid ── */}
          <div
            className="select-none bg-white border-2 border-gray-200 rounded-2xl p-3 shadow-sm"
            onMouseDown={onStart}
            onMouseMove={onMove}
            onMouseUp={onEnd}
            onMouseLeave={onEnd}
            onTouchStart={onStart}
            onTouchMove={onMove}
            onTouchEnd={onEnd}
            style={{ touchAction: "none" }}
          >
            {GRID.map((row, r) => (
              <div key={r} className="flex">
                {row.map((letter, c) => (
                  <div
                    key={c}
                    data-cell
                    data-r={r}
                    data-c={c}
                    className="flex items-center justify-center font-mono font-semibold text-gray-700 cursor-pointer"
                    style={{
                      width: 32, height: 32,
                      fontSize: 14,
                      ...getCellStyle(r, c),
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ── الصور الـ 6 ── */}
          <div className="grid grid-cols-2 gap-2" style={{ flex: 1, minWidth: 200 }}>
            {WORDS.map((w, i) => {
              const found = foundWords.includes(w.word);
              return (
                <div
                  key={w.word}
                  className={`flex flex-col items-center rounded-xl border-2 p-1 transition-all
                    ${found ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}
                >
                  <div className="relative w-full">
                    <img
                      src={w.img}
                      alt={w.word}
                      className="w-full rounded-lg"
                      style={{ height: 70, objectFit: "cover" }}
                    />
                    {/* رقم */}
                    <span
                      className="absolute top-1 left-1 text-xs font-bold text-white rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ background: WORD_COLORS[i] }}
                    >
                      {w.num}
                    </span>
                    {/* ✅ إذا اتوجدت */}
                    {found && (
                      <span className="absolute top-1 right-1 text-green-500 text-lg">✅</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* عداد الكلمات */}
        <p className="text-sm text-gray-500 text-center">
          Found: <span className="font-bold text-orange-500">{foundWords.length}</span> / {WORDS.length} words
        </p>

        {/* الأزرار */}
        <div className="mt-4 flex justify-center">
          <Button
            checkAnswers={handleCheck}
            handleStartAgain={handleReset}
            showAnswer={handleShowAnswer}   
          />
        </div>

      </div>
    </div>
  );
}

export default WB_UNIT5_Page31_Q1