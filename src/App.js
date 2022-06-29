import "./App.css";
import Header from "./Components/Header";
import LoginPage from "./Components/LoginPage.jsx";
import RoomPage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage";
import { useState } from "react";
import { Routes, Route } from "react-router";
import userContext from "./contexts/userContext";
import Homepage from "./Components/Homepage";

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <userContext.Provider value={{ loggedUser, setLoggedUser }}>
      <div className={showPopUp || loggedUser === "" ? "blackOutApp" : "App"}>
        <Header />
        <main>
          <RoomPage />
          <UserPage />
          <Routes>
            <Route
              path="/"
              element={
                <Homepage showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
              }
            />
          </Routes>
        </main>
      </div>
    </userContext.Provider>
  );
}

export default App;
