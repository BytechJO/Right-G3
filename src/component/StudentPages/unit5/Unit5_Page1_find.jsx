import React from "react";

import find_img from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/G5_U5_Pg_40.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Interactive.svg";

import FindQuestion from "../../FindQuestion";

import targetAudio from "../../../assets/audio/ClassBook/Unit 5/page 40/stove.mp3";

const targetArea = {
  x1: 79.8,
  y1: 60.9,
  x2: 86.1,
  y2: 77.9,
};

const Unit5_Page1_find = () => {
  return (
    <FindQuestion
      title="Can you help me find the stove in the picture?"
      subtitle="Scan the whole picture first, then tap the stove."
      image={find_img}
      imageAlt="A cutaway view of a house showing several rooms with furniture and household objects, including a kitchen, living room, bedroom, bathroom, garage, and stove"
      targetName="stove"
      targetArea={targetArea}
      targetAudio={targetAudio}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="61.9%"
      highlightLeft="78%"
      highlightHeight="13%"
      targetAriaLabel="Select the stove"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="The stove was selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the stove."
      correctAlertMessage="You found the stove! 🏆"
      wrongAnnouncement="That is not the stove. Try again."
      wrongAlertMessage="This is not the stove. Try again!"
      resetAnnouncement="Activity reset. Find the stove in the picture."
      showAnswerAnnouncement="The stove is highlighted."
    />
  );
};

export default Unit5_Page1_find;
