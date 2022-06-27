import "./../Homepage.css";
import { useState } from "react";
import AddRoomBox from "./AddRoomBox";

const Options = ({ showPopUp, setShowPopUp }) => {
  return (
    <>
      <div className="Homepage-Options">
        <p
          onClick={() => {
            setShowPopUp(true);
          }}
          className="button">
          Add Room
        </p>
        <form className="searchRoom">
          <label>
            <input
              type="text"
              placeholder="Search room..."
              className={showPopUp ? "blackInput" : null}
            />
          </label>
        </form>
      </div>
      {showPopUp ? <AddRoomBox /> : null}
    </>
  );
};

export default Options;
