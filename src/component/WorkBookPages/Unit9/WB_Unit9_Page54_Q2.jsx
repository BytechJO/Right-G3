import { useCallback, useState, useRef, useLayoutEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Button from "../Button";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import char1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/5.svg";
import char2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/6.svg";
import char3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/7.svg";
import char4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/8.svg";

import place1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/9.svg";
import place2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/10.svg";
import place3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/11.svg";
import place4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/12.svg";

import stellaAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise H/Item_001_Stella_is_at_the_store.mp3";
import childrenAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise H/Item_002_Sarah_and_John_are_at_the_playground.mp3";
import momAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise H/Item_003_Mom_is_in_the_kitchen.mp3";
import dadAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise H/Item_004_Dad_is_at_the_office.mp3";

const ACTIVE_COLOR = "#f39b42";
const ACTIVE_BG = "rgba(243,155,66,0.08)";
const DOT_COLOR = "#f39b42";

const exerciseData = {
  left: [
    {
      id: 1,
      text: "Stella is at the store.",
      img: char1,
      audio: stellaAudio,
      alt: "Stella",
    },
    {
      id: 2,
      text: "Sarah and John are at the playground.",
      img: char2,
      audio: childrenAudio,
      alt: "Sarah and John",
    },
    {
      id: 3,
      text: "Mom is in the kitchen.",
      img: char3,
      audio: momAudio,
      alt: "Mom",
    },
    {
      id: 4,
      text: "Dad is at the office.",
      img: char4,
      audio: dadAudio,
      alt: "Dad",
    },
  ],
  right: [
    { id: 1, img: place1, alt: "An office" },
    { id: 2, img: place2, alt: "A kitchen" },
    { id: 3, img: place3, alt: "A store" },
    { id: 4, img: place4, alt: "A playground" },
  ],
  correctMatches: {
    1: 3,
    2: 4,
    3: 2,
    4: 1,
  },
};

const WB_Unit8_Page54_QH = () => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [lines, setLines] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);

  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const containerRef = useRef(null);
  const elementRefs = useRef({});

  // Keep line anchors attached to the dots.
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

    return () => {
      window.removeEventListener("resize", updateLines);
    };
  }, [matches]);

  const commitMatch = (leftId, rightId) => {
    if (showAns || lockedIds.includes(leftId)) return;

    const occupyingLeft = Number(
      Object.keys(matches).find((key) => matches[key] === rightId),
    );

    if (occupyingLeft && lockedIds.includes(occupyingLeft)) {
      return;
    }

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

    setWrongIds((prev) =>
      prev.filter((id) => id !== leftId && id !== occupyingLeft),
    );
  };

  const handleLeftClick = (id) => {
    if (showAns || lockedIds.includes(id)) return;

    if (selectedRight !== null) {
      commitMatch(id, selectedRight);
    } else {
      setSelectedLeft(id);
      setSelectedRight(null);
    }
  };

  const isRightLocked = useCallback(
    (rightId) =>
      showAns ||
      Object.entries(matches).some(
        ([leftId, value]) =>
          Number(value) === rightId && lockedIds.includes(Number(leftId)),
      ),
    [lockedIds, matches, showAns],
  );

  const handleRightClick = (id) => {
    if (isRightLocked(id)) return;

    if (selectedLeft !== null) {
      commitMatch(selectedLeft, id);
    } else {
      setSelectedRight(id);
      setSelectedLeft(null);
    }
  };

  const isWrongMatch = (leftId) => {
    return wrongIds.includes(leftId);
  };

  const checkAnswers = () => {
    if (showAns || lockedIds.length === exerciseData.left.length) return;

    const totalQuestions = exerciseData.left.length;

    const allConnected = exerciseData.left.every((item) => matches[item.id]);

    if (!allConnected) {
      ValidationAlert.info("Please connect all items first.");
      return;
    }

    setShowResults(true);

    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...exerciseData.left
          .filter(
            (item) => matches[item.id] === exerciseData.correctMatches[item.id],
          )
          .map((item) => item.id),
      ]),
    ]);

    setWrongIds(
      exerciseData.left
        .filter(
          (item) => matches[item.id] !== exerciseData.correctMatches[item.id],
        )
        .map((item) => item.id),
    );

    let currentScore = 0;

    Object.keys(exerciseData.correctMatches).forEach((leftId) => {
      if (matches[leftId] === exerciseData.correctMatches[leftId]) {
        currentScore++;
      }
    });

    if (currentScore === totalQuestions) {
      ValidationAlert.success(`Score: ${currentScore} / ${totalQuestions}`);
    } else if (currentScore > 0) {
      ValidationAlert.warning(`Score: ${currentScore} / ${totalQuestions}`);
    } else {
      ValidationAlert.error(`Score: ${currentScore} / ${totalQuestions}`);
    }
  };

  const handleShowAnswer = () => {
    setMatches({ ...exerciseData.correctMatches });
    setShowResults(true);
    setSelectedLeft(null);
    setSelectedRight(null);
    setShowAns(true);
    setLockedIds(exerciseData.left.map((item) => item.id));
    setWrongIds([]);

    keyboard.clear();
    stopAudio();
  };

  const handleStartAgain = () => {
    setMatches({});
    setSelectedLeft(null);
    setSelectedRight(null);
    setShowResults(false);
    setLines([]);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);

    keyboard.clear();
    stopAudio();
  };

  const isLeftSelected = (id) => selectedLeft === id;
  const isRightSelected = (id) => selectedRight === id;

  // Focus the entire row, not each child.
  const getEndpoint = useCallback(
    (side, id) =>
      elementRefs.current[`${side}-group-${id}`] ||
      elementRefs.current[`${side}-${id}`],
    [],
  );

  // Preview lines must still originate from the dots.
  const getAnchorElement = useCallback(
    (side, id) => elementRefs.current[`${side}-${id}`],
    [],
  );

  const keyboard = useWorkbookMatchingKeyboard({
    boardRef: containerRef,
    leftIds: exerciseData.left.map((item) => item.id),
    rightIds: exerciseData.right.map((item) => item.id),

    getElement: getEndpoint,
    getAnchorElement,

    isLeftLocked: (id) => showAns || lockedIds.includes(id),

    isRightLocked,

    onCommit: commitMatch,

    onStart: (side, id) => {
      setSelectedLeft(side === "left" ? id : null);
      setSelectedRight(side === "right" ? id : null);
    },

    onCancel: () => {
      setSelectedLeft(null);
      setSelectedRight(null);
    },
  });

  // Mouse click: select the whole group.
  const activateGroup = (side, id) => {
    if (side === "left") {
      if (showAns || lockedIds.includes(id)) return;

      const item = exerciseData.left.find((entry) => entry.id === id);

      if (!item) return;

      playAudio(`sentence-${id}`, item.audio);
      handleLeftClick(id);
    } else {
      if (isRightLocked(id)) return;

      handleRightClick(id);
    }
  };

  // Keyboard: keep matching hook behavior.
  const handleGroupKeyDown = (event, side, id) => {
    if (event.key !== "Enter" && event.key !== " ") {
      keyboard.handleKeyDown(event, side, id);
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (side === "left" && (showAns || lockedIds.includes(id))) {
      return;
    }

    if (side === "right" && isRightLocked(id)) {
      return;
    }

    keyboard.handleKeyDown(event, side, id);

    if (side === "left") {
      const item = exerciseData.left.find((entry) => entry.id === id);

      if (item?.audio) {
        playAudio(`sentence-${id}`, item.audio);
      }
    }
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="H"
          title="Read, look, and match."
          subTitle="Read each person sentence to the correct place picture first, then connect it to the matching picture or answer one pair at a time."
        />

        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "380px 80px 220px",
            gap: "26px",
            alignItems: "start",
          }}
        >
          {/* LEFT GROUPS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {exerciseData.left.map((item) => {
              const selected = isLeftSelected(item.id);
              const locked = showAns || lockedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    elementRefs.current[`left-group-${item.id}`] = el;
                  }}
                  role="button"
                  tabIndex={locked ? -1 : 0}
                  aria-disabled={locked}
                  aria-label={`Match: ${item.text}`}
                  className="unit4-interactive"
                  onClick={() => activateGroup("left", item.id)}
                  onKeyDown={(event) =>
                    handleGroupKeyDown(event, "left", item.id)
                  }
                  onFocus={() => keyboard.handleFocus("left", item.id)}
                  style={{
                    position: "relative",
                    minHeight: "112px",
                    display: "grid",
                    gridTemplateColumns: "1fr 70px 18px",
                    gap: "12px",
                    alignItems: "center",
                    cursor: locked ? "default" : "pointer",
                  }}
                >
                  {/* Sentence */}
                  <div
                    className="unit4-audio-control"
                    style={{
                      position: "relative",
                      border: selected
                        ? `1px solid ${ACTIVE_COLOR}`
                        : "1px solid transparent",
                      background: selected ? ACTIVE_BG : "transparent",
                      borderRadius: "14px",
                      padding: "10px 12px",
                      transition: "all 0.2s ease",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#111",
                          minWidth: "16px",
                          lineHeight: "1.3",
                        }}
                      >
                        {item.id}
                      </span>

                      <span
                        style={{
                          fontSize: "18px",
                          lineHeight: "1.3",
                          color: "#222",
                          userSelect: "none",
                        }}
                      >
                        {item.text}
                      </span>

                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `sentence-${item.id}`}
                      />
                    </div>
                  </div>

                  {/* Character image */}
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      border: selected
                        ? `1px solid ${ACTIVE_COLOR}`
                        : "1px solid transparent",
                      borderRadius: "14px",
                      overflow: "hidden",
                      boxSizing: "border-box",
                      boxShadow: selected
                        ? "0 0 0 4px rgba(10,10,10,0.12)"
                        : "none",
                      background: selected ? ACTIVE_BG : "transparent",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    />
                  </div>

                  {/* Left dot */}
                  <div
                    ref={(el) => {
                      elementRefs.current[`left-${item.id}`] = el;
                    }}
                    aria-hidden="true"
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: DOT_COLOR,
                      transition: "all 0.2s ease",
                      transform: selected ? "scale(1.18)" : "scale(1)",
                      boxShadow: selected
                        ? "0 0 0 4px rgba(243,155,66,0.25)"
                        : "none",
                    }}
                  />

                  {/* Wrong badge */}
                  {isWrongMatch(item.id) && (
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        right: "15px",
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
                        zIndex: 3,
                      }}
                    >
                      ✕
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Middle spacer */}
          <div />

          {/* RIGHT GROUPS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {exerciseData.right.map((item) => {
              const selected = isRightSelected(item.id);
              const locked = isRightLocked(item.id);

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    elementRefs.current[`right-group-${item.id}`] = el;
                  }}
                  role="button"
                  tabIndex={locked ? -1 : 0}
                  aria-disabled={locked}
                  aria-label={`Match: ${item.alt}`}
                  className="unit4-interactive"
                  onClick={() => activateGroup("right", item.id)}
                  onKeyDown={(event) =>
                    handleGroupKeyDown(event, "right", item.id)
                  }
                  onFocus={() => keyboard.handleFocus("right", item.id)}
                  style={{
                    minHeight: "112px",
                    display: "grid",
                    gridTemplateColumns: "18px 1fr",
                    gap: "12px",
                    alignItems: "center",
                    cursor: locked ? "default" : "pointer",
                  }}
                >
                  {/* Right dot */}
                  <div
                    ref={(el) => {
                      elementRefs.current[`right-${item.id}`] = el;
                    }}
                    aria-hidden="true"
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: DOT_COLOR,
                      transition: "all 0.2s ease",
                      transform: selected ? "scale(1.18)" : "scale(1)",
                      boxShadow: selected
                        ? "0 0 0 4px rgba(243,155,66,0.25)"
                        : "none",
                    }}
                  />

                  {/* Right image - selected style */}
                  <div
                    style={{
                      width: "160px",
                      height: "100px",
                      boxSizing: "border-box",
                      border: selected
                        ? `2px solid ${ACTIVE_COLOR}`
                        : "2px solid transparent",
                      borderRadius: "14px",
                      background: selected ? ACTIVE_BG : "transparent",
                      boxShadow: selected
                        ? "0 0 0 4px rgba(243,155,66,0.16)"
                        : "none",
                      transition: "all 0.2s ease",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                        pointerEvents: "none",
                        userSelect: "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* SVG CONNECTION LINES */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={ACTIVE_COLOR}
                strokeWidth="2.5"
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
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
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

export default WB_Unit8_Page54_QH;
