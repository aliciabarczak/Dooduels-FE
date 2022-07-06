export default function fistIsClosed(landmarks) {
  
    if ((landmarks[4].x - landmarks[8].x < -0.05)
        &&
        (landmarks[4].y - landmarks[8].y > 0)
        &&
        (landmarks[4].y - landmarks[12].y > 0)
        &&
        (landmarks[4].y - landmarks[16].y > 0)
        )
        {
            return true
        } else return false
}