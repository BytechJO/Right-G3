import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 35/E.6.svg";
import sheAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_001_She.mp3";
import cakeAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_002_eat_the_cake.mp3";
import schoolAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_003_go_to_school.mp3";
import theyAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_004_They.mp3";
import streetAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_005_play_in_the_street.mp3";
import fruitAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_006_eat_fruit.mp3";
import dishesAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_001_wash_the_dishes.mp3";
import tvAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_008_watch_TV.mp3";
import mustntAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_009_mustn't.mp3";
import heAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_011_He.mp3";
import mustAudio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/Item_020_must.mp3";
import full1Audio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/full3.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/full4.mp3";
import full5Audio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/full5.mp3";
import full6Audio from "../../../assets/audio/WorkBook/unit6/Page 35 - Exercise E/full6.mp3";

const WRONG_COLOR = "#ef4444";

const OPTIONS = ["must", "mustn't"];
const WORD_AUDIO = { She: sheAudio, They: theyAudio, He: heAudio };
const OPTION_AUDIO = { must: mustAudio, "mustn't": mustntAudio };
const ACTION_AUDIO = {
  1: cakeAudio,
  2: schoolAudio,
  3: streetAudio,
  4: fruitAudio,
  5: dishesAudio,
  6: tvAudio,
};
const FULL_AUDIO = {
  1: full1Audio,
  2: full2Audio,
  3: full3Audio,
  4: full4Audio,
  5: full5Audio,
  6: full6Audio,
};
const IMAGE_ALT = {
  1: "A girl reaching for a cake with a prohibition mark",
  2: "A girl in a school uniform with a check mark",
  3: "Children playing in the street with a prohibition mark",
  4: "A girl eating fruit with a check mark",
  5: "Two children washing dishes with a check mark",
  6: "A boy watching television with a prohibition mark",
};

const ITEMS = [
  {
    id: 1,
    img: img1,
    icon: "mustn_t",
    before: "She",
    after: "eat the cake.",
    correct: "mustn't",
  },
  {
    id: 2,
    img: img2,
    icon: "must",
    before: "She",
    after: "go to school.",
    correct: "must",
  },
  {
    id: 3,
    img: img3,
    icon: "mustn_t",
    before: "They",
    after: "play in the street.",
    correct: "mustn't",
  },
  {
    id: 4,
    img: img4,
    icon: "must",
    before: "She",
    after: "eat fruit.",
    correct: "must",
  },
  {
    id: 5,
    img: img5,
    icon: "must",
    before: "They",
    after: "wash the dishes.",
    correct: "must",
  },
  {
    id: 6,
    img: img6,
    icon: "mustn_t",
    before: "He",
    after: "watch TV.",
    correct: "mustn't",
  },
];

