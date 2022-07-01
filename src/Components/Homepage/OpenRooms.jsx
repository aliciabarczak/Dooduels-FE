import { BsPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext.js";

export default function OpenRooms({ rooms }) {
  const { loggedUser } = useContext(userContext);
  return (
    <>
      <h2>Open Rooms</h2>
      <ul className="OpenRoomList">
        {rooms.map((room, index) => {
          if (!room.full)
            return (
              <section className="Room" key={index}>
                <div>
                  <li>{room.room_name}</li>
                  <p className="mode">{room.mode}</p>
                </div>

                {loggedUser.user_id === room.host.user_id ? (
                  <select className="button dropDownBtn">
                    <option value="Enter">enter</option>
                    <option value="Delete"> delete</option>
                  </select>
                ) : (
                  <button className="button">
                    <Link
                      to={`/rooms/${room.room_id}`}
                      key="login"
                      className="login-button">
                      enter
                    </Link>{" "}
                  </button>
                )}
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
