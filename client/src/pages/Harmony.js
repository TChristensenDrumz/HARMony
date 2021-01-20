import React from "react";
import Canvas from "../Canvas3";

export default function Harmony() {
  const bodyStyle = {
    height: "80vh",
    width: "100vw",
  };
  return (
    <div className="text-center" style={bodyStyle}>
      <Canvas />
    </div>
  );
}
