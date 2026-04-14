import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/3.svg";

const exerciseData = {
  left: [
    { id: 1, text: "A bear is in a dress and dreams at its desk." },
    { id: 2, text: "Tracy and Trudy trade trucks on the tree." },
    { id: 3, text: "The crabs cry as they cross the creek." },
  ],
  right: [
    { id: 1, img: img1, alt: "crabs in the creek" },
    { id: 2, img: img2, alt: "bear dreaming at desk" },
    { id: 3, img: img3, alt: "children trading trucks near tree" },
  ],
  correctMatches: {
    1: 2,
    2: 3,
    3: 1,
  },
};

const WB_Unit10_Page62_QA = () => {
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
            x1: leftRect.right - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left - containerRect.left,
            y2: rightRect.top + rightRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    const frame = requestAnimationFrame(updateLines);
    window.addEventListener("resize", updateLines);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateLines);
    };
  }, [matches]);

  const handleLeftClick = (id) => {
    if (showAns) return;
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (showAns) return;
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
    if (showAns) return;

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

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return "#3b82f6";

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    return isConnected ? "#3b82f6" : "#9ca3af";
  };

  const getLeftRowStyle = (itemId) => {
    const isActive = selectedLeft === itemId;

    return {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "14px",
      padding: "10px 12px",
      borderRadius: "14px",
      border: isActive ? "2px solid #3b82f6" : "2px solid transparent",
      backgroundColor: isActive ? "rgba(59,130,246,0.08)" : "transparent",
      boxShadow: isActive ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
      transition: "all 0.2s ease",
      minHeight: "145px",
      height: "145px",
      width: "650px",
    };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Read and match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            padding: "10px 20px",
            minHeight: "440px",
          }}
        >
          {exerciseData.left.map((leftItem, index) => {
            const rightItem = exerciseData.right[index];

            return (
              <div
                key={leftItem.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "90px",
                }}
              >
                {/* left side */}
                <div style={getLeftRowStyle(leftItem.id)}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#222",
                        minWidth: "20px",
                        lineHeight: "1.4",
                      }}
                    >
                      {leftItem.id}
                    </span>

                    <span
                      style={{
                        fontSize: "22px",
                        color: "#222",
                        lineHeight: "1.6",
                      }}
                    >
                      {leftItem.text}
                    </span>
                  </div>

                  <div
                    ref={(el) =>
                      (elementRefs.current[`left-${leftItem.id}`] = el)
                    }
                    onClick={() => handleLeftClick(leftItem.id)}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("left", leftItem.id),
                      cursor: showAns ? "default" : "pointer",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      boxShadow:
                        selectedLeft === leftItem.id
                          ? "0 0 0 4px rgba(59,130,246,0.18)"
                          : "none",
                    }}
                  />

                  {isWrongMatch(leftItem.id) && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-34px",
                        top: "50%",
                        transform: "translateY(-50%)",
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
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>

                {/* right side */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    minHeight: "145px",
                    height: "145px",
                    width: "300px",
                  }}
                >
                  <div
                    ref={(el) =>
                      (elementRefs.current[`right-${rightItem.id}`] = el)
                    }
                    onClick={() => handleRightClick(rightItem.id)}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("right", rightItem.id),
                      cursor: showAns ? "default" : "pointer",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  />

                  <div
                    style={{
                      width: "230px",
                      height: "145px",
                      border: "2px solid #bdbdbd",
                      borderRadius: "16px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={rightItem.img}
                      alt={rightItem.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* svg lines */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#dc2626"
                strokeWidth="4"
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

export default WB_Unit10_Page62_QA;