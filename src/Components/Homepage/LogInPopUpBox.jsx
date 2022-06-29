import { useContext, useState } from "react";
import userContext from "../../contexts/userContext.js";
import "./../../Styling/Roompage.css";
import { getAllUsers } from "../../db/utils.js";

export default function LogInPopUpBox() {
  const { loggedUser, setLoggedUser } = useContext(userContext);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(false)

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getAllUsers(setUsers)
    users.map((user) => {
      if (user.user_name === input) {
        setMessage(false)
        setLoggedUser(user);
      } else {
        setMessage(true)
      }
    })
  };

  if (message) {
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
            <p className="error-message">We couldn't find a user with that name. Please try again.</p>
            <button type="submit" className="login-submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

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
