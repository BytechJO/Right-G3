import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import tryAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_001_try.mp3";
import fryAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_002_fry.mp3";
import grumpyAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_003_grumpy.mp3";
import cryAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_004_cry.mp3";
import sandyAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_005_sandy.mp3";
import heartyAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_006_hearty.mp3";
import partyAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_007_party.mp3";
import spyAudio from "../../../assets/audio/WorkBook/unit5/Page 32 - Exercise C/Item_008_spy.mp3";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd6pg32instruction-adult-lady_xXPh6TKj.mp3"; // ← غيّر المسار حسب ملف الأوديو
const ITEMS = [
  {
    id: 1,
    words: ["try", "grumpy", "fry", "cry"],
    correct: ["try", "fry", "cry"],
  },
  {
    id: 2,
    words: ["sandy", "hearty", "party", "spy"],
    correct: ["sandy", "hearty", "party"],
  },
];
const WORD_AUDIO = {
  try: tryAudio,
  fry: fryAudio,
  grumpy: grumpyAudio,
  cry: cryAudio,
  sandy: sandyAudio,
  hearty: heartyAudio,
  party: partyAudio,
  spy: spyAudio,
};
export default function WB_Unit5_Page32_Qc() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const captions = [
    {
      start: 0.57,
      end: 9.88,
      text: "Page 32, phonics exercise D. Which words have the same Y sound? Listen and circle.",
    },

    { start: 10.92, end: 16.79, text: "1- try, grumpy, fry, cry." },

    { start: 18.1, end: 22.73, text: "2- sandy, hearty, party, spy." },
  ];
  const handleSelect = (id, word) => {
    playAudio(`word-${id}-${word}`, WORD_AUDIO[word]);
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => {
      const current = prev[id] || [];

      if (current.includes(word)) {
        return {
          ...prev,
          [id]: current.filter((w) => w !== word),
        };
      }

      return {
        ...prev,
        [id]: [...current, word],
      };
    });
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]?.length > 0);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      const selected = answers[item.id] || [];

      const hasWrongChoice = selected.some(
        (word) => !item.correct.includes(word),
      );

      const missedCorrect = item.correct.some(
        (word) => !selected.includes(word),
      );

      const isCorrect = !hasWrongChoice && !missedCorrect;

      if (isCorrect) {
        score += 1;
      }
    });

    setChecked(true);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter((item) => {
          const selected = answers[item.id] || [];
          return (
            selected.length === item.correct.length &&
            item.correct.every((word) => selected.includes(word))
          );
        }).map((item) => item.id),
      ]),
    ]);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };
  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setChecked(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    stopAudio();
  };

  const isWrong = (item, word) => {
    if (!checked || showAns) return false;
    return answers[item.id]?.includes(word) && !item.correct.includes(word);
  };

  const isSelected = (item, word) => {
    return answers[item.id]?.includes(word);
  };
  const isQuestionWrong = (item) => {
    if (!checked || showAns) return false;

    const selected = answers[item.id] || [];

    const hasWrongChoice = selected.some(
      (word) => !item.correct.includes(word),
    );

    const missedCorrect = item.correct.some((word) => !selected.includes(word));

    return hasWrongChoice || missedCorrect;
  };
  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "60px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Which words have the same{" "}
              <span class="text-blue-900">-y sound</span>? Listen and circle.
            </>
          }
          subTitle="Listen carefully for the target sound, replay if needed, then choose the words that share the same -y sound that matches what you hear."
        />
        <QuestionAudioPlayer
          pageId="wb-unit5-page32-q3"
          src={sound1}
          captions={captions}
          stopAtSecond={9}
        />
        {/* LIST */}
        <div
          className="w-full"
          style={{ display: "flex", flexDirection: "column", gap: "60px" }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                // flexWrap: "wrap",
              }}
            >
              {isQuestionWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "-10px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "red",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "2px solid white",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  ✕
                </div>
              )}
              {/* number */}
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  minWidth: "20px",
                }}
              >
                {item.id}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",

                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                {/* words row */}
                {item.words.map((word) => {
                  const selected = isSelected(item, word);
                  const wrong = isWrong(item, word);

                  return (
                    <div
                      key={word}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() => handleSelect(item.id, word)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleSelect(item.id, word);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-disabled={showAns || lockedIds.includes(item.id)}
                      aria-label={`${selected ? "Unselect" : "Select"} and play ${word}`}
                      style={{
                        position: "relative",
                        padding: "6px 14px",
                        fontSize: "22px",
                        cursor:
                          showAns || lockedIds.includes(item.id)
                            ? "pointer"
                            : "pointer",
                        borderRadius: "50%",
                        border: selected
                          ? wrong
                            ? "2px solid red"
                            : "2px solid #f39b42"
                          : "2px solid transparent",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `word-${item.id}-${word}`}
                      />
                      {word}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
