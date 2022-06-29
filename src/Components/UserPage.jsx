import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../contexts/userContext";

const UserPage = () => {
    const { loggedUser } = useContext(userContext);
    const [defaultDescription, setDefaultDescription] = useState("A brief description of yourself shown on your profile.");

    if (!loggedUser) {
        return (
            <div className="form">
                <p>You logged out!</p>
                <Link to={`/`} className="back-button">Back</Link>
            </div>
        )
    }

    if (loggedUser.user_description) {
        setDefaultDescription(loggedUser.user_description);
    }

    return (
        <div className="user-page">
            <Link to={`/profile_pic`}>
                <img src={loggedUser.profile_pic} alt="user profile pic" className="user-profile-pic"/>
            </Link>
            <section className="user-main-section">
                <p className="user-username">{loggedUser.username}</p>
                <p className="user-status">{loggedUser.status}</p>
            </section>
            <p className="user-description">{defaultDescription}</p>
            <p className="user-points">Points {loggedUser.points}</p>
            <section className="user-friend-section">
                <p className="user-friend-title">Friends</p>
                {loggedUser.friends.map((friend) => {
                    return (
                        <article className="user-friend-article">
                            <li className="leaderboard-list">
                                <img className="home-profile-pic" src={friend.profile_pic} alt="friend profile pic"/>
                                <p className="user-friend-username">{friend.username}</p>
                            </li>
                        </article>
                    )
                })}
            </section>
            <Link className="back-button" to={`/`}>Back</Link>
        </div>
    )
};

export default UserPage;