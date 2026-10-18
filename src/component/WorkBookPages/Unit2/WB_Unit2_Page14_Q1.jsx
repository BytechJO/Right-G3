import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import "./workbookUnit2Interactions.css";

import tuneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 1.svg";
import gumImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 2.svg";
import runImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 3.svg";
import cupImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 7.svg";
import busImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 6.svg";
import tubeImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 5.svg";
import upImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 4.svg";
import sunImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 8.svg";
import sueImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 9.svg";
import juneImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 11.svg";
import glueImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 14/SVG/Asset 10.svg";
import shortUAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_001_short_u.mp3";
import longUAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_002_long_u.mp3";
import tuneAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_003_tune.mp3";
import gumAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_004_gum.mp3";
import runAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_005_run.mp3";
import sunAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_006_sun.mp3";
import sueAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_007_sue.mp3";
import cupAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_008_cup.mp3";
import busAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_009_bus.mp3";
import tubeAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_010_tube.mp3";
import upAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_011_up.mp3";
import juneAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_012_June.mp3";
import glueAudio from "../../../assets/audio/WorkBook/unit2/Page 14 - Exercise A/Item_013_glue.mp3";

const WORD_AUDIO = {
  tune: tuneAudio,
  gum: gumAudio,
  run: runAudio,
  sun: sunAudio,
  sue: sueAudio,
  cup: cupAudio,
  bus: busAudio,
  tube: tubeAudio,
  up: upAudio,
  June: juneAudio,
  glue: glueAudio,
};

const CIRCLE_COLOR = "red";
const BORDER_COLOR = "#a9a9a9";
const WRONG_COLOR = "red";
const TEXT_COLOR = "#111";

const SECTIONS = [
  {
    id: "short-u",
    title: "short u",
    audio: shortUAudio,
    items: [
      { id: "s1", img: tuneImg, text: "tune", correct: false },
      { id: "s2", img: gumImg, text: "gum", correct: true },
      { id: "s3", img: runImg, text: "run", correct: true },
      { id: "s4", img: cupImg, text: "cup", correct: true },
      { id: "s5", img: busImg, text: "bus", correct: true },
      { id: "s6", img: tubeImg, text: "tube", correct: false },
      { id: "s7", img: upImg, text: "up", correct: true },
    ],
  },
  {
    id: "long-u",
    title: "long u",
    audio: longUAudio,
    items: [
      { id: "l1", img: sunImg, text: "sun", correct: false },
      { id: "l2", img: tuneImg, text: "tune", correct: true },
      { id: "l3", img: sueImg, text: "sue", correct: true },
      { id: "l4", img: upImg, text: "up", correct: false },
      { id: "l5", img: runImg, text: "run", correct: false },
      { id: "l6", img: juneImg, text: "June", correct: true },
      { id: "l7", img: glueImg, text: "glue", correct: true },
    ],
  },
];

const styles = {
  pageWrap: {
    width: "100%",
  },

  sectionsWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "clamp(16px, 2vw, 34px)",
    width: "100%",
  },

  sectionBox: {
    position: "relative",
    border: `2px solid ${BORDER_COLOR}`,
    borderRadius: "clamp(12px, 1.4vw, 18px)",
    background: "#fff",
    padding:
      "clamp(18px, 2.3vw, 30px) clamp(12px, 1.6vw, 18px) clamp(12px, 1.6vw, 18px)",
    boxSizing: "border-box",
    minHeight: "clamp(260px, 38vw, 430px)",
  },

  badge: {
    position: "absolute",
    top: "clamp(-18px, -1.8vw, -12px)",
    left: "50%",
    transform: "translateX(-50%)",
    minWidth: "clamp(84px, 10vw, 120px)",
    height: "clamp(34px, 4vw, 42px)",
    padding: "0 clamp(10px, 1vw, 16px)",
    borderRadius: "clamp(12px, 1.2vw, 16px)",
    border: `2px solid ${BORDER_COLOR}`,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(18px, 1.7vw,20px)",
    fontWeight: 500,
    color: TEXT_COLOR,
    boxSizing: "border-box",
  },

  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "0px",
    alignItems: "end",
    width: "100%",
  },

  itemBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "clamp(6px, 0.8vw, 10px)",
    minWidth: 0,
  },

  imgWrap: {
    width: "100%",
    height: "clamp(72px, 10vw, 90px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px",
    boxSizing: "border-box",
  },

  img: {
    // maxWidth: "100%",
    // maxHeight: "100%",
    width: "100px",
    height: "70px",
    objectFit: "contain",
    display: "block",
    cursor: "pointer",
  },

  wordBtn: {
    position: "relative",
    minHeight: "clamp(34px, 4vw, 46px)",
    padding: "0 clamp(10px, 1.1vw, 16px)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    border: "2px solid transparent",
    background: "transparent",
    color: TEXT_COLOR,
    fontSize: "clamp(16px, 1.4vw, 18px)",
    // fontWeight: 500,
    lineHeight: 1.1,
    cursor: "pointer",
    boxSizing: "border-box",
    textAlign: "center",
    maxWidth: "100%",
    wordBreak: "break-word",
  },

  wrongBadge: {
    position: "absolute",
    top: "clamp(-8px, -1vw, -4px)",
    right: "clamp(-8px, -1vw, -4px)",
    width: "clamp(18px, 2vw, 24px)",
    height: "clamp(18px, 2vw, 24px)",
    borderRadius: "50%",
    backgroundColor: WRONG_COLOR,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(10px, 1vw, 12px)",
    fontWeight: 600,
    border: "2px solid #fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
    zIndex: 2,
  },

  buttonsWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4px",
  },
};

