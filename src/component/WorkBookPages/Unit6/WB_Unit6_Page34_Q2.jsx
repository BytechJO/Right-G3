import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

// الصور
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U6 Folder/Page 34/D.1.svg";
import item1Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/Item_001_The_third_boy.mp3";
import item2Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/Item_002_The_boy_is_riding_a_bike.mp3";
import item3Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/Item_003_The_sixth_boy.mp3";
import item4Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/Item_004_The_boy_is_kicking_the_ball.mp3";
import item5Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/Item_005_The_fourth_boy.mp3";
import item6Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/Item_006_The_boy_is_skateboarding.mp3";
import full1Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/full3.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/full4.mp3";
import full5Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/full5.mp3";
import full6Audio from "../../../assets/audio/WorkBook/unit6/Page 34 - Exercise D/full6.mp3";

const WRONG_COLOR = "#ef4444";
const ITEM_AUDIO = {
  1: item1Audio,
  2: item2Audio,
  3: item3Audio,
  4: item4Audio,
  5: item5Audio,
  6: item6Audio,
};
const FULL_AUDIO = {
  1: full1Audio,
  2: full2Audio,
  3: full3Audio,
  4: full4Audio,
  5: full5Audio,
  6: full6Audio,
};

const ITEMS = [
  {
    id: 1,
    // img: img3,
    sentence: { before: "The third boy", after: "." },
    correct: "is running",
    options: ["is running", "is singing", "is eating an ice cream"],
  },
  {
    id: 2,
    // img: img1,
    sentence: { before: "The", after: "boy is riding a bike." },
    correct: "first",
    options: ["first", "second", "fifth"],
  },
  {
    id: 3,
    // img: img6,
    sentence: { before: "The sixth boy", after: "." },
    correct: "is eating an ice cream",
    options: ["is running", "is eating an ice cream", "is singing"],
  },
  {
    id: 4,
    // img: img5,
    sentence: { before: "The", after: "boy is kicking the ball." },
    correct: "fifth",
    options: ["first", "second", "fifth"],
  },
  {
    id: 5,
    // img: img4,
    sentence: { before: "The fourth boy", after: "." },
    correct: "is singing",
    options: ["is singing", "is running", "is eating an ice cream"],
  },
  {
    id: 6,
    // img: img2,
    sentence: { before: "The", after: "boy is skateboarding." },
    correct: "second",
    options: ["first", "second", "fifth"],
  },
];

export default function WB_LookReadWrite_PageD() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, value) => {
    if (showAns || lockedIds.includes(id)) return;
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
    setWrongIds((previous) => previous.filter((wrongId) => wrongId !== id));
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === ITEMS.length) return;

    const allAnswered = ITEMS.every((i) => answers[i.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((i) => {
      if (answers[i.id] === i.correct) score++;
    });

    setShowResults(true);
    setLockedIds((previous) => [
      ...new Set([
        ...previous,
        ...ITEMS.filter((item) => answers[item.id] === item.correct).map(
          (item) => item.id,
        ),
      ]),
    ]);
    setWrongIds(
      ITEMS.filter((item) => answers[item.id] !== item.correct).map(
        (item) => item.id,
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

  const isWrong = (item) =>
    showResults && !showAns && wrongIds.includes(item.id);

  return (
    <div className="main-container-component">
      <div className="div-forall">
        {/* Title */}
        <ExerciseHeader
          sectionLetter="D"
          title="Look, read, and write."
          subTitle="Use the ordinal boy and action in each sentence to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />
           
       <div className="flex flex-col justify-start items-start gap-20">
          <img
            src={img1}
            alt="Six boys in order: riding a bike, skateboarding, running, singing, kicking a ball, and eating ice cream"
            style={{ width: "auto", height: "150px", objectFit: "contain" }}
          />
    

        {/* Questions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className={
                lockedIds.includes(item.id)
                  ? "unit4-full-audio-enabled unit4-audio-control"
                  : ""
              }
              role={lockedIds.includes(item.id) ? "button" : undefined}
              tabIndex={lockedIds.includes(item.id) ? 0 : undefined}
              onClick={() => {
                if (lockedIds.includes(item.id))
                  playAudio(`full-${item.id}`, FULL_AUDIO[item.id]);
              }}
              onKeyDown={(event) => {
                if (
                  lockedIds.includes(item.id) &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  event.preventDefault();
                  playAudio(`full-${item.id}`, FULL_AUDIO[item.id]);
                }
              }}
              style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}
            >
              <Unit4PlayingAudioIcon
                active={activeAudioKey === `full-${item.id}`}
              />
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {item.id}
              </span>

              <span
                className="unit4-audio-control unit4-interactive"
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  if (lockedIds.includes(item.id)) return;
                  event.stopPropagation();
                  playAudio(`item-${item.id}`, ITEM_AUDIO[item.id]);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    if (lockedIds.includes(item.id)) return;
                    event.preventDefault();
                    event.stopPropagation();
                    playAudio(`item-${item.id}`, ITEM_AUDIO[item.id]);
                  }
                }}
                style={{ fontSize: "18px", position: "relative", cursor: "pointer" }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `item-${item.id}`}
                />
                {item.sentence.before}
              </span>

              <select
                value={answers[item.id] || ""}
                onChange={(e) => handleSelect(item.id, e.target.value)}
                disabled={showAns || lockedIds.includes(item.id)}
                onClick={(event) => {
                  if (!lockedIds.includes(item.id)) event.stopPropagation();
                }}
                style={{
                  minWidth: "140px",
                  height: "36px",
                  // borderRadius: "8px",
                  borderBottom: `2px solid ${
                    isWrong(item) ? WRONG_COLOR : "#ccc"
                  }`,
                  padding: "4px 8px",
                  fontSize: "18px",
                  pointerEvents: lockedIds.includes(item.id) ? "none" : "auto",
                }}
              >
                <option value="" disabled>
                  Select
                </option>

                {item.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* wrong icon */}
              {isWrong(item) && (
                <span
                  style={{
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
                  }}
                >
                  ✕
                </span>
              )}

              <span style={{ fontSize: "18px" }}>{item.sentence.after}</span>
            </div>
          ))}
        </div>
</div>
        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center" }}>
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
