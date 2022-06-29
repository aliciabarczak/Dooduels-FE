import { useContext, useState } from "react";
import userContext from "../../contexts/userContext.js";
<<<<<<< HEAD
import "./../../Styling/Roompage.css";
=======
import { getAllUsers } from "../../db/utils.js";
>>>>>>> d983880 (edit handleSubmit Loginbox)
export default function LogInPopUpBox() {
  const { loggedUser, setLoggedUser } = useContext(userContext);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([])
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getAllUsers(setUsers)
    console.log(users)
  };

  return (
    <div className="LogInBox">
      <h2>Please log in</h2>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <label className="login-label">Enter your username:</label>
          <input
            className="username-input"
            type="text"
            onChange={handleChange}
          />
          <button type="submit" className="login-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
