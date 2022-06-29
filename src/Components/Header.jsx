import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../contexts/userContext";

const Header = ({}) => {
  const location = useLocation();
  const { loggedUser } = useContext(userContext);

    if (location.pathname === "/login" || location.pathname === `/users/${loggedUser.user_id}`) {
        return <header className="header">
            <h1>Dooduels</h1>
        </header>
    }

    if (!loggedUser) {
        return <header className="header">
        <h1>Dooduels</h1>
      </header>
  }

  if (!loggedUser) {
    return (
      <header className="header">
        <h1>Dooduels</h1>
        <Link to={`/users/${loggedUser.user_id}`}>
            <div className="home-user">
                <img className="home-profile-pic" src={loggedUser.profile_pic} alt="example"/>
                <p className="home-username">{loggedUser.username}</p>
            </div>
        </Link>
    </header>
  );
};

export default Header
