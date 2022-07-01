import "./../../Styling/Roompage.css";

export default function Playerboard({ roompageRoom }) {
  return (
    <>
      <div className="playerboard">
        {roompageRoom.players.map((player, index) => {
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
