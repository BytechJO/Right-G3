import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import WorkbookUnit1PlayingAudioIcon from "./WorkbookUnit1PlayingAudioIcon";
import useWorkbookUnit1Audio from "./useWorkbookUnit1Audio";
import slowFastAudio from "../../../assets/audio/WorkBook/unit1/Page 4 - Exercise C/Item_001_slow_fast.mp3";
import youngOldAudio from "../../../assets/audio/WorkBook/unit1/Page 4 - Exercise C/Item_002_young_old.mp3";
import oldYoungAudio from "../../../assets/audio/WorkBook/unit1/Page 4 - Exercise C/Item_003_old_young.mp3";
import bigSmallAudio from "../../../assets/audio/WorkBook/unit1/Page 4 - Exercise C/Item_004_big_small.mp3";
import fastSlowAudio from "../../../assets/audio/WorkBook/unit1/Page 4 - Exercise C/Item_005_fast_slow.mp3";
import shortTallAudio from "../../../assets/audio/WorkBook/unit1/Page 4 - Exercise C/Item_006_short_tall.mp3";
import heavyLightAudio from "../../../assets/audio/WorkBook/unit1/Page 4 - Exercise C/Item_007_heavy_light.mp3";
import "./workbookUnit1Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4/SVG/Asset 4.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    pairs: ["slow   fast", "young   old"],
    correct: "slow   fast",
  },
  {
    id: 2,
    img: img2,
    pairs: ["old   young", "big   small"],
    correct: "big   small",
  },
  {
    id: 3,
    img: img3,
    pairs: ["fast   slow", "short   tall"],
    correct: "short   tall",
  },
  {
    id: 4,
    img: img4,
    pairs: ["short   tall", "heavy   light"],
    correct: "heavy   light",
  },
];

const AUDIO_BY_PAIR = {
  "slow   fast": slowFastAudio,
  "young   old": youngOldAudio,
  "old   young": oldYoungAudio,
  "big   small": bigSmallAudio,
  "fast   slow": fastSlowAudio,
  "short   tall": shortTallAudio,
  "heavy   light": heavyLightAudio,
};

const IMAGE_ALTS = {
  1: "A bicycle beside a red car for a speed comparison",
  2: "A large dog beside a small bee for a size comparison",
  3: "A short child beside a tall clown for a height comparison",
  4: "A television beside a feather for a weight comparison",
};

