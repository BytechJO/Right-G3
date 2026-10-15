import React , {useRef} from "react";
import page_4 from "../../../assets/imgs/pages/WB_Right_3/Right Int WB G3 U1 Folder/Page 4.png";
import "./WB_unit5.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const WB_Unit1_Page4 = ({ openPopup }) => {
  const audioRef = useRef(null);
  return (
    <div className="page1-img-wrapper"
            
              style={{ backgroundImage: `url(${page_4})` }}>
      {/* <img src={page_4} /> */}
     
      <div
        className="q3-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 2 })}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>


      <div
        className="q4-1 hover:scale-110 transition"
        style={{ overflow: "visible" }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 3 })}
          style={{ overflow: "visible" }}
        >
          <image className="svg-img"
            href={arrowBtn}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </svg>
      </div>

      <audio ref={audioRef} style={{ display: "none" }} />
    </div>
  );
};

export default WB_Unit1_Page4;
