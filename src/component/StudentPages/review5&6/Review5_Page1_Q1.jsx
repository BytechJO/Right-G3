import React, { useState } from "react";

import ValidationAlert from "../../Popup/ValidationAlert";
import ExerciseHeaderReview from "../../ExerciseHeaderReview";
import Unit4PlayingAudioIcon from "../unit4/Unit4PlayingAudioIcon";
import useUnit4Audio from "../unit4/useUnit4Audio";
import "../unit4/unit4Interactions.css";

import imgA from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 1.svg";
import imgB from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 2.svg";
import imgC from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 3.svg";
import imgD from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 4.svg";
import imgE from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 5.svg";
import imgF from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/Page 52/Ex A 6.svg";
import whereAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_001_Where_is_the.mp3";
import itsAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_002_It's_in_the.mp3";
import ballAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_001_ball.mp3";
import bedroomAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_002_bedroom.mp3";
import sinkAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_003_sink.mp3";
import bathroomAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_004_bathroom.mp3";
import bookAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_005_book.mp3";
import livingRoomAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_006_living_room.mp3";
import fruitAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_007_fruit.mp3";
import kitchenAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_008_kitchen.mp3";
import carAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_009_car.mp3";
import garageAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_010_garage.mp3";
import washingMachineAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_011_washing_machine.mp3";
import basementAudio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/Item_012_basement.mp3";
import full1Audio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/full1.mp3";
import full2Audio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/full2.mp3";
import full3Audio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/full3.mp3";
import full4Audio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/full4.mp3";
import full5Audio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/full5.mp3";
import full6Audio from "../../../assets/audio/ClassBook/Unit 6/Page 52 - Exercise A/full6.mp3";

