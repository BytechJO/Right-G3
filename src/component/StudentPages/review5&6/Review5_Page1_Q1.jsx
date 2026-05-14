import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 6.svg";

const Review5_Page1_Q1 = () => {
  const objectsBank = [
    "ball",
    "sink",
    "book",
    "fruit",
    "car",
    "washing machine",
  ];

  const roomsBank = [
    "bathroom",
    "garage",
    "kitchen",
    "bedroom",
    "living room",
    "basement",
  ];

  const questions = [
    { id: 1, img: imgA, object: "ball", correct: "bedroom" },
    { id: 2, img: imgB, object: "sink", correct: "bathroom" },
    { id: 3, img: imgC, object: "book", correct: "living room" },
    { id: 4, img: imgD, object: "fruit", correct: "kitchen" },
    { id: 5, img: imgE, object: "car", correct: "garage" },
    { id: 6, img: imgF, object: "washing machine", correct: "basement" },
  ];
  const [wrongAnswers, setWrongAnswers] = useState({});
  const [objectAnswers, setObjectAnswers] = useState({});
  const [roomAnswers, setRoomAnswers] = useState({});
  const [locked, setLocked] = useState(false);

  const reset = () => {
    setObjectAnswers({});
    setRoomAnswers({});
    setLocked(false);
  };

  const showAnswers = () => {
    const filledObjects = {};
    const filledRooms = {};
    questions.forEach((q) => {
      filledObjects[q.id] = q.object;
      filledRooms[q.id] = q.correct;
    });
    setObjectAnswers(filledObjects);
    setRoomAnswers(filledRooms);
    setLocked(true);
  };

  const checkAnswers = () => {
    if (locked) return;

    const emptyObjects = questions.some((q) => !objectAnswers[q.id]);
    const emptyRooms = questions.some((q) => !roomAnswers[q.id]);

    if (emptyObjects || emptyRooms) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    const wrong = {};

    questions.forEach((q) => {
      const isCorrect =
        objectAnswers[q.id] === q.object && roomAnswers[q.id] === q.correct;

      if (!isCorrect) {
        wrong[q.id] = true;
      }
    });

    setWrongAnswers(wrong);
    let correct = 0;

    questions.forEach((q) => {
      if (objectAnswers[q.id] === q.object && roomAnswers[q.id] === q.correct) {
        correct++;
      }
    });

    const total = questions.length;

    const msg = `
      <div style="font-size:20px;text-align:center;">
        <b>Score: ${correct} / ${total}</b>
      </div>
    `;

    if (correct === total) ValidationAlert.success(msg);
    else if (correct === 0) ValidationAlert.error(msg);
    else ValidationAlert.warning(msg);

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
      <div className="div-forall" style={{ gap: "30px" }}>
        <h5 className="header-title-page8">
          <span style={{ marginRight: "10px" }}>A</span>
          Read, look, and write. Use the words below.
        </h5>

        <div className="w-full mx-auto">
          {/* QUESTIONS GRID */}
          {/* QUESTIONS GRID */}
          <div className="grid grid-cols-3 gap-10 mb-20">
            {questions.map((q) => (
              <div key={q.id} className="flex flex-col items-start gap-3">
                {/* الرقم + الصورة */}
                <div className="flex gap-2 items-start">
                  <span className="font-bold text-lg">{q.id}</span>

                  <img
                    src={q.img}
                    style={{
                      height: "110px",
                      // border: "2px solid orange",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                {/* object dropdown */}
                <div
                  style={{
                    width: "270px",
                    borderBottom: "1px solid black",
                    minHeight: "35px",
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span>Where is the</span>

                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <select
                      value={objectAnswers[q.id] || ""}
                      disabled={locked}
                      onChange={(e) =>
                        setObjectAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      style={{
                        borderBottom:
                          locked && objectAnswers[q.id] !== q.object
                            ? "2px solid red"
                            : "1px solid #ccc",
                        padding: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      <option value=""></option>

                      {objectsBank.map((obj) => (
                        <option key={obj} value={obj}>
                          {obj}
                        </option>
                      ))}
                    </select>

                    {locked && objectAnswers[q.id] !== q.object && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-10px",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "red",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>

                  <span>.</span>
                </div>

                {/* room dropdown */}
                <div
                  style={{
                    width: "270px",
                    borderBottom: "1px solid black",
                    minHeight: "35px",
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span>It's in the</span>

                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <select
                      value={roomAnswers[q.id] || ""}
                      disabled={locked}
                      onChange={(e) =>
                        setRoomAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      style={{
                        borderBottom:
                          locked && roomAnswers[q.id] !== q.correct
                            ? "2px solid red"
                            : "1px solid #ccc",
                        padding: "4px",
                        fontWeight: "bold",
                      }}
                    >
                      <option value=""></option>

                      {roomsBank.map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>

                    {locked && roomAnswers[q.id] !== q.correct && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-10px",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "red",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "bold",
                        }}
                      >
                        ✕
                      </span>
                    )}
                  </div>

                  <span>.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="action-buttons-container mt-10">
          <button onClick={reset} className="try-again-button">
            Start Again ↻
          </button>
          <button
            onClick={showAnswers}
            className="show-answer-btn swal-continue"
          >
            Show Answer
          </button>
          <button onClick={checkAnswers} className="check-button2">
            Check Answer ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review5_Page1_Q1;
