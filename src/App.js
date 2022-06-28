import "./App.css";
import Header from "./Components/Header";
import BriefIns from "./Components/Homepage/BriefIns";
import Options from "./Components/Homepage/Options";
import RoomList from "./Components/Homepage/RoomList";
import LeaderBoard from "./Components/Homepage/Leaderboard";
import LoginPage from "./Components/LoginPage.jsx";
import RoomPage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage";
import { useState } from "react";
import { Routes, Route } from "react-router";
import userContext from './contexts/userContext';

function App() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <userContext.Provider value={{loggedUser, setLoggedUser}}>
    <div className="App">
      <Header />
      <main className={showPopUp ? "blackOut" : null}>
        <div className="Homepage">
          <BriefIns />
          <Options showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
          <RoomList />
          <LeaderBoard />
        </div>
        <RoomPage />
        <UserPage />
        <Routes>
          {/* <Route path="/" element={<HomePage />}/> */}
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
      </main>
    </div>
    </userContext.Provider>
  )
};

export default App;
