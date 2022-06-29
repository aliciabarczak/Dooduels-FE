import { BsPeopleFill } from "react-icons/bs";
import ExpandibleRooms from "./ExpandibleRooms";
export default function OpenRooms({ rooms }) {
  let expandableRooms = [];
  return (
    <>
      <ul className="RoomList">
        <h2>Open Rooms</h2>
        {rooms.map((room, index) => {
          if (index < 5 && !room.full)
            return (
              <div className="Room">
                <div>
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>
                <button className="button">Enter</button>
                <p>
                  <BsPeopleFill className="peopleIcon" />
                </p>
                <p>
                  {room.players.length ? `${room.players.length}/5` : "0/5"}
                </p>
              </div>
            );
          else if (!room.full) {
            expandableRooms.push(
              <div className="Room">
                <div>
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>
                <button className="button">Enter</button>
                <p>
                  <BsPeopleFill className="peopleIcon" />
                </p>
                <p>
                  {room.players.length ? `${room.players.length}/5` : "0/5"}
                </p>
              </div>
            );
          }
        })}
        <ExpandibleRooms>{expandableRooms}</ExpandibleRooms>
      </ul>
    </>
  );
}
