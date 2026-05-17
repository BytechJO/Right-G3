import React, { useLayoutEffect, useRef, useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const PATH_COLOR = "#f39b42";
const TEXT_COLOR = "#111";

const LEFT_ITEMS = [
  { id: 1, text: "first" },
  { id: 2, text: "second" },
  { id: 3, text: "third" },
  { id: 4, text: "fourth" },
  { id: 5, text: "fifth" },
  { id: 6, text: "sixth" },
  { id: 7, text: "seventh" },
  { id: 8, text: "eighth" },
  { id: 9, text: "ninth" },
  { id: 10, text: "tenth" },
];

const RIGHT_ITEMS = [
  { id: 1, letter: "a", text: "3rd" },
  { id: 2, letter: "b", text: "4th" },
  { id: 3, letter: "c", text: "1st" },
  { id: 4, letter: "d", text: "2nd" },
  { id: 5, letter: "e", text: "8th" },
  { id: 6, letter: "f", text: "6th" },
  { id: 7, letter: "g", text: "9th" },
  { id: 8, letter: "h", text: "10th" },
  { id: 9, letter: "i", text: "7th" },
  { id: 10, letter: "j", text: "5th" },
];

// 7th→seventh, 8th→eighth, 9th→ninth, 10th→tenth, 1st→first, 2nd→second
const CORRECT_MATCHES = {
  1: 3, // b → fourth
  2: 4, // c → first
  3: 1, // d → second
  4: 2, // e → eighth
  5: 10, // f → sixth
  6: 6, // g → ninth
  7: 9, // h → tenth
  8: 5, // i → seventh
  9: 7, // j → fifth
  10: 8,
};

export default function Review6_Page1_Q2() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [paths, setPaths] = useState([]);

  const boardRef = useRef(null);
  const pointRefs = useRef({});

  // ── SVG paths ──
  useLayoutEffect(() => {
    const update = () => {
      if (!boardRef.current) return;
      const br = boardRef.current.getBoundingClientRect();

      const newPaths = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const s = pointRefs.current[`left-${leftId}`];
          const e = pointRefs.current[`right-${rightId}`];
          if (!s || !e) return null;

          const sr = s.getBoundingClientRect();
          const er = e.getBoundingClientRect();
          const x1 = sr.left + sr.width / 2 - br.left;
          const y1 = sr.top + sr.height / 2 - br.top;
          const x2 = er.left + er.width / 2 - br.left;
          const y2 = er.top + er.height / 2 - br.top;
          const dx = Math.abs(x2 - x1);

          const isWrong =
            showResults &&
            matches[Number(leftId)] !== CORRECT_MATCHES[Number(leftId)];

          return {
            id: `path-${leftId}-${rightId}`,
            d: `M ${x1} ${y1} C ${x1 + dx * 0.45} ${y1}, ${x2 - dx * 0.45} ${y2}, ${x2} ${y2}`,
            color: isWrong ? WRONG_COLOR : PATH_COLOR,
          };
        })
        .filter(Boolean);

      setPaths(newPaths);
    };

    update();
    window.addEventListener("resize", update);
    let obs;
    if (boardRef.current && typeof ResizeObserver !== "undefined") {
      obs = new ResizeObserver(update);
      obs.observe(boardRef.current);
    }
    return () => {
      window.removeEventListener("resize", update);
      obs?.disconnect();
    };
  }, [matches, showResults]);

  const handleLeftSelect = (id) => {
    if (showAns || showResults) return;
    setSelectedLeft((prev) => (prev === id ? null : id));
    setShowResults(false);
  };

  const handleRightSelect = (rightId) => {
    if (showAns || selectedLeft === null || showResults) return;
    const upd = { ...matches };
    Object.keys(upd).forEach((k) => {
      if (upd[k] === rightId) delete upd[k];
    });
    upd[selectedLeft] = rightId;
    setMatches(upd);
    setSelectedLeft(null);
    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || showResults) return;
    const allConnected = LEFT_ITEMS.every((i) => matches[i.id]);
    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    let score = 0;
    LEFT_ITEMS.forEach((i) => {
      if (matches[i.id] === CORRECT_MATCHES[i.id]) score++;
    });
    setShowResults(true);
    const total = LEFT_ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    setMatches({ ...CORRECT_MATCHES });
    setShowResults(true);
    setShowAns(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setPaths([]);
  };

  const getLeftConn = (id) => !!matches[id];
  const getRightConn = (id) => Object.values(matches).includes(id);
  const isWrongMatch = (leftId) =>
    showResults &&
    !!matches[leftId] &&
    matches[leftId] !== CORRECT_MATCHES[leftId];

  const WrongBadge = () => (
    <div
      style={{
        position: "absolute",
        top: "-7px",
        right: "-7px",
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "red",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
        border: "2px solid white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      ✕
    </div>
  );

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "28px",
        }}
      >
        {/* Title */}
        <h1 className="WB-header-title-page8">
          <span style={{ marginRight: "10px" }}>B</span> Match.
        </h1>

        {/* Board */}
        <div ref={boardRef} style={{ position: "relative", width: "100%" }}>
          {/* SVG lines */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
              zIndex: 1,
            }}
          >
            {paths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill="none"
                stroke={ACTIVE_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Grid: left text | left dot | right dot | right text */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto 1fr auto",
              columnGap: "clamp(8px,2vw,24px)",
              rowGap: "11px",
              alignItems: "center",
              width: "100%",
            }}
          >
            {LEFT_ITEMS.map((lItem, idx) => {
              const rItem = RIGHT_ITEMS[idx];
              const lConn = getLeftConn(lItem.id);
              const rConn = getRightConn(rItem.id);
              const lSelected = selectedLeft === lItem.id;
              const wrong = isWrongMatch(lItem.id);

              return (
                <React.Fragment key={lItem.id}>
                  {/* ── Left text ── */}
                  <div
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      position: "relative",
                      fontSize: "clamp(16px,1.5vw,20px)",
                      // fontWeight:   700,
                      color: wrong
                        ? TEXT_COLOR
                        : lSelected
                          ? ACTIVE_COLOR
                          : TEXT_COLOR,
                      lineHeight: 1,
                      cursor: showAns || showResults ? "default" : "pointer",
                      userSelect: "none",
                      padding: "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: lSelected
                        ? `1px solid ${ACTIVE_COLOR}`
                        : lConn
                          ? `2px solid ${wrong ? WRONG_COLOR : "transparent"}`
                          : "2px solid transparent",
                      background: lSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      transition:
                        "border-color 0.2s, color 0.2s, background 0.2s",
                      whiteSpace: "nowrap",
                      zIndex: 2,
                    }}
                  >
                    <span className="text-[20px] font-bold mr-2">{lItem.id}</span>
                    {lItem.text}
                    {wrong && <WrongBadge />}
                  </div>

                  {/* ── Left dot ── */}
                  <div
                    ref={(el) => (pointRefs.current[`left-${lItem.id}`] = el)}
                    onClick={() => handleLeftSelect(lItem.id)}
                    style={{
                      width: "clamp(10px,1.4vw,16px)",
                      height: "clamp(10px,1.4vw,16px)",
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: lSelected
                        ? ACTIVE_COLOR
                        : lConn
                          ? wrong
                            ? ACTIVE_COLOR
                            : ACTIVE_COLOR
                          : DOT_COLOR,
                      cursor: showAns || showResults ? "default" : "pointer",
                      transition: "background 0.2s",
                      boxShadow: lSelected
                        ? `0 0 0 3px rgba(243,155,66,0.3)`
                        : "none",
                      zIndex: 2,
                    }}
                  />

                  {/* ── Right dot ── */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      zIndex: 2,
                    }}
                  >
                    <div
                      ref={(el) =>
                        (pointRefs.current[`right-${rItem.id}`] = el)
                      }
                      onClick={() => handleRightSelect(rItem.id)}
                      style={{
                        width: "clamp(10px,1.4vw,16px)",
                        height: "clamp(10px,1.4vw,16px)",
                        borderRadius: "50%",
                        background: rConn ? ACTIVE_COLOR : DOT_COLOR,
                        cursor:
                          showAns || selectedLeft === null
                            ? "default"
                            : "pointer",
                        transition: "background 0.2s",
                        zIndex: 2,
                      }}
                    />
                  </div>

                  {/* ── Right text ── */}
                  <div
                    onClick={() => handleRightSelect(rItem.id)}
                    style={{
                      position: "relative",
                      fontSize: "clamp(16px,1.4vw,20px)",
                      fontWeight: 500,
                      color: TEXT_COLOR,
                      lineHeight: 1,
                      cursor:
                        showAns || selectedLeft === null
                          ? "default"
                          : "pointer",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      zIndex: 2,
                      padding: "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                      borderRadius: "clamp(8px,1vw,12px)",
                      border: rConn
                        ? `1px solid transparent`
                        : "2px solid transparent",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <span className="text-[20px] font-bold mr-2">{rItem.letter}</span>{" "}
                    {rItem.text}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(8px,1.5vw,16px)",
            zIndex: 100,
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
