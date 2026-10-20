import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 38/B.5.svg";
import sound1 from "../../../assets/audio/ClassBook/Grade 3/cd7pg38instruction-adult-lady_MkitoI5l.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import flAudio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise B/Item_001_fl.mp3";
import plAudio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise B/Item_002_pl.mp3";
import slAudio from "../../../assets/audio/WorkBook/unit6/Page 38 - Exercise B/Item_003_sl.mp3";
const BORDER_COLOR = "#e0e0e0";
const WRONG_COLOR = "#ef4444";
const SELECT_COLOR = "#f39b42";

const OPTIONS = ["fl", "pl", "sl"];
const OPTION_AUDIO = { fl: flAudio, pl: plAudio, sl: slAudio };
const IMAGE_ALT = {
  1: "A plate",
  2: "A fly",
  3: "A playground slide",
  4: "A potted plant",
  5: "A blue flag",
};

const ITEMS = [
  { id: 1, img: img1, correct: "pl" },
  { id: 2, img: img2, correct: "fl" },
  { id: 3, img: img3, correct: "sl" },
  { id: 4, img: img4, correct: "pl" },
  { id: 5, img: img5, correct: "fl" },
];

export default function WB_ListenAndCircle_PageB() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const captions = [
    { start: 0.58, end: 4.36, text: "Page 38, phonics exercise B." },
    { start: 4.36, end: 8.74, text: "Listen and circle FL, PL, or SL." },
    { start: 9.86, end: 11.78, text: "1- plate." },
    { start: 11.78, end: 14.64, text: "2- fly." },
    { start: 14.64, end: 17.7, text: "3- slide." },
    { start: 17.7, end: 21.6, text: "4- plant." },
    { start: 21.6, end: 23.6, text: "5- flag." },
  ];
  const handleSelect = (id, value) => {
    playAudio(`option-${id}-${value}`, OPTION_AUDIO[value]);
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });
    setShowResults(true);
    setLockedIds((previous) => [
      ...new Set([
        ...previous,
        ...ITEMS.filter((item) => answers[item.id] === item.correct).map(
          (item) => item.id,
        ),
      ]),
    ]);
    setWrongIds(
      ITEMS.filter((item) => answers[item.id] !== item.correct).map(
        (item) => item.id,
      ),
    );
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
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) =>
    showResults && !showAns && wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={
          {
            // gap: "50px",
          }
        }
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="B"
          title={
            <>
              Listen and circle <span style={{ color: "#2e3192" }}>fl</span>,{" "}
              <span style={{ color: "#2e3192" }}>pl</span>, or{" "}
              <span style={{ color: "#2e3192" }}>sl</span>.
            </>
          }
          subTitle="Listen carefully for the target sound, replay if needed, then choose the fl, pl, or sl beginning blend for each word that matches what you hear."
        />
        <div
          className="w-full"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <QuestionAudioPlayer
            pageId="wb-unit6-page38-q2"
            src={sound1}
            captions={captions}
            stopAtSecond={8.74}
          />
        </div>

        {/* ── Cards: 5 في صف ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
            gap: "clamp(10px,1.5vw,20px)",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item);

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                {/* الصورة */}
                <div
                  style={{
                    // width: "100%",
                    // aspectRatio: "1 / 1",
                    // border: `2px solid ${wrong ? WRONG_COLOR : BORDER_COLOR}`,
                    // borderRadius: "clamp(10px,1.2vw,16px)",
                    // overflow: "hidden",
                    // background: "#f9f9f9",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {/* رقم */}
                  <span
                    style={{
                      fontSize: "clamp(16px,1.8vw,24px)",
                      fontWeight: 700,
                      color: "#1e1e1eff",
                    }}
                  >
                    {item.id}
                  </span>
                  <img
                    src={item.img}
                    alt={IMAGE_ALT[item.id]}
                    style={{
                      width: "auto",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />

                  {/* Wrong badge */}
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

                {/* الخيارات: fl / pl / sl */}
                <div
                  style={{
                    width: "100%",
                    border: `2px solid ${BORDER_COLOR}`,
                    borderRadius: "8px",
                    padding: "clamp(4px,0.6vw,8px) clamp(6px,0.8vw,10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    background: "#fff",
                    boxSizing: "border-box",
                    gap: "2px",
                  }}
                >
                  {OPTIONS.map((opt) => {
                    const isSelected = answers[item.id] === opt;
                    const isCorrectShown = showAns && item.correct === opt;
                    const isWrongSelected =
                      wrong && !showAns && answers[item.id] === opt;

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(item.id, opt)}
                        aria-disabled={showAns || lockedIds.includes(item.id)}
                        className="unit4-audio-control unit4-interactive"
                        style={{
                          fontSize: "clamp(13px,1.5vw,19px)",
                          // fontWeight: isSelected || isCorrectShown ? 800 : 500,
                          color: isWrongSelected
                            ? WRONG_COLOR
                            : isSelected || isCorrectShown
                              ? "#111"
                              : "#555",
                          background: "transparent",
                          border:
                            isSelected || isCorrectShown
                              ? `2px solid ${isWrongSelected ? WRONG_COLOR : SELECT_COLOR}`
                              : "2px solid transparent",
                          borderRadius: "999px",
                          padding: "clamp(2px,0.4vw,5px) clamp(6px,0.8vw,10px)",
                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",
                          transition: "all 0.15s",
                          lineHeight: 1,
                          userSelect: "none",
                        }}
                      >
                        <Unit4PlayingAudioIcon
                          active={activeAudioKey === `option-${item.id}-${opt}`}
                        />
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
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
