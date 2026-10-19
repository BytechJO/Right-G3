import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import image from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex A 1.svg";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "./Unit4PlayingAudioIcon";
import useUnit4Audio from "./useUnit4Audio";
import "./unit4Interactions.css";
import theyAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_002_they.mp3";
import thatAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_005_that.mp3";
import thisAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_006_this.mp3";
import motherAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_004_mother.mp3";
import brotherAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_010_brother.mp3";
import fatherAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_011_father.mp3";
import birthdayAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_009_birthday.mp3";
import bathAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_003_bath.mp3";
import thirstyAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_007_thirsty.mp3";
import thickAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_008_thick.mp3";
import thinAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise A/Item_012_thin.mp3";

const WORD_AUDIO = {
  they: theyAudio,
  that: thatAudio,
  this: thisAudio,
  mother: motherAudio,
  brother: brotherAudio,
  father: fatherAudio,
  birthday: birthdayAudio,
  bath: bathAudio,
  thirsty: thirstyAudio,
  thick: thickAudio,
  thin: thinAudio,
};

const Unit4_Page5_Q1 = () => {
  const [selected, setSelected] = useState([]);
  const [lockedWords, setLockedWords] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongWords, setWrongWords] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const [completed, setCompleted] = useState(false);
  // ✅ الكلمات + أماكنها (بالنسب)
  const words = [
    { id: "they", top: "23.32%", left: "32.21%", correct: true },
    { id: "that", top: "49.82%", left: "14.31%", correct: true },
    { id: "this", top: "48.10%", left: "43%", correct: true },
    { id: "mother", top: "30.25%", left: "59.5%", correct: true },
    { id: "brother", top: "65.43%", left: "79.94%", correct: true },
    { id: "father", top: "93.68%", left: "23.92%", correct: true },
    { id: "birthday", top: "73%", left: "60%", correct: true },

    // ❌ غلط
    { id: "bath", top: "10.53%", left: "79.13%", correct: false },
    { id: "thirsty", top: "73.42%", left: "16.03%", correct: false },
    { id: "thick", top: "73%", left: "38%", correct: false },
    { id: "thin", top: "92.48%", left: "45.68%", correct: false },
  ];

  const handleClick = (word) => {
    playAudio(`word-${word.id}`, WORD_AUDIO[word.id]);
    if (showAnswer || completed || lockedWords.includes(word.id)) return;
    const exists = selected.find((w) => w.id === word.id);

    if (exists) {
      setSelected(selected.filter((w) => w.id !== word.id));
    } else {
      setSelected([...selected, word]);
    }
    setWrongWords((prev) => prev.filter((id) => id !== word.id));
  };

  const handleCheck = () => {
    // ✅ بعد ما المستخدم يعمل Check ويجيب Full Score فقط
    if (showAnswer || completed) return;

    const correctWords = words.filter((w) => w.correct);
    const totalCorrect = correctWords.length;

    if (selected.length === 0) {
      ValidationAlert.info();
      return;
    }

    const selectedCorrect = selected.filter((word) => word.correct);
    const selectedWrong = selected.filter((word) => !word.correct);

    const wrong = selectedWrong.map((word) => word.id);

    // ✅ أي كلمة صح تنقفل بعد Check
    const correctSelectedIds = selectedCorrect.map((word) => word.id);

    setLockedWords((prev) => [...new Set([...prev, ...correctSelectedIds])]);

    setWrongWords(wrong);

    let finalScore = selectedCorrect.length - selectedWrong.length;

    if (finalScore < 0) {
      finalScore = 0;
    }

    // ✅ Full Score يتحقق فقط عند الضغط على Check
    const isFullScore =
      selectedCorrect.length === totalCorrect && selectedWrong.length === 0;

    if (isFullScore) {
      // ✅ من هون فقط نقفل Check Answer
      setCompleted(true);

      ValidationAlert.success(`
      Score: ${totalCorrect} / ${totalCorrect}
    `);

      return;
    }

    if (finalScore === 0) {
      ValidationAlert.error(`
      Score: ${finalScore} / ${totalCorrect}
    `);
    } else {
      ValidationAlert.warning(`
      Score: ${finalScore} / ${totalCorrect}
    `);
    }
  };
  const handleShowAnswer = () => {
    setShowAnswer(true);
    setLockedWords(words.filter((w) => w.correct).map((w) => w.id));
    setSelected(words.filter((w) => w.correct));
    setWrongWords([]);
    stopAudio();
  };

  const handleReset = () => {
    setSelected([]);
    setWrongWords([]);
    setLockedWords([]);
    setShowAnswer(false);
    setCompleted(false);
    stopAudio();
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
          gap: "30px",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Follow the words with the{" "}
              <span style={{ color: "#2e3192" }}>voiced th</span> sound.
            </>
          }
          subTitle="Say each word quietly, then follow only the words that contain the target th sound."
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1000px", // ⭐ تحكم بالحجم العام
            margin: "0 auto",
          }}
        >
          {/* الصورة */}
          <img
            src={image}
            alt="A word maze from Start to Finish with family and object picture clues"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
          {/* START */}
          <div
            style={{
              position: "absolute",
              top: "10.53%",
              left: "10.18%",
              transform: "translate(-50%, -50%) rotate(-15deg)",
              fontSize: "clamp(20px, 1vw, 16px)",
              fontWeight: "bold",
              pointerEvents: "none",
            }}
          >
            Start
          </div>

          {/* FINISH */}
          <div
            style={{
              position: "absolute",
              top: "82.75%",
              left: "88.65%",
              transform: "translate(-50%, -50%) rotate(-15deg)",
              fontSize: "clamp(20px, 1vw, 16px)",
              fontWeight: "bold",
              pointerEvents: "none",
            }}
          >
            Finish
          </div>
          {/* ✅ الدوائر */}
          {selected.map((word, i) => {
            const isWrong = wrongWords.includes(word.id);

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: word.top,
                  left: word.left,
                  width: "10%",
                  height: "16%",
                  border: `0.2vw solid ${isWrong ? "red" : "#1C398E"}`, // 🔥 التغيير
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              >
                {/* ❌ X */}
                {isWrong && (
                  <div
                    className="absolute top-2 -right-2 -translate-y-1/2
      w-[22px] h-[22px]
rounded-full
bg-[red] text-white
flex items-center justify-center
text-[12px] font-bold
border-2 border-white
shadow-[0_2px_6px_rgba(0,0,0,0.2)]
pointer-events-nonel"
                  >
                    ✕
                  </div>
                )}
              </div>
            );
          })}

          {/* ✅ مناطق الضغط */}
          {words.map((word, i) => {
            return (
              <div
                key={i}
                onClick={() => handleClick(word)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleClick(word);
                  }
                }}
                role="button"
                tabIndex={
                  showAnswer || completed || lockedWords.includes(word.id)
                    ? -1
                    : 0
                }
                aria-pressed={selected.some((entry) => entry.id === word.id)}
                aria-disabled={
                  showAnswer || completed || lockedWords.includes(word.id)
                }
                aria-label={`${word.id} word`}
                className="unit4-audio-control unit4-interactive"
                style={{
                  position: "absolute",
                  top: word.top,
                  left: word.left,
                  transform: "translate(-50%, -50%)",
                  fontSize: "clamp(10px, 1vw, 16px)",
                  padding: "0.2vw 0.6vw",
                  borderRadius: "0.5vw",
                  whiteSpace: "nowrap",
                  cursor:
                    showAnswer || completed || lockedWords.includes(word.id)
                      ? "default"
                      : "pointer",
                  border: "0.2vw solid orange",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `word-${word.id}`}
                />
                {word.id}
              </div>
            );
          })}

          {/* ✅ الكلمات */}
          {words.map((word, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: word.top,
                left: word.left,
                transform: "translate(-50%, -50%)",
                fontSize: "clamp(10px, 1vw, 16px)", // ⭐ responsive ذكي
                background: "white",
                padding: "0.2vw 0.6vw",
                borderRadius: "0.5vw",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {word.id}
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ BUTTONS */}
      <Button
        handleShowAnswer={handleShowAnswer}
        handleStartAgain={handleReset}
        checkAnswers={handleCheck}
      />
    </div>
  );
};

export default Unit4_Page5_Q1;
