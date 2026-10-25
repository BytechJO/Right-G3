import { useCallback, useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import useWorkbookMatchingKeyboard from "./useWorkbookMatchingKeyboard";
import summerAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise B/Item_001_summer.mp3";
import winterAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise B/Item_002_winter.mp3";
import springAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise B/Item_003_spring.mp3";
import autumnAudio from "../../../assets/audio/WorkBook/unit4/Page 21 - Exercise B/Item_004_autumn.mp3";
import Button from "../Button";

import topImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 5.svg";
import topImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 6.svg";
import topImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 7.svg";
import topImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex A 8.svg";

import bottomImg1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 1.svg";
import bottomImg2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 2.svg";
import bottomImg3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 3.svg";
import bottomImg4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 21/Ex B 4.svg";

const ACTIVE_COLOR = "#f39b42";
const LINE_COLOR = "#f39b42";
const INACTIVE_COLOR = "#a3a3a3";
const WRONG_COLOR = "#ef4444";

const EXERCISE_DATA = {
  top: [
    { id: 1, img: topImg1 }, // flower
    { id: 2, img: topImg2 }, // leaf
    { id: 3, img: topImg3 }, // umbrella
    { id: 4, img: topImg4 }, // snowman
  ],
  middle: [
    { id: 1, text: "summer" },
    { id: 2, text: "winter" },
    { id: 3, text: "spring" },
    { id: 4, text: "autumn" },
  ],
  bottom: [
    { id: 1, img: bottomImg1 }, // spring scene
    { id: 2, img: bottomImg2 }, // summer scene
    { id: 3, img: bottomImg3 }, // winter scene
    { id: 4, img: bottomImg4 }, // autumn scene
  ],

  // top image -> season
  correctTopMatches: {
    1: 3, // flower -> spring
    2: 4, // leaf -> autumn
    3: 1, // umbrella -> summer
    4: 2, // snowman -> winter
  },

  // season -> bottom image
  correctBottomMatches: {
    1: 2, // summer -> summer picture
    2: 3, // winter -> winter picture
    3: 1, // spring -> spring picture
    4: 4, // autumn -> autumn picture
  },
};
const SEASON_AUDIO = { summer: summerAudio, winter: winterAudio, spring: springAudio, autumn: autumnAudio };
const TOP_IDS = EXERCISE_DATA.top.map((item) => item.id);
const MIDDLE_IDS = EXERCISE_DATA.middle.map((item) => item.id);
const BOTTOM_IDS = EXERCISE_DATA.bottom.map((item) => item.id);

const WB_UnitX_Page21_QB = () => {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedMiddleTop, setSelectedMiddleTop] = useState(null);
  const [selectedMiddle, setSelectedMiddle] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);

  const [topMatches, setTopMatches] = useState({});
  const [bottomMatches, setBottomMatches] = useState({});

  const [showResults, setShowResults] = useState(false);
  const [lockedTopIds, setLockedTopIds] = useState([]);
  const [lockedBottomIds, setLockedBottomIds] = useState([]);
  const [showAns, setShowAns] = useState(false);

  const [topLines, setTopLines] = useState([]);
  const [bottomLines, setBottomLines] = useState([]);

  const containerRef = useRef(null);
  const elementRefs = useRef({});
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();

      const newTopLines = Object.entries(topMatches)
        .map(([topId, middleId]) => {
          const topEl = elementRefs.current[`top-dot-${topId}`];
          const middleEl = elementRefs.current[`middle-top-dot-${middleId}`];

          if (!topEl || !middleEl) return null;

          const topRect = topEl.getBoundingClientRect();
          const middleRect = middleEl.getBoundingClientRect();

          return {
            id: `top-${topId}-${middleId}`,
            x1: topRect.left + topRect.width / 2 - containerRect.left,
            y1: topRect.top + topRect.height / 2 - containerRect.top,
            x2: middleRect.left + middleRect.width / 2 - containerRect.left,
            y2: middleRect.top + middleRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      const newBottomLines = Object.entries(bottomMatches)
        .map(([middleId, bottomId]) => {
          const middleEl = elementRefs.current[`middle-bottom-dot-${middleId}`];
          const bottomEl = elementRefs.current[`bottom-dot-${bottomId}`];

          if (!middleEl || !bottomEl) return null;

          const middleRect = middleEl.getBoundingClientRect();
          const bottomRect = bottomEl.getBoundingClientRect();

          return {
            id: `bottom-${middleId}-${bottomId}`,
            x1: middleRect.left + middleRect.width / 2 - containerRect.left,
            y1: middleRect.top + middleRect.height / 2 - containerRect.top,
            x2: bottomRect.left + bottomRect.width / 2 - containerRect.left,
            y2: bottomRect.top + bottomRect.height / 2 - containerRect.top,
          };
        })
        .filter(Boolean);

      setTopLines(newTopLines);
      setBottomLines(newBottomLines);
    };

    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [topMatches, bottomMatches]);

  const handleTopClick = (id) => {
    if (showAns || lockedTopIds.includes(id)) return;
    if (selectedMiddleTop !== null) {
      assignTopMatch(id, selectedMiddleTop);
      return;
    }
    setSelectedTop(id);
    setSelectedMiddleTop(null);
    setSelectedMiddle(null);
    setSelectedBottom(null);
    setShowResults(false);
  };

  const assignTopMatch = (topId, middleId) => {
    if (showAns || lockedTopIds.includes(topId)) return;
    const lockedOwner = Object.keys(topMatches).find(
      (key) => topMatches[key] === middleId && lockedTopIds.includes(Number(key)),
    );
    if (lockedOwner) return;

    const newMatches = { ...topMatches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === middleId) {
        delete newMatches[key];
      }
    });

    newMatches[topId] = middleId;

    setTopMatches(newMatches);
    setSelectedTop(null);
    setSelectedMiddleTop(null);
    setShowResults(false);
  };
  const handleMiddleTopClick = (middleId) => {
    const isLockedTarget = Object.keys(topMatches).some(
      (key) => topMatches[key] === middleId && lockedTopIds.includes(Number(key)),
    );
    if (showAns || isLockedTarget) return;
    if (selectedTop !== null) assignTopMatch(selectedTop, middleId);
    else {
      setSelectedMiddleTop(middleId);
      setSelectedMiddle(null);
      setSelectedBottom(null);
    }
  };

  const handleMiddleBottomClick = (middleId) => {
    if (showAns || lockedBottomIds.includes(middleId)) return;
    if (selectedBottom !== null) {
      assignBottomMatch(middleId, selectedBottom);
      return;
    }
    setSelectedMiddle(middleId);
    setSelectedBottom(null);
    setSelectedTop(null);
    setSelectedMiddleTop(null);
    setShowResults(false);
  };

  const assignBottomMatch = (middleId, bottomId) => {
    if (showAns || lockedBottomIds.includes(middleId)) return;
    const lockedOwner = Object.keys(bottomMatches).find(
      (key) => bottomMatches[key] === bottomId && lockedBottomIds.includes(Number(key)),
    );
    if (lockedOwner) return;

    const newMatches = { ...bottomMatches };

    Object.keys(newMatches).forEach((key) => {
      if (newMatches[key] === bottomId) {
        delete newMatches[key];
      }
    });

    newMatches[middleId] = bottomId;

    setBottomMatches(newMatches);
    setSelectedMiddle(null);
    setSelectedBottom(null);
    setShowResults(false);
  };
  const handleBottomClick = (bottomId) => {
    const isLockedTarget = Object.keys(bottomMatches).some(
      (key) => bottomMatches[key] === bottomId && lockedBottomIds.includes(Number(key)),
    );
    if (showAns || isLockedTarget) return;
    if (selectedMiddle !== null) assignBottomMatch(selectedMiddle, bottomId);
    else {
      setSelectedBottom(bottomId);
      setSelectedTop(null);
      setSelectedMiddleTop(null);
    }
  };

  const checkAnswers = () => {
    if (showAns || (lockedTopIds.length === EXERCISE_DATA.top.length && lockedBottomIds.length === EXERCISE_DATA.middle.length)) return;

    const allTopConnected = EXERCISE_DATA.top.every(
      (item) => topMatches[item.id],
    );
    const allBottomConnected = EXERCISE_DATA.middle.every(
      (item) => bottomMatches[item.id],
    );

    if (!allTopConnected || !allBottomConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }
    upperKeyboard.clear();
    lowerKeyboard.clear();
    setSelectedTop(null);
    setSelectedMiddleTop(null);
    setSelectedMiddle(null);
    setSelectedBottom(null);

    setShowResults(true);
    setLockedTopIds((prev) => [...new Set([...prev, ...EXERCISE_DATA.top.filter((item) => topMatches[item.id] === EXERCISE_DATA.correctTopMatches[item.id]).map((item) => item.id)])]);
    setLockedBottomIds((prev) => [...new Set([...prev, ...EXERCISE_DATA.middle.filter((item) => bottomMatches[item.id] === EXERCISE_DATA.correctBottomMatches[item.id]).map((item) => item.id)])]);

    let score = 0;
    const total = EXERCISE_DATA.top.length + EXERCISE_DATA.middle.length;

    Object.keys(EXERCISE_DATA.correctTopMatches).forEach((topId) => {
      if (topMatches[topId] === EXERCISE_DATA.correctTopMatches[topId]) {
        score++;
      }
    });

    Object.keys(EXERCISE_DATA.correctBottomMatches).forEach((middleId) => {
      if (
        bottomMatches[middleId] === EXERCISE_DATA.correctBottomMatches[middleId]
      ) {
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
    upperKeyboard.clear();
    lowerKeyboard.clear();
    setTopMatches(EXERCISE_DATA.correctTopMatches);
    setBottomMatches(EXERCISE_DATA.correctBottomMatches);
    setShowResults(true);
    setShowAns(true);
    setLockedTopIds(EXERCISE_DATA.top.map((item) => item.id));
    setLockedBottomIds(EXERCISE_DATA.middle.map((item) => item.id));
    setSelectedTop(null);
    setSelectedMiddleTop(null);
    setSelectedMiddle(null);
    setSelectedBottom(null);
    stopAudio();
  };

  const handleStartAgain = () => {
    upperKeyboard.clear();
    lowerKeyboard.clear();
    setTopMatches({});
    setBottomMatches({});
    setSelectedTop(null);
    setSelectedMiddleTop(null);
    setSelectedMiddle(null);
    setSelectedBottom(null);
    setShowResults(false);
    setShowAns(false);
    setLockedTopIds([]);
    setLockedBottomIds([]);
    setTopLines([]);
    setBottomLines([]);
    stopAudio();
  };

  const getTopDotColor = (topId) => {
    if (selectedTop === topId) return ACTIVE_COLOR;
    if (topMatches[topId]) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getMiddleTopDotColor = (middleId) => {
    const isConnected = Object.values(topMatches).includes(middleId);
    const isSelected =
      selectedTop !== null && topMatches[selectedTop] === middleId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getMiddleBottomDotColor = (middleId) => {
    const isConnected = !!bottomMatches[middleId];
    if (selectedMiddle === middleId) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const getBottomDotColor = (bottomId) => {
    const isConnected = Object.values(bottomMatches).includes(bottomId);
    const isSelected =
      selectedMiddle !== null && bottomMatches[selectedMiddle] === bottomId;

    if (isSelected) return ACTIVE_COLOR;
    if (isConnected) return ACTIVE_COLOR;
    return INACTIVE_COLOR;
  };

  const isWrongTopMatch = (topId) => {
    if (!showResults || !topMatches[topId]) return false;
    return topMatches[topId] !== EXERCISE_DATA.correctTopMatches[topId];
  };

  const isWrongBottomMatch = (middleId) => {
    if (!showResults || !bottomMatches[middleId]) return false;
    return (
      bottomMatches[middleId] !== EXERCISE_DATA.correctBottomMatches[middleId]
    );
  };
  const getUpperElement = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `top-button-${id}` : `middle-top-dot-${id}`],
    [],
  );
  const getUpperAnchor = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `top-dot-${id}` : `middle-top-dot-${id}`],
    [],
  );
  const getLowerElement = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `middle-bottom-dot-${id}` : `bottom-button-${id}`],
    [],
  );
  const getLowerAnchor = useCallback(
    (side, id) => elementRefs.current[side === "left" ? `middle-bottom-dot-${id}` : `bottom-dot-${id}`],
    [],
  );
  const isTopLocked = useCallback((id) => lockedTopIds.includes(id), [lockedTopIds]);
  const isMiddleTopLocked = useCallback(
    (id) => Object.keys(topMatches).some((key) => topMatches[key] === id && lockedTopIds.includes(Number(key))),
    [lockedTopIds, topMatches],
  );
  const isMiddleBottomLocked = useCallback((id) => lockedBottomIds.includes(id), [lockedBottomIds]);
  const isBottomLocked = useCallback(
    (id) => Object.keys(bottomMatches).some((key) => bottomMatches[key] === id && lockedBottomIds.includes(Number(key))),
    [bottomMatches, lockedBottomIds],
  );
  const upperKeyboard = useWorkbookMatchingKeyboard({
    boardRef: containerRef,
    leftIds: TOP_IDS,
    rightIds: MIDDLE_IDS,
    getElement: getUpperElement,
    getAnchorElement: getUpperAnchor,
    isLeftLocked: isTopLocked,
    isRightLocked: isMiddleTopLocked,
    onCommit: assignTopMatch,
    onStart: (side, id) => side === "left" ? handleTopClick(id) : handleMiddleTopClick(id),
    onCancel: () => {
      setSelectedTop(null);
      setSelectedMiddleTop(null);
    },
  });
  const lowerKeyboard = useWorkbookMatchingKeyboard({
    boardRef: containerRef,
    leftIds: MIDDLE_IDS,
    rightIds: BOTTOM_IDS,
    getElement: getLowerElement,
    getAnchorElement: getLowerAnchor,
    isLeftLocked: isMiddleBottomLocked,
    isRightLocked: isBottomLocked,
    onCommit: assignBottomMatch,
    onStart: (side, id) => side === "left" ? handleMiddleBottomClick(id) : handleBottomClick(id),
    onCancel: () => {
      setSelectedMiddle(null);
      setSelectedBottom(null);
    },
  });

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "28px",
        }}
      >
        <ExerciseHeader sectionLetter="B" title="Look, read, and match." subTitle="Read each season symbol to the matching scene first, then connect it to the matching picture or answer one pair at a time." />

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "560px",
            display: "flex",
            flexDirection: "column",
            gap: "100px",
          }}
        >
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
            {topLines.map((line) => (
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

            {bottomLines.map((line) => (
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
            {[upperKeyboard.preview, lowerKeyboard.preview].filter(Boolean).map((preview, index) => (
              <line
                key={`keyboard-preview-${index}`}
                {...preview}
                stroke={LINE_COLOR}
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Top row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "26px",
              alignItems: "start",
              zIndex: 2,
            }}
          >
            {EXERCISE_DATA.top.map((item) => {
              const wrong = isWrongTopMatch(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                  }}
                >
                  <div
                    ref={(el) => (elementRefs.current[`top-button-${item.id}`] = el)}
                    onClick={() => handleTopClick(item.id)}
                    role="button"
                    tabIndex={lockedTopIds.includes(item.id) ? -1 : 0}
                    aria-disabled={showAns || lockedTopIds.includes(item.id)}
                    aria-label={`Select season symbol ${item.id}`}
                    draggable={!showAns && !lockedTopIds.includes(item.id)}
                    onDragStart={() => handleTopClick(item.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => selectedMiddleTop !== null && assignTopMatch(item.id, selectedMiddleTop)}
                    onKeyDown={(event) => {
                      upperKeyboard.handleKeyDown(event, "left", item.id);
                    }}
                    onFocus={() => upperKeyboard.handleFocus("left", item.id)}
                    style={{
                      width: "150px",
                      height: "100px",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      cursor: showAns || lockedTopIds.includes(item.id) ? "default" : "pointer",
                      border:
                        selectedTop === item.id
                          ? `1px solid ${ACTIVE_COLOR}`
                          : topMatches[item.id]
                            ? ``
                            : "1px solid transparent",
                      borderRadius: "8px",
                      background:
                        selectedTop === item.id
                          ? "rgba(243,155,66,0.08)"
                          : "transparent",
                      transition: "0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        // width: "100%",
                        justifyContent: "flex-start",
                        paddingLeft: "6px",
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#111",
                      }}
                    >
                      {item.id}
                    </div>
                    <img
                      src={item.img}
                      alt={["Flower symbol", "Falling leaf symbol", "Beach umbrella symbol", "Snowman symbol"][item.id - 1]}
                      style={{
                        width: "auto",
                        height: "95px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>

                  <div
                    ref={(el) =>
                      (elementRefs.current[`top-dot-${item.id}`] = el)
                    }
                    onClick={() => handleTopClick(item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getTopDotColor(item.id),
                      cursor: showAns ||showResults? "default" : "pointer",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        right: "1px",
                        top: "-1px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        border: "2px solid white",
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

          {/* Middle row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "26px",
              alignItems: "center",
              zIndex: 2,
              marginTop: "8px",
            }}
          >
            {EXERCISE_DATA.middle.map((item) => {
              const wrong = isWrongBottomMatch(item.id);
              const topSelectedMatch =
                selectedTop !== null && topMatches[selectedTop] === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    ref={(el) =>
                      (elementRefs.current[`middle-top-dot-${item.id}`] = el)
                    }
                    onClick={() => handleMiddleTopClick(item.id)}
                    role="button"
                    tabIndex={isMiddleTopLocked(item.id) ? -1 : 0}
                    aria-disabled={showAns || isMiddleTopLocked(item.id)}
                    aria-label={`Connect upper symbol to ${item.text}`}
                    onKeyDown={(event) => upperKeyboard.handleKeyDown(event, "right", item.id)}
                    onFocus={() => upperKeyboard.handleFocus("right", item.id)}
                    draggable={!showAns && !isMiddleTopLocked(item.id)}
                    onDragStart={() => handleMiddleTopClick(item.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => selectedTop !== null && assignTopMatch(selectedTop, item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getMiddleTopDotColor(item.id),
                      cursor:
                        showAns || selectedTop === null ||showResults ? "default" : "pointer",
                    }}
                  />

                  <div
                    onClick={() => {
                      playAudio(`season-${item.id}`, SEASON_AUDIO[item.text.toLowerCase()]);
                      if (selectedTop !== null) {
                        handleMiddleTopClick(item.id);
                      } else {
                        handleMiddleBottomClick(item.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Play and select ${item.text}`}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio(`season-${item.id}`, SEASON_AUDIO[item.text.toLowerCase()]);
                        if (selectedTop !== null) handleMiddleTopClick(item.id);
                        else handleMiddleBottomClick(item.id);
                      }
                    }}
                    style={{
                      width: "110px",
                      height: "45px",
                      padding: "0 18px",
                      borderRadius: "16px",
                      border:
                        selectedMiddle === item.id || topSelectedMatch
                          ? `2px solid ${ACTIVE_COLOR}`
                          : bottomMatches[item.id] ||
                              Object.values(topMatches).includes(item.id)
                            ? "1px solid #f39b42"
                            : "1px solid #f39b42",
                      background:
                        selectedMiddle === item.id || topSelectedMatch
                          ? "rgba(243,155,66,0.08)"
                          : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      color: "#222",
                      lineHeight: "1",
                      cursor: showAns ? "default" : "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    <Unit4PlayingAudioIcon active={activeAudioKey === `season-${item.id}`} />{item.text}
                  </div>

                  <div
                    ref={(el) =>
                      (elementRefs.current[`middle-bottom-dot-${item.id}`] = el)
                    }
                    onClick={() => handleMiddleBottomClick(item.id)}
                    role="button"
                    tabIndex={isMiddleBottomLocked(item.id) ? -1 : 0}
                    aria-disabled={showAns || isMiddleBottomLocked(item.id)}
                    aria-label={`Connect ${item.text} to a lower scene`}
                    onKeyDown={(event) => lowerKeyboard.handleKeyDown(event, "left", item.id)}
                    onFocus={() => lowerKeyboard.handleFocus("left", item.id)}
                    draggable={!showAns && !isMiddleBottomLocked(item.id)}
                    onDragStart={() => handleMiddleBottomClick(item.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => selectedBottom !== null && assignBottomMatch(item.id, selectedBottom)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getMiddleBottomDotColor(item.id),
                      cursor: showAns ||showResults ? "default" : "pointer",
                    }}
                  />

                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        right: "20px",
                        bottom: "57px",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "red",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        border: "2px solid white",
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

          {/* Bottom row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "26px",
              alignItems: "start",
              zIndex: 2,
              marginTop: "4px",
            }}
          >
            {EXERCISE_DATA.bottom.map((item) => {
              const isSelected =
                selectedMiddle !== null &&
                bottomMatches[selectedMiddle] === item.id;
              const isConnected = Object.values(bottomMatches).includes(
                item.id,
              );

              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    ref={(el) =>
                      (elementRefs.current[`bottom-dot-${item.id}`] = el)
                    }
                    onClick={() => handleBottomClick(item.id)}
                    draggable={!showAns && !isBottomLocked(item.id)}
                    onDragStart={() => handleBottomClick(item.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => selectedMiddle !== null && assignBottomMatch(selectedMiddle, item.id)}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: getBottomDotColor(item.id),
                      cursor:
                        showAns
                          ? "default"
                          : "pointer",
                    }}
                  />

                  <div
                    ref={(el) => (elementRefs.current[`bottom-button-${item.id}`] = el)}
                    onClick={() => handleBottomClick(item.id)}
                    role="button"
                    tabIndex={isBottomLocked(item.id) ? -1 : 0}
                    aria-disabled={showAns || isBottomLocked(item.id)}
                    aria-label={`Select season scene ${item.id}`}
                    onKeyDown={(event) => lowerKeyboard.handleKeyDown(event, "right", item.id)}
                    onFocus={() => lowerKeyboard.handleFocus("right", item.id)}
                    style={{
                      width: "150px",
                      height: "100px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: isSelected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : isConnected
                          ? ""
                          : "",
                      background: isSelected ? "rgba(243,155,66,0.08)" : "#fff",
                      cursor:
                        showAns || selectedMiddle === null
                          ? "default"
                          : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={["Spring scene", "Summer scene", "Winter scene", "Autumn scene"][item.id - 1]}
                      style={{
                        width: "auto",
                        height: "100px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
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
            marginTop: "4px",
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

export default WB_UnitX_Page21_QB;
