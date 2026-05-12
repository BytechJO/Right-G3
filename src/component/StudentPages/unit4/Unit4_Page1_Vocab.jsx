import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 4 My E-Friend Folder/G5_U4_Pg_28.png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import vocabulary from "../../../assets/audio/ClassBook/Unit 4/P 28/Pg28_Vocab_Adult Lady.mp3";
import "./Unit4_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 4/P 28/sound14.mp3";

const Unit4_Page1_Vocab = () => {
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.459, end: 3.299, text: "Page 28. Unit 4 Vocabulary." },

    { start: 4.339, end: 6.2, text: "1. Email address." },
    { start: 6.82, end: 8.54, text: "2. Minimize." },
    { start: 9.32, end: 11.08, text: "3. Enlarge." },
    { start: 12.02, end: 13.74, text: "4. Exit." },

    { start: 14.56, end: 16.24, text: "5. Call." },
    { start: 17.0, end: 18.9, text: "6. Chat box." },
    { start: 19.62, end: 21.3, text: "7. Chat." },
    { start: 21.99, end: 23.73, text: "8. Camera." },

    { start: 24.91, end: 27.7, text: "9. Emoticons." },
    { start: 28.28, end: 30.21, text: "10. Picture." },

    { start: 30.8, end: 32.94, text: "11. Send." },
    { start: 33.4, end: 35.45, text: "12. Search." },

    { start: 36.28, end: 38.56, text: "13. Laptop." },
    { start: 39.06, end: 40.92, text: "14. Type." },
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
  const positions = [
    { top: "12.5%", left: "38%" }, //1
    { top: "16%", left: "65%" }, //2
    { top: "16%", left: "68%" }, //3
    { top: "16%", left: "71%" }, //4
    { top: "18%", left: "37.5%" }, //5
    { top: "33%", left: "35%" }, //6
    { top: "23%", left: "32.5%" }, //7
    { top: "27.5%", left: "61%" }, // 8
    { top: "39.5%", left: "30.5%" }, //9
    { top: "38.5%", left: "67.5%" }, //10
    { top: "38.5%", left: "48%" }, //11
    { top: "40.5%", left: "48%" }, //12
    { top: "50%", left: "65%" }, //13
    { top: "59%", left: "67%" }, //14
  ];

  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
        "Email address",
        "Minimize",
        "Enlarge",
        "Exit",
        "Call",
        "Chat box",
        "Chat",
        "Camera",
        "Emoticons",
        "Picture",
        "Send",
        "Search",
        "Laptop",
        "Type",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Unit4_Page1_Vocab;
