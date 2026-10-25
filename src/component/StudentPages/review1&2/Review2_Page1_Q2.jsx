import React, { useState } from "react";
import Button from "../../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 18/Ex B 4.svg";
import Unit2PlayingAudioIcon from "../unit2/Unit2PlayingAudioIcon";
import useUnit2Audio from "../unit2/useUnit2Audio";
import "../unit2/unit2Interactions.css";
import howAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise B/Item_001_How.mp3";
import sheAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise B/Item_002_She.mp3";
import heAudio from "../../../assets/audio/ClassBook/Unit 2/Page 18 - Exercise B/Item_003_He.mp3";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";

const FIXED_AUDIO = { How: howAudio, She: sheAudio, He: heAudio };
const IMAGE_ALTS = [
  "A girl in a bedroom",
  "A girl jumping rope",
  "A boy thinking about going to the store",
  "A boy talking about bedtime",
];

const ANSWER_COLOR = "#000";
const WRONG_COLOR = "#ef4444";
const LINE_COLOR = "#3f3f3f";

const ITEMS = [
  {
    id: 1,
    img: img1,
    example: false,
    question: "How often does she clean her room?",
    answer: "She never cleans her room.",
  },
  {
    id: 2,
    img: img2,
    example: false,
    question: "How often does she jump rope?",
    answer: "She usually jumps rope.",
  },
  {
    id: 3,
    img: img3,
    example: false,
    question: "How often does he go to the store?",
    answer: "He sometimes goes in the store.",
  },
  {
    id: 4,
    img: img4,
    example: false,
    question: "How often does he go to bed?",
    answer: "He always goes to bed.",
  },
];

const FREQUENCIES = ["always", "usually", "sometimes", "never"];

/* سؤال = خيارين */
const buildQuestionOptions = (correctQuestion) => {
  const all = ITEMS.filter((i) => !i.example).map((i) => i.question);
  const wrong = all.find((q) => q !== correctQuestion);
  return [correctQuestion, wrong];
};

/* جواب = 4 خيارات */
const buildAnswerOptions = (sentence) => {
  const words = sentence.split(" ");

  const subject = words[0]; // She
  const rest = words.slice(2).join(" "); // irons clothes.

  return FREQUENCIES.map((freq) => `${subject} ${freq} ${rest}`);
};

export default function Review2_Page1_Q2() {
  const [answers, setAnswers] = useState({});
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [correctKeys, setCorrectKeys] = useState([]);
  const [showAns, setShowAns] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit2Audio();

  const handleChange = (id, type, value) => {
    const key = `${type}-${id}`;
    if (showAns || correctKeys.includes(key)) return;

    setAnswers((prev) => ({
      ...prev,
      [`${type}-${id}`]: value,
    }));
    setCheckedKeys((previous) => previous.filter((item) => item !== key));
  };

  const isWrong = (item, type) => {
    if (!checkedKeys.includes(`${type}-${item.id}`) || showAns) return false;

    if (type === "question") {
      return answers[`question-${item.id}`] !== item.question;
    }
    return answers[`answer-${item.id}`] !== item.answer;
  };

  const handleCheck = () => {
    if (showAns || correctKeys.length === ITEMS.length * 2) return;

    const editable = ITEMS.filter((i) => !i.example);

    const allFilled = editable.every(
      (item) => answers[`question-${item.id}`] && answers[`answer-${item.id}`],
    );

    if (!allFilled) {
      ValidationAlert.info("Please complete all answers first.");
      return;
    }

    let score = 0;
    const total = editable.length * 2;

    editable.forEach((item) => {
      if (answers[`question-${item.id}`] === item.question) score++;
      if (answers[`answer-${item.id}`] === item.answer) score++;
    });

    const nextCorrect = [];
    editable.forEach((item) => {
      if (answers[`question-${item.id}`] === item.question)
        nextCorrect.push(`question-${item.id}`);
      if (answers[`answer-${item.id}`] === item.answer)
        nextCorrect.push(`answer-${item.id}`);
    });
    setCorrectKeys(nextCorrect);
    setCheckedKeys(
      editable.flatMap((item) => [`question-${item.id}`, `answer-${item.id}`]),
    );

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const filled = {};

    ITEMS.filter((i) => !i.example).forEach((item) => {
      filled[`question-${item.id}`] = item.question;
      filled[`answer-${item.id}`] = item.answer;
    });

    setAnswers(filled);
    setCheckedKeys(Object.keys(filled));
    setCorrectKeys(Object.keys(filled));
    setShowAns(true);
    stopAudio();
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCheckedKeys([]);
    setCorrectKeys([]);
    setShowAns(false);
    stopAudio();
  };

  const renderSelect = (item, type) => {
    const value = answers[`${type}-${item.id}`] || "";
    const wrong = isWrong(item, type);

    const options =
      type === "question"
        ? buildQuestionOptions(item.question)
        : buildAnswerOptions(item.answer);

    // أول كلمة ثابتة
    const firstWord = type === "question" ? "How" : item.answer.split(" ")[0];

    // حذف أول كلمة من الخيارات
    const cleanedOptions = options.map((opt) => {
      const words = opt.split(" ");
      words.shift();
      return words.join(" ");
    });

    // القيمة الحالية بدون أول كلمة
    const cleanedValue = value ? value.split(" ").slice(1).join(" ") : "";

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* الكلمة الثابتة */}
        <span
          role="button"
          tabIndex={0}
          className="unit2-audio-control unit2-interactive"
          onClick={() =>
            playAudio(`fixed-${item.id}-${type}`, FIXED_AUDIO[firstWord])
          }
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              playAudio(`fixed-${item.id}-${type}`, FIXED_AUDIO[firstWord]);
            }
          }}
          style={{
            fontWeight: "600",
            fontSize: "20px",
            minWidth: "45px",
          }}
        >
          {firstWord}
          <Unit2PlayingAudioIcon
            active={activeAudioKey === `fixed-${item.id}-${type}`}
          />
        </span>

        <select
          value={cleanedValue}
          onChange={(e) => {
            const finalValue = `${firstWord} ${e.target.value}`;
            handleChange(item.id, type, finalValue);
          }}
          disabled={showAns || correctKeys.includes(`${type}-${item.id}`)}
          style={{
            width: "100%",
            borderBottom: `1px solid ${wrong ? "red" : "navy"}`,
            fontSize: "clamp(12px, 1.4vw, 18px)",
            padding: "4px",
          }}
        >
          <option value="">Select</option>

          {cleanedOptions.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {wrong && (
          <div
            style={{
              position: "absolute",
              top: "-8px",
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              border: "2px solid white",
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
      <div className="div-forall" style={{ gap: "40px" }}>
        <ExerciseHeaderReview
          sectionLetter="B"
          title="Look at Exercise A. Write the questions and answers."
          subTitle="Use the picture, word bank, or grammar clue, then complete every blank before checking."
        />
        <div className="w-full">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ marginBottom: "20px" }}
              className="flex gap-5 items-center "
            >
              <img
                src={item.img}
                alt={IMAGE_ALTS[item.id - 1]}
                style={{ width: "20%", height: "100px" }}
              />
              <div className="w-[70%] flex flex-col gap-5">
                {item.example ? (
                  <>
                    <div>{item.question}</div>
                    <div>{item.answer}</div>
                  </>
                ) : (
                  <>
                    {renderSelect(item, "question")}
                    {renderSelect(item, "answer")}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
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
