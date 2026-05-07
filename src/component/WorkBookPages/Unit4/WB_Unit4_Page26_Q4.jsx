import { useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";
import AudioWithCaption from "../../AudioWithCaption";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd5pg26instruction2-adult-lady_CHBq9E0z.mp3"; // ← غيّر المسار حسب ملف الأوديو

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#ffca94";
const INACTIVE_COLOR = "#bdbdbd";

const exerciseData = {
  top: [
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
    { id: 6, text: "6" },
  ],
  bottom: [
    { id: 1, text: "thick" },
    { id: 2, text: "father" },
    { id: 3, text: "this" },
    { id: 4, text: "they" },
    { id: 5, text: "thank" },
    { id: 6, text: "math" },
  ],
  correctMatches: {
    1: 6, // 1 -> math
    2: 1, // 2 -> thick
    3: 3, // 3 -> this
    4: 2, // 4 -> father
    5: 5, // 5 -> thank
    6: 4, // 6 -> they
  },
};

export default function WB_Unit5_Page26_QD() {
  const [selectedTop, setSelectedTop] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});
  const captions = [
    { start: 0.3, end: 3.06, text: "Page 26, phonics." },
    { start: 3.06, end: 6.54, text: "Exercise D. Listen and match." },
    { start: 7.56, end: 9.4, text: "1- math." },
    { start: 9.4, end: 12.1, text: "2- thick." },
    { start: 13.4, end: 15.26, text: "3- this." },
    { start: 16.38, end: 18.0, text: "4- father." },
    { start: 19.34, end: 20.8, text: "5- thank." },
    { start: 22.34, end: 23.6, text: "6- they." },
  ];
  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([topId, bottomId]) => {
          const topEl = elementRefs.current[`top-${topId}`];
          const bottomEl = elementRefs.current[`bottom-${bottomId}`];

          if (!topEl || !bottomEl) return null;

          const topRect = topEl.getBoundingClientRect();
          const bottomRect = bottomEl.getBoundingClientRect();

          return {
            id: `${topId}-${bottomId}`,
            x1: topRect.left + topRect.width / 2 - containerRect.left,
            y1: topRect.bottom - containerRect.top,
            x2: bottomRect.left + bottomRect.width / 2 - containerRect.left,
            y2: bottomRect.top - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  const handleTopClick = (id) => {
    if (showAns || showResults) return;
    setSelectedTop(id);
    setShowResults(false);
  };

  const handleBottomClick = (bottomId) => {
    if (showAns || selectedTop === null || showResults) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === bottomId) {
        delete newMatches[key];
      }
    });

    newMatches[selectedTop] = bottomId;

    setMatches(newMatches);
    setSelectedTop(null);
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns || showResults) return;

    const allConnected = exerciseData.top.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    let score = 0;
    Object.keys(exerciseData.correctMatches).forEach((topId) => {
      if (matches[topId] === exerciseData.correctMatches[topId]) {
        score++;
      }
    });

    const totalQuestions = exerciseData.top.length;

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
    setSelectedTop(null);
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedTop(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getDotColor = (side, id) => {
    if (side === "top" && selectedTop === id) return ACTIVE_COLOR;

    const isConnected =
      side === "top" ? !!matches[id] : Object.values(matches).includes(id);

    if (!isConnected) return INACTIVE_COLOR;

    return ACTIVE_COLOR;
  };

  const isWrongMatch = (topId) => {
    if (!showResults) return false;
    if (!matches[topId]) return false;
    return matches[topId] !== exerciseData.correctMatches[topId];
  };

  const isTopSelected = (id) => selectedTop === id;
  const isTopConnected = (id) => !!matches[id];
  const isBottomConnected = (id) => Object.values(matches).includes(id);
  const isSelectedBottomMatch = (id) =>
    selectedTop !== null && matches[selectedTop] === id;

  return (
    <div className="main-container-component">
      <style>{`
  .wb-d-wrapper {
    display: flex;
    flex-direction: column;
    gap: 28px;
    max-width: 1150px;
    margin: 0 auto;
    padding: 8px 14px 20px;
    box-sizing: border-box;
  }

  .wb-d-title {
    margin: 0;
  }

  .wb-d-board {
    position: relative;
    width: 100%;
    min-height: 330px;
    padding: 24px 20px 12px;
    box-sizing: border-box;
  }

  .wb-d-top-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    align-items: start;
    margin-bottom: 110px;
    position: relative;
    z-index: 2;
  }

  .wb-d-bottom-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    align-items: start;
    position: relative;
    z-index: 2;
  }

  .wb-d-top-item,
  .wb-d-bottom-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .wb-d-number-circle {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 2px solid #9d9d9d;
    background: #fff;
    color: #333;
    font-size: 24px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .wb-d-number-circle.selected {
    border: 3px solid ${ACTIVE_COLOR};
    box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35);
    background: rgba(243, 155, 66, 0.08);
  }

  .wb-d-number-circle.connected {
    border: 2px solid ${LINE_COLOR};
    background: rgba(255, 202, 148, 0.12);
  }

  .wb-d-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-top: 10px;
    transition: all 0.2s ease;
    box-sizing: border-box;
    cursor: pointer;
    flex-shrink: 0;
  }

  .wb-d-dot.selected {
    transform: scale(1.12);
    box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35);
  }

  .wb-d-word {
    font-size: 22px;
    line-height: 1.2;
    color: #222;
    padding: 8px 12px;
    border-radius: 12px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    min-width: 90px;
    box-sizing: border-box;
  }

  .wb-d-word.selected {
    border: 3px solid ${ACTIVE_COLOR};
    box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35);
    background: rgba(243, 155, 66, 0.08);
  }

  .wb-d-word.connected {
    border: 2px solid ${LINE_COLOR};
    // background: rgba(255, 202, 148, 0.12);
  }
 .wb-d-number-circle.wrong {
    border: 2px solid red;
    // background: rgba(255, 202, 148, 0.12);
  }
  .wb-d-wrong {
    position: absolute;
    top: -8px;
    right: 26px;
       width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: red;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  }

  .wb-d-buttons {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .wb-d-top-row,
    .wb-d-bottom-row {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 24px;
    }

    .wb-d-board {
      min-height: 500px;
    }
  }

  @media (max-width: 560px) {
    .wb-d-top-row,
    .wb-d-bottom-row {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`}</style>
      <div
        className="div-forall"
        style={{
          gap: "40px",
        }}
      >
        <h1 className="WB-header-title-page8">
          {" "}
          <span className="WB-ex-A">D</span>
          Listen and match.
        </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <QuestionAudioPlayer
            src={sound1}
            captions={captions}
            stopAtSecond={6.54}
          />
        </div>

        <div ref={containerRef} className="wb-d-board">
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
                stroke={"#f39b42"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="wb-d-top-row">
            {exerciseData.top.map((item) => {
              const selected = isTopSelected(item.id);
              const connected = isTopConnected(item.id);
              const wrong = isWrongMatch(item.id);

              return (
                <div key={item.id} className="wb-d-top-item">
                  <div
                    className={`wb-d-number-circle ${
                      selected
                        ? "selected"
                        : connected
                          ? wrong
                            ? "wrong"
                            : "connected"
                          : ""
                    }`}
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`top-${item.id}`] = el)}
                    className={`wb-d-dot ${selected ? "selected" : ""}`}
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      backgroundColor: getDotColor("top", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && <div className="wb-d-wrong">✕</div>}
                </div>
              );
            })}
          </div>

          <div className="wb-d-bottom-row">
            {exerciseData.bottom.map((item) => {
              const selectedMatch = isSelectedBottomMatch(item.id);
              const connected = isBottomConnected(item.id);

              return (
                <div key={item.id} className="wb-d-bottom-item">
                  <div
                    ref={(el) =>
                      (elementRefs.current[`bottom-${item.id}`] = el)
                    }
                    className={`wb-d-dot ${selectedMatch ? "selected" : ""}`}
                    onClick={() => handleBottomClick(item.id)}
                    style={{
                      backgroundColor: getDotColor("bottom", item.id),
                      marginBottom: "10px",
                      marginTop: "0",
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  <div
                    className={`wb-d-word ${
                      selectedMatch ? "selected" : connected ? "connected" : ""
                    }`}
                    onClick={() => handleBottomClick(item.id)}
                    style={{
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

        <div className="wb-d-buttons">
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
