import React, { useState } from "react";
import "./Unit4_Page5_Q2.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 32/Ex B 4.svg";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "./Unit4PlayingAudioIcon";
import useUnit4Audio from "./useUnit4Audio";
import "./unit4Interactions.css";
import hisAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_001_His.mp3";
import ourAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_002_Our.mp3";
import capAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_003_cap.mp3";
import fliesAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_004_flies_away.mp3";
import theirAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_005_Their.mp3";
import herAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_006_Her.mp3";
import petsAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_007_pets.mp3";
import funAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_008_have_fun.mp3";
import petAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_009_pet.mp3";
import winsAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_010_wins_the_race.mp3";
import feetAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_011_feet.mp3";
import hurtAudio from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/Item_012_hurt.mp3";
import full1 from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/full1.mp3";
import full2 from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/full2.mp3";
import full3 from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/full3.mp3";
import full4 from "../../../assets/audio/ClassBook/Unit 4/Page 32 - Exercise B/full4.mp3";

const OPTION_AUDIO = { His: hisAudio, Our: ourAudio, Their: theirAudio, Her: herAudio };
const WORD_AUDIO = { cap: capAudio, pets: petsAudio, pet: petAudio, feet: feetAudio };
const REST_AUDIO = { "flies away.": fliesAudio, "have fun.": funAudio, "wins the race.": winsAudio, "hurt.": hurtAudio };
const FULL_AUDIO = [full1, full2, full3, full4];
const IMAGE_ALTS = ["A boy reaching for a cap blowing away", "Two girls with their pet rabbit", "A girl watching her pets race", "Two boys with injured feet"];
const questions = [
  {
    id: 1,
    image: img1,
    options: ["His", "Our"],
    correct: "His",
    word: "cap",
    rest: "flies away.",
  },
  {
    id: 2,
    image: img2,
    options: ["Their", "Her"],
    correct: "Their",
    word: "pets",
    rest: "have fun.",
  },
  {
    id: 3,
    image: img3,
    options: ["His", "Her"],
    correct: "Her",
    word: "pet",
    rest: "wins the race.",
  },
  {
    id: 4,
    image: img4,
    options: ["Our", "His"],
    correct: "Our",
    word: "feet",
    rest: "hurt.",
  },
];
const Unit4_Page5_Q2 = () => {
  const [showResult, setShowResult] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [answers, setAnswers] = useState({});
  const [wrong, setWrong] = useState({});
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const handleSelect = (qIndex, option) => {
    playAudio(`option-${qIndex}-${option}`, OPTION_AUDIO[option]);
    if (lockedIds.includes(qIndex)) return;

    setAnswers({
      ...answers,
      [qIndex]: option,
    });
    setWrong((prev) => ({ ...prev, [qIndex]: false }));
  };
  // ===============================
  // 🔵 4) فحص الإجابات
  // ===============================
  const checkAnswers = () => {
    if (lockedIds.length === questions.length) return;

    if (Object.keys(answers).length !== questions.length) {
      return ValidationAlert.info("Oops!", "Please answer all questions.");
    }

    let correct = 0;
    const wrongMap = {};

    questions.forEach((q, qIndex) => {
      if (answers[qIndex] === q.correct) {
        correct++;
      } else {
        wrongMap[qIndex] = true;
      }
    });

    setWrong(wrongMap);
    setShowResult(true);
    setLockedIds(questions.map((q, index) => answers[index] === q.correct ? index : null).filter((id) => id !== null));

    const total = questions.length;
    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    ValidationAlert[
      correct === total ? "success" : correct === 0 ? "error" : "warning"
    ](`<b style="color:${color}">Score: ${correct} / ${total}</b>`);
  };
  const showAnswers = () => {
    const filled = {};
    questions.forEach((q, i) => {
      filled[i] = q.correct;
    });

    setAnswers(filled);
    setShowResult(true);
    setWrong({});
    setLockedIds(questions.map((_, index) => index));
    stopAudio();
  };
  const reset = () => {
    setAnswers({});
    setWrong({});
    setShowResult(false);
    setLockedIds([]);
    stopAudio();
  };

  // ===============================
  // 🔵 JSX
  // ===============================
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
          
          gap: "50px",
        
        }}
      >
        <ExerciseHeader
          sectionLetter="B"
          title="Look, read, and choose."
          subTitle="Read the clue and check the picture, then tap the one option that fits best."
        />
        <div className="grid grid-cols-2 gap-20 w-full">
          {questions.map((q, qIndex) => (
            <div
              key={q.id}
              className={`flex items-center gap-4 unit4-audio-control ${lockedIds.includes(qIndex) ? "unit4-full-audio-enabled" : ""}`}
              role={lockedIds.includes(qIndex) ? "button" : undefined}
              tabIndex={lockedIds.includes(qIndex) ? 0 : -1}
              onClick={() => lockedIds.includes(qIndex) && playAudio(`full-${q.id}`, FULL_AUDIO[qIndex])}
              onKeyDown={(event) => {
                if (lockedIds.includes(qIndex) && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  playAudio(`full-${q.id}`, FULL_AUDIO[qIndex]);
                }
              }}
            >
              <Unit4PlayingAudioIcon active={activeAudioKey === `full-${q.id}`} />
              <div className="flex gap-2 items-start">
              <span className="text-[20px]" style={{ fontWeight: "bold" }}>{q.id}</span>
              {/* الصورة */}
              <img
                src={q.image}
                alt={IMAGE_ALTS[qIndex]}
                style={{
                  width: "150px",
                  height: "100%",
                }}
              />
</div>
              {/* الخيارات فوق بعض */}
              <div className="flex flex-col gap-2">
                {q.options.map((opt, i) => {
                  const isSelected = answers[qIndex] === opt;
                  const isWrong = wrong[qIndex];

                  return (
                    <div
                      key={i}
                      onClick={(event) => { event.stopPropagation(); handleSelect(qIndex, opt); }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          handleSelect(qIndex, opt);
                        }
                      }}
                      role="button"
                      tabIndex={lockedIds.includes(qIndex) ? -1 : 0}
                      aria-pressed={isSelected}
                      className="unit4-audio-control unit4-interactive"
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        padding: "2px 6px",
                        width: "fit-content",
                      }}
                    >
                      <Unit4PlayingAudioIcon active={activeAudioKey === `option-${qIndex}-${opt}`} />
                      {/* النص */}
                      <span
                        style={{
                          color: "black",
                          fontSize: "18px",
                        }}
                      >
                        {opt}
                      </span>

                      {/* ✅ الدائرة */}
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "50px",
                            height: "50px",
                            border: `2px solid ${isWrong ? "red" : "#1C398E"}`,
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            pointerEvents: "none",
                          }}
                        >
                          {/* ❌ X */}
                          {showResult && isWrong && (
                            <div
                             className="absolute top-0 -right-3 -translate-y-1/2
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
                      )}
                    </div>
                  );
                })}
              </div>

              {/* الخط الأول */}
              <div
                style={{
                  width: "1px", // ⭐ أهم تعديل
                  height: "80px", // ⭐ مرتبط بالنص
                  background: "#444",
                  alignSelf: "center",
                }}
              />

              {/* الكلمة */}
              <span className="text-[18px] unit4-audio-control unit4-interactive" role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); playAudio(`word-${q.id}`, WORD_AUDIO[q.word]); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); playAudio(`word-${q.id}`, WORD_AUDIO[q.word]); } }}>
                <Unit4PlayingAudioIcon active={activeAudioKey === `word-${q.id}`} />{q.word}
              </span>

              {/* الخط الثاني */}
              <div
                style={{
                  width: "1px", // ⭐ أهم تعديل
                  height: "80px", // ⭐ مرتبط بالنص
                  background: "#444",
                  alignSelf: "center",
                }}
              />

              {/* باقي الجملة */}
              <span className="text-[18px] unit4-audio-control unit4-interactive" role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); playAudio(`rest-${q.id}`, REST_AUDIO[q.rest]); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); playAudio(`rest-${q.id}`, REST_AUDIO[q.rest]); } }}>
                <Unit4PlayingAudioIcon active={activeAudioKey === `rest-${q.id}`} />{q.rest}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={reset}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Unit4_Page5_Q2;
