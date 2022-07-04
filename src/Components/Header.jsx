import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../contexts/userContext";
import "../Styling/HeaderAnimation.css";
import HeaderAnimation from "./../Components/UserPage/HeaderAnimation.jsx";
import { updateUserStatus } from "../db/utils";

const Header = () => {
  const location = useLocation();
  const { loggedUser, setLoggedUser } = useContext(userContext);

  const handleClick = () => {
    updateUserStatus(loggedUser.user_id, "Offline");
    setLoggedUser("");
    window.localStorage.setItem("loggedUser", JSON.stringify(""))
  }

  if (location.pathname === `/users/${loggedUser.user_id}`) {
    return (
      <header className="header">
        <HeaderAnimation />
        <button onClick={handleClick} className="button">
          Logout
        </button>
      </header>
    );
  }

  if (!loggedUser) {
    return (
      <header className="header">
        <HeaderAnimation />
      </header>
    );
  }

  return (
    <header className="header">
      <HeaderAnimation />
      <Link to={`/users/${loggedUser.user_id}`}>
        <div className="home-user">
          <img
            className="home-profile-pic"
            src={loggedUser.avatar_url}
            alt="example"
          />
          <p className="home-username">{loggedUser.user_name}</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
