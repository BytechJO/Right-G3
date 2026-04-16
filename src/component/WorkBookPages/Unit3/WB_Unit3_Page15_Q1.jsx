import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 7.svg";
import img2 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 8.svg";
import img3 from  "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 9.svg";
const LINE_COLOR = "#d62828";
const INACTIVE_COLOR = "#bdbdbd";

const exerciseData = {
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
    {
      id: 1,
      img: img1, // boat
    },
    {
      id: 2,
      img: img2, // girl thought bubble
    },
    {
      id: 3,
      img: img3, // ducks + boy
    },
  ],
  correctMatches: {
    1: 2,
    2: 3,
    3: 1,
  },
};

export default function WB_Unit3_Page8_QC() {
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
      <style>{`
        .wb-c8-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: 28px !important;
          max-width: 1150px !important;
          margin: 0 auto !important;
          padding: 8px 14px 20px !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }

        .wb-c8-grid {
          position: relative !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) 170px minmax(260px, 360px) !important;
          gap: 20px !important;
          align-items: start !important;
        }

        .wb-c8-left-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 42px !important;
          z-index: 2 !important;
        }

        .wb-c8-right-col {
          display: flex !important;
          flex-direction: column !important;
          gap: 28px !important;
          z-index: 2 !important;
          padding-top: 0 !important;
        }

        .wb-c8-left-row {
          display: grid !important;
          grid-template-columns: 28px minmax(0, 1fr) 18px !important;
          align-items: center !important;
          gap: 14px !important;
          min-height: 110px !important;
          position: relative !important;
        }

        .wb-c8-right-row {
          display: grid !important;
          grid-template-columns: 18px 1fr !important;
          align-items: center !important;
          gap: 14px !important;
          min-height: 116px !important;
          position: relative !important;
        }

        .wb-c8-num {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
          flex-shrink: 0 !important;
        }

        .wb-c8-text {
          font-size: 20px !important;
          line-height: 1.45 !important;
          color: #222 !important;
          cursor: pointer !important;
          padding: 6px 8px !important;
          border-radius: 12px !important;
          transition: all 0.2s ease !important;
          word-break: break-word !important;
        }

        .wb-c8-dot {
          width: 18px !important;
          height: 18px !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
          cursor: pointer !important;
          flex-shrink: 0 !important;
        }

        .wb-c8-dot.selected {
          transform: scale(1.1) !important;
          box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.45) !important;
        }

        .wb-c8-right-img-wrap {
          width: 100% !important;
          min-height: 108px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          cursor: pointer !important;
          box-sizing: border-box !important;
        }

        .wb-c8-right-img {
          max-width: 100% !important;
          max-height: 115px !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-c8-wrong {
          position: absolute !important;
          right: -28px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: 22px !important;
          height: 22px !important;
          border-radius: 50% !important;
          background-color: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 12px !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
        }

        .wb-c8-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: 8px !important;
        }

        @media (max-width: 900px) {
          .wb-c8-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }

          .wb-c8-left-col,
          .wb-c8-right-col {
            gap: 18px !important;
          }

          .wb-c8-left-row,
          .wb-c8-right-row {
            min-height: auto !important;
          }

          .wb-c8-right-img-wrap {
            justify-content: flex-start !important;
          }
        }
      `}</style>

      <div className="wb-c8-wrapper">
        <h1 className="WB-header-title-page8" style={{ margin: 0 }}>
          <span className="WB-ex-A">C</span>
          Read, look, and match.
        </h1>

        <div ref={containerRef} className="wb-c8-grid">
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

          <div className="wb-c8-left-col">
            {exerciseData.left.map((item) => {
              const wrong = isWrongMatch(item.id);
              const selected = isLeftSelected(item.id);
              const connected = isLeftConnected(item.id);

              return (
                <div key={item.id} className="wb-c8-left-row">
                  <div className="wb-c8-num">{item.id}</div>

                  <div
                    onClick={() => handleLeftClick(item.id)}
                    className="wb-c8-text"
                    style={{
                      border: selected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      backgroundColor: selected
                        ? "rgba(243, 155, 66, 0.08)"
                        : "transparent",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    className={`wb-c8-dot ${selected ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("left", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && <div className="wb-c8-wrong">✕</div>}
                </div>
              );
            })}
          </div>

          <div />

          <div className="wb-c8-right-col">
            {exerciseData.right.map((item) => {
              const selectedMatch = isSelectedRightMatch(item.id);
              const connected = isRightConnected(item.id);

              return (
                <div key={item.id} className="wb-c8-right-row">
                  <div
                    ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    className={`wb-c8-dot ${selectedMatch ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("right", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  <div
                    className="wb-c8-right-img-wrap"
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      border: selectedMatch
                        ? `2px solid ${ACTIVE_COLOR}`
                        : connected
                        ? `2px solid transparent`
                        : `2px solid transparent`,
                      borderRadius: "12px",
                      padding: "4px 6px",
                      boxShadow: selectedMatch
                        ? `0 0 0 4px rgba(255, 202, 148, 0.35)`
                        : "none",
                      backgroundColor: selectedMatch
                        ? "rgba(243, 155, 66, 0.06)"
                        : "transparent",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={`match-${item.id}`}
                      className="wb-c8-right-img"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="wb-c8-buttons">
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}