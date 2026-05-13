import React, { useMemo, useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

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
    prompt: "weather what’s winter in like the?",
    words: ["What’s", "the", "weather", "like", "in", "winter", "?"],
    season: "cold",
  },
  {
    id: 2,
    prompt: "like summer the what’s in weather?",
    words: ["What’s", "the", "weather", "like", "in", "summer", "?"],
    season: "hot",
  },

  {
    id: 3,
    prompt: "the in weather like what’s autumn?",
    words: ["What’s", "the", "weather", "like", "in", "autumn", "?"],
    season: "cool",
  },
  {
    id: 4,
    prompt: "in what’s spring weather the",
    words: ["What’s", "the", "weather", "like", "in", "spring", "?"],
    season: "warm",
  },
];

const WEATHER_OPTIONS = ["cool", "hot", "cold", "warm"];

export default function Unit4_Page6_Q2() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [wordBanksSeed, setWordBanksSeed] = useState(0);
  const [seasonAnswers, setSeasonAnswers] = useState({});
  const shuffledBanks = useMemo(() => {
    const banks = {};
    ITEMS.forEach((item) => {
      banks[item.id] = shuffleArray(item.words);
    });
    return banks;
  }, [wordBanksSeed]);

  const handleSelectWord = (itemId, wordIndex) => {
    if (showAns || checked) return;

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
    if (showAns || checked) return;

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
    if (showAns || checked) return;

    const allCompleted = ITEMS.every(
      (item) => isSentenceComplete(item) && seasonAnswers[item.id],
    );

    if (!allCompleted) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }

    let score = 0;
    const total = ITEMS.length * 2;

    ITEMS.forEach((item) => {
      // sentence
      if (isSentenceCorrect(item)) {
        score++;
      }

      // dropdown
      if (seasonAnswers[item.id] === item.season) {
        score++;
      }
    });

    setChecked(true);

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const solved = {};
    const solvedSeasons = {};

    ITEMS.forEach((item) => {
      solved[item.id] = [...item.words];
      solvedSeasons[item.id] = item.season;
    });

    setAnswers(solved);
    setSeasonAnswers(solvedSeasons);

    setChecked(true);
    setShowAns(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSeasonAnswers({});
    setChecked(false);
    setShowAns(false);
    setWordBanksSeed((prev) => prev + 1);
  };
  const handleSeasonChange = (itemId, value) => {
    setSeasonAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };
  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">E</span>
          Look, unscramble, and answer. Use the words below.
        </h1>

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
                    style={{
                      fontSize: "18px",
                      color: "#444",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.prompt}
                  </span>
                </div>

                {/* built answer */}
                <div
                  style={{
                    minHeight: "52px",
                    borderBottom: wrong
                      ? "2px solid red"
                      : "1px solid  #8f8f8f",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    // gap: "8px",
                    // paddingBottom: "6px",
                  }}
                >
                  {builtWords.map((word, index) => (
                    <button
                      key={`${item.id}-built-${index}-${word}`}
                      onClick={() => handleRemoveWord(item.id, index)}
                      style={{
                        padding: "5px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "18px",
                        // fontWeight: "500",
                        cursor: showAns || checked ? "default" : "pointer",
                      }}
                      className={`${!showAns && !checked && "hover:text-red-500"}`}
                    >
                      {word}
                    </button>
                  ))}
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
                      disabled={wordItem.disabled}
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

                {/* season answer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    It's
                  </span>

                  <select
                    value={seasonAnswers[item.id] || ""}
                    onChange={(e) =>
                      handleSeasonChange(item.id, e.target.value)
                    }
                    disabled={showAns || checked}
                    style={{
                      padding: "8px 12px",
                      // borderRadius: "8px",
                      borderBottom: wrong
                        ? "2px solid red"
                        : "1px solid  #8f8f8f",
                      fontSize: "15px",
                      minWidth: "120px",
                      background: "#fff",
                      cursor: showAns || checked ? "default" : "pointer",
                    }}
                  >
                    <option value="">Select</option>

                    {WEATHER_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
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
