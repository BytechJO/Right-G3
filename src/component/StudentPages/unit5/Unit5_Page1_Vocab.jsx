import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/G5_U5_Pg_40.png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import vocabulary from "../../../assets/audio/ClassBook/Unit 5/P 40/Pg40_Vocab_Adult Lady.mp3";
import "./Unit5_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 5/P 40/sound13.mp3";

const Unit5_Page1_Vocab = () => {

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.28, end: 2.5, text: "Page 40, Unit 5, Vocabulary." },

    { start: 3.49, end: 5.72, text: "1. chimney." },
    { start: 5.74, end: 7.97, text: "2. bedroom." },
    { start: 8.1, end: 10.52, text: "3. bathroom." },

    { start: 10.9, end: 13.01, text: "4. office." },
    { start: 13.33, end: 15.81, text: "5. living room." },
    { start: 16.0, end: 16.2, text: "6. sofa." },
    { start: 18.36, end: 20.98, text: "7. stairs." },
    { start: 21.1, end: 23.4, text: "8. hall." },

    { start: 23.65, end: 26.65, text: "9. dining room." },
    { start: 26.59, end: 29.07, text: "10. kitchen." },
    { start: 29.26, end: 31.88, text: "11. basement." },

    { start: 32.26, end: 34.75, text: "12. washing machine." },
    { start: 35.26, end: 37.87, text: "13. garage." },
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
    { top: "25.5%", left: "81%" }, //1
    { top: "34%", left: "53.5%" }, //2
    { top: "36.5%", left: "78%" }, //3
    { top: "48%", left: "49%" }, //4
    { top: "45%", left: "56.5%" }, //5
    { top: "48.8%", left: "61.5%" }, //6
    { top: "47%", left: "70.5%" }, //7
    { top: "61.5%", left: "38%" }, // 8
    { top: "60.5%", left: "56.5%" }, //9
    { top: "63.5%", left: "76.5%" }, //10
    { top: "72.5%", left: "28%" }, //11
    { top: "72.5%", left: "35%" }, //12
    { top: "73.5%", left: "87%" }, //13
  ];
 
  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
       "chimney",
            "bedroom",
            "bathroom",
            "office",
            "living room",
            "sofa",
            "stairs",
            "hall",
            "dining room",
            "kitchen",
            "basement",
            "washing machine",
            "garage",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};


export default Unit5_Page1_Vocab;
