import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import "./workbookUnit3Interactions.css";
import question1Audio from "../../../assets/audio/WorkBook/unit3/Page 19 - Exercise I/Item_001_Does_he_have_any_grapes.mp3";
import question2Audio from "../../../assets/audio/WorkBook/unit3/Page 19 - Exercise I/Item_002_Does_he_have_any_eggplants.mp3";
import question3Audio from "../../../assets/audio/WorkBook/unit3/Page 19 - Exercise I/Item_003_Does_he_have_any_carrots.mp3";
import question4Audio from "../../../assets/audio/WorkBook/unit3/Page 19 - Exercise I/Item_004_Does_he_have_any_apples.mp3";

const QUESTION_AUDIO = {
  1: question1Audio,
  2: question2Audio,
  3: question3Audio,
  4: question4Audio,
};
import exerciseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 19/Ex I  1.svg";

const QUESTIONS = [
  {
    id: 1,
    question: "Does he have any grapes?",
    correct: "No, he hasn’t any.",
  },
  {
    id: 2,
    question: "Does he have any eggplants?",
    correct: "Yes, he has some.",
  },
  {
    id: 3,
    question: "Does he have any carrots?",
    correct: "No, he hasn’t any.",
  },
  {
    id: 4,
    question: "Does he have any apples?",
    correct: "Yes, he has some.",
  },
];

const OPTIONS = [
  "Yes, he has some.",
  "No, he hasn’t any.",
  "Yes, he has any.",
  "No, he has some.",
];

export default function WB_Unit3_Page17_QI() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();

  const handleSelectChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [`a-${id}`]: value,
    }));
    setWrongIds((prev) => prev.filter((entry) => entry !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === QUESTIONS.length) return;

    const allAnswered = QUESTIONS.every((item) => answers[`a-${item.id}`]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = QUESTIONS.length;

    QUESTIONS.forEach((item) => {
      if (answers[`a-${item.id}`] === item.correct) {
        score++;
      }
    });

    setShowResults(true);
    setLockedIds(
      QUESTIONS.filter((item) => answers[`a-${item.id}`] === item.correct).map(
        (item) => item.id,
      ),
    );
    setWrongIds(
      QUESTIONS.filter((item) => answers[`a-${item.id}`] !== item.correct).map(
        (item) => item.id,
      ),
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
    const filledAnswers = {};

    QUESTIONS.forEach((item) => {
      filledAnswers[`a-${item.id}`] = item.correct;
    });

    setAnswers(filledAnswers);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(QUESTIONS.map((item) => item.id));
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

  const isWrong = (item) => {
    return wrongIds.includes(item.id);
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-i19-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.4vw, 20px);
          width: 100%;
        }

        .wb-i19-image-wrap {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .wb-i19-image-card {
          background: #fff;
          border-radius: clamp(14px, 2vw, 18px);
          padding: clamp(8px, 1.2vw, 10px);
          // width: 100%;
          // max-width: clamp(320px, 70vw, 620px);
          box-sizing: border-box;
        }

        .wb-i19-image {
          width: auto;
          height: 200px;
          display: block;
                
        }

        .wb-i19-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: clamp(4px, 1vw, 8px);
          width: 100%;
        }

        .wb-i19-row {
          display: flex;
         
          align-items: center;
          gap: clamp(10px, 1.5vw, 14px);
          width: 100%;
        }

        .wb-i19-num {
          font-size: clamp(16px, 1.7vw, 20px);
          font-weight: 700;
          color: #222;
          text-align: center;
          line-height: 1;
        }

        .wb-i19-question {
          font-size: clamp(14px, 1.4vw, 18px);
          color: #111;
          line-height: 1.3;
          width: 60%;
          word-break: break-word;
        }

        .wb-i19-select-wrap {
          position: relative;
          width: 100%;
        }

        .wb-i19-select {
          width: 100%;
          min-height: clamp(42px, 5vw, 50px);
          font-size: clamp(12px, 1.4vw, 18px);
          color: #000;
          border: none;
          border-bottom: 1px solid #444;
          outline: none;
          background: transparent;
          padding: 0 clamp(26px, 3vw, 32px) 4px 4px;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          box-sizing: border-box;
        }

        .wb-i19-arrow {
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: clamp(12px, 1.4vw, 14px);
          color: #666;
        }

        .wb-i19-wrong {
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

        .wb-i19-buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;
        }

        @media (max-width: 900px) {
          .wb-i19-row {
            grid-template-columns: clamp(28px, 4vw, 40px) minmax(0, 1fr);
          }

          .wb-i19-select-wrap {
            grid-column: 2 / 3;
          }
        }

        @media (max-width: 700px) {
          .wb-i19-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .wb-i19-select-wrap {
            grid-column: auto;
          }

          .wb-i19-num {
            text-align: left;
          }

          .wb-i19-question {
            font-size: clamp(15px, 4vw, 20px);
          }

          .wb-i19-select {
            font-size: clamp(15px, 4vw, 18px);
          }
        }

        @media (max-width: 480px) {
          .wb-i19-image-card {
            max-width: 100%;
          }
        }
      `}</style>

      <div
        className="div-forall mb-10"
        style={{
          gap: "10px",
        }}
      >
        <ExerciseHeader
          sectionLetter="I"
          title="Read, look, and write."
          subTitle="Use the Yes/No answer to the produce questions to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div className="wb-i19-wrap">
          <div className="wb-i19-image-wrap">
            <div className="wb-i19-image-card">
              <img
                src={exerciseImg}
                alt="A produce vendor standing behind grapes, eggplants, carrots, and apples"
                className="wb-i19-image"
              />
            </div>
          </div>

          <div className="wb-i19-list">
            {QUESTIONS.map((item, index) => {
              const value = answers[`a-${item.id}`] || "";

              return (
                <div key={item.id} className="wb-i19-row">
                  <div className="wb-i19-num">{index + 1}</div>

                  <div
                    className="wb-i19-question wb-unit3-audio-control wb-unit3-interactive"
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      playAudio(`question-${item.id}`, QUESTION_AUDIO[item.id])
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

                  <div className="wb-i19-select-wrap">
                    <select
                      value={value}
                      disabled={showAns || lockedIds.includes(item.id)}
                      onChange={(e) =>
                        handleSelectChange(item.id, e.target.value)
                      }
                      className="wb-i19-select"
                      style={{
                        cursor: showAns ? "default" : "pointer",
                        borderBottom: isWrong(item)
                          ? "2px solid red"
                          : "1px solid #1111118f",
                      }}
                    >
                      <option value="" disabled>
                        Select answer
                      </option>
                      {OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    {!showAns && <div className="wb-i19-arrow">▼</div>}

                    {isWrong(item) && <div className="wb-i19-wrong">✕</div>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="wb-i19-buttons">
            <Button
              checkAnswers={handleCheck}
              handleShowAnswer={handleShowAnswer}
              handleStartAgain={handleStartAgain}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
