import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 60/SVG/4.svg";
import full1Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/full3.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/full4.mp3";
import willAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_001_will.mp3";
import sheAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_002_She.mp3";
import homeworkAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_003_do_her_homework.mp3";
import treeAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_004_plant_a_tree.mp3";
import heAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_005_He.mp3";
import wontAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_006_won't.mp3";
import storeAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_007_go_to_the_store.mp3";
import restaurantAudio from "../../../assets/audio/WorkBook/unit10/Page 60 - Exercise G/Item_008_eat_at_a_restaurant.mp3";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const SELECT_COLOR = "#f39b42";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    img: img1,
    subject: "She",
    modalOptions: ["will", "won't"],
    action: "do her homework.",
    correctModal: "will",
    alt: "A girl doing her homework",
    fullAudio: full1Audio,
  },
  {
    id: 2,
    img: img2,
    subject: "He",
    modalOptions: ["will", "won't"],
    action: "plant a tree.",
    correctModal: "won't",
    alt: "A boy not planting a tree",
    fullAudio: full2Audio,
  },
  {
    id: 3,
    img: img3,
    subject: "They",
    modalOptions: ["will", "won't"],
    action: "eat at a restaurant.",
    correctModal: "will",
    alt: "People eating at a restaurant",
    fullAudio: full3Audio,
  },
  {
    id: 4,
    img: img4,
    subject: "She",
    modalOptions: ["will", "won't"],
    action: "go to the store.",
    correctModal: "won't",
    alt: "A girl not going to the store",
    fullAudio: full4Audio,
  },
];
const OPTION_AUDIO = { will: willAudio, "won't": wontAudio };
const SUBJECT_AUDIO = { She: sheAudio, He: heAudio };
const ACTION_AUDIO = {
  "do her homework.": homeworkAudio,
  "plant a tree.": treeAudio,
  "go to the store.": storeAudio,
  "eat at a restaurant.": restaurantAudio,
};

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -7,
      right: -7,
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
);

