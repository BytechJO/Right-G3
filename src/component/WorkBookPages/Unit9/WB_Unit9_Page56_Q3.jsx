import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 56/SVG/4.svg";
import beetsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_001_beets.mp3";
import dogsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_002_dogs.mp3";
import ducksAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_003_ducks.mp3";
import beesAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_004_bees.mp3";
import bagsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_005_bags.mp3";
import batsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_006_bats.mp3";
import cubsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_007_cubs.mp3";
import cupsAudio from "../../../assets/audio/WorkBook/unit 9/Page 56 - Exercise C/Item_008_cups.mp3";

const WORD_AUDIO = { beets: beetsAudio, dogs: dogsAudio, ducks: ducksAudio, bees: beesAudio, bags: bagsAudio, bats: batsAudio, cubs: cubsAudio, cups: cupsAudio };

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const SELECT_COLOR = "#f39b42";
const CARD_BORDER = "#a3a3a3";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, img: img1, alt: "Several dogs", options: ["dogs", "ducks"], correct: "dogs" },
  { id: 2, img: img2, alt: "Several bees", options: ["bees", "beets"], correct: "bees" },
  { id: 3, img: img3, alt: "Several bats", options: ["bags", "bats"], correct: "bats" },
  { id: 4, img: img4, alt: "Several cups", options: ["cups", "cubs"], correct: "cups" },
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -8,
      right: -8,
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      backgroundColor: "red",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      fontWeight: "700",
      border: "2px solid white",
      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

      zIndex: 5,
      pointerEvents: "none",
    }}
  >
    ✕
  </div>
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit9_Page56_QC() {
  const [answers, setAnswers] = useState({});
  const [, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  // ── handlers ──
  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setWrongIds((prev) => prev.filter((itemId) => itemId !== id));
    playAudio(`word-${id}-${value}`, WORD_AUDIO[value]);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) correct++;
    });
    setChecked(true);
    setLockedIds((prev) => [
      ...new Set([...prev, ...ITEMS.filter((item) => answers[item.id] === item.correct).map((item) => item.id)]),
    ]);
    setWrongIds(ITEMS.filter((item) => answers[item.id] !== item.correct).map((item) => item.id));
    const total = ITEMS.length;
    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
       else if (correct >0)
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    else ValidationAlert.error(`Score: ${correct} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });
    setAnswers(correctMap);
    setChecked(false);
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

  const isWrong = (id) => wrongIds.includes(id);

  // ── ستايل زر الاختيار ──
  const optionStyle = (itemId, option) => {
    const selected = answers[itemId] === option;
    const wrong = isWrong(itemId) && selected;

    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      // fontWeight:      selected ? 500 : 300,
      // color:           wrong ? WRONG_COLOR : selected ? SELECT_COLOR : "#555",
      cursor: showAns || lockedIds.includes(itemId) ? "default" : "pointer",
      border: selected
        ? `1px solid ${wrong ? WRONG_COLOR : SELECT_COLOR}`
        : "1px solid transparent",
      borderRadius: "999px",
      backgroundColor: "transparent",
      transition: "all 0.15s ease",
      boxSizing: "border-box",
      padding: "clamp(6px,0.8vw,12px)",
    };
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "120px" }}>
        {/* ── العنوان ── */}
        <ExerciseHeader
          sectionLetter="C"
          title="Look, read, and circle. Say."
          subTitle="Look at the correct plural word for each picture first, compare all available options, then tap only the answer that matches."
        />

        {/* ── البطاقات 4 في صف ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0,1fr))",
            gap: "clamp(14px,2vw,26px)",
            alignItems: "start",
            justifyItems: "center",
          }}
        >
          {ITEMS.map((item) => {
            const wrong = isWrong(item.id);

            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  // flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "clamp(6px,0.8vw,10px)",
                  width: "100%",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                    alignSelf: "flex-start",
                    paddingLeft: "4px",
                  }}
                >
                  {item.id}
                </span>

                {/* البطاقة */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    border: `1.5px solid ${CARD_BORDER}`,
                    borderRadius: "clamp(14px,1.8vw,24px)",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding:
                      "clamp(10px,1.2vw,16px) clamp(8px,1vw,14px) clamp(14px,1.6vw,20px)",
                    boxSizing: "border-box",
                    gap: "clamp(8px,1vw,14px)",
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* الصورة */}
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "clamp(120px,15vw,180px)",
                      objectFit: "contain",
                      display: "block",
                      userSelect: "none",
                    }}
                  />

                  {/* خيارات الاختيار */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "clamp(4px,0.6vw,10px)",
                    }}
                  >
                    {item.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(item.id, option)}
                        onKeyDown={(event) => {
                          if ((event.key === "Enter" || event.key === " ") && !lockedIds.includes(item.id)) {
                            event.preventDefault();
                            handleSelect(item.id, option);
                          }
                        }}
                        tabIndex={lockedIds.includes(item.id) ? -1 : 0}
                        aria-disabled={lockedIds.includes(item.id)}
                        className="unit4-audio-control unit4-interactive"
                        style={optionStyle(item.id, option)}
                      >
                        {option}
                        <Unit4PlayingAudioIcon active={activeAudioKey === `word-${item.id}-${option}`} />
                      </button>
                    ))}
                  </div>

                  {/* بادج الخطأ */}
                  {wrong && <ErrorBadge />}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── الأزرار ── */}
        <div className="mt-4 flex justify-center">
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
