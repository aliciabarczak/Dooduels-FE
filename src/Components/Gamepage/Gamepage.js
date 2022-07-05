import Canvas from "./Canvas.js";
import "../../Styling/Game-page.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRoomById } from "../../db/utils.js";
import { GameDisplay } from "./GameDisplay.js";
import GuessBox from "./GuessBox.jsx";

export default function Gamepage() {
  const { room_id } = useParams();
  const [room, setRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
    getRoomById(room_id).then((room) => {
      setRoom(room);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {typeof room === "object" ? (
        <section id="game-page">
          <GameDisplay host={room.host} players={room.players} />
          <Canvas room_id={room_id} room={room} />
        </section>
      ) : null}
      <GuessBox room_id={room_id} room={room} />
    </>
  );
}
