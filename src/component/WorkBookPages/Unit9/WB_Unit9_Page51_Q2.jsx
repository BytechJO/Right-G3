import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import useUnit4TabDrag from "../../StudentPages/unit4/useUnit4TabDrag";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import prompt1Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise B/Item_001_you_swimming_pool_yesterday.mp3";
import sentence1Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise B/Item_002_You_were_at_the_swimming_pool_yesterday.mp3";
import prompt2Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise B/Item_003_she_museum_4_00_p.m.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise B/Item_004_She_was_at_the_museum_at_4_00_p.m.mp3";
import prompt3Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise B/Item_005_they_restaurant_last_night.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise B/Item_006_They_were_at_the_restaurant_last_night.mp3";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ITEMS = [
  {
    id: 1,
    prompt: "you / swimming pool / yesterday",
    words: ["You", "were", "at", "the", "swimming", "pool", "yesterday."],
    promptAudio: prompt1Audio,
    sentenceAudio: sentence1Audio,
  },
  {
    id: 2,
    prompt: "she / museum / 4:00 p.m.",
    words: ["She", "was", "at", "the", "museum", "at", "4:00", "p.m."],
    promptAudio: prompt2Audio,
    sentenceAudio: sentence2Audio,
  },
  {
    id: 3,
    prompt: "they / restaurant / last night",
    words: ["They", "were", "at", "the", "restaurant", "last", "night."],
    promptAudio: prompt3Audio,
    sentenceAudio: sentence3Audio,
  },
  {
    id: 4,
    prompt: "he / library / 12:00 p.m.",
    words: ["He", "was", "at", "the", "library", "at", "12:00", "p.m."],
  },
  {
    id: 5,
    prompt: "I / school / 9:00 a.m.",
    words: ["I", "was", "at", "school", "at", "9:00", "a.m."],
  },
  {
    id: 6,
    prompt: "they / circus / last week",
    words: ["They", "were", "at", "the", "circus", "last", "week."],
  },
];

const BankWord = ({ dragId, word, disabled, register, pick }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: dragId,
    disabled,
  });
  return (
    <button
      ref={(element) => {
        setNodeRef(element);
        register(dragId, element);
      }}
      {...listeners}
      {...attributes}
      type="button"
      disabled={false}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={`${word}, press Enter or Space to pick up`}
      className="unit4-interactive"
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.stopPropagation();
          pick();
        }
      }}
      style={{
        padding: "6px 10px",
        borderRadius: "8px",
        border: "1px solid #cbd5e1",
        backgroundColor: disabled ? "#d1d5db" : "#f8fafc",
        color: disabled ? "#535353ff" : "#111827",
        opacity: disabled ? 0.6 : 1,
        fontSize: "15px",
        fontWeight: "500",
        cursor: disabled ? "not-allowed" : "grab",
        touchAction: "none",
      }}
    >
      {word}
    </button>
  );
};

const SentenceDrop = ({
  id,
  value,
  preview,
  locked,
  wrong,
  register,
  onKeyDown,
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={(element) => {
        setNodeRef(element);
        register(id, element);
      }}
      role="button"
      tabIndex={!locked && (value.length > 0 || preview) ? 0 : -1}
      aria-disabled={locked}
      onKeyDown={onKeyDown}
      className={`unit4-drop-target unit4-interactive ${preview ? "unit4-keyboard-preview" : ""}`}
      style={{
        minHeight: "52px",
        borderBottom: wrong ? "2px solid red" : "1px solid #8f8f8f",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        background: isOver ? "rgba(243,155,66,0.1)" : "transparent",
        position: "relative",
      }}
    >
      {children}
      {preview && (
        <span style={{ padding: "5px", color: "#777" }}>{preview}</span>
      )}
    </div>
  );
};

