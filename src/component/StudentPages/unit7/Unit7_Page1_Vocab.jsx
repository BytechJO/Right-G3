import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/G5_U7_Pg_58.png";
import vocabulary from "../../../assets/audio/ClassBook/Unit 7/P 58/Pg58_Vocab_Adult Lady.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import "./Unit7_Page1.css";
import num1 from "../../../assets/imgs/num/1_1.svg";
import num2 from "../../../assets/imgs/num/2_1.svg";
import num3 from "../../../assets/imgs/num/3_1.svg";
import num4 from "../../../assets/imgs/num/4_1.svg";
import num5 from "../../../assets/imgs/num/5_1.svg";
import num6 from "../../../assets/imgs/num/6_1.svg";
import num7 from "../../../assets/imgs/num/7_1.svg";
import num8 from "../../../assets/imgs/num/8_1.svg";
import num9 from "../../../assets/imgs/num/9_1.svg";
import num10 from "../../../assets/imgs/num/10_1.svg";
import num11 from "../../../assets/imgs/num/11_1.svg";
import num12 from "../../../assets/imgs/num/12_1.svg";
import num13 from "../../../assets/imgs/num/13_1.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 7/P 58/sound13.mp3";

const Unit3_Page1_Vocab = () => {
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.44, end: 3.22, text: "Page 58, unit seven vocabulary." },
    { start: 4.1, end: 5.76, text: "1. Soccer field." },
    { start: 6.44, end: 7.86, text: "2. team." },
    { start: 8.68, end: 10.48, text: "3. Class." },
    { start: 11.42, end: 13.14, text: "4. Music room." },
    { start: 14.4, end: 15.46, text: "5. Cafeteria." },
    { start: 17.32, end: 19.2, text: "6. Library." },
    { start: 20.16, end: 22.04, text: "7. Computer lab" },
    { start: 22.86, end: 24.5, text: "8. Student." },
    { start: 25.5, end: 26.98, text: "9. Bus station." },
    { start: 28.32, end: 29.89, text: "10. Street" },
    { start: 31.0, end: 32.74, text: "11. Balcony." },
    { start: 33.78, end: 35.42, text: "12. City." },
    { start: 36.46, end: 38.06, text: "13. Walk." },
  ];

  const wordAudios = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
    sound10,
    sound11,
    sound12,
    sound13,
  ];

  const nums = [
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num7,
    num8,
    num9,
    num10,
    num11,
    num12,
    num13,
  ];
  const positions = [
    { top: "28%", left: "61%" }, //1
    { top: "27%", left: "53%" }, //2
    { top: "37%", left: "46%" }, //3
    { top: "44%", left: "65%" }, //4
    { top: "44%", left: "47%" }, //5
    { top: "44%", left: "56%" }, //6
    { top: "37%", left: "56%" }, //7
    { top: "51%", left: "41%" }, // 8
    { top: "70%", left: "61%" }, //9
    { top: "76%", left: "37%" }, //10
    { top: "53%", left: "77%" }, //11
    { top: "23%", left: "82%" }, //12
    { top: "54%", left: "68%" }, //13
  ];

  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
        "Soccer field",
        "team",
        "Class",
        "Music room",
        "Cafeteria",
        "Library",
        "Computer lab",
        "Student",
        "Bus station",
        "Street",
        "Balcony",
        "City",
        "Walk",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Unit3_Page1_Vocab;
