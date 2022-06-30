import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext";
import { deleteRoom } from "../../db/utils.js";

export default function OpenRooms({ rooms }) {
  const { loggedUser } = useContext(userContext);
  const handleDelete = (room_id) => {
    deleteRoom(room_id);
  };

  return (
    <>
      <h2>Open Rooms</h2>
      <ul className="OpenRoomList">
        {rooms.map((room, index) => {
          if (!room.full)
            return (
              <section className="Room" key={room.room_id}>
                <div>
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>

                <button className="button">
                  <Link
                    to={`/rooms/${room.room_id}`}
                    key="login"
                    className="login-button">
                    enter
                  </Link>
                </button>
                {loggedUser.user_name === room.host.user_name ? (
                  <button
                    className="button"
                    onClick={() => handleDelete(room.room_id)}>
                    delete
                  </button>
                ) : (
                  <div>
                    <p>
                      <BsPeopleFill className="peopleIcon" />
                    </p>
                    <p>
                      {room.players.length ? `${room.players.length}/5` : "0/5"}
                    </p>
                  </div>
                )}
              </section>
            );
        })}
      </ul>
    </>
  );
}