const WORD_AUDIO = {
  ball: ballAudio,
  bedroom: bedroomAudio,
  sink: sinkAudio,
  bathroom: bathroomAudio,
  book: bookAudio,
  "living room": livingRoomAudio,
  fruit: fruitAudio,
  kitchen: kitchenAudio,
  car: carAudio,
  garage: garageAudio,
  "washing machine": washingMachineAudio,
  basement: basementAudio,
};
const FULL_AUDIO = [
  full1Audio,
  full2Audio,
  full3Audio,
  full4Audio,
  full5Audio,
  full6Audio,
];
const IMAGE_ALT = [
  "A ball in a bedroom",
  "A sink in a bathroom",
  "A book in a living room",
  "Fruit in a kitchen",
  "A car in a garage",
  "A washing machine in a basement",
];

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
  const [objectAnswers, setObjectAnswers] = useState({});
  const [roomAnswers, setRoomAnswers] = useState({});
  const [lockedObjects, setLockedObjects] = useState([]);
  const [lockedRooms, setLockedRooms] = useState([]);
  const [wrongObjects, setWrongObjects] = useState([]);
  const [wrongRooms, setWrongRooms] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const { activeAudioKey, playAudio, stopAudio } = useUnit4Audio();

  const reset = () => {
    setObjectAnswers({});
    setRoomAnswers({});
    setLockedObjects([]);
    setLockedRooms([]);
    setWrongObjects([]);
    setWrongRooms([]);
    setShowAnswer(false);
    stopAudio();
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
    setLockedObjects(questions.map((q) => q.id));
    setLockedRooms(questions.map((q) => q.id));
    setWrongObjects([]);
    setWrongRooms([]);
    setShowAnswer(true);
    stopAudio();
  };

  const checkAnswers = () => {
    if (
      showAnswer ||
      (lockedObjects.length === questions.length &&
        lockedRooms.length === questions.length)
    )
      return;

    const emptyObjects = questions.some((q) => !objectAnswers[q.id]);
    const emptyRooms = questions.some((q) => !roomAnswers[q.id]);

    if (emptyObjects || emptyRooms) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }
    setLockedObjects(
      questions.flatMap((q) =>
        objectAnswers[q.id] === q.object ? [q.id] : [],
      ),
    );
    setLockedRooms(
      questions.flatMap((q) => (roomAnswers[q.id] === q.correct ? [q.id] : [])),
    );
    setWrongObjects(
      questions.flatMap((q) =>
        objectAnswers[q.id] !== q.object ? [q.id] : [],
      ),
    );
    setWrongRooms(
      questions.flatMap((q) => (roomAnswers[q.id] !== q.correct ? [q.id] : [])),
    );
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
        <ExerciseHeaderReview
          sectionLetter="A"
          title="Read, look, and write. Use the words below."
          subTitle="Use each object and location clue, then write the room name that fits the picture."
        />

        <div className="w-full mx-auto">
          {/* QUESTIONS GRID */}
          {/* QUESTIONS GRID */}
          <div className="grid grid-cols-3 gap-10 mb-20">
            {questions.map((q, index) => {
              const fullyCorrect =
                lockedObjects.includes(q.id) && lockedRooms.includes(q.id);
              return (
                <div
                  key={q.id}
                  className={`flex flex-col items-start gap-3 unit4-audio-control ${fullyCorrect ? "unit4-full-audio-enabled" : ""}`}
                  role={fullyCorrect ? "button" : undefined}
                  tabIndex={fullyCorrect ? 0 : -1}
                  onClick={() =>
                    fullyCorrect && playAudio(`full-${q.id}`, FULL_AUDIO[index])
                  }
                  onKeyDown={(event) => {
                    if (
                      fullyCorrect &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      playAudio(`full-${q.id}`, FULL_AUDIO[index]);
                    }
                  }}
                >
                  <Unit4PlayingAudioIcon
                    active={activeAudioKey === `full-${q.id}`}
                  />
                  {/* الرقم + الصورة */}
                  <div className="flex gap-2 items-start">
                    <span className="font-bold text-lg">{q.id}</span>

                    <img
                      src={q.img}
                      alt={IMAGE_ALT[index]}
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
                    <span
                      role="button"
                      tabIndex={fullyCorrect ? -1 : 0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={(event) => {
                        event.stopPropagation();
                        playAudio(`where-${q.id}`, whereAudio);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(`where-${q.id}`, whereAudio);
                        }
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `where-${q.id}`}
                      />
                      Where is the
                    </span>

                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        value={objectAnswers[q.id] || ""}
                        disabled={lockedObjects.includes(q.id) || showAnswer}
                        onChange={(e) => {
                          setObjectAnswers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }));
                          setWrongObjects((previous) =>
                            previous.filter((id) => id !== q.id),
                          );
                          playAudio(
                            `object-${q.id}`,
                            WORD_AUDIO[e.target.value],
                          );
                        }}
                        style={{
                          borderBottom: wrongObjects.includes(q.id)
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

                      {wrongObjects.includes(q.id) && (
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
                    <span
                      role="button"
                      tabIndex={fullyCorrect ? -1 : 0}
                      className="unit4-audio-control unit4-interactive"
                      onClick={(event) => {
                        event.stopPropagation();
                        playAudio(`its-${q.id}`, itsAudio);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          event.stopPropagation();
                          playAudio(`its-${q.id}`, itsAudio);
                        }
                      }}
                    >
                      <Unit4PlayingAudioIcon
                        active={activeAudioKey === `its-${q.id}`}
                      />
                      It's in the
                    </span>

                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <select
                        value={roomAnswers[q.id] || ""}
                        disabled={lockedRooms.includes(q.id) || showAnswer}
                        onChange={(e) => {
                          setRoomAnswers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }));
                          setWrongRooms((previous) =>
                            previous.filter((id) => id !== q.id),
                          );
                          playAudio(`room-${q.id}`, WORD_AUDIO[e.target.value]);
                        }}
                        style={{
                          borderBottom: wrongRooms.includes(q.id)
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

                      {wrongRooms.includes(q.id) && (
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
              );
            })}
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
