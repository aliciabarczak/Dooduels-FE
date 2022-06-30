import "./../../Styling/Homepage.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import userContext from "./../../contexts/userContext";
import LogInPopUpBox from "./LogInPopUpBox";
import OpenRooms from "./OpenRooms";
import ClosedRooms from "./ClosedRooms";
import { getAllRooms } from "./../../db/utils.js";

export default function RoomList() {
  const { loggedUser } = useContext(userContext);
  const [rooms, setRooms] = useState([
    {
      room_id: "1",
      room_name: "Room 1",
      mode: "easy",
      players: ["Lewis", "Javier"],
      full: false,
      host: "doodoo",
    },
    {
      room_id: "2",
      room_name: "Room 2",
      mode: "medium",
      players: ["Dan", "Alex", "Joe", "Phil", "Javier"],
      full: true,
      host: "doodoo2",
    },
    {
      room_id: "3",
      room_name: "Room 3",
      mode: "easy",
      players: ["Lewis", "Javier"],
      full: false,
      host: "doodoo3",
    },
    {
      room_id: "4",
      room_name: "Room 4",
      mode: "easy",
      players: ["Alicia", "Lewis", "Javier"],
      full: false,
      host: "doodoo4",
    },
    {
      room_id: "5",
      room_name: "Room 5",
      mode: "medium",
      players: ["Dan", "Alex", "Joe", "Phil", "Javier"],
      full: true,
      host: "doodoo5",
    },
    {
      room_id: "6",
      room_name: "Room 6",
      mode: "hard",
      players: ["Dan", "Alex", "Joe", "Phil"],
      full: false,
      host: "doodoo6",
    },
    {
      room_id: "7",
      room_name: "Room 7",
      mode: "easy",
      players: ["Dan", "Alex", "Joe", "Phil", "Javier"],
      full: true,
      host: "doodoo7",
    },
    {
      room_id: "8",
      room_name: "Room 8",
      mode: "easy",
      players: ["Dan", "Alex", "Joe", "Phil"],
      full: false,
      host: "doodoo8",
    },
    {
      room_id: "9",
      room_name: "Room 9",
      mode: "medium",
      players: ["Dan", "Alex", "Joe"],
      full: false,
      host: "doodoo9",
    },
    {
      room_id: "10",
      room_name: "Room 10",
      mode: "hard",
      players: ["Alicia", "Lewis", "Javier"],
      full: false,
      host: "doodoo10",
    },
    {
      room_id: "11",
      room_name: "Room 11",
      mode: "easy",
      players: ["Alicia", "Lewis"],
      full: false,
      host: "doodo11",
    },
    {
      room_id: "12",
      room_name: "Room 12",
      mode: "easy",
      players: ["Sam"],
      full: false,
      host: "doodoo12",
    },
    {
      room_id: "13",
      room_name: "Room 13",
      mode: "medium",
      players: ["Dan", "Alex", "Joe"],
      full: false,
      host: "doodoo13",
    },
    {
      room_id: "14",
      room_name: "Room 14",
      mode: "hard",
      players: ["Alicia", "Lewis"],
      full: false,
      host: "doodoo14",
    },
    {
      room_id: "15",
      room_name: "Room 15",
      mode: "easy",
      players: ["Dan", "Alex", "Joe"],
      full: false,
      host: "doodoo15",
    },
    {
      room_id: "16",
      room_name: "Room 16",
      mode: "easy",
      players: ["Dan", "Alex", "Joe", "Phil", "Javier"],
      full: true,
      host: "doodoo16",
    },
    {
      room_id: "17",
      room_name: "Room 17",
      mode: "medium",
      players: ["Alicia", "Lewis"],
      full: false,
      host: "doodoo17",
    },
    {
      room_id: "18",
      room_name: "Room 18",
      mode: "hard",
      players: ["Dan", "Alex", "Joe"],
      full: false,
      host: "doodoo18",
    },
  ]);

  // useEffect(() => {
  //   getAllRooms(setRooms);
  // }, [rooms]);

  return (
    <>
      {loggedUser === "" ? <LogInPopUpBox /> : null}
      <OpenRooms rooms={rooms} />
      <ClosedRooms rooms={rooms} />
    </>
  );
}
