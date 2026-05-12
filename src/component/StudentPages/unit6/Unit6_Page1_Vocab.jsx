import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 6 Lets Run! Folder/G5_U6_Pg_46.png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import vocabulary from "../../../assets/audio/ClassBook/Unit 6/P 46/Pg46_Vocab_Adult Lady.mp3";
import "./Unit6_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 6/P 46/sound13.mp3";

const Unit6_Page1_Vocab = () => {

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.28, end: 3, text: "Page 46, Unit 6, Vocabulary." },

    { start: 3.49, end: 5.72, text: "1. rainbow." },
    { start: 5.74, end: 7.97, text: "2. cloud." },
    { start: 8.1, end: 10.52, text: "3. bird." },

    { start: 10.9, end: 13.01, text: "4. winner." },
    { start: 13.33, end: 15.81, text: "5. cheer." },
    { start: 16.0, end: 17.5, text: "6. tired." },
    { start: 18.36, end: 20.98, text: "7. stumble." },
    { start: 21.1, end: 23.4, text: "8. run." },

    { start: 23.65, end: 26.65, text: "9. race." },
    { start: 26.59, end: 29.07, text: "10. last." },
    { start: 29.26, end: 31.88, text: "11. swing." },

    { start: 32.26, end: 34.75, text: "12. finish line." },
    { start: 35.26, end: 37.87, text: "13. first." },
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
    { top: "17.5%", left: "44%" }, //1
    { top: "28%", left: "64.5%" }, //2
    { top: "28.5%", left: "34%" }, //3
    { top: "54%", left: "36%" }, //4
    { top: "52%", left: "87.5%" }, //5
    { top: "51.8%", left: "55.5%" }, //6
    { top: "59%", left: "53.5%" }, //7
    { top: "54.5%", left: "69%" }, // 8
    { top: "37%", left: "45.5%" }, //9
    { top: "44.5%", left: "77.5%" }, //10
    { top: "39.5%", left: "70%" }, //11
    { top: "65.5%", left: "74%" }, //12
    { top: "57.5%", left: "35%" }, //13
  ];

  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
        "rainbow",
        "cloud",
        "bird",
        "winner",
        "cheer",
        "tired",
        "stumble",
        "run",
        "race",
        "last",
        "swing",
        "finish line",
        "first",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Unit6_Page1_Vocab;
