
import Rabbit from "../../../assets/Page 01/Rabbit.svg";
// import img1 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/Page59-listen2.svg";
// import img2 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/Page59-listen3.svg";
// import img3 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/Page59-listen4.svg";
// import img4 from "../../../assets/imgs/pages/classbook/Right 3 Unit 7 Thats My School Folder/Page 58-59/Page59-listen5.svg";

import FourImagesWithAudio from "../../FourImagesWithAudio";
import longAudio from "../../../assets/audio/ClassBook/U 5/CD27.Pg40.U5_Intro_Adult Lady.mp3";

const Unit5_Page1_Read = () => {
  const imageSounds = [
    null, // الصورة الأولى الكبيرة (إن ما بدك صوت إلها)
    new Audio(sound1),
    new Audio(sound2),
    new Audio(sound3),
    new Audio(sound4),

  ];

const captions = [
   { start: 0, end: 3.05, text: "Page 10. Listen and read along." },
    { start: 3.07, end: 6.14, text: "B, bird, ball, boy " },
    
  ];
  return (
    <>
      <FourImagesWithAudio
        images={[Rabbit, img1,img1,img1,img1, img2, img3 , img4]}
        audioSrc={longAudio}
        checkpoints={[0, 2.9, 3.4, 4.2, 5.1]}
        popupOpen={true}
        titleQ={"Listen and read along."}
        audioArr={imageSounds}
        captions={captions}
      />
    </>
  );
};

export default Unit5_Page1_Read;
