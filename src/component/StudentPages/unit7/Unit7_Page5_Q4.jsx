import React, { useState, useEffect } from "react";
import ValidationAlert from "../../Popup/ValidationAlert";
import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex C 1.svg";
import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 62/Ex C 2.svg";
import Button from "../../Button";

const Unit7_Page5_Q4 = () => {
  const grid = [
    "d","t","h","e","y","t","a","d","g","b","n","m","v","g","l","i","k","e","x","n","s","r","o","l","t","o",
    "h","f","e","a","t","b","x","a","z","b","k","g","r","a","s","s","h","a","f","g","h","r","t","f","b","i",
    "p","m","o","l","k","i"
  ];

  const letters = grid;
  const wordsToFind = ["they", "like", "to", "eat", "grass"];

  const [sentence, setSentence] = useState("");
  const [selected, setSelected] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [coloredCells, setColoredCells] = useState([]);

  const handleClick = (letter, index) => {
    if (coloredCells.includes(index)) return;

    if (selected.includes(index)) {
      const cutIndex = selected.indexOf(index);
      const newSelected = selected.slice(0, cutIndex);

      const newWord = newSelected.map((i) => letters[i]).join("");

      setSelected(newSelected);
      setCurrentWord(newWord);
      return;
    }

    setSelected((prev) => [...prev, index]);
    setCurrentWord((prev) => prev + letter);
  };

  useEffect(() => {
    if (
      wordsToFind.includes(currentWord) &&
      !foundWords.includes(currentWord)
    ) {
      setFoundWords((prev) => [...prev, currentWord]);
      setColoredCells((prev) => [...prev, ...selected]);

      setSentence((prev) =>
        prev ? prev + " " + currentWord : currentWord
      );

      setSelected([]);
      setCurrentWord("");
    }
  }, [currentWord]);

  const checkAnswers = () => {
    const total = wordsToFind.length;
    const score = foundWords.length;

    if (score === 0) {
      ValidationAlert.error(`Score 0 / ${total}`);
    } else if (score < total) {
      ValidationAlert.warning(`Score ${score} / ${total}`);
    } else {
      ValidationAlert.success(`Score ${score} / ${total}`);
    }
  };

  const reset = () => {
    setSelected([]);
    setCurrentWord("");
    setFoundWords([]);
    setColoredCells([]);
    setSentence("");
  };

  const showAnswers = () => {
    let allCells = [];
    const fullString = letters.join("");

    wordsToFind.forEach((word) => {
      const startIndex = fullString.indexOf(word);

      if (startIndex !== -1) {
        for (let i = 0; i < word.length; i++) {
          allCells.push(startIndex + i);
        }
      }
    });

    setFoundWords(wordsToFind);
    setColoredCells(allCells);
    setSentence(wordsToFind.join(" "));
    setSelected([]);
    setCurrentWord("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* title */}
        <h3 style={{ textAlign: "center", margin: 0 }}>
          <span style={{ color: "#1d4f7b", fontWeight: "bold" }}>C</span>{" "}
          What do photographers use?
        </h3>

        {/* words */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            padding: "10px",
            border: "2px solid #ddd",
            borderRadius: "10px",
            background: "#f9f9f9",
          }}
        >
          {wordsToFind.map((word) => (
            <div
              key={word}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                background: foundWords.includes(word)
                  ? "#4caf50"
                  : "#777",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {word}
            </div>
          ))}
        </div>

        {/* grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "6px",
            background: "#daf5ff",
            padding: "12px",
            borderRadius: "10px",
          }}
        >
          {letters.map((letter, index) => {
            const isSelected = selected.includes(index);
            const isFound = coloredCells.includes(index);

            return (
              <div
                key={index}
                onClick={() => handleClick(letter, index)}
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderBottom: "2px solid #000",
                  cursor: "pointer",
                  userSelect: "none",
                  background: isFound
                    ? "#a6f4a6"
                    : isSelected
                    ? "#b3e5ff"
                    : "transparent",
                  borderRadius: "4px",
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* sentence + images */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <img src={img1} style={{ width: "80px", height: "80px" }} />

          <input
            value={sentence}
            readOnly
            style={{
              width: "260px",
              height: "40px",
              textAlign: "center",
              fontSize: "18px",
              fontWeight: "bold",
              border: "2px solid #ccc",
              borderRadius: "8px",
              outline: "none",
            }}
          />

          <img src={img2} style={{ width: "80px", height: "80px" }} />
        </div>

        <Button
          checkAnswers={checkAnswers}
          handleStartAgain={reset}
          handleShowAnswer={showAnswers}
        />
      </div>
    </div>
  );
};


export default Unit7_Page5_Q4;