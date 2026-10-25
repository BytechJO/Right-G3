import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import audio1 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise C/Item_001_It's_the_7th_month_of_the_year.mp3";
import audio2 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise C/Item_002_It's_the_2nd_month_of_the_year.mp3";
import audio3 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise C/Item_003_It's_the_5th_month_of_the_year.mp3";
import audio4 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise C/Item_004_It's_the_3rd_month_of_the_year.mp3";
import audio5 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise C/Item_005_It's_the_9th_month_of_the_year.mp3";
import audio6 from "../../../assets/audio/WorkBook/unit4/Page 22 - Exercise C/Item_006_It's_the_12th_month_of_the_year.mp3";
const SENTENCE_AUDIO = [audio1, audio2, audio3, audio4, audio5, audio6];

const ITEMS = [
  {
    id: 1,
    sentence: "It’s the 7th month of the year.",
    correct: "July",
  },
  {
    id: 2,
    sentence: "It’s the 2nd month of the year.",
    correct: "February",
  },
  {
    id: 3,
    sentence: "It’s the 5th month of the year.",
    correct: "May",
  },
  {
    id: 4,
    sentence: "It’s the 3rd month of the year.",
    correct: "March",
  },
  {
    id: 5,
    sentence: "It’s the 9th month of the year.",
    correct: "September",
  },
  {
    id: 6,
    sentence: "It’s the 12th month of the year.",
    correct: "December",
  },
];

const OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function WB_Unit3_Page20_QC() {
  const [answers, setAnswers] = useState({});
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelectChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
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

    setLockedIds(ITEMS.flatMap((item) => answers[item.id] === item.correct ? [item.id] : []));
    setWrongIds(ITEMS.flatMap((item) => answers[item.id] !== item.correct ? [item.id] : []));

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const filledAnswers = {};

    ITEMS.forEach((item) => {
      filledAnswers[item.id] = item.correct;
    });

    setAnswers(filledAnswers);
    setShowAns(true);
    setLockedIds(ITEMS.map((item) => item.id)); setWrongIds([]); stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowAns(false);
    setLockedIds([]); setWrongIds([]); stopAudio();
  };

  const isWrong = (item) => {
    return wrongIds.includes(item.id);
  };

  return (
    <div className="main-container-component">
      <style>{`
  .wb-months-wrapper {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 8px 14px 20px;
    box-sizing: border-box;
  }

  .wb-months-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }

  .wb-months-row {
    display: flex;
  
    gap: 16px;
    align-items: center;
    width: 100%;
  }

  .wb-months-num {
    font-size: 20px;
    font-weight: 700;
    color: #222;
    line-height: 1;
  }

  .wb-months-sentence {
    font-size: 18px;
    color: #111;
    line-height: 1.4;
    width:60%
  }

  .wb-months-answer-wrap {
    position: relative;
    width: 60%;
    display: flex;
  }

  .wb-months-select {
    width: 100%;
    min-height: 54px;
    font-size: 18px;
    color: #000000ff;
    border: none;
    border-bottom: 1px solid #222;
    outline: none;
    background: transparent;
    padding: 0 34px 2px 8px;
    text-align: center;
    text-align-last: center;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-sizing: border-box;
    cursor: pointer;
  }

  .wb-months-select:disabled {
    opacity: 1;
    cursor: default;
  }

  .wb-months-arrow {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #666;
    pointer-events: none;
  }

  .wb-months-wrong {
    position: absolute;
    top: 6px;
    right: -8px;
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

  .wb-months-buttons {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }

  @media (max-width: 900px) {
    .wb-months-row {
      grid-template-columns: 34px 1fr;
    }

    .wb-months-answer-wrap {
      grid-column: 2 / 3;
    }
  }
`}</style>

      <div
        className="div-forall"
        style={{
          
          gap: "45px",
       
        }}
      >
        <ExerciseHeader sectionLetter="C" title="Read and write." subTitle="Use the month name from its ordinal position to decide the missing word or phrase before opening each dropdown, then reread the completed sentence." />
        <div className="wb-months-list">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-months-row">
              <div className="wb-months-num">{item.id}</div>

              <div className="wb-months-sentence unit4-audio-control unit4-interactive" role="button" tabIndex={0} onClick={() => playAudio(`sentence-${item.id}`, SENTENCE_AUDIO[item.id - 1])} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); playAudio(`sentence-${item.id}`, SENTENCE_AUDIO[item.id - 1]); } }}>
                <Unit4PlayingAudioIcon active={activeAudioKey === `sentence-${item.id}`} />{item.sentence}
              </div>

              <div className="wb-months-answer-wrap">
                <select
                  className="wb-months-select"
                  value={answers[item.id] || ""}
                  disabled={showAns || lockedIds.includes(item.id)}
                  onChange={(e) => handleSelectChange(item.id, e.target.value)}
                  style={{borderBottom:isWrong(item) ? "2px solid red":"1px solid #222"}}
                >
                  <option value="" disabled>
                    Select month
                  </option>

                  {OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {!showAns && <div className="wb-months-arrow">▼</div>}

                {isWrong(item) && <div className="wb-months-wrong">✕</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="wb-months-buttons">
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
