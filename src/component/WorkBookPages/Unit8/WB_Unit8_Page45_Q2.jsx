import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import wasAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_001_was.mp3";
import wereAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_002_were.mp3";
import sheAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_003_She.mp3";
import farmAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_004_at_the_farm.mp3";
import theyAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_005_They.mp3";
import parkAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_006_at_the_park.mp3";
import wasntAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_007_wasn't.mp3";
import werentAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_008_weren't.mp3";
import poolAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_009_at_the_swimming_pool.mp3";
import beachAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_010_at_the_beach.mp3";
import heAudio from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/Item_011_He.mp3";
import full1 from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/full1.mp3";
import full2 from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/full2.mp3";
import full3 from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/full3.mp3";
import full4 from "../../../assets/audio/WorkBook/unit8/Page 45 - Exercise B/full4.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/6_8.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/7_8.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/9_8.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 45/SVG/8_8.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

const ITEMS = [
  {
    id: 1,
    img: img1,
    before: "She",
    beforeAudio: sheAudio,
    after: "at the farm.",
    afterAudio: farmAudio,
    options: ["was", "wasn't"],
    correct: "wasn't",
    alt: "A girl away from the farm",
    fullAudio: full1,
  },
  {
    id: 2,
    img: img2,
    before: "They",
    beforeAudio: theyAudio,
    after: "at the park.",
    afterAudio: parkAudio,
    options: ["were", "weren't"],
    correct: "were",
    alt: "Children at the park",
    fullAudio: full2,
  },
  {
    id: 3,
    img: img3,
    before: "He",
    beforeAudio: heAudio,
    after: "at the swimming pool.",
    afterAudio: poolAudio,
    options: ["was", "wasn't"],
    correct: "was",
    alt: "A boy at the swimming pool",
    fullAudio: full3,
  },
  {
    id: 4,
    img: img4,
    before: "They",
    beforeAudio: theyAudio,
    after: "at the beach.",
    afterAudio: beachAudio,
    options: ["were", "weren't"],
    correct: "weren't",
    alt: "Children away from the beach",
    fullAudio: full4,
  },
];

