import Canvas from "./Canvas.js";
import "../../Styling/Game-page.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRoomById } from "../../db/utils.js";
import GuessBox from "./GuessBox.jsx";
import { get, onValue, ref, set } from "firebase/database";
import db from "../../db/db.js";
import GameDisplay from "./GameDisplay.js";

export default function Gamepage() {
  const { room_id } = useParams();
  const [room, setRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [playersRoom, setPlayersRoom] = useState();
  const [roomHost, setRoomHost] = useState();
  const [hostPoints, setHostPoints] = useState(0);
  const hostRef = ref(db, `rooms/${room_id}/host`);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  const TIME_LIMIT = 60;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;

  let timerInterval = null;
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeLeft === 0) {
        document.getElementById("timer").innerHTML = "TIME IS UP";
        timePassed = 60;
        return;
      }
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("timer").innerHTML = formatTime(timeLeft);
    }, 1000);
  }

  useEffect(() => {
    const playersRef = ref(db, `rooms/${room_id}/players`);
    getRoomById(room_id).then((room) => {
      setRoom(room);
      setIsLoading(false);
      room.players.forEach((player) => {
        const playerPointsRef = ref(
          db,
          `rooms/${room_id}/players/${player.user_id}/points`
        );
        set(playerPointsRef, 0);
      });

      const hostPointsRef = ref(db, `rooms/${room_id}/host/points`);
      set(hostPointsRef, 0);

      get(hostRef).then((snapshot) => {
        const thisHost = snapshot.val();
        console.log(thisHost);
        setRoomHost(thisHost);
      });

      get(playersRef).then((snapshot) => {
        const players = snapshot.val();
        setPlayersRoom(players);
      });
    });
    onValue(playersRef, (snapshot) => {
      setPlayersRoom(snapshot.val());
    });
  }, []);

  useEffect(() => {}, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="gamepage-mother-component">
      {typeof room === "object" ? (
        <section id="game-page">
          <GameDisplay
            roomHost={roomHost}
            playersRoom={playersRoom}
            hostPoints={hostPoints}
          />

          <Canvas room_id={room_id} room={room} />
        </section>
      ) : null}
      <GuessBox room_id={room_id} room={room} setHostPoints={setHostPoints} />
    </div>
  );
}
