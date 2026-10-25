import React, { useState } from "react";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import sentenceAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise B/Item_001_The_teacher_was_in_the_classroom.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const items = [
  {
    starter: "The teacher was in the classroom.",
    correct: [
      "Her name was Miss Rose.",
      "The classroom was quiet.",
      "No, they weren’t.",
      "No, there wasn’t.",
      "The students were outside.",
    ],
  },
];

export default function Review8_Page1_Q2() {
  // ✨ كل كلمة string بدل array
  const [answers, setAnswers] = useState(items[0].correct.map(() => ""));
  const [locked, setLocked] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const handleChange = (value, index) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };
  const resetAll = () => {
    setAnswers(items[0].correct.map(() => ""));
    setLocked(false);
    stopAudio();
  };

  const showAnswers = () => {
    setAnswers(items[0].correct);
    setLocked(true);
    stopAudio();
  };

  return (
    <div className="flex justify-center p-8">
      <div className="div-forall" style={{ gap: "30px" }}>
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Write about the picture."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />
        <p
          role="button"
          tabIndex={0}
          className="unit4-audio-control unit4-interactive"
          onClick={() => playAudio("starter", sentenceAudio)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              playAudio("starter", sentenceAudio);
            }
          }}
          style={{ fontSize: "20px", fontWeight: "500" }}
        >
          <Unit4PlayingAudioIcon active={activeAudioKey === "starter"} />
          {items[0].starter}
        </p>

        {answers.map((ans, i) => (
          <textarea
            key={i}
            value={ans}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-full border-b-2 mb-3"
            rows={1}
            disabled={locked}
            aria-label={`Sentence ${i + 2} about the classroom picture`}
          />
        ))}
        {/* buttons */}
        <div className="action-buttons-container">
          <button className="try-again-button" onClick={resetAll}>
            Start Again ↻
          </button>

          <button onClick={showAnswers} className="show-answer-btn">
            Show Answer
          </button>
        </div>
      </div>
    </div>
  );
}
