import { useCallback, useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Button from "../Button";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import useWorkbookMatchingKeyboard from "./useWorkbookMatchingKeyboard";
import a1 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_001_It's_cold.mp3";
import a2 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_002_Wear_your_T-shirt.mp3";
import a3 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_003_It's_sunny.mp3";
import a4 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_004_Wear_your_coat.mp3";
import a5 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_005_It's_rainy.mp3";
import a6 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_006_Wear_your_sunglasses.mp3";
import a7 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_007_It's_hot.mp3";
import a8 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise D/Item_008_Get_your_umbrella.mp3";

// غيّري مسارات الصور حسب مكان ملفاتك
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 4.svg";
import rightImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 5.svg";
import rightImg2 from"../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 6.svg";
import rightImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 7.svg";
import rightImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 22/Ex D 8.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#9ca3af";
const WRONG_COLOR = "#ef4444";

const EXERCISE_DATA = {
  left: [
    { id: 1, img: img1, text: "It’s cold." },
    { id: 2, img: img2, text: "It’s sunny." },
    { id: 3, img: img3, text: "It’s rainy." },
    { id: 4, img: img4, text: "It’s hot." },
  ],

  right: [
    { id: 1, img: rightImg1, before: "Wear your", after: "T-shirt." },
    { id: 2, img: rightImg2, before: "Wear your", after: "coat." },
    { id: 3, img: rightImg3, before: "Wear your", after: "sunglasses." },
    { id: 4, img: rightImg4, before: "Get your", after: "umbrella." },
  ],

  correctMatches: {
    1: 2, // cold -> coat
    2: 3, // sunny -> sunglasses
    3: 4, // rainy -> umbrella
    4: 1, // hot -> T-shirt
  },
};
const LEFT_AUDIO = { 1: a1, 2: a3, 3: a5, 4: a7 };
const RIGHT_AUDIO = { 1: a2, 2: a4, 3: a6, 4: a8 };
const LEFT_IDS = EXERCISE_DATA.left.map((item) => item.id);
const RIGHT_IDS = EXERCISE_DATA.right.map((item) => item.id);

const styles = {
  matchArea: {
    position: "relative",
    width: "100%",
    // minHeight: "clamp(420px, 70vw, 760px)",
  },

  rowsWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "clamp(18px, 3vw, 34px)",
    position: "relative",
    zIndex: 2,
  },

  row: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    alignItems: "center",
    gap: "150px",
    width: "100%",
  },

  leftSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(8px, 1vw, 10px)",
    minWidth: 0,
  },

  leftNumber: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111",
    width: "clamp(18px, 2vw, 28px)",
    textAlign: "center",
    flexShrink: 0,
  },

  leftImage: {
    width: "clamp(44px, 8vw, 90px)",
    height: "clamp(44px, 8vw, 90px)",
    objectFit: "contain",
    flexShrink: 0,
  },

  bubbleLeftWrap: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
    // flex: 1,
  },

  bubbleRightWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: 0,
  },

  bubble: {
    position: "relative",
    minHeight: "45px",
    border: "1px solid #222",
    borderRadius: "14px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "clamp(8px, 1.2vw, 14px) clamp(12px, 1.8vw, 20px)",
    boxSizing: "border-box",
    fontSize: "18px",
    color: "#222",
    lineHeight: 1.15,
    gap: "clamp(8px, 1vw, 12px)",
    maxWidth: "100%",
  },

  leftBubble: {
    width: "110px",
    justifyContent: "flex-start",
  },

  rightBubble: {
    width: "250px",
    justifyContent: "flex-start",
  },

  leftTail: {
    position: "absolute",
    left: "-36px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "36px",
    height: "18px",
  },

  rightTail: {
    position: "absolute",
    right: "-36px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "36px",
    height: "18px",
  },

  centerDotWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    width: "clamp(12px, 1.5vw, 18px)",
    height: "clamp(12px, 1.5vw, 18px)",
    borderRadius: "50%",
    cursor: "pointer",
    flexShrink: 0,
  },

  rightItemWrap: {
    display: "flex",
    alignItems: "center",
    // gap: "clamp(8px, 1vw, 12px)",
    minWidth: 0,
  },

  rightImage: {
    width: "clamp(26px, 4vw, 46px)",
    height: "clamp(26px, 4vw, 46px)",
    objectFit: "contain",
    flexShrink: 0,
  },

  text: {
    whiteSpace: "nowrap",
  },

  wrongBadge: {
    position: "absolute",
    width: "clamp(16px, 2vw, 22px)",
    height: "clamp(16px, 2vw, 22px)",
    borderRadius: "50%",
    backgroundColor:"red",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(9px, 1vw, 12px)",
    fontWeight: "700",
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
    width: "100%",
  },
};

