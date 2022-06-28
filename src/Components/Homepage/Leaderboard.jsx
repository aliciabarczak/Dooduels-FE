import { useState } from "react";

const LeaderBoard = () => {
    const [users, setUsers] = useState([
        {username: "Doodoo", profilePic: "https://efeverde.com/wp-content/uploads/2022/01/ARCHIVO-foca-monje-EFEverde.jpg", points: 1000},
        {username: "Phil", profilePic: "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png", points: 2},
        {username: "Lewis", profilePic: "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png", points: 2},
        {username: "Alicia", profilePic: "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png", points: 2}
    ]);

    return (
        <main>
            <section className="leaderboard">
                {users.map((user) => {
                    return (
                        <article className="leaderboard-user">
                            <li className="leaderboard-list">
                                <img className="home-profile-pic" src={user.profilePic}/>
                                <p>{user.username}</p>
                                <p>points: {user.points}</p>
                            </li>
                        </article>
                    )
                })}
            </section>
        </main>
    )
};

export default LeaderBoard;