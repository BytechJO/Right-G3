import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/7.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/9.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 58/SVG/10.svg";
import full1Audio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/full3.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/full4.mp3";
import willAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_001_will.mp3";
import sitAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_002_sit_in_the_sun.mp3";
import beachAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_003_go_to_the_beach.mp3";
import sheAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_004_She.mp3";
import heAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_005_He.mp3";
import wontAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_006_won't.mp3";
import sandcastleAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_007_build_a_sandcastle.mp3";
import bookAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_008_read_a_book.mp3";
import movieAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_009_watch_a_movie.mp3";
import treeAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_010_plant_a_tree.mp3";
import theyAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_011_They.mp3";
import mallAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_012_go_to_the_mall.mp3";
import swimAudio from "../../../assets/audio/WorkBook/unit10/Page 58 - Exercise D/Item_013_swim_in_the_sea.mp3";

// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "#ef4444";
const SELECT_COLOR = "#f39b42";
const RED_MARK = "red";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    img: img1,
    subject: "He",
    boxMark: "x",
    modalOptions: ["will", "won't"],
    actionOptions: ["sit in the sun.", "build a sandcastle."],
    correctModal: "won't",
    correctAction: "sit in the sun.",
    alt: "A boy with a sun symbol crossed out",
    fullAudio: full1Audio,
  },
  {
    id: 2,
    img: img2,
    subject: "She",
    boxMark: "check",
    modalOptions: ["will", "won't"],
    actionOptions: ["go to the beach.", "read a book."],
    correctModal: "will",
    correctAction: "read a book.",
    alt: "A girl reading a book",
    fullAudio: full2Audio,
  },
  {
    id: 3,
    img: img3,
    subject: "They",
    boxMark: "x",
    modalOptions: ["will", "won't"],
    actionOptions: ["watch a movie.", "go to the mall."],
    correctModal: "won't",
    correctAction: "watch a movie.",
    alt: "Children with a movie symbol crossed out",
    fullAudio: full3Audio,
  },
  {
    id: 4,
    img: img4,
    subject: "He",
    boxMark: "check",
    modalOptions: ["will", "won't"],
    actionOptions: ["plant a tree.", "swim in the sea."],
    correctModal: "will",
    correctAction: "plant a tree.",
    alt: "A boy planting a tree",
    fullAudio: full4Audio,
  },
];
const OPTION_AUDIO = {
  will: willAudio,
  "won't": wontAudio,
  "sit in the sun.": sitAudio,
  "go to the beach.": beachAudio,
  She: sheAudio,
  He: heAudio,
  They: theyAudio,
  "build a sandcastle.": sandcastleAudio,
  "read a book.": bookAudio,
  "watch a movie.": movieAudio,
  "plant a tree.": treeAudio,
  "go to the mall.": mallAudio,
  "swim in the sea.": swimAudio,
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
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, field, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const isItemCorrect = (item) => {
    const ans = answers[item.id];
    return (
      ans?.modal === item.correctModal && ans?.action === item.correctAction
    );
  };

  // ── هل هاد الخيار بالذات غلط؟ ──
  const isOptionWrong = (item, field, value) => {
    if (!checked || showAns) return false;
    const ans = answers[item.id];
    return (
      ans?.[field] === value &&
      value !== (field === "modal" ? item.correctModal : item.correctAction)
    );
  };

  // ── handlers ──
  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every(
      (i) => answers[i.id]?.modal && answers[i.id]?.action,
    );
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
      filled[i.id] = { modal: i.correctModal, action: i.correctAction };
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

  // ── رسم خيار واحد كدائرة ──
  const renderOption = (item, field, value) => {
    const selected = answers[item.id]?.[field] === value;
    const wrong = isOptionWrong(item, field, value);

    return (
      <div
        key={value}
        className="unit4-audio-control"
        role="button"
        tabIndex={lockedIds.includes(item.id) || showAns ? -1 : 0}
        aria-pressed={selected}
        aria-disabled={lockedIds.includes(item.id) || showAns}
        onClick={(event) => {
          if (lockedIds.includes(item.id) || showAns) return;
          event.stopPropagation();
          handleSelect(item.id, field, value);
          playAudio(`option-${item.id}-${field}-${value}`, OPTION_AUDIO[value]);
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !lockedIds.includes(item.id) &&
            !showAns
          ) {
            event.preventDefault();
            handleSelect(item.id, field, value);
            playAudio(
              `option-${item.id}-${field}-${value}`,
              OPTION_AUDIO[value],
            );
          }
        }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(2px,0.4vw,4px) clamp(8px,1.2vw,14px)",
          cursor: showAns || checked ? "default" : "pointer",
          userSelect: "none",
          fontSize: "clamp(13px,1.7vw,20px)",
          lineHeight: 1.3,
          // color: wrong ? WRONG_COLOR : "#222",
          // fontWeight: selected ? 700 : 500,
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
              border: wrong ? `2px solid red` : `1px solid ${SELECT_COLOR}`,
              borderRadius: "999px",
              pointerEvents: "none",
              transition: "border-color 0.15s",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{value}</span>
        <Unit4PlayingAudioIcon
          active={activeAudioKey === `option-${item.id}-${field}-${value}`}
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
          sectionLetter="D"
          title="Look, read, and circle. Say."
          subTitle="Choose the correct will or won’t action from the picture, then the complete sentence from the picture first, then say the full sentence aloud using the model pattern."
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
          {ITEMS.map((item) => {
            return (
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
                tabIndex={
                  lockedIds.includes(item.id) || showAns ? 0 : undefined
                }
                aria-label={
                  lockedIds.includes(item.id) || showAns
                    ? `Play the complete sentence for item ${item.id}`
                    : undefined
                }
                onClick={() => {
                  if (lockedIds.includes(item.id) || showAns)
                    playAudio(`full-${item.id}`, item.fullAudio);
                }}
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
                      // objectFit: "cover",
                      display: "block",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* الجملة: subject | modal | action */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
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
                      // fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {item.subject}
                  </span>

                  {/* modal options */}
                  <div
                    style={{
                      borderLeft: "1.5px solid #222",
                      paddingLeft: "clamp(6px,0.8vw,12px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "clamp(2px,0.4vw,6px)",
                      flexShrink: 0,
                    }}
                  >
                    {item.modalOptions.map((opt) =>
                      renderOption(item, "modal", opt),
                    )}
                  </div>

                  {/* action options */}
                  <div
                    style={{
                      borderLeft: "1.5px solid #222",
                      paddingLeft: "clamp(6px,0.8vw,12px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "clamp(2px,0.4vw,6px)",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {item.actionOptions.map((opt) =>
                      renderOption(item, "action", opt),
                    )}
                  </div>
                </div>
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${item.id}`}
                />
              </div>
            );
          })}
        </div>

        {/* ── الأزرار ── */}
        <div className="flex justify-center">
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