// eslint-disable-next-line react-refresh/only-export-components
const TailLeft = () => (
  <svg viewBox="0 0 36 18" style={styles.leftTail}>
    <path
      d="M36 2 L0 9 L36 16"
      fill="#fff"
      stroke="#222"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

// eslint-disable-next-line react-refresh/only-export-components
const TailRight = () => (
  <svg viewBox="0 0 36 18" style={styles.rightTail}>
    <path
      d="M0 2 L36 9 L0 16"
      fill="#fff"
      stroke="#222"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const WB_ReadAndMatch_Page22 = () => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const leftEl = elementRefs.current[`left-dot-${leftId}`];
          const rightEl = elementRefs.current[`right-dot-${rightId}`];

          if (!leftEl || !rightEl) return null;

          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          return {
            id: `line-${leftId}-${rightId}`,
            x1: leftRect.left + leftRect.width / 2 - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left + rightRect.width / 2 - containerRect.left,
            y2: rightRect.top + rightRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setLines(newLines);
    };

    const rafUpdate = () => requestAnimationFrame(updateLines);

    rafUpdate();
    window.addEventListener("resize", rafUpdate);

    let resizeObserver;
    if (containerRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        rafUpdate();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", rafUpdate);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [matches, showAns, showResults]);

  const handleLeftClick = (id) => {
    if (showAns || lockedIds.includes(id)) return;
    if (selectedRight !== null) {
      assignMatch(id, selectedRight);
      return;
    }
    setSelectedLeft(id);
    setSelectedRight(null);
    setShowResults(false);
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
    if (showAns || lockedIds.length === EXERCISE_DATA.left.length) return;

    const allConnected = EXERCISE_DATA.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    keyboardMatch.clear();
    setSelectedLeft(null);
    setSelectedRight(null);

    setShowResults(true);
    const correctIds = EXERCISE_DATA.left.filter((item) => matches[item.id] === EXERCISE_DATA.correctMatches[item.id]).map((item) => item.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);

    let score = 0;
    const total = EXERCISE_DATA.left.length;

    Object.keys(EXERCISE_DATA.correctMatches).forEach((leftId) => {
      if (matches[leftId] === EXERCISE_DATA.correctMatches[leftId]) {
        score++;
      }
    });

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    keyboardMatch.clear();
    setMatches(EXERCISE_DATA.correctMatches);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(EXERCISE_DATA.left.map((item) => item.id));
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

  const getLeftDotColor = (leftId) => {
    if (selectedLeft === leftId) return ACTIVE_COLOR;
    if (matches[leftId]) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getRightDotColor = (rightId) => {
    const isConnected = Object.values(matches).includes(rightId);
    const isSelected =
      selectedLeft !== null && matches[selectedLeft] === rightId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const isWrongMatch = (leftId) => {
    if (!showResults || !matches[leftId]) return false;
    return matches[leftId] !== EXERCISE_DATA.correctMatches[leftId];
  };
  const getKeyboardElement = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `left-button-${id}` : `right-button-${id}`],
    [],
  );
  const getKeyboardAnchor = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `left-dot-${id}` : `right-dot-${id}`],
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
      <div
        className="div-forall"
        style={{
        
          gap: "18px",
          
        }}
      >
        <ExerciseHeader sectionLetter="D" title="Read and match." subTitle="Read each weather statement to the correct clothing advice first, then connect it to the matching picture or answer one pair at a time." />

        <div ref={containerRef} style={styles.matchArea}>
          <svg
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
                strokeWidth="3"
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

          <div style={styles.rowsWrap}>
            {EXERCISE_DATA.left.map((leftItem, index) => {
              const rightItem = EXERCISE_DATA.right[index];
              const wrong = isWrongMatch(leftItem.id);
              const isSelected = selectedLeft === leftItem.id;

              return (
                <div key={leftItem.id} style={styles.row}>
                  <div style={styles.leftSide}>
                    <div style={styles.leftNumber}>{leftItem.id}</div>

                    <img
                      src={leftItem.img}
                      alt={`${leftItem.text} weather scene`}
                      style={styles.leftImage}
                    />

                    <div style={styles.bubbleLeftWrap}>
                      <div
                        ref={(el) => (elementRefs.current[`left-button-${leftItem.id}`] = el)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Play and select ${leftItem.text}`}
                        draggable={!showAns && !lockedIds.includes(leftItem.id)}
                        onDragStart={() => handleLeftClick(leftItem.id)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => selectedRight !== null && assignMatch(leftItem.id, selectedRight)}
                        onClick={() => {
                          playAudio(`left-${leftItem.id}`, LEFT_AUDIO[leftItem.id]);
                          handleLeftClick(leftItem.id);
                        }}
                        onKeyDown={(event) => {
                          if (!keyboardMatch.origin && (event.key === "Enter" || event.key === " ")) playAudio(`left-${leftItem.id}`, LEFT_AUDIO[leftItem.id]);
                          keyboardMatch.handleKeyDown(event, "left", leftItem.id);
                        }}
                        onFocus={() => keyboardMatch.handleFocus("left", leftItem.id)}
                        style={{
                          ...styles.bubble,
                          ...styles.leftBubble,
                          border: isSelected
                            ? `1px solid ${ACTIVE_COLOR}`
                            : wrong
                            ? "1px solid red"
                            : "1px solid #222",
                          background: isSelected
                            ? "rgba(243,155,66,0.08)"
                            : "#fff",
                          cursor: showAns || lockedIds.includes(leftItem.id) ? "default" : "pointer",
                        }}
                      >
                        <TailLeft />
                        <span style={styles.text}><Unit4PlayingAudioIcon active={activeAudioKey === `left-${leftItem.id}`} />{leftItem.text}</span>

                        {wrong && (
                          <div
                            style={{
                              ...styles.wrongBadge,
                              right: "-8px",
                              top: "-8px",
                            }}
                          >
                            ✕
                          </div>
                        )}
                      </div>
                    </div> 
                    <div style={styles.centerDotWrap}>
                    <div
                      ref={(el) =>
                        (elementRefs.current[`left-dot-${leftItem.id}`] = el)
                      }
                      onClick={() => handleLeftClick(leftItem.id)}
                      style={{
                        ...styles.dot,
                        backgroundColor: getLeftDotColor(leftItem.id),
                        cursor: showAns ||showResults? "default" : "pointer",
                      }}
                    />
                  </div>
                  </div>

                 

                  <div style={styles.bubbleRightWrap}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "clamp(8px, 2vw, 18px)",
                        width: "100%",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div
                        ref={(el) =>
                          (elementRefs.current[`right-dot-${rightItem.id}`] = el)
                        }
                        onClick={() => handleRightClick(rightItem.id)}
                        tabIndex={-1}
                        aria-hidden="true"
                        onDragOver={(event) => event.preventDefault()}
                        draggable={!showAns && !isRightLocked(rightItem.id)}
                        onDragStart={() => handleRightClick(rightItem.id)}
                        onDrop={() => selectedLeft !== null && assignMatch(selectedLeft, rightItem.id)}
                        style={{
                          ...styles.dot,
                          backgroundColor: getRightDotColor(rightItem.id),
                          cursor:
                            showAns || selectedLeft === null ||showResults
                              ? "default"
                              : "pointer",
                        }}
                      />

                      <div
                        ref={(el) => (elementRefs.current[`right-button-${rightItem.id}`] = el)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Play ${rightItem.before} ${rightItem.after}`}
                        onClick={() => {
                          playAudio(`right-${rightItem.id}`, RIGHT_AUDIO[rightItem.id]);
                          handleRightClick(rightItem.id);
                        }}
                        onKeyDown={(event) => {
                          if (!keyboardMatch.origin && (event.key === "Enter" || event.key === " ")) playAudio(`right-${rightItem.id}`, RIGHT_AUDIO[rightItem.id]);
                          keyboardMatch.handleKeyDown(event, "right", rightItem.id);
                        }}
                        onFocus={() => keyboardMatch.handleFocus("right", rightItem.id)}
                        style={{
                          ...styles.bubble,
                          ...styles.rightBubble,
                          border:
                            selectedLeft !== null &&
                            matches[selectedLeft] === rightItem.id
                              ? `1px solid ${ACTIVE_COLOR}`
                              : Object.values(matches).includes(rightItem.id)
                              ? "1px solid #222"
                              : "1px solid #222",
                          background:
                            selectedLeft !== null &&
                            matches[selectedLeft] === rightItem.id
                              ? "rgba(243,155,66,0.08)"
                              : "#fff",
                          cursor:
                            showAns
                              ? "default"
                              : "pointer",
                        }}
                      >
                        <div style={styles.rightItemWrap}>
                          <span style={styles.text}><Unit4PlayingAudioIcon active={activeAudioKey === `right-${rightItem.id}`} />{rightItem.before}</span>
                          <img
                            src={rightItem.img}
                            alt={`${rightItem.before} ${rightItem.after} clothing advice`}
                            style={styles.rightImage}
                          />
                          <span style={styles.text}>{rightItem.after}</span>
                        </div>
                        <TailRight />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.buttonsWrap}>
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

export default WB_ReadAndMatch_Page22;
