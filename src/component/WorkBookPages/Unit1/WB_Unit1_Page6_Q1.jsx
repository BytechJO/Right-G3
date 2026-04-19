import React, { useMemo, useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 1.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 2.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 3.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 4.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 5.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 6/SVG/Asset 6.svg";

const ITEMS = [
  {
    id: 1,
    img: img1,
    options: ["giraffe", "bear"],
    correct: "giraffe",
  },
  {
    id: 2,
    img: img2,
    options: ["basketball", "football"],
    correct: "basketball",
  },
  {
    id: 3,
    img: img3,
    options: ["snake", "elephant"],
    correct: "snake",
  },
  {
    id: 4,
    img: img4,
    options: ["big", "small"],
    correct: "big",
  },
    {
    id: 5,
    img: img5,
    options: ["light", "heavy"],
    correct: "light",
  },  {
    id: 6,
    img: img6,
    options: ["slow", "fast"],
    correct: "fast",
  },
];

function OptionPill({ text, selected, wrong, correctSelected, showAns, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={showAns}
      style={{
        minWidth: "110px",
        padding: "10px 18px",
        borderRadius: "999px",
        border: wrong
          ? "2px solid #dc2626"
          : selected
          ? "2px solid #f39b42"
          : "2px solid #d6d6d6",
       
        color: "#222",
        fontSize: "18px",
        fontWeight: "500",
        cursor: showAns ? "default" : "pointer",
        transition: "all 0.2s ease",
        position: "relative",
        boxShadow: selected ? "0 4px 10px rgba(0,0,0,0.06)" : "none",
        whiteSpace: "nowrap",
      }}
    >
      {text}

      {wrong && (
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "700",
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
          }}
        >
          ✕
        </div>
      )}
    </button>
  );
}

function QuestionCard({
  item,
  value,
  onSelect,
  showResults,
  showAns,
  isWrong,
}) {
  const correctSelected = (option) => showResults && option === item.correct;
  const selected = (option) => value === option;
  const wrongSelected = (option) => isWrong && value === option;

  return (
    <div
      style={{
        width: "100%",
        border: "2px solid #ececec",
        borderRadius: "24px",
        background: "#fff",
        padding: "18px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        minHeight: "100%",
        boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            border: "2px solid #cfcfcf",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "700",
            background: "#fafafa",
            flexShrink: 0,
          }}
        >
          {item.id}
        </div>

        <div
          style={{
            flex: "1 1 140px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "120px",
          }}
        >
          <img
            src={item.img}
            alt={item.correct}
            style={{
              width: "clamp(90px, 16vw, 130px)",
              height: "clamp(90px, 16vw, 130px)",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {item.options.map((option) => (
          <OptionPill
            key={option}
            text={option}
            selected={selected(option)}
            wrong={wrongSelected(option)}
            correctSelected={correctSelected(option)}
            showAns={showAns}
            onClick={() => onSelect(item.id, option)}
          />
        ))}
      </div>
    </div>
  );
}

export default function WB_UnitX_PageXX_QG() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const handleSelect = (id, value) => {
    if (showAns) return;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    setShowResults(false);
  };

  const handleCheck = () => {
    if (showAns) return;

    const allAnswered = ITEMS.every((item) => answers[item.id]);

    if (!allAnswered) {
      ValidationAlert.info("Please answer all questions first.");
      return;
    }

    let score = 0;

    ITEMS.forEach((item) => {
      if (answers[item.id] === item.correct) {
        score++;
      }
    });

    setShowResults(true);

    if (score === ITEMS.length) {
      ValidationAlert.success(`Score: ${score} / ${ITEMS.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${ITEMS.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${ITEMS.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};

    ITEMS.forEach((item) => {
      correctMap[item.id] = item.correct;
    });

    setAnswers(correctMap);
    setShowResults(true);
    setShowAns(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setShowResults(false);
    setShowAns(false);
  };

  const isWrong = useMemo(() => {
    return (item) => {
      if (!showResults) return false;
      return answers[item.id] !== item.correct;
    };
  }, [answers, showResults]);

  return (
    <div className="main-container-component">
  <div
        className="div-forall"
            style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
        <h1
          className="WB-header-title-page8"
          style={{
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          <span className="WB-ex-A">G</span> Look, read, and circle.
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {ITEMS.map((item) => (
            <QuestionCard
              key={item.id}
              item={item}
              value={answers[item.id]}
              onSelect={handleSelect}
              showResults={showResults}
              showAns={showAns}
              isWrong={isWrong(item)}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={handleCheck}
          />
        </div>
      </div>
    </div>
  );
}