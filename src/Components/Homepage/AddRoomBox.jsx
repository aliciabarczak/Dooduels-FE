import "./../Homepage.css";
export default function AddRoomBox() {
  return (
    <div className="AddRoomBox">
      <h2>Add Room</h2>
      <form className="dropdown">
        <label>Select Mode:</label>
        <select>
          <option value="BMW">Easy</option>
          <option value="Medium"> Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <div className="RoomName">
          <label> Room name</label>
          <input
            type="text"
            className="roomNameInput"
            placeholder="Room Name"
          />
        </div>
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}
