import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 51/Untitled-2.png";

const Unit6_Page6_Q2 = () => {
  const letters = ["a", "e", "o", "i", "u"];
  const [results, setResults] = useState({});

  const words = [
    {
      id: 1,
      structure: [
        "J",
        { slot: 0, symbol: "★" },
        "n",
        { slot: 1, symbol: "●" },
        { slot: 2, symbol: "★" },
        "ry",
      ],
      correct: ["a", "u", "a"],
    },

    {
      id: 2,
      structure: [
        "F",
        { slot: 3, symbol: "▼" },
        "br",
        { slot: 4, symbol: "●" },
        { slot: 5, symbol: "★" },
        "ry",
      ],
      correct: ["e", "u", "a"],
    },

    {
      id: 3,
      structure: ["M", { slot: 6, symbol: "★" }, "rch"],
      correct: ["a"],
    },

    {
      id: 4,
      structure: [
        { slot: 7, symbol: "★" },
        "pr",
        { slot: 8, symbol: "■" },
        "l",
      ],
      correct: ["a", "i"],
    },

    {
      id: 5,
      structure: ["M", { slot: 9, symbol: "★" }, "y"],
      correct: ["a"],
    },

    {
      id: 6,
      structure: [
        "J",
        { slot: 10, symbol: "●" },
        "n",
        { slot: 11, symbol: "▼" },
      ],
      correct: ["u", "e"],
    },

    {
      id: 7,
      structure: ["J", { slot: 12, symbol: "●" }, "ly"],
      correct: ["u"],
    },

    {
      id: 8,
      structure: [
        { slot: 13, symbol: "★" },
        { slot: 14, symbol: "●" },
        "g",
        { slot: 15, symbol: "●" },
        "st",
      ],
      correct: ["a", "u", "u"],
    },

    {
      id: 9,
      structure: [
        "S",
        { slot: 16, symbol: "▼" },
        "pt",
        { slot: 17, symbol: "▼" },
        "mb",
        { slot: 18, symbol: "▼" },
        "r",
      ],
      correct: ["e", "e", "e"],
    },

    {
      id: 10,
      structure: [
        { slot: 19, symbol: "#" },
        "ct",
        { slot: 20, symbol: "#" },
        "b",
        { slot: 21, symbol: "▼" },
        "r",
      ],
      correct: ["o", "o", "e"],
    },

    {
      id: 11,
      structure: [
        "N",
        { slot: 22, symbol: "#" },
        "v",
        { slot: 23, symbol: "▼" },
        "mb",
        { slot: 24, symbol: "▼" },
        "r",
      ],
      correct: ["o", "e", "e"],
    },

    {
      id: 12,
      structure: [
        "D",
        { slot: 25, symbol: "▼" },
        "c",
        { slot: 26, symbol: "▼" },
        "mb",
        { slot: 27, symbol: "▼" },
        "r",
      ],
      correct: ["e", "e", "e"],
    },
  ];

  const totalSlots = 28;

  const [answers, setAnswers] = useState(Array(totalSlots).fill(""));

  const [locked, setLocked] = useState(false);

  // change select
  const handleSelect = (slot, value) => {
    if (locked) return;

    setAnswers((prev) => {
      const updated = [...prev];
      updated[slot] = value;
      return updated;
    });
  };

  // check
  const checkAnswers = () => {
    if (locked) return;

    const usedSlots = words.flatMap((w) =>
      w.structure
        .filter((item) => typeof item !== "string")
        .map((item) => item.slot),
    );

    const hasEmpty = usedSlots.some((slot) => answers[slot] === "");

    if (hasEmpty) {
      ValidationAlert.info("");
      return;
    }

    let score = 0;
    let newResults = {};

    words.forEach((w) => {
      let isCorrect = true;
      let correctIndex = 0;

      w.structure.forEach((item) => {
        if (typeof item !== "string") {
          const slot = item.slot;
          const correctLetter = w.correct[correctIndex];

          if (answers[slot] !== correctLetter) {
            isCorrect = false;
          } else {
            score++;
          }

          correctIndex++;
        }
      });

      newResults[w.id] = isCorrect;
    });

    setResults(newResults);

    const total = totalSlots;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    ValidationAlert[
      score === total ? "success" : score === 0 ? "error" : "warning"
    ](`
      <div style="font-size:20px;text-align:center;">
        <span style="color:${color};font-weight:bold;">
          Score: ${score} / ${total}
        </span>
      </div>
    `);

    setLocked(true);
  };

  const reset = () => {
    setAnswers(Array(totalSlots).fill(""));
    setResults({});
    setLocked(false);
  };

  const showAnswers = () => {
    const filled = Array(totalSlots).fill("");

    words.forEach((w) => {
      let correctIndex = 0;

      w.structure.forEach((item) => {
        if (typeof item !== "string") {
          filled[item.slot] = w.correct[correctIndex];
          correctIndex++;
        }
      });
    });

    setAnswers(filled);
    setResults({});

    setLocked(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="div-forall"
        style={{
          gap: "20px",
        }}
      >
        <h5 className="header-title-page8">
          <span style={{ marginRight: "15px" }} className="ex-A">
            E
          </span>
          Look and write.
        </h5>
        <div className="flex gap-10">
          {/* الكلمات */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "50px",
              gap: "20px",
            }}
          >
            {words.map((word) => (
              <div
                key={word.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "35px",
                  fontSize: "18px",
                  position: "relative",
                }}
              >
                {/* الرقم */}
                <span
                  style={{
                    fontWeight: "bold",
                    width: "25px",
                  }}
                >
                  {word.id}
                </span>

                {/* الرموز */}
                <span
                  style={{
                    minWidth: "80px",
                    marginRight: "10px",
                  }}
                >
                  {word.structure.map((item, i) => {
                    if (typeof item === "string") return item;

                    return (
                      <span key={i} style={{ fontWeight: "bold" }}>
                        {item.symbol}
                      </span>
                    );
                  })}
                </span>

                {/* dropdown */}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {word.structure.map((item, index) => {
                    if (typeof item === "string") {
                      return <span key={index}>{item}</span>;
                    }

                    return (
                      <select
                        key={item.slot}
                        value={answers[item.slot]}
                        disabled={locked}
                        onChange={(e) =>
                          handleSelect(item.slot, e.target.value)
                        }
                        style={{
                          width: "45px",
                          height: "35px",
                          margin: "0 4px",
                          textAlign: "center",
                          borderBottom: locked
                            ? answers[item.slot] !==
                              word.correct[
                                word.structure
                                  .filter((x) => typeof x !== "string")
                                  .findIndex((x) => x.slot === item.slot)
                              ]
                              ? "2px solid red"
                              : "1px solid #ccc"
                            : "1px solid #ccc",
                          // borderRadius: "6px",
                          fontWeight: "bold",
                          background: "#fff",
                          cursor: locked? "default":"pointer",
                          outline: "none",
                        }}
                      >
                        <option value=""></option>

                        {letters.map((letter, i) => (
                          <option key={i} value={letter}>
                            {letter}
                          </option>
                        ))}
                      </select>
                    );
                  })}
                </span>

                {locked && results[word.id] === false && (
                  <span className="absolute -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-md">
                    ✕
                  </span>
                )}
              </div>
            ))}
          </div>
          <img
            src={img1}
            alt="exercise"
            style={{
              width: "auto",
              height: "450px",
              zIndex: 999,
              pointerEvents: "none",
            }}
          />
        </div>
        {/* Buttons */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Unit6_Page6_Q2;
