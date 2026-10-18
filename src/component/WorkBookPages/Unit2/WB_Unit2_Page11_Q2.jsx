import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeader from "../../ExerciseHeader";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 5.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 6.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 7.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U2 Folder/Page 11/SVG/Asset 8.svg";

const ANSWER_COLOR = "#000";
const WRONG_COLOR = "#ef4444";
const LINE_COLOR = "#3f3f3f";

const ITEMS = [
  {
    id: 1,
    img: img1,
    example: false,
    question: "How often does she iron clothes?",
    answer: "She usually irons clothes.",
  },
  {
    id: 2,
    img: img2,
    example: false,
    question: "How often does he read the newspaper?",
    answer: "He rarely reads the newspaper.",
  },
  {
    id: 3,
    img: img3,
    example: false,
    question: "How often does he play chess?",
    answer: "He sometimes plays chess.",
  },
  {
    id: 4,
    img: img4,
    example: false,
    question: "How often does she go to bed?",
    answer: "She always goes to bed.",
  },
];

const FREQUENCIES = ["always", "usually", "sometimes", "never", "rarely"];

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

export default function WB_Unit2_Page11_QF() {
  const [answers, setAnswers] = useState({});
  const [checkedFields, setCheckedFields] = useState([]);
  const [correctFields, setCorrectFields] = useState([]);
  const [showAns, setShowAns] = useState(false);

  const handleChange = (id, type, value) => {
    const fieldKey = `${type}-${id}`;
    if (showAns || correctFields.includes(fieldKey)) return;

    setAnswers((prev) => ({
      ...prev,
      [`${type}-${id}`]: value,
    }));
    setCheckedFields((previous) => previous.filter((key) => key !== fieldKey));
  };

  const isWrong = (item, type) => {
    if (!checkedFields.includes(`${type}-${item.id}`) || showAns) return false;

    if (type === "question") {
      return answers[`question-${item.id}`] !== item.question;
    }
    return answers[`answer-${item.id}`] !== item.answer;
  };

  const handleCheck = () => {
    if (showAns || correctFields.length === ITEMS.length * 2) return;

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
    setCheckedFields(
      editable.flatMap((item) => [`question-${item.id}`, `answer-${item.id}`]),
    );
    setCorrectFields(nextCorrect);

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
    setCheckedFields(
      ITEMS.flatMap((item) => [`question-${item.id}`, `answer-${item.id}`]),
    );
    setCorrectFields(
      ITEMS.flatMap((item) => [`question-${item.id}`, `answer-${item.id}`]),
    );
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setCheckedFields([]);
    setCorrectFields([]);
    setShowAns(false);
  };

  const renderSelect = (item, type) => {
    const value = answers[`${type}-${item.id}`] || "";
    const wrong = isWrong(item, type);

    const options =
      type === "question"
        ? buildQuestionOptions(item.question)
        : buildAnswerOptions(item.answer);

    return (
      <div style={{ position: "relative", width: "100%" }}>
        <select
          value={value}
          onChange={(e) => handleChange(item.id, type, e.target.value)}
          disabled={showAns || correctFields.includes(`${type}-${item.id}`)}
          style={{
            width: "100%",
            borderBottom: `1px solid ${wrong ? "red" : "navy"}`,
            fontSize: "clamp(12px, 1.4vw, 18px)",
            padding: "4px",
          }}
        >
          <option value="">Select</option>
          {options.map((opt, i) => (
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
      <div className="div-forall" style={{ gap: "20px" }}>
        <ExerciseHeader
          sectionLetter="F"
          title="Look at Exercise E. Write the questions and answers."
          subTitle="Use the How often question and answer for each person to decide the missing word or phrase before opening each dropdown, then reread the completed sentence."
        />
        <div className="w-full">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              style={{ marginBottom: "20px" }}
              className="flex gap-5 items-center"
            >
              <img
                src={item.img}
                alt={
                  item.id === 1
                    ? "The woman from Exercise E"
                    : item.id === 2
                      ? "The man from Exercise E"
                      : item.id === 3
                        ? "The boy from Exercise E"
                        : "The girl from Exercise E"
                }
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
