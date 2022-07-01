import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../contexts/userContext";
import { getUserById } from "../db/utils";
import MyUserPage from "./UserPage/MyUserPage";

const UserPage = () => {
    const { loggedUser } = useContext(userContext);
    const location = useLocation();
    const [ currUserId, setCurrUserId ] = useState("");
    const [ currUser, setCurrUser ] = useState({});
    const [defaultDescription, setDefaultDescription] = useState("A brief description of yourself shown on your profile.");

    useEffect(() => {
        setCurrUserId(location.pathname.substring(7));
        getUserById(currUserId, setCurrUser);
    }, [currUser]);

    if (currUserId === loggedUser.user_id) {
        return (
            <MyUserPage/>
        )
    }

    if (currUser.user_description) {
        setDefaultDescription(currUser.description);
    }

    if (!currUser.friends) {
        return (
            <div className="user-page">
                <img src={currUser.avatar_url} alt="user profile pic" className="user-profile-pic"/>
                <section className="user-main-section">
                    <p className="user-username">{currUser.user_name}</p>
                </section>
                <p className="user-description">{defaultDescription}</p>
                <p className="user-points">Points {currUser.points}</p>
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
            <img src={currUser.avatar_url} alt="user profile pic" className="user-profile-pic"/>
            <section className="user-main-section">
                <p className="user-username">{currUser.user_name}</p>
            </section>
            <p className="user-description">{defaultDescription}</p>
            <p className="user-points">Points {currUser.points}</p>
            <section className="user-friend-section">
                <p className="user-friend-title">Friends</p>
                {currUser.friends.map((friend) => {
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

export default UserPage;