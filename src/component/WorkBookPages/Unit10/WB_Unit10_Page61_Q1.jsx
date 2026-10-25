import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/4.svg";
import full1Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/full3.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/full4.mp3";
import q1Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/Item_001_Where_will_Stella_and_Sarah_go.mp3";
import q2Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/Item_002_Where_will_Harley_and_Hansel_go.mp3";
import q3Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/Item_003_Where_will_John_go.mp3";
import q4Audio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/Item_004_Where_will_Tom_go.mp3";
import phraseAudio from "../../../assets/audio/WorkBook/unit10/Page 61 - Exercise I/Item_005_will_go_to_the.mp3";

const QUESTIONS = [
  {
    id: 1,
    question: "Where will Stella and Sarah go?",
    subjectOptions: ["They", "She", "He"],
    correctSubject: "They",
    correctPlace: "park",
    audio: q1Audio,
    fullAudio: full1Audio,
  },
  {
    id: 2,
    question: "Where will Harley and Hansel go?",
    subjectOptions: ["They", "She", "He"],
    correctSubject: "They",
    correctPlace: "beach",
    audio: q2Audio,
    fullAudio: full2Audio,
  },
  {
    id: 3,
    question: "Where will John go?",
    subjectOptions: ["He", "She", "They"],
    correctSubject: "He",
    correctPlace: "toy store",
    audio: q3Audio,
    fullAudio: full3Audio,
  },
  {
    id: 4,
    question: "Where will Tom go?",
    subjectOptions: ["He", "She", "They"],
    correctSubject: "He",
    correctPlace: "farm",
    audio: q4Audio,
    fullAudio: full4Audio,
  },
];

const PLACE_OPTIONS = ["park", "beach", "toy store", "farm"];

const SIDE_IMAGES = [
  { id: 1, img: img1, label: "park" },
  { id: 2, img: img2, label: "beach" },
  { id: 3, img: img3, label: "toy store" },
  { id: 4, img: img4, label: "farm" },
];

