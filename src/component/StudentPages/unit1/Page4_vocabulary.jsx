import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/Asset 22.png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import vocabulary from "../../../assets/audio/ClassBook/Unit 1/P 4/Pg4_Vocab_Adult Lady.mp3";
import "./Page4.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 1/P 4/sound12.mp3";

const Page4_vocabulary = () => {
  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.459, end: 3.0, text: "Page 4. Unit 1 Vocabulary." },

    { start: 3.8, end: 4.74, text: "1. scoreboard." },
    { start: 6.06, end: 7.4, text: "2. young." },
    { start: 7.84, end: 9.6, text: "3. old." },
    { start: 10.32, end: 11.8, text: "4. small." },

    { start: 12.84, end: 14.14, text: "5. big." },
    { start: 15.02, end: 16.02, text: "6. referee." },
    { start: 17.62, end: 18.62, text: "7. whistle." },
    { start: 20.1, end: 21.66, text: "8. fast." },

    { start: 22.34, end: 24.02, text: "9. slow." },
    { start: 24.86, end: 26.38, text: "10. tall." },

    { start: 27.1, end: 28.8, text: "11. short" },
    { start: 29.52, end: 31.88, text: "12. basketball court." },
  ];
  // 🎵 فترات الكلمات داخل الأوديو الرئيسي
  const wordTimings = [
    { start: 3.8, end: 4.74 }, // 1. scoreboard
    { start: 6.06, end: 7.4 }, // 2. young
    { start: 7.84, end: 9.6 }, // 3. old
    { start: 10.32, end: 11.8 }, // 4. small

    { start: 12.84, end: 14.14 }, // 5. big
    { start: 15.02, end: 16.02 }, // 6. referee
    { start: 17.62, end: 18.62 }, // 7. whistle
    { start: 20.1, end: 21.66 }, // 8. fast

    { start: 22.34, end: 24.02 }, // 9. slow
    { start: 24.86, end: 26.38 }, // 10. tall

    { start: 27.1, end: 28.8 }, // 11. short
    { start: 29.52, end: 31.88 }, // 12. basketball court
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
    { top: "18.5%", left: "29%" }, //1
    { top: "32%", left: "55%" }, //2
    { top: "27%", left: "15%" }, //3
    { top: "24%", left: "39%" }, //4
    { top: "17%", left: "48.5%" }, //5
    { top: "47%", left: "89%" }, //6
    { top: "45%", left: "78.5%" }, //7
    { top: "50.5%", left: "63%" }, // 8
    { top: "37.5%", left: "40.5%" }, //9
    { top: "37.5%", left: "79.5%" }, //10
    { top: "35.5%", left: "61%" }, //11
    { top: "63.5%", left: "26%" }, //12
  ];

  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
        "scoreboard",
        "young",
        "old",
        "small",
        "big",
        "referee",
        "whistle",
        "fast",
        "slow",
        "tall",
        "short",
        "basketball court",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Page4_vocabulary;
