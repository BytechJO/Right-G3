import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import a1 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_001_March.mp3";
import a2 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_002_April.mp3";
import a3 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_003_November.mp3";
import a4 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_004_August.mp3";
import a5 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_005_July.mp3";
import a6 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_006_December.mp3";
import a7 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_007_January.mp3";
import a8 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_008_June.mp3";
import a9 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_009_September.mp3";
import a10 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_010_February.mp3";
import a11 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_011_October.mp3";
import a12 from "../../../assets/audio/WorkBook/unit4/Page 25 - Exercise I/Item_012_May.mp3";

const MONTHS = [
  { id: 1, name: "March", correct: 3 },
  { id: 2, name: "April", correct: 4 },
  { id: 3, name: "August", correct: 8 },
  { id: 4, name: "November", correct: 11 },
  { id: 5, name: "January", correct: 1 },
  { id: 6, name: "June", correct: 6 },
  { id: 7, name: "July", correct: 7 },
  { id: 8, name: "December", correct: 12 },
  { id: 9, name: "February", correct: 2 },
  { id: 10, name: "May", correct: 5 },
  { id: 11, name: "September", correct: 9 },
  { id: 12, name: "October", correct: 10 },
];

const NUMBER_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const MONTH_AUDIO = {
  March: a1,
  April: a2,
  November: a3,
  August: a4,
  July: a5,
  December: a6,
  January: a7,
  June: a8,
  September: a9,
  February: a10,
  October: a11,
  May: a12,
};

// eslint-disable-next-line react-refresh/only-export-components
function MonthItem({
  item,
  value,
  onChange,
  showAns,
  locked,
  wrong,
  active,
  onPlay,
}) {
  const currentValue = showAns ? item.correct : (value ?? "");

  return (
    <div className="month-item">
      <div className={`select-box ${wrong ? "select-box--wrong" : ""}`}>
        <select
          aria-label={`Select the order number for ${item.name}`}
          value={currentValue}
          disabled={showAns || locked}
          onChange={(e) => onChange(item.id, Number(e.target.value))}
          className="month-select"
        >
          <option value="" disabled></option>
          {NUMBER_OPTIONS.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {!showAns && <span className="select-arrow">▼</span>}
      </div>

      <span
        className="month-name"
        role="button"
        tabIndex={0}
        onClick={onPlay}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onPlay();
          }
        }}
        aria-label={`Play ${item.name}`}
      >
        <Unit4PlayingAudioIcon active={active} />
        {item.name}
      </span>

      {wrong && !showAns && <span className="wrong-badge">✕</span>}
    </div>
  );
}

export default function WB_UnitX_Page25_QI() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const allAnswered = useMemo(
    () => MONTHS.every((item) => answers[item.id]),
    [answers],
  );

  const score = useMemo(() => {
    return MONTHS.reduce((total, item) => {
      return total + (answers[item.id] === item.correct ? 1 : 0);
    }, 0);
  }, [answers]);

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === MONTHS.length) return;
    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }
    const correctIds = MONTHS.filter(
      (item) => answers[item.id] === item.correct,
    ).map((item) => item.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);
    setWrongIds(
      MONTHS.filter((item) => answers[item.id] !== item.correct).map(
        (item) => item.id,
      ),
    );
    if (score === MONTHS.length)
      ValidationAlert.success(`Score: ${score} / ${MONTHS.length}`);
    else if (score > 0)
      ValidationAlert.warning(`Score: ${score} / ${MONTHS.length}`);
    else ValidationAlert.error(`Score: ${score} / ${MONTHS.length}`);
  };

  const handleShowAnswer = () => {
    const filledAnswers = MONTHS.reduce((acc, item) => {
      acc[item.id] = item.correct;
      return acc;
    }, {});
    setAnswers(filledAnswers);
    setLockedIds(MONTHS.map((item) => item.id));
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

  const isWrong = (item) => {
    return !showAns && wrongIds.includes(item.id);
  };

  return (
    <>
      <style>{`
        .months-card {
          width: 100%;
          // background: linear-gradient(180deg, #fcfcfc 0%, #f5f5f5 100%);
          border: 2px solid #5c5c5cff;
          border-radius: 24px;
          padding: 28px;
          box-sizing: border-box;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .months-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px 8px;
          align-items: start;
        }

        .month-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          min-height: 64px;
        }

        .select-box {
          position: relative;
          /* ✅ FIX: تصغير حجم الـ select box */
          width: 58px;
          // min-width: 58px;
          height: 45px;
          border: 2px solid #f39b42;
          border-radius: 14px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-sizing: border-box;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .select-box:focus-within {
          border-color: #f39b42;
          box-shadow: 0 0 0 4px rgba(243,155,66,0.15);
        }

        .select-box--wrong {
          border-color: red;
          background: #fff7f7;
        }

        .month-select {
          width: 100%;
          height: 100%;
          border: none;
          background: transparent;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          text-align: center;
          text-align-last: center;
          /* ✅ FIX: تصغير font size الـ select */
          font-size: 20px;
          font-weight: 500;
          color: #000;
          padding: 0 16px 0 8px;
        }

        .month-select:disabled {
          cursor: default;
          opacity: 1;
        }

        .select-arrow {
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          color: #666;
          pointer-events: none;
        }

        /* ✅ FIX: تصغير font size اسم الشهر ليتناسب مع العرض */
        .month-name {
          font-size: 18px;
          // font-weight: 600;
          color: #222;
          line-height: 1.2;
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        .wrong-badge {
          position: absolute;
              right: 65%;
    top: 15%;
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
          z-index: 2;
        }

        .months-actions {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 1100px) {
          .months-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 780px) {
          .months-card {
            padding: 20px 16px;
            border-radius: 20px;
          }
          .months-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 16px;
          }
          .month-item {
            gap: 10px;
            min-height: 56px;
          }
          .select-box {
            width: 52px;
            min-width: 52px;
            height: 46px;
            border-radius: 12px;
          }
          .month-select { font-size: 18px; }
          .month-name   { font-size: 16px; }
          .wrong-badge  { right: -6px; width: 22px; height: 22px; }
        }

        @media (max-width: 520px) {
          .months-grid { grid-template-columns: 1fr; }
          .months-card { padding: 18px 14px; }
          .month-item  { min-height: 54px; }
          .month-name  { font-size: 18px; white-space: normal; }
          .select-box  { width: 52px; min-width: 52px; height: 46px; }
          .month-select{ font-size: 18px; }
        }
      `}</style>

      <div className="main-container-component">
        <div
          className="div-forall"
          style={{
            gap: "90px",
          }}
        >
          <ExerciseHeader
            sectionLetter="I"
            title="Number the months in order."
            subTitle="Work through the months from January to December in sequence from the beginning, then assign each number only once."
          />

          <div className="months-card">
            <div className="months-grid">
              {MONTHS.map((item) => (
                <MonthItem
                  key={item.id}
                  item={item}
                  value={answers[item.id]}
                  onChange={handleChange}
                  showAns={showAns}
                  locked={lockedIds.includes(item.id)}
                  wrong={isWrong(item)}
                  active={activeAudioKey === `month-${item.id}`}
                  onPlay={() =>
                    playAudio(`month-${item.id}`, MONTH_AUDIO[item.name])
                  }
                />
              ))}
            </div>
          </div>

          <div className="months-actions">
            <Button
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
              checkAnswers={handleCheck}
            />
          </div>
        </div>
      </div>
    </>
  );
}
