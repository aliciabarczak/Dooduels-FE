import { Hands } from "@mediapipe/hands";
import * as CAMERA from "@mediapipe/camera_utils"
import Webcam from 'react-webcam'
import {useRef, useEffect, useState, useContext} from 'react';
import fingerTipsAreClose from "../../ARfunctions/fingersAreClose.js";
import fourFingersAreClose from "../../ARfunctions/fourFingersAreClose.js";
import { onValue, ref, set } from "firebase/database";
import db from "../../db/db.js";
import userContext from "../../contexts/userContext.js";



export default function ARCanvas({room_id, room}) {
    const {loggedUser} = useContext(userContext)
    console.log(loggedUser)
    console.log(loggedUser.user_id === room.host.user_id)
    const roomCanvasRef = ref(db, `rooms/${room_id}/canvas`);
    const [x, setX] = useState()
    const [y, setY] = useState()
    const [started, setStarted] = useState(false)
    let drawing = false
    const [erasing, setErasing] = useState(false)
  
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const secondCanvasRef = useRef(null)
    // const secondContextRef = useRef(null);
    
    let canvasCtx
    let camera;
    let X
    let Y
    let xyTracker = {x0: 0, y0: 0, x1: 0, y1: 0}

    function sendCanvasToDb(data) {
        set(roomCanvasRef, data);
      }
  
    function handleResults(results) {
      
      if (results.multiHandLandmarks.length) {
  
        const landmarks = results.multiHandLandmarks[0]
  
        if (fingerTipsAreClose(landmarks[4], landmarks[8])){
          //drawLandmarks(canvasCtx, [landmarks[8]], {color: '#FF0000', lineWidth: 0.5});
          if(fourFingersAreClose(landmarks[8], landmarks[12], landmarks[16], landmarks[20])) {
            setErasing(true)
            console.log('erasing')
            canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            xyTracker.x0 = 0
            xyTracker.y0 = 0
            xyTracker.x1 = 0
            xyTracker.y1 = 0
            finishDrawing()
          } else {
            setErasing(false)
          }
          setX(landmarks[8].x * 150)
          setY(landmarks[8].y * 75)
          X = landmarks[8].x * 150
          Y = landmarks[8].y * 75
          if (drawing) {
            console.log('drawing')
            draw(X,Y)
          }
          if (!drawing) {
            startDrawing(X, Y)
          } 
        } else {
          if (drawing) {
            xyTracker.x0 = 0
            xyTracker.y0 = 0
            xyTracker.x1 = 0
            xyTracker.y1 = 0
            finishDrawing()
          } 
        }
      } 
    }

    useEffect(()=>{
      const secondCanvas = secondCanvasRef.current;
      const secondCanvasContext = secondCanvas.getContext("2d");
      // secondContextRef.current = secondCanvasContext;

      if(loggedUser.user_id !== room.host.user_id) {
        // onValue(roomCanvasRef, (snapshot) => {
        //   const tracker = snapshot.val();
          
  
        //   if (tracker.x0 && tracker.y0) {
        //     secondCanvasContext.beginPath();
        //     secondCanvasContext.moveTo(tracker.x0, tracker.y0);
        //     secondCanvasContext.lineTo(tracker.x1, tracker.y1);
        //     secondCanvasContext.strokeStyle = tracker.color;
        //     secondCanvasContext.lineWidth = tracker.lineWidth;
        //     secondCanvasContext.lineJoin = "normal";
        //     secondCanvasContext.stroke();
        //     secondCanvasContext.closePath();
  
        //   }
        // });
      }
    },[])
  
    useEffect(()=>{
      const hands = new Hands({
        locateFile:(file)=>{
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
        onResults: (results)=> handleResults(results)
      })
      canvasCtx = canvasRef.current.getContext("2d")
      canvasCtx.scale(2,2)
      canvasCtx.width = 1280
      canvasCtx.height = 720
      canvasCtx.lineCap = "round"
      canvasCtx.strokeStyle = "black"
      canvasCtx.lineWidth = 1
  
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.9,
        minTrackingConfidence: 0.9
      });
  
      hands.onResults(handleResults)
  
      if (typeof webcamRef.current !== "undefined" && typeof webcamRef.current !== "null" && webcamRef.current.video !== "undefined" && webcamRef.current.video !== "null") {
        console.dir(webcamRef.current.video)
        camera = new CAMERA.Camera(webcamRef.current.video, {
          onFrame: async () => {
            return hands.send({image: webcamRef.current.video})
            // .catch(err => console.log(err));
          },
          width: 640,
          height: 360,
        })
        camera.start()
      }
      
    }, [])
  
    
  
    function startDrawing(x, y) {
      
      console.log('starting to draw')
      
      xyTracker.x0 = x
      xyTracker.y0 = y
      xyTracker.x1 = x
      xyTracker.y1 = y
      if (xyTracker.x0 !== 0 && xyTracker.xy !== 0) {
        canvasCtx.beginPath()
        canvasCtx.moveTo(x,y)
        drawing = true
      }
    }
  
    function draw(x, y){
      if (!drawing) {
        return
      }
      console.log('drawing')
      canvasCtx.lineTo(x, y)
      canvasCtx.stroke()
      xyTracker.x0 = xyTracker.x1
      xyTracker.y0 = xyTracker.y1
      xyTracker.x1 = x
      xyTracker.y1 = y
  
      sendCanvasToDb(xyTracker);
    }   
  
   function finishDrawing() {
      console.log('finished drawing')
      canvasCtx.closePath()
      drawing = false
      
    }
      
    return (
      <div className="ARCanvas">
        {/* { loggedUser.user_id === room.host.user_id ?  */}
        <>
        <Webcam id="Webcam" ref={webcamRef} 
        style={{
          width: 1280, 
          height: 720, 
          'WebkitTransform': 'scaleX(-1)',
          'transform': 'scaleX(-1)'}}
        hidden={loggedUser.user_id === room.host.user_id ? false : true}
            />
            <canvas id="canvas" ref={canvasRef} style={{
          width: 1280, 
          height: 720, 
          zIndex: 1,
          opacity: 0.5,
          'transform': 'scaleX(-1)'}} ></canvas>
          </>
      
          <canvas
          ref={secondCanvasRef}
          style={{
            width: 1280, 
            height: 720, 
            
            'transform': 'scaleX(-1)'}}
        ></canvas>
      </div>
    );
  }