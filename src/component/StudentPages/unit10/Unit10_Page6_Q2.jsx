import React, { useRef, useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 110.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 111.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 112.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 87/Asset 113.svg";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import "../unit4/unit4Interactions.css";

const page87E = (file) =>
  new URL(
    `../../../assets/audio/ClassBook/Unit 10/Page 87 - Exercise E/${file}`,
    import.meta.url,
  ).href;
const WORD_AUDIO = {
  "He’ll": page87E("Item_002_He'll.mp3"),
  go: page87E("Item_003_go.mp3"),
  to: page87E("Item_004_to.mp3"),
  the: page87E("Item_005_the.mp3"),
  park: page87E("Item_006_park.mp3"),
  "She’ll": page87E("Item_008_She'll.mp3"),
  restaurant: page87E("Item_009_restaurant.mp3"),
  store: page87E("Item_011_store.mp3"),
};
const QUESTION_AUDIO = [
  page87E("Item_001_Where_will_Tom_go.mp3"),
  page87E("Item_007_Where_will_Helen_go.mp3"),
  page87E("Item_010_Where_will_Harley_go.mp3"),
  null,
];

const Unit10_Page6_Q2 = () => {
  const questions = [
    {
      img: img1,
      q: "Where will Tom go?",
      blank: ["go", "He’ll", "the", "to", "park"],
      correct: "He’ll go to the park",
    },
    {
      img: img2,
      q: "Where will Helen go?",
      blank: ["the", "go", "restaurant", "She’ll", "to"],
      correct: "She’ll go to the restaurant",
    },
    {
      img: img3,
      q: "Where will Harley go?",
      blank: ["to", "go", "the", "store", "He’ll", "toy"],
      correct: "He’ll go to the toy store",
    },
    {
      img: img4,
      q: "Where will Stella go?",
      blank: ["to", "go", "office", "She’ll", "the", "post"],
      correct: "She’ll go to the post office",
    },
  ];
  const correct = {};
  questions.forEach((q, i) => {
    correct[i] = q.correct;
  });
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [keyboardPick, setKeyboardPick] = useState(null);
  const bankRefs = useRef({});
  const answerRefs = useRef({});
  const draggedRef = useRef(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const addWord = (qIndex, word) => {
    if (revealed || lockedIds.includes(qIndex)) return;

    setAnswers((prev) => ({
      ...prev,
      [qIndex]: prev[qIndex] ? [...prev[qIndex], word] : [word],
    }));
    setChecked(false);
  };
  const removeWord = (qIndex, index) => {
    if (revealed || lockedIds.includes(qIndex)) return;
    const removedWord = answers[qIndex]?.[index];

    setAnswers((prev) => {
      const updated = [...prev[qIndex]];
      updated.splice(index, 1);

      return {
        ...prev,
        [qIndex]: updated,
      };
    });
    setChecked(false);
    window.requestAnimationFrame(() =>
      bankRefs.current[`${qIndex}-${removedWord}`]?.focus(),
    );
  };
  const reset = () => {
    setAnswers({});
    setLockedIds([]);
    setRevealed(false);
    setChecked(false);
    setKeyboardPick(null);
    stopAudio();
  };

  const showAnswers = () => {
    const formatted = {};

    questions.forEach((q, i) => {
      formatted[i] = q.correct.split(" "); // 🔥 أهم سطر
    });

    setAnswers(formatted);
    setLockedIds(questions.map((_, index) => index));
    setRevealed(true);
    setChecked(false);
    setKeyboardPick(null);
    stopAudio();
  };
  const checkAnswers = () => {
    if (revealed || lockedIds.length === questions.length) return;
    let score = 0;

    Object.keys(correct).forEach((key) => {
      const userAnswer = answers[key]?.join(" ");
      if (userAnswer === correct[key]) score++;
    });
    const empty = questions.some((_, i) => !answers[i]);

    if (empty) {
      ValidationAlert.info();
      return;
    }
    const total = questions.length;
    if (score < total) {
      ValidationAlert.warning(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:orange;">Score: ${score} / ${total}</b>
        </div>
      `);
    } else {
      ValidationAlert.success(`
        <div style="font-size:20px;text-align:center;">
          <b style="color:green;">Score: ${score} / ${total}</b>
        </div>
      `);
    }

    setLockedIds(
      questions.flatMap((question, index) =>
        answers[index]?.join(" ") === question.correct ? [index] : [],
      ),
    );
    setChecked(true);
  };
  const isWrong = (index) => {
    if (!checked) return false;

    const userAnswer = answers[index]?.join(" ");
    return userAnswer !== questions[index].correct;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "40px",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title="Write."
          subTitle="Match each word or answer to its target first, then drag it into place and check the snap position."
        />
        <div className="flex flex-col gap-5 w-full">
          {questions.map((item, i) => (
            <div
              className="border-1 border-gray-300 rounded-[25px]"
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                // marginBottom: "30px",
              }}
            >
              {/* اليسار: السؤال + الكلمات */}
              <div className="p-5">
                {/* رقم + السؤال */}
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <span style={{ fontWeight: "bold" }}>{i + 1}</span>
                  <p
                    style={{ margin: 0 }}
                    role={QUESTION_AUDIO[i] ? "button" : undefined}
                    tabIndex={QUESTION_AUDIO[i] ? 0 : undefined}
                    className={
                      QUESTION_AUDIO[i]
                        ? "unit4-interactive unit4-audio-control"
                        : ""
                    }
                    onClick={() =>
                      QUESTION_AUDIO[i] &&
                      playAudio(`question-${i}`, QUESTION_AUDIO[i])
                    }
                    onKeyDown={(event) => {
                      if (
                        QUESTION_AUDIO[i] &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`question-${i}`, QUESTION_AUDIO[i]);
                      }
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `question-${i}`}
                    />
                    {item.q}
                  </p>
                </div>

                {/* الكلمات */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {item.blank.map((word, index) => {
                    const isUsed = answers[i]?.includes(word);

                    return (
                      <div
                        key={index}
                        ref={(element) => {
                          bankRefs.current[`${i}-${word}`] = element;
                        }}
                        role="button"
                        tabIndex={isUsed ? -1 : 0}
                        aria-disabled={isUsed}
                        draggable={
                          !isUsed && !revealed && !lockedIds.includes(i)
                        }
                        onDragStart={(event) => {
                          draggedRef.current = true;
                          event.dataTransfer.setData("text/plain", word);
                        }}
                        onDragEnd={() =>
                          window.setTimeout(() => {
                            draggedRef.current = false;
                          }, 0)
                        }
                        onClick={() => {
                          if (
                            !isUsed &&
                            !draggedRef.current &&
                            WORD_AUDIO[word]
                          )
                            playAudio(`word-${i}-${index}`, WORD_AUDIO[word]);
                        }}
                        onKeyDown={(event) => {
                          if (isUsed) return;
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            if (WORD_AUDIO[word])
                              playAudio(`word-${i}-${index}`, WORD_AUDIO[word]);
                            setKeyboardPick({
                              qIndex: i,
                              word,
                              key: `${i}-${word}`,
                            });
                            window.requestAnimationFrame(() =>
                              answerRefs.current[i]?.focus(),
                            );
                          }
                        }}
                        className="unit4-interactive unit4-audio-control"
                        style={{
                          padding: "6px 12px",
                          border: "1px solid orange",
                          borderRadius: "8px",
                          cursor: isUsed ? "not-allowed" : "pointer",
                          opacity: isUsed ? 0.4 : 1,
                        }}
                      >
                        <Unit4PlayingAudioIcon
                          active={activeAudioKey === `word-${i}-${index}`}
                        />
                        {word}
                      </div>
                    );
                  })}
                </div>
                <div
                  ref={(element) => {
                    answerRefs.current[i] = element;
                  }}
                  role="button"
                  tabIndex={
                    !revealed &&
                    !lockedIds.includes(i) &&
                    keyboardPick?.qIndex === i
                      ? 0
                      : -1
                  }
                  aria-label={`Answer line ${i + 1}`}
                  onDragOver={(event) => {
                    if (!revealed && !lockedIds.includes(i))
                      event.preventDefault();
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    const word = event.dataTransfer.getData("text/plain");
                    if (word && !answers[i]?.includes(word)) addWord(i, word);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape" && keyboardPick) {
                      event.preventDefault();
                      const saved = keyboardPick;
                      setKeyboardPick(null);
                      window.requestAnimationFrame(() =>
                        bankRefs.current[saved.key]?.focus(),
                      );
                      return;
                    }
                    if (
                      keyboardPick?.qIndex === i &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      const saved = keyboardPick;
                      addWord(i, saved.word);
                      setKeyboardPick(null);
                      window.requestAnimationFrame(() => {
                        const next = item.blank.find(
                          (candidate) =>
                            candidate !== saved.word &&
                            !answers[i]?.includes(candidate),
                        );
                        bankRefs.current[`${i}-${next}`]?.focus();
                      });
                    }
                  }}
                  className={
                    keyboardPick?.qIndex === i ? "unit4-keyboard-preview" : ""
                  }
                  style={{
                    minHeight: "40px",
                    borderBottom: isWrong(i)
                      ? "2px solid red"
                      : "1px solid gray",
                    marginBottom: "10px",
                    padding: "5px",
                    fontWeight: "500",
                    width: "350px",
                    fontSize: "18px",
                    position: "relative", // 🔥 مهم
                  }}
                >
                  {answers[i]?.map((word, idx) => {
                    const isLocked = revealed || lockedIds.includes(i);

                    return (
                      <span
                        key={`${word}-${idx}`}
                        role={isLocked ? undefined : "button"}
                        tabIndex={isLocked ? -1 : 0}
                        aria-label={
                          isLocked
                            ? undefined
                            : `${word}. Press Enter or Space to remove it.`
                        }
                        onClick={(event) => {
                          event.stopPropagation();

                          if (isLocked) return;

                          removeWord(i, idx);
                        }}
                        onKeyDown={(event) => {
                          if (isLocked) return;

                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            event.stopPropagation();

                            removeWord(i, idx);
                          }
                        }}
                        className={isLocked ? "" : "hover:text-red-500"}
                        style={{
                          marginRight: "8px",
                          cursor: isLocked ? "default" : "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        {word}
                      </span>
                    );
                  })}
                  {keyboardPick?.qIndex === i && (
                    <span style={{ opacity: 0.55 }}>{keyboardPick.word}</span>
                  )}
                  {isWrong(i) && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-5px",
                        right: "-40px",
                        transform: "translateY(-50%)",
                        width: "22px",
                        height: "22px",
                        background: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        border: "2px solid white",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                        pointerEvents: "none",
                      }}
                    >
                      ✕
                    </span>
                  )}
                </div>
              </div>

              {/* اليمين: الصورة */}
              <img
                src={item.img}
                alt={
                  [
                    "Tom thinking about going to the park.",
                    "Helen thinking about going to a restaurant.",
                    "Harley thinking about going to the toy store.",
                    "Stella thinking about going to the post office.",
                  ][i]
                }
                style={{
                  width: "245px",
                  height: "auto",
                  objectFit: "contain",
                  marginLeft: "10px",
                }}
              />
            </div>
          ))}
        </div>
        {/* BUTTONS */}
        <div className="action-buttons-container">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>

          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>

          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unit10_Page6_Q2;
