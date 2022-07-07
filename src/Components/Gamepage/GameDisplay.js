import { useState } from "react";
import "../../Styling/Game-page.css";
export default function GameDisplay({ roomHost, playersRoom, hostPoints }) {
  const playersArray = [];
  for (let player in playersRoom) {
    playersArray.push(playersRoom[player]);
  }

  return roomHost && playersRoom ? (
    <div id="game-display-container">
      <div id="host">
        <p id="display--name--host">{roomHost.user_name}</p>
        <p id="display--points">{hostPoints}</p>
      </div>

      <div id="players">
        {playersArray.map((player) => {
          return (
            <li key={player.user_id}>
              <p id="display--name--players">{player.user_name}</p>
              <p id="display--points">{player.points}</p>
            </li>
          );
        })}
      </div>
    </div>
  ) : null;
}
