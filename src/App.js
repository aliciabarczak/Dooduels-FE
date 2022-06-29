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

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers(setUsers)
  });

  return (
    <userContext.Provider value={{ loggedUser, setLoggedUser, users }}>
      <div className={showPopUp || loggedUser === "" ? "blackOutApp" : "App"}>
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Homepage showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
              }
            />
            <Route path="/users/:user_id" element={<UserPage />} />
            <Route path="/rooms/*" element={<Roompage />} />
            <Route path="/profile_pic" element={<ProfilePic />} />
          </Routes>
        </main>
      </div>
    </userContext.Provider>
  );
}

export default App;
