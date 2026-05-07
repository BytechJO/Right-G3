import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U9 Folder/Page 51/SVG/4.svg";
const ITEMS = [
  {
    id: 1,
    question: "Where were they a week ago?",
    img: img1,
    correctSubject: "They were",
    correctPlace: "library",
  },
  {
    id: 2,
    question: "Where was she yesterday?",
    img: img2,
    correctSubject: "She was",
    correctPlace: "playground",
  },
  {
    id: 3,
    question: "Where was she a day ago?",
    img: img3,
    correctSubject: "She was",
    correctPlace: "zoo",
  },
  {
    id: 4,
    question: "Where were they at 5:00 p.m.?",
    img: img4,
    correctSubject: "They were",
    correctPlace: "restaurant",
  },
];

const SUBJECT_OPTIONS = ["She was", "She were", "They was", "They were"];
const PLACE_OPTIONS = ["library", "playground", "zoo", "restaurant"];

export default function WB_Unit8_Page49_QA() {
  const [subjects, setSubjects] = useState({});
  const [places, setPlaces] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSubjectChange = (id, value) => {
    if (showAns || showResults) return;

    setSubjects((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handlePlaceChange = (id, value) => {
    if (showAns || showResults) return;

    setPlaces((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const getItemResult = (item) => {
    return (
      subjects[item.id] === item.correctSubject &&
      places[item.id] === item.correctPlace
    );
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return !getItemResult(item);
  };

  const checkAnswers = () => {
    if (showAns || showResults) return;

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
  };

  const handleStartAgain = () => {
    setSubjects({});
    setPlaces({});
    setShowResults(false);
    setShowAns(false);
  };
  const isSubjectWrong = (item) => {
    return (
      showResults &&
      subjects[item.id] &&
      subjects[item.id] !== item.correctSubject
    );
  };

  const isPlaceWrong = (item) => {
    return (
      showResults && places[item.id] && places[item.id] !== item.correctPlace
    );
  };
  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          gap: "clamp(18px,2.5vw,28px)",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">A</span>
          Read, look, and write.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px 34px",
            alignItems: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
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
                  style={{
                    fontSize: "18px",
                    color: "#222",
                    lineHeight: "1.4",
                    // fontWeight: "500",
                  }}
                >
                  {item.question}
                </div>
              </div>

              <div>
                <img
                  src={item.img}
                  alt={`item-${item.id}`}
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
                    disabled={showAns|| showResults}
                    style={{
                      borderBottom: isSubjectWrong(item)
                        ? "2px solid red"
                        : "1px solid #cfcfcf",

                      padding: "6px 10px",
                      fontSize: "18px",
                      outline: "none",
                      color: "#444",
                      cursor: showAns || showResults ? "default" : "pointer",
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
                  style={{
                    fontSize: "18px",
                    color: "#222",
                  }}
                >
                  at the
                </span>

                <div style={{ position: "relative" }}>
                  <select
                    value={places[item.id] || ""}
                    onChange={(e) => handlePlaceChange(item.id, e.target.value)}
                    disabled={showAns|| showResults}
                    style={{
                      borderBottom: isPlaceWrong(item)
                        ? "2px solid red"
                        : "1px solid #cfcfcf",

                      padding: "6px 10px",
                      fontSize: "17px",
                      outline: "none",
                      color: "#444",
                      cursor: showAns || showResults ? "default" : "pointer",
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
          ))}
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
