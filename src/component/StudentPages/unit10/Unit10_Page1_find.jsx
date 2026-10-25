import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/G5_10_Pg_82.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 10 What Shall We Do on the Weekend Folder/interactive.svg";

import FindQuestion from "../../FindQuestion";

import targetAudio from "../../../assets/audio/ClassBook/Unit 10/page 82/straw.mp3";

const targetArea = {
  x1: 66.5,
  y1: 34.9,
  x2: 69.9,
  y2: 46.5,
};

const Unit8_Page1_find = () => {
  return (
    <FindQuestion
      title="I need your help. Can you help me find the straw in the picture?"
      subtitle="Look carefully at the picture, then tap the straw."
      image={find_img}
      imageAlt="A beach scene with people and different beach objects"
      targetName="straw"
      targetArea={targetArea}
      targetAudio={targetAudio}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="36%"
      highlightLeft="68%"
      highlightHeight="8%"
      targetAriaLabel="Select the straw"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="The straw was selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the straw."
      correctAlertMessage="You found the straw! 🏆"
      wrongAnnouncement="That is not the straw. Try again."
      wrongAlertMessage="This is not the straw. Try again!"
      resetAnnouncement="Activity reset. Find the straw in the picture."
      showAnswerAnnouncement="The straw is highlighted."
    />
  );
};

export default Unit8_Page1_find;
