import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";
import catAudio from "../../../assets/audio/WorkBook/unit7/Page 41 - Exercise E/Item_001_There's_a_cat.mp3";
import houseAudio from "../../../assets/audio/WorkBook/unit7/Page 41 - Exercise E/Item_002_the_toy_house.mp3";
import mouseAudio from "../../../assets/audio/WorkBook/unit7/Page 41 - Exercise E/Item_003_There's_a_mouse.mp3";
import cheeseAudio from "../../../assets/audio/WorkBook/unit7/Page 41 - Exercise E/Item_004_There's_cheese.mp3";

import houseImg from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U7 Folder/Page 41/SVG/1.svg";

const WRONG_COLOR = "red";
const RED_COLOR = "#000000ff";
const LINE_COLOR = "#333";
const OPTIONS = ["in", "on", "in front of"];

const ITEMS = [
  {
    id: 1,
    before: "There's a cat",
    after: "the toy house.",
    correct: "on",
    audio: catAudio,
  },
  {
    id: 2,
    before: "There's a mouse",
    after: "the toy house.",
    correct: "in",
    audio: mouseAudio,
  },
  {
    id: 3,
    before: "There's cheese",
    after: "the toy house.",
    correct: "in front of",
    audio: cheeseAudio,
  },
];

export default function WB_ReadLookWrite_PageE() {
  const [selected, setSelected] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleChange = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setSelected((prev) => ({ ...prev, [id]: value }));
    setWrongIds((prev) => prev.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;
    const allAnswered = ITEMS.every((i) => selected[i.id]);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }
    const correctIds = ITEMS.flatMap((i) =>
      selected[i.id] === i.correct ? [i.id] : [],
    );
    const incorrectIds = ITEMS.flatMap((i) =>
      selected[i.id] !== i.correct ? [i.id] : [],
    );
    const score = correctIds.length;
    setShowResults(true);
    setLockedIds(correctIds);
    setWrongIds(incorrectIds);
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
    setSelected(filled);
    setShowResults(true);
    setShowAns(true);
    setLockedIds(ITEMS.map((i) => i.id));
    setWrongIds([]);
    stopAudio();
  };

  const handleStartAgain = () => {
    setSelected({});
    setShowResults(false);
    setShowAns(false);
    setLockedIds([]);
    setWrongIds([]);
    stopAudio();
  };

  const isWrong = (item) => wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "70px",
        }}
      >
        {/* Title */}
        <ExerciseHeader
          sectionLetter="E"
          title={
            <>
              Read, look, and write <span style={{ color: "#2e3192" }}>in</span>
              , <span style={{ color: "#2e3192" }}>on</span>, or{" "}
              <span style={{ color: "#2e3192" }}>in front of</span>.
            </>
          }
          subTitle="Use the in, on, or in front of for the toy-house objects to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        {/* Main layout: sentences LEFT | house image RIGHT */}
        <div
          style={{
            display: "flex",

            gap: "clamp(20px,3vw,40px)",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Sentences */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "400px",
              justifyContent: "space-around",
            }}
          >
            {ITEMS.map((item) => {
              const wrong = isWrong(item);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(8px,1vw,14px)",
                    minWidth: 0,
                  }}
                >
                  {/* number */}
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: 500,
                      color: "#111",
                      lineHeight: 1.4,
                      flexShrink: 0,
                      minWidth: "clamp(14px,1.8vw,24px)",
                    }}
                  >
                    {item.id}
                  </span>

                  {/* sentence block */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      gap: "clamp(4px,0.5vw,7px)",
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    {/* before */}
                    <span
                      role="button"
                      tabIndex={0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() => playAudio(`prefix-${item.id}`, item.audio)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`prefix-${item.id}`, item.audio);
                        }
                      }}
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                        lineHeight: 1.4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `prefix-${item.id}`}
                      />
                      {item.before}
                    </span>

                    {/* dropdown */}
                    <div
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <select
                        disabled={showAns || lockedIds.includes(item.id)}
                        value={selected[item.id] || ""}
                        onChange={(e) => handleChange(item.id, e.target.value)}
                        style={{
                          minWidth: "clamp(80px,14vw,180px)",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          borderBottom: wrong
                            ? `2px solid ${WRONG_COLOR}`
                            : `1px solid ${LINE_COLOR}`,
                          borderRadius: 0,
                          // outline: "none",
                          fontSize: "20px",
                          // fontWeight: 700,
                          // color: RED_COLOR,
                          padding: "0 clamp(4px,0.6vw,8px) 3px 2px",
                          background: "transparent",
                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",
                          appearance: "auto",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="" disabled hidden></option>
                        {OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                      {/* wrong badge — يسار أعلى */}
                      {wrong && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "0px",
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
                            zIndex: 3,
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>

                    {/* after */}
                    <span
                      role="button"
                      tabIndex={0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() => playAudio(`suffix-${item.id}`, houseAudio)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`suffix-${item.id}`, houseAudio);
                        }
                      }}
                      style={{
                        fontSize: "18px",
                        // fontWeight: 500,
                        color: "#111",
                        lineHeight: 1.4,
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `suffix-${item.id}`}
                      />
                      {item.after}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* House image */}
          <div
            style={{
              // width: "clamp(180px,28vw,340px)",
              flexShrink: 0,
            }}
          >
            <img
              src={houseImg}
              alt="A toy house with a cat on the roof, a mouse inside, and cheese in front"
              style={{
                width: "auto",
                height: "400px",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "clamp(6px,1vw,12px)",
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
