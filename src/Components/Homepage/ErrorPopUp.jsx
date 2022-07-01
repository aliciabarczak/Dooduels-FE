import "./../../Styling/Roompage.css";
import { Link } from "react-router-dom";

export default function ErrorPopUp({ setCannotDelete }) {
  return (
    <div className="LogInBox">
      <h2>You cannot delete a room which has players inside of it</h2>
      <button className="button" onClick={() => setCannotDelete(false)}>
        <Link to={`/`}>OK</Link>
      </button>
    </div>
  );
}
