import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 54/SVG/4.svg";
import yesAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise G/Item_001_Yes,_they_are.mp3";
import noAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise G/Item_002_No,_they_aren't.mp3";
import clinicAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise G/Item_003_Are_they_at_the_clinic.mp3";
import circusAudio from "../../../assets/audio/WorkBook/unit 9/Page 54 - Exercise G/Item_004_Are_they_at_the_circus.mp3";

const YELLOW_COLOR = "#f39b42";
const RED_COLOR = "#ef4444";
const TEXT_COLOR = "#222";

const DATA = [
  {
    id: 1,
    question: "Are they on the playground?",
    img: img1,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "Yes, they are.",
    alt: "Children playing on a playground",
  },
  {
    id: 2,
    question: "Are they at the zoo?",
    img: img2,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "No, they aren't.",
    alt: "Children in a classroom",
  },
  {
    id: 3,
    question: "Are they at the clinic?",
    img: img3,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "Yes, they are.",
    alt: "Children visiting a clinic",
    questionAudio: clinicAudio,
  },
  {
    id: 4,
    question: "Are they at the circus?",
    img: img4,
    options: ["Yes, they are.", "No, they aren't."],
    correct: "No, they aren't.",
    alt: "Children at a clothing store",
    questionAudio: circusAudio,
  },
];

const initialSelections = { 1: null, 2: null, 3: null, 4: null };

const WB_Unit9_Page54_QG = () => {
  const [userSelections, setUserSelections] = useState(initialSelections);
  const [showAnswers, setShowAnswers] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, option) => {
    if (showAnswers || lockedIds.includes(id)) return;
    setUserSelections((prev) => ({ ...prev, [id]: option }));
    setWrongAnswers((prev) => ({ ...prev, [id]: false }));
    playAudio(
      `answer-${id}-${option}`,
      option.startsWith("Yes") ? yesAudio : noAudio,
    );
  };

  const checkAnswers = () => {
    if (showAnswers || lockedIds.length === DATA.length) return;

    const allAnswered = DATA.every((item) => userSelections[item.id] !== null);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }
    let score = 0;
    const newWrong = {};
    DATA.forEach((item) => {
      if (userSelections[item.id] === item.correct) {
        score++;
        newWrong[item.id] = false;
      } else {
        newWrong[item.id] = true;
      }
    });
    setWrongAnswers(newWrong);
    setCheckedAnswers(true);
    setLockedIds((prev) => [
      ...new Set([
        ...prev,
        ...DATA.filter((item) => userSelections[item.id] === item.correct).map(
          (item) => item.id,
        ),
      ]),
    ]);
    if (score === DATA.length)
      ValidationAlert.success(`Score: ${score} / ${DATA.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${DATA.length}`);
    else ValidationAlert.error(`Score: ${score} / ${DATA.length}`);
  };

  const handleShowAnswer = () => {
    const answers = {};
    DATA.forEach((item) => {
      answers[item.id] = item.correct;
    });
    setUserSelections(answers);
    setShowAnswers(true);
    setCheckedAnswers(false);
    setWrongAnswers({});
    setLockedIds(DATA.map((item) => item.id));
  };

  const handleStartAgain = () => {
    setUserSelections(initialSelections);
    setShowAnswers(false);
    setWrongAnswers({});
    setCheckedAnswers(false);
    setLockedIds([]);
    stopAudio();
  };

  // ── لون وشكل كل option ──
  const getOptionStyle = (item, option) => {
    const isSelected = userSelections[item.id] === option;
    const isCorrect = option === item.correct;
    const isWrongSelected =
      checkedAnswers && wrongAnswers[item.id] && isSelected;

    const base = {
      position: "relative",
      background: "transparent",
      border: "1px solid transparent",
      borderRadius: "999px",
      padding: "clamp(4px,0.6vw,8px)",
      fontSize: "18px",
      // fontWeight: "500",
      // color: TEXT_COLOR,
      cursor:
        showAnswers || lockedIds.includes(item.id) ? "default" : "pointer",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
    };

    if (showAnswers && isCorrect)
      return { ...base, border: `1px solid ${YELLOW_COLOR}` };
    if (isWrongSelected) return { ...base, border: `2px solid ${RED_COLOR}` };
    if (isSelected) return { ...base, border: `1px solid ${YELLOW_COLOR}` };
    return base;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "10px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="G"
          title="Read, look, and circle."
          subTitle="Look at the Yes/No answer to each Are they question first, compare all available options, then tap only the answer that matches."
        />

        {/* Grid 2×2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "10px",
            width: "100%",
          }}
        >
          {DATA.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px",
                // minWidth: 0,
              }}
            >
              {/* ── السؤال ── */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(6px,0.8vw,10px)",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: TEXT_COLOR,
                    flexShrink: 0,
                  }}
                >
                  {item.id}
                </span>
                <span
                  className={
                    item.questionAudio
                      ? "unit4-audio-control unit4-interactive"
                      : undefined
                  }
                  role={item.questionAudio ? "button" : undefined}
                  tabIndex={item.questionAudio ? 0 : undefined}
                  aria-label={
                    item.questionAudio ? `Play: ${item.question}` : undefined
                  }
                  onClick={
                    item.questionAudio
                      ? () =>
                          playAudio(`question-${item.id}`, item.questionAudio)
                      : undefined
                  }
                  onKeyDown={
                    item.questionAudio
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            playAudio(
                              `question-${item.id}`,
                              item.questionAudio,
                            );
                          }
                        }
                      : undefined
                  }
                  style={{
                    fontSize: "18px",
                    // fontWeight: "500",
                    color: TEXT_COLOR,
                    lineHeight: 1.3,
                  }}
                >
                  {item.question}
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `question-${item.id}`}
                  />
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <img
                  src={item.img}
                  alt={item.alt}
                  style={{
                    width: "auto",
                    height: "120px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />

                {/* ── الخيارات تحت الصورة ── */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    // gap: "clamp(6px,1vw,10px)",
                    // width: "50%",
                    // marginTop: "clamp(2px,0.4vw,6px)",
                  }}
                >
                  {item.options.map((option) => {
                    const isWrongSelected =
                      checkedAnswers &&
                      wrongAnswers[item.id] &&
                      userSelections[item.id] === option;

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(item.id, option)}
                        onKeyDown={(event) => {
                          if (
                            (event.key === "Enter" || event.key === " ") &&
                            !lockedIds.includes(item.id)
                          ) {
                            event.preventDefault();
                            handleSelect(item.id, option);
                          }
                        }}
                        tabIndex={lockedIds.includes(item.id) ? -1 : 0}
                        aria-disabled={lockedIds.includes(item.id)}
                        className="unit4-audio-control unit4-interactive"
                        style={getOptionStyle(item, option)}
                      >
                        {option}
                        <Unit4PlayingAudioIcon
                          active={
                            activeAudioKey === `answer-${item.id}-${option}`
                          }
                        />

                        {/* ✕ badge للإجابة الخاطئة */}
                        {isWrongSelected && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: "red",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: "700",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                              boxSizing: "border-box",
                            }}
                          >
                            ✕
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(4px,1vw,12px)",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default WB_Unit9_Page54_QG;
