import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function OpenRooms({ rooms }) {
  return (
    <>
      <h2>Open Rooms</h2>
      <ul className="OpenRoomList">
        {rooms.map((room, index) => {
          if (!room.full)
            return (
              <section className="Room">
                <div>
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>

                <button className="button">
                  <Link
                    to={`/rooms/${room.room_id}`}
                    key="login"
                    className="login-button"
                  >
                    enter
                  </Link>
                </button>
                <p>
                  <BsPeopleFill className="peopleIcon" />
                </p>
                <p>
                  {room.players.length ? `${room.players.length}/5` : "0/5"}
                </p>
              </section>
            );
        })}
      </ul>
    </>
  );
}
