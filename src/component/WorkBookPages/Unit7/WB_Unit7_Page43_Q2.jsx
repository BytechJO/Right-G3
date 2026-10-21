import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import busAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_001_bus_station.mp3";
import streetAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_002_street.mp3";
import musicAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_003_music_room.mp3";
import classAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_004_class.mp3";
import fieldAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_005_soccer_field.mp3";
import cafeteriaAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_006_cafeteria.mp3";
import labAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_007_computer_lab.mp3";
import libraryAudio from "../../../assets/audio/WorkBook/unit7/Page 43 - Exercise J/Item_008_library.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/8.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/7.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/6.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/9.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/10.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 43/SVG/5.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";
const OPTION_AUDIO = {
  "bus station": busAudio,
  street: streetAudio,
  "music room": musicAudio,
  class: classAudio,
  "soccer field": fieldAudio,
  cafeteria: cafeteriaAudio,
  "computer lab": labAudio,
  library: libraryAudio,
};

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["bus station", "music room", "computer lab"],
    correct: "music room",
    alt: "A music room",
  },
  {
    id: 2,
    img: img2,
    options: ["street", "class", "cafeteria"],
    correct: "cafeteria",
    alt: "A school cafeteria",
  },
  {
    id: 3,
    img: img3,
    options: ["bus station", "soccer field", "library"],
    correct: "bus station",
    alt: "A bus station",
  },
  {
    id: 4,
    img: img4,
    options: ["soccer field", "music room", "cafeteria"],
    correct: "soccer field",
    alt: "A soccer field",
  },
  {
    id: 5,
    img: img5,
    options: ["computer lab", "class", "street"],
    correct: "class",
    alt: "A classroom",
  },
  {
    id: 6,
    img: img6,
    options: ["soccer field", "bus station", "computer lab"],
    correct: "computer lab",
    alt: "A computer lab",
  },
];

export default function WB_LookReadCircle_PageJ() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
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
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const getOptionStyle = (item, opt) => {
    const isSelected = answers[item.id] === opt;
    const isWrong = wrongIds.includes(item.id) && answers[item.id] === opt;
    const isCorrectShown = showAns && opt === item.correct;

    if (isWrong) {
      return {
        border: `1px solid ${WRONG_COLOR}`,
        // color: WRONG_COLOR,
      };
    }
    if (isSelected || isCorrectShown) {
      return {
        border: `1px solid ${BORDER_COLOR}`,
        color: "#111",
      };
    }
    return {
      border: "1px solid transparent",
      color: "#444",
    };
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "35px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="J"
          title="Look, read, and circle."
          subTitle="Look at the school room or place that matches each picture first, compare all available options, then tap only the answer that matches."
        />

        {/* ── Grid 3×2 ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "30px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(6px,0.8vw,10px)",
              }}
            >
              <div className="flex gap-2">
                {/* رقم */}
                <span
                  style={{
                    fontSize: "clamp(16px,1.8vw,24px)",
                    fontWeight: 700,
                    color: "#111",
                    alignSelf: "flex-start",
                  }}
                >
                  {item.id}
                </span>

                {/* الصورة */}

                <img
                  src={item.img}
                  alt={item.alt}
                  style={{
                    width: "180px",
                    height: "auto",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* الخيارات */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "clamp(4px,0.5vw,7px)",
                  width: "100%",
                }}
              >
                {item.options.map((opt) => {
                  const isSelected = answers[item.id] === opt;
                  const isWrong =
                    wrongIds.includes(item.id) && answers[item.id] === opt;

                  return (
                    <div
                      key={opt}
                      style={{ position: "relative", width: "100%" }}
                    >
                      <button
                        type="button"
                        tabIndex={
                          lockedIds.includes(item.id) || showAns ? -1 : 0
                        }
                        aria-pressed={isSelected}
                        className="unit4-audio-control unit4-interactive"
                        onClick={() => {
                          playAudio(
                            `option-${item.id}-${opt}`,
                            OPTION_AUDIO[opt],
                          );
                          handleSelect(item.id, opt);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            playAudio(
                              `option-${item.id}-${opt}`,
                              OPTION_AUDIO[opt],
                            );
                            handleSelect(item.id, opt);
                          }
                        }}
                        style={{
                          width: "100%",
                          padding:
                            "clamp(4px,0.6vw,8px) clamp(10px,1.2vw,16px)",
                          borderRadius: "999px",
                          fontSize: "clamp(13px,1.4vw,18px)",
                          fontWeight: isSelected ? 500 : 400,
                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",
                          transition: "all 0.15s",
                          userSelect: "none",
                          textAlign: "center",
                          boxSizing: "border-box",
                          background: "transparent",
                          ...getOptionStyle(item, opt),
                        }}
                      >
                        <Unit4PlayingAudioIcon
                          active={activeAudioKey === `option-${item.id}-${opt}`}
                        />
                        {opt}
                      </button>

                      {/* Wrong badge */}
                      {isWrong && (
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
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
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