export default function WB_Unit3_Page6_QC() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [correctItems, setCorrectItems] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useWorkbookUnit1Audio();

  const handleSelect = (id, value) => {
    if (showAns || correctItems.includes(id)) return;


    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns || correctItems.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    const nextCorrect = ITEMS.filter(
      (item) => answers[item.id] === item.correct,
    ).map((item) => item.id);
    const score = nextCorrect.length;

    setCorrectItems(nextCorrect);
    setShowResults(true);

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
    setCorrectItems(ITEMS.map((item) => item.id));
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
    setCorrectItems([]);
    stopAudio();
  };

  const renderPair = (item, pair) => {
    const selected = answers[item.id] === pair;
    const isCorrect = pair === item.correct;

    let borderStyle = "2px solid transparent";

    if (selected && !showResults) {
      borderStyle = "2px solid #f89631";
    }

    if (showResults) {
      if (selected && isCorrect) {
        borderStyle = "2px solid #f89631";
      } else if (selected && !isCorrect) {
        borderStyle = "2px solid red";
      }
    }

    return (
      <div
        role="button"
        tabIndex={0}
        className="wb-unit1-audio-control wb-unit1-interactive"
        onClick={() => {
          playAudio(`pair-${item.id}-${pair}`, AUDIO_BY_PAIR[pair]);
          handleSelect(item.id, pair);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            playAudio(`pair-${item.id}-${pair}`, AUDIO_BY_PAIR[pair]);
            handleSelect(item.id, pair);
          }
        }}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          // minWidth: "180px",
          // minHeight: "52px",
          padding: "6px 14px",
          border: borderStyle,
          borderRadius: "999px",
          background: "#fff",
          color: "#222",
          fontSize: "20px",
          // fontWeight: "500",
          lineHeight: "1.2",
          cursor: showAns ? "default" : "pointer",
          boxSizing: "border-box",
          userSelect: "none",
          transition: "all 0.25s ease",
          whiteSpace: "nowrap",
        }}
      >
        {pair}
        <WorkbookUnit1PlayingAudioIcon active={activeAudioKey === `pair-${item.id}-${pair}`} />

        {showResults && selected && !isCorrect && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "red",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              border: "2px solid #fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
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
      <div className="div-forall">
        <style>{`
          .wb-c6-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 60px 75px;
            width: 100%;
            align-items: start;
          }

          .wb-c6-item {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            min-width: 0;
          }

          .wb-c6-num {
            font-size: 22px;
            font-weight: 700;
            color: #222;
            line-height: 1;
            min-width: 18px;
            margin-top: 10px;
            flex-shrink: 0;
          }

          .wb-c6-body {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            width: 100%;
            min-width: 0;
          }

          .wb-c6-img-frame {
            // width: 100%;
            // max-width: 470px;
            // height: 140px;
            display: flex;
            align-items: center;
            justify-content: center;
            // overflow: hidden;
            box-sizing: border-box;
            background: transparent;
            border: none;
            border-radius: 0;
            box-shadow: none;
          }

          .wb-c6-img {
            // max-width: 100%;
            // max-height: 100%;
            width: 100%;
            height: 110px;
            object-fit: contain;
            display: block;
            border: none;
            box-shadow: none;
          }

          .wb-c6-pairs {
            display: flex;
            flex-wrap: wrap;
            // gap: 12px 16px;
            width: 80%;
            // padding-left: 0;
            justify-content: space-between;
          }

          .wb-c6-buttons {
            display: flex;
            justify-content: center;
            margin-top: 6px;
            width: 100%;
          }

          @media (max-width: 950px) {
            .wb-c6-grid {
              grid-template-columns: 1fr;
              gap: 28px;
            }

            .wb-c6-img-frame {
              max-width: 100%;
              height: 170px;
            }
          }

          @media (max-width: 768px) {
            .div-forall {
              padding: 0 20px;
            }

            .wb-c6-item {
              gap: 10px;
            }

            .wb-c6-num {
              font-size: 20px;
              margin-top: 8px;
            }

            .wb-c6-img-frame {
              height: 155px;
            }

            .wb-c6-pairs {
              gap: 10px 12px;
            }
          }

          @media (max-width: 600px) {
            .div-forall {
              padding: 0 16px;
            }

            .wb-c6-item {
              gap: 8px;
            }

            .wb-c6-body {
              gap: 12px;
            }

            .wb-c6-img-frame {
              height: 145px;
            }

            .wb-c6-pairs {
              flex-direction: column;
              align-items: stretch;
              gap: 10px;
            }

            .wb-c6-pairs > * {
              width: 100%;
            }
          }

          @media (max-width: 420px) {
            .div-forall {
              padding: 0 12px;
            }

            .wb-c6-num {
              font-size: 18px;
              min-width: 14px;
            }

            .wb-c6-img-frame {
              height: 125px;
            }
          }
        `}</style>

        <ExerciseHeader
          sectionLetter="C"
          title="Look and read. Circle the correct pair."
          subTitle="Look at the adjective pair that describes each picture pair first, compare all available options, then tap only the answer that matches."
        />

        <div className="wb-c6-grid">
          {ITEMS.map((item) => (
            <div key={item.id} className="wb-c6-item">
              <div className="wb-c6-num">{item.id}</div>

              <div className="wb-c6-body">
                <div className="wb-c6-img-frame">
                  <img
                    src={item.img}
                    alt={IMAGE_ALTS[item.id]}
                    className="wb-c6-img"
                  />
                </div>

                <div className="wb-c6-pairs">
                  {item.pairs.map((pair) => (
                    <React.Fragment key={pair}>
                      {renderPair(item, pair)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wb-c6-buttons">
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkDisabled={showAns || correctItems.length === ITEMS.length}
          />
        </div>
      </div>
    </div>
  );
}
