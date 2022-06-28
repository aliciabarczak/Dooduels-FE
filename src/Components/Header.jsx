import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import userContext from "../contexts/userContext";

const Header = () => {
  const location = useLocation();
  const { loggedUser } = useContext(userContext);

  if (location.pathname === "/login") {
    return (
      <header className="header">
        <h1>Dooduels</h1>
      </header>
    );
  }

  if (!loggedUser) {
    return (
      <header className="header">
        <h1>Dooduels</h1>
        <Link to={`/login`} key="login" className="login-button">
          Login
        </Link>
      </header>
    );
  }

  return (
    <header className="header">
      <h1>Dooduels</h1>
      <div className="home-user">
        <img
          className="home-profile-pic"
          src={
            "https://efeverde.com/wp-content/uploads/2022/01/ARCHIVO-foca-monje-EFEverde.jpg"
          }
          alt="example"
        />
        <p className="home-username">{loggedUser}</p>
      </div>
    </header>
  );
};

export default Header;
