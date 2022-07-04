import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import userContext from "../../contexts/userContext";

const LeaderBoard = () => {
  const { users } = useContext(userContext);

  return (
    <>
      <h2 className="leaderboardHeader">Leaderboard</h2>
      <section className="leaderboard">
        {users.map((user, index) => {
          return (
            <Link
              to={`/users/${user.user_id}`}
              className="leaderboard-user"
              key={index}>
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
            </Link>
          );
        })}
      </section>
    </>
  );
};

export default LeaderBoard;
