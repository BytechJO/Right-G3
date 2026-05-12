import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Untitled-2 (3).png";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";

// import vocabulary from "../../../assets/img_unit3/sounds-unit3/Pg10_Vocabulary_Adult Lady.mp3";
import "./Unit9_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound14.mp3";
import sound15 from "../../../assets/audio/ClassBook/Unit 9/P 76/sound15.mp3";
import vocabulary from "../../../assets/audio/ClassBook/Unit 9/P 76/Pg76_Vocab_Adult Lady.mp3";

const Unit5_Page1_Vocab = () => {

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.5, end: 3.8, text: "Page 76, Unit 9, Vocabulary." },

    { start: 4.42, end: 6.5, text: "1. clinic." },
    { start: 6.5, end: 8.5, text: "2. post office." },
    { start: 8.5, end: 10.14, text: "3. restaurant." },
    { start: 11.74, end: 13.34, text: "4. swimming pool." },
    { start: 14.62, end: 15.66, text: "5. hospital." },
    { start: 17.22, end: 18.56, text: "6. car wash." },
    { start: 19.88, end: 20.9, text: "7. zoo." },
    { start: 22.2, end: 23.899, text: "8. airport." },

    { start: 24.939, end: 26.5, text: "9. bus stop." },
    { start: 26.5, end: 29.119, text: "10. gym." },

    { start: 30.159, end: 31.899, text: "11. bakery." },

    { start: 33.02, end: 35.5, text: "12. theater." },
    { start: 35.5, end: 38.5, text: "13. playground." },
    { start: 38.5, end: 41.0, text: "14. toy shop." },
    { start: 41.0, end: 43.539, text: "15. bank." },
  ];

  const positions = [
    { top: "32.5%", left: "80%" }, //1
    { top: "26%", left: "54.5%" }, //2
    { top: "25.5%", left: "26%" }, //3
    { top: "23%", left: "7%" }, //4
    { top: "48.8%", left: "85.5%" }, //5
    { top: "63.5%", left: "45.5%" }, //6
    { top: "91%", left: "18.5%" }, //7
    { top: "74.5%", left: "24%" }, // 8
    { top: "82.5%", left: "65%" }, //9
    { top: "54.5%", left: "59.5%" }, //10
    { top: "70.5%", left: "52%" }, //11
    { top: "41.5%", left: "45%" }, //12
    { top: "80.5%", left: "49%" }, //13
    { top: "41%", left: "57%" }, //14
    { top: "51%", left: "20%" }, //15
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
        "clinic",
            "post office",
            "restaurant",
            "swimming pool",
            "hospital",
            "car wash",
            "zoo",
            "airport",
            "bus stop",
            "gym",
            "bakery",
            "theater",
            "playground",
            "toy shop",
            "bank",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Unit5_Page1_Vocab;
