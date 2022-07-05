import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../contexts/userContext";
import { getUserById } from "../db/utils";
import MyUserPage from "./UserPage/MyUserPage";
import LogInPopUpBox from "./Homepage/LogInPopUpBox";

const UserPage = () => {
  const { loggedUser } = useContext(userContext);
  const location = useLocation();
  const [currUserId, setCurrUserId] = useState("");
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    setCurrUserId(location.pathname.substring(7));
    getUserById(currUserId, setCurrUser);
  }, [currUser]);

  if (currUserId === loggedUser.user_id) {
    return <MyUserPage />;
  }

  return (
    <div className="user-page">
      {!loggedUser ? <LogInPopUpBox /> : null}
      <img
        src={currUser.avatar_url}
        alt="user profile pic"
        className="user-profile-pic"
      />
      <section className="user-main-section">
        <p className="user-username">{currUser.user_name}</p>
        <p className="user-points">Points {currUser.points}</p>
      </section>
      {currUser.description ? (
        <p className="user-description">{currUser.description}</p>
      ) : (
        <p className="user-description">
          This user does not have a description.
        </p>
      )}
      <p className="user-points">Friends</p>
      <section className="user-friend-section">
        {currUser.friends ? (
          currUser.friends.map((friend) => {
            return (
              <article className="user-friend-article">
                <li className="leaderboard-list">
                  <img
                    className="home-profile-pic"
                    src={friend.avatar_url}
                    alt="friend profile pic"
                  />
                  <p className="user-friend-username">{friend.user_name}</p>
                </li>
              </article>
            );
          })
        ) : (
          <p>This user does not have any friends yet!</p>
        )}
      </section>
      <Link className="back-button" to={`/`}>
        Back
      </Link>
    </div>
  );
};

export default UserPage;
