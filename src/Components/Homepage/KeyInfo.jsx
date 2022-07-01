import { useEffect, useState } from "react";
import { getAllUsers, getAllRooms } from "../../db/utils";

export default function KeyInfo() {
  const [allUsers, setAllUsers] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  useEffect(() => {
    getAllUsers(setAllUsers);
    getAllRooms(setAllRooms);
  }, []);

  let onlineCount = 0;
  allUsers.map((user) => {
    if (user.status === "Online") onlineCount++;
  });

  return (
    <div className="KeyInfo">
      <p> Players Online: {onlineCount}</p>
      <p> Rooms Open: {allRooms.length}</p>
    </div>
  );
}
