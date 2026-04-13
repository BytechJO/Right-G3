import { useState } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import Button from "../Button";

// الصور
import imgF1a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E1.svg";
import imgF1b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E2.svg";
import imgF2a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E3.svg";
import imgF2b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E4.svg";
import imgF3a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/E5.svg";
import imgF3b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F1.svg";
import imgF4a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F2.svg";
import imgF4b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F3.svg";
import imgF5a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F4.svg";
import imgF5b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F5.svg";
import imgF6a from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F6.svg";
import imgF6b from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U5 Folder/Page 29/F7.svg";

const data = [
  { id: 1, sentence: "The cat is under the bed.", imgA: imgF1a, imgB: imgF1b, correct: "a" },
  { id: 2, sentence: "The duck is in front of the bathtub.",imgA: imgF4a, imgB: imgF4b, correct: "a" },
  { id: 3, sentence: "The chair is behind the table.",  imgA: imgF2a, imgB: imgF2b, correct: "a"},
  { id: 4, sentence: "The book is on the table.",  imgA: imgF5a, imgB: imgF5b, correct: "b" },
  { id: 5, sentence: "The cup is between the dishes.",imgA: imgF3a, imgB: imgF3b, correct: "a"  },
  { id: 6, sentence: "The table is next to the sofa.", imgA: imgF6a, imgB: imgF6b, correct: "b" },
];

const WB_Unit5_Page29_Q2 = () => {
  const [selections, setSelections] = useState(
    Object.fromEntries(data.map((q) => [q.id, null]))
  );
  const [showAnswers, setShowAnswers] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState({});

  const handleSelect = (id, choice) => {
    if (showAnswers) return;
    setSelections((prev) => ({ ...prev, [id]: choice }));
  };

  const checkAnswers = () => {
    if (showAnswers) return;

    const allAnswered = Object.values(selections).every((v) => v !== null);
    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions!");
      return;
    }

    let score = 0;
    const newWrong = {};

    data.forEach((item) => {
      const ok = selections[item.id] === item.correct;
      newWrong[item.id] = !ok;
      if (ok) score++;
    });

    setWrongAnswers(newWrong);
    setShowAnswers(true);

    const total = data.length;

    if (score === total) ValidationAlert.success(`Score: ${score} / ${total}`);
    else if (score > 0) ValidationAlert.warning(`Score: ${score} / ${total}`);
    else ValidationAlert.error(`Score: ${score} / ${total}`);
  };

  const handleShowAnswer = () => {
    const correct = {};
    data.forEach((item) => {
      correct[item.id] = item.correct;
    });
    setSelections(correct);
    setShowAnswers(true);
    setWrongAnswers({});
  };

  const handleStartAgain = () => {
    setSelections(Object.fromEntries(data.map((q) => [q.id, null])));
    setShowAnswers(false);
    setWrongAnswers({});
  };

  const renderImg = (item, choice) => {
    const src = choice === "a" ? item.imgA : item.imgB;
    const isSelected = selections[item.id] === choice;
    const isCorrect = item.correct === choice;

    let style = {
      border: "2px solid transparent",
      borderRadius: "9999px",
      padding: "4px",
      cursor: showAnswers ? "default" : "pointer",
      transition: "0.2s",
      position: "relative",
    };

    if (showAnswers) {
      if (isCorrect) style.border = "4px solid red";
      else if (isSelected && !isCorrect) {

      }
    } else if (isSelected) {
      style.border = "2px solid #f63b3bff";
    }

    return (
      <button
        onClick={() => handleSelect(item.id, choice)}
        disabled={showAnswers}
        style={style}
        key={choice}
      >
        <img
          src={src}
          alt=""
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />

        {showAnswers && isSelected && !isCorrect && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "18px",
              height: "18px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            ✕
          </span>
        )}
      </button>
    );
  };

 return (
      <div className="main-container-component">
        <div className="div-forall flex flex-col">

      {/* الهيدر */}
      <h1 className="WB-header-title-page8 mb-2">
        <span className="WB-ex-A">D</span>Read, look, and write.
      </h1>

      {/* الشبكة */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
        }}
      >
          {data.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontWeight: "bold", color: "#1e3a8a", width: "16px" }}>
                  {item.id}
                </span>

                {renderImg(item, "a")}
                {renderImg(item, "b")}
              </div>

              <p style={{ fontSize: "14px", color: "#374151", textAlign: "left" }}>
                {item.sentence}
              </p>
            </div>
          ))}
        </div>

        {/* الأزرار */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
};

export default WB_Unit5_Page29_Q2;