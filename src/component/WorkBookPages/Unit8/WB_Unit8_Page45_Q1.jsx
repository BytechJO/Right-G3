import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/1_8.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/2_8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/3_6.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/4_6.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/5_6.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/6_8.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/7_6.svg";

const CELL_SIZE = 64;

const ITEMS = [
  {
    id: 1,
    img: img1,
    answer: "radio",
    pairs: [
      { top: "r", bottom: "m" },
      { top: "f", bottom: "a" },
      { top: "d", bottom: "e" },
      { top: "i", bottom: "w" },
      { top: "a", bottom: "o" },
    ],
  },
  {
    id: 2,
    img: img2,
    answer: "tractor",
    pairs: [
      { top: "t", bottom: "y" },
      { top: "w", bottom: "r" },
      { top: "a", bottom: "b" },
      { top: "c", bottom: "m" },
      { top: "d", bottom: "t" },
      { top: "e", bottom: "o" },
      { top: "r", bottom: "k" },
    ],
  },
  {
    id: 3,
    img: img3,
    answer: "farm",
    pairs: [
      { top: "f", bottom: "k" },
      { top: "s", bottom: "a" },
      { top: "r", bottom: "x" },
      { top: "e", bottom: "m" },
    ],
  },
  {
    id: 4,
    img: img4,
    answer: "cottage",
    pairs: [
      { top: "c", bottom: "h" },
      { top: "p", bottom: "o" },
      { top: "o", bottom: "t" },
      { top: "t", bottom: "c" },
      { top: "j", bottom: "a" },
      { top: "g", bottom: "r" },
      { top: "q", bottom: "e" },
    ],
  },
  {
    id: 5,
    img: img5,
    answer: "dog",
    pairs: [
      { top: "d", bottom: "v" },
      { top: "w", bottom: "o" },
      { top: "g", bottom: "z" },
    ],
  },
  {
    id: 6,
    img: img6,
    answer: "sheep",
    pairs: [
      { top: "t", bottom: "s" },
      { top: "h", bottom: "d" },
      { top: "e", bottom: "x" },
      { top: "i", bottom: "e" },
      { top: "p", bottom: "v" },
    ],
  },
  {
    id: 7,
    img: img7,
    answer: "horse",
    pairs: [
      { top: "h", bottom: "g" },
      { top: "f", bottom: "o" },
      { top: "r", bottom: "w" },
      { top: "s", bottom: "q" },
      { top: "e", bottom: "o" },
    ],
  },
];

function DiagonalChoiceCell({
  pair,
  selected,
  disabled,
  onSelectTop,
  onSelectBottom,
}) {
  const topActive = selected === "top";
  const bottomActive = selected === "bottom";

  return (
    <div
      style={{
        position: "relative",
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        border: "2px solid #2b2b2b",
        borderRadius: "10px",
        backgroundColor: "#fff",
        overflow: "hidden",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      {/* Top clickable area */}
      <button
        type="button"
        disabled={disabled}
        onClick={onSelectTop}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          border: "none",
          backgroundColor: topActive ? "#fde68a" : "transparent",
          cursor: disabled ? "default" : "pointer",
          zIndex: 1,
        }}
      />

      {/* Bottom clickable area */}
      <button
        type="button"
        disabled={disabled}
        onClick={onSelectBottom}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          border: "none",
          backgroundColor: bottomActive ? "#fde68a" : "transparent",
          cursor: disabled ? "default" : "pointer",
          zIndex: 1,
        }}
      />

      {/* diagonal */}
      <svg
        width={CELL_SIZE}
        height={CELL_SIZE}
        viewBox={`0 0 ${CELL_SIZE} ${CELL_SIZE}`}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <line
          x1="2"
          y1={CELL_SIZE - 2}
          x2={CELL_SIZE - 2}
          y2="2"
          stroke="#2b2b2b"
          strokeWidth="2"
        />
      </svg>

      {/* letters */}
      <span
        style={{
          position: "absolute",
          top: "8px",
          left: "14px",
          fontSize: "30px",
          fontWeight: "500",
          color: "#111",
          zIndex: 3,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {pair.top}
      </span>

      <span
        style={{
          position: "absolute",
          right: "12px",
          bottom: "6px",
          fontSize: "30px",
          fontWeight: "500",
          color: "#111",
          zIndex: 3,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {pair.bottom}
      </span>
    </div>
  );
}

export default function WB_Unit8_Page45_QA() {
  const [selections, setSelections] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const buildWord = (itemId) => {
    const item = ITEMS.find((x) => x.id === itemId);
    const current = selections[itemId] || [];

    return item.pairs
      .map((pair, index) => {
        const side = current[index];
        if (side === "top") return pair.top;
        if (side === "bottom") return pair.bottom;
        return "";
      })
      .join("");
  };

  const isRowComplete = (item) => {
    const current = selections[item.id] || [];
    return current.length === item.pairs.length && current.every(Boolean);
  };

  const isRowCorrect = (item) => {
    return buildWord(item.id).toLowerCase() === item.answer.toLowerCase();
  };

  const handleSelect = (itemId, index, side) => {
    if (showAns) return;

    setSelections((prev) => {
      const current = prev[itemId] ? [...prev[itemId]] : [];
      current[index] = side;
      return {
        ...prev,
        [itemId]: current,
      };
    });
  };

  const handleCheck = () => {
    const allAnswered = ITEMS.every((item) => isRowComplete(item));

    if (!allAnswered) {
      ValidationAlert.info("Please complete all words first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((item) => {
      if (isRowCorrect(item)) score++;
    });

    setChecked(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const solved = {};

    ITEMS.forEach((item) => {
      solved[item.id] = item.pairs.map((pair, index) => {
        const expected = item.answer[index];
        return pair.top.toLowerCase() === expected ? "top" : "bottom";
      });
    });

    setSelections(solved);
    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setSelections({});
    setChecked(false);
    setShowAns(false);
  };

  const getLineWidth = (answer) => {
    return Math.max(220, answer.length * 30);
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Find and write the words.
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(420px, 1fr) 110px minmax(240px, 340px)",
                gap: "22px",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* Number + cells */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: "28px",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "700",
                    color: "#111",
                    flexShrink: 0,
                  }}
                >
                  {item.id}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2px",
                    minWidth: 0,
                  }}
                >
                  {item.pairs.map((pair, index) => (
                    <DiagonalChoiceCell
                      key={`${item.id}-${index}`}
                      pair={pair}
                      selected={(selections[item.id] || [])[index]}
                      disabled={showAns}
                      onSelectTop={() => handleSelect(item.id, index, "top")}
                      onSelectBottom={() => handleSelect(item.id, index, "bottom")}
                    />
                  ))}
                </div>
              </div>

              {/* image */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
                  style={{
                    width: "84px",
                    height: "84px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* answer */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: `${getLineWidth(item.answer)}px`,
                    maxWidth: "100%",
                    minHeight: "40px",
                    borderBottom: "2px solid #666",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "24px",
                    color: buildWord(item.id) ? "#dc2626" : "#222",
                    fontWeight: "500",
                    paddingBottom: "2px",
                    textTransform: "lowercase",
                  }}
                >
                  {buildWord(item.id)}
                </div>

                {checked && isRowComplete(item) && !isRowCorrect(item) && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}