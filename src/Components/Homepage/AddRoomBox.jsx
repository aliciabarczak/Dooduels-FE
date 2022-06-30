import "./../../Styling/Homepage.css";
import { AiOutlineClose } from "react-icons/ai";
import { useContext, useState } from "react";
import userContext from "../../contexts/userContext";
import { addRoom } from "./../../db/utils.js";

export default function AddRoomBox({ showPopUp, setShowPopUp }) {
  const { loggedUser } = useContext(userContext);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomMode, setNewRoomMode] = useState("Easy");

  const handleSubmit = () => {
    addRoom(loggedUser, newRoomName, newRoomMode);
  };
  console.log(loggedUser, newRoomName, newRoomMode);

  return (
    <div className="AddRoomBox">
      <h2>Add Room</h2>
      <form className="dropdown" onSubmit={handleSubmit}>
        <label>Select Mode:</label>
        <select
          className="dropDownMenu"
          value={newRoomMode}
          onChange={(event) => {
            setNewRoomMode(event.target.value);
          }}>
          <option value="Easy">Easy</option>
          <option value="Medium"> Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <div className="RoomName">
          <label> Room name</label>
          <input
            type="text"
            className="roomNameInput"
            placeholder="Room Name"
            value={newRoomName}
            onChange={(event) => {
              setNewRoomName(event.target.value);
            }}
          />
        </div>
        <AiOutlineClose
          className="closeButton"
          onClick={() => {
            setShowPopUp(false);
          }}
        />
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}
