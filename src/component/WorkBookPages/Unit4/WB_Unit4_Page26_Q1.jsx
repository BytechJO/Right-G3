import { useCallback, useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Button from "../Button";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import useWorkbookMatchingKeyboard from "./useWorkbookMatchingKeyboard";
import sentence1Audio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise A/Item_001_Lolo_is_thirsty.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise A/Item_002_He_thanks_his_mother_with_a_flower.mp3";

import rightImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex A  1.svg";
import rightImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex A  2.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#bdbdbd";

const exerciseData = {
  left: [
    {
      id: 1,
      text: "Lolo is thirsty.",
    },
    {
      id: 2,
      text: "He thanks his mother with a flower.",
    },
  ],
  right: [
    {
      id: 1,
      img: rightImg1,
    },
    {
      id: 2,
      img: rightImg2,
    },
  ],
  correctMatches: {
    1: 2,
    2: 1,
  },
};
const LEFT_IDS = exerciseData.left.map((item) => item.id);
const RIGHT_IDS = exerciseData.right.map((item) => item.id);

export default function WB_Unit3_Page26_QA() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sentenceAudio = { 1: sentence1Audio, 2: sentence2Audio };

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
    if (showAns || lockedIds.includes(id)) return;
    if (selectedRight !== null) {
      assignMatch(id, selectedRight);
      return;
    }
    setSelectedLeft(id);
    setSelectedRight(null);
  };

  const assignMatch = (leftId, rightId) => {
    if (showAns || lockedIds.includes(leftId)) return;
    const lockedOwner = Object.keys(matches).find((key) => matches[key] === rightId && lockedIds.includes(Number(key)));
    if (lockedOwner) return;

    const newMatches = { ...matches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === rightId) {
        delete newMatches[key];
      }
    });

    newMatches[leftId] = rightId;

    setMatches(newMatches);
    setSelectedLeft(null);
    setSelectedRight(null);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    const isLockedTarget = Object.keys(matches).some(
      (key) => matches[key] === rightId && lockedIds.includes(Number(key)),
    );
    if (showAns || isLockedTarget) return;
    if (selectedLeft !== null) assignMatch(selectedLeft, rightId);
    else {
      setSelectedRight(rightId);
      setSelectedLeft(null);
    }
  };

  const checkAnswers = () => {
    if (showAns || lockedIds.length === exerciseData.left.length) return;

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    keyboardMatch.clear();
    setSelectedLeft(null);
    setSelectedRight(null);

    setShowResults(true);
    const correctIds = exerciseData.left.filter((item) => matches[item.id] === exerciseData.correctMatches[item.id]).map((item) => item.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);

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
    keyboardMatch.clear();
    setMatches(exerciseData.correctMatches);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(exerciseData.left.map((item) => item.id));
    setSelectedLeft(null);
    setSelectedRight(null);
    stopAudio();
  };

  const handleStartAgain = () => {
    keyboardMatch.clear();
    setMatches({});
    setSelectedLeft(null);
    setSelectedRight(null);
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setLines([]);
    stopAudio();
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
  const isLeftConnected = (id) => !!matches[id];
  const isSelectedRightMatch = (id) => selectedRight === id || (selectedLeft !== null && matches[selectedLeft] === id);
  const getKeyboardElement = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `left-button-${id}` : `right-${id}`],
    [],
  );
  const getKeyboardAnchor = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `left-${id}` : `right-${id}`],
    [],
  );
  const isLeftLocked = useCallback((id) => lockedIds.includes(id), [lockedIds]);
  const isRightLocked = useCallback(
    (id) => Object.keys(matches).some((key) => matches[key] === id && lockedIds.includes(Number(key))),
    [lockedIds, matches],
  );
  const keyboardMatch = useWorkbookMatchingKeyboard({
    boardRef: containerRef,
    leftIds: LEFT_IDS,
    rightIds: RIGHT_IDS,
    getElement: getKeyboardElement,
    getAnchorElement: getKeyboardAnchor,
    isLeftLocked,
    isRightLocked,
    onCommit: assignMatch,
    onStart: (side, id) => {
      if (side === "left") handleLeftClick(id);
      else handleRightClick(id);
    },
    onCancel: () => {
      setSelectedLeft(null);
      setSelectedRight(null);
    },
  });

  return (
    <div className="main-container-component">
      <style>{`
  .wb-a26-wrapper {
    display: flex;
    flex-direction: column;
    gap: 28px;
    max-width: 1180px;
    margin: 0 auto;
    padding: 8px 14px 20px;
    box-sizing: border-box;
  }

  .wb-a26-title {
    margin: 0;
  }

  .wb-a26-grid {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 125px 180px;
    gap: 22px;
    align-items: start;
  }

  .wb-a26-left-col {
    display: flex;
    flex-direction: column;
    gap: 56px;
    z-index: 2;
  }

  .wb-a26-right-col {
    display: flex;
    flex-direction: column;
    gap: 46px;
    z-index: 2;
    padding-top: 0;
  }

  .wb-a26-left-row {
    display:flex;
   
    gap: 10px;
    align-items: center;
    min-height: 134px;
    position: relative;
  }

  .wb-a26-right-row {
    display: grid;
    grid-template-columns: 18px 1fr;
    gap: 16px;
    align-items: center;
    min-height: 134px;
    position: relative;
  }

  .wb-a26-num {
    font-size: 22px;
    font-weight: 700;
    color: #222;
    line-height: 1;
  }

  .wb-a26-text {
    font-size: 18px;
    line-height: 1.35;
    color: #222;
    cursor: pointer;
    padding: 10px 12px;
    border-radius: 12px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    box-sizing: border-box;
    width:310px
  }

  .wb-a26-text.selected {
    border:1px solid ${ACTIVE_COLOR};
    background-color: rgba(243, 155, 66, 0.08);
  }

  .wb-a26-text.connected {
    border: 1px solid ${LINE_COLOR};
  }
.wb-a26-text.wrong {
    border: 1px solid red;
  }

  .wb-a26-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: all 0.2s ease;
    box-sizing: border-box;
    cursor: pointer;
    flex-shrink: 0;
  }

  .wb-a26-dot.selected {
    transform: scale(1.12);
    box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.35);
  }

  .wb-a26-right-img-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 118px;
    cursor: pointer;
    padding: 10px;
    border-radius: 14px;
    border: 2px solid transparent;
    background: #fff;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .wb-a26-right-img-wrap.selected {
    border: 1px solid ${ACTIVE_COLOR};
    box-shadow: 0 0 0 4px rgba(255, 202, 148, 0.45);
    background-color: rgba(243, 155, 66, 0.08);
  }

  .wb-a26-right-img-wrap.connected {
    border: 1px solid ${LINE_COLOR};
  }

  .wb-a26-right-img {
    max-width: 190px;
    max-height: 126px;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .wb-a26-wrong {
    position: absolute;
    right: 38%;
    top: 32%;
    transform: translateY(-50%);
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

  .wb-a26-buttons {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .wb-a26-grid {
      grid-template-columns: 1fr;
    }

    .wb-a26-left-col,
    .wb-a26-right-col {
      gap: 20px;
    }

    .wb-a26-left-row,
    .wb-a26-right-row {
      min-height: auto;
    }
  }
`}</style>
      <div
        className="div-forall"
        style={{
          gap: "90px",
        }}
      >
        <ExerciseHeader sectionLetter="A" title="Read and match." subTitle="Read each th-sound sentence to the matching picture first, then connect it to the matching picture or answer one pair at a time." />

        <div ref={containerRef} className="wb-a26-grid">
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
            {keyboardMatch.preview && (
              <line
                {...keyboardMatch.preview}
                stroke={LINE_COLOR}
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            )}
          </svg>

          <div className="wb-a26-left-col">
            {exerciseData.left.map((item) => {
              const selected = isLeftSelected(item.id);
              const connected = isLeftConnected(item.id);
              const wrong = isWrongMatch(item.id);

              return (
                <div key={item.id} className="wb-a26-left-row">
                  <div className="wb-a26-num">{item.id}</div>

                  <div
                    ref={(el) => (elementRefs.current[`left-button-${item.id}`] = el)}
                    className={`wb-a26-text ${
                      selected
                        ? "selected"
                        : connected
                          ? wrong
                            ? "wrong"
                            : "connected"
                          : ""
                    }`}
                    onClick={() => {
                      playAudio(`sentence-${item.id}`, sentenceAudio[item.id]);
                      handleLeftClick(item.id);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play and select: ${item.text}`}
                    aria-disabled={showAns || lockedIds.includes(item.id)}
                    draggable={!showAns && !lockedIds.includes(item.id)}
                    onDragStart={() => handleLeftClick(item.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => selectedRight !== null && assignMatch(item.id, selectedRight)}
                    onKeyDown={(event) => {
                      if (!keyboardMatch.origin && (event.key === "Enter" || event.key === " ")) playAudio(`sentence-${item.id}`, sentenceAudio[item.id]);
                      keyboardMatch.handleKeyDown(event, "left", item.id);
                    }}
                    onFocus={() => keyboardMatch.handleFocus("left", item.id)}
                    style={{
                      cursor: showAns || lockedIds.includes(item.id) ? "default" : "pointer",
                    }}
                  >
                    <Unit4PlayingAudioIcon active={activeAudioKey === `sentence-${item.id}`} />
                    {item.text}
                  </div>

                  <div
                    ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                    onClick={() => handleLeftClick(item.id)}
                    className={`wb-a26-dot ${selected ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("left", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  {wrong && <div className="wb-a26-wrong">✕</div>}
                </div>
              );
            })}
          </div>

          <div />

          <div className="wb-a26-right-col">
            {exerciseData.right.map((item) => {
              const selectedMatch = isSelectedRightMatch(item.id);

              return (
                <div key={item.id} className="wb-a26-right-row">
                  <div
                    ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                    onClick={() => handleRightClick(item.id)}
                    role="button"
                    tabIndex={isRightLocked(item.id) ? -1 : 0}
                    aria-disabled={showAns || isRightLocked(item.id)}
                    aria-label={`Connect to picture ${item.id}`}
                    draggable={!showAns && !isRightLocked(item.id)}
                    onDragStart={() => handleRightClick(item.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => selectedLeft !== null && assignMatch(selectedLeft, item.id)}
                    onKeyDown={(event) => {
                      keyboardMatch.handleKeyDown(event, "right", item.id);
                    }}
                    onFocus={() => keyboardMatch.handleFocus("right", item.id)}
                    className={`wb-a26-dot ${selectedMatch ? "selected" : ""}`}
                    style={{
                      backgroundColor: getDotColor("right", item.id),
                      cursor: showAns ? "default" : "pointer",
                    }}
                  />

                  <div
                    className={`wb-a26-right-img-wrap ${
                      selectedMatch ? "selected" : ""
                    }`}
                    onClick={() => handleRightClick(item.id)}
                    style={{
                      cursor: showAns ? "default" : "pointer",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.id === 1 ? "A child thanking his mother with a flower" : "A thirsty cat beside water"}
                      className="wb-a26-right-img"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="wb-a26-buttons">
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
