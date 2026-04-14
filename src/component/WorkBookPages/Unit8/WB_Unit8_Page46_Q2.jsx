import React, { useState } from "react";
import Button from "../Button";
import ValidationAlert from "../../Popup/ValidationAlert";

// ====== 15 images exactly ======
import img1 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/2.svg";
import img2 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/3.svg";
import img3 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/4.svg";
import img4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/5.svg";
import img5 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/6.svg";
import img6 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/7.svg";
import img7 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/8.svg";
import img8 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/9.svg";
import img9 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/10.svg";
import img10 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/11.svg";
import img11 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/12.svg";
import img12 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/13.svg";
import img13 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/14.svg";
import img14 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/15.svg";
import img15 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U8 Folder/Page 46/SVG/16.svg";

const LEFT_GROUP = [
  { id: 1, person: img1, yesImg: img2, noImg: img3 },
  { id: 2, person: img4, yesImg: img5, noImg: img6 },
  { id: 3, person: img7, yesImg: img8, noImg: img9 },
];

const RIGHT_GROUP = [
  { id: 4, person: img10, yesImg: img11, noImg: img12 },
  { id: 5, person: img13, yesImg: img14, noImg: img15 },
];

const SENTENCES = [
  {
    id: 1,
    first: "She had a doll,",
    second: "she didn’t have a computer.",
  },
  {
    id: 2,
    first: "He had a kite,",
    second: "he didn’t have a car.",
  },
  {
    id: 3,
    first: "He had a ball,",
    second: "he didn’t have a train.",
  },
  {
    id: 4,
    first: "They had a radio,",
    second: "they didn’t have a TV.",
  },
  {
    id: 5,
    first: "She had a book,",
    second: "she didn’t have a robot.",
  },
];

const DRAG_ITEMS = [
  { id: "1-a", value: "She had a doll," },
  
  
  { id: "1-b", value: "she didn’t have a computer." },
  { id: "3-a", value: "He had a ball," },
  { id: "4-a", value: "They had a radio," },
  { id: "2-a", value: "He had a kite," },
  { id: "3-b", value: "he didn’t have a train." },
  { id: "2-b", value: "he didn’t have a car." },
  { id: "5-a", value: "She had a book," },
  { id: "5-b", value: "she didn’t have a robot." },

  { id: "4-b", value: "they didn’t have a TV." },

];

