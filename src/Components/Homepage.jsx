import BriefIns from "./Homepage/BriefIns";
import Options from "./Homepage/Options";
import RoomList from "./Homepage/RoomList";
import LeaderBoard from "./Homepage/Leaderboard";
import { useState } from "react";
export default function ({ showPopUp, setShowPopUp }) {
  const [showLogIn, setShowLogIn] = useState(false);
  return (
    <div className="Homepage">
      <BriefIns />
      <Options showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      <RoomList showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
      <LeaderBoard />
    </div>
  );
}
