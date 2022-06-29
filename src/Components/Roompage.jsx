import "./../Styling/Roompage.css";
import { useContext } from "react";
import userContext from "../contexts/userContext";
import LogInPopUpBox from "./Homepage/LogInPopUpBox";

const Roompage = () => {
  const { loggedUser } = useContext(userContext);

  return (
    <section>
      <div className="Roompage">
        <h1>Room Name</h1>
        <div className="RoomPageButtons">
          <button className="ready-button"> Ready</button>
          <button className="exit-button">Exit</button>
        </div>
        <h2>Players</h2>
        <div className="playersBoard"></div>
        <div className="chat"></div>
        {!loggedUser ? <LogInPopUpBox id="LogBx" /> : null}
      </div>
    </section>
  );
};

export default Roompage;
