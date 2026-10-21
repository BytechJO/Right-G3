import { useCallback, useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useWorkbookMatchingKeyboard from "../Unit4/useWorkbookMatchingKeyboard";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit8/Page 50 - Exercise A/Item_001_and_mother.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit8/Page 50 - Exercise A/Item_002_bus.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit8/Page 50 - Exercise A/Item_003_esent.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit8/Page 50 - Exercise A/Item_004_box.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit8/Page 50 - Exercise A/Item_005_ize.mp3";
import audio6 from "../../../assets/audio/WorkBook/unit8/Page 50 - Exercise A/Item_006_sandwich.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/6-1.svg";
// استبدلي فقط imports تبعون dnd والـ chunk bank + drop zones
// والباقي خلييه نفسه

const DOT_COLOR = "#9ca3af";
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "red";
const LINE_COLOR = "#f39b42";
const CHUNK_COLOR = "#ffca94";

const WORDS = [
  {
    id: 1,
    prefix: "",
    suffix: "andmother",
    correctChunk: "gr",
    fullWord: "grandmother",
    correctImage: 2,
    audio: audio1,
  },
  {
    id: 2,
    prefix: "bus",
    suffix: "",
    correctChunk: "es",
    fullWord: "buses",
    correctImage: 1,
    audio: audio2,
  },
  {
    id: 3,
    prefix: "",
    suffix: "esent",
    correctChunk: "pr",
    fullWord: "present",
    correctImage: 6,
    audio: audio3,
  },
  {
    id: 4,
    prefix: "box",
    suffix: "",
    correctChunk: "es",
    fullWord: "boxes",
    correctImage: 3,
    audio: audio4,
  },
  {
    id: 5,
    prefix: "",
    suffix: "ize",
    correctChunk: "pr",
    fullWord: "prize",
    correctImage: 4,
    audio: audio5,
  },
  {
    id: 6,
    prefix: "sandwich",
    suffix: "",
    correctChunk: "es",
    fullWord: "sandwiches",
    correctImage: 5,
    audio: audio6,
  },
];

const IMAGES = [
  { id: 1, img: img1, alt: "buses" },
  { id: 2, img: img2, alt: "grandmother" },
  { id: 3, img: img3, alt: "boxes" },
  { id: 4, img: img4, alt: "prize" },
  { id: 5, img: img5, alt: "sandwiches" },
  { id: 6, img: img6, alt: "present" },
];
const LEFT_IDS = WORDS.map((item) => item.id);
const RIGHT_IDS = IMAGES.map((item) => item.id);

const CHUNKS = [
  { id: "es-1", value: "es" },
  { id: "gr-1", value: "gr" },
  { id: "pr-2", value: "pr" },
  { id: "pr-1", value: "pr" },
  { id: "es-2", value: "es" },
  { id: "es-3", value: "es" },
];

const ROW_HEIGHT = 72;
// ضيفي هاد فوق return الرئيسي

const DropZone = ({ item, chunkAnswers, onChange, locked, wrong }) => {
  const options =
    item.correctChunk === "gr"
      ? ["", "gr", "pr", "es"]
      : item.correctChunk === "pr"
        ? ["", "pr", "gr", "es"]
        : ["", "es", "gr", "pr"];

  return (
    <select
      disabled={locked}
      value={chunkAnswers[item.id]?.chunk || ""}
      onChange={(e) => onChange(item.id, e.target.value)}
      style={{
        minWidth: "88px",
        minHeight: "38px",
        borderBottom: wrong ? `2px solid ${WRONG_COLOR}` : "1px solid #333",
        // borderRadius: "8px",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "700",
        background: "#fff",
        // outline: "none",
        cursor: locked ? "default" : "pointer",
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option || "  "}
        </option>
      ))}
    </select>
  );
};
const WB_Unit8_Page48_QA = () => {
  const [chunkAnswers, setChunkAnswers] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matches, setMatches] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [lockedChunkIds, setLockedChunkIds] = useState([]);
  const [lockedMatchIds, setLockedMatchIds] = useState([]);
  const [wrongChunkIds, setWrongChunkIds] = useState([]);
  const [wrongMatchIds, setWrongMatchIds] = useState([]);
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const elementRefs = useRef({});
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  useLayoutEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const newLines = Object.entries(matches)
        .map(([leftId, rightId]) => {
          const le = elementRefs.current[`left-${leftId}`];
          const re = elementRefs.current[`right-${rightId}`];
          if (!le || !re) return null;
          const lr = le.getBoundingClientRect();
          const rr = re.getBoundingClientRect();
          return {
            id: `${leftId}-${rightId}`,
            x1: lr.right - cr.left,
            y1: lr.top + lr.height / 2 - cr.top,
            x2: rr.left - cr.left,
            y2: rr.top + rr.height / 2 - cr.top,
          };
        })
        .filter(Boolean);
      setLines(newLines);
    };
    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [matches]);

  // ── Matching ──
  const commitMatch = (leftId, rightId) => {
    if (showAns || lockedMatchIds.includes(leftId)) return;
    const occupyingLeft = Number(
      Object.keys(matches).find((key) => matches[key] === rightId),
    );
    if (occupyingLeft && lockedMatchIds.includes(occupyingLeft)) return;
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach((k) => {
      if (newMatches[k] === rightId) delete newMatches[k];
    });
    newMatches[leftId] = rightId;
    setMatches(newMatches);
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongMatchIds((previous) =>
      previous.filter((id) => id !== leftId && id !== occupyingLeft),
    );
  };
  const handleLeftClick = (id) => {
    if (showAns || lockedMatchIds.includes(id)) return;
    if (selectedRight !== null) commitMatch(id, selectedRight);
    else {
      setSelectedLeft(id);
      setSelectedRight(null);
    }
  };
  const handleRightClick = (rightId) => {
    if (
      showAns ||
      Object.entries(matches).some(
        ([leftId, imageId]) =>
          Number(imageId) === rightId &&
          lockedMatchIds.includes(Number(leftId)),
      )
    )
      return;
    if (selectedLeft !== null) commitMatch(selectedLeft, rightId);
    else {
      setSelectedRight(rightId);
      setSelectedLeft(null);
    }
  };

  const handleChunkChange = (itemId, value) => {
    if (showAns || lockedChunkIds.includes(itemId)) return;
    setChunkAnswers((previous) => ({
      ...previous,
      [itemId]: { chunk: value, chunkId: value },
    }));
    setWrongChunkIds((previous) => previous.filter((id) => id !== itemId));
  };

  // ── Check / Show / Reset ──
  const getItemResult = (item) =>
    chunkAnswers[item.id]?.chunk === item.correctChunk &&
    matches[item.id] === item.correctImage;

  const checkAnswers = () => {
    if (
      showAns ||
      (lockedChunkIds.length === WORDS.length &&
        lockedMatchIds.length === WORDS.length)
    )
      return;
    if (
      !WORDS.every((i) => chunkAnswers[i.id]?.chunk) ||
      !WORDS.every((i) => matches[i.id])
    ) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    WORDS.forEach((i) => {
      if (getItemResult(i)) score++;
    });
    setLockedChunkIds(
      WORDS.flatMap((item) =>
        chunkAnswers[item.id]?.chunk === item.correctChunk ? [item.id] : [],
      ),
    );
    setLockedMatchIds(
      WORDS.flatMap((item) =>
        matches[item.id] === item.correctImage ? [item.id] : [],
      ),
    );
    setWrongChunkIds(
      WORDS.flatMap((item) =>
        chunkAnswers[item.id]?.chunk !== item.correctChunk ? [item.id] : [],
      ),
    );
    setWrongMatchIds(
      WORDS.flatMap((item) =>
        matches[item.id] !== item.correctImage ? [item.id] : [],
      ),
    );
    if (score === WORDS.length)
      ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const correctChunks = {};
    const correctMatches = {};
    const usedIndexes = new Set();
    WORDS.forEach((item) => {
      const idx = CHUNKS.findIndex(
        (c, i) => c.value === item.correctChunk && !usedIndexes.has(i),
      );
      if (idx !== -1) {
        correctChunks[item.id] = {
          chunk: CHUNKS[idx].value,
          chunkId: CHUNKS[idx].id,
        };
        usedIndexes.add(idx);
      }
      correctMatches[item.id] = item.correctImage;
    });
    setChunkAnswers(correctChunks);
    setMatches(correctMatches);
    setShowAns(true);
    setLockedChunkIds(WORDS.map((item) => item.id));
    setLockedMatchIds(WORDS.map((item) => item.id));
    setWrongChunkIds([]);
    setWrongMatchIds([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    keyboard.clear();
    stopAudio();
  };

  const handleStartAgain = () => {
    setChunkAnswers({});
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatches({});
    setShowAns(false);
    setLockedChunkIds([]);
    setLockedMatchIds([]);
    setWrongChunkIds([]);
    setWrongMatchIds([]);
    setLines([]);
    keyboard.clear();
    stopAudio();
  };

  // ── Helpers ──
  const isWrongItem = (item) =>
    wrongChunkIds.includes(item.id) || wrongMatchIds.includes(item.id);

  const getDotColor = (side, id) => {
    if (
      (side === "left" && selectedLeft === id) ||
      (side === "right" && selectedRight === id)
    )
      return ACTIVE_COLOR;
    const connected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);
    return connected ? ACTIVE_COLOR : DOT_COLOR;
  };

  const getLeftRowStyle = (itemId) => {
    const isActive =
      selectedLeft === itemId ||
      (keyboard.origin?.side === "left" && keyboard.origin.id === itemId);
    return {
      position: "relative",
      height: `${ROW_HEIGHT}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "0 10px 0 8px",
      borderRadius: "14px",
      border: isActive ? `2px solid ${ACTIVE_COLOR}` : "2px solid transparent",
      backgroundColor: isActive ? "rgba(243,155,66,0.08)" : "transparent",
      boxShadow: isActive ? "0 0 0 3px rgba(243,155,66,0.12)" : "none",
      transition: "all 0.2s ease",
    };
  };

  const getEndpoint = useCallback(
    (side, id) => elementRefs.current[`${side}-${id}`],
    [],
  );
  const isLeftLocked = useCallback(
    (id) => showAns || lockedMatchIds.includes(id),
    [lockedMatchIds, showAns],
  );
  const isRightLocked = useCallback(
    (id) =>
      showAns ||
      Object.entries(matches).some(
        ([leftId, imageId]) =>
          Number(imageId) === id && lockedMatchIds.includes(Number(leftId)),
      ),
    [lockedMatchIds, matches, showAns],
  );

  const keyboard = useWorkbookMatchingKeyboard({
    boardRef: containerRef,
    leftIds: LEFT_IDS,
    rightIds: RIGHT_IDS,
    getElement: getEndpoint,
    isLeftLocked,
    isRightLocked,
    onCommit: commitMatch,
    onStart: (side, id) => {
      if (side === "left") {
        setSelectedLeft(id);
        setSelectedRight(null);
      } else {
        setSelectedRight(id);
        setSelectedLeft(null);
      }
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
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        <ExerciseHeader
          sectionLetter="A"
          title="Look, write, and match."
          subTitle="Complete the missing blend letters and the matching picture first, then make the matching connection and reread the full result."
        />

        {/* // استبدلي chunk bank كامل بهاد */}

        {/* باقي المحتوى */}

        {/* ── Matching area ── */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "90px",
            width: "100%",
            padding: "10px 20px",
          }}
        >
          {/* Left side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              // width: "390px",
            }}
          >
            {WORDS.map((item) => (
              <div key={item.id} style={getLeftRowStyle(item.id)}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${item.fullWord}`}
                  className="unit4-audio-control unit4-interactive"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                    minHeight: "38px",
                  }}
                  onClick={() => {
                    playAudio(`word-${item.id}`, item.audio);
                    handleLeftClick(item.id);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`word-${item.id}`, item.audio);
                    }
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#222",
                      minWidth: "18px",
                    }}
                  >
                    {item.id}
                  </span>

                  {item.prefix ? (
                    <>
                      <span
                        style={{
                          fontSize: "22px",
                          color: "#222",
                          lineHeight: "1",
                        }}
                      >
                        {item.prefix}
                      </span>
                      <div
                        style={{ position: "relative", display: "inline-flex" }}
                      >
                        <DropZone
                          item={item}
                          chunkAnswers={chunkAnswers}
                          onChange={handleChunkChange}
                          locked={showAns || lockedChunkIds.includes(item.id)}
                          wrong={wrongChunkIds.includes(item.id)}
                        />

                        {wrongChunkIds.includes(item.id) &&
                          chunkAnswers[item.id]?.chunk &&
                          chunkAnswers[item.id]?.chunk !==
                            item.correctChunk && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-10px",
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
                                pointerEvents: "none",
                                zIndex: 5,
                              }}
                            >
                              ✕
                            </div>
                          )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{ position: "relative", display: "inline-flex" }}
                      >
                        <DropZone
                          item={item}
                          chunkAnswers={chunkAnswers}
                          onChange={handleChunkChange}
                          locked={showAns || lockedChunkIds.includes(item.id)}
                          wrong={wrongChunkIds.includes(item.id)}
                        />

                        {wrongChunkIds.includes(item.id) &&
                          chunkAnswers[item.id]?.chunk &&
                          chunkAnswers[item.id]?.chunk !==
                            item.correctChunk && (
                            <div
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-10px",
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
                                pointerEvents: "none",
                                zIndex: 5,
                              }}
                            >
                              ✕
                            </div>
                          )}
                      </div>
                      <span
                        style={{
                          fontSize: "22px",
                          color: "#222",
                          lineHeight: "1",
                        }}
                      >
                        {item.suffix}
                      </span>
                    </>
                  )}
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `word-${item.id}`}
                  />
                </div>

                {/* Left dot */}
                <div
                  ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                  role="button"
                  tabIndex={
                    showAns || lockedMatchIds.includes(item.id) ? -1 : 0
                  }
                  aria-disabled={showAns || lockedMatchIds.includes(item.id)}
                  aria-label={`Match ${item.fullWord}`}
                  onClick={() => handleLeftClick(item.id)}
                  onKeyDown={(event) =>
                    keyboard.handleKeyDown(event, "left", item.id)
                  }
                  onFocus={() => keyboard.handleFocus("left", item.id)}
                  className="unit4-interactive"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getDotColor("left", item.id),
                    cursor:
                      showAns || lockedMatchIds.includes(item.id)
                        ? "default"
                        : "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    boxShadow:
                      selectedLeft === item.id ||
                      (keyboard.origin?.side === "left" &&
                        keyboard.origin.id === item.id)
                        ? "0 0 0 4px rgba(243,155,66,0.25)"
                        : "none",
                  }}
                />

                {isWrongItem(item) && (
                  <div
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "50%",
                      transform: "translateY(-50%)",
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
                      zIndex: "9999",
                      pointerEvents: "none",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              width: "250px",
            }}
          >
            {IMAGES.map((item) => (
              <div
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                style={{
                  height: `${ROW_HEIGHT}px`,
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  ref={(el) => (elementRefs.current[`right-${item.id}`] = el)}
                  role="button"
                  tabIndex={
                    showAns ||
                    Object.entries(matches).some(
                      ([leftId, imageId]) =>
                        Number(imageId) === item.id &&
                        lockedMatchIds.includes(Number(leftId)),
                    )
                      ? -1
                      : 0
                  }
                  aria-disabled={
                    showAns ||
                    Object.entries(matches).some(
                      ([leftId, imageId]) =>
                        Number(imageId) === item.id &&
                        lockedMatchIds.includes(Number(leftId)),
                    )
                  }
                  aria-label={`Match picture of ${item.alt}`}
                  onClick={() => handleRightClick(item.id)}
                  onKeyDown={(event) =>
                    keyboard.handleKeyDown(event, "right", item.id)
                  }
                  onFocus={() => keyboard.handleFocus("right", item.id)}
                  className="unit4-interactive"
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getDotColor("right", item.id),
                    cursor: showAns ? "default" : "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                />
                <div
                  style={{
                    width: "120px",
                    height: "70px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{
                      maxWidth: "110px",
                      maxHeight: "68px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* SVG lines */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
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
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        {/* Buttons */}
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

export default WB_Unit8_Page48_QA;
