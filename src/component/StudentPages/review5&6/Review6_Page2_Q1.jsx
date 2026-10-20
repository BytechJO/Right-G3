import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Button from "../../Button";
import useWorkbookMatchingKeyboard from "../../WorkBookPages/Unit4/useWorkbookMatchingKeyboard";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 55/Ex D 7.svg";

const ITEMS = [
  { scrambled: "onpy", correct: "pony" },
  { scrambled: "dyla", correct: "lady" },
  { scrambled: "nenpy", correct: "penny" },
  { scrambled: "wentty", correct: "twenty" },
  { scrambled: "icyt", correct: "city" },
  { scrambled: "ejlly", correct: "jelly" },
  { scrambled: "pyppu", correct: "puppy" },
];
const PICTURES = [
  { src: img1, alt: "The number twenty" },
  { src: img2, alt: "A pony" },
  { src: img3, alt: "A city" },
  { src: img4, alt: "A puppy" },
  { src: img5, alt: "A jar of jelly" },
  { src: img6, alt: "A penny coin" },
  { src: img7, alt: "A lady" },
];
const CORRECT_MATCHES = { 0: 1, 1: 6, 2: 2, 3: 0, 4: 4, 5: 5, 6: 3 };
const IDS = ITEMS.map((_, index) => index);
const ORANGE = "#f39b42";

