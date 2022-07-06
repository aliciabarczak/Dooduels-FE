import Canvas from "./Canvas.js";
import "../../Styling/Game-page.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRoomById } from "../../db/utils.js";
import { GameDisplay } from "./GameDisplay.js";
import GuessBox from "./GuessBox.jsx";
import { get, onValue, ref, set } from "firebase/database";
import db from "../../db/db.js";

export default function Gamepage() {
  const { room_id } = useParams();
  const [room, setRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [playersRoom, setPlayersRoom] = useState()
  const [roomHost, setRoomHost] = useState()

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
      room.players.forEach(player => {
        const playerPointsRef = ref(db, `rooms/${room_id}/players/${player.user_id}/points`)
        set(playerPointsRef, 0);
      });
      get(playersRef).then(snapshot => {
        const players = snapshot.val();
        setPlayersRoom(players);
      })
    });
    onValue(playersRef, (snapshot) => {
      console.log("change detected in player in db")
      setPlayersRoom(snapshot.val())
    })
  }, []);

  useEffect(()=>{
    const hostPointsRef = ref(db, `rooms/${room_id}/host/points`)
    set(hostPointsRef, 0)

    const hostRef = ref(db, `rooms/${room_id}/host`)
    get(hostRef).then(snapshot => {
      const thisHost = snapshot.val()
      console.log(thisHost)
      setRoomHost(thisHost)
    })
    onValue(hostRef, (snapshot) => {
      console.log("change detected in host on db")
      setRoomHost(snapshot.val())
    })
  },[])

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
    <div className="gamepage">
      {typeof room === "object" ? (
        <section id="game-page">
          <GameDisplay roomHost={roomHost} playersRoom={playersRoom} />
          <Canvas room_id={room_id} room={room} />
        </section>
      ) : null}
      <section className="bottom-area">
      <GuessBox room_id={room_id} room={room} />
      {/* <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          </g>
        </svg>
        <span id="timer">{formatTime(timeLeft)}</span>
      </div> */}
      </section>
    </div>
    </>
  );
}
