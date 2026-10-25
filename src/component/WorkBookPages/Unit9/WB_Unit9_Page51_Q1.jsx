import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";
import Unit4PlayingAudioIcon from "../../StudentPages/unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../../StudentPages/unit4/useUnit4Audio";
import "../../StudentPages/unit4/unit4Interactions.css";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/4.svg";
import question1Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/Item_001_Where_were_they_a_week_ago.mp3";
import question2Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/Item_002_Where_was_she_yesterday.mp3";
import atTheAudio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/Item_003_at_the.mp3";
import question3Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/Item_004_Where_was_she_a_day_ago.mp3";
import question4Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/Item_005_Where_were_they_at_5_00_p.m.mp3";
import full1Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/full1.mp3";
import full2Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/full2.mp3";
import full3Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/full3.mp3";
import full4Audio from "../../../assets/audio/WorkBook/unit 9/Page 51 - Exercise A/full4.mp3";
const ITEMS = [
  {
    id: 1,
    question: "Where were they a week ago?",
    img: img1,
    correctSubject: "They were",
    correctPlace: "library",
    alt: "Two children reading together in the library",
    questionAudio: question1Audio,
    fullAudio: full1Audio,
  },
  {
    id: 2,
    question: "Where was she yesterday?",
    img: img2,
    correctSubject: "She was",
    correctPlace: "playground",
    alt: "Children playing together on the playground",
    questionAudio: question2Audio,
    fullAudio: full2Audio,
  },
  {
    id: 3,
    question: "Where was she a day ago?",
    img: img3,
    correctSubject: "She was",
    correctPlace: "zoo",
    alt: "A girl visiting animals at the zoo",
    questionAudio: question3Audio,
    fullAudio: full3Audio,
  },
  {
    id: 4,
    question: "Where were they at 5:00 p.m.?",
    img: img4,
    correctSubject: "They were",
    correctPlace: "restaurant",
    alt: "Children eating together at a restaurant",
    questionAudio: question4Audio,
    fullAudio: full4Audio,
  },
];

const SUBJECT_OPTIONS = ["She was", "She were", "They was", "They were"];
const PLACE_OPTIONS = ["library", "playground", "zoo", "restaurant"];

