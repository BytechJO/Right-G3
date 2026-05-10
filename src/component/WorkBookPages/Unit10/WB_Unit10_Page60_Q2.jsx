import React, { useMemo, useState } from "react";
import Button from "../Button";
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
    prompt: "he / won't / plant / tree",
    words: ["He", "won't", "plant", "a", "tree."],
  },
  {
    id: 2,
    prompt: "they / wash / car",
    words: ["They", "will", "wash", "the", "car."],
  },
  {
    id: 3,
    prompt: "she / build / snowman",
    words: ["She", "will", "build", "a", "snowman."],
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

  const shuffledBanks = useMemo(() => {
    const banks = {};
    ITEMS.forEach((item) => {
      banks[item.id] = shuffleArray(item.words);
    });
    return banks;
  }, [wordBanksSeed]);

  const handleSelectWord = (itemId, wordIndex) => {
    if (showAns||checked) return;

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
    if (showAns||checked) return;

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
    if (showAns||checked) return;

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
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setWordBanksSeed((prev) => prev + 1);
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
          <span className="WB-ex-A">H</span>
     Read and write sentences.
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
                    minHeight: "40px",
                    borderBottom: "1px solid #8f8f8f",
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
                        cursor: showAns||checked ? "default" : "pointer",
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
