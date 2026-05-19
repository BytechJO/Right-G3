import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/G5_U8_Pg_64.png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";

import "./Unit8_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 8/P 64/sound14.mp3";
import vocabulary from "../../../assets/audio/ClassBook/Unit 8/P 64/Pg64_Vocab_Adult Lady.mp3";

const Unit8_Page1_Vocab = () => {
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.319, end: 3.839, text: "Page 64, Unit 8, Vocabulary." },

    { start: 5.099, end: 7.0, text: "1. cottage." },
    { start: 7.0, end: 9.0, text: "2. tractor." },
    { start: 9.0, end: 11.46, text: "3. mill." },

    { start: 12.599, end: 14.259, text: "4. barn." },

    { start: 15.279, end: 17.0, text: "5. horse." },
    { start: 17.0, end: 18.5, text: "6. dog." },
    { start: 18.5, end: 21.68, text: "7. chick." },

    { start: 22.739, end: 24.5, text: "8. chicken." },
    { start: 24.5, end: 26.5, text: "9. sheep." },
    { start: 27.72, end: 29.48, text: "10. fence." },
    { start: 30.4, end: 31.56, text: "11. wheat." },
    { start: 32.9, end: 34.3, text: "12. farmer." },
    { start: 35.7, end: 36.88, text: "13. cow." },

    { start: 38.5, end: 40.5, text: "14. dog kennel." },
  ];

  const positions = [
    { top: "15.5%", left: "46%" }, //1
    { top: "47%", left: "35.5%" }, //2
    { top: "13.5%", left: "54%" }, //3
    { top: "33%", left: "75%" }, //4
    { top: "43%", left: "69.5%" }, //5
    { top: "48.8%", left: "85.5%" }, //6
    { top: "68%", left: "82.5%" }, //7
    { top: "49.5%", left: "65%" }, // 8
    { top: "53.5%", left: "84%" }, //9
    { top: "57.5%", left: "51.5%" }, //10
    { top: "33.5%", left: "28%" }, //11
    { top: "30.5%", left: "35%" }, //12
    { top: "55.5%", left: "78%" }, //13
    { top: "41%", left: "88%" }, //14
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
  ];

  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
        "cottage",
        "tractor",
        "mill",
        "barn",
        "horse",
        "dog",
        "chick",
        "chicken",
        "sheep",
        "fence",
        "wheat",
        "farmer",
        "cow",
        "dog kennel",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Unit8_Page1_Vocab;
