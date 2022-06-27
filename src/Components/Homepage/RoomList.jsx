import { useState } from "react";
import "./../Homepage.css";

const RoomList = () => {
  const [rooms, setRooms] = useState([
    { name: "Room 1", Difficulty: "easy", Participants: 2 },
    { name: "Room 2", Difficulty: "medium", Participants: 2 },
    { name: "Room 3", Difficulty: "easy", Participants: 2 },
    { name: "Room 4", Difficulty: "easy", Participants: 2 },
    { name: "Room 5", Difficulty: "medium", Participants: 2 },
    { name: "Room 6", Difficulty: "hard", Participants: 2 },
  ]);

  ///fetch rooms using useEffect from DB when possible...

  return (
    <ul className="RoomList">
      {rooms.map((room) => {
        return (
          <div className="Room">
            <li>{room.name}</li>
            <p className="button">Enter</p>
          </div>
        );
      })}
    </ul>
  );
};

export default RoomList;
