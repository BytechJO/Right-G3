import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "./Unit5_Page5_Q1.css";
import "../unit4/unit4Interactions.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 6.svg";
import img7 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 7.svg";
import img8 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 8.svg";
import img9 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 9.svg";
import img10 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 10.svg";
import img11 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 11.svg";
import img12 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 44/Ex A 12.svg";
import skyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_001_sky.mp3";
import candyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_002_candy.mp3";
import pennyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_003_Penny.mp3";
import cryAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_004_cry.mp3";
import partyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_005_party.mp3";
import julyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_006_July.mp3";
import bunnyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_007_bunny.mp3";
import babyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_008_baby.mp3";
import sunnyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_009_sunny.mp3";
import shyAudio from "../../../assets/audio/ClassBook/Unit 5/Page 44 - Exercise A/Item_010_shy.mp3";

const WORD_AUDIO = {
  sky: skyAudio,
  candy: candyAudio,
  Penny: pennyAudio,
  cry: cryAudio,
  party: partyAudio,
  July: julyAudio,
  bunny: bunnyAudio,
  baby: babyAudio,
  sunny: sunnyAudio,
  shy: shyAudio,
};

const GROUPS = [
  {
    title: "sky",
    correctWords: ["cry", "July", "shy"],
    items: [
      { img: img1, word: "candy", alt: "Two wrapped candies" },
      { img: img2, word: "Penny", alt: "A girl named Penny" },
      { img: img3, word: "cry", alt: "A boy crying" },
      { img: img4, word: "bunny", alt: "A brown bunny" },
      { img: img5, word: "July", alt: "A July calendar" },
      { img: img6, word: "baby", alt: "A crawling baby" },
      { img: img7, word: "shy", alt: "A shy boy" },
    ],
  },
  {
    title: "candy",
    correctWords: ["party", "bunny", "baby", "sunny"],
    items: [
      { img: img8, word: "sky", alt: "A blue cloud in the sky" },
      { img: img9, word: "party", alt: "Children at a party" },
      { img: img10, word: "July", alt: "A July calendar" },
      { img: img11, word: "bunny", alt: "A brown bunny" },
      { img: img12, word: "baby", alt: "A bright sun" },
      { img: img1, word: "sunny", alt: "Two wrapped candies" },
    ],
  },
];

const itemKey = (groupIndex, itemIndex) => `${groupIndex}-${itemIndex}`;

