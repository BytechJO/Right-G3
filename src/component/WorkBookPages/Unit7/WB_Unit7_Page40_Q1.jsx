import { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/6.svg";

const questions = [
  { id: 1, text: "Hansel likes", correct: "him", img: img1 },
  { id: 2, text: "Stella likes", correct: "her", img: img2 },
  { id: 3, text: "I like",       correct: "it",  img: img3 },
  { id: 4, text: "Tom likes",    correct: "him", img: img4 },
  { id: 5, text: "Look at",      correct: "it",  img: img5 },
  { id: 6, text: "Helen sits next to", correct: "her", img: img6 },
];

const correctAnswers = { 1:"him", 2:"her", 3:"it", 4:"him", 5:"it", 6:"her" };
const options = ["her", "him", "it"];

export default function WB_Unit7_Page40_Q1() {
  const [answers, setAnswers]       = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId, value) => {
    if (showAnswer) return;
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const checkAnswers = () => {
    if (Object.keys(answers).length < questions.length) {
      ValidationAlert.info("كمّل كل الفراغات أولاً");
      return;
    }
    let correct = 0;
    questions.forEach((q) => { if (answers[q.id] === correctAnswers[q.id]) correct++; });
    setShowResults(true);
    ValidationAlert.success(`Score: ${correct}/${questions.length}`);
  };

  const handleShowAnswer = () => { setAnswers(correctAnswers); setShowAnswer(true); };
  const handleStartAgain = () => { setAnswers({}); setShowAnswer(false); setShowResults(false); };

  const isWrong   = (id) => showResults && answers[id] && answers[id] !== correctAnswers[id];
  const isCorrect = (id) => showResults && answers[id] && answers[id] === correctAnswers[id];

  return (
    <div className="container-fluid px-3 px-md-4 py-3" style={{ maxWidth: 720 }}>

      {/* ── Title ── */}
      <h1
        className="text-center fw-bold mb-4"
        style={{ color: "#5b2d8e", fontSize: "clamp(1rem, 3vw, 1.4rem)" }}
      >
        Look, read and fill (her / him / it)
      </h1>

      {/* ── Questions ── */}
      <div className="d-flex flex-column gap-3">
        {questions.map((q) => {
          const selected = answers[q.id];

          return (
            <div
              key={q.id}
              className="d-flex align-items-center flex-wrap gap-2 pb-2 border-bottom"
            >
              {/* Number */}
              <span className="fw-bold" style={{ minWidth: "1.25rem" }}>
                {q.id}
              </span>

              {/* Image */}
              <img
                src={q.img}
                alt={`q${q.id}`}
                className="object-fit-contain flex-shrink-0"
                style={{ width: "clamp(48px,10vw,72px)", height: "clamp(48px,10vw,72px)" }}
              />

              {/* Body: text + blank + options */}
              <div className="d-flex align-items-center flex-wrap gap-2 flex-grow-1 position-relative">

                {/* Question text */}
                <span className="fw-semibold" style={{ fontSize: "clamp(0.85rem,2.5vw,1rem)" }}>
                  {q.text}
                </span>

                {/* Answer blank */}
                <div
                  className="text-center fw-bold border-bottom border-secondary px-2 "
                  style={{ minWidth: "4rem", fontSize: "clamp(0.85rem,2.5vw,1rem)" }}
                >
                  {selected || "___"}
                </div>

                {/* Option buttons */}
                <div className="d-flex gap-2 flex-wrap ms-1 ">
                  {options.map((opt) => {
                    const isSelected = selected === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(q.id, opt)}
                        className={`btn btn-sm rounded-pill px-3 ${
                          isSelected
                            ? "btn-success text-white"
                            : "btn-outline-secondary"
                        }`}
                        style={{ fontSize: "clamp(0.75rem,2vw,0.875rem)" }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Wrong indicator */}
                {isWrong(q.id) && (
                  <span className="text-danger fw-bold ms-1">✕</span>
                )}

                {/* Correct indicator */}
                {isCorrect(q.id) && (
                  <span className="text-success fw-bold ms-1">✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Action Buttons ── */}
      <div className="mt-4">
        <Button
          checkAnswers={checkAnswers}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleStartAgain}
        />
      </div>
    </div>
  );
}