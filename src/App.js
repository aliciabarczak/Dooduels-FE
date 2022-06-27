import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header.jsx";
import BriefIns from "./Components/BriefIns.jsx";
import Buttons from "./Components/Buttons.jsx";
import RoomList from "./Components/RoomList.jsx";
import Leaderboard from "./Components/Leaderboard.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import Roompage from "./Components/Roompage.jsx";
import UserPage from "./Components/UserPage.jsx";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="Homepage">
          <BriefIns />
          <Buttons />
          <RoomList.jsx />
          <Leaderboard />
        </div>
        <LoginPage />
        <Roompage />
        <UserPage />
      </main>
    </div>
  );
}

export default App;
