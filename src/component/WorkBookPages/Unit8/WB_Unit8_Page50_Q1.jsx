import { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

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
  },
  {
    id: 2,
    prefix: "bus",
    suffix: "",
    correctChunk: "es",
    fullWord: "buses",
    correctImage: 1,
  },
  {
    id: 3,
    prefix: "",
    suffix: "esent",
    correctChunk: "pr",
    fullWord: "present",
    correctImage: 6,
  },
  {
    id: 4,
    prefix: "box",
    suffix: "",
    correctChunk: "es",
    fullWord: "boxes",
    correctImage: 3,
  },
  {
    id: 5,
    prefix: "",
    suffix: "ize",
    correctChunk: "pr",
    fullWord: "prize",
    correctImage: 4,
  },
  {
    id: 6,
    prefix: "sandwich",
    suffix: "",
    correctChunk: "es",
    fullWord: "sandwiches",
    correctImage: 5,
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

const DropZone = ({
  item,
  chunkAnswers,
  setChunkAnswers,
  showAns,
  showResults,
}) => {
  const options =
    item.correctChunk === "gr"
      ? ["", "gr", "pr", "es"]
      : item.correctChunk === "pr"
        ? ["", "pr", "gr", "es"]
        : ["", "es", "gr", "pr"];

  return (
    <select
      disabled={showAns||showResults}
      value={chunkAnswers[item.id]?.chunk || ""}
      onChange={(e) => {
        const selectedValue = e.target.value;

        setChunkAnswers((prev) => ({
          ...prev,
          [item.id]: {
            chunk: selectedValue,
            chunkId: selectedValue,
          },
        }));
      }}
      style={{
        minWidth: "88px",
        minHeight: "38px",
        borderBottom:
          showResults &&
          !showAns &&
          chunkAnswers[item.id]?.chunk &&
          chunkAnswers[item.id]?.chunk !== item.correctChunk
            ? `2px solid ${WRONG_COLOR}`
            : "1px solid #333",
        // borderRadius: "8px",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "700",
        background: "#fff",
        outline: "none",
        cursor: showAns ||showResults? "default" : "pointer",
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
  const [usedChunkIds, setUsedChunkIds] = useState({});
  const [draggedChunk, setDraggedChunk] = useState(null);

  const [touchChunk, setTouchChunk] = useState(null);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);
  const [activeChunk, setActiveChunk] = useState(null);
  const containerRef = useRef(null);
  const elementRefs = useRef({});

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
  const handleLeftClick = (id) => {
    if (showAns || showResults) return;
    setSelectedLeft(id);
    setShowResults(false);
  };
  const handleRightClick = (rightId) => {
    if (showAns || selectedLeft === null || showResults) return;
    const newMatches = { ...matches };
    Object.keys(newMatches).forEach((k) => {
      if (newMatches[k] === rightId) delete newMatches[k];
    });
    newMatches[selectedLeft] = rightId;
    setMatches(newMatches);
    setSelectedLeft(null);
    setShowResults(false);
  };

  // ── Check / Show / Reset ──
  const getItemResult = (item) =>
    chunkAnswers[item.id]?.chunk === item.correctChunk &&
    matches[item.id] === item.correctImage;

  const checkAnswers = () => {
    if (showAns || showResults) return;
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
    setShowResults(true);
    if (score === WORDS.length)
      ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
  };

  const handleShowAnswer = () => {
    const correctChunks = {};
    const correctUsed = {};
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
        correctUsed[CHUNKS[idx].id] = true;
        usedIndexes.add(idx);
      }
      correctMatches[item.id] = item.correctImage;
    });
    setChunkAnswers(correctChunks);
    setUsedChunkIds(correctUsed);
    setMatches(correctMatches);
    setShowAns(true);
    setShowResults(true);
    setSelectedLeft(null);
  };

  const handleStartAgain = () => {
    setChunkAnswers({});
    setUsedChunkIds({});
    setDraggedChunk(null);
    setTouchChunk(null);
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  // ── Helpers ──
  const isWrongItem = (item) => showResults && !showAns && !getItemResult(item);

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return ACTIVE_COLOR;
    const connected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);
    return connected ? ACTIVE_COLOR : DOT_COLOR;
  };

  const getLeftRowStyle = (itemId) => {
    const isActive = selectedLeft === itemId;
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

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Look, write, and match.
        </h1>

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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flex: 1,
                    minHeight: "38px",
                  }}
                  onClick={() => handleLeftClick(item.id)}
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
  setChunkAnswers={setChunkAnswers}
  showAns={showAns}
  showResults={showResults}
/>

                        {showResults &&
                          !showAns &&
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
  setChunkAnswers={setChunkAnswers}
  showAns={showAns}
  showResults={showResults}
/>

                        {showResults &&
                          !showAns &&
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
                </div>

                {/* Left dot */}
                <div
                  ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                  onClick={() => handleLeftClick(item.id)}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getDotColor("left", item.id),
                    cursor: showAns||showResults ? "default" : "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    boxShadow:
                      selectedLeft === item.id
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
                  onClick={() => handleRightClick(item.id)}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getDotColor("right", item.id),
                    cursor:
                      showAns || selectedLeft === null||showResults ? "default" : "pointer",
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
