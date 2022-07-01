import "./../Styling/Roompage.css";
import { useContext, useState, useEffect } from "react";
import userContext from "../contexts/userContext.js";
import LogInPopUpBox from "./Homepage/LogInPopUpBox";
import { useLocation, Link } from "react-router-dom";
import { getRoomById, getUserbyUsername, addPlayerToRoom } from "../db/utils";
import Playerboard from "./Roompage/Playerboard";

const Roompage = () => {
  const { loggedUser } = useContext(userContext);
  const location = useLocation();
  const roomID = location.pathname.split("/")[2];
  const [roompageRoom, setRoompageRoom] = useState({});
  useEffect(() => {
    getRoomById(roomID, setRoompageRoom);
  }, [roomID]);

  return (
    <section>
      {!loggedUser ? <LogInPopUpBox /> : null}
      <div className="Roompage">
        <h1 className="roomTitle">{roompageRoom.room_name}</h1>
        <p className="modeRoompage">mode: {roompageRoom.mode}</p>
        <div className="RoomPageButtons">
          {loggedUser === roompageRoom.host ? (
            <button className="ready-button">Start Game!</button>
          ) : (
            <button className="ready-button">Ready!</button>
          )}
          <button className="exit-button">
            <Link to="/"> Exit</Link>
          </button>
        </div>
        <h2>Players</h2>
        <Playerboard roompageRoom={roompageRoom} />
        <h2>Chat</h2>
        <div className="chat"></div>
      </div>
    </section>
  );
};

export default Roompage;