const GroupTable = ({ rows }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "76px 104px 104px",
        gridTemplateRows: `36px repeat(${rows.length}, 90px)`,
        borderRadius: "14px",
        overflow: "visible",

      }}
    >
      <div style={{ width: "76px", height: "36px"  }} />

      <div
        style={{
          height: "36px",
          border: "2px solid #a7a7a7",
          borderBottom: "none",
          borderTopLeftRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          color: "#7c7c7c",
          fontWeight: "700",
          background: "#f9f9f9",
          lineHeight: 1,
        }}
      >
        ✓
      </div>

      <div
        style={{
          height: "36px",
          border: "2px solid #a7a7a7",
          borderLeft: "none",
          borderBottom: "none",
          borderTopRightRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          color: "#7c7c7c",
          fontWeight: "700",
          background: "#f9f9f9",
          lineHeight: 1,
        }}
      >
        ✕
      </div>

      {rows.map((row, index) => (
        <React.Fragment key={row.id}>
          <div
            style={{
              position: "relative",
              width: "76px",
              height: "90px",
              border: "2px solid #a7a7a7",
              borderTop: index === 0 ? "2px solid #a7a7a7" : "none",
              borderRight: "none",
              borderTopLeftRadius: index === 0 ? "14px" : 0,
              borderBottomLeftRadius: index === rows.length - 1 ? "14px" : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "5px",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                border: "1.5px solid #8d8d8d",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                color: "#555",
                fontWeight: "700",
                zIndex: 2,
              }}
            >
              {row.id}
            </div>

            <img
              src={row.person}
              alt={`person-${row.id}`}
              style={{
                width: "68px",
                height: "74px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              width: "104px",
              height: "90px",
              border: "2px solid #a7a7a7",
              borderTop: index === 0 ? "2px solid #a7a7a7" : "none",
              borderRight: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              overflow: "hidden",
            }}
          >
            <img
              src={row.yesImg}
              alt={`yes-${row.id}`}
              style={{
                width: "84px",
                height: "64px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              width: "104px",
              height: "90px",
              border: "2px solid #a7a7a7",
              borderTop: index === 0 ? "2px solid #a7a7a7" : "none",
              borderBottomRightRadius: index === rows.length - 1 ? "14px" : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              overflow: "hidden",
            }}
          >
            <img
              src={row.noImg}
              alt={`no-${row.id}`}
              style={{
                width: "84px",
                height: "64px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default function WB_Unit8_Page46_QD() {
  const [answers, setAnswers] = useState({});
  const [draggedText, setDraggedText] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showAns, setShowAns] = useState(false);

  const usedValues = Object.values(answers);

  const handleDragStart = (value) => {
    if (showAns || usedValues.includes(value)) return;
    setDraggedText(value);
  };

  const handleDrop = (dropKey) => {
    if (showAns || !draggedText) return;

    setAnswers((prev) => ({
      ...prev,
      [dropKey]: draggedText,
    }));

    setDraggedText(null);
  };

  const getItemResult = (item) => {
    return (
      answers[`${item.id}-first`] === item.first &&
      answers[`${item.id}-second`] === item.second
    );
  };

  const isWrong = (item) => {
    if (!showResults) return false;
    return !getItemResult(item);
  };

  const checkAnswers = () => {
    const allAnswered = SENTENCES.every(
      (item) => answers[`${item.id}-first`] && answers[`${item.id}-second`]
    );

    if (!allAnswered) {
      ValidationAlert.info("Please complete all sentences first.");
      return;
    }

    let score = 0;
    SENTENCES.forEach((item) => {
      if (getItemResult(item)) score++;
    });

    setShowResults(true);

    if (score === SENTENCES.length) {
      ValidationAlert.success(`Score: ${score} / ${SENTENCES.length}`);
    } else if (score > 0) {
      ValidationAlert.warning(`Score: ${score} / ${SENTENCES.length}`);
    } else {
      ValidationAlert.error(`Score: ${score} / ${SENTENCES.length}`);
    }
  };

  const handleShowAnswer = () => {
    const correctMap = {};
    SENTENCES.forEach((item) => {
      correctMap[`${item.id}-first`] = item.first;
      correctMap[`${item.id}-second`] = item.second;
    });

    setAnswers(correctMap);
    setShowAns(true);
    setShowResults(true);
  };

  const handleStartAgain = () => {
    setAnswers({});
    setDraggedText(null);
    setShowResults(false);
    setShowAns(false);
  };

  const renderDropBox = (dropKey, width) => {
    const value = answers[dropKey];

    return (
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(dropKey)}
        style={{
          minWidth: width,
          minHeight: "28px",
          display: "flex",
          alignItems: "center",
          padding: "0 2px 2px 2px",
          borderBottom: "2px solid #555",
          color: value ? "#dc2626" : "#9ca3af",
          fontSize: "17px",
          lineHeight: "1.5",
          backgroundColor: value ? "transparent" : "transparent",
        }}
      >
        {value || ""}
      </div>
    );
  };

  return (
    <div className="main-container-component">
      <div
        className="div-forall"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxWidth: "980px",
          margin: "0 auto",
        }}
      >
        <h1 className="WB-header-title-page8">
          <span className="WB-ex-A">D</span>
          Find and write sentences.
        </h1>

        {/* top layout - close together */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "36px",
            marginTop: "-4px",
          }}
        >
          <GroupTable rows={LEFT_GROUP} />
          <GroupTable rows={RIGHT_GROUP} />
        </div>

        {/* sentence bank */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "2px",
          }}
        >
          {DRAG_ITEMS.map((item) => {
            const disabled = usedValues.includes(item.value);

            return (
              <div
                key={item.id}
                draggable={!disabled && !showAns}
                onDragStart={() => handleDragStart(item.value)}
                style={{
                  padding: "8px 10px",
                  borderRadius: "10px",
                  backgroundColor: disabled ? "#d1d5db" : "#ef4444",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: disabled ? "not-allowed" : "grab",
                  opacity: disabled ? 0.5 : 1,
                  userSelect: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                }}
              >
                {item.value}
              </div>
            );
          })}
        </div>

        {/* writing lines with fixed but */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "2px",
          }}
        >
          {SENTENCES.map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  width: "20px",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#222",
                  textAlign: "right",
                }}
              >
                {item.id}
              </span>

              <div
                style={{
                  position: "relative",
                  flex: 1,
                  minHeight: "38px",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {renderDropBox(`${item.id}-first`, "255px")}

                <span
                  style={{
                    fontSize: "18px",
                    color: "#222",
                    fontWeight: "600",
                  }}
                >
                  but
                </span>

                {renderDropBox(`${item.id}-second`, "265px")}

                {isWrong(item) && (
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
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    ✕
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            handleShowAnswer={handleShowAnswer}
            handleStartAgain={handleStartAgain}
            checkAnswers={checkAnswers}
          />
        </div>
      </div>
    </div>
  );
}