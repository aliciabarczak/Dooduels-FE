import { useContext, useEffect } from "react";
import userContext from "../../contexts/userContext";

const LeaderBoard = () => {
  const { users } = useContext(userContext)

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
                  src={user.avatar_url}
                  alt="user profile pic"
                />
                <div className="userInfo">
                  <b>{user.user_name}</b>
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
