export default function fourFingersAreClose(fingerTip1, fingerTip2, fingerTip3, fingerTip4) {
  
    if ((fingerTip1.x - fingerTip2.x < 0.1 && fingerTip1.x - fingerTip2.x >= 0)
        &&
        (fingerTip1.y - fingerTip2.y < 0.1 && fingerTip1.y - fingerTip2.y >= 0)
        
        &&

        (fingerTip1.x - fingerTip3.x < 0.3 && fingerTip1.x - fingerTip3.x >= 0)
        &&
        (fingerTip1.y - fingerTip3.y < 0.3 && fingerTip1.y - fingerTip3.y >= 0)

        &&

        (fingerTip1.x - fingerTip4.x < 0.6 && fingerTip1.x - fingerTip4.x >= 0)
        &&
        (fingerTip1.y - fingerTip4.y < 0.9 && fingerTip1.y - fingerTip4.y >= 0)
        )
        {
            return true
        } else return false
}