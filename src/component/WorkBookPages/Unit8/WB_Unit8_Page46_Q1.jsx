import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import yesAudio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_001_Yes.mp3";
import q1Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_002_Did_Grandma_have_a_radio.mp3";
import q2Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_003_Did_she_have_a_TV.mp3";
import q3Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_004_Did_she_have_a_cat.mp3";
import q4Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_005_Did_she_have_a_bird.mp3";
import noAudio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_005_No,.mp3";
import q5Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_006_Did_she_have_a_lamp.mp3";
import q6Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_007_Did_she_have_a_phone.mp3";
import q7Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_008_Did_she_have_a_rug.mp3";
import q8Audio from "../../../assets/audio/WorkBook/unit8/Page 46 - Exercise C/Item_009_Did_she_have_a_mirror.mp3";

import roomImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/1.svg";

const BORDER_COLOR = "#f39b42";
const WRONG_COLOR = "red";
import trueIcon from "../../../assets/imgs/true.svg";
const ITEMS = [
  { id: 1, text: "Did Grandma have a radio?", correct: "yes", audio: q1Audio },
  { id: 2, text: "Did she have a TV?", correct: "no", audio: q2Audio },
  { id: 3, text: "Did she have a cat?", correct: "no", audio: q3Audio },
  { id: 4, text: "Did she have a bird?", correct: "no", audio: q4Audio },
  { id: 5, text: "Did she have a lamp?", correct: "yes", audio: q5Audio },
  { id: 6, text: "Did she have a phone?", correct: "no", audio: q6Audio },
  { id: 7, text: "Did she have a rug?", correct: "yes", audio: q7Audio },
  { id: 8, text: "Did she have a mirror?", correct: "no", audio: q8Audio },
];

export default function WB_YesNo_PageC() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: prev[id] === value ? undefined : value,
    }));
    setWrongIds((previous) => previous.filter((itemId) => itemId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => answers[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    let score = 0;
    ITEMS.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });
    setLockedIds(
      ITEMS.flatMap((item) =>
        answers[item.id] === item.correct ? [item.id] : [],
      ),
    );
    setWrongIds(
      ITEMS.flatMap((item) =>
        answers[item.id] !== item.correct ? [item.id] : [],
      ),
    );
    const total = ITEMS.length;
    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};
    ITEMS.forEach((i) => {
      filled[i.id] = i.correct;
    });
    setAnswers(filled);
    setLockedIds(ITEMS.map((item) => item.id));
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

  const isWrong = (item) => wrongIds.includes(item.id);

  const renderCheckbox = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;

    return (
      <div
        role="button"
        tabIndex={showAns || lockedIds.includes(item.id) ? -1 : 0}
        aria-disabled={showAns || lockedIds.includes(item.id)}
        aria-label={`${value} for ${item.text}`}
        onClick={() => {
          if (!showAns && !lockedIds.includes(item.id)) {
            playAudio(
              `answer-${item.id}-${value}`,
              value === "yes" ? yesAudio : noAudio,
            );
            handleSelect(item.id, value);
          }
        }}
        onKeyDown={(event) => {
          if (
            (event.key === "Enter" || event.key === " ") &&
            !showAns &&
            !lockedIds.includes(item.id)
          ) {
            event.preventDefault();
            playAudio(
              `answer-${item.id}-${value}`,
              value === "yes" ? yesAudio : noAudio,
            );
            handleSelect(item.id, value);
          }
        }}
        style={{
          position: "relative",
          width: "40px",
          height: "40px",
          border: wrong ? "2px solid red" : `1px solid ${BORDER_COLOR}`,
          borderRadius: "clamp(5px,0.6vw,8px)",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor:
            showAns || lockedIds.includes(item.id) ? "default" : "pointer",
          boxSizing: "border-box",
          flexShrink: 0,
          transition: "border-color 0.2s",
        }}
      >
        {selected && (
          <img src={trueIcon} alt="Selected" style={{ height: "25px" }} />
        )}
        <Unit4PlayingAudioIcon
          active={activeAudioKey === `answer-${item.id}-${value}`}
        />

        {/* wrong badge — يسار أعلى */}
        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-7px",
              right: "-10px",
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

              zIndex: 5,
              pointerEvents: "none",
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
      <div
        className="div-forall"
        style={{
          gap: "30px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="C"
          title={
            <>
              Look and write <span style={{ color: "#D1232A" }}>✓</span> for{" "}
              <span style={{ color: "#2e3192" }}>Yes</span> or{" "}
              <span style={{ color: "#2e3192" }}>No</span>.
            </>
          }
          subTitle="Read each Yes/No response about Grandma’s room objects carefully, use the picture or sentence evidence to check it, then choose the correct Yes/No or True/False response."
        />

        {/* Main layout: image LEFT | table RIGHT */}
        <div
          style={{
            display: "flex",
            gap: "clamp(16px,2.5vw,32px)",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Room image */}

          <img
            src={roomImg}
            alt="Grandma sitting in her room with a lamp, rug, radio, and mirror"
            style={{
              width: "auto",
              height: "390px",
              display: "block",
              userSelect: "none",
            }}
          />

          {/* Questions table */}
          <div style={{ minWidth: 0 }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "35px",
                marginBottom: "clamp(8px,1vw,12px)",
                paddingRight: "clamp(4px,0.5vw,8px)",
              }}
            >
              <div />
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#111",
                }}
              >
                Yes
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#111",
                }}
              >
                No
              </div>
            </div>

            {/* Rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "370px",
                justifyContent: "space-between",
                // gap: "9px",
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "clamp(6px,1vw,12px)",
                    alignItems: "center",
                  }}
                >
                  {/* sentence */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(6px,0.8vw,12px)",
                      width: 300,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "#111",
                        lineHeight: 1,
                        flexShrink: 0,
                        minWidth: "clamp(12px,1.6vw,22px)",
                      }}
                    >
                      {item.id}
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() =>
                        playAudio(`question-${item.id}`, item.audio)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`question-${item.id}`, item.audio);
                        }
                      }}
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                        lineHeight: 1.35,
                        wordBreak: "break-word",
                        transition: "color 0.2s",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `question-${item.id}`}
                      />
                      {item.text}
                    </span>
                  </div>

                  {/* Yes checkbox */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {renderCheckbox(item, "yes")}
                  </div>

                  {/* No checkbox */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {renderCheckbox(item, "no")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(6px,1vw,12px)",
          }}
        >
          <Button
            checkAnswers={handleCheck}
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
          />
        </div>
      </div>
    </div>
  );
}
