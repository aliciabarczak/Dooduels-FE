import { useContext, useState } from "react";
import userContext from "../../contexts/userContext.js";
import "./../../Styling/Roompage.css";
export default function LogInPopUpBox() {
  const { loggedUser, setLoggedUser } = useContext(userContext);
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedUser({
      user_id: 1,
      username: input,
      status: "online",
      user_description: "",
      profile_pic:
        "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png",
      points: 0,
      friends: [
        {username: "Phil", profile_pic: "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png"},
        {username: "Alicia", profile_pic: "https://i.pinimg.com/originals/fd/14/a4/fd14a484f8e558209f0c2a94bc36b855.png"}
      ]
  });
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
