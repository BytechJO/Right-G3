import React, { useEffect, useRef, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";
import thickAudio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise C/Item_001_thick.mp3";
import fatherAudio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise C/Item_002_father.mp3";
import thisAudio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise C/Item_003_this.mp3";
import theyAudio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise C/Item_004_they.mp3";
import thankAudio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise C/Item_005_thank.mp3";
import mathAudio from "../../../assets/audio/WorkBook/unit4/Page 26 - Exercise C/Item_006_math.mp3";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U4 Folder/Page 26/Ex C  4.svg";
import trueIcon from "../../../assets/imgs/true.svg";
import falseIcon from "../../../assets/imgs/false.svg";

// كمل باقي الصور هون

const ITEMS = [
  {
    id: 1,
    img: img1,
    correct: "✓",
  },
  {
    id: 2,
    img: img2,
    correct: "✕",
  },
  {
    id: 3,
    img: img3, // حطي الصورة المناسبة
    correct: "✓",
  },
  {
    id: 4,
    img: img4, // حطي الصورة المناسبة
    correct: "✓",
  },
];

const OPTIONS = ["✓", "✕"];
const PAIR_AUDIO = {
  1: [thickAudio, fatherAudio],
  2: [thisAudio, theyAudio],
  3: [thankAudio, mathAudio],
};

export default function WB_Unit4_Page26_QC() {
  const [answers, setAnswers] = useState({});
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState(null);
  const audioRef = useRef(null);
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setActiveAudioId(null);
  };
  const playPair = (id) => {
    const sources = PAIR_AUDIO[id];
    if (!sources) return;
    stopAudio();
    setActiveAudioId(id);
    let index = 0;
    const playNext = () => {
      if (index >= sources.length) {
        audioRef.current = null;
        setActiveAudioId(null);
        return;
      }
      const audio = new Audio(sources[index]);
      index += 1;
      audioRef.current = audio;
      audio.onended = playNext;
      audio.onerror = playNext;
      audio.play().catch(playNext);
    };
    playNext();
  };
  useEffect(
    () => () => {
      if (audioRef.current) audioRef.current.pause();
    },
    [],
  );

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
      ValidationAlert.info("Please answer all questions first.");
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
    const correctMap = {};
    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
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

  const renderChoice = (item, value) => {
    const selected = answers[item.id] === value;
    const wrong = isWrong(item) && selected;

    return (
      <div
        onClick={() => handleSelect(item.id, value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect(item.id, value);
          }
        }}
        role="button"
        tabIndex={showAns || lockedIds.includes(item.id) ? -1 : 0}
        aria-label={`Choose ${value === "✓" ? "same" : "different"} th sound for item ${item.id}`}
        aria-disabled={showAns || lockedIds.includes(item.id)}
        style={{
          position: "relative",
          width: "45px",
          height: "45px",
          borderRadius: "14px",
          border: selected
            ? wrong
              ? "2px solid red"
              : "2px solid #f39b42"
            : "1px solid #cfcfcf",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor:
            showAns || lockedIds.includes(item.id) ? "default" : "pointer",
        }}
      >
        {value === "✓" ? (
          <img src={trueIcon} alt="Same sound" style={{ height: "25px" }} />
        ) : (
          <img
            src={falseIcon}
            alt="Different sound"
            style={{ height: "25px" }}
          />
        )}

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-10px",
              right: "-8px",
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
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <style>{`
        .wb-b-grid {
          display:flex;
          gap: 18px;
    //           display: grid;
    // gap: 18px;
    // grid-template-columns: 1fr 1fr;
    // width: 100%;
        }

        .wb-b-card {
          width: 100%;
          // border: 2px solid #f39b42;
          // border-radius: 18px;
          // background: #fff;
          position: relative;
          // overflow: hidden;
          display: flex;
    justify-content: center;
        }

        .wb-b-img {
          width: auto;
          height: 120px;
          object-fit: contain;
        }

        .wb-b-answer-box {
          position: absolute;
          left: 54%;
          bottom: -6px;
          transform: translateX(-50%);
          width: 54px;
          height: 42px;
          // border: 2px solid #f39b42;
          border-radius: 8px;
          // background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          
        }

        .wb-b-options-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 10px;
              margin-left: 30px;
        }
      `}</style>

      <div className="div-forall" style={{ gap: "150px" }}>
        <ExerciseHeader
          sectionLetter="C"
          title={
            <>
              Do they both have the same{" "}
              <span style={{ color: "#2e3192" }}>th sound</span>? Listen and
              write <span style={{ color: "red" }}>✓</span> or{" "}
              <span style={{ color: "red" }}>✗</span>.
            </>
          }
          subTitle="Listen to each item more than once if needed, compare whether each picture pair has the same th sound, then mark whether the sounds match."
        />

        <div className="wb-b-grid w-full">
          {ITEMS.map((item) => (
            <div key={item.id}>
              <div
                className="wb-b-card w-full"
                role={PAIR_AUDIO[item.id] ? "button" : undefined}
                tabIndex={PAIR_AUDIO[item.id] ? 0 : undefined}
                aria-label={
                  PAIR_AUDIO[item.id] ? `Play sound pair ${item.id}` : undefined
                }
                onClick={() => playPair(item.id)}
                onKeyDown={(event) => {
                  if (
                    PAIR_AUDIO[item.id] &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    playPair(item.id);
                  }
                }}
              >
                {PAIR_AUDIO[item.id] && (
                  <Unit4PlayingAudioIcon active={activeAudioId === item.id} />
                )}
                <div className="flex gap-1">
                  <span className="text-xl font-semibold">{item.id}</span>
                  <img
                    src={item.img}
                    alt={`Picture pair ${item.id} for comparing th sounds`}
                    className="wb-b-img"
                  />
                </div>
                {(answers[item.id] || showAns) && (
                  <div className="wb-b-answer-box">
                    {answers[item.id] === "✓" ? (
                      <img
                        src={trueIcon}
                        alt="Same sound selected"
                        style={{ height: "25px" }}
                      />
                    ) : (
                      <img
                        src={falseIcon}
                        alt="Different sound selected"
                        style={{ height: "25px" }}
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="wb-b-options-row">
                {OPTIONS.map((opt) => (
                  <div key={opt}>{renderChoice(item, opt)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button
          checkAnswers={handleCheck}
          handleShowAnswer={handleShowAnswer}
          handleStartAgain={handleReset}
        />
      </div>
    </div>
  );
}
