import BriefIns from "./Homepage/BriefIns";
import Options from "./Homepage/Options";
import RoomList from "./Homepage/RoomList";
import LeaderBoard from "./Homepage/Leaderboard";
export default function ({ showPopUp, setShowPopUp }) {
  return (
    <div className="Homepage">
      <BriefIns />
      <Options showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      <RoomList />
      <LeaderBoard />
    </div>
  );
}
