import "./../../Styling/Roompage.css";
import { useContext, useState } from "react";
import userContext from "../../contexts/userContext.js";
export default function Playerboard({ roompageRoom }) {
  const { loggedUser } = useContext(userContext);
  const [players, setPlayers] = useState([]);

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
