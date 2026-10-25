import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/6.svg";
import beachAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_001_beach.mp3";
import gardenAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_002_garden.mp3";
import digAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_003_dig.mp3";
import barnAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_004_barn.mp3";
import skateboardAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_005_skateboard.mp3";
import swimAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_006_swim.mp3";
import bikeAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_007_bike.mp3";
import boatAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_008_boat.mp3";
import zooAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_009_zoo.mp3";
import farmAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_010_farm.mp3";
import carAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise C/Item_011_car.mp3";

const WRONG_COLOR = "#ef4444";
const ACTIVE_COLOR = "#f39b42";
const CARD_BORDER = "#a3a3a3";

const ITEMS = [
  {
    id: 1,
    img: img1,
    alt: "A beach",
    options: ["beach", "dig"],
    correct: "beach",
  },
  {
    id: 2,
    img: img2,
    alt: "A barn",
    options: ["garden", "barn"],
    correct: "barn",
  },
  {
    id: 3,
    img: img3,
    alt: "A child swimming",
    options: ["swim", "dig"],
    correct: "swim",
  },
  {
    id: 4,
    img: img4,
    alt: "A skateboard",
    options: ["skateboard", "bike"],
    correct: "skateboard",
  },
  {
    id: 5,
    img: img5,
    alt: "A boat",
    options: ["boat", "car"],
    correct: "boat",
  },
  {
    id: 6,
    img: img6,
    alt: "A farm",
    options: ["zoo", "farm"],
    correct: "farm",
  },
];
const AUDIO = {
  beach: beachAudio,
  garden: gardenAudio,
  dig: digAudio,
  barn: barnAudio,
  skateboard: skateboardAudio,
  swim: swimAudio,
  bike: bikeAudio,
  boat: boatAudio,
  zoo: zooAudio,
  farm: farmAudio,
  car: carAudio,
};

export default function WB_Unit8_Page58_QC() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
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
    setLockedIds(
      ITEMS.filter((item) => answers[item.id] === item.correct).map(
        (item) => item.id,
      ),
    );
    const total = ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
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
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    stopAudio();
  };

  const isWrong = (item) =>
    checked && !showAns && answers[item.id] !== item.correct;

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "clamp(18px,2.5vw,28px)",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="C"
          title="Look, read, and circle."
          subTitle="Look at the weekend vocabulary word that matches each picture first, compare all available options, then tap only the answer that matches."
        />

        {/* Grid 2×3 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(16px,2.5vw,32px) clamp(20px,4vw,50px)",
            alignItems: "start",
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
                  alignItems: "flex-start",
                  gap: "clamp(10px,1.4vw,18px)",
                  position: "relative",
                  minWidth: 0,
                }}
              >
                {/* number */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                    lineHeight: 1.4,
                  }}
                >
                  {item.id}
                </span>

                <img
                  src={item.img}
                  alt={item.alt}
                  style={{
                    width: "auto",
                    height: "120px",
                    objectFit: "contain",
                    display: "block",
                    userSelect: "none",
                  }}
                />

                {/* options */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(10px,1.5vw,20px)",
                    paddingTop: "clamp(6px,0.8vw,12px)",
                    width: 150,
                    // flex: 1,
                  }}
                >
                  {item.options.map((option) => {
                    const selected = answers[item.id] === option;
                    const optWrong = wrong && selected;

                    // لون الدايرة: برتقالي عادي، أحمر لما غلط
                    const circleColor = optWrong ? WRONG_COLOR : ACTIVE_COLOR;

                    return (
                      <button
                        key={option}
                        type="button"
                        className="unit4-audio-control"
                        onClick={() => {
                          handleSelect(item.id, option);
                          playAudio(
                            `option-${item.id}-${option}`,
                            AUDIO[option],
                          );
                        }}
                        aria-pressed={selected}
                        aria-disabled={lockedIds.includes(item.id) || showAns}
                        tabIndex={
                          lockedIds.includes(item.id) || showAns ? -1 : 0
                        }
                        style={{
                          position: "relative",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding:
                            "clamp(4px,0.6vw,8px) clamp(10px,1.4vw,18px)",
                          fontSize: "20px",
                          // fontWeight: selected ? 700 : 500,
                          color: "#333",
                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",
                          border: "none",
                          background: "transparent",
                          fontFamily: "inherit",
                          userSelect: "none",
                          lineHeight: 1.2,
                          transition: "color 0.15s",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {/* دايرة الاختيار */}
                        {selected && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              border: optWrong
                                ? `2px solid red`
                                : `1px solid ${circleColor}`,
                              borderRadius: "999px",
                              pointerEvents: "none",
                            }}
                          />
                        )}

                        <span style={{ position: "relative", zIndex: 1 }}>
                          {option}
                        </span>
                        <Unit4PlayingAudioIcon
                          active={
                            activeAudioKey === `option-${item.id}-${option}`
                          }
                        />

                        {/* wrong badge — يسار أعلى على الكلمة */}
                        {optWrong && (
                          <div
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

                              zIndex: 5,
                              pointerEvents: "none",
                            }}
                          >
                            ✕
                          </div>
                        )}
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
            handleStartAgain={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
