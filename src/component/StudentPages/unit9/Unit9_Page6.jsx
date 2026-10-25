import React from "react";
import page_6 from "../../../assets/imgs/pages/classbook/Right 3 Unit 9 Where Dad Folder/Page 81.png";
import "./Unit9_Page6.css";
import arrowBtn from "../../../assets/Page 01/Arrow.svg";

const Unit9_Page6 = ({ openPopup }) => {
  return (
    <div
      className="page1-img-wrapper"
      style={{ backgroundImage: `url(${page_6})` }}
    >
      <div
        className="hover:scale-110 transition"
        style={{
          position: "absolute",
          padding: "5px",
          top: "3.5%",
          left: "53.5%",
          cursor: "pointer",
          overflow: "visible",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 87 })}
          style={{ overflow: "visible", cursor: "pointer" }}
          role="button"
          tabIndex={0}
          aria-label="Open exercise D"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup("exercise", { startIndex: 87 });
            }
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

      <div
        className="hover:scale-110 transition"
        style={{
          position: "absolute",
          padding: "5px",
          top: "48.5%",
          left: "40.2%",
          cursor: "pointer",
          overflow: "visible",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 90 90"
          onClick={() => openPopup("exercise", { startIndex: 88 })}
          style={{ overflow: "visible", cursor: "pointer" }}
          role="button"
          tabIndex={0}
          aria-label="Open exercise E"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup("exercise", { startIndex: 88 });
            }
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

export default Unit9_Page6;
