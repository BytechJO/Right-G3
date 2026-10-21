import { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import q1Audio from "../../../assets/audio/ClassBook/Unit 7/Page 62 - Exercise B/Item_001_Our_teacher_likes_us_we.mp3";
import q2Audio from "../../../assets/audio/ClassBook/Unit 7/Page 62 - Exercise B/Item_002_Can_you_see_me_I.mp3";
import q3Audio from "../../../assets/audio/ClassBook/Unit 7/Page 62 - Exercise B/Item_003_I_don't_like_snakes,_but_my_brother_likes_them_they.mp3";
import q4Audio from "../../../assets/audio/ClassBook/Unit 7/Page 62 - Exercise B/Item_004_My_friend_likes_I_me.mp3";

const QUESTIONS = [
  {
    id: 1,
    text: "Our teacher likes",
    options: ["us", "we"],
    correct: "us",
    audio: q1Audio,
  },
  {
    id: 2,
    text: "Can you see",
    options: ["me", "I"],
    correct: "me",
    audio: q2Audio,
  },
  {
    id: 3,
    text: "I don’t like snakes, but my brother likes",
    options: ["them", "they"],
    correct: "them",
    audio: q3Audio,
  },
  {
    id: 4,
    text: "My friend likes",
    options: ["I", "me"],
    correct: "me",
    audio: q4Audio,
  },
];

const Unit7_Page5_Q3 = () => {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (questionId, option) => {
    if (lockedIds.includes(questionId) || showAnswer) return;
    setAnswers((previous) => ({ ...previous, [questionId]: option }));
    setWrongIds((previous) => previous.filter((id) => id !== questionId));
  };

  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === QUESTIONS.length) return;
    if (QUESTIONS.some((question) => !answers[question.id])) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    const correctIds = QUESTIONS.flatMap((question) =>
      answers[question.id] === question.correct ? [question.id] : [],
    );
    const incorrectIds = QUESTIONS.flatMap((question) =>
      answers[question.id] !== question.correct ? [question.id] : [],
    );
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);
    const score = correctIds.length;
    ValidationAlert[
      score === QUESTIONS.length ? "success" : score ? "warning" : "error"
    ](`Score: ${score} / ${QUESTIONS.length}`);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAnswer(false);
    stopAudio();
  };
  const handleShowAnswer = () => {
    setAnswers(
      Object.fromEntries(
        QUESTIONS.map((question) => [question.id, question.correct]),
      ),
    );
    setLockedIds(QUESTIONS.map((question) => question.id));
    setWrongIds([]);
    setShowAnswer(true);
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
      <div className="div-forall" style={{ gap: "45px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title="Read and choose."
          subTitle="Read each sentence, identify the object, then tap the correct object pronoun."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "38px" }}>
          {QUESTIONS.map((question) => {
            const locked = lockedIds.includes(question.id);
            return (
              <div
                key={question.id}
                className="unit4-audio-control unit4-interactive"
                role="button"
                tabIndex={0}
                aria-label={`Play question ${question.id}`}
                onClick={() =>
                  playAudio(`question-${question.id}`, question.audio)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`question-${question.id}`, question.audio);
                  }
                }}
                style={{
                  fontSize: "22px",
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                  width: "fit-content",
                  borderRadius: 10,
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `question-${question.id}`}
                />
                <span>
                  {question.id}. {question.text}{" "}
                </span>
                {question.options.map((option, index) => {
                  const selected = answers[question.id] === option;
                  const wrong = wrongIds.includes(question.id) && selected;
                  return (
                    <span key={`${question.id}-${option}`}>
                      <button
                        type="button"
                        tabIndex={locked ? -1 : 0}
                        aria-pressed={selected}
                        aria-disabled={locked}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSelect(question.id, option);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            event.stopPropagation();
                            handleSelect(question.id, option);
                          }
                        }}
                        className="unit4-interactive"
                        style={{
                          cursor: locked ? "default" : "pointer",
                          margin: "0 5px",
                          padding: "2px 10px",
                          borderRadius: "50px",
                          background: "transparent",
                          border: selected
                            ? `2px solid ${wrong ? "red" : "#F79530"}`
                            : "2px solid transparent",
                          fontWeight: "bold",
                        }}
                      >
                        {option}
                      </button>
                      {index === 0 && " / "}
                    </span>
                  );
                })}
                {wrongIds.includes(question.id) && (
                  <span
                    aria-hidden="true"
                    style={{
                      marginLeft: 8,
                      width: 20,
                      height: 20,
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: "bold",
                      border: "2px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <Button
          checkAnswers={checkAnswers}
          handleStartAgain={handleStartAgain}
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </div>
  );
};

export default Unit7_Page5_Q3;
