import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/4.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/5.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/6.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 62/SVG/7.svg";

const CHOICES = ["cr", "dr", "tr"];

const SENTENCES = [
  {
    id: 1,
    parts: ["The ", "iver drives a ", "actor."],
    correctBlanks: ["dr", "tr"],
    correctImage: 2,
  },
  {
    id: 2,
    parts: ["He ", "aws a ", "iangle on his paper."],
    correctBlanks: ["dr", "tr"],
    correctImage: 1,
  },
  {
    id: 3,
    parts: ["The ", "ab went shopping for a ", "ain."],
    correctBlanks: ["cr", "tr"],
    correctImage: 3,
  },
  {
    id: 4,
    parts: ["The ", "ee is near the ", "eek."],
    correctBlanks: ["tr", "cr"],
    correctImage: 4,
  },
];

const IMAGES = [
  { id: 1, img: img1, alt: "boy drawing triangle" },
  { id: 2, img: img2, alt: "driver on tractor" },
  { id: 3, img: img3, alt: "crab and train" },
  { id: 4, img: img4, alt: "tree near creek" },
];

const WB_Unit10_Page62_QB = () => {
  const [blankAnswers, setBlankAnswers] = useState({});
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

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  const handleBlankSelect = (sentenceId, blankIndex, value) => {
    if (showAns) return;

    setBlankAnswers((prev) => ({
      ...prev,
      [sentenceId]: {
        ...prev[sentenceId],
        [blankIndex]: value,
      },
    }));

    setShowResults(false);
  };

  const handleLeftClick = (id) => {
    if (showAns || showResults) return;
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (showAns || showResults) return;
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
    setShowResults(false);
  };

  const areBlanksCorrect = (item) => {
    const current = blankAnswers[item.id] || {};
    return (
      current[0] === item.correctBlanks[0] &&
      current[1] === item.correctBlanks[1]
    );
  };

  const isItemCorrect = (item) => {
    return areBlanksCorrect(item) && matches[item.id] === item.correctImage;
  };

  const isWrongItem = (item) => {
    if (!showResults) return false;
    return !isItemCorrect(item);
  };

  const checkAnswers = () => {
    if (showAns || showResults) return;

    const allBlanksDone = SENTENCES.every((item) => {
      const current = blankAnswers[item.id] || {};
      return current[0] && current[1];
    });

    const allMatchesDone = SENTENCES.every((item) => matches[item.id]);

    if (!allBlanksDone || !allMatchesDone) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    SENTENCES.forEach((item) => {
      if (isItemCorrect(item)) score++;
    });

    setShowResults(true);

    if (score === SENTENCES.length) {
      ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctBlanks = {};
    const correctMatches = {};

    SENTENCES.forEach((item) => {
      correctBlanks[item.id] = {
        0: item.correctBlanks[0],
        1: item.correctBlanks[1],
      };
      correctMatches[item.id] = item.correctImage;
    });

    setBlankAnswers(correctBlanks);
    setMatches(correctMatches);
    setShowAns(true);
    setShowResults(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setBlankAnswers({});
    setSelectedLeft(null);
    setMatches({});
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

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "15px" }}>
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">B</span>
          Read and write cr, dr, or tr. Match.
        </h1>

        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "70px",
            padding: "10px 20px",
            // minHeight: "620px",
          }}
        >
          {/* left side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            {SENTENCES.map((item) => {
              const current = blankAnswers[item.id] || {};

              return (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // gap: "18px",
                    minHeight: "100px",
                    padding: "8px 10px",
                    borderRadius: "14px",
              width: "460px",

                    border:
                      selectedLeft === item.id
                        ? "2px solid #f39b42"
                        : "2px solid transparent",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        // gap: "12px",
                        // marginBottom: "18px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                          color: "#222",
                          minWidth: "18px",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.id}
                      </span>

                      <div
                        style={{
                          fontSize: "18px",
                          color: "#222",
                          lineHeight: "1.8",
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span>{item.parts[0]}</span>

                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <select
                            value={current[0] || ""}
                            disabled={showAns || showResults}
                            onChange={(e) =>
                              handleBlankSelect(item.id, 0, e.target.value)
                            }
                            style={{
                              width: "50px",
                              border: "none",
                              borderBottom: `2px solid ${
                                showResults &&
                                current[0] !== item.correctBlanks[0]
                                  ? "red"
                                  : "#444"
                              }`,
                              background: "transparent",
                              textAlign: "center",
                              // color: current[0] ? "#dc2626" : "#9ca3af",
                              fontSize: "18px",
                              outline: "none",
                              cursor:
                                showAns || showResults ? "default" : "pointer",
                              // appearance: "none",
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              padding: "2px 6px",
                              fontWeight: "600",
                            }}
                          >
                            <option value=""></option>

                            {CHOICES.map((choice) => (
                              <option key={choice} value={choice}>
                                {choice}
                              </option>
                            ))}
                          </select>

                          {showResults &&
                            current[0] &&
                            current[0] !== item.correctBlanks[0] && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  right: "-10px",
                               width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  backgroundColor: "red",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  border: "2px solid white",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                                  zIndex: 5,
                                }}
                              >
                                ✕
                              </div>
                            )}
                        </div>

                        <span>{item.parts[1]}</span>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <select
                            value={current[1] || ""}
                            disabled={showAns || showResults}
                            onChange={(e) =>
                              handleBlankSelect(item.id, 1, e.target.value)
                            }
                            style={{
                              width: "50px",
                              border: "none",
                              borderBottom: `2px solid ${
                                showResults &&
                                current[1] !== item.correctBlanks[1]
                                  ? "red"
                                  : "#444"
                              }`,
                              background: "transparent",
                              textAlign: "center",
                              // color: current[1] ? "#dc2626" : "#9ca3af",
                              fontSize: "18px",
                              outline: "none",
                              cursor: showAns ? "default" : "pointer",
                              // appearance: "none",
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              padding: "2px 6px",
                              fontWeight: "600",
                            }}
                          >
                            <option value=""></option>

                            {CHOICES.map((choice) => (
                              <option key={choice} value={choice}>
                                {choice}
                              </option>
                            ))}
                          </select>

                          {showResults &&
                            current[1] &&
                            current[1] !== item.correctBlanks[1] && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-10px",
                                  right: "-10px",
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  backgroundColor: "red",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  border: "2px solid white",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                                  zIndex: 5,
                                  pointerEvents: "none",
                                }}
                              >
                                ✕
                              </div>
                            )}
                        </div>

                        <span>{item.parts[2]}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#f39b42",
                      cursor: showAns || showResults ? "default" : "pointer",
                      flexShrink: 0,
                      boxShadow:
                        selectedLeft === item.id
                          ? "0 0 2px 4px rgba(247, 163, 27, 0.49)"
                          : "none",
                    }}
                  />

                  {isWrongItem(item) && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-34px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "700",
                        border: "2px solid white",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                        zIndex: 5,
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* right side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "270px",
            }}
          >
            {IMAGES.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  minHeight: "100px",
                  // marginBottom:"20px"
                }}
              >
                <div
                  ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                  onClick={() => handleRightClick(item.id)}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#f39b42",

                    cursor: showAns || showResults ? "default" : "pointer",
                    flexShrink: 0,
                  }}
                />

                <img
                  src={item.img}
                  alt={item.alt}
                  onClick={() => handleRightClick(item.id)}

                  style={{
                    width: "auto",
                    height: "100px",

                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>

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
                stroke="#f39b42"
                strokeWidth="2"
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

export default WB_Unit10_Page62_QB;
