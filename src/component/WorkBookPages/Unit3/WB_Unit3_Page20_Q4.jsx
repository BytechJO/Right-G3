import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import "./workbookUnit3Interactions.css";
import chAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise D/Item_001_ch.mp3";
import tchAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise D/Item_002_tch.mp3";
import shAudio from "../../../assets/audio/WorkBook/unit3/Page 20 - Exercise D/Item_003_sh.mp3";

const SOUND_AUDIO = { ch: chAudio, tch: tchAudio, sh: shAudio };
const IMAGE_ALTS = {
  1: "A seashell",
  2: "A piece of cheese",
  3: "A beach with an umbrella and palm tree",
  4: "A cake",
  5: "A shop",
};

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/Ex B  6.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 20/4.svg";

const ITEMS = [
  { id: 1, img: img1, options: ["sh", "tch"], correct: "sh" },
  { id: 2, img: img2, options: ["ch", "sh"], correct: "ch" },
  { id: 3, img: img3, options: ["tch", "ch"], correct: "ch" },
  { id: 4, img: img4, options: ["sh", "ch"], correct: "ch" },
  { id: 5, img: img5, options: ["ch", "sh"], correct: "sh" },
];

export default function WB_Unit3_Page18_QD() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((item) => answers[item.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all pictures first.");
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
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    stopAudio();
  };

  const isWrong = (item, option) =>
    showResults && answers[item.id] === option && option !== item.correct;
  const isSelected = (item, option) =>
    showAns ? item.correct === option : answers[item.id] === option;

  const renderOption = (item, option) => {
    const selected = isSelected(item, option);
    const wrong = isWrong(item, option);
    const audioKey = `sound-${item.id}-${option}`;

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
          playAudio(audioKey, SOUND_AUDIO[option]);
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !lockedIds.includes(item.id)
          ) {
            event.preventDefault();
            handleSelect(item.id, option);
            playAudio(audioKey, SOUND_AUDIO[option]);
          }
        }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "84px",
          minHeight: "54px",
          padding: "6px 18px",
          borderRadius: "999px",
          border: selected
            ? wrong
              ? "2px solid red"
              : "2px solid #f39b42"
            : "1px solid transparent",
          background: "transparent",
          color: "#222",
          fontSize: "18px",
          fontWeight: "500",
          cursor: showAns || showResults ? "default" : "pointer",
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
              top: "-10px",
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
        .wb-d-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          column-gap: 22px;
          row-gap: 20px;
          width: 100%;
          align-items: start;
        }

        /* ✅ FIX: الـ item يبدأ من الأعلى وبدون gap زيادة */
        .wb-d-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          min-width: 0;
        }

        /* ✅ FIX: الرقم فوق الصورة مباشرة، محاذى للشمال */
        .wb-d-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          width: 100%;
          padding-bottom: 6px;
          gap:10px
        }

        .wb-d-num {
          font-size: 22px;
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-d-img-frame {
          width: 140px;
          height: 96px;
          border: 1px solid #f39b42;
          border-radius: 18px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-sizing: border-box;
        }

        .wb-d-img {
         
          width: 140px;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-d-options {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 6px;
        }

        .wb-d-buttons {
          display: flex;
          justify-content: center;
          margin-top: 8px;
        }

        @media (max-width: 1200px) {
          .wb-d-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 700px) {
          .wb-d-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 500px) {
          .wb-d-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="div-forall" style={{ gap: "115px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title={
            <>
              Does it have <span style={{ color: "#2e3192" }}>ch</span>,{" "}
              <span style={{ color: "#2e3192" }}>tch</span>, or{" "}
              <span style={{ color: "#2e3192" }}>sh</span> sound? Look and
              circle.
            </>
          }
          subTitle="Look at the ch, tch, or sh sound that matches each picture first, compare all available options, then tap only the answer that matches."
        />

        <div className="wb-d-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-d-item">
              {/* ✅ الرقم فوق الصورة في صف منفصل محاذي للشمال */}
              <div className="wb-d-top-row">
                <span className="wb-d-num">{item.id}</span>
                <div className="wb-d-img-frame">
                  <img
                    src={item.img}
                    alt={IMAGE_ALTS[item.id]}
                    className="wb-d-img"
                  />
                </div>
              </div>

              {/* الصورة */}

              {/* الخيارات */}
              <div className="wb-d-options">
                {item.options.map((option) => (
                  <React.Fragment key={option}>
                    {renderOption(item, option)}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-d-buttons">
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
