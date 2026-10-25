/* eslint-disable react-refresh/only-export-components */
// ExerciseC.jsx

import { useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page91D = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 91 - Exercise D/${file}`,
    import.meta.url,
  ).href;
const WORD_AUDIO = Object.fromEntries(
  [
    "marks",
    "makes",
    "sandwiches",
    "plays",
    "eats",
    "girls",
    "boys",
    "bags",
    "downstairs",
  ].map((word, index) => [
    word,
    page91D(`Item_${String(index + 1).padStart(3, "0")}_${word}.mp3`),
  ]),
);
const SOUND_AUDIO = {
  s: page91D("Item_010_s.mp3"),
  z: page91D("Item_011_z.mp3"),
};
const SENTENCE_AUDIO = [
  page91D("Item_012_She_gets_full_marks.mp3"),
  page91D("Item_013_Dad_makes_us_sandwiches.mp3"),
  page91D("Item_014_Jacob_usually_plays,_then_eats_his_lunch.mp3"),
  page91D("Item_015_The_girls_and_boys_are_carrying_the_bags_downstairs.mp3"),
];

const wordBank = [
  "marks",
  "makes",
  "sandwiches",
  "plays",
  "eats",
  "girls",
  "boys",
  "bags",
  "downstairs",
];

const correctAnswers = {
  s: ["marks", "makes", "eats"],
  z: ["sandwiches", "plays", "girls", "boys", "bags", "downstairs"],
};

/* ===== كلمة قابلة للسحب ===== */
function DraggableWord({
  id,
  word,
  disabled,
  className,
  style,
  onClick,
  onKeyDown,
  register,
  tabIndex = 0,
  active,
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled,
  });

  return (
    <button
      ref={(element) => {
        setNodeRef(element);
        register?.(element);
      }}
      {...attributes}
      {...listeners}
      onClick={onClick}
      aria-disabled={disabled}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      className={className}
      style={{
        ...style,
        opacity: isDragging ? 0.3 : (style?.opacity ?? 1),
        touchAction: "none",
        cursor: disabled ? "not-allowed" : "grab",
      }}
    >
      <Unit4PlayingAudioIcon active={active} />
      {word}
    </button>
  );
}

/* ===== منطقة قابلة للإفلات ===== */
function DroppableZone({ id, children, className, register, ...props }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register?.(element);
      }}
      className={className}
      {...props}
      style={{ outline: isOver ? "2px solid #f97316" : "none" }}
    >
      {children}
    </div>
  );
}

export default function Review10_Page2_Q2() {
  const [columns, setColumns] = useState({ s: [], z: [] });
  const [showResult, setShowResult] = useState(false);
  const [lockedWords, setLockedWords] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const [keyboardWord, setKeyboardWord] = useState(null);
  const [focusedColumn, setFocusedColumn] = useState("s");
  const bankRefs = useRef({});
  const columnRefs = useRef({});
  const draggedRef = useRef(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  // pointer sensor مع مسافة تفعيل، عشان الضغطة العادية ما تتحول لسحب
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const addWordToColumn = (col, word) => {
    if (revealed || lockedWords.includes(word) || !word) return;

    setColumns((prev) => {
      const alreadyUsed = prev.s.includes(word) || prev.z.includes(word);
      if (alreadyUsed) return prev;

      return { ...prev, [col]: [...prev[col], word] };
    });
  };

  const moveWordBetweenColumns = (fromCol, toCol, word) => {
    if (revealed || lockedWords.includes(word) || !word || fromCol === toCol)
      return;

    setColumns((prev) => {
      if (prev[toCol].includes(word)) return prev;

      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((w) => w !== word),
        [toCol]: [...prev[toCol], word],
      };
    });
  };

  const returnWordToBank = (fromCol, word) => {
    if (revealed || lockedWords.includes(word) || !word) return;

    setColumns((prev) => ({
      ...prev,
      [fromCol]: prev[fromCol].filter((w) => w !== word),
    }));
  };

  /* ===== dnd-kit handlers ===== */
  const handleDragStart = (event) => {
    if (revealed) return;
    const [, word] = String(event.active.id).split(":");
    draggedRef.current = true;
    setActiveWord(word);
  };

  const handleDragEnd = (event) => {
    setActiveWord(null);
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 0);
    if (revealed) return;

    const { active, over } = event;
    if (!over) return;

    const [source, word] = String(active.id).split(":");
    const [, destination] = String(over.id).split(":");

    if (!word || !destination || source === destination) return;

    if (source === "bank") {
      addWordToColumn(destination, word);
    } else if (source === "s" || source === "z") {
      if (destination === "bank") {
        returnWordToBank(source, word);
      } else {
        moveWordBetweenColumns(source, destination, word);
      }
    }
  };

  const handleDragCancel = () => {
    setActiveWord(null);
    draggedRef.current = false;
  };

  const checkAnswers = () => {
    if (revealed || lockedWords.length === wordBank.length) return;

    const usedWordsCount = columns.s.length + columns.z.length;

    if (usedWordsCount < wordBank.length) {
      ValidationAlert.info(
        "Please place all words before checking your answers!",
      );
      return;
    }

    const results = wordBank.map((word) => {
      const inS = columns.s.includes(word);
      const inZ = columns.z.includes(word);

      if (
        (inS && correctAnswers.s.includes(word)) ||
        (inZ && correctAnswers.z.includes(word))
      ) {
        return "correct";
      }
      return "wrong";
    });

    setShowResult(true);
    setLockedWords(
      wordBank.filter(
        (word) =>
          (columns.s.includes(word) && correctAnswers.s.includes(word)) ||
          (columns.z.includes(word) && correctAnswers.z.includes(word)),
      ),
    );

    const correctCount = results.filter((r) => r === "correct").length;
    const total = wordBank.length;
    const scoreMsg = `${correctCount} / ${total}`;

    let color =
      correctCount === total ? "green" : correctCount === 0 ? "red" : "orange";

    const resultHTML = `
    <div style="font-size: 20px; text-align:center; margin-top: 8px;">
      <span style="color:${color}; font-weight:bold;">
        Score: ${scoreMsg}
      </span>
    </div>
  `;

    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const handleShowAnswer = () => {
    setColumns({ s: [...correctAnswers.s], z: [...correctAnswers.z] });
    setShowResult(true);
    setLockedWords([...wordBank]);
    setRevealed(true);
    setKeyboardWord(null);
    stopAudio();
  };

  const handleStartAgain = () => {
    setColumns({ s: [], z: [] });
    setShowResult(false);
    setLockedWords([]);
    setRevealed(false);
    setActiveWord(null);
    setKeyboardWord(null);
    stopAudio();
  };

  const getWordClass = (col, word) => {
    const base =
      "px-3 py-2 rounded-lg text-[17px] font-semibold cursor-move transition-all border-1 ";

    if (!showResult) {
      return base + "border-gray-300 hover:border-orange-500";
    }

    const isCorrect = correctAnswers[col].includes(word);
    return base + (isCorrect ? "border-blue-500" : "border-red-500");
  };

  const colClass =
    "border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[140px] transition-all bg-white";

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <div className="div-forall" style={{ gap: "20px" }}>
          <ExerciseHeaderReview
            sectionLetter="D"
            title={
              <>
                Does the underlined word have an{" "}
                <span style={{ color: "#2e3192" }}>/s/</span> or{" "}
                <span style={{ color: "#2e3192" }}>/z/</span> sound at the end?
                Write the words in the correct columns.
              </>
            }
            subTitle="Say each word's final sound, then drag it into the /s/ or /z/ column."
          />

          {/* Word Bank */}
          <DroppableZone
            id="dropzone:bank"
            className="flex flex-wrap gap-2 p-4 w-full justify-center rounded-xl min-h-20"
          >
            {wordBank.map((word) => {
              const isUsed =
                columns.s.includes(word) || columns.z.includes(word);

              return (
                <DraggableWord
                  key={word}
                  id={`bank:${word}`}
                  word={word}
                  disabled={revealed || isUsed}
                  register={(element) => {
                    bankRefs.current[word] = element;
                  }}
                  tabIndex={isUsed ? -1 : 0}
                  onClick={() =>
                    !isUsed &&
                    !draggedRef.current &&
                    playAudio(`bank-${word}`, WORD_AUDIO[word])
                  }
                  onKeyDown={(event) => {
                    if (isUsed) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`bank-${word}`, WORD_AUDIO[word]);
                      setKeyboardWord(word);
                      setFocusedColumn("s");
                      window.requestAnimationFrame(() =>
                        columnRefs.current.s?.focus(),
                      );
                    }
                  }}
                  active={activeAudioKey === `bank-${word}`}
                  className="px-4 py-2 bg-white border-1 border-gray-300 rounded-lg text-[17px] text-gray-700 transition-all unit4-interactive unit4-audio-control"
                  style={{ opacity: isUsed ? 0.4 : 1 }}
                />
              );
            })}
          </DroppableZone>

          <div className="flex flex-col gap-5">
            {/* Columns */}
            <div className="grid grid-cols-2 gap-6">
              {["s", "z"].map((col) => (
                <div key={col}>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="font-bold text-blue-800 text-lg unit4-interactive unit4-audio-control"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        playAudio(`sound-${col}`, SOUND_AUDIO[col])
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`sound-${col}`, SOUND_AUDIO[col]);
                        }
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `sound-${col}`}
                      />
                      /{col}/
                    </span>
                  </div>

                  <DroppableZone
                    id={`dropzone:${col}`}
                    className={`${colClass} ${
                      keyboardWord && focusedColumn === col
                        ? "unit4-keyboard-preview"
                        : ""
                    }`}
                    role="button"
                    tabIndex={keyboardWord ? 0 : -1}
                    onFocus={() => setFocusedColumn(col)}
                    onKeyDown={(event) => {
                      if (!keyboardWord) return;

                      if (event.key === "Tab") {
                        event.preventDefault();

                        const next = col === "s" ? "z" : "s";

                        setFocusedColumn(next);

                        columnRefs.current[next]?.focus();
                      } else if (event.key === "Escape") {
                        event.preventDefault();

                        const word = keyboardWord;

                        setKeyboardWord(null);

                        window.requestAnimationFrame(() =>
                          bankRefs.current[word]?.focus(),
                        );
                      } else if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();

                        const word = keyboardWord;

                        addWordToColumn(col, word);

                        setKeyboardWord(null);

                        window.requestAnimationFrame(() => {
                          const next = wordBank.find(
                            (candidate) =>
                              !columns.s.includes(candidate) &&
                              !columns.z.includes(candidate) &&
                              candidate !== word,
                          );

                          bankRefs.current[next]?.focus();
                        });
                      }
                    }}
                    register={(element) => {
                      columnRefs.current[col] = element;
                    }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {keyboardWord && focusedColumn === col && (
                        <div
                          className={`${getWordClass(col, keyboardWord)} unit4-keyboard-preview`}
                          style={{
                            opacity: 0.65,
                            pointerEvents: "none",
                          }}
                        >
                          {keyboardWord}
                        </div>
                      )}

                      {columns[col].map((word) => {
                        const isCorrect = correctAnswers[col].includes(word);

                        return (
                          <div key={word} style={{ position: "relative" }}>
                            <DraggableWord
                              id={`${col}:${word}`}
                              word={word}
                              disabled={revealed || lockedWords.includes(word)}
                              tabIndex={
                                revealed || lockedWords.includes(word) ? -1 : 0
                              }
                              className={getWordClass(col, word)}
                              onClick={() => {
                                if (!revealed && !lockedWords.includes(word)) {
                                  returnWordToBank(col, word);
                                }
                              }}
                              onKeyDown={(event) => {
                                if (
                                  !revealed &&
                                  !lockedWords.includes(word) &&
                                  (event.key === "Enter" || event.key === " ")
                                ) {
                                  event.preventDefault();

                                  returnWordToBank(col, word);

                                  window.requestAnimationFrame(() =>
                                    bankRefs.current[word]?.focus(),
                                  );
                                }
                              }}
                            />

                            {showResult && !isCorrect && (
                              <div
                                style={{
                                  position: "absolute",
                                  right: "-10px",
                                  top: "0%",
                                  transform: "translateY(-50%)",
                                  width: "22px",
                                  height: "22px",
                                  background: "red",
                                  color: "white",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  border: "2px solid white",
                                  boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                                  pointerEvents: "none",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "13px",
                                    lineHeight: "1",
                                    transform: "translateY(-1px)",
                                  }}
                                >
                                  ✕
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {columns[col].length === 0 &&
                      !(keyboardWord && focusedColumn === col) && (
                        <div className="text-gray-400 text-sm mt-2">
                          Drag words here
                        </div>
                      )}
                  </DroppableZone>
                </div>
              ))}
            </div>

            <div
              style={{ marginTop: "20px", fontSize: "18px", lineHeight: "2" }}
            >
              <div
                role="button"
                tabIndex={0}
                className="unit4-interactive unit4-audio-control"
                onClick={() => playAudio("sentence-0", SENTENCE_AUDIO[0])}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio("sentence-0", SENTENCE_AUDIO[0]);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === "sentence-0"}
                />
                <strong>1</strong> She gets full{" "}
                <span style={{ textDecoration: "underline" }}>marks</span>.
              </div>
              <div
                role="button"
                tabIndex={0}
                className="unit4-interactive unit4-audio-control"
                onClick={() => playAudio("sentence-1", SENTENCE_AUDIO[1])}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio("sentence-1", SENTENCE_AUDIO[1]);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === "sentence-1"}
                />
                <strong>2</strong> Dad{" "}
                <span style={{ textDecoration: "underline" }}>makes</span> us{" "}
                <span style={{ textDecoration: "underline" }}>sandwiches</span>.
              </div>
              <div
                role="button"
                tabIndex={0}
                className="unit4-interactive unit4-audio-control"
                onClick={() => playAudio("sentence-2", SENTENCE_AUDIO[2])}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio("sentence-2", SENTENCE_AUDIO[2]);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === "sentence-2"}
                />
                <strong>3</strong> Jacob usually{" "}
                <span style={{ textDecoration: "underline" }}>plays</span>, then{" "}
                <span style={{ textDecoration: "underline" }}>eats</span> his
                lunch.
              </div>
              <div
                role="button"
                tabIndex={0}
                className="unit4-interactive unit4-audio-control"
                onClick={() => playAudio("sentence-3", SENTENCE_AUDIO[3])}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio("sentence-3", SENTENCE_AUDIO[3]);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === "sentence-3"}
                />
                <strong>4</strong> The{" "}
                <span style={{ textDecoration: "underline" }}>girls</span> and{" "}
                <span style={{ textDecoration: "underline" }}>boys</span> are
                carrying the{" "}
                <span style={{ textDecoration: "underline" }}>bags</span>{" "}
                <span style={{ textDecoration: "underline" }}>downstairs</span>.
              </div>
            </div>
          </div>

          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>

      <DragOverlay>
        {activeWord ? (
          <div className="px-4 py-2 bg-white border-1 border-orange-500 rounded-lg text-[17px] text-gray-700 shadow-lg">
            {activeWord}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