export default function WB_LookReadCircle_PageB() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();
  const optionAudio = { was: wasAudio, were: wereAudio, "wasn't": wasntAudio, "weren't": werentAudio };

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setWrongIds((previous) => previous.filter((itemId) => itemId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });
    setLockedIds(ITEMS.flatMap((item) => answers[item.id] === item.correct ? [item.id] : []));
    setWrongIds(ITEMS.flatMap((item) => answers[item.id] !== item.correct ? [item.id] : []));
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
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    setShowAns(true);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  const getOptStyle = (item, opt) => {
    const isSelected = answers[item.id] === opt;
    const isWrong =
      wrongIds.includes(item.id) &&
      !showAns &&
      answers[item.id] === opt &&
      opt !== item.correct;
    const isCorrectShown = (showAns || lockedIds.includes(item.id)) && opt === item.correct;

    if (isWrong)
      return {
        border: `2px solid ${WRONG_COLOR}`,
        // color: WRONG_COLOR,
      };
    if (isSelected || isCorrectShown)
      return {
        border: `1px solid ${BORDER_COLOR}`,
        color: "#111",
      };
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
          gap: "30px",
        }}
      >
        {/* Title */}
        <ExerciseHeader sectionLetter="B" title="Look, read, and circle." subTitle="Look at the was/wasn’t or were/weren’t sentence for each picture first, compare all available options, then tap only the answer that matches." />

        {/* ── Grid 2×2 ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(16px,2.5vw,32px)",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              role={lockedIds.includes(item.id) || showAns ? "button" : undefined}
              tabIndex={lockedIds.includes(item.id) || showAns ? 0 : undefined}
              aria-label={lockedIds.includes(item.id) || showAns ? `Play: ${item.before} ${item.correct} ${item.after}` : undefined}
              onClick={() => { if (lockedIds.includes(item.id) || showAns) playAudio(`full-${item.id}`, item.fullAudio); }}
              onKeyDown={(event) => { if ((lockedIds.includes(item.id) || showAns) && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); playAudio(`full-${item.id}`, item.fullAudio); } }}
              className={lockedIds.includes(item.id) || showAns ? "unit4-audio-control unit4-interactive unit4-full-audio-enabled" : undefined}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(8px,1vw,12px)",
              }}
            >
              {/* الصورة */}
              <div
                style={{
                  display: "flex",

                  gap: "clamp(8px,1vw,12px)",
                }}
              >
                {/* رقم */}
                <span
                  style={{
                    fontSize: "clamp(16px,1.8vw,24px)",
                    fontWeight: 700,
                    color: "#111",
                  }}
                >
                  {item.id}
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  gap: "clamp(8px,1vw,12px)",

                  }}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{
                      width: "auto",
                      height: "110px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* الخيارات + الجملة */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "clamp(6px,0.8vw,10px)",
                    }}
                  >
                    {/* النص قبل */}
                    <span role="button" tabIndex={lockedIds.includes(item.id) || showAns ? -1 : 0} className="unit4-audio-control unit4-interactive" onClick={(event) => { if (lockedIds.includes(item.id) || showAns) return; event.stopPropagation(); playAudio(`before-${item.id}`, item.beforeAudio); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); playAudio(`before-${item.id}`, item.beforeAudio); } }}
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                      }}
                    >
                      <Unit4PlayingAudioIcon active={activeAudioKey === `before-${item.id}`} />{item.before}
                    </span>

                    {/* الخيارات */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(4px,0.5vw,6px)",
                      }}
                    >
                      {item.options.map((opt) => {
                        const isWrong =
                          wrongIds.includes(item.id) && answers[item.id] === opt;
                        return (
                          <div key={opt} style={{ position: "relative" }}>
                            <button
                              tabIndex={lockedIds.includes(item.id) || showAns ? -1 : 0}
                              aria-disabled={lockedIds.includes(item.id) || showAns}
                              onClick={(event) => { if (lockedIds.includes(item.id) || showAns) return; event.stopPropagation(); playAudio(`option-${item.id}-${opt}`, optionAudio[opt]); handleSelect(item.id, opt); }}
                              onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && !lockedIds.includes(item.id) && !showAns) { event.preventDefault(); event.stopPropagation(); playAudio(`option-${item.id}-${opt}`, optionAudio[opt]); handleSelect(item.id, opt); } }}
                              style={{
                                padding:
                                  "clamp(3px,0.4vw,6px) clamp(10px,1.2vw,18px)",
                                borderRadius: "999px",
                                fontSize: "clamp(14px,1.6vw,20px)",
                                fontWeight:
                                  answers[item.id] === opt ? 500 : 400,
                                cursor:
                                  showAns || lockedIds.includes(item.id)
                                    ? "default"
                                    : "pointer",
                                transition: "all 0.15s",
                                userSelect: "none",
                                textAlign: "center",
                                boxSizing: "border-box",
                                ...getOptStyle(item, opt),
                              }}
                            >
                              <Unit4PlayingAudioIcon active={activeAudioKey === `option-${item.id}-${opt}`} />{opt}
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

                                  pointerEvents: "none",
                                }}
                              >
                                ✕
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* النص بعد */}
                    <span role="button" tabIndex={lockedIds.includes(item.id) || showAns ? -1 : 0} className="unit4-audio-control unit4-interactive" onClick={(event) => { if (lockedIds.includes(item.id) || showAns) return; event.stopPropagation(); playAudio(`after-${item.id}`, item.afterAudio); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.stopPropagation(); playAudio(`after-${item.id}`, item.afterAudio); } }}
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                      }}
                    >
                      <Unit4PlayingAudioIcon active={activeAudioKey === `after-${item.id}`} />{item.after}
                    </span>
                  </div>
                </div>
              </div>
              {(lockedIds.includes(item.id) || showAns) && <Unit4PlayingAudioIcon active={activeAudioKey === `full-${item.id}`} />}
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
