import "./Styling/App.css";
import Header from "./Components/Header";
import RoomPage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage";
import { useState } from "react";
import { Routes, Route } from "react-router";
import userContext from "./contexts/userContext";
import Homepage from "./Components/Homepage";
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
            <Route path="/rooms/*" element={<Roompage />} />
          </Routes>
        </main>
      </div>
    </userContext.Provider>
  );
}

export default App;