export default function Review6_Page2_Q1() {
  const letters = useMemo(
    () =>
      ITEMS.map((item, row) =>
        item.scrambled
          .split("")
          .map((char, index) => ({ char, id: `${row}-${index}` })),
      ),
    [],
  );
  const [answers, setAnswers] = useState(
    ITEMS.map((item) => Array(item.correct.length).fill(null)),
  );
  const [matches, setMatches] = useState({});
  const [selected, setSelected] = useState(null);
  const [lockedWords, setLockedWords] = useState([]);
  const [lockedMatches, setLockedMatches] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  const [wrongMatches, setWrongMatches] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lines, setLines] = useState([]);
  const boardRef = useRef(null);
  const refs = useRef({});

  const isLeftLocked = useCallback(
    (id) => lockedMatches.includes(id),
    [lockedMatches],
  );
  const isRightLocked = useCallback(
    (id) =>
      Object.keys(matches).some(
        (key) => matches[key] === id && lockedMatches.includes(Number(key)),
      ),
    [lockedMatches, matches],
  );

  const placeLetter = (row, letter) => {
    if (lockedWords.includes(row) || showAnswer) return;
    setAnswers((previous) => {
      const updated = previous.map((entry) => [...entry]);
      const oldIndex = updated[row].findIndex(
        (entry) => entry?.id === letter.id,
      );
      if (oldIndex >= 0) updated[row][oldIndex] = null;
      const empty = updated[row].findIndex((entry) => !entry);
      if (empty >= 0) updated[row][empty] = letter;
      return updated;
    });
    setWrongWords((previous) => previous.filter((id) => id !== row));
  };
  const removeLetter = (row, slot) => {
    if (lockedWords.includes(row) || showAnswer) return;
    setAnswers((previous) =>
      previous.map((entry, index) =>
        index === row
          ? entry.map((letter, letterIndex) =>
              letterIndex === slot ? null : letter,
            )
          : entry,
      ),
    );
    setWrongWords((previous) => previous.filter((id) => id !== row));
    const removed = answers[row][slot];
    if (removed)
      window.requestAnimationFrame(() =>
        refs.current[`letter-${removed.id}`]?.focus(),
      );
  };

  const commit = (leftId, rightId) => {
    if (showAnswer || isLeftLocked(leftId) || isRightLocked(rightId)) return;
    setMatches((previous) => {
      const updated = { ...previous };
      Object.keys(updated).forEach((key) => {
        if (updated[key] === rightId && !lockedMatches.includes(Number(key)))
          delete updated[key];
      });
      updated[leftId] = rightId;
      return updated;
    });
    setWrongMatches((previous) => previous.filter((id) => id !== leftId));
    setSelected(null);
  };
  const choose = (side, id) => {
    if (showAnswer || (side === "left" ? isLeftLocked(id) : isRightLocked(id)))
      return;
    if (!selected || selected.side === side) {
      setSelected({ side, id });
      return;
    }
    commit(
      side === "left" ? id : selected.id,
      side === "right" ? id : selected.id,
    );
  };

  const getElement = useCallback(
    (side, id) => refs.current[`${side}-button-${id}`],
    [],
  );
  const getAnchor = useCallback(
    (side, id) => refs.current[`${side}-dot-${id}`],
    [],
  );
  const keyboard = useWorkbookMatchingKeyboard({
    boardRef,
    leftIds: IDS,
    rightIds: IDS,
    getElement,
    getAnchorElement: getAnchor,
    isLeftLocked,
    isRightLocked,
    onCommit: commit,
    onStart: (side, id) => setSelected({ side, id }),
    onCancel: () => setSelected(null),
  });

  useLayoutEffect(() => {
    const update = () => {
      if (!boardRef.current) return;
      const board = boardRef.current.getBoundingClientRect();
      setLines(
        Object.entries(matches).flatMap(([leftId, rightId]) => {
          const from = getAnchor("left", Number(leftId));
          const to = getAnchor("right", rightId);
          if (!from || !to) return [];
          const a = from.getBoundingClientRect();
          const b = to.getBoundingClientRect();
          return [
            {
              id: `${leftId}-${rightId}`,
              x1: a.left + a.width / 2 - board.left,
              y1: a.top + a.height / 2 - board.top,
              x2: b.left + b.width / 2 - board.left,
              y2: b.top + b.height / 2 - board.top,
            },
          ];
        }),
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getAnchor, matches, answers]);

  const check = () => {
    if (
      showAnswer ||
      (lockedWords.length === ITEMS.length &&
        lockedMatches.length === ITEMS.length)
    )
      return;
    if (answers.some((row) => row.some((letter) => !letter))) {
      ValidationAlert.info("Please complete all words.");
      return;
    }
    if (Object.keys(matches).length !== ITEMS.length) {
      ValidationAlert.info("Please match all items.");
      return;
    }
    keyboard.clear();
    setSelected(null);
    const correctWords = ITEMS.flatMap((item, index) =>
      answers[index].map((letter) => letter.char).join("") === item.correct
        ? [index]
        : [],
    );
    const correctMatches = ITEMS.flatMap((_, index) =>
      matches[index] === CORRECT_MATCHES[index] ? [index] : [],
    );
    setLockedWords(correctWords);
    setLockedMatches(correctMatches);
    setWrongWords(IDS.filter((id) => !correctWords.includes(id)));
    setWrongMatches(IDS.filter((id) => !correctMatches.includes(id)));
    const score = correctWords.length + correctMatches.length;
    const total = ITEMS.length * 2;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: 0 / ${total}`);
  };
  const reveal = () => {
    setAnswers(
      ITEMS.map((item, row) =>
        item.correct
          .split("")
          .map((char, index) => ({ char, id: `${row}-answer-${index}` })),
      ),
    );
    setMatches(CORRECT_MATCHES);
    setLockedWords(IDS);
    setLockedMatches(IDS);
    setWrongWords([]);
    setWrongMatches([]);
    setShowAnswer(true);
    setSelected(null);
    keyboard.clear();
  };
  const reset = () => {
    setAnswers(ITEMS.map((item) => Array(item.correct.length).fill(null)));
    setMatches({});
    setLockedWords([]);
    setLockedMatches([]);
    setWrongWords([]);
    setWrongMatches([]);
    setShowAnswer(false);
    setSelected(null);
    keyboard.clear();
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ touchAction: "manipulation" }}>
        <ExerciseHeaderReview
          sectionLetter="D"
          title="Unscramble the letters to make words with the end sound you hear in. Then match each word to its picture."
          subTitle="Say the complete answer first, then arrange the word tiles in sentence order and add punctuation."
        />
        <div ref={boardRef} className="relative mb-10 w-full">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {lines.map((line) => (
              <line
                key={line.id}
                {...line}
                stroke={ORANGE}
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}
            {keyboard.preview && (
              <line
                {...keyboard.preview}
                stroke={ORANGE}
                strokeWidth="3"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            )}
          </svg>
          <div
            className="relative z-10 grid items-center gap-x-20 gap-y-4"
            style={{ gridTemplateColumns: "minmax(0, 1fr) 180px" }}
          >
            {ITEMS.map((item, row) => {
              const picture = PICTURES[row];
              const leftHeld = selected?.side === "left" && selected.id === row;
              const rightHeld =
                selected?.side === "right" && selected.id === row;
              return (
                <React.Fragment key={item.scrambled}>
                  <div className="flex min-h-20 items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <div
                        ref={(el) => {
                          refs.current[`left-button-${row}`] = el;
                        }}
                        role="button"
                        tabIndex={isLeftLocked(row) ? -1 : 0}
                        aria-disabled={isLeftLocked(row) || showAnswer}
                        draggable={!isLeftLocked(row) && !showAnswer}
                        onDragStart={() => choose("left", row)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() =>
                          selected?.side === "right" && commit(row, selected.id)
                        }
                        onClick={() => choose("left", row)}
                        onKeyDown={(event) =>
                          keyboard.handleKeyDown(event, "left", row)
                        }
                        onFocus={() => keyboard.handleFocus("left", row)}
                        className="unit4-interactive flex items-center gap-2 rounded-lg px-2"
                        style={{
                          border: leftHeld
                            ? `2px solid ${ORANGE}`
                            : "2px solid transparent",
                          background: leftHeld
                            ? "rgba(243,155,66,.1)"
                            : "transparent",
                        }}
                      >
                        <b className="w-5">{row + 1}</b>
                        <span>{item.scrambled}</span>
                      </div>
                      <div className="flex gap-1 ml-7">
                        {letters[row].map((letter) => {
                          const used = answers[row].some(
                            (entry) => entry?.id === letter.id,
                          );
                          return (
                            <button
                              type="button"
                              key={letter.id}
                              ref={(el) => {
                                refs.current[`letter-${letter.id}`] = el;
                              }}
                              onClick={() => placeLetter(row, letter)}
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
                                  placeLetter(row, letter);
                                }
                              }}
                              disabled={lockedWords.includes(row) || showAnswer}
                              aria-disabled={used}
                              className="unit4-interactive w-8 h-8 text-sm flex items-center justify-center rounded border border-[#F79530] font-bold"
                              style={{
                                opacity: used ? 0.4 : 1,
                                cursor: used ? "default" : "pointer",
                              }}
                            >
                              {letter.char}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-1 ml-7 relative w-[300px]">
                        {answers[row].map((letter, slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => removeLetter(row, slot)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                removeLetter(row, slot);
                              }
                            }}
                            tabIndex={
                              letter && !lockedWords.includes(row) ? 0 : -1
                            }
                            className="unit4-interactive w-8 h-8 border-b flex items-center justify-center font-bold"
                            style={{
                              borderColor: wrongWords.includes(row)
                                ? "red"
                                : "black",
                            }}
                          >
                            {letter?.char}
                          </button>
                        ))}
                        <span
                          ref={(el) => {
                            refs.current[`left-dot-${row}`] = el;
                          }}
                          onClick={() => choose("left", row)}
                          className="absolute right-0 rounded-full"
                          style={{
                            width: 14,
                            height: 14,
                            background:
                              leftHeld || matches[row] !== undefined
                                ? ORANGE
                                : "#9ca3af",
                            cursor: "pointer",
                          }}
                        />
                        {wrongWords.includes(row) && (
                          <span
                            style={{
                              position: "absolute",
                              top: "0px",
                              right: "70px",
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
                            }}
                          >
                            ✕
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 relative h-20">
                    <span
                      ref={(el) => {
                        refs.current[`right-dot-${row}`] = el;
                      }}
                      onClick={() => choose("right", row)}
                      className="rounded-full shrink-0"
                      style={{
                        width: 14,
                        height: 14,
                        background:
                          rightHeld || Object.values(matches).includes(row)
                            ? ORANGE
                            : "#9ca3af",
                        cursor: "pointer",
                      }}
                    />
                    <div
                      ref={(el) => {
                        refs.current[`right-button-${row}`] = el;
                      }}
                      role="button"
                      tabIndex={isRightLocked(row) ? -1 : 0}
                      aria-disabled={isRightLocked(row) || showAnswer}
                      draggable={!isRightLocked(row) && !showAnswer}
                      onDragStart={() => choose("right", row)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() =>
                        selected?.side === "left" && commit(selected.id, row)
                      }
                      onClick={() => choose("right", row)}
                      onKeyDown={(event) =>
                        keyboard.handleKeyDown(event, "right", row)
                      }
                      onFocus={() => keyboard.handleFocus("right", row)}
                      className="unit4-interactive rounded-lg p-1"
                      style={{
                        border: rightHeld
                          ? `2px solid ${ORANGE}`
                          : "2px solid transparent",
                        background: rightHeld
                          ? "rgba(243,155,66,.1)"
                          : "transparent",
                      }}
                    >
                      <img
                        src={picture.src}
                        alt={picture.alt}
                        style={{
                          width: "clamp(60px,8vw,100px)",
                          height: "clamp(60px,8vw,100px)",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    {wrongMatches.includes(
                      Object.keys(matches).find((key) => matches[key] === row) *
                        1,
                    ) && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
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
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <Button
          handleShowAnswer={reveal}
          handleStartAgain={reset}
          checkAnswers={check}
        />
      </div>
    </div>
  );
}
