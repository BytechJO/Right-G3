import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page8/SVG/Asset 9.svg";

const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#bdbdbd";
const ACTIVE_COLOR = "#f39b42";

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
      img: img1,
    },
    {
      id: 2,
      img: img2,
    },
    {
      id: 3,
      img: img3,
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
          gap: clamp(18px, 2.4vw, 28px) !important;
          max-width: 1150px !important;
          margin: 0 auto !important;
          padding: clamp(8px, 1vw, 12px) clamp(10px, 1.6vw, 14px) 20px !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }

        .wb-c8-grid {
          position: relative !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: minmax(0, 1.35fr) minmax(110px, 14vw) minmax(200px, 0.95fr) !important;
          gap: clamp(14px, 2vw, 24px) !important;
          align-items: start !important;
        }

        .wb-c8-left-col {
          display: flex !important;
          flex-direction: column !important;
          gap: clamp(18px, 3vw, 42px) !important;
          z-index: 2 !important;
        }

        .wb-c8-right-col {
          display: flex !important;
          flex-direction: column !important;
          gap: clamp(16px, 2.2vw, 28px) !important;
          z-index: 2 !important;
          padding-top: 0 !important;
        }

        .wb-c8-left-row {
          display: grid !important;
          grid-template-columns: clamp(20px, 2.5vw, 28px) minmax(0, 1fr) clamp(14px, 1.8vw, 18px) !important;
          align-items: center !important;
          gap: clamp(8px, 1.4vw, 14px) !important;
          min-height: clamp(62px, 8.5vw, 110px) !important;
          position: relative !important;
        }

        .wb-c8-right-row {
          display: grid !important;
          grid-template-columns: clamp(14px, 1.8vw, 18px) minmax(0, 1fr) !important;
          align-items: center !important;
          gap: clamp(8px, 1.4vw, 14px) !important;
          min-height: clamp(68px, 9vw, 116px) !important;
          position: relative !important;
        }

        .wb-c8-num {
          font-size: clamp(18px, 2vw, 22px) !important;
          font-weight: 700 !important;
          color: #222 !important;
          line-height: 1 !important;
          flex-shrink: 0 !important;
        }

        .wb-c8-text {
          font-size: clamp(16px, 1.9vw, 20px) !important;
          line-height: 1.45 !important;
          color: #222 !important;
          cursor: pointer !important;
          padding: clamp(4px, 0.7vw, 6px) clamp(6px, 0.9vw, 8px) !important;
          border-radius: 12px !important;
          transition: all 0.2s ease !important;
          word-break: break-word !important;
        }

        .wb-c8-dot {
          width: clamp(14px, 1.7vw, 18px) !important;
          height: clamp(14px, 1.7vw, 18px) !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
          cursor: pointer !important;
          flex-shrink: 0 !important;
        }

        .wb-c8-dot.selected {
          transform: scale(1.1) !important;
          box-shadow: 0 0 0 clamp(2px, 0.4vw, 4px) rgba(255, 202, 148, 0.45) !important;
        }

        .wb-c8-right-img-wrap {
          width: 100% !important;
          min-height: clamp(68px, 8.6vw, 108px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          cursor: pointer !important;
          box-sizing: border-box !important;
          padding: clamp(2px, 0.5vw, 4px) clamp(3px, 0.8vw, 6px) !important;
        }

        .wb-c8-right-img {
          max-width: 100% !important;
          max-height: clamp(72px, 10vw, 115px) !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          display: block !important;
        }

        .wb-c8-wrong {
          position: absolute !important;
          right: clamp(-24px, -2vw, -28px) !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          width: clamp(18px, 2vw, 22px) !important;
          height: clamp(18px, 2vw, 22px) !important;
          border-radius: 50% !important;
          background-color: #ef4444 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: clamp(10px, 1vw, 12px) !important;
          font-weight: 700 !important;
          border: 2px solid #fff !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
        }

        .wb-c8-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: clamp(6px, 1vw, 8px) !important;
        }

        @media (max-width: 900px) {
          .wb-c8-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: clamp(16px, 2vw, 18px) !important;
          }

          .wb-c8-left-col,
          .wb-c8-right-col {
            gap: clamp(14px, 2vw, 18px) !important;
          }

          .wb-c8-left-row,
          .wb-c8-right-row {
            min-height: auto !important;
          }

          .wb-c8-right-img-wrap {
            justify-content: flex-start !important;
          }

          .wb-c8-wrong {
            right: 0 !important;
          }
        }

        @media (max-width: 600px) {
          .wb-c8-text {
            font-size: clamp(15px, 4vw, 18px) !important;
            line-height: 1.5 !important;
          }

          .wb-c8-num {
            font-size: clamp(17px, 4.2vw, 20px) !important;
          }

          .wb-c8-left-row {
            grid-template-columns: 20px minmax(0, 1fr) 14px !important;
            gap: 8px !important;
          }

          .wb-c8-right-row {
            grid-template-columns: 14px 1fr !important;
            gap: 8px !important;
          }

          .wb-c8-right-img {
            max-height: clamp(66px, 18vw, 95px) !important;
          }
        }
      `}</style>

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