import React, { useState, useRef, useEffect } from "react";
import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 3 Lala Goes Shopping Folder/G5_U3_Pg_22.png";
import vocabulary from "../../../assets/audio/ClassBook/Unit 3/P 22/Pg22_Vocab_Adult Lady.mp3";
import ModernVocabularyComponent from "../../ModernVocabularyComponent";
import "./Unit3_Page1.css";
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
import sound1 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound1.mp3";
import sound2 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound2.mp3";
import sound3 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound3.mp3";
import sound4 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound4.mp3";
import sound5 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound5.mp3";
import sound6 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound6.mp3";
import sound7 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound7.mp3";
import sound8 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound8.mp3";
import sound9 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound9.mp3";
import sound10 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound10.mp3";
import sound11 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound11.mp3";
import sound12 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound12.mp3";
import sound13 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound13.mp3";
import sound14 from "../../../assets/audio/ClassBook/Unit 3/P 22/sound14.mp3";

const Unit3_Page1_Vocab = () => {

  // ================================
  // ✔ Captions Array
  // ================================
  const captions = [
    { start: 0.66, end: 4.08, text: "Page 22, Unit 3. Vocabulary." },

    { start: 5.16, end: 7.64, text: "1. Grocery store." },
    { start: 7.64, end: 9.88, text: "2. Bag." },
    { start: 9.88, end: 12.44, text: "3. Grapes." },
    { start: 12.44, end: 15.14, text: "4. Carrots." },
    { start: 15.14, end: 17.6, text: "5. Apples." },
    { start: 17.6, end: 19.34, text: "6. Bananas." },
    { start: 20.38, end: 22.7, text: "7. Basket." },
    { start: 22.7, end: 25.52, text: "8. Eggplants." },
    { start: 25.52, end: 27.7, text: "9. Carton of milk." },
    { start: 28.76, end: 32.22, text: "10. Shelf, shelves." },
    { start: 32.22, end: 34.6, text: "11. Soap." },
    { start: 34.6, end: 37.26, text: "12. Toothpaste." },
    { start: 37.26, end: 40.1, text: "13. Shopping cart." },
    { start: 40.1, end: 43.0, text: "14. Can, cans." },
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
    { top: "20%", left: "70%" }, //1
    { top: "32%", left: "82%" }, //2
    { top: "35%", left: "42%" }, //3
    { top: "28%", left: "38%" }, //4
    { top: "39%", left: "30%" }, //5
    { top: "26%", left: "44%" }, //6
    { top: "41%", left: "49.5%" }, //7
    { top: "26%", left: "69%" }, // 8
    { top: "44%", left: "65%" }, //9
    { top: "33%", left: "7%" }, //10
    { top: "65%", left: "92%" }, //11
    { top: "49%", left: "62%" }, //12
    { top: "71%", left: "68%" }, //13
    { top: "48%", left: "84%" }, //14
  ];

  return (
    <ModernVocabularyComponent
      backgroundImage={backgroundImage}
      mainAudio={vocabulary}
      wordAudios={wordAudios}
      nums={nums}
      vocabulary={[
         "grocery store",
            "bag",
            "grapes",
            "carrots",
            "apples",
            "bananas",
            "basket",
            "eggplants",
            "carton of milk",
            "shelf, shelves",
            "soap",
            "toothpaste",
            "shopping cart",
            "can, cans",
      ]}
      markers={positions}
      captions={captions}
    />
  );
};

export default Unit3_Page1_Vocab;
