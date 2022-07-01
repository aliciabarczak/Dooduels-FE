import "./../../Styling/Homepage.css";
import { useEffect, useState, useContext } from "react";
import userContext from "./../../contexts/userContext.js";
import LogInPopUpBox from "./LogInPopUpBox";
import OpenRooms from "./OpenRooms";
import ClosedRooms from "./ClosedRooms";
import { getAllRooms } from "./../../db/utils.js";

export default function RoomList() {
  const { loggedUser } = useContext(userContext);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getAllRooms(setRooms);
  }, [rooms]);

  return (
    <>
      {!loggedUser ? <LogInPopUpBox /> : null}
      <OpenRooms rooms={rooms} />
      <ClosedRooms rooms={rooms} />
    </>
  );
}
