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
            <img src={loggedUser.profile_pic} alt="user profile pic" className="user-profile-pic"/>
            <section className="user-main-section">
                <p className="user-username">{loggedUser.username}</p>
                <p className="user-status">{loggedUser.status}</p>
            </section>
            <p className="user-description">{defaultDescription}</p>
            <p className="user-points">Points {loggedUser.points}</p>
            <section className="user-friend-section">
                {loggedUser.friends.map((friend) => {
                    return (
                        <article className="user-friend-article">
                            <li className="user-friend-list">
                                <img className="user-friend-profile-pic" src={friend.profile_pic} alt="friend profile pic"/>
                                <p className="user-friend-username">{friend.username}</p>
                            </li>
                        </article>
                    )
                })}
            </section>
            <Link to={`/`}>Back</Link>
        </div>
    )
};

export default UserPage;