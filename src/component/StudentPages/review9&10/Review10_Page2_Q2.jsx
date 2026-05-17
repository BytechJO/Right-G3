// ExerciseC.jsx

import { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

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

export default function Review10_Page2_Q2() {
  const [columns, setColumns] = useState({ s: [], z: [] });
  const [remaining, setRemaining] = useState([...wordBank]);
  const [showResult, setShowResult] = useState(false);
  const [draggedWord, setDraggedWord] = useState(null);
  const [dragSource, setDragSource] = useState(null);

  const addWordToColumn = (col, word) => {
    if (showResult) return;
    if (!word) return;

    setColumns((prev) => {
      // إذا الكلمة مستخدمة بأي عمود لا تضيفها
      const alreadyUsed = prev.s.includes(word) || prev.z.includes(word);

      if (alreadyUsed) return prev;

      return {
        ...prev,
        [col]: [...prev[col], word],
      };
    });
  };
  const moveWordBetweenColumns = (fromCol, toCol, word) => {
    if (showResult) return;
    if (!word || fromCol === toCol) return;

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
    if (showResult) return;
    if (!word) return;

    setColumns((prev) => ({
      ...prev,
      [fromCol]: prev[fromCol].filter((w) => w !== word),
    }));
  };
  const handleDragStart = (word, source) => {
    if (showResult) return;
    setDraggedWord(word);
    setDragSource(source);
  };

  const handleDragEnd = () => {
    setDraggedWord(null);
    setDragSource(null);
  };

  const handleDropOnColumn = (targetCol) => {
    if (showResult || !draggedWord || !dragSource) return;

    if (dragSource === "bank") {
      addWordToColumn(targetCol, draggedWord);
    } else if (dragSource === "s" || dragSource === "z") {
      moveWordBetweenColumns(dragSource, targetCol, draggedWord);
    }

    handleDragEnd();
  };

  const handleDropOnBank = () => {
    if (showResult || !draggedWord || !dragSource) return;

    if (dragSource === "s" || dragSource === "z") {
      returnWordToBank(dragSource, draggedWord);
    }

    handleDragEnd();
  };

  const checkAnswers = () => {
    if (showResult) return;

    // 1) تأكد إن كل الكلمات انحطت
    const usedWordsCount = columns.s.length + columns.z.length;

    if (usedWordsCount < wordBank.length) {
      ValidationAlert.info(
        "Please place all words before checking your answers!",
      );
      return;
    }

    // 2) مقارنة الإجابات (زي السؤال الأول)
    const results = wordBank.map((word) => {
      const inS = columns.s.includes(word);
      const inZ = columns.z.includes(word);

      if (
        (inS && correctAnswers.s.includes(word)) ||
        (inZ && correctAnswers.z.includes(word))
      ) {
        return "correct";
      } else {
        return "wrong";
      }
    });

    setShowResult(true);

    // 3) حساب السكور (نفس الفكرة)
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

    // 4) نفس أسلوب التنبيه
    if (correctCount === total) ValidationAlert.success(resultHTML);
    else if (correctCount === 0) ValidationAlert.error(resultHTML);
    else ValidationAlert.warning(resultHTML);
  };

  const handleShowAnswer = () => {
    setColumns({
      s: [...correctAnswers.s],
      z: [...correctAnswers.z],
    });

    setShowResult(true);
  };

  const handleStartAgain = () => {
    setColumns({ s: [], z: [] });
    setShowResult(false);
    setDraggedWord(null);
    setDragSource(null);
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

  const getColClass = (col) => {
    const base =
      "border-2 border-dashed border-gray-300 rounded-xl p-4 min-h-[140px] transition-all";

    if (!showResult) {
      return base + "border-gray-300 bg-white hover:border-orange-400";
    }

    const userSorted = [...columns[col]].sort().join(",");
    const rightSorted = [...correctAnswers[col]].sort().join(",");

    return userSorted === rightSorted
      ? base + "border-gray-300 bg-white"
      : base + "border-gray-300 bg-white";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "20px" }}>
        <h5 className="header-title-page8" style={{ display: "flex" }}>
          <span style={{ marginRight: "15px" }}>D</span>

          <div>
            Does the underlined word have an{" "}
            <span style={{ color: "#2e3192" }}>/s/</span> or{" "}
            <span style={{ color: "#2e3192" }}>/z/</span> sound at the <br />
            end? Write the words in the correct columns.
          </div>
        </h5>

        {/* Word Bank */}
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnBank}
            className="flex flex-wrap gap-2 p-4 w-full justify-center rounded-xl min-h-20 "
          >
            {wordBank.map((word) => {
              const isUsed =
                columns.s.includes(word) || columns.z.includes(word);

              return (
                <button
                  key={word}
                  draggable={!showResult && !isUsed}
                  disabled={isUsed}
                  onDragStart={() => handleDragStart(word, "bank")}
                  onDragEnd={handleDragEnd}
                  className="px-4 py-2 bg-white border-1 border-gray-300 rounded-lg text-[17px] text-gray-700 transition-all"
                  style={{
                    cursor: isUsed ? "not-allowed" : "grab",
                    opacity: isUsed ? 0.4 : 1,
                  }}
                >
                  {word}
                </button>
              );
            })}

            {remaining.length === 0 && (
              <p className="text-gray-400 text-sm">All words placed ✓</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {/* Columns */}
          <div className="grid grid-cols-2 gap-6">
            {["s", "z"].map((col) => (
              <div key={col}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-blue-800 text-lg">
                    /{col}/
                  </span>
                </div>

                <div
                  className={getColClass(col)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOnColumn(col)}
                >
                  <div className="flex flex-wrap gap-2">
                    {columns[col].map((word) => {
                      const isCorrect = correctAnswers[col].includes(word);

                      return (
                        <div key={word} style={{ position: "relative" }}>
                          <button
                            draggable={!showResult}
                            onDragStart={() => handleDragStart(word, col)}
                            onDragEnd={handleDragEnd}
                            onClick={() => {
                              if (!showResult) {
                                returnWordToBank(col, word);
                              }
                            }}
                            className={getWordClass(col, word)}
                          >
                            {word}
                          </button>

                          {/* ❌ للغلط فقط */}
                          {showResult && !isCorrect && (
                            <div
                              style={{
                                position: "absolute",
                                right: "-10px",
                                top: "00%",
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

                  {columns[col].length === 0 && (
                    <div className="text-gray-400 text-sm mt-2">
                      Drag words here
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px", fontSize: "18px", lineHeight: "2" }}>
            <div>
              <strong>1</strong> She gets full{" "}
              <span style={{ textDecoration: "underline" }}>marks</span>.
            </div>

            <div>
              <strong>2</strong> Dad{" "}
              <span style={{ textDecoration: "underline" }}>makes</span> us{" "}
              <span style={{ textDecoration: "underline" }}>sandwiches</span>.
            </div>

            <div>
              <strong>3</strong> Jacob usually{" "}
              <span style={{ textDecoration: "underline" }}>plays</span>, then{" "}
              <span style={{ textDecoration: "underline" }}>eats</span> his
              lunch.
            </div>

            <div>
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
  );
}
