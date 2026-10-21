import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import questionAudio from "../../../assets/audio/WorkBook/unit7/Page 39 - Exercise B/Item_001_Can_you_see_Tom.mp3";
import answerAudio from "../../../assets/audio/WorkBook/unit7/Page 39 - Exercise B/Item_002_No,_I_can't_see.mp3";

import mainImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 39/SVG/2.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    correct: "him",
    choices: ["him", "her", "it", "you"],
    position: { top: "12%", left: "77%" },
  },
  {
    id: 2,
    correct: "her",
    choices: ["him", "her", "it", "me"],
    position: { top: "38%", left: "72%" },
  },
  {
    id: 3,
    correct: "it",
    choices: ["it", "him", "you", "me"],
    position: { top: "66%", left: "77%" },
  },
  {
    id: 4,
    correct: "you",
    choices: ["you", "him", "her", "it"],
    position: { top: "91%", left: "78%" },
  },
];

export default function WB_NewVersion() {
  const [answers, setAnswers] = useState({});
  const [, setOpenId] = useState(null);
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setOpenId(null);
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((i) => answers[i.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    const correctIds = ITEMS.flatMap((i) =>
      answers[i.id] === i.correct ? [i.id] : [],
    );
    const incorrectIds = ITEMS.flatMap((i) =>
      answers[i.id] !== i.correct ? [i.id] : [],
    );
    const score = correctIds.length;

    setShowResults(true);
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);

    const total = ITEMS.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = i.correct;
    });

    setAnswers(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((i) => i.id));
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
      <div className="div-forall" style={{ gap: "50px" }}>
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Complete the sentences and write{" "}
              <span style={{ color: "#2e3192" }}>him</span>,{" "}
              <span style={{ color: "#2e3192" }}>her</span>,{" "}
              <span style={{ color: "#2e3192" }}>you</span>,{" "}
              <span style={{ color: "#2e3192" }}>me</span>, and{" "}
              <span style={{ color: "#2e3192" }}>it</span>.
            </>
          }
          subTitle="Use the object pronoun in each conversation to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* الصورة */}
        <div className="w-full" style={{ position: "relative" }}>
          <img
            src={mainImg}
            alt="Four short conversations between children and adults"
            style={{ width: "100%", height: "auto" }}
          />
          {[
            {
              key: "question",
              label: "Can you see Tom?",
              audio: questionAudio,
              top: "7%",
              left: "17%",
            },
            {
              key: "answer",
              label: "No, I can't see",
              audio: answerAudio,
              top: "7%",
              left: "48%",
            },
          ].map((area) => (
            <button
              type="button"
              key={area.key}
              aria-label={`Play: ${area.label}`}
              className="unit4-audio-control unit4-interactive"
              onClick={() => playAudio(area.key, area.audio)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  playAudio(area.key, area.audio);
                }
              }}
              style={{
                position: "absolute",
                top: area.top,
                left: area.left,
                width: "25%",
                height: "16%",
                border: 0,
                background: "transparent",
                borderRadius: 10,
              }}
            >
              <Unit4PlayingAudioIcon active={activeAudioKey === area.key} />
            </button>
          ))}

          {/* dropdowns */}
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "absolute",
                top: item.position.top,
                left: item.position.left,
                transform: "translate(-50%, -50%)",

                width: "120px",
              }}
            >
              {/* selected */}
              <select
                value={answers[item.id] || ""}
                onChange={(e) => handleSelect(item.id, e.target.value)}
                disabled={showAns || lockedIds.includes(item.id)}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "18px",
                  // borderRadius: "6px",
                  border: "none",
                  borderBottom: isWrong(item)
                    ? `2px solid ${WRONG_COLOR}`
                    : "1px solid gray",
                  background: "#fff",
                  cursor:
                    showAns || lockedIds.includes(item.id)
                      ? "default"
                      : "pointer",
                }}
              >
                <option value="" disabled>
                  Select...
                </option>
                {item.choices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>

              {/* wrong icon */}
              {isWrong(item) && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "-8px",
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
          ))}
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
