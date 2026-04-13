import React, { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/C.3.svg";

const exerciseData = {
  left: [
    { id: 1, text: "1. The plums play on the plate." },
    { id: 2, text: "2. The slug sleeps on the slide." },
    { id: 3, text: "3. The fly and the flea float on the flag." },
  ],
  right: [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
  ],
  correctMatches: {
    1: 2,
    2: 3,
    3: 1,
  },
};

const ROW_HEIGHT = 110;

const WB_Unit6_Page38_Q3 = () => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
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

          if (leftEl && rightEl) {
            const leftRect = leftEl.getBoundingClientRect();
            const rightRect = rightEl.getBoundingClientRect();

            return {
              id: `${leftId}-${rightId}`,
              x1: leftRect.right - containerRect.left,
              y1: leftRect.top + leftRect.height / 2 - containerRect.top,
              x2: rightRect.left - containerRect.left,
              y2: rightRect.top + rightRect.height / 2 - containerRect.top,
            };
          }

          return null;
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);

    return () => {
      window.removeEventListener("resize", updateLines);
    };
  }, [matches]);

  const handleLeftClick = (id) => {
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (selectedLeft === null) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === rightId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedLeft] = rightId;

    setMatches(newMatches);
    setSelectedLeft(null);
  };

  const isWrongMatch = (leftId) => {
    if (!showResults) return false;
    if (!matches[leftId]) return false;

    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  const checkAnswers = () => {
    const totalQuestions = exerciseData.left.length;
    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let currentScore = 0;

    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) {
        currentScore++;
      }
    });

    if (currentScore === totalQuestions) {
      ValidationAlert.success(`Score: ${currentScore} / ${totalQuestions}`);
    } else if (currentScore > 0) {
      ValidationAlert.warning(`Score: ${currentScore} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`Score: ${currentScore} / ${totalQuestions}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches(exerciseData.correctMatches);
    setShowResults(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedLeft(null);
    setShowResults(false);
    setLines([]);
  };

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) {
      return "bg-blue-500 scale-125";
    }

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return "bg-[#eb8c2f]";

    return "bg-blue-500";
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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">C</span>
          Read and match.
        </h1>

        <div
          ref={containerRef}
          className="relative"
          style={{
            width: "100%",
            maxWidth: "860px",
            margin: "0 auto",
            padding: "10px 20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 180px",
              columnGap: "110px",
              alignItems: "start",
            }}
          >
            {/* Left column */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: `repeat(${exerciseData.left.length}, ${ROW_HEIGHT}px)`,
              }}
            >
              {exerciseData.left.map((item) => (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#222",
                      lineHeight: "1.5",
                      flex: 1,
                    }}
                  >
                    {item.text}
                  </p>

                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    className={`w-4 h-4 rounded-full cursor-pointer transition-all ${getDotColor("left", item.id)}`}
                    style={{ flexShrink: 0 }}
                  />

                  {isWrongMatch(item.id) && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-28px",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right column */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: `repeat(${exerciseData.right.length}, ${ROW_HEIGHT}px)`,
              }}
            >
              {exerciseData.right.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    height: `${ROW_HEIGHT}px`,
                  }}
                >
                  <div
                    ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    className={`w-4 h-4 rounded-full cursor-pointer transition-all ${getDotColor("right", item.id)}`}
                    style={{ flexShrink: 0 }}
                  />

                  <img
                    src={item.img}
                    alt={`item-${item.id}`}
                    style={{
                      width: "72px",
                      height: "72px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
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

export default WB_Unit6_Page38_Q3;