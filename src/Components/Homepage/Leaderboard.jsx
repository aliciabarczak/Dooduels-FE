import { useState } from "react";

const LeaderBoard = () => {
  const [users, setUsers] = useState([
    {
      user_id: 1,
      username: "Doodoo",
      status: "online",
      user_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.",
      profile_pic:
        "https://efeverde.com/wp-content/uploads/2022/01/ARCHIVO-foca-monje-EFEverde.jpg",
      points: 1000,
      friends: [
        {
          username: "Phil",
          profile_pic:
            "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png",
        },
        {
          username: "Alicia",
          profile_pic:
            "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png",
        },
      ],
    },
    {
      user_id: 2,
      username: "Phil",
      status: "online",
      user_description: "",
      profile_pic:
        "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png",
      points: 0,
      friends: [],
    },
    {
      user_id: 3,
      username: "Alicia",
      status: "offline",
      user_description: "",
      profile_pic:
        "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png",
      points: 0,
      friends: [],
    },
    {
      user_id: 4,
      username: "Lewis",
      status: "offline",
      user_description: "",
      profile_pic:
        "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png",
      points: 0,
      friends: [],
    },
  ]);

  return (
    <>
      <h2>Leaderboard</h2>
      <section className="leaderboard">
        {users.map((user) => {
          return (
            <article className="leaderboard-user" key={user.user_id}>
              <li className="leaderboard-list">
                <img
                  className="home-profile-pic"
                  src={user.profile_pic}
                  alt="user profile pic"
                />
                <div className="userInfo">
                  <b>{user.username}</b>
                  <p className="points">points: {user.points}</p>
                </div>
              </li>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default LeaderBoard;
