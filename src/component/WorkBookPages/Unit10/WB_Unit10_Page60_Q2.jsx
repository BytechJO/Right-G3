import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import prompt1Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise H/Item_001_he_won't_plant_tree.mp3";
import full1Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise H/Item_002_He_won't_plant_a_tree.mp3";
import prompt2Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise H/Item_003_they_wash_car.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise H/Item_004_They_will_wash_the_car.mp3";
import prompt3Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise H/Item_005_she_build_snowman.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise H/Item_006_She_will_build_a_snowman.mp3";

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
    prompt: "he / won't / plant / tree",
    words: ["He", "won't", "plant", "a", "tree."],
    promptAudio: prompt1Audio,
    fullAudio: full1Audio,
  },
  {
    id: 2,
    prompt: "they / wash / car",
    words: ["They", "will", "wash", "the", "car."],
    promptAudio: prompt2Audio,
    fullAudio: full2Audio,
  },
  {
    id: 3,
    prompt: "she / build / snowman",
    words: ["She", "will", "build", "a", "snowman."],
    promptAudio: prompt3Audio,
    fullAudio: full3Audio,
  },
  {
    id: 4,
    prompt: "I / won't / watch / movie",
    words: ["I", "won't", "watch", "a", "movie."],
  },
  {
    id: 5,
    prompt: "she / won't / lie / sun",
    words: ["She", "won't", "lie", "in", "the", "sun."],
  },
  {
    id: 6,
    prompt: "he / read / book",
    words: ["He", "will", "read", "a", "book."],
  },
];
export default function WB_Unit10_Page10_Q2() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wordBanksSeed, setWordBanksSeed] = useState(0);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const shuffledBanks = useMemo(() => {
    const banks = { seed: wordBanksSeed };
    ITEMS.forEach((item) => {
      banks[item.id] = shuffleArray(item.words);
    });
    delete banks.seed;
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

    if (checked) {
      setChecked(false);
    }
  };

  const handleRemoveWord = (itemId, answerIndex) => {
    if (showAns || lockedIds.includes(itemId)) return;

    const currentAnswer = [...(answers[itemId] || [])];
    currentAnswer.splice(answerIndex, 1);

    setAnswers((prev) => ({
      ...prev,
      [itemId]: currentAnswer,
    }));

    if (checked) {
      setChecked(false);
    }
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
    setLockedIds(ITEMS.filter(isSentenceCorrect).map((item) => item.id));

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
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setWordBanksSeed((prev) => prev + 1);
    setLockedIds([]);
    stopAudio();
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <ExerciseHeader
          sectionLetter="H"
          title="Read and write sentences."
          subTitle="Build each future sentence from the scrambled word tokens from the key words first, then check word order, capitalization, and punctuation before submitting."
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
            const wrong =
              checked && isSentenceComplete(item) && !isSentenceCorrect(item);

            return (
              <div
                key={item.id}
                className={
                  lockedIds.includes(item.id) && item.fullAudio
                    ? "unit4-audio-control unit4-full-audio-enabled"
                    : undefined
                }
                role={
                  lockedIds.includes(item.id) && item.fullAudio
                    ? "button"
                    : undefined
                }
                tabIndex={
                  lockedIds.includes(item.id) && item.fullAudio ? 0 : undefined
                }
                aria-label={
                  lockedIds.includes(item.id) && item.fullAudio
                    ? `Play: ${item.words.join(" ")}`
                    : undefined
                }
                onClick={() =>
                  lockedIds.includes(item.id) &&
                  item.fullAudio &&
                  playAudio(`full-${item.id}`, item.fullAudio)
                }
                onKeyDown={(event) => {
                  if (
                    lockedIds.includes(item.id) &&
                    item.fullAudio &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    playAudio(`full-${item.id}`, item.fullAudio);
                  }
                }}
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
                    alignItems: "center",
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
                      item.promptAudio ? "unit4-audio-control" : undefined
                    }
                    role={item.promptAudio ? "button" : undefined}
                    tabIndex={
                      item.promptAudio && !lockedIds.includes(item.id)
                        ? 0
                        : undefined
                    }
                    onClick={(event) => {
                      if (!item.promptAudio || lockedIds.includes(item.id))
                        return;
                      event.stopPropagation();
                      playAudio(`prompt-${item.id}`, item.promptAudio);
                    }}
                    onKeyDown={(event) => {
                      if (
                        item.promptAudio &&
                        !lockedIds.includes(item.id) &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        event.stopPropagation();
                        playAudio(`prompt-${item.id}`, item.promptAudio);
                      }
                    }}
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
                <div
                  style={{
                    minHeight: "40px",
                    borderBottom: "1px solid #8f8f8f",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    // gap: "8px",
                    // paddingBottom: "6px",
                  }}
                >
                  {builtWords.map((word, index) => {
                    const isLocked = showAns || lockedIds.includes(item.id);

                    return (
                      <button
                        key={`${item.id}-built-${index}-${word}`}
                        type="button"
                        tabIndex={isLocked ? -1 : 0}
                        aria-disabled={isLocked}
                        onClick={() => {
                          if (isLocked) return;

                          handleRemoveWord(item.id, index);
                        }}
                        onKeyDown={(event) => {
                          if (isLocked) return;

                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();

                            handleRemoveWord(item.id, index);
                          }
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
                </div>

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
                    <button
                      key={`${item.id}-bank-${index}-${wordItem.word}`}
                      onClick={() =>
                        !wordItem.disabled && handleSelectWord(item.id, index)
                      }
                      disabled={
                        wordItem.disabled ||
                        lockedIds.includes(item.id) ||
                        showAns
                      }
                      style={{
                        padding: "6px 10px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",

                        backgroundColor: wordItem.disabled
                          ? "#d1d5db"
                          : "#f8fafc",

                        color: wordItem.disabled ? "#535353ff" : "#111827",

                        opacity: wordItem.disabled ? 0.6 : 1,

                        fontSize: "15px",
                        fontWeight: "500",

                        cursor:
                          showAns || wordItem.disabled
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {wordItem.word}
                    </button>
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
                      backgroundColor: "red",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                      zIndex: 5,
                      pointerEvents: "none",
                    }}
                  >
                    ✕
                  </div>
                )}
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${item.id}`}
                />
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
  );
}
