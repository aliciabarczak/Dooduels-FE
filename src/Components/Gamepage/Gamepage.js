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
