import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ValidationAlert from "../../Popup/ValidationAlert";
import WrongMark from "../../WrongMark";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex E 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex E 2.svg";
import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex E 3.svg";
import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex E 4.svg";
import img5 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex E 5.svg";
import img6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/Page 35/Ex E 6.svg";

const items = [
  {
    sentence: "pcaeh",
    scrambled: ["pcaeh"],
    correct: ["peach"],
    img: img1,
  },
  {
    sentence: "hilci",
    scrambled: ["hilci"],
    correct: ["chili"],
    img: img4,
  },
  {
    sentence: "wcath",
    scrambled: ["wcath"],
    correct: ["watch"],
    img: img2,
  },
  {
    sentence: "bnech",
    scrambled: ["bnech"],
    correct: ["bench"],
    img: img5,
  },
  {
    sentence: "nechkit",
    scrambled: ["nechkit"],
    correct: ["kitchen"],
    img: img3,
  },
  {
    sentence: "tachc",
    scrambled: ["tachc"],
    correct: ["catch"],
    img: img6,
  },
];

export default function Review3_Page2_Q3() {
  const [answers, setAnswers] = useState(items.map(() => []));
  const [hoveredWord, setHoveredWord] = useState(null);
  // ✅ بنك الحروف مع حالة used
  const [letterBank, setLetterBank] = useState(
    items.map((item) =>
      item.scrambled[0].split("").map((l) => ({
        value: l,
        used: false,
      })),
    ),
  );

  const [locked, setLocked] = useState(false);
  const [checked, setChecked] = useState(false);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || locked) return;

    if (
      source.droppableId.startsWith("bank") &&
      destination.droppableId.startsWith("slot")
    ) {
      const sourceIndex = Number(source.droppableId.split("-")[1]);
      const destIndex = Number(destination.droppableId.split("-")[1]);

      // ❌ منع السحب بين الكلمات
      if (sourceIndex !== destIndex) return;

      const updatedAnswers = [...answers];
      const updatedBank = [...letterBank];

      const letterObj = updatedBank[sourceIndex][source.index];

      // ❌ إذا مستخدم
      if (letterObj.used) return;

      // ❌ إذا امتلأت الكلمة
      if (
        updatedAnswers[destIndex].length >= items[destIndex].correct[0].length
      ) {
        return;
      }

      // ✅ أضف الحرف
      updatedAnswers[destIndex] = [
        ...updatedAnswers[destIndex],
        letterObj.value,
      ];

      // ✅ علّمه مستخدم
      updatedBank[sourceIndex][source.index].used = true;

      setAnswers(updatedAnswers);
      setLetterBank(updatedBank);
    }
  };

  // ✅ حذف حرف وإرجاعه للبنك
 const handleRemoveLetter = (questionIndex, letterIndex) => {
  if (locked) return;

  const updatedAnswers = [...answers];
  const updatedBank = [...letterBank];

  const removedLetter = updatedAnswers[questionIndex][letterIndex];

  updatedAnswers[questionIndex].splice(letterIndex, 1);

  // رجّع أول حرف مطابق
  const bankLetters = updatedBank[questionIndex];

  const indexToEnable = bankLetters.findIndex(
    (l) => l.value === removedLetter && l.used === true
  );

  if (indexToEnable !== -1) {
    bankLetters[indexToEnable].used = false;
  }

  setAnswers(updatedAnswers);
  setLetterBank(updatedBank);
};

  const resetAll = () => {
    setAnswers(items.map(() => []));
    setLetterBank(
      items.map((item) =>
        item.scrambled[0].split("").map((l) => ({
          value: l,
          used: false,
        })),
      ),
    );
    setLocked(false);
    setChecked(false);
  };

  const showAnswers = () => {
    // حط الإجابات
    setAnswers(items.map((item) => item.correct[0].split("")));

    // 🔥 خلّي كل الحروف used
    const updatedBank = items.map((item) =>
      item.scrambled[0].split("").map((l) => ({
        value: l,
        used: true,
      })),
    );

    setLetterBank(updatedBank);

    setLocked(true);
    setChecked(true);
  };
  const checkAnswers = () => {
    if (locked) return;

    const empty = answers.some((letters) => letters.length === 0);

    if (empty) {
      ValidationAlert.info("Please complete all answers.");
      return;
    }

    let score = 0;

    answers.forEach((letters, i) => {
      if (letters.join("") === items[i].correct[0]) {
        score++;
      }
    });

    const total = items.length;

    let color = score === total ? "green" : score === 0 ? "red" : "orange";

    const message = `
      <div style="font-size: 20px; text-align:center; margin-top: 8px;">
        <span style="color:${color}; font-weight:bold;">
          Score: ${score} /${total}
        </span>
      </div>
    `;

    if (score === total) ValidationAlert.success(message);
    else if (score === 0) ValidationAlert.error(message);
    else ValidationAlert.warning(message);

    setLocked(true);
    setChecked(true);
  };
