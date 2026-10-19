import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import "./workbookUnit3Interactions.css";
import q1Audio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_001_Do_they_have_any_vegetables.mp3";
import q2Audio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_002_Does_she_have_any_hats.mp3";
import yesTheyAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_003_Yes,_they_do_have_some.mp3";
import yesSheAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_004_Yes,_she_has_some.mp3";
import noTheyAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_005_No,_they_don't_have_any.mp3";
import noSheAudio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_006_No,_she_hasn't_any.mp3";
import q3Audio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_007_Do_they_have_any_drinks.mp3";
import q4Audio from "../../../assets/audio/WorkBook/unit3/Page 16 - Exercise D/Item_008_Does_she_have_any_ice_cream.mp3";

const OPTION_AUDIO = {
  "Yes, they do have some.": yesTheyAudio,
  "No, they don’t have any.": noTheyAudio,
  "Yes, she has some.": yesSheAudio,
  "No, she hasn’t any.": noSheAudio,
};
const QUESTION_AUDIO = { 1: q1Audio, 2: q2Audio, 3: q3Audio, 4: q4Audio };
const IMAGE_ALTS = {
  1: "Children with food but no vegetables",
  2: "A girl with hats",
  3: "Two boys with drinks",
  4: "A girl with ice cream",
};

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 4.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 16/Ex D 3.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    question: "Do they have any vegetables?",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "No, they don’t have any.",
  },
  {
    id: 2,
    img: img2,
    question: "Does she have any hats?",
    options: ["Yes, she has some.", "No, she hasn’t any."],
    correct: "Yes, she has some.",
  },
  {
    id: 3,
    img: img3,
    question: "Do they have any drinks?",
    options: ["Yes, they do have some.", "No, they don’t have any."],
    correct: "Yes, they do have some.",
  },
  {
    id: 4,
    img: img4,
    question: "Does she have any ice cream?",
    options: ["Yes, she has some.", "No, she hasn’t any."],
    correct: "Yes, she has some.",
  },
];