export default function WB_LookReadWrite_PageE() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
    playAudio(`option-${id}`, OPTION_AUDIO[value]);
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });
    setShowResults(true);
    setLockedIds((previous) => [
      ...new Set([
        ...previous,
        ...ITEMS.filter((item) => answers[item.id] === item.correct).map(
          (item) => item.id,
        ),
      ]),
    ]);
    setWrongIds(
      ITEMS.filter((item) => answers[item.id] !== item.correct).map(
        (item) => item.id,
      ),
    );
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
    setLockedIds(ITEMS.map((item) => item.id));
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

  const isWrong = (item) =>
    showResults && !showAns && wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <style>{`
        .wb-e-select-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .wb-e-select {
          height: clamp(30px,3.5vw,42px);
          border: none;
          border-bottom: 1px solid #2f2f2f;
          background: transparent;
          padding: 0 24px 0 4px;
          font-size: clamp(14px,1.4vw,18px);
          // font-weight: 700;
          color: #000000ff;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          min-width: clamp(80px,9vw,120px);
          text-align: center;
          text-align-last: center;
        }

        .wb-e-select.wrong {
          border-bottom-color: red;
          color: #000000ff;
        }

        .wb-e-select:disabled {
          opacity: 1;
          cursor: default;
          pointer-events: none;
        }

        .wb-e-arrow {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          color: #666;
          pointer-events: none;
        }

        .wb-e-wrong-badge {
          position: absolute;
          top: 16px;
          right: -10px;
         transform: translateY(-50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: red;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    border: 2px solid #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          pointer-events: none;
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          gap: "20px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="E"
          title="Look, read, and write."
          subTitle="Use the must/mustn't action sentence shown by each picture to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* ── Cards Grid 2×3 ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: "clamp(16px,2.5vw,30px)",
            padding: "20px",
            width: "100%",
          }}
        >
          {ITEMS.map((item) => {
            const value = answers[item.id] || "";
            const wrong = isWrong(item);
            return (
              <div
                key={item.id}
                className={
                  lockedIds.includes(item.id)
                    ? "unit4-full-audio-enabled unit4-audio-control"
                    : ""
                }
                role={lockedIds.includes(item.id) ? "button" : undefined}
                tabIndex={lockedIds.includes(item.id) ? 0 : undefined}
                onClick={() => {
                  if (lockedIds.includes(item.id))
                    playAudio(`full-${item.id}`, FULL_AUDIO[item.id]);
                }}
                onKeyDown={(event) => {
                  if (
                    lockedIds.includes(item.id) &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    playAudio(`full-${item.id}`, FULL_AUDIO[item.id]);
                  }
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(8px,1vw,12px)",
                  position: "relative",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${item.id}`}
                />
                {/* الصورة + أيقونة */}
                <div
                  style={{
                    position: "relative",
                    // width:        "60%",
                    // aspectRatio:  "1.55 / 1",
                    // border:       `2px solid ${BORDER_COLOR}`,
                    // borderRadius: "clamp(10px,1.2vw,16px)",
                    // overflow:     "hidden",
                    // background:   "#f7f7f7",
                    gap: "clamp(8px,1vw,12px)",
                    display: "flex",
                  }}
                >
                  {/* رقم */}
                  <span
                    style={{
                      fontSize: "clamp(16px,1.7vw,20px)",
                      fontWeight: 700,
                      color: "#111",
                    }}
                  >
                    {item.id}
                  </span>
                  <img
                    src={item.img}
                    alt={IMAGE_ALT[item.id]}
                    style={{
                      width: "auto",
                      height: "150px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>

                {/* الجملة مع select */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  <span
                    className="unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      if (lockedIds.includes(item.id)) return;
                      event.stopPropagation();
                      playAudio(`before-${item.id}`, WORD_AUDIO[item.before]);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        if (lockedIds.includes(item.id)) return;
                        event.preventDefault();
                        event.stopPropagation();
                        playAudio(`before-${item.id}`, WORD_AUDIO[item.before]);
                      }
                    }}
                    style={{
                      fontSize: "clamp(14px,1.4vw,18px)",
                      // fontWeight: 500,
                      color: "#111",
                      paddingBottom: "4px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `before-${item.id}`}
                    />
                    {item.before}
                  </span>

                  {/* Select */}
                  <div
                    className="wb-e-select-wrap"
                    style={{ position: "relative" }}
                  >
                    <select
                      disabled={showAns || lockedIds.includes(item.id)}
                      value={value}
                      onChange={(e) => handleChange(item.id, e.target.value)}
                      onClick={(event) => {
                        if (!lockedIds.includes(item.id))
                          event.stopPropagation();
                      }}
                      className={`wb-e-select ${wrong ? "wrong" : ""}`}
                    >
                      <option value="" disabled hidden />
                      {OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    {!showAns && <span className="wb-e-arrow">▼</span>}

                    {wrong && <div className="wb-e-wrong-badge">✕</div>}
                  </div>

                  <span
                    className="unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      if (lockedIds.includes(item.id)) return;
                      event.stopPropagation();
                      playAudio(`action-${item.id}`, ACTION_AUDIO[item.id]);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        if (lockedIds.includes(item.id)) return;
                        event.preventDefault();
                        event.stopPropagation();
                        playAudio(`action-${item.id}`, ACTION_AUDIO[item.id]);
                      }
                    }}
                    style={{
                      fontSize: "clamp(14px,1.4vw,18px)",
                      color: "#111",
                      paddingBottom: "4px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `action-${item.id}`}
                    />
                    {item.after}
                  </span>
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
