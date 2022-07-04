import BriefIns from "./Homepage/BriefIns";

import RoomList from "./Homepage/RoomList";
import LeaderBoard from "./Homepage/Leaderboard";
import { useState } from "react";
import KeyInfo from "./Homepage/KeyInfo";
import BottomBorder from "./Homepage/BottomBorder";
export default function Homepage({ showPopUp, setShowPopUp }) {
  const [showLogIn, setShowLogIn] = useState(false);

  return (
    <div className="Homepage">
      <BriefIns />
      <KeyInfo />
      <RoomList
        showLogIn={showLogIn}
        setShowLogIn={setShowLogIn}
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
      />
      <LeaderBoard />
      <BottomBorder />
    </div>
  );
}
