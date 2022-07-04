import "./../Styling/Roompage.css";
import { useContext, useState, useEffect } from "react";
import userContext from "../contexts/userContext.js";
import LogInPopUpBox from "./Homepage/LogInPopUpBox";
import { useLocation, Link } from "react-router-dom";
import { getRoomById, addPlayerToRoom } from "../db/utils.js";
import Playerboard from "./Roompage/Playerboard";
import Chat from "./Chatrooms/Chat";

const Roompage = () => {
  const { loggedUser } = useContext(userContext);

  const location = useLocation();
  const roomID = location.pathname.split("/")[2];
  const [roompageRoom, setRoompageRoom] = useState({});
  useEffect(() => {
    getRoomById(roomID, setRoompageRoom);
    if (loggedUser) {
      addPlayerToRoom(loggedUser, roomID);
    }
  }, []);

  return (
    <section>
      {!loggedUser ? <LogInPopUpBox /> : null}
      <div className="Roompage">
        <h1 className="roomTitle">{roompageRoom.room_name}</h1>
        <p className="modeRoompage">mode: {roompageRoom.mode}</p>
        <div className="RoomPageButtons">
          <Link to={`/games/${roomID}`}>
            <button className="ready-button">Start</button>
          </Link>
          <button className="exit-button">
            <Link to="/"> Exit</Link>
          </button>
        </div>
        <h2>Players</h2>
        {Object.keys(roompageRoom).length ? (
          <Playerboard roompageRoom={roompageRoom} />
        ) : null}
        <h2>Chat</h2>
        <div className="chat">
          <Chat />
        </div>
      </div>
    </section>
  );
};

export default Roompage;
