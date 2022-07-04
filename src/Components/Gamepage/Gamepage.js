import Canvas from "./Canvas.js";
import "../../Styling/Game-page.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getRoomById } from "../../db/utils.js";
import GuessBox from "./GuessBox.jsx";

export default function Gamepage() {
  const { room_id } = useParams();
  const [room, setRoom] = useState();

  useEffect(() => {
    getRoomById(room_id, setRoom);
  }, []);

  return (
    <>
      <h1>This will be a game page</h1>
      {typeof room === "object" ? (
        <Canvas room_id={room_id} room={room} />
      ) : null}
      <GuessBox />
    </>
  );
}
