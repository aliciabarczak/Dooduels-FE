import BriefIns from "./Homepage/BriefIns";
import Options from "./Homepage/Options";
import RoomList from "./Homepage/RoomList";
import LeaderBoard from "./Homepage/Leaderboard";
import { useState } from "react";
import KeyInfo from "./Homepage/KeyInfo";
export default function Homepage({ showPopUp, setShowPopUp }) {
  const [showLogIn, setShowLogIn] = useState(false);

  return (
    <div className="Homepage">
      <BriefIns />
      <Options showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      <KeyInfo />
      <RoomList showLogIn={showLogIn} setShowLogIn={setShowLogIn} />
      <LeaderBoard />
    </div>
  );
}
