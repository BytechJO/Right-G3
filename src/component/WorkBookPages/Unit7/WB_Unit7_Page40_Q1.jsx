import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise C/Item_001_Hansel_likes.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise C/Item_002_Stella_likes.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise C/Item_003_I_like.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise C/Item_004_Tom_likes.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit7/Page 40 - Exercise C/Item_005_Look_at.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 40/SVG/6.svg";

const WRONG_COLOR = "red";
const RED_COLOR = "#000000ff";
const LINE_COLOR = "#333";
const OPTIONS = ["him", "her", "it"];

const ITEMS = [
  {
    id: 1,
    before: "Hansel likes",
    after: ".",
    correct: "him",
    img: img1,
    alt: "Hansel",
    audio: audio1,
  },
  {
    id: 2,
    before: "Stella likes",
    after: ".",
    correct: "her",
    img: img2,
    alt: "Stella",
    audio: audio2,
  },
  {
    id: 3,
    before: "I like",
    after: ".",
    correct: "it",
    img: img3,
    alt: "A kite",
    audio: audio3,
  },
  {
    id: 4,
    before: "Tom likes",
    after: ".",
    correct: "him",
    img: img4,
    alt: "Tom",
    audio: audio4,
  },
  {
    id: 5,
    before: "Look at",
    after: ".",
    correct: "it",
    img: img5,
    alt: "A toy car",
    audio: audio5,
  },
  {
    id: 6,
    before: "Helen sits next to",
    after: ".",
    correct: "her",
    img: img6,
    alt: "Helen sitting next to a woman",
  },
];

export default function SB_ReadLookWrite_PageC() {
  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => selected[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    const correctIds = ITEMS.flatMap((i) =>
      selected[i.id] === i.correct ? [i.id] : [],
    );
    const incorrectIds = ITEMS.flatMap((i) =>
      selected[i.id] !== i.correct ? [i.id] : [],
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
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((i) => i.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) => wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="C"
          title={
            <>
              Read, look, and write{" "}
              <span style={{ color: "#2e3192" }}>him</span>,{" "}
              <span style={{ color: "#2e3192" }}>her</span>, or{" "}
              <span style={{ color: "#2e3192" }}>it</span>.
            </>
          }
          subTitle="Use the him, her, or it after likes or look at to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* Items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginLeft: "35px",
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
                  alignItems: "center",
                  gap: "clamp(10px,1.5vw,20px)",
                  width: "100%",
                  minWidth: 0,
                }}
              >
                {/* number */}
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "clamp(14px,1.8vw,24px)",
                  }}
                >
                  {item.id}
                </span>

                {/* sentence + dropdown */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: "clamp(4px,0.6vw,8px)",
                    // flex: 1,
                    width: 350,
                  }}
                >
                  {/* before text */}
                  <span
                    role={item.audio ? "button" : undefined}
                    tabIndex={item.audio ? 0 : -1}
                    className={
                      item.audio
                        ? "unit4-audio-control unit4-interactive"
                        : undefined
                    }
                    onClick={() =>
                      item.audio && playAudio(`item-${item.id}`, item.audio)
                    }
                    onKeyDown={(event) => {
                      if (
                        item.audio &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        playAudio(`item-${item.id}`, item.audio);
                      }
                    }}
                    style={{
                      fontSize: "18px",
                      // fontWeight: 500,
                      color: "#111",
                      lineHeight: 1.3,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `item-${item.id}`}
                    />
                    {item.before}
                  </span>

                  {/* dropdown — زي السطر المسطر */}
                  <div
                    style={{
                      position: "relative",
                      display: "inline-flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <select
                      disabled={showAns || lockedIds.includes(item.id)}
                      value={selected[item.id] || ""}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      style={{
                        minWidth: "clamp(80px,12vw,160px)",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: wrong
                          ? `2px solid ${WRONG_COLOR}`
                          : `1px solid ${LINE_COLOR}`,
                        borderRadius: 0,
                        fontSize: "18PX",
                        // fontWeight:      700,
                        // color: wrong ? WRONG_COLOR : RED_COLOR,
                        padding: "0 clamp(4px,0.6vw,8px) 3px 2px",
                        background: "transparent",
                        cursor:
                          showAns || lockedIds.includes(item.id)
                            ? "default"
                            : "pointer",
                        appearance: "auto",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="" disabled hidden></option>
                      {OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {/* wrong badge — يسار أعلى */}
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
                          zIndex: 3,
                          pointerEvents: "none",
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>

                  {/* after text */}
                  <span
                    style={{
                      fontSize: "clamp(14px,1.8vw,24px)",
                      fontWeight: 500,
                      color: "#111",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.after}
                  </span>
                </div>

                {/* image — يمين */}
                <div
                  style={{
                    width: "clamp(50px,8vw,90px)",
                    aspectRatio: "1 / 1",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  />
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
