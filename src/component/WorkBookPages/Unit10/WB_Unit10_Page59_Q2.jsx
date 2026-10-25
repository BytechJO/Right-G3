import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/10.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/12.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/13.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 59/SVG/14.svg";
import full1Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise F/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise F/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise F/full3.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise F/full4.mp3";
import patternAudio from "../../../assets/audio/WorkBook/unit10/Page 59 - Exercise F/Item_001_He_She_-_will_won't_-_action.mp3";
// ── ثوابت ──────────────────────────────────────────────────────
const WRONG_COLOR = "red";
const RED_MARK = "#d92525";

// ── بيانات ─────────────────────────────────────────────────────
const ITEMS = [
  {
    id: 1,
    img: img1,
    boxMark: "check",
    correctSubject: "He",
    correctModal: "will",
    correctAction: "watch a movie.",
    alt: "A boy watching a movie",
    fullAudio: full1Audio,
  },
  {
    id: 2,
    img: img2,
    boxMark: "x",
    correctSubject: "She",
    correctModal: "won't",
    correctAction: "read a book.",
    alt: "A girl with a crossed-out book",
    fullAudio: full2Audio,
  },
  {
    id: 3,
    img: img3,
    boxMark: "x",
    correctSubject: "He",
    correctModal: "won't",
    correctAction: "ride a bike.",
    alt: "A boy with a crossed-out bicycle",
    fullAudio: full3Audio,
  },
  {
    id: 4,
    img: img4,
    boxMark: "check",
    correctSubject: "She",
    correctModal: "will",
    correctAction: "plant a flower.",
    alt: "A girl planting a flower",
    fullAudio: full4Audio,
  },
];

const SUBJECT_OPTIONS = ["He", "She"];
const MODAL_OPTIONS = ["will", "won't"];
const ACTION_OPTIONS = [
  "watch a movie.",
  "read a book.",
  "ride a bike.",
  "plant a flower.",
];

// ── بادج الخطأ ─────────────────────────────────────────────────
const ErrorBadge = () => (
  <div
    style={{
      position: "absolute",
      top: -8,
      right: -8,
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
export default function WB_Unit8_Page59_QF() {
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
      ans?.subject === item.correctSubject &&
      ans?.modal === item.correctModal &&
      ans?.action === item.correctAction
    );
  };

  const isWrong = (item) => checked && !isItemCorrect(item);

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every(
      (i) =>
        answers[i.id]?.subject && answers[i.id]?.modal && answers[i.id]?.action,
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
      filled[i.id] = {
        subject: i.correctSubject,
        modal: i.correctModal,
        action: i.correctAction,
      };
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

  // ── select بسيط ──
  const sel = (id, field, value, options, placeholder, flex = "1") => (
    <select
      value={value || ""}
      onChange={(e) => handleSelect(id, field, e.target.value)}
      disabled={showAns || lockedIds.includes(id)}
      style={{
        flex,
        minWidth: 0,
        borderBottom: `1px solid #f39b42 `,
        // borderRadius: "8px",
        padding: "clamp(4px,0.5vw,6px) clamp(4px,0.5vw,8px)",
        fontSize: "18px",
        backgroundColor: "#fff",
        color: "#000000ff",
        cursor: showAns || lockedIds.includes(id) ? "default" : "pointer",
        // fontWeight: value ? 600 : 400,
        transition: "border-color 0.15s",
        appearance: "auto",
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );

  return (
    <div className="main-container-component">
      <div className="div-forall" style={{ gap: "30px" }}>
        {/* ── العنوان ── */}

        <ExerciseHeader
          sectionLetter="F"
          title="Look and write."
          subTitle="Use the subject, will/won’t, and action for each picture to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* ── شبكة 2×2 ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "clamp(16px,3vw,32px) clamp(16px,4vw,48px)",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const current = answers[item.id] || {};
            const wrong = isWrong(item);

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
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(8px,1.2vw,14px)",
                  minWidth: 0,
                }}
              >
                {/* رقم + صورة */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(6px,0.8vw,10px)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(15px,1.9vw,22px)",
                      fontWeight: 700,
                      color: "#111",
                      flexShrink: 0,
                      minWidth: "clamp(14px,1.8vw,20px)",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.id}
                  </span>

                  {/* الصورة — تتمدد مع الشبكة */}
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.alt}
                      style={{
                        width: "auto",
                        height: "150px",
                        display: "block",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    />

                    {wrong && <ErrorBadge />}
                  </div>
                </div>

                {/* ── السطر: selects تتمدد ولا تنكسر ── */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(4px,0.5vw,6px)",
                    paddingLeft: "clamp(18px,2.2vw,28px)",
                    paddingBottom: "clamp(4px,0.5vw,6px)",
                    borderBottom: wrong
                      ? `2px solid ${WRONG_COLOR}`
                      : "1px solid #666",
                    minWidth: 0,
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  {/* subject — حجم ثابت نسبياً */}
                  {sel(
                    item.id,
                    "subject",
                    current.subject,
                    SUBJECT_OPTIONS,
                    "He/She",
                    "0 0 auto",
                  )}

                  {/* modal */}
                  {sel(
                    item.id,
                    "modal",
                    current.modal,
                    MODAL_OPTIONS,
                    "will/won't",
                    "0 0 auto",
                  )}

                  {/* action — يأخذ باقي المساحة */}
                  {sel(
                    item.id,
                    "action",
                    current.action,
                    ACTION_OPTIONS,
                    "action...",
                    "1 1 0",
                  )}
                </div>
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${item.id}`}
                />
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
