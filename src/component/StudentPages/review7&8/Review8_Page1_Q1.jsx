import React, { useState } from "react";
import "./Review8_Page1_Q1.css";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Page 72/Review 8.svg";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";
import q1Audio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_001_Was_the_teacher_in_the_classroom.mp3";
import yesAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_002_yes.mp3";
import noAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_003_no.mp3";
import q2Audio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_004_What_was_her_name.mp3";
import roseAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_005_Miss_Rose.mp3";
import annaAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_006_Miss_Anna.mp3";
import saraAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_007_Miss_Sara.mp3";
import q3Audio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_008_Were_the_students_in_the_classroom.mp3";
import q4Audio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_009_Was_there_a_clock_in_the_classroom.mp3";
import q5Audio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_010_Where_were_the_students.mp3";
import classAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_011_in_the_classroom.mp3";
import outsideAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_012_outside_the_classroom.mp3";
import doorAudio from "../../../assets/audio/ClassBook/Unit 8/Page 72 - Exercise A/Item_013_at_the_door.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const Review8_Page1_Q1 = () => {
  const items = [
    {
      text: "Was the teacher in the classroom?",
      audio: q1Audio,
      options: [
        { text: "yes", audio: yesAudio },
        { text: "no", audio: noAudio },
      ],
      correct: "yes",
    },
    {
      text: "What was her name?",
      audio: q2Audio,
      options: [
        { text: "Miss Rose", audio: roseAudio },
        { text: "Miss Anna", audio: annaAudio },
        { text: "Miss Sara", audio: saraAudio },
      ],
      correct: "Miss Rose",
    },
    {
      text: "Were the students in the classroom?",
      audio: q3Audio,
      options: [
        { text: "yes", audio: yesAudio },
        { text: "no", audio: noAudio },
      ],
      correct: "no",
    },
    {
      text: "Was there a clock in the classroom?",
      audio: q4Audio,
      options: [
        { text: "yes", audio: yesAudio },
        { text: "no", audio: noAudio },
      ],
      correct: "no",
    },
    {
      text: "Where were the students?",
      audio: q5Audio,
      options: [
        { text: "in the classroom", audio: classAudio },
        { text: "outside the classroom", audio: outsideAudio },
        { text: "at the door", audio: doorAudio },
      ],
      correct: "outside the classroom",
    },
  ];
  const [selected, setSelected] = useState(Array(items.length).fill(""));
  const [lockedIds, setLockedIds] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const chooseOption = (i, value) => {
    if (showAns || lockedIds.includes(i)) return;

    const newSelected = [...selected];
    newSelected[i] = value;
    setSelected(newSelected);
    setWrongIds((previous) => previous.filter((id) => id !== i));
  };
  const resetAll = () => {
    setSelected(Array(items.length).fill(""));
    setLockedIds([]);
    setWrongIds([]);
    setShowAns(false);
    stopAudio();
  };

  const showAnswers = () => {
    setSelected(items.map((i) => i.correct));
    setLockedIds(items.map((_, index) => index));
    setWrongIds([]);
    setShowAns(true);
    stopAudio();
  };
  // =========================
  // CHECK ANSWERS (🔥 FIXED)
  // =========================
  const checkAnswers = () => {
    if (showAns || lockedIds.length === items.length) return;

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

    setLockedIds(
      items.flatMap((item, index) =>
        selected[index] === item.correct ? [index] : [],
      ),
    );
    setWrongIds(
      items.flatMap((item, index) =>
        selected[index] !== item.correct ? [index] : [],
      ),
    );
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
        padding: "30px",
      }}
    >
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Read and look at the picture. Then answer the questions."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />
        <div
          className="w-full"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <img
            src={img1}
            alt="A teacher standing in a classroom while the students are outside"
            style={{
              width: "450px",
              height: "auto",
              objectFit: "contain",
              // marginBottom: "10px",
            }}
          />
        </div>
        <div className="space-y-3 w-full">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-6 flex-wrap">
              {/* السؤال */}
              <span
                role="button"
                tabIndex={0}
                className="unit4-audio-control unit4-interactive text-[18px]"
                onClick={() => playAudio(`question-${i}`, item.audio)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playAudio(`question-${i}`, item.audio);
                  }
                }}
              >
                <Unit4PlayingAudioIcon
                  active={activeAudioKey === `question-${i}`}
                />
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                  {i + 1}
                </span>
                {item.text}
              </span>

              {/* الخيارات */}
              <div className="flex items-center gap-4 text-[18px]">
                {item.options.map((option, idx) => {
                  const opt = option.text;
                  const audioKey = `option-${i}-${idx}`;
                  return (
                    <button
                      type="button"
                      tabIndex={lockedIds.includes(i) || showAns ? -1 : 0}
                      aria-disabled={lockedIds.includes(i) || showAns}
                      className="unit4-audio-control unit4-interactive"
                      key={idx}
                      onClick={() => {
                        if (!lockedIds.includes(i) && !showAns) {
                          playAudio(audioKey, option.audio);
                          chooseOption(i, opt);
                        }
                      }}
                      onKeyDown={(event) => {
                        if (
                          (event.key === "Enter" || event.key === " ") &&
                          !lockedIds.includes(i) &&
                          !showAns
                        ) {
                          event.preventDefault();
                          playAudio(audioKey, option.audio);
                          chooseOption(i, opt);
                        }
                      }}
                      style={{
                        position: "relative", // 🔥 مهم
                        padding: "6px 12px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        border:
                          selected[i] === opt
                            ? lockedIds.includes(i) || showAns
                              ? opt === item.correct
                                ? "1px solid #F79530"
                                : "2px solid red"
                              : "1px solid #F79530"
                            : "1px solid transparent",

                        transition: "0.2s",
                        fontWeight: "500",
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === audioKey}
                      />
                      {opt}

                      {wrongIds.includes(i) &&
                        selected[i] === opt &&
                        opt !== item.correct && (
                          <span
                            style={{
                              position: "absolute",
                              right: "-18px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: "22px",
                              height: "22px",
                              background: "red",
                              color: "white",
                              borderRadius: "50%",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              pointerEvents: "none",
                            }}
                          >
                            ✕
                          </span>
                        )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <Button
        handleShowAnswer={showAnswers}
        handleStartAgain={resetAll}
        checkAnswers={checkAnswers}
      />
    </div>
  );
};

export default Review8_Page1_Q1;
