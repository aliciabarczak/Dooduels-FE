import { useEffect, useRef, useState } from "react"
import "../../Styling/Game-page.css"

export default function Canvas() {

const canvasRef = useRef(null)
const contextRef = useRef(null)

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

},[])

function startDrawing({nativeEvent}) {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
}

function finishDrawing() {
    contextRef.current.closePath()
    setIsDrawing(false)
}

function draw({nativeEvent}) {
    if (!isDrawing) {
        return
    }
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
}


    return <>
    <h2>This will be the canvas</h2>
    <canvas
    id="canvas"
    onMouseDown={startDrawing}
    onMouseUp={finishDrawing}
    onMouseMove={draw}
    ref={canvasRef}></canvas>
    </>
}