import Canvas from "./Canvas.js";
import "../../Styling/Game-page.css"
import { useParams } from "react-router";

export default function Gamepage() {

    const {room_id} = useParams()

    return <>
    <h1>This will be a game page</h1>
    <Canvas room_id={room_id}/>
    </>
}