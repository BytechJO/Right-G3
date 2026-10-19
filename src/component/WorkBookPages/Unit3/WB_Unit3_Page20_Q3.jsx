import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import AudioWithCaption from "../../AudioWithCaption";
import sound from "../../../assets/audio/ClassBook/Grade 3/cd3pg20instruction-adult-lady_6VKGQN60.mp3";
import QuestionAudioPlayer from "../../QuestionAudioPlayer";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import "./workbookUnit3Interactions.css";
import chinAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_001_chin.mp3";
import patchAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_002_patch.mp3";
import lashAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_003_lash.mp3";
import cheatAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_004_cheat.mp3";
import chopAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_005_chop.mp3";
import dishAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_006_dish.mp3";
import shinAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_007_shin.mp3";
import sashAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_008_sash.mp3";
import latchAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_009_latch.mp3";
import sheetAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_010_sheet.mp3";
import shopAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_011_shop.mp3";
import ditchAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise C/Item_012_ditch.mp3";

const WORD_AUDIO = {
  chin: chinAudio,
  patch: patchAudio,
  lash: lashAudio,
  cheat: cheatAudio,
  chop: chopAudio,
  dish: dishAudio,
  shin: shinAudio,
  sash: sashAudio,
  latch: latchAudio,
  sheet: sheetAudio,
  shop: shopAudio,
  ditch: ditchAudio,
};
const ITEMS = [
  { id: 1, options: ["chin", "shin"], correct: "chin" },
  { id: 2, options: ["patch", "sash"], correct: "patch" },
  { id: 3, options: ["lash", "latch"], correct: "latch" },
  { id: 4, options: ["cheat", "sheet"], correct: "cheat" },
  { id: 5, options: ["chop", "shop"], correct: "shop" },
  { id: 6, options: ["dish", "ditch"], correct: "dish" },
];

const captions = [
  { start: 0.58, end: 4.06, text: "Page 20, phonics exercise C." },
  { start: 4.06, end: 6.0, text: "Listen, read, and circle." },
  { start: 7.18, end: 8.82, text: "1- chin." },
  { start: 9.86, end: 12.7, text: "2- patch." },
  { start: 12.7, end: 14.6, text: "3- latch." },
  { start: 14.6, end: 17.22, text: "4- cheat." },
  { start: 18.32, end: 20.92, text: "5- shop." },
  { start: 20.92, end: 22.56, text: "6- dish." },
];

export default function WB_Unit3_Page18_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [forceStopToken, setForceStopToken] = useState(0);
  const {
    activeAudioKey,
    playAudio: playWordAudio,
    stopAudio,
  } = useWorkbookUnit3Audio();
  const playAudio = (key, source) => {
    setForceStopToken((value) => value + 1);
    playWordAudio(key, source);
  };

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all words first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) score++;
    });
    setShowResults(true);
    setLockedIds(
      ITEMS.filter((item) => answers[item.id] === item.correct).map(
        (item) => item.id,
      ),
    );
    if (score === ITEMS.length)
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};
    ITEMS.forEach((item) => {
      filledAnswers[item.id] = item.correct;
    });
    setAnswers(filledAnswers);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id));
    setForceStopToken((value) => value + 1);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setForceStopToken((value) => value + 1);
    stopAudio();
  };

  const isWrong = (item, option) =>
    showResults && answers[item.id] === option && option !== item.correct;
  const isSelected = (item, option) =>
    showAns ? item.correct === option : answers[item.id] === option;

  const renderOption = (item, option) => {
    const selected = isSelected(item, option);
    const wrong = isWrong(item, option);
    const audioKey = `word-${item.id}-${option}`;

    return (
      <div
        className="wb-unit3-audio-control wb-unit3-interactive"
        role="button"
        tabIndex={lockedIds.includes(item.id) ? -1 : 0}
        aria-label={`${option}${selected ? ", selected" : ""}`}
        aria-disabled={lockedIds.includes(item.id)}
        onClick={() => {
          if (lockedIds.includes(item.id)) return;
          handleSelect(item.id, option);
          playAudio(audioKey, WORD_AUDIO[option]);
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !lockedIds.includes(item.id)
          ) {
            event.preventDefault();
            handleSelect(item.id, option);
            playAudio(audioKey, WORD_AUDIO[option]);
          }
        }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          // minWidth: "118px",
          minHeight: "54px",
          padding: "6px 18px",
          borderRadius: "999px",
          border: selected
            ? wrong
              ? "2px solid red"
              : "1px solid #f39b42"
            : "2px solid transparent",
          background: "transparent",
          color: "#222",
          fontSize: "18px",
          // fontWeight: "500",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
          lineHeight: "1.1",
        }}
      >
        <WorkbookUnit3PlayingAudioIcon active={activeAudioKey === audioKey} />
        {option}
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
      <style>{`
        .wb-c-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          column-gap: 18px;
          row-gap: 18px;
          width: 100%;
          align-items: start;
        }

        /* ✅ FIX: الـ item عمودي — رقم فوق، كارت تحت */
        .wb-c-item {
          display: flex;
          // flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          gap: 5px;
          // min-width: 0;
        }

        /* ✅ FIX: صف الرقم فوق الكارت محاذي للشمال */
        .wb-c-top-row {
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          // width: 100%;
          padding-bottom: 6px;
        }

        .wb-c-num {
          font-size: 20px;
          font-weight: 700;
          color: #222;
          // line-height: 1;
        }

        .wb-c-card {
          width: 100px;
          // min-height: 138px;
          border: 1px solid #f39b42;
          border-radius: 18px;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          padding: 10px 8px;
          box-sizing: border-box;
        }

        .wb-c-buttons {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 1200px) {
          .wb-c-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 700px) {
          .wb-c-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 500px) {
          .wb-c-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div
        className="div-forall"
        style={
          {
            // gap: "28px",
          }
        }
      >
        <ExerciseHeader
          sectionLetter="C"
          title="Listen, read, and circle."
          subTitle="Listen carefully for the target sound, replay if needed, then choose the word with the ch, tch, or sh sound heard that matches what you hear."
        />

        <div
          className="w-full"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <QuestionAudioPlayer
            src={sound}
            captions={captions}
            stopAtSecond={6.0}
            pageId="WB_Unit3_Page20_Q3"
            forceStop={forceStopToken}
            onInteract={stopAudio}
          />
        </div>

        <div className="wb-c-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c-item">
              {/* ✅ الرقم فوق الكارت في صف مستقل */}
              <div className="wb-c-top-row">
                <span className="wb-c-num">{item.id}</span>
              </div>

              {/* الكارت */}
              <div className="wb-c-card">
                {item.options.map((option) => (
                  <React.Fragment key={option}>
                    {renderOption(item, option)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-c-buttons">
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
