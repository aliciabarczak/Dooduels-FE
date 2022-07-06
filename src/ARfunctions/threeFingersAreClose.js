export default function threeFingersAreClose(fingerTip1, fingerTip2, fingerTip3) {
  
    if ((fingerTip1.x - fingerTip2.x < 0.1 && fingerTip1.x - fingerTip2.x >= 0)
        
        &&
        (fingerTip1.y - fingerTip2.y < 0.1 && fingerTip1.y - fingerTip2.y >= 0)
        
        &&
        (fingerTip1.x - fingerTip3.x < 0.3 && fingerTip1.x - fingerTip3.x >= 0)
        &&
        (fingerTip1.y - fingerTip3.y < 0.3 && fingerTip1.y - fingerTip3.y >= 0)
        )
        {
            return true
        } else return false
}