export default function Unit5_Page5_Q1() {
  const [answers, setAnswers] = useState(
    GROUPS.map((group) => Array(group.items.length).fill(false)),
  );
  const [lockedItems, setLockedItems] = useState([]);
  const [wrongItems, setWrongItems] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const totalCorrect = GROUPS.reduce(
    (total, group) => total + group.correctWords.length,
    0,
  );

  const handleSelect = (groupIndex, itemIndex) => {
    const group = GROUPS[groupIndex];
    const item = group.items[itemIndex];
    const key = itemKey(groupIndex, itemIndex);
    playAudio(`word-${key}`, WORD_AUDIO[item.word]);
    if (lockedItems.includes(key)) return;

    setAnswers((previous) => {
      const next = previous.map((row) => [...row]);
      const selectedCount = next[groupIndex].filter(Boolean).length;
      if (
        !next[groupIndex][itemIndex] &&
        selectedCount >= group.correctWords.length
      ) {
        return previous;
      }
      next[groupIndex][itemIndex] = !next[groupIndex][itemIndex];
      return next;
    });
    setWrongItems((previous) => previous.filter((id) => id !== key));
  };

  const checkAnswers = () => {
    if (lockedItems.length === totalCorrect) return;
    const incomplete = GROUPS.some(
      (group, groupIndex) =>
        answers[groupIndex].filter(Boolean).length !==
        group.correctWords.length,
    );
    if (incomplete) {
      ValidationAlert.info(
        "Please select all required pictures before checking.",
      );
      return;
    }

    const nextLocked = [...lockedItems];
    const nextWrong = [];
    let score = 0;
    GROUPS.forEach((group, groupIndex) => {
      group.items.forEach((item, itemIndex) => {
        if (!answers[groupIndex][itemIndex]) return;
        const key = itemKey(groupIndex, itemIndex);
        if (group.correctWords.includes(item.word)) {
          score += 1;
          if (!nextLocked.includes(key)) nextLocked.push(key);
        } else {
          nextWrong.push(key);
        }
      });
    });
    setLockedItems(nextLocked);
    setWrongItems(nextWrong);
    ValidationAlert[
      score === totalCorrect ? "success" : score === 0 ? "error" : "warning"
    ](`Score: ${score} / ${totalCorrect}`);
  };

  const showAnswer = () => {
    setAnswers(
      GROUPS.map((group) =>
        group.items.map((item) => group.correctWords.includes(item.word)),
      ),
    );
    setLockedItems(
      GROUPS.flatMap((group, groupIndex) =>
        group.items.flatMap((item, itemIndex) =>
          group.correctWords.includes(item.word)
            ? [itemKey(groupIndex, itemIndex)]
            : [],
        ),
      ),
    );
    setWrongItems([]);
    stopAudio();
  };

  const resetAnswers = () => {
    setAnswers(GROUPS.map((group) => Array(group.items.length).fill(false)));
    setLockedItems([]);
    setWrongItems([]);
    stopAudio();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div className="div-forall mb-10" style={{ gap: "30px" }}>
        <ExerciseHeader
          sectionLetter="A"
          title={
            <>
              Which pictures have the same{" "}
              <span style={{ color: "#2e3192" }}>-y sound?</span> Circle.
            </>
          }
          subTitle="Say the picture names aloud, then tap the pictures that share the same final -y sound."
        />
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "35px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {GROUPS.map((group, groupIndex) => (
            <div
              key={group.title}
              style={{
                border: "1px solid #F79530",
                borderRadius: "18px",
                padding: "18px 16px 12px",
                position: "relative",
                width: "360px",
                background: "#fff",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-18px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#FEF3E6",
                  padding: "6px 18px",
                  borderRadius: "14px",
                  fontWeight: "500",
                  fontSize: "22px",
                }}
              >
                {group.title}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "18px 14px",
                  alignItems: "start",
                  justifyItems: "center",
                  marginTop: "16px",
                }}
              >
                {group.items.map((item, itemIndex) => {
                  const key = itemKey(groupIndex, itemIndex);
                  const isSelected = answers[groupIndex][itemIndex];
                  const isWrong = wrongItems.includes(key);
                  const isLocked = lockedItems.includes(key);
                  return (
                    <div
                      key={key}
                      className="unit4-audio-control unit4-interactive"
                      onClick={() => handleSelect(groupIndex, itemIndex)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleSelect(groupIndex, itemIndex);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isSelected}
                      aria-label={
                        isLocked
                          ? `Play ${item.word}`
                          : `${isSelected ? "Unselect" : "Select"} ${item.word}`
                      }
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: isLocked ? "default" : "pointer",
                        position: "relative",
                        minHeight: "120px",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `word-${key}`}
                      />
                      <div
                        style={{
                          width: "92px",
                          height: "92px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={item.img}
                          alt={item.alt}
                          style={{
                            width: "74px",
                            height: "74px",
                            objectFit: "contain",
                            position: "relative",
                            zIndex: 1,
                          }}
                        />
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              borderRadius: "50%",
                              border: isWrong
                                ? "2px solid red"
                                : "1px solid #F79530",
                              zIndex: 2,
                              pointerEvents: "none",
                            }}
                          />
                        )}
                      </div>
                      <span
                        style={{
                          marginTop: "6px",
                          fontSize: "18px",
                          textAlign: "center",
                          lineHeight: "1.1",
                        }}
                      >
                        {item.word}
                      </span>
                      {isWrong && (
                        <div
                          className="CB-unit5-p5-q1-wrong-x"
                          aria-hidden="true"
                        >
                          ✕
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        handleStartAgain={resetAnswers}
        handleShowAnswer={showAnswer}
        checkAnswers={checkAnswers}
      />
    </div>
  );
}
