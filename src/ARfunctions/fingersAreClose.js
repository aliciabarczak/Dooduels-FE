export default function fingerTipsAreClose(fingerTip1, fingerTip2) {
  
    if ((fingerTip1.x - fingerTip2.x < 0.1 && fingerTip1.x - fingerTip2.x > -0.1)
        
        &&
        (fingerTip1.y - fingerTip2.y < 0.1 && fingerTip1.y - fingerTip2.y > -0.1)) {
            return true
        } else return false
}