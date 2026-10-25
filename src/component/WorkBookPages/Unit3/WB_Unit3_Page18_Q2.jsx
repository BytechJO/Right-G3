import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit3PlayingAudioIcon from "./WorkbookUnit3PlayingAudioIcon";
import useWorkbookUnit3Audio from "./useWorkbookUnit3Audio";
import "./workbookUnit3Interactions.css";
import shopkeeper1Audio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise H/Item_001_Shopkeeper_1.mp3";
import shopkeeper2Audio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise H/Item_002_Shopkeeper_2.mp3";
import shopkeeper3Audio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise H/Item_003_Shopkeeper_3.mp3";
import description1Audio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise H/Item_004_I_have_some_shorts,_and_I_have_some_shoes._I_don't_have_any_dresses,_but.mp3";
import description2Audio from "../../../assets/audio/WorkBook/unit3/Page 18 - Exercise H/Item_005_I_have_some_shoes,_and_I_have_some_socks._I_have_some_dresses_too._I_don.mp3";

const SHOPKEEPER_AUDIO = {
  "Shopkeeper 1": shopkeeper1Audio,
  "Shopkeeper 2": shopkeeper2Audio,
  "Shopkeeper 3": shopkeeper3Audio,
};
const DESCRIPTION_AUDIO = { 1: description1Audio, 2: description2Audio };

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex H 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex H 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U3 Folder/Page 18/Ex H 3.svg";

const ITEMS = [
  {
    id: 1,
    text: "I have some shorts, and I have some shoes. I don’t have any dresses, but I have some hats.",
    correct: "Shopkeeper 3",
  },
  {
    id: 2,
    text: "I have some shoes, and I have some socks. I have some dresses too. I don’t have any hats.",
    correct: "Shopkeeper 1",
  },
];

const OPTIONS = ["Shopkeeper 1", "Shopkeeper 2", "Shopkeeper 3"];