const addLetter = (letter, questionIndex, letterIndex) => {
  if (locked) return;

  const updatedAnswers = [...answers];
  const updatedBank = [...letterBank];

  // إذا الحرف مستخدم بالفعل
  if (updatedBank[questionIndex][letterIndex].used) return;

  // إذا الامتلاء
  if (updatedAnswers[questionIndex].length >= items[questionIndex].correct[0].length)
    return;

  // إضافة الحرف
  updatedAnswers[questionIndex].push(letter);

  // mark used
  updatedBank[questionIndex][letterIndex].used = true;

  setAnswers(updatedAnswers);
  setLetterBank(updatedBank);
};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="main-container-component">
        <div className="div-forall" style={{gap:"20px"}}>
          <h5 className="header-title-page8">
            <span className=" mr-4">E</span>
            Unscramble the letters to make words with a <span className="text-blue-800">ch</span> sound.
          </h5>
          <div className="flex flex-col gap-3">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5">
                <img src={item.img} style={{height:"75px" ,width:"90px"}}/>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{i + 1}</span>
                  <span className="font-bold text-lg">{item.sentence}</span>

                  {/* 🔤 BANK */}
                  <div className="w-full">
                   
                        <div
                      
                          className="flex gap-2 w-full"
                        >
                          {letterBank[i].map((letter, index) => {
                            const id = `letter-${i}-${index}-${letter.value}`;

                            return (
                           <span
  onClick={() => addLetter(letter.value, i, index)}
  className={`w-9 h-9 flex items-center justify-center rounded border
    ${
      letter.used
        ? "bg-gray-300 text-gray-500 opacity-60 cursor-not-allowed"
        : "bg-white border-1 border-[#F79530] cursor-pointer hover:bg-orange-50"
    }
  `}
>
  {letter.value}
</span>
                            );
                          })}
                       
                        </div>
                 
                  </div>
                  {/* ✍️ SLOT */}
                  <div style={{ position: "relative" }}>
                  <div
  style={{
    width: "200px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    position: "relative",
    borderBottom: "1px solid gray",
  }}
>
  {answers[i].map((letter, letterIndex) => {
    const key = `${i}-${letterIndex}`;

    return (
      <span
        key={key}
        className={`${locked ? "":"hover:text-red-500"}`}
        onClick={() => handleRemoveLetter(i, letterIndex)}

        style={{
          marginRight: "2px",
          fontSize:"20px",
          cursor: locked ? "default" : "pointer",
        }}
      >
        {letter}
      </span>
    );
  })}
</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="action-buttons-container">
            <button className="try-again-button" onClick={resetAll}>
              Start Again ↻
            </button>

            <button onClick={showAnswers} className="show-answer-btn">
              Show Answer
            </button>

            <button className="check-button2" onClick={checkAnswers}>
              Check Answer ✓
            </button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
