import { onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useRef, useState } from "react";
import userContext from "../../contexts/userContext.js";
import db from "../../db/db.js";
import "../../Styling/Game-page.css";
import CanvasMenu from "./CanvasMenu.jsx";

export default function Canvas({ room_id, room }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const secondContextRef = useRef(null);
  const secondCanvasRef = useRef(null);
  const roomCanvasRef = ref(db, `rooms/${room_id}/canvas`);
  const clearCanvasRef = ref(db, `rooms/${room_id}/clearCanvas`);
  const { loggedUser } = useContext(userContext);

  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");

  let xyTracker = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    color: lineColor,
    lineWidth: lineWidth,
  };

  // Initialize on mount
  useEffect(() => {
    set(clearCanvasRef, false);
  }, []);

  function sendCanvasToDb(data) {
    set(roomCanvasRef, data);
  }

  const [isDrawing, setIsDrawing] = useState(false);

  // Initialization for when the component mounts for the first time.
  useEffect(() => {
    //IF HOST DO THIS:
    if (loggedUser.user_name === room.host.user_name) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d"); //declare 2d 'context' of the canvas

      contextRef.current = context;

      //declare various properties of the 2d context
      context.lineCap = "round";
      context.lineJoin = "normal";
      context.strokeStyle = lineColor;
      context.lineWidth = lineWidth;
    } else {
      // IF NOT HOST DO THIS:
      onValue(roomCanvasRef, (snapshot) => {
        const tracker = snapshot.val();
        const secondCanvas = secondCanvasRef.current;
        const secondCanvasContext = secondCanvas.getContext("2d");
        secondContextRef.current = secondCanvasContext;

        if (
          onValue(clearCanvasRef, (snapshot) => {
            const clearCanvasState = snapshot.val();
            if (clearCanvasState === true) {
              secondContextRef.current.clearRect(
                0,
                0,
                secondCanvasRef.current.width,
                secondCanvasRef.current.height
              );
            }
          })
        )
          if (tracker.x0 && tracker.y0) {
            secondCanvasContext.beginPath();
            secondCanvasContext.moveTo(tracker.x0, tracker.y0);
            secondCanvasContext.lineTo(tracker.x1, tracker.y1);
            secondCanvasContext.strokeStyle = tracker.color;
            secondCanvasContext.lineWidth = tracker.lineWidth;
            secondCanvasContext.lineJoin = "normal";
            secondCanvasContext.stroke();
            secondCanvasContext.closePath();
          }
      });
    }

    //declare listener for changes in db/<this room>/canvas
  }, [loggedUser, lineColor, lineWidth]);

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

  function draw({ nativeEvent }) {
    if (!isDrawing) return;

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

  function clearCanvas() {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    set(clearCanvasRef, true);
  }

  return (
    <>
      {loggedUser.user_id === room.host.user_id ? (
       <section>
        <CanvasMenu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          lineWidth={lineWidth}
          clearCanvas={clearCanvas}
        />
        <canvas
          id="canvas"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          onChange={handleChange}
          width={`1280px`}
          height={`720px`}
        ></canvas>
      </section>
        
      ) : (
        <canvas
          ref={secondCanvasRef}
          width={`1280px`}
          height={`720px`}
        ></canvas>
      )}
    </>
  );
}
