import "./../../Styling/Roompage.css";

export default function Playerboard({ roompageRoom, playerList }) {
  return (
    <>
    <h2>Players</h2>
      <div className="playerboard">
      <div className="playerInfo" key={'host'}>
              <img src={roompageRoom.host.avatar_url} className="profile-pic" />
              <b style={{color: 'yellow'}}>{roompageRoom.host.user_name}</b>
              <p style={{color: 'yellow'}}>points: {roompageRoom.host.points}</p>
            </div>
        {roompageRoom.players.map((player, index) => {
          return (
            <div className="playerInfo" key={index}>
              <img src={player.avatar_url} className="profile-pic" />
              <b>{player.user_name}</b>
              <p>points: {player.points}</p>
            </div>
          );
        })};
      </div>
    </>
  );
}
