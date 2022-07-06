import "./../Styling/Roompage.css";
import { useContext, useState, useEffect } from "react";
import userContext from "../contexts/userContext.js";
import LogInPopUpBox from "./Homepage/LogInPopUpBox";
import { useLocation, Link } from "react-router-dom";
import { getRoomById, addPlayerToRoom } from "../db/utils.js";
import Playerboard from "./Roompage/Playerboard";
import Chat from "./Chatrooms/Chat";
import { get, onValue, ref, set } from "firebase/database";
import db from "../db/db";

// import BottomBorder from "../Components/Homepage/BottomBorder.jsx";

const Roompage = () => {
  const { loggedUser } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const roomID = location.pathname.split("/")[2];
  const [roompageRoom, setRoompageRoom] = useState({});
  const [readyButton, setReadyButton] = useState("Start");
  const [playerList, setPlayerList] = useState({});
  const playersRef = ref(db, `rooms/${roomID}/players`);

  useEffect(() => {
    getRoomById(roomID).then((room) => {
      setRoompageRoom(room);
      window.localStorage.setItem("lastRoomId", roomID);
      setIsLoading(false);

      get(playersRef).then((snapshot) => {
        const players = snapshot.val();
        setPlayerList(players);
      });

      if (loggedUser && loggedUser.user_id !== room.host.user_id) {
        addPlayerToRoom(loggedUser, roomID);
      }
    });
  }, []);

  useEffect(() => {
    onValue(playersRef, (snapshot) => {
      setPlayerList(snapshot.val());
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      {!Object.keys(loggedUser).length ? <LogInPopUpBox /> : null}
      <div className="Roompage">
        <h1 className="roomTitle">{roompageRoom.room_name}</h1>
        <p className="modeRoompage">mode: {roompageRoom.mode}</p>

        {/* {loggedUser.user_id === roompageRoom.host.user_id ? ( */}
        <div className="RoomPageButtons">
          <Link to={`/games/${roomID}`}>
            <button className="ready-button">Start</button>
          </Link>
          <Link to="/">
            <button className="exit-button">Exit</button>
          </Link>
        </div>
        {/* ) : (
          <div className="RoomPageButtons">
            <button className="waitForHost-button">Waiting for host...</button>
            <Link to="/">
              <button className="exit-button">Exit</button>
            </Link>{" "}
          </div>
        )} */}

        {Object.keys(roompageRoom).length ? (
          <Playerboard roompageRoom={roompageRoom} playerList={playerList} />
        ) : null}
        <h2>Chat</h2>
        <div className="chat">
          <Chat roomID={roomID} />
        </div>
      </div>
      {/* <BottomBorder /> */}
    </section>
  );
};

export default Roompage;
