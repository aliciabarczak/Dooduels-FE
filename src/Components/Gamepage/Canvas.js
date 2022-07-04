import { onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useRef, useState } from "react";
import userContext from "../../contexts/userContext.js";
import db from "../../db/db.js";

import "../../Styling/Game-page.css";

export default function Canvas({ room_id, room }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const secondCanvasRef = useRef(null);
  const roomCanvasRef = ref(db, `rooms/${room_id}/canvas`);
  const { loggedUser } = useContext(userContext);

  let canvasFromDb;
  let xyTracker = { x0: 0, y0: 0, x1: 0, y1: 0 };

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    //get the 'current' property of the canvas element
    if (loggedUser.user_name === room.host.user_name) {
      const canvas = canvasRef.current;

      //declare various properties of the canvas 'current'
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.22;
      canvas.style.width = `${window.innerWidth / 2}px`;
      canvas.style.height = `600px`;

      //declare 2d 'context' of the canvas
      const context = canvas.getContext("2d");
      contextRef.current = context;

      //declare various properties of the 2d context
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
      context.scale(2, 2);
    } else {
      onValue(roomCanvasRef, (snapshot) => {
        const tracker = snapshot.val();
        const secondCanvas = secondCanvasRef.current;
        const secondCanvasContext = secondCanvas.getContext("2d");

        if (tracker.x0 && tracker.y0) {
          secondCanvasContext.beginPath();
          secondCanvasContext.moveTo(tracker.x0, tracker.y0);
          secondCanvasContext.lineTo(tracker.x1, tracker.y1);
          secondCanvasContext.strokeStyle = "black";
          secondCanvasContext.lineWidth = 2;
          secondCanvasContext.stroke();
          secondCanvasContext.closePath();
        }
      });
    }

    //declare listener for changes in db/<this room>/canvas
  }, [loggedUser]);

  function startDrawing({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    xyTracker.x0 = offsetX;
    xyTracker.y0 = offsetY;
    xyTracker.x1 = offsetX;
    xyTracker.y1 = offsetY;
  }

  function finishDrawing() {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  function sendCanvasToDb(data) {
    set(roomCanvasRef, data);
  }

  function draw({ nativeEvent }) {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    xyTracker.x0 = xyTracker.x1;
    xyTracker.y0 = xyTracker.y1;
    xyTracker.x1 = offsetX;
    xyTracker.y1 = offsetY;

    sendCanvasToDb(xyTracker);
  }

  function handleChange(event) {
    event.preventDefault();
    console.log("change detected");
  }

  return (
    <>
      <h2>This will be the canvas</h2>

      {loggedUser.user_id === room.host.user_id ? (
        <canvas
          id="canvas"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          onChange={handleChange}
        ></canvas>
      ) : (
        <canvas
          ref={secondCanvasRef}
          style={{ height: "301px", width: "602px", border: "1px solid red" }}
        ></canvas>
      )}
    </>
  );
}
