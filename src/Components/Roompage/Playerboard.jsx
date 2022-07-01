import "./../../Styling/Roompage.css";
import { useContext, useState, useEffect } from "react";
import userContext from "../../contexts/userContext.js";
import { addPlayerToRoom } from "../../db/utils";

export default function Playerboard({ roompageRoom }) {
  const { loggedUser } = useContext(userContext);
  const [players, setPlayers] = useState([]);

  const addedPlayer = {
    user_name: loggedUser.user_name,
    points: loggedUser.points,
    avatar_url: loggedUser.avatar_url,
  };

  useEffect(() => {
    addPlayerToRoom(loggedUser, roompageRoom.room_id);
    if (loggedUser) {
      setPlayers(roompageRoom.players);
    }
  }, [loggedUser]);

  console.log(roompageRoom.players);

  return (
    <>
      <div className="playerboard">
        {players.map((player, index) => {
          return (
            <div className="playerInfo" key={index}>
              <img src={player.avatar_url} className="profile-pic" />
              <b>{player.user_name}</b>
              <p>points: {player.points}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
