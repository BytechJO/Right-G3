import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit2PlayingAudioIcon from "./WorkbookUnit2PlayingAudioIcon";
import useWorkbookUnit2Audio from "./useWorkbookUnit2Audio";
import "./workbookUnit2Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 12/SVG/Asset 6.svg";
import shipAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_001_a_ship.mp3";
import policeCarAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_002_a_police_car.mp3";
import carAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_003_a_car.mp3";
import bikeAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_004_a_bike.mp3";
import motorcycleAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_005_a_motorcycle.mp3";
import taxiAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_006_a_taxi.mp3";
import truckAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_007_a_truck.mp3";
import airplaneAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_008_an_airplane.mp3";
import busAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_009_a_bus.mp3";
import scooterAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_010_a_scooter.mp3";
import subwayAudio from "../../../assets/audio/WorkBook/unit2/Page 12 - Exercise G/Item_011_the_subway.mp3";

const OPTION_AUDIO = {
  "a ship": shipAudio,
  "a police car": policeCarAudio,
  "a car": carAudio,
  "a bike": bikeAudio,
  "a motorcycle": motorcycleAudio,
  "a taxi": taxiAudio,
  "a truck": truckAudio,
  "an airplane": airplaneAudio,
  "a bus": busAudio,
  "a scooter": scooterAudio,
  "the subway": subwayAudio,
};

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["a ship", "a police car"],
    correct: "a ship",
  },
  {
    id: 2,
    img: img2,
    options: ["a car", "a bike"],
    correct: "a car",
  },
  {
    id: 3,
    img: img3,
    options: ["a motorcycle", "a bike"],
    correct: "a bike",
  },
  {
    id: 4,
    img: img4,
    options: ["a taxi", "a truck"],
    correct: "a taxi",
  },
  {
    id: 5,
    img: img5,
    options: ["an airplane", "a bus"],
    correct: "an airplane",
  },
  {
    id: 6,
    img: img6,
    options: ["a scooter", "the subway"],
    correct: "the subway",
  },
];
const ACTIVE_COLOR = "#f39b42";
const WRONG_COLOR = "#ef4444";

