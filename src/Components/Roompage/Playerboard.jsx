import "./../../Styling/Roompage.css";
import { useContext, useState, useEffect } from "react";
import userContext from "../../contexts/userContext.js";
import { addPlayerToRoom } from "../../db/utils";

export default function Playerboard({ roompageRoom }) {
  const { loggedUser } = useContext(userContext);
  const [players, setPlayers] = useState([]);

  console.log(roompageRoom);

  return (
    <>
      <div className="playerboard">
        {loggedUser
          ? roompageRoom.players.map((player, index) => {
              return (
                <div className="playerInfo" key={index}>
                  {/* <img src={player.avatar_url} className="profile-pic" /> */}
                  <b>{player}</b>
                  {/* <p>points: {player.points}</p> */}
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
