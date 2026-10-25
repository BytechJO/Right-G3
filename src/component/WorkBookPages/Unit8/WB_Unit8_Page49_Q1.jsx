import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_001_There_were_horses_on_the_farm.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_002_There_weren't_horses_on_the_farm.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_003_They_were_at_the_bus_station.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_004_They_weren't_at_the_bus_station.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_005_They_were_watching_TV_at_home.mp3";
import audio6 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_006_They_weren't_watching_TV_at_home.mp3";
import audio7 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_007_He_was_at_school.mp3";
import audio8 from "../../../assets/audio/WorkBook/unit8/Page 49 - Exercise I/Item_008_He_wasn't_at_school.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 49/SVG/4.svg";
import trueIcon from "../../../assets/imgs/true.svg";
const ITEMS = [
  {
    id: 1,
    img: img1,
    options: [
      "There were horses on the farm.",
      "There weren’t horses on the farm.",
    ],
    correct: "There were horses on the farm.",
  },
  {
    id: 2,
    img: img2,
    options: [
      "They were at the bus station.",
      "They weren’t at the bus station.",
    ],
    correct: "They weren’t at the bus station.",
  },
  {
    id: 3,
    img: img3,
    options: [
      "They were watching TV at home.",
      "They weren’t watching TV at home.",
    ],
    correct: "They were watching TV at home.",
  },
  {
    id: 4,
    img: img4,
    options: ["He was at school.", "He wasn’t at school."],
    correct: "He wasn’t at school.",
  },
];
const OPTION_AUDIO = [
  audio1,
  audio2,
  audio3,
  audio4,
  audio5,
  audio6,
  audio7,
  audio8,
];

export default function WB_Unit8_Page48_QI() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongIds((previous) => previous.filter((itemId) => itemId !== id));
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
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setLockedIds(
      ITEMS.flatMap((item) =>
        answers[item.id] === item.correct ? [item.id] : [],
      ),
    );
    setWrongIds(
      ITEMS.flatMap((item) =>
        answers[item.id] !== item.correct ? [item.id] : [],
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
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    setShowAns(true);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isWrong = (id) => {
    return wrongIds.includes(id);
  };

  const renderCheckBox = (itemId, text) => {
    const selected = answers[itemId] === text;

    return (
      <div className="relative">
        <button
          type="button"
          tabIndex={lockedIds.includes(itemId) || showAns ? -1 : 0}
          aria-disabled={lockedIds.includes(itemId) || showAns}
          onClick={() => handleSelect(itemId, text)}
          style={{
            width: "44px",
            height: "44px",
            border:
              isWrong(itemId) && selected
                ? "2px solid red"
                : "1px solid #f39b42",
            borderRadius: "8px",
            backgroundColor: "#fff",
            // color: selected ? "#dc2626" : "transparent",
            fontSize: "40px",
            lineHeight: "1",
            fontWeight: "700",
            cursor:
              showAns || lockedIds.includes(itemId) ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: 0,
          }}
        >
          {selected && (
            <img src={trueIcon} alt="Selected" style={{ height: "25px" }} />
          )}
        </button>
        {isWrong(itemId) && selected && (
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
              pointerEvents: "none",
            }}
          >
            ✕
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "clamp(18px,2.5vw,28px)",
        }}
      >
        <ExerciseHeader
          sectionLetter="I"
          title="Look, read, and write."
          subTitle="Read each past-location statement that matches each picture carefully, use the picture or sentence evidence to check it, then choose the correct Yes/No or True/False response."
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "250px 1fr",
                // gap: "18px",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* left side */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "500",
                    color: "#222",
                    minWidth: "18px",
                    lineHeight: "1",
                    marginTop: "10px",
                  }}
                >
                  {item.id}
                </span>

                <img
                  src={item.img}
                  alt={
                    [
                      "Horses on a farm",
                      "People away from a bus station",
                      "A family watching TV at home",
                      "A boy away from school",
                    ][item.id - 1]
                  }
                  style={{
                    width: "auto",
                    height: "100px",
                    // objectFit: "cover",
                    // border: "2px solid #f39b42",
                    borderRadius: "6%",

                    display: "block",
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* right side */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  width: "100%",
                }}
              >
                {item.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "center",
                    }}
                  >
                    <p
                      role="button"
                      tabIndex={0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() =>
                        playAudio(
                          `option-${item.id}-${index}`,
                          OPTION_AUDIO[(item.id - 1) * 2 + index],
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(
                            `option-${item.id}-${index}`,
                            OPTION_AUDIO[(item.id - 1) * 2 + index],
                          );
                        }
                      }}
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        lineHeight: "1.35",
                        color: "#222",
                        width: "60%",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `option-${item.id}-${index}`}
                      />
                      {option}
                    </p>

                    {renderCheckBox(item.id, option)}
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
            marginTop: "8px",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
