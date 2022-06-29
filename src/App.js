import "./App.css";
import Header from "./Components/Header";
import RoomPage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage";
import { useState } from "react";
import { Routes, Route } from "react-router";
import userContext from "./contexts/userContext";
import Homepage from "./Components/Homepage";
import ProfilePic from "./Components/UserPage/ProfilePic";

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <userContext.Provider value={{ loggedUser, setLoggedUser }}>
      <div className={showPopUp || loggedUser === "" ? "blackOutApp" : "App"}>
        <Header />
        <main>
          <RoomPage />
          <Routes>
            <Route
              path="/"
              element={
                <Homepage showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
              }
            />
            <Route path="/users/:user_id" element={<UserPage />} />
            <Route path="/profile_pic" element={<ProfilePic />} />
          </Routes>
        </main>
      </div>
    </userContext.Provider>
  );
}

export default App;
