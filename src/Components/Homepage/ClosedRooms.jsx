import { BsPeopleFill } from "react-icons/bs";
import { useContext } from "react";
import userContext from "../../contexts/userContext.js";
import { deleteRoom } from "../../db/utils.js";

export default function ClosedRooms({ rooms }) {
  const { loggedUser } = useContext(userContext);
  return (
    <>
      <h2 className="closedRoomsHeader">Closed Rooms</h2>
      <ul className="RoomList">
        {rooms.map((room, index) => {
          if (room.full)
            return (
              <section
                key={index}
                className={index % 2 === 1 ? "Room dark" : "Room"}>
                <div className="roomInfo">
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>
                <div className="buttons">
                  <button className="disabledButton">
                    <span className="buttonTxt">enter</span>
                  </button>
                  {loggedUser.user_id === room.host.user_id ? (
                    <button
                      className={
                        room.players.length === 0
                          ? "deleteButton"
                          : "disabledButton"
                      }
                      onClick={
                        room.players.length === 0
                          ? () => deleteRoom(room.room_id)
                          : null
                      }>
                      <span className="buttonTxt">delete</span>
                    </button>
                  ) : (
                    <p className="hostButton">
                      <span>Host: {room.host.user_name}</span>
                    </p>
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
