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
          className="addButton">
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
      {showPopUp ? (
        <AddRoomBox showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      ) : null}
    </>
  );
};

export default Options;
