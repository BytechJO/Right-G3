import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/G5_10_Pg_82.png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import vocabulary from "../../../assets/audio/ClassBook/Unit 10/P 82/Pg82_Vocab_Adult Lady.mp3";
import "./Unit10_Page1.css";
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
import num14 from "../../../assets/imgs/num/14_1.svg";
import num15 from "../../../assets/imgs/num/15_1.svg";
import sound1 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/Unit 10/P 82/sound15.mp3";

const Unit10_Page1_Vocab = () => {

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.299, end: 3.5, text: "Page 82, Unit 10, Vocabulary." },

    { start: 4.42, end: 6.0, text: "1. beach." },
    { start: 6.0, end: 8.0, text: "2. sea." },
    { start: 8.0, end: 10.96, text: "3. swim." },

    { start: 12.179, end: 14.859, text: "4. beach umbrella." },

    { start: 15.899, end: 17.8, text: "5. float." },
    { start: 17.8, end: 20.0, text: "6. sunglasses." },
    { start: 20.0, end: 23.279, text: "7. sunscreen." },

    { start: 24.359, end: 26.5, text: "8. pail." },
    { start: 26.5, end: 28.439, text: "9. shovel." },

    { start: 29.5, end: 32.5, text: "10. build a sandcastle." },
    { start: 32.5, end: 34.84, text: "11. dig." },

    { start: 36.0, end: 38.5, text: "12. beach ball." },
    { start: 38.5, end: 41.0, text: "13. read a book." },
    { start: 41.0, end: 43.5, text: "14. sand." },
    { start: 43.5, end: 46.439, text: "15. goggles." },
  ];

  const positions = [
    { top: "40%", left: "31%" }, //1
    { top: "16%", left: "25.5%" }, //2
    { top: "20.5%", left: "38%" }, //3
    { top: "14%", left: "59%" }, //4
    { top: "28.8%", left: "37.5%" }, //5
    { top: "25.5%", left: "72.5%" }, //6
    { top: "32%", left: "60.5%" }, //7
    { top: "51.5%", left: "43%" }, // 8
    { top: "43.5%", left: "50%" }, //9
    { top: "63.5%", left: "50.5%" }, //10
    { top: "89.5%", left: "35%" }, //11
    { top: "70.5%", left: "43%" }, //12
    { top: "77.5%", left: "72%" }, //13
    { top: "74.5%", left: "56%" }, //14
    { top: "61.5%", left: "39.5%" }, //15
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
    sound14,
    sound15,
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
    num14,
    num15,
  ];

 
  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
         "beach",
            "sea",
            "swim",
            "beach umbrella",
            "float",
            "sunglasses",
            "sunscreen",
            "pail",
            "shovel",
            "build a sandcastle",
            "dig",
            "beach ball",
            "read a book",
            "sand",
            "goggles",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};


export default Unit10_Page1_Vocab;
