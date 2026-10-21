import React, { useState, useEffect, useRef } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit7/Page 39 - Exercise A/Item_001_Can_you_see_Hansel.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit7/Page 39 - Exercise A/Item_002_Yes,_I_can_see_him_by_the_tree.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit7/Page 39 - Exercise A/Item_003_Can_you_see_the_cat.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit7/Page 39 - Exercise A/Item_004_Can_you_see_Dad.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit7/Page 39 - Exercise A/Item_005_Can_you_see_Mom.mp3";

import houseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/1.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const LINE_COLOR = "#333";

const ITEMS = [
  {
    id: 1,
    example: true,
    question: "Can you see Hansel?",
    answer: "Yes, I can see him by the tree.",
    questionAudio: audio1,
    answerAudio: audio2,
  },
  {
    id: 2,
    example: false,
    question: "Can you see the cat?",
    choices: [
      "Yes, I can see it in the kitchen.",
      "Yes, I can see it in the bedroom.",
    ],
    correct: "Yes, I can see it in the kitchen.",
    questionAudio: audio3,
  },
  {
    id: 3,
    example: false,
    question: "Can you see Dad?",
    choices: [
      "Yes, I can see him near the bed in the bedroom.",
      "Yes, I can see him in the kitchen.",
    ],
    correct: "Yes, I can see him near the bed in the bedroom.",
    questionAudio: audio4,
  },
  {
    id: 4,
    example: false,
    question: "Can you see Mom?",
    choices: [
      "Yes, I can see her in front of the washing machine in the basement.",
      "Yes, I can see her in the bedroom.",
    ],
    correct:
      "Yes, I can see her in front of the washing machine in the basement.",
    questionAudio: audio5,
  },
];

export default function SB_LookAndAnswer_PageA() {
  const [answers, setAnswers] = useState({});
  const [openId, setOpenId] = useState(null);
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const selectRefs = useRef({});
  const firstOptionRefs = useRef({});
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  // إغلاق عند الضغط خارج
  useEffect(() => {
    const close = () => setOpenId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setOpenId(null);
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
    window.requestAnimationFrame(() => selectRefs.current[id]?.focus());
  };

  const openSelect = (id, focusFirstOption = false) => {
    if (showAns || lockedIds.includes(id)) return;
    setOpenId(id);
    if (focusFirstOption) {
      window.requestAnimationFrame(() => firstOptionRefs.current[id]?.focus());
    }
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length - 1) return;

    const editables = ITEMS.filter((i) => !i.example);
    const allAnswered = editables.every((i) => answers[i.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const correctIds = editables.flatMap((i) =>
      answers[i.id] === i.correct ? [i.id] : [],
    );
    const incorrectIds = editables.flatMap((i) =>
      answers[i.id] !== i.correct ? [i.id] : [],
    );
    const score = correctIds.length;

    setShowResults(true);
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);

    const total = editables.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.filter((i) => !i.example).forEach((i) => {
      filled[i.id] = i.correct;
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.filter((i) => !i.example).map((i) => i.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setOpenId(null);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) => wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="A"
          title="Look and answer the questions."
          subTitle="Use the Can you see question and location in the house picture to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "30px",
          }}
        >
          {/* الصورة */}
          <div>
            <img
              src={houseImg}
              alt="A cutaway house showing family members, a cat, and rooms"
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          {/* الأسئلة */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {ITEMS.map((item) => (
              <div
                key={item.id}
                className="unit4-audio-control"
                style={{ position: "relative" }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className="unit4-interactive"
                  onClick={() =>
                    playAudio(`question-${item.id}`, item.questionAudio)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`question-${item.id}`, item.questionAudio);
                    }
                  }}
                  style={{ fontSize: "18px", width: "fit-content" }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `question-${item.id}`}
                  />
                  {item.id}. {item.question}
                </div>

                {item.example ? (
                  <div
                    role="button"
                    tabIndex={0}
                    className="unit4-audio-control unit4-interactive"
                    onClick={() => playAudio("answer-1", item.answerAudio)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        playAudio("answer-1", item.answerAudio);
                      }
                    }}
                    style={{
                      fontSize: "18px",
                      borderBottom: `1px solid ${LINE_COLOR}`,
                      paddingBottom: "5px",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === "answer-1"}
                    />
                    {item.answer}
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    {/* Selected */}
                    <div
                      ref={(element) => { selectRefs.current[item.id] = element; }}
                      role="combobox"
                      aria-label={`Answer question ${item.id}: ${item.question}`}
                      aria-haspopup="listbox"
                      aria-expanded={openId === item.id}
                      aria-disabled={showAns || lockedIds.includes(item.id)}
                      tabIndex={showAns || lockedIds.includes(item.id) ? -1 : 0}
                      className="unit4-interactive"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (openId === item.id) setOpenId(null);
                        else openSelect(item.id);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                          event.preventDefault();
                          event.stopPropagation();
                          openSelect(item.id, true);
                        } else if (event.key === "Escape") {
                          event.preventDefault();
                          setOpenId(null);
                        }
                      }}
                      style={{
                        borderBottom: isWrong(item)
                          ? `2px solid ${WRONG_COLOR}`
                          : `1px solid ${LINE_COLOR}`,
                        padding: "6px 28px 6px 4px",
                        cursor:
                          showAns || lockedIds.includes(item.id)
                            ? "default"
                            : "pointer",
                        fontSize: "17px",
                        height: "30px",
                        background: "#fff",
                        position: "relative",
                      }}
                    >
                      {answers[item.id] || ""}

                      <span
                        style={{
                          position: "absolute",
                          right: "6px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "10px",
                          color: "#666",
                        }}
                      >
                        ▼
                      </span>
                    </div>

                    {/* Dropdown */}
                    {openId === item.id &&
                      !lockedIds.includes(item.id) &&
                      !showAns && (
                        <div
                          role="listbox"
                          aria-label={`Choices for question ${item.id}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            width: "100%",
                            background: "#fff",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            marginTop: "2px",
                            zIndex: 9999,
                            maxHeight: "180px",
                            overflowY: "auto",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }}
                        >
                          {item.choices.map((choice) => {
                            const isSelected = answers[item.id] === choice;

                            return (
                              <button
                                type="button"
                                key={choice}
                                ref={(element) => {
                                  if (choice === item.choices[0]) firstOptionRefs.current[item.id] = element;
                                }}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleSelect(item.id, choice)}
                                onKeyDown={(event) => {
                                  if (event.key === "Escape") {
                                    event.preventDefault();
                                    setOpenId(null);
                                    window.requestAnimationFrame(() => selectRefs.current[item.id]?.focus());
                                  }
                                }}
                                style={{
                                  display: "block",
                                  width: "100%",
                                  border: 0,
                                  textAlign: "left",
                                  padding: "8px 10px",
                                  fontSize: "18px",
                                  fontFamily: "inherit",
                                  cursor: "pointer",
                                  backgroundColor: isSelected
                                    ? "#e6f0ff"
                                    : "#fff",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#f1f1f1";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    isSelected ? "#e6f0ff" : "#fff";
                                }}
                              >
                                {choice}
                              </button>
                            );
                          })}
                        </div>
                      )}

                    {/* Wrong icon */}
                    {isWrong(item) && (
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
                )}
              </div>
            ))}
          </div>
        </div>

        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
        />
      </div>
    </div>
  );
}
