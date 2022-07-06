import "./../../Styling/HeaderAnimation.css";
export default function HeaderAnimation({ showPopUp }) {
  return (
    <div className={showPopUp ? "balckoutAnimatedHeader" : "animatedHeader"}>
      <div className={showPopUp ? "balckoutAnimatedHeader" : "graphic-header"}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={showPopUp ? "balckoutAnimatedHeader" : "wrapper"}>
        <p>D</p>
        <p>O</p>
        <p>O</p>
        <p>D</p>
        <p>u</p>
        <p>e</p>
        <p>l</p>
        <p>s</p>
      </div>
    </div>
  );
}
