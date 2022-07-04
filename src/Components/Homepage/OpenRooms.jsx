import { useContext } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import userContext from "../../contexts/userContext.js";
import { deleteRoom } from "../../db/utils.js";
import Options from "./Options.jsx";

export default function OpenRooms({ rooms, showPopUp, setShowPopUp }) {
  const { loggedUser } = useContext(userContext);

  return (
    <>
      <h2 className="OpenRooms">Open Rooms</h2>
      <Options showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      <ul className="OpenRoomList">
        {!rooms.length
          ? null
          : rooms.map((room, index) => {
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
                      <button className="enterButton">
                        <Link to={`/rooms/${room.room_id}`} key="login">
                          <span>enter</span>
                        </Link>
                      </button>
                      {loggedUser && room ? (
                        loggedUser.user_id === room.host.user_id ? (
                          <button
                            className={
                              room.players.length === 0
                                ? "button"
                                : "disabledButton"
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
                        )
                      ) : null}
                    </div>
                    <div className="peopleInfo">
                      <p>
                        <BsPeopleFill className="peopleIcon" />
                      </p>
                      <p>
                        {room.players.length
                          ? `${room.players.length}/5`
                          : "0/5"}
                      </p>
                    </div>
                  </section>
                );
            })}
      </ul>
    </>
  );
}
