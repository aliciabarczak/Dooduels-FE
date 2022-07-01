import { BsPeopleFill } from "react-icons/bs";
export default function ClosedRooms({ rooms }) {
  return (
    <>
      <h2>Closed Rooms</h2>
      <ul className="RoomList">
        {rooms.map((room, index) => {
          if (room.full)
            return (
              <div className="Room">
                <div>
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>
                <button className="disabledButton" disabled={true}>
                  Enter
                </button>
                <p>
                  <BsPeopleFill className="peopleIcon" />
                </p>
                <p>
                  {room.players.length ? `${room.players.length}/5` : "0/5"}
                </p>
              </div>
            );
        })}
      </ul>
    </>
  );
}