// ── المكوّن الرئيسي ─────────────────────────────────────────────
export default function WB_Unit8_Page58_QD() {
  // answers[id] = "will" | "won't"
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const isItemCorrect = (item) => answers[item.id] === item.correctModal;

  // ── هل هاد الخيار بالذات غلط؟ ──
  const isOptionWrong = (item, value) => {
    if (!checked || showAns) return false;
    return answers[item.id] === value && value !== item.correctModal;
  };

  // ── handlers ──
  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first! ✏️");
      return;
    }
    let correct = 0;
    ITEMS.forEach((i) => {
      if (isItemCorrect(i)) correct++;
    });
    setChecked(true);
    setLockedIds(ITEMS.filter(isItemCorrect).map((item) => item.id));
    const total = ITEMS.length;
    if (correct === total)
      ValidationAlert.success(`Score: ${correct} / ${total}`);
    else if (correct > 0)
      ValidationAlert.warning(`Score: ${correct} / ${total}`);
    else ValidationAlert.error(`Score: ${correct} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = i.correctModal;
    });
    setAnswers(filled);
    setChecked(false);
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

  // ── رسم خيار واحد (will / won't) كدائرة ──
  const renderOption = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isOptionWrong(item, value);

    return (
      <div
        key={value}
        className="unit4-audio-control"
        role="button"
        tabIndex={lockedIds.includes(item.id) || showAns ? -1 : 0}
        aria-pressed={selected}
        onClick={(event) => {
          if (lockedIds.includes(item.id) || showAns) return;
          event.stopPropagation();
          handleSelect(item.id, value);
          playAudio(`option-${item.id}-${value}`, OPTION_AUDIO[value]);
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !lockedIds.includes(item.id) &&
            !showAns
          ) {
            event.preventDefault();
            handleSelect(item.id, value);
            playAudio(`option-${item.id}-${value}`, OPTION_AUDIO[value]);
          }
        }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(2px,0.4vw,4px) clamp(8px,1.2vw,14px)",
          cursor:
            showAns || lockedIds.includes(item.id) ? "default" : "pointer",
          userSelect: "none",
          fontSize: "18px",
          lineHeight: 1.3,
          transition: "color 0.15s",
          whiteSpace: "nowrap",
        }}
      >
        {/* الدائرة — تظهر عند الاختيار */}
        {selected && (
          <div
            style={{
              position: "absolute",
              inset: "-2px -4px",
              border: wrong
                ? `1px solid ${WRONG_COLOR}`
                : `1px solid ${SELECT_COLOR}`,
              borderRadius: "999px",
              pointerEvents: "none",
              transition: "border-color 0.15s",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{value}</span>
        <Unit4PlayingAudioIcon
          active={activeAudioKey === `option-${item.id}-${value}`}
        />

        {/* بادج الخطأ على الدائرة */}
        {wrong && selected && <ErrorBadge />}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "clamp(18px,2.5vw,30px)" }}>
        {/* ── العنوان ── */}
        <ExerciseHeader
          sectionLetter="G"
          title="Look, read, and circle. Say."
          subTitle="Choose the correct will or won’t action from each picture, then the complete sentence from the picture first, then say the full sentence aloud using the model pattern."
        />

        {/* ── شبكة 2×2 ── */}
        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(20px,3.5vw,48px) clamp(20px,4vw,55px)",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className={
                lockedIds.includes(item.id) || showAns
                  ? "unit4-audio-control unit4-full-audio-enabled"
                  : undefined
              }
              role={
                lockedIds.includes(item.id) || showAns ? "button" : undefined
              }
              tabIndex={lockedIds.includes(item.id) || showAns ? 0 : undefined}
              aria-label={
                lockedIds.includes(item.id) || showAns
                  ? `Play the complete sentence for item ${item.id}`
                  : undefined
              }
              onClick={() =>
                (lockedIds.includes(item.id) || showAns) &&
                playAudio(`full-${item.id}`, item.fullAudio)
              }
              onKeyDown={(event) => {
                if (
                  (lockedIds.includes(item.id) || showAns) &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  playAudio(`full-${item.id}`, item.fullAudio);
                }
              }}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px,1.4vw,16px)",
                minWidth: 0,
              }}
            >
              {/* رقم + صورة */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "clamp(8px,1vw,14px)",
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#111",
                    flexShrink: 0,
                    minWidth: "clamp(14px,1.8vw,22px)",
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
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* الجملة: subject | modal (قابل للاختيار) | action (نص ثابت) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(6px,0.8vw,12px)",
                  paddingLeft: "clamp(20px,2.5vw,32px)",
                  flexWrap: "wrap",
                }}
              >
                {/* subject */}
                <span
                  style={{
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "clamp(28px,4vw,42px)",
                    flexShrink: 0,
                  }}
                >
                  {item.subject}
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `subject-${item.id}`}
                  />
                </span>

                {/* modal options — هون الاختيار الوحيد */}
                <div
                  style={{
                    borderLeft: "1.5px solid #222",
                    paddingLeft: "clamp(6px,0.8vw,12px)",
                    display: "flex",
                    height: "70px",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "clamp(2px,0.4vw,6px)",
                    flexShrink: 0,
                  }}
                >
                  {item.modalOptions.map((opt) => renderOption(item, opt))}
                </div>

                {/* action — نص ثابت بدون اختيار */}
                <span
                  className="unit4-audio-control"
                  role="button"
                  tabIndex={!lockedIds.includes(item.id) && !showAns ? 0 : -1}
                  onClick={(event) => {
                    if (lockedIds.includes(item.id) || showAns) return;
                    event.stopPropagation();
                    playAudio(`action-${item.id}`, ACTION_AUDIO[item.action]);
                  }}
                  onKeyDown={(event) => {
                    if (
                      !lockedIds.includes(item.id) &&
                      !showAns &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      event.stopPropagation();
                      playAudio(`action-${item.id}`, ACTION_AUDIO[item.action]);
                    }
                  }}
                  style={{
                    fontSize: "18px",
                    color: "#222",
                    borderLeft: "1.5px solid #222",
                    lineHeight: "70px",
                    paddingLeft: "clamp(6px,0.8vw,12px)",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  {item.action}
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `action-${item.id}`}
                  />
                </span>
              </div>
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `full-${item.id}`}
              />
            </div>
          ))}
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
