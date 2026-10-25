import React from "react";

import backgroundImage from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/G5_U1_Pg_04_05.png";
import MySVG from "../../../assets/imgs/pages/classbook/Right 3 Unit 1 At The Basketball Game Folder/interactive svg.svg";

import FindQuestion from "../../FindQuestion";
import targetAudio from "../../../assets/audio/ClassBook/Unit 1/Page 4/basketball_hoop.mp3";

const targetArea = {
  x1: 80.6,
  y1: 0.2,
  x2: 99.67,
  y2: 62.4,
};

const Page4_Interactive1 = () => {
  return (
    <FindQuestion
      title="Can you help me find the basketball hoop in the picture?"
      subtitle="Scan the whole picture first, then tap the basketball hoop."
      image={backgroundImage}
      imageAlt="A basketball scene with children and a basketball hoop visible in the picture."
      targetName="basketball hoop"
      targetArea={targetArea}
      targetAudio={targetAudio}
      answerHighlight={MySVG}
      imageHeight="70vh"
      highlightTop="-0.5%"
      highlightLeft="79.5%"
      highlightHeight="60%"
      targetAriaLabel="Select the basketball hoop"
      pointerSelectedMessage="A point in the picture was selected. Use Check Answer to check it."
      keyboardSelectedMessage="Basketball hoop selected. Use Check Answer to check your answer."
      correctAnnouncement="Correct. You found the basketball hoop."
      correctAlertMessage="You found the basketball hoop! 🏆"
      wrongAnnouncement="That is not the basketball hoop. Try again."
      wrongAlertMessage="This is not the basketball hoop. Try again!"
      resetAnnouncement="Activity reset. Find the basketball hoop in the picture."
      showAnswerAnnouncement="The basketball hoop is highlighted."
    />
  );
};

export default Page4_Interactive1;
