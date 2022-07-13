import { BsPeopleFill } from "react-icons/bs";
import { useContext } from "react";
import userContext from "../../contexts/userContext.js";
import { deleteRoom } from "../../db/utils.js";
import "../../Styling/Roompage.css";

export default function ClosedRooms({ rooms }) {
  const { loggedUser } = useContext(userContext);
  const demoRooms = [
    {
      full: true,
      host: { user_name: "tomtickle" },
      messages: {
        "-N5iVlC-p5xgUItrAMGV": "Hi mum, i'm on TV",
        "-N5iVo0GHu537d7YNEDg": "hello world",
        "-N5iVsWCXjTPWzay13ha": "howdy",
        "-N5iVzxwc9rGrq0LZHNf": "bananas in pjamas",
      },
      mode: "'HA-AR-D'",
      players: ["jessjelly", "sparkles", "sparkles", "alicia", "javier"],
      room_name: "AR-Only",
      room_id: "1",
    },
    {
      full: true,
      host: { user_name: "Jacko" },
      messages: {
        "-N5iVlC-p5xgUItrAMGV": "Hi mum, i'm on TV",
        "-N5iVo0GHu537d7YNEDg": "hello world",
        "-N5iVsWCXjTPWzay13ha": "howdy",
        "-N5iVzxwc9rGrq0LZHNf": "bananas in pjamas",
      },
      mode: "'Easy'",
      players: ["jessjelly", "sparkles", "sparkles", "alicia", "javier"],
      room_name: "Room 5",
      room_id: "1",
    },
  ];
  return (
    <>
      <h2 className="closedRoomsHeader">Closed Rooms</h2>
      <ul className="RoomList">
        {demoRooms.map((room, index) => {
          if (room.players.length === 5)
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
