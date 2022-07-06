import React from "react";

const CanvasMenu = ({ setLineColor, lineWidth, setLineWidth, clearCanvas }) => {
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="30"
        value={lineWidth}
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />

      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
};

export default CanvasMenu;
