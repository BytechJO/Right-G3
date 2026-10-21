import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import useWorkbookMatchingKeyboard from "../../WorkBookPages/Unit4/useWorkbookMatchingKeyboard";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 7.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 8.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 9.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 71/Ex D 10.svg";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const IMAGES = [
  { id: 0, img: img1, alt: "A cap" },
  { id: 1, img: img2, alt: "A table" },
  { id: 2, img: img3, alt: "A rat" },
  { id: 3, img: img4, alt: "An ant" },
];
const LETTERS = [
  { id: 0, text: "r" },
  { id: 1, text: "a" },
  { id: 2, text: "c" },
  { id: 3, text: "t" },
];
const CORRECT = { 0: 2, 1: 3, 2: 0, 3: 1 };

export default function Review7_Page2_Q3() {
  const [matches, setMatches] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [lockedImageIds, setLockedImageIds] = useState([]);
  const [wrongImageIds, setWrongImageIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [lines, setLines] = useState([]);
  const boardRef = useRef(null);
  const endpointRefs = useRef({});
  const anchorRefs = useRef({});
  const lockedLetterIds = Object.entries(matches).flatMap(
    ([imageId, letterId]) =>
      lockedImageIds.includes(Number(imageId)) ? [Number(letterId)] : [],
  );

  const commit = useCallback(
    (imageId, letterId) => {
      imageId = Number(imageId);
      letterId = Number(letterId);
      if (
        showAns ||
        lockedImageIds.includes(imageId) ||
        lockedLetterIds.includes(letterId)
      )
        return;
      setMatches((previous) => {
        const updated = { ...previous };
        delete updated[imageId];
        Object.keys(updated).forEach((key) => {
          if (
            Number(updated[key]) === letterId &&
            !lockedImageIds.includes(Number(key))
          )
            delete updated[key];
        });
        updated[imageId] = letterId;
        return updated;
      });
      setWrongImageIds((previous) => previous.filter((id) => id !== imageId));
      setSelectedImage(null);
      setSelectedLetter(null);
    },
    [lockedImageIds, lockedLetterIds, showAns],
  );

  const getEndpoint = useCallback(
    (side, id) => endpointRefs.current[`${side}-${id}`],
    [],
  );
  const getAnchor = useCallback(
    (side, id) => anchorRefs.current[`${side}-${id}`],
    [],
  );
  const keyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: IMAGES.map((item) => item.id),
    rightIds: LETTERS.map((item) => item.id),
    getElement: getEndpoint,
    getAnchorElement: getAnchor,
    isLeftLocked: (id) => lockedImageIds.includes(Number(id)),
    isRightLocked: (id) => lockedLetterIds.includes(Number(id)),
    onCommit: commit,
  });

  const clickImage = (id) => {
    if (showAns || lockedImageIds.includes(id)) return;
    if (selectedLetter !== null) commit(id, selectedLetter);
    else setSelectedImage(id);
  };
  const clickLetter = (id) => {
    if (showAns || lockedLetterIds.includes(id)) return;
    if (selectedImage !== null) commit(selectedImage, id);
    else setSelectedLetter(id);
  };

  const updateLines = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const boardRect = board.getBoundingClientRect();
    setLines(
      Object.entries(matches).flatMap(([imageId, letterId]) => {
        const from = getAnchor("left", imageId);
        const to = getAnchor("right", letterId);
        if (!from || !to) return [];
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        return [
          {
            id: `${imageId}-${letterId}`,
            imageId: Number(imageId),
            x1: a.left + a.width / 2 - boardRect.left,
            y1: a.top + a.height / 2 - boardRect.top,
            x2: b.left + b.width / 2 - boardRect.left,
            y2: b.top + b.height / 2 - boardRect.top,
          },
        ];
      }),
    );
  }, [getAnchor, matches]);
  useLayoutEffect(() => {
    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [updateLines]);

  const check = () => {
    if (showAns || lockedImageIds.length === IMAGES.length) return;
    if (Object.keys(matches).length !== IMAGES.length) {
      ValidationAlert.info("Please match all.");
      return;
    }
    const correctIds = IMAGES.flatMap((image) =>
      Number(matches[image.id]) === CORRECT[image.id] ? [image.id] : [],
    );
    const wrongIds = IMAGES.flatMap((image) =>
      Number(matches[image.id]) !== CORRECT[image.id] ? [image.id] : [],
    );
    setLockedImageIds(correctIds);
    setWrongImageIds(wrongIds);
    setSelectedImage(null);
    setSelectedLetter(null);
    keyboard.clear();
    if (correctIds.length === IMAGES.length)
      ValidationAlert.success(`Score: ${correctIds.length} / ${IMAGES.length}`);
    else if (correctIds.length)
      ValidationAlert.warning(`Score: ${correctIds.length} / ${IMAGES.length}`);
    else ValidationAlert.error(`Score: 0 / ${IMAGES.length}`);
  };
  const show = () => {
    setMatches(CORRECT);
    setLockedImageIds(IMAGES.map((item) => item.id));
    setWrongImageIds([]);
    setShowAns(true);
    setSelectedImage(null);
    setSelectedLetter(null);
    keyboard.clear();
  };
  const reset = () => {
    setMatches({});
    setLockedImageIds([]);
    setWrongImageIds([]);
    setShowAns(false);
    setSelectedImage(null);
    setSelectedLetter(null);
    keyboard.clear();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 30,
      }}
    >
      <div className="div-forall" style={{ gap: 60 }}>
        <ExerciseHeaderReview
          sectionLetter="E"
          title="Look and match."
          subTitle="Start with one word or picture, then connect it to the partner that means the same thing."
        />
        <div
          ref={boardRef}
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 100,
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
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={
                  lockedImageIds.includes(line.imageId)
                    ? "#22c55e"
                    : wrongImageIds.includes(line.imageId)
                      ? "#ef4444"
                      : "#f97316"
                }
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
            {keyboard.preview && (
              <line
                {...keyboard.preview}
                stroke="#f97316"
                strokeWidth="3"
                strokeDasharray="8 7"
                strokeLinecap="round"
                className="unit4-keyboard-preview"
              />
            )}
          </svg>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 40,
              zIndex: 2,
            }}
          >
            {IMAGES.map((item) => {
              const selected =
                selectedImage === item.id ||
                (keyboard.origin?.side === "left" &&
                  keyboard.origin.id === item.id);
              const locked = lockedImageIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <button
                    type="button"
                    ref={(element) => {
                      endpointRefs.current[`left-${item.id}`] = element;
                    }}
                    tabIndex={locked ? -1 : 0}
                    aria-disabled={locked}
                    aria-label={`Match ${item.alt}`}
                    onClick={() => clickImage(item.id)}
                    onKeyDown={(event) =>
                      keyboard.handleKeyDown(event, "left", item.id)
                    }
                    onFocus={() => keyboard.handleFocus("left", item.id)}
                    className="unit4-interactive"
                    style={{
                      border: selected
                        ? "1px solid #f97316"
                        : "1px solid transparent",
                      borderRadius: 12,
                      padding: 4,
                      background: selected ? "#ffedd5" : "transparent",
                    }}
                  >
                    <strong>{item.id + 1}</strong>
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{ width: 85, height: 85, objectFit: "contain" }}
                    />
                  </button>
                  <button
                    type="button"
                    ref={(element) => {
                      anchorRefs.current[`left-${item.id}`] = element;
                    }}
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={() => clickImage(item.id)}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: 0,
                      background: selected ? "#f97316" : "#fb923c",
                      transform: selected ? "scale(1.4)" : "scale(1)",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 40,
              zIndex: 2,
            }}
          >
            {LETTERS.map((item) => {
              const selected =
                selectedLetter === item.id ||
                (keyboard.origin?.side === "right" &&
                  keyboard.origin.id === item.id);
              const locked = lockedLetterIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <button
                    type="button"
                    ref={(element) => {
                      anchorRefs.current[`right-${item.id}`] = element;
                    }}
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={() => clickLetter(item.id)}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      border: 0,
                      background: selected ? "#f97316" : "#fb923c",
                    }}
                  />
                  <button
                    type="button"
                    ref={(element) => {
                      endpointRefs.current[`right-${item.id}`] = element;
                    }}
                    tabIndex={locked ? -1 : 0}
                    aria-disabled={locked}
                    aria-label={`Match letter ${item.text}`}
                    onClick={() => clickLetter(item.id)}
                    onKeyDown={(event) =>
                      keyboard.handleKeyDown(event, "right", item.id)
                    }
                    onFocus={() => keyboard.handleFocus("right", item.id)}
                    className="unit4-interactive"
                    style={{
                      position: "relative",
                      padding: "8px 16px",
                      borderRadius: 16,
                      fontSize: 22,
                      border: selected
                        ? "1px solid #f97316"
                        : "1px solid transparent",
                      background: selected ? "#fed7aa" : "#ffedd5",
                    }}
                  >
                    {item.text}
                    {Object.entries(matches).some(
                      ([imageId, letterId]) =>
                        Number(letterId) === item.id &&
                        wrongImageIds.includes(Number(imageId)),
                    ) && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          transform: "translateY(-50%)",
                          width: "24px",
                          height: "24px",
                          background: "red",
                          color: "white",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                          zIndex: 3,
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={reset}>
            Start Again ↻
          </button>
          <button className="show-answer-btn" onClick={show}>
            Show Answer
          </button>
          <button className="check-button2" onClick={check}>
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
}
