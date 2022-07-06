import BriefIns from "./Homepage/BriefIns";

import RoomList from "./Homepage/RoomList";
import LeaderBoard from "./Homepage/Leaderboard";
import { useContext, useEffect, useState } from "react";
import KeyInfo from "./Homepage/KeyInfo";
import BottomBorder from "./Homepage/BottomBorder";
import userContext from "../contexts/userContext";
import { removePlayerFromRoom } from "../db/utils";
export default function Homepage({ showPopUp, setShowPopUp }) {
  const { loggedUser, lastRoomId, setLastRoomId } = useContext(userContext);
  const [showLogIn, setShowLogIn] = useState(false);

  useEffect(() => {
    const data = window.localStorage.getItem("lastRoomId");
    setLastRoomId(data);
    if (loggedUser) {
      removePlayerFromRoom(loggedUser.user_id, lastRoomId);
    } ;
  });

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
