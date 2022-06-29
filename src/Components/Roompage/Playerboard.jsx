import "./../../Styling/Roompage.css";

export default function Playerboard() {
  const examplePlayers = [
    {
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
      description: "A cool lass",
      friends: [[Object], [Object], [Object]],
      password: "password123",
      points: 450,
      status: "offline",
      user_name: "jessjelly",
      user_id: "-N5_Z_EYyZBrivsr1pdL",
    },
  ];

  // const players = [];
  //   exampleResponse.players.map((username) => {
  //     getUserByUsername(username, setPlayer)
  //     players.push(player)
  // })}
  return (
    <>
      <div className="playersBoard">
        <div className="playerInfo">
          {examplePlayers.map((player) => {
            return (
              <>
                <img src={player.avatar_url} className="profile-pic" />
                <b>{player.user_name}</b>
                <p>points: {player.points}</p>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
