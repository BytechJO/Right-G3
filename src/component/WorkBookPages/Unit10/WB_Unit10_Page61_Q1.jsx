import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U10 Folder/Page 61/SVG/4.svg";

const QUESTIONS = [
  {
    id: 1,
    question: "Where will Stella and Sarah go?",
    subjectOptions: ["They", "She", "He"],
    correctSubject: "They",
    correctPlace: "park",
  },
  {
    id: 2,
    question: "Where will Harley and Hansel go?",
    subjectOptions: ["They", "She", "He"],
    correctSubject: "They",
    correctPlace: "beach",
  },
  {
    id: 3,
    question: "Where will John go?",
    subjectOptions: ["He", "She", "They"],
    correctSubject: "He",
    correctPlace: "toy store",
  },
  {
    id: 4,
    question: "Where will Tom go?",
    subjectOptions: ["He", "She", "They"],
    correctSubject: "He",
    correctPlace: "farm",
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

  const handleSelect = (id, field, value) => {
    if (showAns || checked) return;

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
    if (showAns || checked) return;

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
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setShowAns(false);
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
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">I</span>
          Read, look, and write.
        </h1>

        <div
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
                      style={{
                        margin: 0,
                        fontSize: "18px",
                        color: "#222",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.question}
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
                        disabled={showAns || checked}
                        style={{
                          border: "none",
                          borderBottom: isSubjectWrong(item)
                            ? `2px solid 
                            red`
                            : "1px solid #f39b42",
                          padding: "4px 8px",
                          fontSize: "17px",
                          outline: "none",
                          color: "#444",
                          cursor: showAns || checked ? "default" : "pointer",
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
                      style={{
                        fontSize: "18px",
                        color: "#222",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      will go to the
                    </span>
                    <div style={{ position: "relative" }}>
                      <select
                        value={current.place || ""}
                        onChange={(e) =>
                          handleSelect(item.id, "place", e.target.value)
                        }
                        disabled={showAns || checked}
                        style={{
                          border: "none",
                          borderBottom: isPlaceWrong(item)
                            ? `2px solid 
                            red`
                            : "1px solid #f39b42",
                          padding: "4px 8px",
                          fontSize: "17px",
                          outline: "none",
                          color: "#444",
                          cursor: showAns || checked ? "default" : "pointer",
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
                src={item.img}
                alt={item.label}
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