export default function WB_Unit8_Page49_QA() {
  const [subjects, setSubjects] = useState({});
  const [places, setPlaces] = useState({});
  const [, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);
  const [lockedSubjects, setLockedSubjects] = useState([]);
  const [lockedPlaces, setLockedPlaces] = useState([]);
  const [wrongSubjects, setWrongSubjects] = useState([]);
  const [wrongPlaces, setWrongPlaces] = useState([]);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const handleSubjectChange = (id, value) => {
    if (showAns || lockedSubjects.includes(id)) return;

    setSubjects((prev) => ({
      ...prev,
      [id]: value,
    }));

    setWrongSubjects((prev) => prev.filter((itemId) => itemId !== id));
  };

  const handlePlaceChange = (id, value) => {
    if (showAns || lockedPlaces.includes(id)) return;

    setPlaces((prev) => ({
      ...prev,
      [id]: value,
    }));

    setWrongPlaces((prev) => prev.filter((itemId) => itemId !== id));
  };

  const getItemResult = (item) => {
    return (
      subjects[item.id] === item.correctSubject &&
      places[item.id] === item.correctPlace
    );
  };

  const checkAnswers = () => {
    if (
      showAns ||
      (lockedSubjects.length === ITEMS.length &&
        lockedPlaces.length === ITEMS.length)
    )
      return;

    const allAnswered = ITEMS.every(
      (item) => subjects[item.id] && places[item.id],
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    ITEMS.forEach((item) => {
      if (getItemResult(item)) score++;
    });

    setShowResults(true);
    setLockedSubjects((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter(
          (item) => subjects[item.id] === item.correctSubject,
        ).map((item) => item.id),
      ]),
    ]);
    setLockedPlaces((prev) => [
      ...new Set([
        ...prev,
        ...ITEMS.filter((item) => places[item.id] === item.correctPlace).map(
          (item) => item.id,
        ),
      ]),
    ]);
    setWrongSubjects(
      ITEMS.filter((item) => subjects[item.id] !== item.correctSubject).map(
        (item) => item.id,
      ),
    );
    setWrongPlaces(
      ITEMS.filter((item) => places[item.id] !== item.correctPlace).map(
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
    const correctSubjects = {};
    const correctPlaces = {};

    ITEMS.forEach((item) => {
      correctSubjects[item.id] = item.correctSubject;
      correctPlaces[item.id] = item.correctPlace;
    });

    setSubjects(correctSubjects);
    setPlaces(correctPlaces);
    setShowAns(true);
    setShowResults(true);
    setLockedSubjects(ITEMS.map((item) => item.id));
    setLockedPlaces(ITEMS.map((item) => item.id));
    setWrongSubjects([]);
    setWrongPlaces([]);
  };

  const handleStartAgain = () => {
    setSubjects({});
    setPlaces({});
    setShowResults(false);
    setShowAns(false);
    setLockedSubjects([]);
    setLockedPlaces([]);
    setWrongSubjects([]);
    setWrongPlaces([]);
    stopAudio();
  };
  const isSubjectWrong = (item) => {
    return wrongSubjects.includes(item.id);
  };

  const isPlaceWrong = (item) => {
    return wrongPlaces.includes(item.id);
  };
  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "clamp(18px,2.5vw,28px)",
        }}
      >
        <ExerciseHeader
          sectionLetter="A"
          title="Read, look, and write."
          subTitle="Use the past place and time shown by each picture to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />

        <div
        className="w-full"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px 34px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => {
            const fullAudioEnabled =
              lockedSubjects.includes(item.id) &&
              lockedPlaces.includes(item.id);
            return (
              <div
                key={item.id}
                className={
                  fullAudioEnabled
                    ? "unit4-audio-control unit4-full-audio-enabled"
                    : undefined
                }
                role={fullAudioEnabled ? "button" : undefined}
                tabIndex={fullAudioEnabled ? 0 : undefined}
                aria-label={
                  fullAudioEnabled
                    ? `Play completed sentence ${item.id}`
                    : undefined
                }
                onClick={
                  fullAudioEnabled
                    ? () => playAudio(`full-${item.id}`, item.fullAudio)
                    : undefined
                }
                onKeyDown={
                  fullAudioEnabled
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          playAudio(`full-${item.id}`, item.fullAudio);
                        }
                      }
                    : undefined
                }
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `full-${item.id}`}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#222",
                      minWidth: "18px",
                    }}
                  >
                    {item.id}
                  </span>

                  <div
                    className="unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    aria-label={`Play: ${item.question}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      playAudio(`question-${item.id}`, item.questionAudio);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        playAudio(`question-${item.id}`, item.questionAudio);
                      }
                    }}
                    style={{
                      fontSize: "18px",
                      color: "#222",
                      lineHeight: "1.4",
                      // fontWeight: "500",
                    }}
                  >
                    {item.question}
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === `question-${item.id}`}
                    />
                  </div>
                </div>

                <div>
                  <img
                    src={item.img}
                    alt={item.alt}
                    style={{
                      width: "auto",
                      height: "120px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    minHeight: "38px",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <select
                      value={subjects[item.id] || ""}
                      onChange={(e) =>
                        handleSubjectChange(item.id, e.target.value)
                      }
                      disabled={showAns || lockedSubjects.includes(item.id)}
                      onClick={(event) => event.stopPropagation()}
                      style={{
                        borderBottom: isSubjectWrong(item)
                          ? "2px solid red"
                          : "1px solid #cfcfcf",

                        padding: "6px 10px",
                        fontSize: "18px",
                        color: "#444",
                        cursor:
                          showAns || lockedSubjects.includes(item.id)
                            ? "default"
                            : "pointer",
                      }}
                    >
                      <option value="">Select</option>

                      {SUBJECT_OPTIONS.map((option) => (
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
                          background: "red",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          pointerEvents: "none",
                        }}
                      >
                        ✕
                      </div>
                    )}
                  </div>
                  <span
                    className="unit4-audio-control unit4-interactive"
                    role="button"
                    tabIndex={0}
                    aria-label="Play: at the"
                    onClick={(event) => {
                      event.stopPropagation();
                      playAudio("at-the", atTheAudio);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        playAudio("at-the", atTheAudio);
                      }
                    }}
                    style={{
                      fontSize: "18px",
                      color: "#222",
                    }}
                  >
                    at the
                    <Unit4PlayingAudioIcon
                      active={activeAudioKey === "at-the"}
                    />
                  </span>

                  <div style={{ position: "relative" }}>
                    <select
                      value={places[item.id] || ""}
                      onChange={(e) =>
                        handlePlaceChange(item.id, e.target.value)
                      }
                      disabled={showAns || lockedPlaces.includes(item.id)}
                      onClick={(event) => event.stopPropagation()}
                      style={{
                        borderBottom: isPlaceWrong(item)
                          ? "2px solid red"
                          : "1px solid #cfcfcf",

                        padding: "6px 10px",
                        fontSize: "17px",
                        color: "#444",
                        cursor:
                          showAns || lockedPlaces.includes(item.id)
                            ? "default"
                            : "pointer",
                        minWidth: "140px",
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
                          background: "red",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: "bold",
                          border: "2px solid white",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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
                    }}
                  >
                    .
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}
