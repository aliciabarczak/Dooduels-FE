import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../../contexts/userContext";
import { AiFillEdit } from "react-icons/ai"

const MyUserPage = () => {
    const { loggedUser } = useContext(userContext);
    const [defaultDescription, setDefaultDescription] = useState("A brief description of yourself shown on your profile.");

    const handleClick = () => {
        
    }

    if (!loggedUser) {
        return (
            <div className="form">
                <p>You logged out!</p>
                <Link to={`/`} className="back-button">Back</Link>
            </div>
        )
    }

    if (loggedUser.user_description) {
        setDefaultDescription(loggedUser.description);
    }

    if (!loggedUser.friends) {
        return (
            <div className="user-page">
                <Link to={`/profile_pic`}>
                    <img src={loggedUser.avatar_url} alt="user profile pic" className="user-profile-pic"/>
                </Link>
                <section className="user-main-section">
                    <p className="user-username">{loggedUser.user_name}</p>
                </section>
                <section className="user-description">
                    <p>{defaultDescription}</p>
                    <button onClick={handleClick} className="edit-description-button"><AiFillEdit className="edit-description-icon"/></button>
                </section>
                <p className="user-points">Points {loggedUser.points}</p>
                <section className="user-friend-section">
                    <p className="user-friend-title">Friends</p>
                    <p>This user does not have any friends yet!</p>
                </section>
                <Link className="back-button" to={`/`}>Back</Link>
            </div>
        );
    };

    return (
        <div className="user-page">
            <Link to={`/profile_pic`}>
                <img src={loggedUser.avatar_url} alt="user profile pic" className="user-profile-pic"/>
            </Link>
            <section className="user-main-section">
                <p className="user-username">{loggedUser.user_name}</p>
            </section>
            <p className="user-description">{defaultDescription}</p>
            <p className="user-points">Points {loggedUser.points}</p>
            <section className="user-friend-section">
                <p className="user-friend-title">Friends</p>
                {loggedUser.friends.map((friend) => {
                    return (
                        <article className="user-friend-article">
                            <li className="leaderboard-list">
                                <img className="home-profile-pic" src={friend.avatar_url} alt="friend profile pic"/>
                                <p className="user-friend-username">{friend.user_name}</p>
                            </li>
                        </article>
                    )
                })}
            </section>
            <Link className="back-button" to={`/`}>Back</Link>
        </div>
    )
};

export default MyUserPage;