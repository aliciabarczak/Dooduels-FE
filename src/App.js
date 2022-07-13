import "./Styling/App.css";
import Header from "./Components/Header.jsx";
import Roompage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage.jsx";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import userContext from "./contexts/userContext.js";
import Homepage from "./Components/Homepage.jsx";
import ProfilePic from "./Components/UserPage/ProfilePic.jsx";
import { getAllUsers } from "./db/utils.js";
import Gamepage from "./Components/Gamepage/Gamepage.js";
import LogInPopUpBox from "./Components/Homepage/LogInPopUpBox.jsx";
import AddRoomBox from "./Components/Homepage/AddRoomBox.jsx";
import ARGamepage from "./Components/Gamepage/ARGamepage.js";

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
    description: "A cool lass",
    friends: [[Object], [Object], [Object]],
    password: "password123",
    points: 450,
    status: "offline",
    user_name: "Demo",
    user_id: "-N5_Z_EYyZBrivsr1pdL",
  });
  const [lastRoomId, setLastRoomId] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <userContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        users,
        showPopUp,
        setShowPopUp,
        lastRoomId,
        setLastRoomId,
      }}>
      {showPopUp ? (
        <AddRoomBox showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      ) : null}
      {!loggedUser ? <LogInPopUpBox /> : null}
      <div className={showPopUp || loggedUser === "" ? "blackOutApp" : "App"}>
        <>
          <Header showPopUp={showPopUp} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <Homepage showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
                }
              />
              <Route path="/users/:user_id" element={<UserPage />} />
              <Route path="/rooms/:room_id" element={<Roompage />} />
              <Route path="/profile_pic" element={<ProfilePic />} />
              <Route path="/games/:room_id" element={<Gamepage />} />
              <Route path="/games/ar/:room_id" element={<ARGamepage />} />
            </Routes>
          </main>{" "}
        </>
      </div>
    </userContext.Provider>
  );
}

export default App;
