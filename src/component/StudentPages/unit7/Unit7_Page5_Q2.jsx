import { useCallback, useEffect, useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import useWorkbookMatchingKeyboard from "../../WorkBookPages/Unit4/useWorkbookMatchingKeyboard";
import "../unit4/unit4Interactions.css";
import "./Unit7_Page5_Q2.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A2-1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A2-2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A2-3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A2-4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A2-5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex A2-6.svg";
import exerciseAudio from "../../../assets/audio/ClassBook/Unit 7/P 62/unit7-pg62-EXA2.mp3";

const IMAGES = [
  { id: "0", image: img1, alt: "A pen" },
  { id: "1", image: img2, alt: "A mouse" },
  { id: "2", image: img3, alt: "A rabbit" },
  { id: "3", image: img4, alt: "A nurse" },
  { id: "4", image: img5, alt: "A zoo" },
  { id: "5", image: img6, alt: "An umbrella" },
];
const LETTERS = ["r", "u", "p", "z", "m", "n"].map((text, index) => ({
  id: String(index),
  text,
}));
const CORRECT = { 0: "2", 1: "4", 2: "0", 3: "5", 4: "3", 5: "1" };
const CAPTIONS = [
  { start: 0.239, end: 4, text: "Page 62, write activities." },
  { start: 4, end: 8.42, text: "Exercise A, number 2. Listen and match." },
  { start: 8.42, end: 10, text: "One, pen." },
  { start: 10, end: 12, text: "Two, mouse." },
  { start: 12, end: 14, text: "Three, rabbit." },
  { start: 14, end: 16, text: "Four, nurse." },
  { start: 16, end: 19.379, text: "Five, zoo." },
  { start: 20.559, end: 22.459, text: "Six, umbrella." },
];

const Unit7_Page5_Q2 = () => {
  const [matches, setMatches] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pointerOrigin, setPointerOrigin] = useState(null);
  const [, setLayoutTick] = useState(0);
  const boardRef = useRef(null);
  const elementRefs = useRef({ left: {}, right: {} });
  const dotRefs = useRef({ left: {}, right: {} });
  const lockedRightIds = lockedIds.map((id) => matches[id]).filter(Boolean);

  const getElement = useCallback(
    (side, id) => elementRefs.current[side][id],
    [],
  );
  const getAnchorElement = useCallback(
    (side, id) => dotRefs.current[side][id],
    [],
  );
  const commit = useCallback(
    (leftId, rightId) => {
      if (
        lockedIds.includes(leftId) ||
        lockedRightIds.includes(rightId) ||
        showAnswer
      )
        return;
      setMatches((previous) => {
        const updated = { ...previous };
        Object.keys(updated).forEach((key) => {
          if (updated[key] === rightId && !lockedIds.includes(key))
            delete updated[key];
        });
        updated[leftId] = rightId;
        return updated;
      });
      setWrongIds((previous) => previous.filter((id) => id !== leftId));
    },
    [lockedIds, lockedRightIds, showAnswer],
  );

  const keyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: IMAGES.map((item) => item.id),
    rightIds: LETTERS.map((item) => item.id),
    getElement,
    getAnchorElement,
    isLeftLocked: (id) => lockedIds.includes(id),
    isRightLocked: (id) => lockedRightIds.includes(id),
    onCommit: commit,
  });

  useEffect(() => {
    const refresh = () => setLayoutTick((value) => value + 1);
    window.addEventListener("resize", refresh);
    return () => window.removeEventListener("resize", refresh);
  }, []);

  const pointerSelect = (side, id) => {
    if (
      showAnswer ||
      (side === "left" ? lockedIds.includes(id) : lockedRightIds.includes(id))
    )
      return;
    if (!pointerOrigin || pointerOrigin.side === side) {
      setPointerOrigin({ side, id });
      return;
    }
    const leftId = side === "left" ? id : pointerOrigin.id;
    const rightId = side === "right" ? id : pointerOrigin.id;
    commit(leftId, rightId);
    setPointerOrigin(null);
  };
  const lineFor = (leftId, rightId) => {
    const board = boardRef.current;
    const left = dotRefs.current.left[leftId];
    const right = dotRefs.current.right[rightId];
    if (!board || !left || !right) return null;
    const b = board.getBoundingClientRect();
    const l = left.getBoundingClientRect();
    const r = right.getBoundingClientRect();
    return {
      x1: l.left + l.width / 2 - b.left,
      y1: l.top + l.height / 2 - b.top,
      x2: r.left + r.width / 2 - b.left,
      y2: r.top + r.height / 2 - b.top,
    };
  };
  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === IMAGES.length) return;
    if (Object.keys(matches).length !== IMAGES.length) {
      ValidationAlert.info("Please match all.");
      return;
    }
    const correctIds = IMAGES.flatMap((item) =>
      matches[item.id] === CORRECT[item.id] ? [item.id] : [],
    );
    const incorrectIds = IMAGES.flatMap((item) =>
      matches[item.id] !== CORRECT[item.id] ? [item.id] : [],
    );
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);
    setPointerOrigin(null);
    keyboard.clear();
    ValidationAlert[
      correctIds.length === IMAGES.length
        ? "success"
        : correctIds.length
          ? "warning"
          : "error"
    ](`Score: ${correctIds.length} / ${IMAGES.length}`);
  };
  const reveal = () => {
    setMatches({ ...CORRECT });
    setLockedIds(IMAGES.map((item) => item.id));
    setWrongIds([]);
    setShowAnswer(true);
    setPointerOrigin(null);
    keyboard.clear();
  };
  const reset = () => {
    setMatches({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    setPointerOrigin(null);
    keyboard.clear();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 30,
        position: "relative",
      }}
    >
      <div className="div-forall" style={{ gap: 30 }}>
        <ExerciseHeader
          sectionLetter="A"
          questionNumber="2"
          title="Listen and match."
          subTitle="Listen to one item at a time, then match it to the sound, letter, or picture you hear."
        />
        <QuestionAudioPlayer
          src={exerciseAudio}
          captions={CAPTIONS}
          pageId="unit7-page5-q2"
        />
        <div
          ref={boardRef}
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 70,
            padding: "10px 15px",
          }}
        >
          <svg
            className="lines-layer"
            width="100%"
            height="100%"
            aria-hidden="true"
          >
            {Object.entries(matches).map(([leftId, rightId]) => {
              const line = lineFor(leftId, rightId);
              if (!line) return null;
              const color = lockedIds.includes(leftId)
                ? "#22c55e"
                : wrongIds.includes(leftId)
                  ? "#ef4444"
                  : "#fb923c";
              return (
                <line
                  key={leftId}
                  {...line}
                  stroke={color}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
            {keyboard.preview && (
              <line
                {...keyboard.preview}
                stroke="#fb923c"
                strokeWidth="4"
                strokeDasharray="8 7"
                strokeLinecap="round"
                className="unit4-keyboard-preview"
              />
            )}
          </svg>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 24,
              position: "relative",
              zIndex: 2,
            }}
          >
            {IMAGES.map((item) => {
              const selected =
                (pointerOrigin?.side === "left" &&
                  pointerOrigin.id === item.id) ||
                (keyboard.origin?.side === "left" &&
                  keyboard.origin.id === item.id);
              const locked = lockedIds.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  ref={(element) => {
                    elementRefs.current.left[item.id] = element;
                  }}
                  tabIndex={locked ? -1 : 0}
                  aria-disabled={locked}
                  aria-label={`Match ${item.alt}`}
                  onClick={() => pointerSelect("left", item.id)}
                  onKeyDown={(event) =>
                    keyboard.handleKeyDown(event, "left", item.id)
                  }
                  onFocus={() => keyboard.handleFocus("left", item.id)}
                  className="unit4-interactive"
                  style={{
                    border: 0,
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    cursor: locked ? "default" : "pointer",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    style={{
                      width: "auto",
                      height: 85,
                      objectFit: "contain",
                      border: selected
                        ? "3px solid #f97316"
                        : "3px solid transparent",
                      borderRadius: 12,
                      padding: 4,
                      backgroundColor: selected ? "#ffedd5" : "transparent",
                    }}
                  />
                  <span
                    ref={(element) => {
                      dotRefs.current.left[item.id] = element;
                    }}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: selected
                        ? "#f97316"
                        : locked
                          ? "#22c55e"
                          : "#fb923c",
                      transform: selected ? "scale(1.4)" : "scale(1)",
                      boxShadow: selected
                        ? "0 0 0 4px rgba(249,115,22,.2)"
                        : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 24,
              position: "relative",
              zIndex: 2,
            }}
          >
            {LETTERS.map((item) => {
              const selected =
                (pointerOrigin?.side === "right" &&
                  pointerOrigin.id === item.id) ||
                (keyboard.origin?.side === "right" &&
                  keyboard.origin.id === item.id);
              const locked = lockedRightIds.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  ref={(element) => {
                    elementRefs.current.right[item.id] = element;
                  }}
                  tabIndex={locked ? -1 : 0}
                  aria-disabled={locked}
                  aria-label={`Match letter ${item.text}`}
                  onClick={() => pointerSelect("right", item.id)}
                  onKeyDown={(event) =>
                    keyboard.handleKeyDown(event, "right", item.id)
                  }
                  onFocus={() => keyboard.handleFocus("right", item.id)}
                  className="unit4-interactive"
                  style={{
                    border: 0,
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    cursor: locked ? "default" : "pointer",
                  }}
                >
                  <span
                    ref={(element) => {
                      dotRefs.current.right[item.id] = element;
                    }}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: selected
                        ? "#f97316"
                        : locked
                          ? "#22c55e"
                          : "#fb923c",
                      transform: selected ? "scale(1.4)" : "scale(1)",
                      boxShadow: selected
                        ? "0 0 0 4px rgba(249,115,22,.2)"
                        : "none",
                    }}
                  />
                  <span
                    className="WB-unit3-page18-q2-word"
                    style={{
                      borderColor: selected ? "#f97316" : "black",
                      background: selected ? "#ffedd5" : "white",
                    }}
                  >
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <Button
          handleShowAnswer={reveal}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit7_Page5_Q2;
