import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/1.svg";
import img1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/2.svg";
import img2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/3.svg";
import img2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/4.svg";
import img3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/5.svg";
import img3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/6.svg";
import img4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/7.svg";
import img4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 53/SVG/8.svg";

import trueIcon from "../../../assets/imgs/true.svg";
import sentence1Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise E/Item_001_They_are_at_the_bus_stop.mp3";
import sentence2Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise E/Item_002_She_is_at_the_train_station.mp3";
import sentence3Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise E/Item_003_He_was_at_school.mp3";
import sentence4Audio from "../../../assets/audio/WorkBook/unit 9/Page 53 - Exercise E/Item_004_They_were_at_the_airport.mp3";
const ITEMS = [
  {
    id: 1,
    sentence: "They are at the bus stop.",
    options: [
      { id: "a", img: img1a },
      { id: "b", img: img1b },
    ],
    correct: "a",
    audio: sentence1Audio,
    optionAlts: [
      "People waiting at a bus stop",
      "People waiting at an airport",
    ],
  },
  {
    id: 2,
    sentence: "She is at the train station.",
    options: [
      { id: "a", img: img2a },
      { id: "b", img: img2b },
    ],
    correct: "b",
    audio: sentence2Audio,
    optionAlts: ["A woman at a bus stop", "A woman at a train station"],
  },
  {
    id: 3,
    sentence: "He was at school.",
    options: [
      { id: "a", img: img3a },
      { id: "b", img: img3b },
    ],
    correct: "b",
    audio: sentence3Audio,
    optionAlts: ["A boy at home", "A boy at school"],
  },
  {
    id: 4,
    sentence: "They were at the airport.",
    options: [
      { id: "a", img: img4a },
      { id: "b", img: img4b },
    ],
    correct: "b",
    audio: sentence4Audio,
    optionAlts: ["Travelers at a train station", "Travelers at an airport"],
  },
];

export default function WB_Unit8_Page53_QE() {
  const [answers, setAnswers] = useState({});
  const [, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (questionId, optionId) => {
    if (showAns || lockedIds.includes(questionId)) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
    setWrongIds((prev) => prev.filter((id) => id !== questionId));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });

    setChecked(true);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
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

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };
  const isWrongOption = (questionId, optionId, correctId) => {
    return (
      wrongIds.includes(questionId) &&
      answers[questionId] === optionId &&
      optionId !== correctId
    );
  };
  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "35px",
        }}
      >
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Read, look, and write <span style={{ color: "#D1232A" }}>✓</span>.
            </>
          }
          subTitle="Look at the picture that matches each past-location sentence first, compare all available options, then tap only the answer that matches."
        />

        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "32px 40px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#222",
                    minWidth: "18px",
                  }}
                >
                  {item.id}
                </span>

                <p
                  className="unit4-audio-control unit4-interactive"
                  role="button"
                  tabIndex={0}
                  aria-label={`Play: ${item.sentence}`}
                  onClick={() => playAudio(`sentence-${item.id}`, item.audio)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`sentence-${item.id}`, item.audio);
                    }
                  }}
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {item.sentence}
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `sentence-${item.id}`}
                  />
                </p>
              </div>

              <div
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {item.options.map((option) => (
                  <div
                    key={option.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* wrapper للصورة */}
                    <div
                      className="unit4-interactive"
                      role="radio"
                      aria-checked={answers[item.id] === option.id}
                      aria-disabled={lockedIds.includes(item.id)}
                      tabIndex={lockedIds.includes(item.id) ? -1 : 0}
                      onClick={() => handleSelect(item.id, option.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleSelect(item.id, option.id);
                        }
                      }}
                      style={{
                        position: "relative",

                        width: "170px",
                      }}
                    >
                      <img
                        src={option.img}
                        alt={item.optionAlts[option.id === "a" ? 0 : 1]}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          objectFit: "contain",
                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",
                        }}
                      />

                      {/* مربع الاختيار */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",

                          // ثابت مع الصورة نفسها
                          top: "0%",
                          right: "0%",

                          width: "clamp(32px,3.5vw,40px)",
                          height: "clamp(32px,3.5vw,40px)",

                          // backgroundColor: "#fff",
                          // border: "2px solid #f39b42",
                          // borderRadius: "8px",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",

                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",

                          zIndex: 2,
                          boxSizing: "border-box",

                          transition: "0.2s ease",
                        }}
                      >
                        {answers[item.id] === option.id && (
                          <img
                            src={trueIcon}
                            alt=""
                            style={{
                              width: "65%",
                              height: "65%",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </div>
                      {isWrongOption(item.id, option.id, item.correct) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
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
                            zIndex: 3,
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}
