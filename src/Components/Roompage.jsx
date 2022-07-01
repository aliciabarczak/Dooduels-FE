import "./../Styling/Roompage.css";
import { useContext, useState, useEffect } from "react";
import userContext from "../contexts/userContext.js";
import LogInPopUpBox from "./Homepage/LogInPopUpBox";
import { useLocation, Link } from "react-router-dom";
import { getRoomById, getUserbyUsername, addPlayerToRoom } from "../db/utils";
import Playerboard from "./Roompage/Playerboard";
import Chat from "./Chatrooms/Chat";
import { goOffline } from "firebase/database";
import db from "../db/db";

const Roompage = () => {
  const { loggedUser } = useContext(userContext);
  const location = useLocation();
  const roomID = location.pathname.split("/")[2];
  const [roompageRoom, setRoompageRoom] = useState({});
  useEffect(() => {
    getRoomById(roomID, setRoompageRoom);
  }, []);

  console.log(setRoompageRoom);

  // roompageRoom.players.map((player) => {
  //   getUserKeyByUsername(
  //     player,
  //     setPlayers((currPlayers) => {
  //       return [player, ...currPlayers];
  //     })
  //   );
  // });

  const exampleResponse = {
    full: false,
    host: "tomtickle",
    messages: {
      "-N5iVlC-p5xgUItrAMGV": "Hi mum, i'm on TV",
      "-N5iVo0GHu537d7YNEDg": "hello world",
      "-N5iVsWCXjTPWzay13ha": "howdy",
      "-N5iVzxwc9rGrq0LZHNf": "bananas in pjamas",
    },
    mode: "'easy'",
    players: ["jessjelly", "sparkles", "sparkles"],
    room_name: "Room 1",
    room_id: "1",
  };

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
