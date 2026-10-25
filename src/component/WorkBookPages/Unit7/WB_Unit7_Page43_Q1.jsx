import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise I/Item_001_Look_at.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise I/Item_002_Can_I_play_with.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise I/Item_003_I_can't_draw.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise I/Item_004_Please_play_with.mp3";

import sceneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/1.svg";

const WRONG_COLOR = "red";
const LINE_COLOR = "#000000ff";
const OPTIONS = ["me", "you", "it"];

// ✅ مواقع العناصر فوق الصورة (عدليهم حسب التصميم)
const ITEMS = [
  {
    id: 1,
    correct: "me",
    position: { top: "9%", left: "47%", leftAudio: "34%" },
    width: "20%",
    audio: audio1,
  },
  {
    id: 2,
    correct: "you",
    position: { top: "33%", left: "55%", leftAudio: "38%" },
    width: "19%",
    audio: audio2,
  },
  {
    id: 3,
    correct: "you",
    position: { top: "56%", left: "51%", leftAudio: "37%" },
    width: "16%",
    audio: audio3,
  },
  {
    id: 4,
    correct: "me",
    position: { top: "80%", left: "57%", leftAudio: "39%" },
    width: "20%",
    audio: audio4,
  },
];

export default function SB_LookReadWrite_PageI() {
  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((i) => selected[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    const correctIds = ITEMS.flatMap((i) =>
      selected[i.id] === i.correct ? [i.id] : [],
    );
    const incorrectIds = ITEMS.flatMap((i) =>
      selected[i.id] !== i.correct ? [i.id] : [],
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

    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((i) => i.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) => wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="I"
          title={
            <>
              Look, read, and write <span style={{ color: "#2e3192" }}>me</span>
              , <span style={{ color: "#2e3192" }}>you</span>, or{" "}
              <span style={{ color: "#2e3192" }}>it</span>.
            </>
          }
          subTitle="Use the me, you, or it in each speech bubble to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* 🖼️ الصورة + dropdowns */}
        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={sceneImg}
            alt="Four illustrated conversations between children and adults"
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          {ITEMS.map((item) => (
            <button
              type="button"
              key={`audio-${item.id}`}
              aria-label={`Play sentence ${item.id}`}
              className="unit4-audio-control unit4-interactive"
              onClick={() => playAudio(`sentence-${item.id}`, item.audio)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  playAudio(`sentence-${item.id}`, item.audio);
                }
              }}
              style={{
                position: "absolute",
                top: item.position.top,
                left: item.position.leftAudio,
                transform: "translate(-50%, -50%)",
                width: item.width,
                height: "10%",
                border: 0,
                background: "transparent",
                borderRadius: 10,
              }}
            >
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `sentence-${item.id}`}
              />
            </button>
          ))}

          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  position: "absolute",
                  top: item.position.top,
                  left: item.position.left,
                  transform: "translate(-50%, -50%)",
                  width: "clamp(70px, 7vw, 140px)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderBottom: wrong
                      ? `2px solid ${WRONG_COLOR}`
                      : `1px solid black`,
                  }}
                >
                  <select
                    value={selected[item.id] || ""}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    disabled={showAns || lockedIds.includes(item.id)}
                    style={{
                      width: "100%",
                      // border: "none",
                      // borderBottom: wrong
                      //   ? `2px solid ${WRONG_COLOR}`
                      //   : `1px solid black`,
                      // background: "#fff",
                      fontSize: "clamp(12px,1.5vw,18px)",
                      // fontWeight: 700,
                      padding: "4px",
                      // outline: "none",
                      // borderRadius: "6px",
                      cursor:
                        showAns || lockedIds.includes(item.id)
                          ? "default"
                          : "pointer",
                    }}
                  >
                    <option value="" disabled>
                      Select...
                    </option>
                    {OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  {/* ❌ wrong icon */}
                  {wrong && (
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
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