export default function WB_Unit3_Page6_QG() {
  const [answers, setAnswers] = useState({});
  const [checkedIds, setCheckedIds] = useState([]);
  const [correctIds, setCorrectIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit2Audio();

  const handleSelect = (id, value) => {
    if (showAns || correctIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setCheckedIds((previous) => previous.filter((itemId) => itemId !== id));
  };

  const handleCheck = () => {
    if (showAns || correctIds.length === ITEMS.length) return;

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

    setCheckedIds(ITEMS.map((item) => item.id));
    setCorrectIds(
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setCheckedIds(ITEMS.map((item) => item.id));
    setCorrectIds(ITEMS.map((item) => item.id));
    setShowAns(true);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCheckedIds([]);
    setCorrectIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isWrong = (item) => {
    if (!checkedIds.includes(item.id) || showAns) return false;
    return answers[item.id] && answers[item.id] !== item.correct;
  };

  const renderOption = (item, option) => {
    const selected = answers[item.id] === option;
    const wrong = isWrong(item) && selected;
    const showCorrectAsSelected = showAns && item.correct === option;

    return (
      <div
        role="button"
        tabIndex={0}
        aria-pressed={selected || showCorrectAsSelected}
        aria-disabled={showAns || correctIds.includes(item.id)}
        onClick={() => {
          playAudio(`option-${item.id}-${option}`, OPTION_AUDIO[option]);
          handleSelect(item.id, option);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            playAudio(`option-${item.id}-${option}`, OPTION_AUDIO[option]);
            handleSelect(item.id, option);
          }
        }}
        className={`wb-g6-option ${
          selected || showCorrectAsSelected ? "selected" : ""
        } ${wrong ? "wrong" : ""} ${showAns ? "disabled" : ""}`}
      >
        {option}
        <WorkbookUnit2PlayingAudioIcon
          active={activeAudioKey === `option-${item.id}-${option}`}
        />

        {wrong && <div className="wb-g6-wrong-badge">✕</div>}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-g6-wrap {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 2.4vw, 28px);
          width: 100%;
        }

        .wb-g6-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: clamp(28px, 4vw, 46px);
          row-gap: clamp(18px, 2.4vw, 28px);
          width: 100%;
          align-items: start;
        }

        .wb-g6-item {
          display: grid;
          grid-template-columns: clamp(20px, 2.4vw, 28px) clamp(70px, 11vw, 115px) minmax(0, 1fr);
          gap: clamp(10px, 1.6vw, 18px);
          align-items: center;
          width: 100%;
        }

        .wb-g6-number {
          font-size: clamp(12px, 1.4vw, 18px);
          font-weight: 700;
          color: #222;
          line-height: 1;
              height: 100%;
        }

        .wb-g6-image-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(72px, 11vw, 120px);
        }

        .wb-g6-image {
          max-width: 100%;
          max-height: clamp(72px, 11vw, 120px);
          width: auto;
          height: auto;
          object-fit: contain;
          display: block;
        }

        .wb-g6-options {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1vw, 12px);
          min-width: 0;
        }

        .wb-g6-option {
          position: relative;
          width: fit-content;
          max-width: 100%;
          padding: clamp(4px, 0.6vw, 6px) clamp(16px, 2vw, 26px);
          border: 2px solid transparent;
          border-radius: 999px;
          background: transparent;
          color: #222;
          font-size: clamp(12px, 1.4vw, 18px);
          font-weight: 500;
          line-height: 1.2;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
          box-sizing: border-box;
          white-space: normal;
          word-break: break-word;
        }

        .wb-g6-option.selected {
          border-color: ${ACTIVE_COLOR};
        }

        .wb-g6-option.wrong {
          border-color: red
        }

        .wb-g6-option.disabled {
          cursor: default;
        }

        .wb-g6-wrong-badge {
          position: absolute;
          top: clamp(-8px, -0.8vw, -6px);
          right: clamp(-8px, -0.8vw, -6px);
          width: clamp(18px, 2vw, 22px);
          height: clamp(18px, 2vw, 22px);
          border-radius: 50%;
          background: red;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 700;
          border: 2px solid #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          box-sizing: border-box;
        }

        .wb-g6-buttons {
          display: flex;
          justify-content: center;
          margin-top: clamp(2px, 0.8vw, 6px);
        }

        @media (max-width: 900px) {
          .wb-g6-grid {
            column-gap: 22px;
            row-gap: 20px;
          }

          .wb-g6-item {
            grid-template-columns: 22px clamp(62px, 10vw, 90px) minmax(0, 1fr);
            gap: 10px;
          }

          .wb-g6-option {
            font-size: clamp(12px, 1.4vw, 18px);
          }
        }

        @media (max-width: 650px) {
          .wb-g6-grid {
            grid-template-columns: 1fr;
            row-gap: 18px;
          }

          .wb-g6-item {
            grid-template-columns: 22px clamp(70px, 16vw, 90px) minmax(0, 1fr);
          }

          .wb-g6-image-wrap {
            min-height: 76px;
          }

          .wb-g6-image {
            max-height: 76px;
          }
        }

        @media (max-width: 430px) {
          .wb-g6-item {
            grid-template-columns: 18px 58px minmax(0, 1fr);
            gap: 8px;
          }

          .wb-g6-option {
            font-size: 14px;
            padding: 4px 14px;
            border-width: 2px;
          }

          .wb-g6-number {
            font-size: 17px;
          }
        }
      `}</style>

      <div className="div-forall" style={{ gap: "35px" }}>
        <ExerciseHeader
          sectionLetter="G"
          title="Look, read, and circle."
          subTitle="Look at the transportation word that matches each picture first, compare all available options, then tap only the answer that matches."
        />

        <div className="wb-g6-wrap">
          <div className="wb-g6-grid">
            {ITEMS.map((item) => (
              <div key={item.id} className="wb-g6-item">
                <div className="wb-g6-number">{item.id}</div>

                <div className="wb-g6-image-wrap">
                  <img
                    src={item.img}
                    alt={
                      item.id === 1
                        ? "A ship"
                        : item.id === 2
                          ? "A blue car"
                          : item.id === 3
                            ? "A bicycle"
                            : item.id === 4
                              ? "A taxi"
                              : item.id === 5
                                ? "An airplane"
                                : "A subway train at a station"
                    }
                    className="wb-g6-image"
                  />
                </div>

                <div className="wb-g6-options">
                  {item.options.map((option) => (
                    <div key={option}>{renderOption(item, option)}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="wb-g6-buttons">
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
