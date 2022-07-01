import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../../contexts/userContext";
import { AiFillEdit } from "react-icons/ai"
import EditDescriptionBox from "./EditDescriptionBox";

const MyUserPage = () => {
    const { loggedUser } = useContext(userContext);
    const [ descriptionBox, setDescriptionBox ] = useState(false)

    const handleClick = () => {
        setDescriptionBox(true)
    }
    
    return (
        <div>
            {loggedUser ? (
            <div className="user-page">
            <Link to={`/profile_pic`}>
                <img src={loggedUser.avatar_url} alt="user profile pic" className="user-profile-pic"/>
            </Link>
            <section className="user-main-section">
                <p className="user-username">{loggedUser.user_name}</p>
            </section>
            <section className="user-description">
                {loggedUser.description ? (
                    <p>{loggedUser.description}</p>
                ): <p>A brief description of yourself shown on your profile.</p>}
                <button onClick={handleClick} className="edit-description-button"><AiFillEdit className="edit-description-icon"/></button>
            </section>
            <p className="user-points">Points {loggedUser.points}</p>
            <section className="user-friend-section">
                <p className="user-friend-title">Friends</p>
                {loggedUser.friends ? (
                    loggedUser.friends.map((friend) => {
                        return (
                            <article className="user-friend-article">
                                <li className="leaderboard-list">
                                    <img className="home-profile-pic" src={friend.avatar_url} alt="friend profile pic"/>
                                    <p className="user-friend-username">{friend.user_name}</p>
                                </li>
                            </article>
                        )
                    })
                ): <p>This user does not have any friends yet!</p>}
            </section>
            <Link className="back-button" to={`/`}>Back</Link>
            </div>
        ): <div className="form">
            <p>You logged out!</p>
            <Link to={`/`} className="back-button">Back</Link>
            </div>
        }
        </div>
    )
};

export default MyUserPage;