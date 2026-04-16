import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 9.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#dc2626";
const INACTIVE_COLOR = "#a3a3a3";
const WRONG_COLOR = "#ef4444";

const EXERCISE_DATA = {
  left: [
    {
      id: 1,
      text: "Kate wants a bike, coat, and cake.",
    },
    {
      id: 2,
      text: "Hansel likes the cat and ducks.",
    },
    {
      id: 3,
      text: "There are two flags on the top of the boat.",
    },
  ],

  right: [
    { id: 1, img: img1 }, // boat
    { id: 2, img: img2 }, // girl thought bubble
    { id: 3, img: img3 }, // boy with ducks
  ],

  correctMatches: {
    1: 2,
    2: 3,
    3: 1,
  },
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "8px 14px 20px",
    boxSizing: "border-box",
    width: "100%",
  },

  title: {
    margin: 0,
  },

  matchArea: {
    position: "relative",
    width: "100%",
    minHeight: "520px",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 420px",
    gap: "34px",
    alignItems: "start",
  },

  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "70px",
    zIndex: 2,
    paddingTop: "12px",
  },

  leftItem: {
    display: "grid",
    gridTemplateColumns: "34px minmax(0, 1fr) 22px",
    gap: "16px",
    alignItems: "center",
    position: "relative",
  },

  leftNumber: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111",
    lineHeight: 1,
  },

  leftText: {
    fontSize: "24px",
    lineHeight: "1.35",
    color: "#222",
    fontWeight: "500",
  },

  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "34px",
    zIndex: 2,
    paddingTop: "2px",
  },

  rightItem: {
    display: "grid",
    gridTemplateColumns: "22px 1fr",
    gap: "14px",
    alignItems: "center",
    position: "relative",
  },

  imageBox: {
    width: "100%",
    height: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    border: "2px solid transparent",
    boxSizing: "border-box",
    transition: "0.2s ease",
    cursor: "pointer",
  },

  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    display: "block",
  },

  dot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    cursor: "pointer",
    flexShrink: 0,
  },

  wrongBadge: {
    position: "absolute",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

const WB_Unit3_Page215_QC = () => {
  const [selectedLeft, setSelectedLeft] = useState(null);
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
        .map(([leftId, rightId]) => {
          const leftEl = elementRefs.current[`left-dot-${leftId}`];
          const rightEl = elementRefs.current[`right-dot-${rightId}`];

          if (!leftEl || !rightEl) return null;

          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          return {
            id: `line-${leftId}-${rightId}`,
            x1: leftRect.left + leftRect.width / 2 - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left + rightRect.width / 2 - containerRect.left,
            y2: rightRect.top + rightRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  const handleLeftClick = (id) => {
    if (showAns) return;
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (showAns || selectedLeft === null) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === rightId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedLeft] = rightId;

    setMatches(newMatches);
    setSelectedLeft(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allConnected = EXERCISE_DATA.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    const total = EXERCISE_DATA.left.length;

    Object.keys(EXERCISE_DATA.correctMatches).forEach((leftId) => {
      if (matches[leftId] === EXERCISE_DATA.correctMatches[leftId]) {
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
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getLeftDotColor = (leftId) => {
    if (selectedLeft === leftId) return ACTIVE_COLOR;
    if (matches[leftId]) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getRightDotColor = (rightId) => {
    const isConnected = Object.values(matches).includes(rightId);
    const isSelected =
      selectedLeft !== null && matches[selectedLeft] === rightId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const isWrongMatch = (leftId) => {
    if (!showResults || !matches[leftId]) return false;
    return matches[leftId] !== EXERCISE_DATA.correctMatches[leftId];
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={styles.container}>
        <h1 className="WB-header-title-page8" style={styles.title}>
          <span className="WB-ex-A">C</span> Read, look, and match.
        </h1>

        <div ref={containerRef} style={styles.matchArea}>
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

          <div style={styles.leftCol}>
            {EXERCISE_DATA.left.map((item) => {
              const wrong = isWrongMatch(item.id);
              const isSelected = selectedLeft === item.id;
              const isConnected = !!matches[item.id];

              return (
                <div key={item.id} style={styles.leftItem}>
                  <div style={styles.leftNumber}>{item.id}</div>

                  <div
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      ...styles.leftText,
                      cursor: showAns ? "default" : "pointer",
                      color: "#222",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`left-dot-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      ...styles.dot,
                      backgroundColor: getLeftDotColor(item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        ...styles.wrongBadge,
                        right: "-8px",
                        top: "-10px",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={styles.rightCol}>
            {EXERCISE_DATA.right.map((item) => {
              const isConnected = Object.values(matches).includes(item.id);
              const isSelected =
                selectedLeft !== null && matches[selectedLeft] === item.id;

              return (
                <div key={item.id} style={styles.rightItem}>
                  <div
                    ref={(el) => (elementRefs.current[`right-dot-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      ...styles.dot,
                      backgroundColor: getRightDotColor(item.id),
                      cursor:
                        showAns || selectedLeft === null ? "default" : "pointer",
                    }}
                  />

                  <div
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      ...styles.imageBox,
                      border: isSelected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : isConnected
                        ? "2px solid #f5d0a8"
                        : "2px solid transparent",
                      background: isSelected
                        ? "rgba(243,155,66,0.08)"
                        : "transparent",
                      cursor:
                        showAns || selectedLeft === null ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`right-${item.id}`}
                      style={styles.image}
                    />
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

export default WB_Unit3_Page215_QC;