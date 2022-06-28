import { useState } from "react";
export default function ExpandibleRooms({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <>
      {showChildren ? children : null}
      <p
        className="showButton"
        onClick={() => setShowChildren((currShowing) => !currShowing)}>
        Show {showChildren ? "Less" : "All"}
      </p>
    </>
  );
}
