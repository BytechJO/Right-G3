import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 6.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#dc2626";
const INACTIVE_COLOR = "#a3a3a3";
const WRONG_COLOR = "#ef4444";

const EXERCISE_DATA = {
  top: [
    { id: 1, img: img1 }, // shell
    { id: 2, img: img2 }, // coat
    { id: 3, img: img3 }, // juice
    { id: 4, img: img4 }, // bee
    { id: 5, img: img5 }, // nuts
    { id: 6, img: img6 }, // kite
  ],

  bottom: [
    { id: 1, text: "long i" },
    { id: 2, text: "short a" },
    { id: 3, text: "long e" },
    { id: 4, text: "short u" },
    { id: 5, text: "long u" },
    { id: 6, text: "long o" },
  ],

  correctMatches: {
    1: 4, // shell -> short u
    2: 6, // coat -> long o
    3: 5, // juice -> long u
    4: 3, // bee -> long e
    5: 2, // nuts -> short a
    6: 1, // kite -> long i
  },
};

const styles = {
  matchArea: {
    position: "relative",
    width: "100%",
    minHeight: "clamp(260px, 42vw, 430px)",
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 3vw, 34px)",
  },

  topRow: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: "clamp(8px, 1.8vw, 22px)",
    alignItems: "start",
    zIndex: 2,
    width: "100%",
  },

  topItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(8px, 1.3vw, 10px)",
    position: "relative",
    minWidth: 0,
  },

  topNumber: {
    width: "100%",
    paddingLeft: "clamp(2px, 0.5vw, 6px)",
    boxSizing: "border-box",
    fontSize: "clamp(16px, 2vw, 22px)",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1,
  },

  topImageBox: {
    width: "clamp(42px, 9vw, 120px)",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "clamp(8px, 1vw, 14px)",
    border: "2px solid transparent",
    transition: "0.2s ease",
    boxSizing: "border-box",
    padding: "4px",
    maxWidth: "100%",
  },

  topImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  dot: {
    width: "clamp(10px, 1.4vw, 16px)",
    height: "clamp(10px, 1.4vw, 16px)",
    borderRadius: "50%",
    cursor: "pointer",
    flexShrink: 0,
  },

  bottomRow: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: "clamp(8px, 1.8vw, 22px)",
    alignItems: "start",
    zIndex: 2,
    marginTop: "clamp(8px, 2vw, 26px)",
    width: "100%",
  },

  bottomItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "clamp(8px, 1.3vw, 10px)",
    position: "relative",
    minWidth: 0,
  },

  bottomLabel: {
    width: "100%",
    minHeight: "clamp(34px, 5vw, 54px)",
    padding: "0 clamp(4px, 1vw, 10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(12px, 2.1vw, 26px)",
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
    lineHeight: 1.1,
    borderRadius: "clamp(8px, 1vw, 14px)",
    border: "2px solid transparent",
    cursor: "pointer",
    boxSizing: "border-box",
    background: "transparent",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },

  wrongBadge: {
    position: "absolute",
    width: "clamp(16px, 2vw, 22px)",
    height: "clamp(16px, 2vw, 22px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(9px, 1vw, 12px)",
    fontWeight: "700",
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
    width: "100%",
  },
};

const WB_Unit3_Page215_QB = () => {
  const [selectedTop, setSelectedTop] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([topId, bottomId]) => {
          const topEl = elementRefs.current[`top-dot-${topId}`];
          const bottomEl = elementRefs.current[`bottom-dot-${bottomId}`];

          if (!topEl || !bottomEl) return null;

          const topRect = topEl.getBoundingClientRect();
          const bottomRect = bottomEl.getBoundingClientRect();

          return {
            id: `line-${topId}-${bottomId}`,
            x1: topRect.left + topRect.width / 2 - containerRect.left,
            y1: topRect.top + topRect.height / 2 - containerRect.top,
            x2: bottomRect.left + bottomRect.width / 2 - containerRect.left,
            y2: bottomRect.top + bottomRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    const rafUpdate = () => requestAnimationFrame(updateLines);

    rafUpdate();

    window.addEventListener("resize", rafUpdate);

    let resizeObserver;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        rafUpdate();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", rafUpdate);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [matches, showAns, showResults]);

  const handleTopClick = (id) => {
    if (showAns) return;
    setSelectedTop(id);
    setShowResults(false);
  };

  const handleBottomClick = (bottomId) => {
    if (showAns || selectedTop === null) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === bottomId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedTop] = bottomId;

    setMatches(newMatches);
    setSelectedTop(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allConnected = EXERCISE_DATA.top.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    const total = EXERCISE_DATA.top.length;

    Object.keys(EXERCISE_DATA.correctMatches).forEach((topId) => {
      if (matches[topId] === EXERCISE_DATA.correctMatches[topId]) {
        score++;
      }
    });

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(EXERCISE_DATA.correctMatches);
    setShowResults(true);
    setShowAns(true);
    setSelectedTop(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedTop(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getTopDotColor = (topId) => {
    if (selectedTop === topId) return ACTIVE_COLOR;
    if (matches[topId]) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getBottomDotColor = (bottomId) => {
    const isConnected = Object.values(matches).includes(bottomId);
    const isSelected =
      selectedTop !== null && matches[selectedTop] === bottomId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const isWrongMatch = (topId) => {
    if (!showResults || !matches[topId]) return false;
    return matches[topId] !== EXERCISE_DATA.correctMatches[topId];
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span className="WB-ex-A">B</span> Listen and match.
        </h1>

        <div
          ref={containerRef}
          style={{
            ...styles.matchArea,
          }}
        >
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
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={LINE_COLOR}
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div style={styles.topRow}>
            {EXERCISE_DATA.top.map((item) => {
              const wrong = isWrongMatch(item.id);
              const isSelected = selectedTop === item.id;
              const isConnected = !!matches[item.id];

              return (
                <div key={item.id} style={styles.topItem}>
                  <div style={styles.topNumber}>{item.id}</div>

                  <div
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      ...styles.topImageBox,
                      border: isSelected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : isConnected
                        ? "2px solid #f5d0a8"
                        : "2px solid transparent",
                      background: isSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`top-${item.id}`}
                      style={styles.topImage}
                    />
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`top-dot-${item.id}`] = el)}
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      ...styles.dot,
                      backgroundColor: getTopDotColor(item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        ...styles.wrongBadge,
                        right: "clamp(0px, 0.8vw, 10px)",
                        top: "clamp(20px, 3vw, 34px)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={styles.bottomRow}>
            {EXERCISE_DATA.bottom.map((item) => {
              const isConnected = Object.values(matches).includes(item.id);
              const isSelected =
                selectedTop !== null && matches[selectedTop] === item.id;

              return (
                <div key={item.id} style={styles.bottomItem}>
                  <div
                    ref={(el) =>
                      (elementRefs.current[`bottom-dot-${item.id}`] = el)
                    }
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      ...styles.dot,
                      backgroundColor: getBottomDotColor(item.id),
                      cursor:
                        showAns || selectedTop === null ? "default" : "pointer",
                    }}
                  />

                  <div
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      ...styles.bottomLabel,
                      border: isSelected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : isConnected
                        ? "2px solid #d1d5db"
                        : "2px solid transparent",
                      background: isSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor:
                        showAns || selectedTop === null ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.buttonsWrap}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default WB_Unit3_Page215_QB;