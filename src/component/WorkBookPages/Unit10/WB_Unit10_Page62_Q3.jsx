import React, { useCallback, useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd13pg62instruction1-adult-lady_lYm3lMP5.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import drAudio from "../../../assets/audio/WorkBook/unit10/Page 62 - Exercise C/Item_001_dr.mp3";
import trAudio from "../../../assets/audio/WorkBook/unit10/Page 62 - Exercise C/Item_002_tr.mp3";
import crAudio from "../../../assets/audio/WorkBook/unit10/Page 62 - Exercise C/Item_003_cr.mp3";

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
    { id: 1, text: "tr", audio: trAudio },
    { id: 2, text: "dr", audio: drAudio },
    { id: 3, text: "cr", audio: crAudio },
    { id: 4, text: "dr", audio: drAudio },
    { id: 5, text: "tr", audio: trAudio },
    { id: 6, text: "cr", audio: crAudio },
  ],
  correctMatches: {
    1: [2, 4],
    2: [3, 6],
    3: [5, 1],
    4: [1, 5],
    5: [4, 2],
    6: [6, 3],
  },
};

export default function WB_Unit10_Page62_QC() {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const containerRef = useRef(null);
  const elementRefs = useRef({});
  const captions = [
    { start: 0.4, end: 3.08, text: "Page 62, phonics exercise C." },
    { start: 3.08, end: 4.82, text: "Listen and match." },
    { start: 5.86, end: 7.32, text: "1- dragon." },
    { start: 7.32, end: 10.12, text: "2- cranberry." },
    { start: 11.14, end: 12.78, text: "3- trust." },
    { start: 12.78, end: 15.38, text: "4- trace." },
    { start: 15.38, end: 18.22, text: "5- drive." },
    { start: 18.22, end: 21.0, text: "6- cryon" },
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

  const commitMatch = (topId, bottomId) => {
    if (showAns || lockedIds.includes(Number(topId))) return;
    if (lockedIds.some((id) => matches[id] === Number(bottomId))) return;
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach((key) => {
      if (
        newMatches[key] === Number(bottomId) &&
        !lockedIds.includes(Number(key))
      )
        delete newMatches[key];
    });
    newMatches[topId] = Number(bottomId);
    setMatches(newMatches);
    setSelectedTop(null);
    setSelectedBottom(null);
  };

  const handleTopClick = (id) => {
    if (showAns || lockedIds.includes(id)) return;
    if (selectedBottom !== null) {
      commitMatch(id, selectedBottom);
      return;
    }
    setSelectedTop(id);
    setSelectedBottom(null);
    setShowResults(false);
  };

  const handleBottomClick = (bottomId) => {
    if (showAns || lockedIds.some((id) => matches[id] === bottomId)) return;
    if (selectedTop !== null) commitMatch(selectedTop, bottomId);
    else {
      setSelectedBottom(bottomId);
      setSelectedTop(null);
    }
    setShowResults(false);
  };

  const checkAnswers = () => {
    if (showAns || lockedIds.length === exerciseData.top.length) return;

    const allConnected = exerciseData.top.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);
    setLockedIds(
      exerciseData.top
        .filter((item) =>
          exerciseData.correctMatches[item.id].includes(matches[item.id]),
        )
        .map((item) => item.id),
    );

    let score = 0;

    Object.keys(exerciseData.correctMatches).forEach((topId) => {
      if (exerciseData.correctMatches[topId].includes(matches[topId])) {
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
    const oneCorrectAnswerPerItem = {};

    Object.keys(exerciseData.correctMatches).forEach((topId) => {
      // ياخد أول إجابة صحيحة فقط
      oneCorrectAnswerPerItem[topId] = exerciseData.correctMatches[topId][0];
    });

    setMatches(oneCorrectAnswerPerItem);
    setShowResults(true);
    setShowAns(true);
    setSelectedTop(null);
    setSelectedBottom(null);
    setLockedIds(exerciseData.top.map((item) => item.id));
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedTop(null);
    setSelectedBottom(null);
    setShowResults(false);
    setShowAns(false);
    setLines([]);
    setLockedIds([]);
    keyboard.clear();
    stopAudio();
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
    return !exerciseData.correctMatches[topId].includes(matches[topId]);
  };

  const isTopSelected = (id) => selectedTop === id;
  const isTopConnected = (id) => !!matches[id];
  const isBottomConnected = (id) => Object.values(matches).includes(id);
  const isSelectedBottomMatch = (id) =>
    selectedBottom === id ||
    (selectedTop !== null && matches[selectedTop] === id);

  const getEndpoint = useCallback(
    (side, id) =>
      elementRefs.current[`${side}-group-${id}`] ||
      elementRefs.current[`${side}-${id}`],
    [],
  );
  const getAnchorElement = useCallback(
    (side, id) => elementRefs.current[`${side}-${id}`],
    [],
  );
  const isBottomLocked = (id) =>
    lockedIds.some((topId) => matches[topId] === id);
  const keyboard = useWorkbookMatchingKeyboard({
    boardRef: containerRef,
    leftIds: exerciseData.top.map((item) => item.id),
    rightIds: exerciseData.bottom.map((item) => item.id),
    getElement: (side, id) =>
      getEndpoint(side === "left" ? "top" : "bottom", id),
    getAnchorElement: (side, id) =>
      getAnchorElement(side === "left" ? "top" : "bottom", id),
    isLeftLocked: (id) => showAns || lockedIds.includes(id),
    isRightLocked: (id) => showAns || isBottomLocked(id),
    onCommit: commitMatch,
    onStart: (side, id) => {
      setSelectedTop(side === "left" ? id : null);
      setSelectedBottom(side === "right" ? id : null);
    },
    onCancel: () => {
      setSelectedTop(null);
      setSelectedBottom(null);
    },
  });

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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wb-d-top-row {
    display: flex;
    gap: 12px;
    // align-items: start;
    margin-bottom: 110px;
    position: relative;
        width: 85%;
    z-index: 2;
    justify-content: space-between;
  }

  .wb-d-bottom-row {
   display: flex;
    gap: 12px;
    // align-items: start;
    // margin-bottom: 110px;
    position: relative;
        width: 85%;
    z-index: 2;
    justify-content: space-between;
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
    min-width: 100%;
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
        <ExerciseHeader
          sectionLetter="C"
          title="Listen and match."
          subTitle="Listen to the full audio once, then replay as needed and match each audio item to the correct cr, dr, or tr blend only after you hear the key sound or word."
        />
        <div
          className="w-full"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <QuestionAudioPlayer
            pageId="WB_Unit10_Page62_Q3"
            src={sound1}
            captions={captions}
            stopAtSecond={5.18}
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
            {keyboard.preview && (
              <line
                x1={keyboard.preview.x1}
                y1={keyboard.preview.y1}
                x2={keyboard.preview.x2}
                y2={keyboard.preview.y2}
                stroke={ACTIVE_COLOR}
                strokeWidth="3"
                strokeDasharray="7 7"
                className="unit4-matching-preview"
              />
            )}
          </svg>

          <div className="wb-d-top-row">
            {exerciseData.top.map((item) => {
              const selected = isTopSelected(item.id);
              const connected = isTopConnected(item.id);
              const wrong = isWrongMatch(item.id);

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    elementRefs.current[`top-group-${item.id}`] = el;
                  }}
                  className="wb-d-top-item unit4-interactive"
                  role="button"
                  tabIndex={showAns || lockedIds.includes(item.id) ? -1 : 0}
                  aria-disabled={showAns || lockedIds.includes(item.id)}
                  aria-label={`Match audio item ${item.id}`}
                  onClick={() => handleTopClick(item.id)}
                  onKeyDown={(event) =>
                    keyboard.handleKeyDown(event, "left", item.id)
                  }
                  onFocus={() => keyboard.handleFocus("left", item.id)}
                >
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
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`top-${item.id}`] = el)}
                    className={`wb-d-dot ${selected ? "selected" : ""}`}
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
                <div
                  key={item.id}
                  ref={(el) => {
                    elementRefs.current[`bottom-group-${item.id}`] = el;
                  }}
                  className="wb-d-bottom-item unit4-interactive unit4-audio-control"
                  role="button"
                  tabIndex={showAns || isBottomLocked(item.id) ? -1 : 0}
                  aria-disabled={showAns || isBottomLocked(item.id)}
                  aria-label={`Match and play ${item.text}`}
                  onClick={() => {
                    if (showAns || isBottomLocked(item.id)) return;
                    playAudio(`blend-${item.id}`, item.audio);
                    handleBottomClick(item.id);
                  }}
                  onKeyDown={(event) => {
                    keyboard.handleKeyDown(event, "right", item.id);
                    if (
                      (event.key === "Enter" || event.key === " ") &&
                      !showAns &&
                      !isBottomLocked(item.id)
                    )
                      playAudio(`blend-${item.id}`, item.audio);
                  }}
                  onFocus={() => keyboard.handleFocus("right", item.id)}
                >
                  <div
                    ref={(el) =>
                      (elementRefs.current[`bottom-${item.id}`] = el)
                    }
                    className={`wb-d-dot ${selectedMatch ? "selected" : ""}`}
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
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    {item.text}
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `blend-${item.id}`}
                    />
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
