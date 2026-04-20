import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

// استبدل هاي المسارات بالمسارات الحقيقية عندك
import char1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 1.svg";
import char2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 2.svg";
import char3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 3.svg";
import char4 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 15/Ex A 4.svg";

const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#bdbdbd";
const ACTIVE_COLOR = "#f39b42";

const exerciseData = {
  left: [
    { id: 1, img: char1, text: "Does he have any ink?" },
    { id: 2, img: char2, text: "Does she have any paper?" },
    { id: 3, img: char3, text: "Does he have any eggplants?" },
    { id: 4, img: char4, text: "Does he have any grapes?" },
  ],
  right: [
    { id: 1, text: "Yes, he has some." },
    { id: 2, text: "No, he hasn't any." },
    { id: 3, text: "Yes, she has some." },
    { id: 4, text: "Yes, he has a little." },
  ],
  correctMatches: {
    1: 2, // Does he have any ink?       → No, he hasn't any.
    2: 3, // Does she have any paper?    → Yes, she has some.
    3: 1, // Does he have any eggplants? → Yes, he has some.
    4: 4, // Does he have any grapes?    → Yes, he has a little.
  },
};

export default function WB_Unit3_Page_QA() {
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
        .wb-qa-wrapper {
          display: flex !important;
          flex-direction: column !important;
          gap: clamp(18px, 2.4vw, 28px) !important;
          max-width: 1150px !important;
          margin: 0 auto !important;
          padding: clamp(8px, 1vw, 12px) clamp(10px, 1.6vw, 14px) 20px !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }

        .wb-qa-grid {
          position: relative !important;
          width: 100% !important;
          display: grid !important;
          grid-template-columns: minmax(0, 1.5fr) minmax(110px, 14vw) minmax(200px, 0.9fr) !important;
          gap: clamp(14px, 2vw, 24px) !important;
          align-items: start !important;
        }

        .wb-qa-left-col {
          display: flex !important;
          flex-direction: column !important;
          gap: clamp(14px, 2.2vw, 32px) !important;
          z-index: 2 !important;
        }

        .wb-qa-right-col {
          display: flex !important;
          flex-direction: column !important;
          gap: clamp(14px, 2.2vw, 32px) !important;
          z-index: 2 !important;
        }

        .wb-qa-left-row {
          display: grid !important;
          grid-template-columns: clamp(20px, 2.5vw, 28px) clamp(48px, 6vw, 70px) minmax(0, 1fr) clamp(14px, 1.8vw, 18px) !important;
          align-items: center !important;
          gap: clamp(6px, 1.2vw, 12px) !important;
          min-height: clamp(62px, 8.5vw, 90px) !important;
          position: relative !important;
        }

        .wb-qa-right-row {
          display: grid !important;
          grid-template-columns: clamp(14px, 1.8vw, 18px) minmax(0, 1fr) !important;
          align-items: center !important;
          gap: clamp(8px, 1.4vw, 14px) !important;
          min-height: clamp(62px, 8.5vw, 90px) !important;
          position: relative !important;
        }

        .wb-qa-num {
          font-size: clamp(18px, 2vw, 24px) !important;
          font-weight: 900 !important;
          color: #222 !important;
          line-height: 1 !important;
          flex-shrink: 0 !important;
        }

        .wb-qa-char-img {
          width: clamp(48px, 6vw, 70px) !important;
          height: clamp(48px, 6vw, 70px) !important;
          object-fit: contain !important;
          display: block !important;
          flex-shrink: 0 !important;
        }

        .wb-qa-text {
          font-size: clamp(15px, 1.8vw, 19px) !important;
          line-height: 1.45 !important;
          color: #222 !important;
          cursor: pointer !important;
          padding: clamp(4px, 0.7vw, 6px) clamp(6px, 0.9vw, 8px) !important;
          border-radius: 12px !important;
          transition: all 0.2s ease !important;
          word-break: break-word !important;
        }

        .wb-qa-answer-text {
          font-size: clamp(15px, 1.8vw, 19px) !important;
          line-height: 1.45 !important;
          color: #222 !important;
          cursor: pointer !important;
          padding: clamp(4px, 0.7vw, 6px) clamp(6px, 0.9vw, 8px) !important;
          border-radius: 12px !important;
          transition: all 0.2s ease !important;
          word-break: break-word !important;
        }

        .wb-qa-dot {
          width: clamp(14px, 1.7vw, 18px) !important;
          height: clamp(14px, 1.7vw, 18px) !important;
          border-radius: 50% !important;
          transition: all 0.2s ease !important;
          box-sizing: border-box !important;
          cursor: pointer !important;
          flex-shrink: 0 !important;
        }

        .wb-qa-dot.selected {
          transform: scale(1.15) !important;
          box-shadow: 0 0 0 clamp(2px, 0.4vw, 4px) rgba(255, 202, 148, 0.45) !important;
        }

        .wb-qa-wrong {
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

        .wb-qa-buttons {
          display: flex !important;
          justify-content: center !important;
          margin-top: clamp(6px, 1vw, 8px) !important;
        }

        @media (max-width: 900px) {
          .wb-qa-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: clamp(16px, 2vw, 18px) !important;
          }

          .wb-qa-left-col,
          .wb-qa-right-col {
            gap: clamp(12px, 2vw, 16px) !important;
          }

          .wb-qa-left-row,
          .wb-qa-right-row {
            min-height: auto !important;
          }

          .wb-qa-wrong {
            right: 0 !important;
          }
        }

        @media (max-width: 600px) {
          .wb-qa-text,
          .wb-qa-answer-text {
            font-size: clamp(14px, 3.8vw, 17px) !important;
          }

          .wb-qa-num {
            font-size: clamp(17px, 4.2vw, 20px) !important;
          }

          .wb-qa-left-row {
            grid-template-columns: 22px 44px minmax(0, 1fr) 14px !important;
            gap: 6px !important;
          }

          .wb-qa-right-row {
            grid-template-columns: 14px 1fr !important;
            gap: 8px !important;
          }

          .wb-qa-char-img {
            width: 44px !important;
            height: 44px !important;
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
          <span className="WB-ex-A">A</span>
          Read, look, and match.
        </h1>

        <div ref={containerRef} className="wb-qa-grid">
          {/* SVG Lines */}
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

          {/* Left Column */}
          <div className="wb-qa-left-col">
            {exerciseData.left.map((item) => {
              const wrong = isWrongMatch(item.id);
              const selected = isLeftSelected(item.id);

              return (
                <div key={item.id} className="wb-qa-left-row">
                  {/* Number */}
                  <div className="wb-qa-num">{item.id}</div>

                  {/* Character Image */}
                  <img
                    src={item.img}
                    alt={`char-${item.id}`}
                    className="wb-qa-char-img"
                    onClick={() => handleLeftClick(item.id)}
                    style={{ cursor: showAns ? "default" : "pointer" }}
                  />

                  {/* Question Text */}
                  <div
                    onClick={() => handleLeftClick(item.id)}
                    className="wb-qa-text"
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

                  {/* Left Dot */}
                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    className={`wb-qa-dot ${selected ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("left", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {/* Wrong Mark */}
                  {wrong && <div className="wb-qa-wrong">✕</div>}
                </div>
              );
            })}
          </div>

          {/* Middle spacer */}
          <div />

          {/* Right Column */}
          <div className="wb-qa-right-col">
            {exerciseData.right.map((item) => {
              const selectedMatch = isSelectedRightMatch(item.id);
              const connected = isRightConnected(item.id);

              return (
                <div key={item.id} className="wb-qa-right-row">
                  {/* Right Dot */}
                  <div
                    ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    className={`wb-qa-dot ${selectedMatch ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("right", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {/* Answer Text */}
                  <div
                    onClick={() => handleRightClick(item.id)}
                    className="wb-qa-answer-text"
                    style={{
                      border: selectedMatch
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      borderRadius: "12px",
                      boxShadow: selectedMatch
                        ? `0 0 0 4px rgba(255, 202, 148, 0.35)`
                        : "none",
                      backgroundColor: selectedMatch
                        ? "rgba(243, 155, 66, 0.06)"
                        : "transparent",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="wb-qa-buttons">
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