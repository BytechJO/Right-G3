import React, { useMemo, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const MONTHS = [
  { id: 1, word: "March", correct: 3, column: "left" },
  { id: 2, word: "September", correct: 9, column: "left" },
  { id: 3, word: "June", correct: 6, column: "left" },
  { id: 4, word: "December", correct: 12, column: "left" },
  { id: 5, word: "August", correct: 8, column: "left" },
  { id: 6, word: "January", correct: 1, column: "left" },

  { id: 7, word: "July", correct: 7, column: "right" },
  { id: 8, word: "November", correct: 11, column: "right" },
  { id: 9, word: "February", correct: 2, column: "right" },
  { id: 10, word: "May", correct: 5, column: "right" },
  { id: 11, word: "October", correct: 10, column: "right" },
  { id: 12, word: "April", correct: 4, column: "right" },
];

const NUMBER_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

function TraceWordRow({
  item,
  value,
  onChange,
  checked,
  showAns,
  isWrong,
  strokes,
  setStrokes,
}) {
  const svgRef = useRef(null);
  const isDrawingRef = useRef(false);

  const startStroke = (x, y) => {
    setStrokes((prev) => ({
      ...prev,
      [item.id]: [...(prev[item.id] || []), [{ x, y }]],
    }));
  };

  const appendPoint = (x, y) => {
    setStrokes((prev) => {
      const current = prev[item.id] || [];
      if (!current.length) return prev;

      const updated = [...current];
      const lastStroke = updated[updated.length - 1];
      updated[updated.length - 1] = [...lastStroke, { x, y }];

      return {
        ...prev,
        [item.id]: updated,
      };
    });
  };

  const getPoint = (e) => {
    const svg = svgRef.current;
    if (!svg) return null;

    const rect = svg.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 520,
      y: ((e.clientY - rect.top) / rect.height) * 95,
    };
  };

  const handlePointerDown = (e) => {
    if (showAns) return;
    const point = getPoint(e);
    if (!point) return;

    isDrawingRef.current = true;
    startStroke(point.x, point.y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || showAns) return;
    const point = getPoint(e);
    if (!point) return;

    appendPoint(point.x, point.y);
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handleClearTrace = () => {
    if (showAns) return;
    setStrokes((prev) => ({
      ...prev,
      [item.id]: [],
    }));
  };

  const currentValue = showAns ? item.correct : value || "";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "58px 1fr 28px",
        alignItems: "center",
        gap: "14px",
        minHeight: "82px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "58px",
          height: "48px",
          border: "3px solid #ababab",
          borderRadius: "14px",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <select
          value={String(currentValue)}
          disabled={showAns}
          onChange={(e) => onChange(item.id, Number(e.target.value))}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "#000000ff",
            fontSize: "26px",
            textAlign: "center",
            textAlignLast: "center",
            fontWeight: "500",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            cursor: showAns ? "default" : "pointer",
            padding: "0 12px 0 8px",
          }}
        >
          <option value="" disabled>
            -
          </option>
          {NUMBER_OPTIONS.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        {!showAns && (
          <span
            style={{
              position: "absolute",
              right: "6px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "10px",
              color: "#666",
              pointerEvents: "none",
            }}
          >
            ▼
          </span>
        )}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "82px",
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 520 95"
          preserveAspectRatio="none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            touchAction: "none",
            cursor: showAns ? "default" : "crosshair",
          }}
        >
          <line
            x1="20"
            y1="72"
            x2="510"
            y2="72"
            stroke="#2a2a2a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <text
            x="24"
            y="66"
            fill="transparent"
            stroke="#222"
            strokeWidth="1.7"
            strokeDasharray="4 4"
            fontSize="54"
            fontWeight="500"
            fontFamily="'Comic Sans MS', 'Trebuchet MS', sans-serif"
          >
            {item.word}
          </text>

          {(strokes[item.id] || []).map((stroke, index) => (
            <polyline
              key={index}
              fill="none"
              stroke="#000000ff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={stroke.map((p) => `${p.x},${p.y}`).join(" ")}
            />
          ))}
        </svg>

        {!showAns && (
          <button
            type="button"
            onClick={handleClearTrace}
            style={{
              position: "absolute",
              right: "4px",
              top: "-6px",
              border: "none",
              background: "#f3f4f6",
              color: "#555",
              borderRadius: "8px",
              fontSize: "11px",
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}

        {isWrong && (
          <div
            style={{
              position: "absolute",
              right: "-8px",
              top: "24px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
            }}
          >
            ✕
          </div>
        )}
      </div>

      <div />
    </div>
  );
}

export default function WB_UnitX_Page23_QF() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [strokes, setStrokes] = useState({});

  const leftItems = useMemo(
    () => MONTHS.filter((item) => item.column === "left"),
    []
  );
  const rightItems = useMemo(
    () => MONTHS.filter((item) => item.column === "right"),
    []
  );

  const handleChange = (id, value) => {
    if (showAns) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = MONTHS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    MONTHS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setChecked(true);

    if (score === MONTHS.length) {
      ValidationAlert.success(`Score: ${score} / ${MONTHS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${MONTHS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${MONTHS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};
    MONTHS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setStrokes({});
  };

  const isWrong = (item) => {
    if (!checked) return false;
    return answers[item.id] !== item.correct;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
            style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">F</span> Trace and number.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "26px 44px",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {leftItems.map((item) => (
              <TraceWordRow
                key={item.id}
                item={item}
                value={answers[item.id]}
                onChange={handleChange}
                checked={checked}
                showAns={showAns}
                isWrong={isWrong(item)}
                strokes={strokes}
                setStrokes={setStrokes}
              />
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {rightItems.map((item) => (
              <TraceWordRow
                key={item.id}
                item={item}
                value={answers[item.id]}
                onChange={handleChange}
                checked={checked}
                showAns={showAns}
                isWrong={isWrong(item)}
                strokes={strokes}
                setStrokes={setStrokes}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "6px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}