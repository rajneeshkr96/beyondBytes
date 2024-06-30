import React from "react";

const Loading = ({ background }: { background?: string }) => {
  return (
    <div>
      <div className={`fixed flex   justify-center   items-center z-50 h-screen w-screen top-0 right-0  ${background ? background : "bg-white"}`}>
        <div className="corners">
          <div className="corner corner--1"></div>
          <div className="corner corner--2"></div>
          <div className="corner corner--3"></div>
          <div className="corner corner--4"></div>
        </div>
      </div>

    </div>
  );
};

export default Loading;
