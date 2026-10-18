/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import "./Unit3_Page6_Q2.css";
import "./unit3Interactions.css";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import ExerciseHeader from "../../ExerciseHeader";
import Unit3PlayingAudioIcon from "./Unit3PlayingAudioIcon";
import useUnit3Audio from "./useUnit3Audio";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";
import row1FirstAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_001_There_are_a_few_cars_in_the_street.mp3";
import row1SecondAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_002_The_street_is_full.mp3";
import row2FirstAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_003_Maria_makes_very_few_mistakes.mp3";
import row2SecondAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_004_She's_an_excellent_student.mp3";
import row3FirstAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_005_There_is_little_light_outside.mp3";
import row3SecondAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_006_It_is_almost_dark.mp3";
import row4FirstAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_007_On_Mondays,_there_are_few_people_at_the_theater.mp3";
import row4SecondAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_008_The_theater_is_full.mp3";
import row5FirstAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_009_There_is_little_food_in_the_fridge.mp3";
import row5SecondAudio from "../../../assets/audio/ClassBook/Unit 3/Page 27 - Exercise E/Item_010_It_is_almost_empty.mp3";

const data = [
  {
    id: 1,
    text: "There are a few cars in the street.",
    textAudio: row1FirstAudio,
    secondText: "The street is full.",
    secondAudio: row1SecondAudio,
    correct: false,
  },
  {
    id: 2,
    text: "Maria makes very few mistakes.",
    textAudio: row2FirstAudio,
    secondText: "She’s an excellent student.",
    secondAudio: row2SecondAudio,
    correct: true,
  },
  {
    id: 3,
    text: "There is little light outside.",
    textAudio: row3FirstAudio,
    secondText: "It is almost dark.",
    secondAudio: row3SecondAudio,
    correct: true,
  },
  {
    id: 4,
    text: "On Mondays, there are few people at the theater.",
    textAudio: row4FirstAudio,
    secondText: "The theater is full.",
    secondAudio: row4SecondAudio,
    correct: false,
  },
  {
    id: 5,
    text: "There is little food in the fridge.",
    textAudio: row5FirstAudio,
    secondText: "It is almost empty.",
    secondAudio: row5SecondAudio,
    correct: true,
  },
];

function SentenceAudio({
  children,
  audioKey,
  source,
  activeAudioKey,
  playAudio,
}) {
  return (
    <button
      type="button"
      className="unit3-audio-control unit3-interactive text-gray-900 text-[20px] cursor-pointer bg-transparent text-left"
      onClick={() => playAudio(audioKey, source)}
      aria-label={`Play: ${children}`}
    >
      {children}
      <Unit3PlayingAudioIcon active={activeAudioKey === audioKey} />
    </button>
  );
}

const Unit3_Page6_Q2 = () => {
  const [selected, setSelected] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit3Audio();

  const handleSelect = (questionId, value) => {
    if (showAnswer || correctIds.includes(questionId)) return;
    setSelected((previous) => ({ ...previous, [questionId]: value }));
    setCheckedIds((previous) => previous.filter((id) => id !== questionId));
  };

  const checkAnswers = () => {
    if (showAnswer || correctIds.length === data.length) return;
    if (data.some((question) => selected[question.id] === undefined)) {
      ValidationAlert.info();
      return;
    }

    const nextCorrectIds = data
      .filter((question) => selected[question.id] === question.correct)
      .map((question) => question.id);
    const correct = nextCorrectIds.length;
    const total = data.length;
    setCorrectIds(nextCorrectIds);
    setCheckedIds(data.map((question) => question.id));

    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    else if (correct === 0)
      ValidationAlert.error(`Score: ${correct} / ${total}`);
    else ValidationAlert.warning(`Score: ${correct} / ${total}`);
  };

  const showAnswers = () => {
    setSelected(
      Object.fromEntries(
        data.map((question) => [question.id, question.correct]),
      ),
    );
    setCheckedIds(data.map((question) => question.id));
    setCorrectIds(data.map((question) => question.id));
    setShowAnswer(true);
    stopAudio();
  };

  const reset = () => {
    setSelected({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAnswer(false);
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
      <div className="div-forall mb-10" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Read the first sentences carefully. Are the second sentences right
              or wrong? Write <span style={{ color: "#D1232A" }}>✓</span> or{" "}
              <span style={{ color: "#D1232A" }}>✗</span>.
            </>
          }
          subTitle="Read each statement and compare it with the picture or sentence before choosing the two-way answer."
        />

        <div className="w-full max-w-3xl space-y-6 mt-7">
          {data.map((question) => (
            <div key={question.id} className="flex justify-between items-start">
              <div className="flex gap-3">
                <span className="font-bold">{question.id}</span>
                <div className="flex flex-col">
                  <SentenceAudio
                    audioKey={`first-${question.id}`}
                    source={question.textAudio}
                    activeAudioKey={activeAudioKey}
                    playAudio={playAudio}
                  >
                    {question.text}
                  </SentenceAudio>
                  <SentenceAudio
                    audioKey={`second-${question.id}`}
                    source={question.secondAudio}
                    activeAudioKey={activeAudioKey}
                    playAudio={playAudio}
                  >
                    {question.secondText}
                  </SentenceAudio>
                </div>
              </div>

              <div
                className="flex gap-2"
                role="group"
                aria-label={`Answer for item ${question.id}`}
              >
                {[true, false].map((value) => {
                  const isSelected = selected[question.id] === value;
                  const isWrong =
                    checkedIds.includes(question.id) &&
                    isSelected &&
                    question.correct !== value;
                  return (
                    <button
                      type="button"
                      key={String(value)}
                      aria-label={value ? "Right" : "Wrong"}
                      aria-pressed={isSelected}
                      aria-disabled={
                        showAnswer || correctIds.includes(question.id)
                      }
                      onClick={() => handleSelect(question.id, value)}
                      className={`unit3-interactive relative w-[45px] h-[45px] border-2 rounded-md cursor-pointer flex items-center justify-center ${isSelected ? (isWrong ? "border-red-500" : "border-orange-400") : "border-gray-300"}`}
                    >
                      {isSelected && (
                        <img
                          src={value ? trueIcon : falseIcon}
                          alt=""
                          style={{ height: "25px" }}
                        />
                      )}
                      {isWrong && (
                        <span
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
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons-container">
        <button className="try-again-button" onClick={reset}>
          Start Again ↻
        </button>
        <button onClick={showAnswers} className="show-answer-btn">
          Show Answer
        </button>
        <button className="check-button2" onClick={checkAnswers}>
          Check Answer ✓
        </button>
      </div>
    </div>
  );
};

export default Unit3_Page6_Q2;
