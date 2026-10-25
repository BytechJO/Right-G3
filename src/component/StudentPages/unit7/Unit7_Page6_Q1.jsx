import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise D/Item_001_Look!_There's_a_car._Can_you_see.mp3";
import audio2 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise D/Item_002_There's_Mom._Can_you_see.mp3";
import audio3 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise D/Item_003_There_are_crayons._Can_you_see.mp3";
import audio4 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise D/Item_004_There_are_two_dogs._Can_you_see.mp3";
import audio5 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise D/Item_005_There_you_are._I_can_see.mp3";
import audio6 from "../../../assets/audio/ClassBook/Unit 7/Page 63 - Exercise D/Item_006_Here_we_are._Can_you_see.mp3";

const WORDS = ["them", "it", "you", "her", "us"];
const QUESTIONS = [
  { id: "1", before: "1. Look! There's a car. Can you see ", after: "?", correct: "it", audio: audio1 },
  { id: "2", before: "2. There's Mom. Can you see ", after: "?", correct: "her", audio: audio2 },
  { id: "3", before: "3. There are crayons. Can you see ", after: "?", correct: "them", audio: audio3 },
  { id: "4", before: "4. There are two dogs. Can you see ", after: "?", correct: "them", audio: audio4 },
  { id: "5", before: "5. There you are. I can see ", after: "!", correct: "you", audio: audio5 },
  { id: "6", before: "6. Here we are. Can you see ", after: "?", correct: "us", audio: audio6 },
];

const emptyAnswers = () => Object.fromEntries(QUESTIONS.map((question) => [question.id, ""]));

const Unit7_Page6_Q1 = () => {
  const [answers, setAnswers] = useState(emptyAnswers);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (lockedIds.includes(id) || showAnswer) return;
    setAnswers((previous) => ({ ...previous, [id]: value }));
    setWrongIds((previous) => previous.filter((item) => item !== id));
  };

  const checkAnswers = () => {
    if (showAnswer || lockedIds.length === QUESTIONS.length) return;
    if (QUESTIONS.some((question) => !answers[question.id])) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const correctIds = QUESTIONS.flatMap((question) => answers[question.id] === question.correct ? [question.id] : []);
    const incorrectIds = QUESTIONS.flatMap((question) => answers[question.id] !== question.correct ? [question.id] : []);
    setLockedIds(correctIds); setWrongIds(incorrectIds);
    const score = correctIds.length;
    ValidationAlert[score === QUESTIONS.length ? "success" : score ? "warning" : "error"](`Score: ${score} / ${QUESTIONS.length}`);
  };

  const handleShowAnswer = () => {
    setAnswers(Object.fromEntries(QUESTIONS.map((question) => [question.id, question.correct])));
    setLockedIds(QUESTIONS.map((question) => question.id)); setWrongIds([]); setShowAnswer(true); stopAudio();
  };
  const handleStartAgain = () => {
    setAnswers(emptyAnswers()); setLockedIds([]); setWrongIds([]); setShowAnswer(false); stopAudio();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "30px" }}>
      <div className="div-forall" style={{ gap: "0px" }}>
        <ExerciseHeader sectionLetter="D" title="Read and complete." subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking." />
        <div className="flex-1 bg-white rounded-2xl p-6 space-y-10 text-xl">
          {QUESTIONS.map((question) => {
            const locked = lockedIds.includes(question.id);
            const wrong = wrongIds.includes(question.id);
            return (
              <div key={question.id} className="unit4-audio-control unit4-interactive flex items-center gap-2 flex-wrap" role="button" tabIndex={0} aria-label={`Play sentence ${question.id}`} onClick={() => playAudio(`sentence-${question.id}`, question.audio)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); playAudio(`sentence-${question.id}`, question.audio); } }}>
                <Unit4PlayingAudioIcon active={activeAudioKey === `sentence-${question.id}`} />
                <span>{question.before}</span>
                <div className="relative inline-block">
                  <select value={answers[question.id]} disabled={locked || showAnswer} aria-label={`Answer for sentence ${question.id}`} onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()} onChange={(event) => handleChange(question.id, event.target.value)} className={`border-b-2 outline-none bg-transparent px-2 py-1 min-w-[120px] text-center font-semibold ${wrong ? "border-red-500" : "border-black"}`}>
                    <option value="">Select</option>
                    {WORDS.map((word) => <option key={word} value={word}>{word}</option>)}
                  </select>
                  {wrong && <span aria-hidden="true" style={{ position: "absolute", left: "105%", top: "50%", transform: "translateY(-50%)", width: 20, height: 20, background: "red", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", border: "2px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.2)", pointerEvents: "none", zIndex: 3 }}>✕</span>}
                </div>
                <span>{question.after}</span>
              </div>
            );
          })}
        </div>
        <Button handleShowAnswer={handleShowAnswer} handleStartAgain={handleStartAgain} checkAnswers={checkAnswers} />
      </div>
    </div>
  );
};

export default Unit7_Page6_Q1;
