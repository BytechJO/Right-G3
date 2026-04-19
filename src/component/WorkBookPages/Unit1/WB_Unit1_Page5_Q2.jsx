import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 6.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 7.svg";
import img8 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 5/SVG/Asset 8.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a9a9a9";

const exerciseData = {
  left: [
    { id: 1, text: "The eagle flies higher than the dove." },
    { id: 2, text: "The scooter is slower than the train." },
    { id: 3, text: "The tortoise is smarter than the hare." },
    { id: 4, text: "The pencil is lighter than the pencil case." },
  ],
  right: [
    {
      id: 1,
      images: [
        { src: img1, alt: "scooter" },
        { src: img2, alt: "train" },
      ],
    },
    {
      id: 2,
      images: [
        { src: img3, alt: "tortoise" },
        { src: img4, alt: "hare" },
      ],
    },
    {
      id: 3,
      images: [
        { src: img5, alt: "pencil" },
        { src: img6, alt: "pencil case" },
      ],
    },
    {
      id: 4,
      images: [
        { src: img7, alt: "eagle" },
        { src: img8, alt: "dove" },
      ],
    },
  ],
  correctMatches: {
    1: 4,
    2: 1,
    3: 2,
    4: 3,
  },
};

export default function WB_Unit3_Page5_QF() {
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

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) {
        score++;
      }
    });

    const totalQuestions = exerciseData.left.length;

    if (score === totalQuestions) {
      ValidationAlert.success(`Score: ${score} / ${totalQuestions}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${totalQuestions}`);
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

  const isWrongMatch = (leftId) => {
    if (!showResults) return false;
    if (!matches[leftId]) return false;
    return matches[leftId] !== exerciseData.correctMatches[leftId];
  };

  const isLeftSelected = (id) => selectedLeft === id;
  const isRightConnected = (id) => Object.values(matches).includes(id);
  const isSelectedRightMatch = (id) =>
    selectedLeft !== null && matches[selectedLeft] === id;

  return (
    <div className="main-container-component">
      <style>{`
        .wb-f-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2vw, 28px);
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(8px, 1.5vw, 16px) clamp(10px, 2vw, 18px) 20px;
          box-sizing: border-box;
          width: 100%;
        }

        .wb-f-board {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .wb-f-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(250px, 0.95fr);
          column-gap: clamp(18px, 2vw, 32px);
          align-items: start;
        }

        .wb-f-left {
          display: flex;
          flex-direction: column;
          gap: clamp(22px, 3vw, 34px);
        }

        .wb-f-right {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 2.4vw, 28px);
        }

        .wb-f-left-row {
          display: grid;
          grid-template-columns: clamp(22px, 3vw, 34px) minmax(0, 1fr) clamp(18px, 2vw, 28px);
          gap: clamp(8px, 1.4vw, 14px);
          align-items: center;
          min-height: clamp(52px, 7vw, 76px);
          position: relative;
        }

        .wb-f-left-num {
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-f-left-text {
          font-size: clamp(16px, 2.1vw, 24px);
          font-weight: 500;
          color: #111;
          line-height: 1.35;
        }

        .wb-f-right-row {
          display: grid;
          grid-template-columns: clamp(18px, 2vw, 28px) minmax(0, 1fr);
          gap: clamp(10px, 1.6vw, 16px);
          align-items: center;
          min-height: clamp(56px, 8vw, 84px);
        }

        .wb-f-dot {
          width: clamp(14px, 1.8vw, 18px);
          height: clamp(14px, 1.8vw, 18px);
          border-radius: 50%;
          transition: all 0.2s ease;
          flex-shrink: 0;
          cursor: pointer;
          box-sizing: border-box;
        }

        .wb-f-dot.selected {
          transform: scale(1.1);
          box-shadow: 0 0 0 5px rgba(243, 155, 66, 0.22);
        }

        .wb-f-right-card {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-height: clamp(56px, 8vw, 84px);
          padding: 4px 0;
          box-sizing: border-box;
        }

        .wb-f-right-pair {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: clamp(8px, 1.8vw, 18px);
          width: 100%;
          flex-wrap: nowrap;
        }

        .wb-f-right-img {
          display: block;
          width: auto;
          height: auto;
          max-width: clamp(56px, 8vw, 94px);
          max-height: clamp(42px, 7vw, 74px);
          object-fit: contain;
          user-select: none;
          pointer-events: none;
          flex-shrink: 1;
        }

        .wb-f-wrong {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
        }

        .wb-f-buttons {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 900px) {
          .wb-f-grid {
            grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.95fr);
          }
        }

        @media (max-width: 760px) {
          .wb-f-grid {
            grid-template-columns: 1fr;
            row-gap: 24px;
          }

          .wb-f-right {
            padding-left: 34px;
          }

          .wb-f-svg-lines {
            display: none;
          }

          .wb-f-right-pair {
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .wb-f-right {
            padding-left: 28px;
          }

          .wb-f-right-pair {
            gap: 10px;
          }
        }
      `}</style>
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
          <span className="WB-ex-A">F</span>
          Read and match.
        </h1>

        <div ref={containerRef} className="wb-f-board">
          <svg
            className="wb-f-svg-lines"
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
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="wb-f-grid">
            <div className="wb-f-left">
              {exerciseData.left.map((item) => {
                const selected = isLeftSelected(item.id);
                const wrong = isWrongMatch(item.id);

                return (
                  <div key={item.id} className="wb-f-left-row">
                    <div className="wb-f-left-num">{item.id}</div>

                    <div className="wb-f-left-text">{item.text}</div>

                    <div
                      ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                      className={`wb-f-dot ${selected ? "selected" : ""}`}
                      onClick={() => handleLeftClick(item.id)}
                      style={{
                        backgroundColor: getDotColor("left", item.id),
                        cursor: showAns ? "default" : "pointer",
                      }}
                    />

                    {wrong && <div className="wb-f-wrong">✕</div>}
                  </div>
                );
              })}
            </div>

            <div className="wb-f-right">
              {exerciseData.right.map((item) => {
                const selectedMatch = isSelectedRightMatch(item.id);
                const connected = isRightConnected(item.id);

                return (
                  <div key={item.id} className="wb-f-right-row">
                    <div
                      ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                      className={`wb-f-dot ${selectedMatch ? "selected" : ""}`}
                      onClick={() => handleRightClick(item.id)}
                      style={{
                        backgroundColor: getDotColor("right", item.id),
                        cursor: showAns ? "default" : "pointer",
                        boxShadow: connected
                          ? "0 0 0 5px rgba(243, 155, 66, 0.18)"
                          : "none",
                      }}
                    />

                    <div
                      className="wb-f-right-card"
                      onClick={() => handleRightClick(item.id)}
                      style={{
                        cursor: showAns ? "default" : "pointer",
                      }}
                    >
                      <div className="wb-f-right-pair">
                        {item.images.map((img, index) => (
                          <img
                            key={`${item.id}-${index}`}
                            src={img.src}
                            alt={img.alt}
                            className="wb-f-right-img"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="wb-f-buttons">
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