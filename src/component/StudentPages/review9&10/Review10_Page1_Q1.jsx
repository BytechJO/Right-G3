import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 114.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 115.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 116.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 117.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 118.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/Page 90/Asset 119.svg";
import Button from "../../Button";

const Review10_Page1_Q1 = () => {
  const items = [
    {
      img: img4,
      options: ["He will watch a movie.", "He won’t watch a movie"],
      correct: "He will watch a movie.",
    },
    {
      img: img3,
      options: ["She will read a book.", "She won’t read a book."],
      correct: "She won’t read a book.",
    },
    {
      img: img1,
      options: ["They will sit in the sun.", "They won’t sit in the sun."],
      correct: "They will sit in the sun.",
    },
    {
      img: img2,
      options: ["He will build a sandcastle.", "He won’t build a sandcastle."],
      correct: "He won’t build a sandcastle.",
    },
    {
      img: img6,
      options: ["He will eat a sandwich.", "He won’t eat a sandwich."],
      correct: "He will eat a sandwich.",
    },
    {
      img: img5,
      options: ["They will paint a picture.", "They won’t paint a picture."],
      correct: "They won’t paint a picture.",
    },
  ];
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [answers, setAnswers] = useState(Array(items.length).fill(""));
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const chooseOption = (i, value) => {
    if (locked) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);

    const newAnswers = [...answers];
    newAnswers[i] = items[i].start + value + items[i].end;
    setAnswers(newAnswers);
  };

  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setAnswers(Array(items.length).fill(""));
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setAnswers(items.map((i) => i.start + i.correct + i.end));
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    if (selected.includes("")) {
      ValidationAlert.info();
      return;
    }

    let score = 0;

    items.forEach((item, i) => {
      if (selected[i] === item.correct) {
        score++;
      }
    });

    const total = items.length;

    const color = score === total ? "green" : score === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${score} / ${total}
    </span>
  </div>
`;

    if (score === total) ValidationAlert.success(msg);
    else if (score === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setLocked(true);
    setShowResult(true); // 🔥 مهم
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
      <div className="div-forall" style={{ gap: "30px" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>A</span>
          Look, read, and underline the correct answer.
        </h5>

        <div
          className="
                  grid grid-cols-1 
                  lg:grid-cols-3 
                  gap-y-10 
                  gap-x-10
                  xl:gap-x-10   /* 🔥 للويب فقط */
                  mb-10
                  "
        >
          {" "}
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <div className="flex gap-3">
                <span
                  style={{
                    // marginRight: "10px", // مسافة بسيطة
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {i + 1}
                </span>

                <img
                  src={item.img}
                  alt=""
                  style={{
                    width: "auto",
                    height: "110px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className="flex flex-col gap-5 text-[18px]">
                {item.options.map((opt, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      display: "inline-block",
                    }}
                  >
                    <span
                      onClick={() => chooseOption(i, opt)}
                      onMouseEnter={() => setHovered(i + "-" + idx)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        display: "inline-block",
                        padding: "6px 7px",
                        cursor: "pointer",
                        textAlign: "center",
                        minWidth: "90px",
                        whiteSpace: "nowrap",
                        fontSize:"17px",
                        background:
                         !locked&& hovered === i + "-" + idx ? "#fef2e0ff" : "transparent",

                        borderBottom:
                          selected[i] === opt
                            ? locked
                              ? opt === item.correct
                                ? "1px solid #F79530" // صح
                                : "2px solid red" // غلط
                              : "1px solid #F79530"
                            : "1px solid transparent",

                        transition: "0.2s", // 🔥 حركة ناعمة
                      }}
                    >
                      {opt}
                    </span>

                    {showResult &&
                      selected[i] === opt &&
                      opt !== item.correct && (
                        <div
                          style={{
                            position: "absolute",
                            right: "-20px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "22px",
                            height: "22px",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            border: "2px solid white",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.2)",
                            pointerEvents: "none",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              lineHeight: "1",
                              transform: "translateY(-1px)",
                            }}
                          >
                            ✕
                          </span>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={resetAll}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review10_Page1_Q1;
