import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import userContext from "../../contexts/userContext.js";
import { deleteRoom } from "../../db/utils.js";

export default function OpenRooms({ rooms }) {
  const { loggedUser } = useContext(userContext);
  const [cannotDelete, setCannotDelete] = useState(false);
  const sendMsg = () => {
    return <p>Cannot delete room</p>;
  };

  return (
    <>
      <h2>Open Rooms</h2>
      <ul className="OpenRoomList">
        {rooms.map((room, index) => {
          if (!room.full)
            return (
              <section
                key={index}
                className={index % 2 === 1 ? "Room dark" : "Room"}>
                <div className="roomInfo">
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>
                <div className="buttons">
                  <button className="button">
                    <Link
                      to={`/rooms/${room.room_id}`}
                      key="login"
                      className="login-button">
                      enter
                    </Link>
                  </button>
                  {loggedUser.user_id === room.host.user_id ? (
                    <button
                      className={
                        room.players.length === 0 ? "button" : "disabledButton"
                      }
                      onClick={
                        room.players.length === 0
                          ? () => deleteRoom(room.room_id)
                          : null
                      }>
                      delete
                    </button>
                  ) : (
                    <p>Host: {room.host.user_name}</p>
                  )}
                </div>
                <div className="peopleInfo">
                  <p>
                    <BsPeopleFill className="peopleIcon" />
                  </p>
                  <p>
                    {room.players.length ? `${room.players.length}/5` : "0/5"}
                  </p>
                </div>
              </section>
            );
        })}
      </ul>
    </>
  );
}
