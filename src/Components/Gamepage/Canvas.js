import { onValue, ref, set } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import db from "../../db/db.js"
import "../../Styling/Game-page.css"

export default function Canvas({room_id}) {

const canvasRef = useRef(null)
const contextRef = useRef(null)
const secondCanvasRef = useRef(null)
const imageRef = useRef(null)
const roomCanvasRef = ref(db, `rooms/${room_id}/canvas`)
let canvasFromDb
let xyTracker = {x0: 0, y0: 0, x1: 0, y1: 0}

const [isDrawing, setIsDrawing] = useState(false)

useEffect(()=>{

    //get the 'current' property of the canvas element
    const canvas = canvasRef.current

    //declare various properties of the canvas 'current'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 1.22
    canvas.style.width = `${window.innerWidth /2}px`
    canvas.style.height = `600px`

    //declare 2d 'context' of the canvas
    const context = canvas.getContext('2d')
    contextRef.current = context

    //declare various properties of the 2d context
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    context.scale(2, 2)

    //declare listener for changes in db/<this room>/canvas

    onValue(roomCanvasRef, (snapshot) => {
        const tracker = snapshot.val()
        console.log(tracker)
        const secondCanvas = secondCanvasRef.current
        const secondCanvasContext = secondCanvas.getContext('2d')

        if (tracker.x0 && tracker.y0) {
            secondCanvasContext.beginPath();
            secondCanvasContext.moveTo(tracker.x0, tracker.y0);
            secondCanvasContext.lineTo(tracker.x1, tracker.y1);
            secondCanvasContext.strokeStyle = 'black';
            secondCanvasContext.lineWidth = 2;
            secondCanvasContext.stroke();
            secondCanvasContext.closePath();
        }

        

        // creating a new Image instance and setting src to be url received from db
        // const image = new Image
        // image.src = blobFromDb.slice(5)
        // console.log(image)
        
        // imageRef.current.src = blobFromDb.slice(5)
        // console.log(imageRef.current.src)
        //grabs the second canvas
        
        
        // // attempting to draw the new image onto the second canvas
        // secondCanvasContext.drawImage(image, 0, 0, 602, 301)
    })
},[])

function startDrawing({nativeEvent}) {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
    xyTracker.x0 = offsetX
    xyTracker.y0 = offsetY
    xyTracker.x1 = offsetX
    xyTracker.y1 = offsetY
}

function finishDrawing() {
    contextRef.current.closePath()
    setIsDrawing(false)
}

function sendCanvasToDb(data) {
    set(roomCanvasRef, data)
}

function draw({nativeEvent}) {
    if (!isDrawing) {
        return
    }
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()

    xyTracker.x0 = xyTracker.x1
    xyTracker.y0 = xyTracker.y1
    xyTracker.x1 = offsetX
    xyTracker.y1 = offsetY

    sendCanvasToDb(xyTracker)


    //Send image data to db as a blob
    // const imageData = contextRef.current.getImageData(0, 0, 301.5, 602).data
    // const blob = new Blob([imageData])
    // const url = URL.createObjectURL(blob)
    // sendCanvasToDb(url)
    // const updatedImage = new Image([imageData])

    // console.dir(updatedImage)
    
}

function handleChange(event){
    event.preventDefault()
    console.log("change detected")
}


    return <>
    <h2>This will be the canvas</h2>
    <canvas
    id="canvas"
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={draw}
    ref={canvasRef}
    onChange={handleChange}></canvas>
    <canvas ref={secondCanvasRef} style={{'height': '301px', 'width': '602px'}}></canvas>
    {/* <img ref={imageRef} style={{'height': '301px', 'width': '602px'}}></img> */}
    </>
}