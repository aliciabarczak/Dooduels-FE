import "./Styling/App.css";
import Header from "./Components/Header.jsx";
import RoomPage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router";
import userContext from "./contexts/userContext.js";
import Homepage from "./Components/Homepage.jsx";
import Roompage from "./Components/Roompage.jsx";

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <userContext.Provider value={{ loggedUser, setLoggedUser }}>
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
            <Route path="/profile_pic" element={<ProfilePic />} />
            <Route path="/rooms/*" element={<Roompage />} />
          </Routes>
        </main>
      </div>
    </userContext.Provider>
  );
}

export default App;
