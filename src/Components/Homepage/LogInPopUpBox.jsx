import { useContext, useEffect, useState } from "react";
import userContext from "../../contexts/userContext.js";
import "./../../Styling/Roompage.css";

export default function LogInPopUpBox() {
  const { loggedUser, setLoggedUser } = useContext(userContext);
  const { users } = useContext(userContext);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("loggedUser");
    setLoggedUser(JSON.parse(data));
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    users.map((user) => {
      if (user.user_name === input) {
        setMessage(false)
        setLoggedUser(user)
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
      } else {
        setMessage(true)
      }
    })
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
          {message ? (
            <p className="error-message">We couldn't find a user with that name. Please try again.</p>
          ) : null}
          <button type="submit" className="login-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