export default function WB_Unit1_Page9_QA() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const allItems = SECTIONS.flatMap((section) => section.items);

  const handleSelect = (itemId) => {
    if (showAns || correctIds.includes(itemId)) return;

    setAnswers((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));

    setCheckedIds((previous) => previous.filter((id) => id !== itemId));
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === allItems.length) return;

    const total = allItems.length;
    let score = 0;

    allItems.forEach((item) => {
      const selected = !!answers[item.id];
      if (selected === item.correct) {
        score += 1;
      }
    });

    setCheckedIds(allItems.map((item) => item.id));
    setCorrectIds(
      allItems
        .filter((item) => !!answers[item.id] === item.correct)
        .map((item) => item.id),
    );

    if (score === total) {
      ValidationAlert.success(`Score: ${score} / ${total}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${total}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${total}`);
    }
  };

  const handleShowAnswer = () => {
    const filled = {};

    allItems.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setCheckedIds(allItems.map((item) => item.id));
    setCorrectIds(allItems.map((item) => item.id));
    setShowAns(true);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isSelected = (itemId) => !!answers[itemId];

  const isWrong = (item) => {
    if (!checkedIds.includes(item.id) || showAns) return false;
    return !!answers[item.id] !== item.correct;
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-a-root * {
          box-sizing: border-box !important;
        }

        @media (max-width: 900px) {
          .wb-a-sections {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div className="div-forall" style={{ gap: "60px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Does it have a <span style={{ color: "#2e3192" }}>short u </span>
              or <span style={{ color: "#2e3192" }}>long u</span> sound? Read
              and circle.
            </>
          }
          subTitle="Look at the short-u or long-u sound for each word first, compare all available options, then tap only the answer that matches."
        />

        <div style={styles.pageWrap}>
          <div style={styles.sectionsWrap} className="wb-a-sections">
            {SECTIONS.map((section) => (
              <div key={section.id} style={styles.sectionBox}>
                <div
                  role="button"
                  tabIndex={0}
                  className="wb-unit2-audio-control wb-unit2-interactive"
                  onClick={() =>
                    playAudio(`section-${section.id}`, section.audio)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(`section-${section.id}`, section.audio);
                    }
                  }}
                  style={styles.badge}
                >
                  {section.title}
                  <WorkbookUnit2PlayingAudioIcon
                    active={activeAudioKey === `section-${section.id}`}
                  />
                </div>

                <div style={styles.itemsGrid}>
                  {section.items.map((item) => {
                    const selected = isSelected(item.id);
                    const wrong = isWrong(item);

                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        aria-pressed={selected}
                        aria-disabled={showAns || correctIds.includes(item.id)}
                        className="wb-unit2-audio-control wb-unit2-interactive"
                        onClick={() => {
                          playAudio(`word-${item.id}`, WORD_AUDIO[item.text]);
                          handleSelect(item.id);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            playAudio(`word-${item.id}`, WORD_AUDIO[item.text]);
                            handleSelect(item.id);
                          }
                        }}
                        style={styles.itemBox}
                      >
                        <div style={styles.imgWrap}>
                          <img
                            src={item.img}
                            alt={`Illustration of ${item.text}`}
                            style={styles.img}
                          />
                        </div>

                        <div
                          style={{
                            ...styles.wordBtn,
                            borderColor: selected
                              ? CIRCLE_COLOR
                              : "transparent",
                            cursor: showAns ? "default" : "pointer",
                          }}
                        >
                          {item.text}
                          {wrong && <div style={styles.wrongBadge}>✕</div>}
                        </div>
                        <WorkbookUnit2PlayingAudioIcon
                          active={activeAudioKey === `word-${item.id}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.buttonsWrap}>
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
