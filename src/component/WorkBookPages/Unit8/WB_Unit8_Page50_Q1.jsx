import { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 50/SVG/6.svg";

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

const WB_Unit8_Page48_QA = () => {
  const [chunkAnswers, setChunkAnswers] = useState({});
  const [usedChunkIds, setUsedChunkIds] = useState({});
  const [draggedChunk, setDraggedChunk] = useState(null);

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

  const handleDragStart = (chunk) => {
    if (showAns) return;
    if (usedChunkIds[chunk.id]) return;
    setDraggedChunk(chunk);
  };

  const handleDropChunk = (wordId) => {
    if (showAns || !draggedChunk) return;

    const oldChunkId = chunkAnswers[wordId]?.chunkId;

    setChunkAnswers((prev) => ({
      ...prev,
      [wordId]: {
        chunk: draggedChunk.value,
        chunkId: draggedChunk.id,
      },
    }));

    setUsedChunkIds((prev) => {
      const updated = { ...prev, [draggedChunk.id]: true };
      if (oldChunkId) delete updated[oldChunkId];
      return updated;
    });

    setDraggedChunk(null);
    setShowResults(false);
  };

  const handleLeftClick = (id) => {
    if (showAns) return;
    setSelectedLeft(id);
    setShowResults(false);
  };

  const handleRightClick = (rightId) => {
    if (showAns) return;
    if (selectedLeft === null) return;

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

  const getItemResult = (item) => {
    const chunkCorrect = chunkAnswers[item.id]?.chunk === item.correctChunk;
    const matchCorrect = matches[item.id] === item.correctImage;
    return chunkCorrect && matchCorrect;
  };

  const isWrongItem = (item) => {
    if (!showResults) return false;
    return !getItemResult(item);
  };

  const checkAnswers = () => {
    if (showAns) return;

    const allChunksDone = WORDS.every((item) => chunkAnswers[item.id]?.chunk);
    const allMatchesDone = WORDS.every((item) => matches[item.id]);

    if (!allChunksDone || !allMatchesDone) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    WORDS.forEach((item) => {
      if (getItemResult(item)) score++;
    });

    setShowResults(true);

    if (score === WORDS.length) {
      ValidationAlert.success(`Score: ${score} / ${WORDS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${WORDS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${WORDS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctChunks = {};
    const correctUsed = {};
    const correctMatches = {};
    const usedIndexes = new Set();

    WORDS.forEach((item) => {
      const foundIndex = CHUNKS.findIndex(
        (chunk, idx) =>
          chunk.value === item.correctChunk && !usedIndexes.has(idx)
      );

      if (foundIndex !== -1) {
        correctChunks[item.id] = {
          chunk: CHUNKS[foundIndex].value,
          chunkId: CHUNKS[foundIndex].id,
        };
        correctUsed[CHUNKS[foundIndex].id] = true;
        usedIndexes.add(foundIndex);
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
    setSelectedLeft(null);
    setMatches({});
    setShowResults(false);
    setShowAns(false);
    setLines([]);
  };

  const getDotColor = (side, id) => {
    if (side === "left" && selectedLeft === id) return "#3b82f6";

    const isConnected =
      side === "left" ? !!matches[id] : Object.values(matches).includes(id);

    return isConnected ? "#3b82f6" : "#9ca3af";
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
      border: isActive ? "2px solid #3b82f6" : "2px solid transparent",
      backgroundColor: isActive ? "rgba(59,130,246,0.08)" : "transparent",
      boxShadow: isActive ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
      transition: "all 0.2s ease",
    };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Look, write, and match.
        </h1>

        {/* chunk bank */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {CHUNKS.map((chunk) => {
            const disabled = !!usedChunkIds[chunk.id];

            return (
              <div
                key={chunk.id}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(chunk)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "700",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                  minWidth: "52px",
                  textAlign: "center",
                }}
              >
                {chunk.value}
              </div>
            );
          })}
        </div>

        {/* matching area */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "90px",
            padding: "10px 20px",
            minHeight: "560px",
          }}
        >
          {/* left side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              width: "390px",
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
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDropChunk(item.id)}
                        style={{
                          minWidth: "88px",
                          minHeight: "34px",
                          borderBottom: "2px solid #444",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: chunkAnswers[item.id]?.chunk ? "#dc2626" : "#9ca3af",
                          fontSize: "22px",
                          lineHeight: "1",
                          padding: "0 4px",
                        }}
                      >
                        {chunkAnswers[item.id]?.chunk || ""}
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDropChunk(item.id)}
                        style={{
                          minWidth: "88px",
                          minHeight: "34px",
                          borderBottom: "2px solid #444",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: chunkAnswers[item.id]?.chunk ? "#dc2626" : "#9ca3af",
                          fontSize: "22px",
                          lineHeight: "1",
                          padding: "0 4px",
                        }}
                      >
                        {chunkAnswers[item.id]?.chunk || ""}
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

                <div
                  ref={(el) => (elementRefs.current[`left-${item.id}`] = el)}
                  onClick={() => handleLeftClick(item.id)}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: getDotColor("left", item.id),
                    cursor: showAns ? "default" : "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                    boxShadow:
                      selectedLeft === item.id
                        ? "0 0 0 4px rgba(59,130,246,0.18)"
                        : "none",
                  }}
                />

                {isWrongItem(item) && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-34px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* right side */}
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
                    cursor: showAns ? "default" : "pointer",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                />

                <div
                  style={{
                    width: "120px",
                    height: "56px",
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
                      maxHeight: "52px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* lines */}
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
                stroke="#dc2626"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

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