export default function WB_Unit3_Page18_QH() {
  const [answers, setAnswers] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit3Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    playAudio(`shopkeeper-${value}`, SHOPKEEPER_AUDIO[value]);
    setWrongIds((prev) => prev.filter((entry) => entry !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
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
    setWrongIds(
      ITEMS.filter((item) => answers[item.id] !== item.correct).map(
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
        .wb-h18-wrap {
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: 100%;
        }

        .wb-h18-top-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(14px, 2vw, 22px);
          align-items: start;
          justify-items: center;
          width: 100%;
        }

        .wb-h18-shop {
        width:100%;
         display: flex;
    flex-direction: column;
    align-items: center;
        }

        .wb-h18-shop-img {
          width:250px;
          height: auto;
          object-fit: cover;
          display: block;
                         
        }

        .wb-h18-shop-label {
          font-size: clamp(15px, 1.7vw, 18px);
          color: #333;
          font-weight: 500;
        }

        .wb-h18-list {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2vw, 20px);
          margin-top: 4px;
        }

        .wb-h18-row {
          display: flex;
          
          gap: clamp(10px, 1.5vw, 14px);
          align-items: center;
          width: 100%;
        }

        .wb-h18-num {
          font-size: clamp(16px, 1.7vw, 20px);
          font-weight: 700;
          color: #222;
          line-height: 1;
        }

        .wb-h18-text {
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.5;
          color: #333;
          border: 1px solid #f39b42;
          border-radius: clamp(12px, 1.6vw, 16px);
          padding: clamp(10px, 1.5vw, 12px) clamp(12px, 1.7vw, 14px);
          background: #fff;
          min-width: 0;
          word-break: break-word;
        }

        .wb-h18-select-wrap {
          position: relative;
          display: flex;
          align-items: center;
          min-height: clamp(42px, 5vw, 48px);
          width: 100%;
        }

        .wb-h18-select {
          width: 100%;
          font-size: clamp(14px, 1.4vw, 18px);
          color: #000;
          border: none;
          border-bottom: 1px solid #444;
          outline: none;
          background: transparent;
          padding: 4px 0 6px;
          appearance: auto;
        }

        .wb-h18-select.wrong {
          border-bottom: 2px solid red;
        }

        .wb-h18-wrong {
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

        .wb-h18-buttons {
          display: flex;
          justify-content: center;
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .wb-h18-top-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
          }

          .wb-h18-row {
            grid-template-columns: clamp(24px, 3vw, 34px) minmax(0, 1fr);
          }

          .wb-h18-select-wrap {
            grid-column: 2 / 3;
          }
        }

        @media (max-width: 700px) {
          .wb-h18-top-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .wb-h18-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .wb-h18-select-wrap {
            grid-column: auto;
          }

          .wb-h18-shop-img {
            width: clamp(160px, 55vw, 240px);
            height: clamp(120px, 34vw, 170px);
          }
        }

        @media (max-width: 480px) {
          .wb-h18-select {
            font-size: clamp(15px, 4vw, 18px);
          }

          .wb-h18-text {
            font-size: clamp(14px, 3.8vw, 16px);
          }
        }
      `}</style>

      <div
        className="div-forall"
        style={{
          gap: "50px",
        }}
      >
        <ExerciseHeader
          sectionLetter="H"
          title="Look, read, and write."
          subTitle="Use the shopkeeper number that matches each description to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div className="wb-h18-wrap">
          <div className="wb-h18-top-grid">
            <div
              className="wb-h18-shop wb-unit3-audio-control wb-unit3-interactive"
              role="button"
              tabIndex={0}
              onClick={() =>
                playAudio("shopkeeper-Shopkeeper 1", shopkeeper1Audio)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  playAudio("shopkeeper-Shopkeeper 1", shopkeeper1Audio);
                }
              }}
            >
              <WorkbookUnit3PlayingAudioIcon
                active={activeAudioKey === "shopkeeper-Shopkeeper 1"}
              />
              <img
                src={img1}
                alt="Shopkeeper 1 with shoes, socks, and dresses"
                className="wb-h18-shop-img"
              />
              <div className="wb-h18-shop-label">Shopkeeper 1</div>
            </div>

            <div
              className="wb-h18-shop wb-unit3-audio-control wb-unit3-interactive"
              role="button"
              tabIndex={0}
              onClick={() =>
                playAudio("shopkeeper-Shopkeeper 2", shopkeeper2Audio)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  playAudio("shopkeeper-Shopkeeper 2", shopkeeper2Audio);
                }
              }}
            >
              <WorkbookUnit3PlayingAudioIcon
                active={activeAudioKey === "shopkeeper-Shopkeeper 2"}
              />
              <img
                src={img2}
                alt="Shopkeeper 2 with displayed clothing items"
                className="wb-h18-shop-img"
              />
              <div className="wb-h18-shop-label">Shopkeeper 2</div>
            </div>

            <div
              className="wb-h18-shop wb-unit3-audio-control wb-unit3-interactive"
              role="button"
              tabIndex={0}
              onClick={() =>
                playAudio("shopkeeper-Shopkeeper 3", shopkeeper3Audio)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  playAudio("shopkeeper-Shopkeeper 3", shopkeeper3Audio);
                }
              }}
            >
              <WorkbookUnit3PlayingAudioIcon
                active={activeAudioKey === "shopkeeper-Shopkeeper 3"}
              />
              <img
                src={img3}
                alt="Shopkeeper 3 with shorts, shoes, and hats"
                className="wb-h18-shop-img"
              />
              <div className="wb-h18-shop-label">Shopkeeper 3</div>
            </div>
          </div>

          <div className="wb-h18-list">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-h18-row">
                <span className="wb-h18-num">{item.id}</span>

                <div
                  className="wb-h18-text wb-unit3-audio-control wb-unit3-interactive"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    playAudio(
                      `description-${item.id}`,
                      DESCRIPTION_AUDIO[item.id],
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      playAudio(
                        `description-${item.id}`,
                        DESCRIPTION_AUDIO[item.id],
                      );
                    }
                  }}
                >
                  <WorkbookUnit3PlayingAudioIcon
                    active={activeAudioKey === `description-${item.id}`}
                  />
                  {item.text}
                </div>

                <div className="wb-h18-select-wrap">
                  <select
                    value={answers[item.id] || ""}
                    onChange={(e) => handleSelect(item.id, e.target.value)}
                    disabled={showAns || lockedIds.includes(item.id)}
                    className={`wb-h18-select ${isWrong(item) ? "wrong" : ""}`}
                  >
                    <option value="">Select...</option>
                    {OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {isWrong(item) && <div className="wb-h18-wrong">✕</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="wb-h18-buttons">
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
