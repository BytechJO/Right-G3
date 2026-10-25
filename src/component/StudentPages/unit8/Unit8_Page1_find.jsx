import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/G5_U8_Pg_64.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 8 At Our Grandparents Farm Folder/Interactive Svg (1).svg";

import FindQuestion from "../../FindQuestion";
import targetAudio from "../../../assets/audio/ClassBook/Unit 8/page 64/rooster.mp3";

const targetArea = {
  x1: 67.85,
  y1: 60.8,
  x2: 72.9,
  y2: 72.7,
};
const Unit8_Page1_find = () => {
  return (
    <FindQuestion
      title="Can you help me find the rooster in the picture?"
      subtitle="Scan the whole picture first, then tap the rooster."
      image={find_img}
      imageAlt="A colorful farm with a house, barn, tractor, cows, sheep, chickens, and a rooster"
      targetName="rooster"
      targetArea={targetArea}
      targetAudio={targetAudio}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="62.4%"
      highlightLeft="69.7%"
      highlightHeight="7%"
      targetAriaLabel="Select the rooster"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="Rooster selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the rooster."
      correctAlertMessage="You found the rooster! 🏆"
      wrongAnnouncement="That is not the rooster. Try again."
      wrongAlertMessage="This is not the rooster. Try again!"
      resetAnnouncement="Activity reset. Find the rooster in the picture."
      showAnswerAnnouncement="The rooster is highlighted."
    />
  );
};

export default Unit8_Page1_find;
