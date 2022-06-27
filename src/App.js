import "./App.css";
import Header from "./Components/Header";
import BriefIns from "./Components/Homepage/BriefIns";
import Options from "./Components/Homepage/Options";
import RoomList from "./Components/Homepage/RoomList";
import LeaderBoard from "./Components/Homepage/Leaderboard";
import LoginPage from "./Components/LoginPage.jsx";
import RoomPage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="Homepage">
          <BriefIns />
          <Options />
          <RoomList />
          <LeaderBoard />
        </div>
        <LoginPage />
        <RoomPage />
        <UserPage />
      </main>
    </div>
  );
}

export default App;
