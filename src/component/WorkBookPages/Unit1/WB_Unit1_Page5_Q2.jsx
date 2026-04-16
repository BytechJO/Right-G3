import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 4.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#bdbdbd";
const SOFT_COLOR = "#ffedd5";
const WRONG_COLOR = "#ef4444";

const exerciseData = {
  left: [
    {
      id: 1,
      text: "The eagle flies higher than the dove.",
    },
    {
      id: 2,
      text: "The scooter is slower than the train.",
    },
    {
      id: 3,
      text: "The tortoise is smarter than the hare.",
    },
    {
      id: 4,
      text: "The pencil is lighter than the pencil case.",
    },
  ],
  right: [
    {
      id: 1,
      img: img1, // scooter + train
      alt: "Scooter and train",
    },
    {
      id: 2,
      img: img2, // tortoise + hare
      alt: "Tortoise and hare",
    },
    {
      id: 3,
      img: img3, // pencil + pencil case
      alt: "Pencil and pencil case",
    },
    {
      id: 4,
      img: img4, // eagle + dove
      alt: "Eagle and dove",
    },
  ],
  correctMatches: {
    1: 4,
    2: 1,
    3: 2,
    4: 3,
  },
};

export default function WB_UnitX_PageXX_QF() {
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
          const leftEl = elementRefs.current[`left-${leftId}`];
          const rightEl = elementRefs.current[`right-${rightId}`];

          if (!leftEl || !rightEl) return null;

          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          return {
            id: `${leftId}-${rightId}`,
            leftId: Number(leftId),
            rightId: Number(rightId),
            x1: leftRect.right - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left - containerRect.left,
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

  const handleCheck = () => {
    if (showAns) return;

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    let score = 0;

    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) {
        score++;
      }
    });

    setShowResults(true);

    const total = exerciseData.left.length;

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(exerciseData.correctMatches);
    setSelectedLeft(null);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const isLeftSelected = (id) => selectedLeft === id;
  const isLeftConnected = (id) => !!matches[id];
  const isRightConnected = (id) => Object.values(matches).includes(id);

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return ACTIVE_COLOR;

    const connected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    return connected ? ACTIVE_COLOR : INACTIVE_COLOR;
  };

  const isWrongMatch = (leftId) => {
    if (!showResults) return false;
    if (!matches[leftId]) return false;
    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">F</span> Read and match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1.2fr 140px 0.9fr",
            gap: "24px",
            alignItems: "start",
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
            {lines.map((line) => {
              const wrong = showResults
                ? exerciseData.correctMatches[line.leftId] !== line.rightId
                : false;

              return (
                <line
                  key={line.id}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke={wrong ? WRONG_COLOR : LINE_COLOR}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "44px",
              zIndex: 2,
            }}
          >
            {exerciseData.left.map((item) => {
              const selected = isLeftSelected(item.id);
              const connected = isLeftConnected(item.id);
              const wrong = isWrongMatch(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px minmax(0, 1fr) 20px",
                    alignItems: "center",
                    gap: "14px",
                    minHeight: "108px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "26px",
                      fontWeight: "700",
                      color: "#222",
                      textAlign: "center",
                    }}
                  >
                    {item.id}
                  </div>

                  <div
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      fontSize: "24px",
                      lineHeight: "1.4",
                      color: "#111",
                      cursor: showAns ? "default" : "pointer",
                      padding: "10px 14px",
                      borderRadius: "14px",
                      border: selected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : connected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      backgroundColor: wrong ? SOFT_COLOR : "transparent",
                      transition: "0.2s ease",
                      userSelect: "none",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => {
                      elementRefs.current[`left-${item.id}`] = el;
                    }}
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("left", item.id),
                      boxShadow: "0 0 0 3px #fff",
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              zIndex: 2,
            }}
          >
            {exerciseData.right.map((item) => {
              const connected = isRightConnected(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px minmax(0, 1fr)",
                    alignItems: "center",
                    gap: "14px",
                    minHeight: "108px",
                  }}
                >
                  <div
                    ref={(el) => {
                      elementRefs.current[`right-${item.id}`] = el;
                    }}
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("right", item.id),
                      boxShadow: "0 0 0 3px #fff",
                      cursor:
                        showAns || selectedLeft === null ? "default" : "pointer",
                    }}
                  />

                  <div
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      cursor:
                        showAns || selectedLeft === null ? "default" : "pointer",
                      border: connected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      borderRadius: "16px",
                      padding: "8px",
                      transition: "0.2s ease",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{
                        width: "100%",
                        maxWidth: "260px",
                        height: "88px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          <Button text="Check" onClick={handleCheck} />
          <Button text="Show Answer" onClick={handleShowAnswer} />
          <Button text="Start Again" onClick={handleStartAgain} />
        </div>
      </div>
    </div>
  );
}