import React from "react";

import page_2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 41.png";

import img1_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-05.svg";
import img2_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-06.svg";
import img3_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-07.svg";
import img4_letter from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/1-08.svg";

import Rabbit from "../../../assets/Page 01/Rabbit.svg";

import soundListen from "../../../assets/audio/ClassBook/Unit 5/P 41/unit5-pg41-reading.mp3";

import img1_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/Asset 36.svg";
import img2_conversation from "../../../assets/imgs/pages/classbook/Right 3 Unit 5 At Toms House! Folder/Page 40-41/Asset 35.svg";

import sound1_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.1_Adult Lady.mp3";
import sound2_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.2_Adult Lady.mp3";
import sound3_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.3_Adult Lady.mp3";
import sound4_letter from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_2.4_Adult Lady.mp3";

import letterSound from "../../../assets/audio/ClassBook/Unit 5/P 41/unit5-pg41-listen.mp3";

import audioBtn from "../../../assets/Page 01/Audio btn.svg";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

import AudioWithCaption from "../../AudioWithCaption";
import FourImagesWithAudio from "../../FourImagesWithAudio";

import repeat from "../../../assets/audio/ClassBook/Unit 5/P 41/unit5-pg41-bebo&lolo.mp3";
import read from "../../../assets/imgs/P1 listen and repeat 01.svg";

import Bebo from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_1.1_Bebo.mp3";
import Lolo from "../../../assets/audio/ClassBook/Unit 5/P 41/Pg41_1.2_Lolo.mp3";

import "./Unit5_Page2.css";

const Unit5_Page2 = ({ openPopup }) => {
  const imageSounds = [
    null,
    new Audio(sound1_letter),
    new Audio(sound2_letter),
    new Audio(sound3_letter),
    new Audio(sound4_letter),
  ];

  const repeatSounds = [null, new Audio(Bebo), new Audio(Lolo)];

  const captionsExample = [
    {
      start: 0.359,
      end: 36.439,
      text: "Page 41 reading. Listen and read along. Tom lives in a house. Tom and his family live in a house near a big city. The house has many rooms. Tom and his sister like to play and study in their bedrooms. Tom's family sit together in the living room. When Tom is not riding his bike, he keeps it in the garage. There are many tall buildings behind the house. There is a yard next to Tom's house. There is a swing and slide in the yard. Tom's sister is on the slide and his cat is beside the slide",
    },
  ];

  const captions2 = [
    {
      start: 0,
      end: 4.33,
      text: "Page 41. Listen and read along.",
    },
    {
      start: 5.5,
      end: 8.6,
      text: "Y. Baby. Candy. Party",
    },
  ];

  const captions3 = [
    {
      start: 0.239,
      end: 4.88,
      text: "Page 41. Listen, read, and repeat.",
    },
    {
      start: 4.88,
      end: 5.94,
      text: "I live in a city.",
    },
    {
      start: 7.159,
      end: 8.099,
      text: "I live in a town.",
    },
  ];

  const openMainAudio = () => {
    openPopup(
      "audio",
      <AudioWithCaption
        src={soundListen}
        captions={captionsExample}
        pageId="unit5-page41-main-audio"
      />,
    );
  };

  const openRepeat = () => {
    openPopup(
      "html",
      <FourImagesWithAudio
        images={[read, img1_conversation, img2_conversation]}
        audioSrc={repeat}
        checkpoints={[0, 4.5, 6.1]}
        popupOpen={true}
        titleQ="Listen, read, and repeat."
        subHeader="Press Play, then tap each card to hear it again."
        audioArr={repeatSounds}
        pageId="unit5-page41-repeat"
        captions={captions3}
      />,
    );
  };

  const openRead = () => {
    openPopup(
      "html",
      <FourImagesWithAudio
        images={[Rabbit, img1_letter, img2_letter, img3_letter, img4_letter]}
        audioSrc={letterSound}
        checkpoints={[0, 4.5, 5.8, 6.9, 7.62]}
        popupOpen={true}
        subHeader="Press Play, follow each word or picture, then tap a card to replay it if needed."
        titleQ="Listen and read along."
        audioArr={imageSounds}
        pageId="unit5-page41-read"
        captions={captions2}
      />,
    );
  };

  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_2})` }}
    >
      <div
        className="headset-icon-CD-unit5-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Play Unit 5 page 41 reading audio"
          onClick={openMainAudio}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openMainAudio();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="headset-icon-CD-unit5-page2-2 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open listen, read, and repeat activity"
          onClick={openRepeat}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openRepeat();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={audioBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>

      <div
        className="click-icon-unit5-page2-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          tabIndex={0}
          role="button"
          aria-label="Open listen and read activity"
          onClick={openRead}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openRead();
            }
          }}
          style={{
            overflow: "visible",
            cursor: "pointer",
          }}
        >
          <image
            className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="90"
            height="90"
          />
        </svg>
      </div>
    </div>
  );
};

export default Unit5_Page2;