export default function WB_Unit8_Page60_QI() {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedIds, setLockedIds] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSelect = (id, field, value) => {
    if (showAns || lockedIds.includes(id)) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const isCorrect = (item) => {
    const ans = answers[item.id];
    if (!ans) return false;

    return (
      ans.subject === item.correctSubject && ans.place === item.correctPlace
    );
  };

  const handleCheck = () => {
    if (showAns || lockedIds.length === QUESTIONS.length) return;

    const allAnswered = QUESTIONS.every(
      (item) => answers[item.id]?.subject && answers[item.id]?.place,
    );

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    QUESTIONS.forEach((item) => {
      if (isCorrect(item)) {
        score++;
      }
    });

    setChecked(true);
    setLockedIds(QUESTIONS.filter(isCorrect).map((item) => item.id));

    if (score === QUESTIONS.length) {
      ValidationAlert.success(`Score: ${score} / ${QUESTIONS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${QUESTIONS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${QUESTIONS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};

    QUESTIONS.forEach((item) => {
      correctMap[item.id] = {
        subject: item.correctSubject,
        place: item.correctPlace,
      };
    });

    setAnswers(correctMap);
    setChecked(true);
    setShowAns(true);
    setLockedIds(QUESTIONS.map((item) => item.id));
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
    setLockedIds([]);
    stopAudio();
  };

  const isSubjectWrong = (item) => {
    if (!checked) return false;

    return answers[item.id]?.subject !== item.correctSubject;
  };

  const isPlaceWrong = (item) => {
    if (!checked) return false;

    return answers[item.id]?.place !== item.correctPlace;
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "28px",
        }}
      >
        <ExerciseHeader
          sectionLetter="I"
          title="Read, look, and write."
          subTitle="Use the person and destination in each Where will answer to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div
          className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "36px",
            alignItems: "start",
          }}
        >
          {/* left side questions */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {QUESTIONS.map((item) => {
              const current = answers[item.id] || {};

              return (
                <div
                  key={item.id}
                  className={
                    lockedIds.includes(item.id) || showAns
                      ? "unit4-audio-control unit4-full-audio-enabled"
                      : undefined
                  }
                  role={
                    lockedIds.includes(item.id) || showAns
                      ? "button"
                      : undefined
                  }
                  tabIndex={
                    lockedIds.includes(item.id) || showAns ? 0 : undefined
                  }
                  aria-label={
                    lockedIds.includes(item.id) || showAns
                      ? `Play the complete answer for item ${item.id}`
                      : undefined
                  }
                  onClick={() =>
                    (lockedIds.includes(item.id) || showAns) &&
                    playAudio(`full-${item.id}`, item.fullAudio)
                  }
                  onKeyDown={(event) => {
                    if (
                      (lockedIds.includes(item.id) || showAns) &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`full-${item.id}`, item.fullAudio);
                    }
                  }}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    // height: "94px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      minHeight: "36px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#222",
                        minWidth: "18px",
                        lineHeight: "1.4",
                      }}
                    >
                      {item.id}
                    </span>

                    <p
                      className="unit4-audio-control"
                      role="button"
                      tabIndex={lockedIds.includes(item.id) || showAns ? -1 : 0}
                      aria-label={`Play: ${item.question}`}
                      onClick={(event) => {
                        if (lockedIds.includes(item.id) || showAns) return;
                        event.stopPropagation();
                        playAudio(`question-${item.id}`, item.audio);
                      }}
                      onKeyDown={(event) => {
                        if (
                          !lockedIds.includes(item.id) &&
                          !showAns &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(`question-${item.id}`, item.audio);
                        }
                      }}
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        color: "#222",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.question}
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `question-${item.id}`}
                      />
                    </p>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      height: "42px",
                      paddingLeft: "28px",

                      paddingBottom: "4px",
                      flexWrap: "nowrap",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <select
                        value={current.subject || ""}
                        onChange={(e) =>
                          handleSelect(item.id, "subject", e.target.value)
                        }
                        disabled={showAns || lockedIds.includes(item.id)}
                        style={{
                          border: "none",
                          borderBottom: isSubjectWrong(item)
                            ? `2px solid 
                            red`
                            : "1px solid #f39b42",
                          padding: "4px 8px",
                          fontSize: "17px",
                          color: "#444",
                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",
                          minWidth: "94px",
                          flexShrink: 0,
                          backgroundColor: "transparent",
                        }}
                      >
                        <option value="">Select</option>

                        {item.subjectOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      {isSubjectWrong(item) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
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
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                            zIndex: 5,
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>

                    <span
                      className="unit4-audio-control"
                      role="button"
                      tabIndex={lockedIds.includes(item.id) || showAns ? -1 : 0}
                      aria-label="Play: will go to the"
                      onClick={(event) => {
                        if (lockedIds.includes(item.id) || showAns) return;
                        event.stopPropagation();
                        playAudio(`phrase-${item.id}`, phraseAudio);
                      }}
                      onKeyDown={(event) => {
                        if (
                          !lockedIds.includes(item.id) &&
                          !showAns &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(`phrase-${item.id}`, phraseAudio);
                        }
                      }}
                      style={{
                        fontSize: "18px",
                        color: "#222",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      will go to the
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `phrase-${item.id}`}
                      />
                    </span>
                    <div style={{ position: "relative" }}>
                      <select
                        value={current.place || ""}
                        onChange={(e) =>
                          handleSelect(item.id, "place", e.target.value)
                        }
                        disabled={showAns || lockedIds.includes(item.id)}
                        style={{
                          border: "none",
                          borderBottom: isPlaceWrong(item)
                            ? `2px solid 
                            red`
                            : "1px solid #f39b42",
                          padding: "4px 8px",
                          fontSize: "17px",
                          color: "#444",
                          cursor:
                            showAns || lockedIds.includes(item.id)
                              ? "default"
                              : "pointer",
                          minWidth: "150px",
                          flexShrink: 0,
                          backgroundColor: "transparent",
                        }}
                      >
                        <option value="">Select place</option>

                        {PLACE_OPTIONS.map((place) => (
                          <option key={place} value={place}>
                            {place}
                          </option>
                        ))}
                      </select>

                      {isPlaceWrong(item) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
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
                            border: "2px solid white",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

                            zIndex: 5,
                            pointerEvents: "none",
                          }}
                        >
                          ✕
                        </div>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: "18px",
                        color: "#222",
                        flexShrink: 0,
                      }}
                    >
                      .
                    </span>
                  </div>
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `full-${item.id}`}
                  />
                </div>
              );
            })}
          </div>

          {/* right side images */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              alignItems: "center",
            }}
          >
            {SIDE_IMAGES.map((item) => (
              <img
                key={item.id}
                src={item.img}
                alt={`Destination: ${item.label}`}
                style={{
                  width: "auto",
                  height: "100px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleReset}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}