export default function WB_Unit3_Page16_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);
    setLockedIds(
      ITEMS.filter((item) => answers[item.id] === item.correct).map(
        (item) => item.id,
      ),
    );

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
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

  const isWrong = (item) => {
    if (!showResults) return false;
    return answers[item.id] !== item.correct;
  };

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrong = isWrong(item) && selected;

    return (
      <div
        onClick={() => {
          if (lockedIds.includes(item.id)) return;
          handleSelect(item.id, option);
          playAudio(`option-${item.id}-${option}`, OPTION_AUDIO[option]);
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !lockedIds.includes(item.id)
          ) {
            event.preventDefault();
            handleSelect(item.id, option);
            playAudio(`option-${item.id}-${option}`, OPTION_AUDIO[option]);
          }
        }}
        role="button"
        tabIndex={lockedIds.includes(item.id) ? -1 : 0}
        aria-disabled={lockedIds.includes(item.id)}
        className={`wb-d16-option wb-unit3-audio-control wb-unit3-interactive ${selected ? "selected" : ""} ${
          wrong ? "wrong" : ""
        }`}
        style={{
          cursor: showAns || showResults ? "default" : "pointer",
        }}
      >
        <WorkbookUnit3PlayingAudioIcon
          active={activeAudioKey === `option-${item.id}-${option}`}
        />
        {option}

        {wrong && <div className="wb-d16-wrong-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component mb-10">
      <style>{`
        .wb-d16-wrap {
          display: flex;
          flex-direction: column;
          // gap: clamp(20px, 2.4vw, 28px);
          width: 100%;
          align-items:center
        }

        .wb-d16-list {
          display: grid;
        grid-template-columns: 1fr 1fr;
          gap: clamp(18px, 2.2vw, 26px);
          width: 100%;
        }

        .wb-d16-row {
          display: flex;
         
          gap: clamp(12px, 1.8vw, 18px);
          align-items: center;
          width: 100%;
        }

        .wb-d16-num {
          font-size: clamp(16px, 1.7vw,20px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-d16-img {
          width: 220px;
          height: auto;
          object-fit: contain;
          display: block;
          justify-self: start;
                              // border: 2px solid #f39b42;

        }

        .wb-d16-content {
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 1.4vw, 12px);
          justify-content: center;
          min-width: 0;
        }

        .wb-d16-question {
          font-size: clamp(12px, 1.4vw, 18px);
          color: #111;
          line-height: 1.4;
          margin-bottom: 2px;
          word-break: break-word;
        }

        .wb-d16-options {
          display: flex;
          flex-direction:column;
          // flex-wrap: wrap;
          gap: 5px;
          align-items: center;
        }

        .wb-d16-option {
          position: relative;
          padding: 5px 20px;
          border-radius: 999px;
          border: 1px solid transparent;
          background-color: transparent;
          color: #111;
          font-size: clamp(14px, 1.5vw, 16px);
          // font-weight: 500;
          transition: all 0.2s ease;
          box-sizing: border-box;
          min-width: fit-content;
          line-height: 1.35;
        }
.wb-d16-option.selected:hover{
 border-color: #f39b42;
}
        .wb-d16-option.selected {
          border-color: #f39b42;
        }

        .wb-d16-option.wrong {
          border-color: red;
        }

        .wb-d16-wrong-badge {
         position: absolute;
          top: -10px;
          right: -10px;
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
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }

        .wb-d16-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(4px, 0.8vw, 6px);
        }

        @media (max-width: 900px) {
          .wb-d16-row {
            grid-template-columns:
              clamp(24px, 3vw, 34px)
              minmax(130px, clamp(180px, 30vw, 260px))
              minmax(0, 1fr);
            gap: 14px;
          }

          .wb-d16-img {
            width: clamp(140px, 28vw, 250px);
            height: clamp(90px, 18vw, 145px);
          }
        }

        @media (max-width: 700px) {
          .wb-d16-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .wb-d16-num {
            font-size: clamp(18px, 4.8vw, 21px);
          }

          .wb-d16-img {
            justify-self: center;
            width: clamp(160px, 52vw, 280px);
            height: clamp(100px, 34vw, 170px);
          }

          .wb-d16-content {
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .wb-d16-question {
            font-size: clamp(15px, 4.2vw, 18px);
          }

          .wb-d16-option {
            width: 100%;
            text-align: center;
            font-size: clamp(14px, 3.8vw, 15px);
          }

          .wb-d16-options {
            width: 100%;
            gap: 10px;
          }
        }
      `}</style>

      <div className="div-forall" style={{ gap: "25px" }}>
        <ExerciseHeader
          sectionLetter="D"
          title="Read, look, and circle."
          subTitle="Look at the Yes/No answer that matches each have-any picture first, compare all available options, then tap only the answer that matches."
        />

        <div className="wb-d16-wrap w-full">
          <div className="wb-d16-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-d16-row">
                <div className="wb-d16-content">
                  <div className="flex gap-3">
                    <div className="wb-d16-num">{item.id}</div>
                    <div
                      className="wb-d16-question wb-unit3-audio-control wb-unit3-interactive"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        playAudio(
                          `question-${item.id}`,
                          QUESTION_AUDIO[item.id],
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(
                            `question-${item.id}`,
                            QUESTION_AUDIO[item.id],
                          );
                        }
                      }}
                    >
                      <WorkbookUnit3PlayingAudioIcon
                        active={activeAudioKey === `question-${item.id}`}
                      />
                      {item.question}
                    </div>
                  </div>
                  <img
                    src={item.img}
                    alt={IMAGE_ALTS[item.id]}
                    className="wb-d16-img"
                  />
                  <div className="wb-d16-options">
                    {item.options.map((option) => (
                      <React.Fragment key={option}>
                        {renderOption(item, option)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="wb-d16-buttons">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
