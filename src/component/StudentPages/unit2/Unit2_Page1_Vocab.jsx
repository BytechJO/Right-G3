import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 2 Summer Vacation Folder/G5_U2_Pg_10.png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import vocabulary from "../../../assets/audio/ClassBook/Unit 2/P 10/Pg10_Vocab_Adult Lady.mp3";
import "./Unit2_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 2/P 10/sound12.mp3";

const Unit2_Page1_Vocab = () => {

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.359, end: 2.679, text: "Page 10, Unit 2, Vocabulary." },

    { start: 3.9, end: 4.8, text: "1. France." },
    { start: 5.7, end: 7.59, text: "2. bus." },
    { start: 7.9, end: 10.31, text: "3. clock tower." },
    { start: 10.5, end: 12.8, text: "4. world map." },

    { start: 13.23, end: 15.52, text: "5. Nile River." },
    { start: 15.83, end: 17.97, text: "6. Egypt." },
    { start: 18.48, end: 20.69, text: "7. pyramids." },
    { start: 20.77, end: 22.91, text: "8. Australia." },

    { start: 23.3, end: 25.87, text: "9. South America." },
    { start: 26.06, end: 28.79, text: "10. Statue of Liberty." },
    { start: 29.02, end: 31.43, text: "11. tourist, tourists." },
    { start: 32.95, end: 35.79, text: "12. globe." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي


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
  ];

const positions = [
  { id: 1, top: "31.5%", left: "64%" },
  { id: 2, top: "7%", left: "63%" },
  { id: 3, top: "1%", left: "74%" },
  { id: 4, top: "39%", left: "57%" },
  { id: 5, top: "86%", left: "54.5%" },
  { id: 6, top: "66.8%", left: "50.5%" },
  { id: 7, top: "74%", left: "45.5%" },
  { id: 8, top: "52.5%", left: "77%" },
  { id: 9, top: "46.5%", left: "30.5%" },
  { id: 10, top: "15.5%", left: "34.5%" },
  { id: 11, top: "93.5%", left: "35%" },
  { id: 12, top: "77.5%", left: "77%" },
];

  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
        "France",
            "bus",
            "clock tower",
            "world map",
            "Nile River",
            "Egypt",
            "pyramids",
            "Australia",
            "South America",
            "Statue of Liberty",
            "tourist ,tourists",
            "globe",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Unit2_Page1_Vocab;