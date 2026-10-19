import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import conversation1 from "../../../assets/audio/WorkBook/unit4/Page 24 - Exercise G/Item_001_The_trees_don't_have_any_leaves._There_are_a_lot_of_leaves_on_the_ground.mp3";
import conversation2 from "../../../assets/audio/WorkBook/unit4/Page 24 - Exercise G/Item_002_The_sun_is_shining_in_the_sky_most_days._The_weather_is_getting_warm._Th.mp3";

import left1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 1.svg";
import right1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 2.svg";
import left2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 3.svg";
import right2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 4.svg";
import left3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 5.svg";
import right3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 24/Ex G 6.svg";

const ITEMS = [
  {
    id: 1,
    leftImg: left1,
    rightImg: right1,
    correct: "autumn",
    selectPos: {
      top: "79%",
      left: "34%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    id: 2,
    leftImg: left2,
    rightImg: right2,
    correct: "spring",
    selectPos: {
      top: "83%",
      left: "36%",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    id: 3,
    leftImg: left3,
    rightImg: right3,
    correct: "summer",
    selectPos: {
      top: "81%",
      left: "31%",
      transform: "translate(-50%, -50%)",
    },
  },
];

const OPTIONS = ["spring", "summer", "autumn", "winter"];
const AUDIO = { 1: conversation1, 2: conversation2 };

export default function WB_Unit3_Page24_QG() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
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

    const correctIds = ITEMS.filter(
      (item) => answers[item.id] === item.correct,
    ).map((item) => item.id);
    setLockedIds((prev) => [...new Set([...prev, ...correctIds])]);
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
    const filled = {};
    ITEMS.forEach((item) => {
      filled[item.id] = item.correct;
    });

    setAnswers(filled);
    setLockedIds(ITEMS.map((item) => item.id));
    setWrongIds([]);
    setShowAns(true);
    stopAudio();
  };

  const handleReset = () => {
    setAnswers({});
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  const isWrong = (item) => {
    return wrongIds.includes(item.id);
  };

  return (
    <div className="main-container-component">
      <style>{`
  .wb-g24-list {
    display: flex;
    flex-direction: column;
    gap: 34px;
    width: 100%;
  }

  .wb-g24-row {
    display: flex;
    gap: 16px;
    align-items: center;
    width: 100%;
  }

  .wb-g24-num {
    font-size: 22px;
    font-weight: 700;
    color: #222;
    align-self: start;
    padding-top: 34px;
  }

  /* 🔥 صار ريسبونسف */
  .wb-g24-side-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }

  .wb-g24-select {
   
    outline: none;
    background: transparent;
    position :relative;
    border-bottom: 1px solid #000000ff;
    appearance: none;
    min-width: clamp(60px, 10vw, 92px);
    font-size: clamp(12px, 1.5vw, 18px);
    cursor: pointer;
    text-transform: lowercase;
  }

  .wb-g24-select:disabled {
    cursor: default;
    opacity: 1;
  }

  .wb-g24-select-wrap {
    position: absolute;
    display: inline-flex;
    align-items: center;
  }

  .wb-g24-arrow {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #666;
    pointer-events: none;
  }

  .wb-g24-wrong {
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
    box-shadow: 0 2px 6px rgba(0,0,0,0.18);
  }

  .wb-g24-buttons {
    display: flex;
    justify-content: center;
    margin-top: 8px;
  }
`}</style>

      <div className="div-forall">
        <ExerciseHeader
          sectionLetter="G"
          title="Read and complete the conversations."
          subTitle="Use the season described in each conversation to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div className="wb-g24-list">
          {ITEMS.map((item) => {
            const value = answers[item.id] || "";

            return (
              <div key={item.id} className="wb-g24-row">
                <div className="wb-g24-num">{item.id}</div>
                <div
                  style={{
                    position: "relative",
                    width: "400px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.leftImg}
                    alt={`Conversation ${item.id} speaker describing the ${item.correct} season`}
                    role={AUDIO[item.id] ? "button" : undefined}
                    tabIndex={AUDIO[item.id] ? 0 : -1}
                    aria-label={
                      AUDIO[item.id]
                        ? `Play conversation ${item.id}`
                        : undefined
                    }
                    onClick={() => {
                      if (!AUDIO[item.id]) return;

                      playAudio(`conversation-${item.id}`, AUDIO[item.id]);
                    }}
                    onKeyDown={(event) => {
                      if (!AUDIO[item.id]) return;

                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();

                        playAudio(`conversation-${item.id}`, AUDIO[item.id]);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      cursor: AUDIO[item.id] ? "pointer" : "default",
                      outline: "none",
                      borderRadius: "6px",
                    }}
                  />

                  {AUDIO[item.id] && (
                    <div
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "6px",
                        pointerEvents: "none",
                        zIndex: 2,
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `conversation-${item.id}`}
                      />
                    </div>
                  )}
                </div>

                <div className="wb-g24-side-right">
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "250px",
                    }}
                  >
                    <img
                      src={item.rightImg}
                      alt={`Illustrated ${item.correct} season conversation`}
                      className="wb-g24-side-img"
                    />

                    <div
                      className="wb-g24-select-wrap"
                      style={{
                        ...item.selectPos,
                      }}
                    >
                      <select
                        value={value}
                        disabled={showAns || lockedIds.includes(item.id)}
                        onChange={(e) => handleSelect(item.id, e.target.value)}
                        className="wb-g24-select"
                        style={{
                          borderBottom: isWrong(item)
                            ? "2px solid red"
                            : "1px solid black",
                          position: "relative",
                        }}
                      >
                        <option value="" disabled>
                          select
                        </option>
                        {OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      {!showAns && <span className="wb-g24-arrow">▼</span>}
                      {isWrong(item) && <div className="wb-g24-wrong">✕</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="wb-g24-buttons">
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
