import "./../../Styling/Homepage.css";
import AddRoomBox from "./AddRoomBox";
import { useContext } from "react";
import userContext from "../../contexts/userContext.js";

const Options = ({ showPopUp, setShowPopUp, searchTerm, setSearchTerm }) => {
  const { loggedUser } = useContext(userContext);
  return (
    <>
      <div className="Homepage-Options">
        <button
          onClick={() => {
            setShowPopUp(true);
          }}
          className="addButton">
          <span>Add Room</span>
        </button>
        <form className="searchRoom">
          <label>
            <input
              type="text"
              placeholder="Search room..."
              className={
                showPopUp || loggedUser === "" ? "blackInput" : "searchBox"
              }
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </form>
      </div>
      {showPopUp ? (
        <AddRoomBox showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      ) : null}
    </>
  );
};

export default Options;
