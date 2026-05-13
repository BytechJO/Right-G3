import React, { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../../Button";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/Pahe 16/Ex B 3.svg";

const Review1_Page1_Q2 = () => {
  const answersBank = ["A", "B", "C"];

  const questions = [
    {
      id: 1,
      label: "fast",
      images: img1,
      answers: { fastest: "C", slowest: "A" },
    },
    {
      id: 2,
      label: "short",
      images: img2,
      answers: { shortest: "C", tallest: "B" },
    },
    {
      id: 3,
      label: "old",
      images: img3,
      answers: { oldest: "A", youngest: "C" },
    },
  ];

  const [answers, setAnswers] = useState({});
  const [locked, setLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (key, value) => {
    if (locked) return;

    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const reset = () => {
    setAnswers({});
    setLocked(false);
    setShowResult(false);
  };

  const showAnswers = () => {
    const filled = {};
    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        filled[`${qIndex}-${type}`] = value;
      });
    });
    setAnswers(filled);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;
    const totalInputs = questions.reduce(
      (acc, q) => acc + Object.keys(q.answers).length,
      0,
    );

    if (Object.keys(answers).length < totalInputs) {
      ValidationAlert.info();
      return;
    }

    let correct = 0;
    let total = 0;

    questions.forEach((q, qIndex) => {
      Object.entries(q.answers).forEach(([type, value]) => {
        total++;
        if (answers[`${qIndex}-${type}`] === value) correct++;
      });
    });

    const color =
      correct === total ? "green" : correct === 0 ? "red" : "orange";

    const msg = `
  <div style="font-size:20px;text-align:center;">
    <span style="color:${color}; font-weight:bold;">
      Score: ${correct} / ${total}
    </span>
  </div>
`;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

    setShowResult(true);
    setLocked(true);
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
      <div className="div-forall"  style={{
                gap: "40px",
              }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>B</span>
          Read, look, and write. You can answer in two ways.
        </h5>
        {/* QUESTIONS */}
        <div className="flex flex-col gap-10">
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              // marginBottom: "40px",
            }}
          >
            {/* LEFT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                      width: "50%",

                gap: "10px",
              }}
            >
              <div className="flex text-[20px] w-[60px]" >
               <span className="font-bold text-[20px] mr-2">{q.id}</span>  {q.label}
              </div>

              <div style={{ display: "flex", gap: "20px" }}>
                <div key={q.id} style={{ textAlign: "center" }}>
                  <img
                    src={q.images}
                    alt=""
                    style={{
                      width: "300px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ width: "50%" }}>
              {Object.keys(q.answers).map((type) => (
                <div
                  style={{
                    marginBottom: "12px",
                    minHeight: "40px",
                    borderBottom: locked
                      ? answers[`${qIndex}-${type}`] === q.answers[type]
                        ? "1px solid #000"
                        : "2px solid #ef4444"
                      : "1px solid #000",
                    padding: "5px",
                    position: "relative",
                  }}
                >
                  <p className="flex items-center gap-2 flex-wrap">
                    <select
                      value={answers[`${qIndex}-${type}`] || ""}
                      onChange={(e) =>
                        handleSelect(`${qIndex}-${type}`, e.target.value)
                      }
                      disabled={locked}
                      className="border-b px-2 py-1 outline-none bg-white"
                    >
                      <option value="">Select</option>

                      {answersBank.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    is the {type}.
                  </p>

                  {/* WRONG MARK */}
                  {showResult &&
                    answers[`${qIndex}-${type}`] &&
                    answers[`${qIndex}-${type}`] !== q.answers[type] && (
                      <div
                        style={{
                          position: "absolute",
                          right: "-20px",
                          top: "0",
                        }}
                      >
                        <WrongMark />
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
</div>
        {/* BUTTONS */}
        <Button
          handleShowAnswer={showAnswers}
          handleStartAgain={reset}
          checkAnswers={checkAnswers}
        />
      </div>
    </div>
  );
};

export default Review1_Page1_Q2;