export default function WB_Unit8_Page45_QB() {
  const [answers, setAnswers] = useState({});
  const [, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wordBanksSeed, setWordBanksSeed] = useState(0);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [activeDragId, setActiveDragId] = useState(null);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 5 },
    }),
  );

  const shuffledBanks = useMemo(() => {
    void wordBanksSeed;
    const banks = {};
    ITEMS.forEach((item) => {
      banks[item.id] = shuffleArray(item.words);
    });
    return banks;
  }, [wordBanksSeed]);

  const handleSelectWord = (itemId, wordIndex) => {
    if (showAns || lockedIds.includes(itemId)) return;

    const currentAnswer = answers[itemId] || [];
    const selectedWord = shuffledBanks[itemId][wordIndex];

    if (!selectedWord) return;

    setAnswers((prev) => ({
      ...prev,
      [itemId]: [...currentAnswer, selectedWord],
    }));
    setWrongIds((prev) => prev.filter((id) => id !== itemId));
  };

  const handleRemoveWord = (itemId, answerIndex) => {
    if (showAns || lockedIds.includes(itemId)) return;

    const currentAnswer = [...(answers[itemId] || [])];
    currentAnswer.splice(answerIndex, 1);

    setAnswers((prev) => ({
      ...prev,
      [itemId]: currentAnswer,
    }));

    setWrongIds((prev) => prev.filter((id) => id !== itemId));
  };
  const getVisibleBankWords = (item) => {
    const chosenWords = answers[item.id] || [];
    const tempChosen = [...chosenWords];

    return shuffledBanks[item.id].map((word) => {
      const foundIndex = tempChosen.indexOf(word);

      if (foundIndex !== -1) {
        tempChosen.splice(foundIndex, 1);

        return {
          word,
          disabled: true,
        };
      }

      return {
        word,
        disabled: false,
      };
    });
  };

  const isSentenceComplete = (item) => {
    return (answers[item.id] || []).length === item.words.length;
  };

  const isSentenceCorrect = (item) => {
    return (answers[item.id] || []).join(" ") === item.words.join(" ");
  };

  const allBankIds = ITEMS.flatMap((item) =>
    item.words.map((_, index) => `bank-${item.id}-${index}`),
  );
  const place = (dragId, targetId) => {
    const [, itemIdText, indexText] = String(dragId).split("-");
    const itemId = Number(itemIdText);
    if (targetId !== `sentence-${itemId}`) return;
    handleSelectWord(itemId, Number(indexText));
  };
  const keyboard = useUnit4TabDrag({
    itemIds: allBankIds,
    targetIds: ITEMS.map((item) => `sentence-${item.id}`),
    getTargetIds: (dragId) => {
      const [, itemIdText] = String(dragId).split("-");
      return [`sentence-${itemIdText}`];
    },
    getItemIdsForItem: (dragId) => {
      const [, itemIdText] = String(dragId).split("-");
      return (
        ITEMS.find((item) => item.id === Number(itemIdText))?.words.map(
          (_, index) => `bank-${itemIdText}-${index}`,
        ) || []
      );
    },
    isItemDisabled: (dragId) => {
      const [, itemIdText, indexText] = String(dragId).split("-");
      const item = ITEMS.find((entry) => entry.id === Number(itemIdText));
      return (
        !item ||
        showAns ||
        lockedIds.includes(item.id) ||
        getVisibleBankWords(item)[Number(indexText)]?.disabled
      );
    },
    isTargetDisabled: (targetId) =>
      showAns ||
      lockedIds.includes(Number(String(targetId).replace("sentence-", ""))),
    onPlace: place,
  });

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allCompleted = ITEMS.every((item) => isSentenceComplete(item));

    if (!allCompleted) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (isSentenceCorrect(item)) {
        score++;
      }
    });

    setChecked(true);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter(isSentenceCorrect).map((item) => item.id),
      ]),
    ]);
    setWrongIds(
      ITEMS.filter((item) => !isSentenceCorrect(item)).map((item) => item.id),
    );

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const solved = {};
    ITEMS.forEach((item) => {
      solved[item.id] = [...item.words];
    });

    setAnswers(solved);
    setChecked(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    keyboard.cancel();
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setWordBanksSeed((prev) => prev + 1);
    setLockedIds([]);
    setWrongIds([]);
    setActiveDragId(null);
    keyboard.cancel();
    stopAudio();
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => setActiveDragId(String(event.active.id))}
      onDragEnd={({ active, over }) => {
        if (over) place(String(active.id), String(over.id));
        setActiveDragId(null);
      }}
      onDragCancel={() => setActiveDragId(null)}
    >
      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "30px",
          }}
        >
          <ExerciseHeader
            sectionLetter="B"
            title="Read and write sentences."
            subTitle="Build each past-location sentence from the scrambled word tokens from the key words first, then check word order, capitalization, and punctuation before submitting."
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              width: "100%",
            }}
          >
            {ITEMS.map((item) => {
              const builtWords = answers[item.id] || [];
              const visibleWords = getVisibleBankWords(item);
              const wrong = wrongIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "12px 14px",
                    border: "1px solid #f39b42",
                    borderRadius: "14px",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#111",
                        minWidth: "20px",
                      }}
                    >
                      {item.id}
                    </span>

                    <span
                      className={
                        item.promptAudio
                          ? "unit4-audio-control unit4-interactive"
                          : undefined
                      }
                      role={item.promptAudio ? "button" : undefined}
                      tabIndex={item.promptAudio ? 0 : undefined}
                      aria-label={
                        item.promptAudio ? `Play: ${item.prompt}` : undefined
                      }
                      onClick={
                        item.promptAudio
                          ? () =>
                              playAudio(`prompt-${item.id}`, item.promptAudio)
                          : undefined
                      }
                      onKeyDown={
                        item.promptAudio
                          ? (event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                playAudio(
                                  `prompt-${item.id}`,
                                  item.promptAudio,
                                );
                              }
                            }
                          : undefined
                      }
                      style={{
                        fontSize: "18px",
                        color: "#444",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.prompt}
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `prompt-${item.id}`}
                      />
                    </span>
                  </div>

                  {/* built answer */}
                  <SentenceDrop
                    id={`sentence-${item.id}`}
                    value={builtWords}
                    preview={
                      keyboard.keyboardTargetId === `sentence-${item.id}`
                        ? shuffledBanks[item.id][
                            Number(
                              String(keyboard.keyboardItemId).split("-")[2],
                            )
                          ]
                        : ""
                    }
                    locked={showAns || lockedIds.includes(item.id)}
                    wrong={wrong}
                    register={keyboard.registerTarget}
                    onKeyDown={(event) =>
                      keyboard.handleTargetKeyDown(event, `sentence-${item.id}`)
                    }
                  >
                    {builtWords.map((word, index) => {
                      const isLocked = showAns || lockedIds.includes(item.id);

                      return (
                        <button
                          key={`${item.id}-built-${index}-${word}`}
                          type="button"
                          tabIndex={isLocked ? -1 : 0}
                          disabled={isLocked}
                          onClick={() => {
                            if (!isLocked) handleRemoveWord(item.id, index);
                          }}
                          style={{
                            padding: "5px",
                            borderRadius: "8px",
                            border: "none",
                            fontSize: "18px",
                            cursor: isLocked ? "default" : "pointer",
                          }}
                          className={!isLocked ? "hover:text-red-500" : ""}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </SentenceDrop>

                  {/* word bank */}
                  {/* word bank */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {visibleWords.map((wordItem, index) => (
                      <BankWord
                        key={`${item.id}-bank-${index}-${wordItem.word}`}
                        dragId={`bank-${item.id}-${index}`}
                        word={wordItem.word}
                        disabled={
                          showAns ||
                          lockedIds.includes(item.id) ||
                          wordItem.disabled
                        }
                        register={keyboard.registerItem}
                        pick={() =>
                          keyboard.pickItem(`bank-${item.id}-${index}`)
                        }
                      />
                    ))}
                  </div>

                  {wrong && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
              checkAnswers={handleCheck}
            />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeDragId ? (
          <span
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#fff",
              fontSize: "15px",
            }}
          >
            {(() => {
              const [, itemIdText, indexText] = activeDragId.split("-");
              return (
                shuffledBanks[Number(itemIdText)]?.[Number(indexText)] || ""
              );
            })()}
          </span>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
