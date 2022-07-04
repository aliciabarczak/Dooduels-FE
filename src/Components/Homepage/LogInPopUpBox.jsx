import { useContext, useEffect, useState } from "react";
import userContext from "../../contexts/userContext.js";
import { addUser, updateUserStatus } from "../../db/utils.js";
import "./../../Styling/Roompage.css";

export default function LogInPopUpBox() {
  const { loggedUser, setLoggedUser } = useContext(userContext);
  const { users } = useContext(userContext);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(false);
  const [message2, setMessage2] = useState(true);
  const [message3, setMessage3] = useState(false);
  const [message4, setMessage4] = useState(false);
  const [signUp, setSignUp ] = useState(false);
  const regex = /\W/g

  useEffect(() => {
    const data = window.localStorage.getItem("loggedUser");
    setLoggedUser(JSON.parse(data));
  }, []);

  const handleSignUp = () => {
    setMessage3(false);
    setMessage2(false);
    setSignUp(true);
  };

  const handleBack = () => {
    setMessage(false);
    setMessage4(false);
    setSignUp(false);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleLogInSubmit = (event) => {
    event.preventDefault();
    users.map((user) => {
      if (user.user_name === input) {
        setMessage(false);
        updateUserStatus(user.user_id, "Online");
        setLoggedUser(user);
        window.localStorage.setItem("loggedUser", JSON.stringify(user));
      } else {
        setMessage(true)
      }
    })
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    setMessage2(false);
    users.map((user) => {
      if (user.user_name === input) {
        setMessage3(false);
        setMessage2(true);
      }
    });
    if(!message2 && input.length !== 0 && !regex.test(input)) {
      addUser({
        user_name: input,
        avatar_url: "https://i.pinimg.com/originals/99/a8/3e/99a83e22b4c160d36e1697b4139c803f.jpg",
        password: "password123",
        points: 0
      });
      setMessage3(false);
      setMessage4(true);
      setSignUp(false);
    } 
    if (regex.test(input)) {
      console.log("Ehllo")
      setMessage3(true);
    };
  };
  
  return (
    <div className="LogInBox">
      {signUp ? (
        <div>
          <h2>Please sign up</h2>
          <form onSubmit={handleSignUpSubmit} className="form">
            <label className="login-label">Enter your username:</label>
            <input
              className="username-input"
              type="text"
              onChange={handleChange}
            />
            {message2 ? (
              <p className="error-message">This username is already in use.</p>
            ) : null}
            {message3 ? (
              <p className="error-message">Please, type a valid username.</p>
            ) : null}
            <div className="login-buttons">
            <button type="button" onClick={handleBack} className="login-submit-button">
              Back 
              </button>
              <button type="submit" className="login-submit-button">
              Submit
              </button>
            </div>
          </form>
        </div>
      ) : 
        <div>
          <h2>Please log in</h2>
          <form onSubmit={handleLogInSubmit} className="form">
            <label className="login-label">Enter your username:</label>
            <input
              className="username-input"
              type="text"
              onChange={handleChange}
            />
            {message ? (
              <p className="error-message">We couldn't find a user with that name. Please try again.</p>
            ) : null}
            {message4 ? (
              <p className="error-message">You created a new user succesfully. Please, log in.</p>
            ) : null}
            <div className="login-buttons">
            <button type="button" onClick={handleSignUp} className="login-submit-button">
              Sign Up 
              </button>
              <button type="submit" className="login-submit-button">
              Submit
              </button>
            </div>
          </form>
        </div>}
    </div>
  );
}
