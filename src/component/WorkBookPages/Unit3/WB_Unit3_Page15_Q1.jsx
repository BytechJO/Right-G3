import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 4.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#ffca94";
const INACTIVE_COLOR = "#bdbdbd";

const exerciseData = {
  left: [
    {
      id: 1,
      img: img1,
      text: "Does he have any ink?",
    },
    {
      id: 2,
      img: img2,
      text: "Does she have any paper?",
    },
    {
      id: 3,
      img: img3,
      text: "Does he have any eggplants?",
    },
    {
      id: 4,
      img: img4,
      text: "Does he have any grapes?",
    },
  ],
  right: [
    {
      id: 1,
      text: "Yes, he has some.",
    },
    {
      id: 2,
      text: "No, he hasn’t any.",
    },
    {
      id: 3,
      text: "Yes, she has some.",
    },
    {
      id: 4,
      text: "Yes, he has a little.",
    },
  ],
  correctMatches: {
    1: 4,
    2: 3,
    3: 2,
    4: 1,
  },
};

const WB_UnitX_PageXX_QA = () => {
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

  const checkAnswers = () => {
    if (showAns) return;

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

    const totalQuestions = exerciseData.left.length;

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
    if (side === "left" && selectedLeft === id) return ACTIVE_COLOR;

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return INACTIVE_COLOR;

    return ACTIVE_COLOR;
  };

  const isLeftSelected = (id) => selectedLeft === id;
  const isLeftConnected = (id) => !!matches[id];
  const isRightConnected = (id) => Object.values(matches).includes(id);
  const isSelectedRightMatch = (id) =>
    selectedLeft !== null && matches[selectedLeft] === id;

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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Read, look, and match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 180px 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              zIndex: 2,
            }}
          >
            {exerciseData.left.map((item) => {
              const wrong = isWrongMatch(item.id);
              const selected = isLeftSelected(item.id);
              const connected = isLeftConnected(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "32px 70px 1fr 18px",
                    alignItems: "center",
                    gap: "14px",
                    minHeight: "88px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                    }}
                  >
                    {item.id}
                  </div>

                  <div
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      width: "60px",
                      height: "60px",
                      border: selected
                        ? `3px solid ${ACTIVE_COLOR}`
                        : connected
                        ? `2px solid ${LINE_COLOR}`
                        : "2px solid transparent",
                      borderRadius: "14px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      boxSizing: "border-box",
                      boxShadow: selected
                        ? `0 0 0 4px rgba(255, 202, 148, 0.45)`
                        : "none",
                      transition: "all 0.2s ease",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`question-${item.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>

                  <div
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      fontSize: "20px",
                      lineHeight: "1.4",
                      color: "#222",
                      cursor: showAns ? "default" : "pointer",
                      padding: "6px 10px",
                      borderRadius: "12px",
                      border: selected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      backgroundColor: selected
                        ? "rgba(243, 155, 66, 0.08)"
                        : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("left", item.id),
                      cursor: showAns ? "default" : "pointer",
                      boxShadow: selected
                        ? `0 0 0 4px rgba(255, 202, 148, 0.45)`
                        : "none",
                      transform: selected ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-28px",
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
                        border: "2px solid #fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              zIndex: 2,
            }}
          >
            {exerciseData.right.map((item) => {
              const selectedMatch = isSelectedRightMatch(item.id);
              const connected = isRightConnected(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "18px 1fr",
                    alignItems: "center",
                    gap: "14px",
                    minHeight: "88px",
                    position: "relative",
                  }}
                >
                  <div
                    ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      backgroundColor: getDotColor("right", item.id),
                      cursor: showAns ? "default" : "pointer",
                      boxShadow: selectedMatch
                        ? `0 0 0 4px rgba(255, 202, 148, 0.45)`
                        : "none",
                      transform: selectedMatch ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                  />

                  <div
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      fontSize: "20px",
                      lineHeight: "1.4",
                      color: "#222",
                      cursor: showAns ? "default" : "pointer",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      border: selectedMatch
                        ? `3px solid ${ACTIVE_COLOR}`
                        : connected
                        ? `2px solid ${LINE_COLOR}`
                        : "2px solid transparent",
                      boxShadow: selectedMatch
                        ? `0 0 0 4px rgba(255, 202, 148, 0.45)`
                        : "none",
                      backgroundColor: selectedMatch
                        ? "rgba(243, 155, 66, 0.08)"
                        : "transparent",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                  >
                    {item.text}
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
            marginTop: "8px",
          }}
        >
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

export default WB_UnitX_PageXX_QA;