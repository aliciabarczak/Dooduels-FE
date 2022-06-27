import "./../Homepage.css";
const Options = () => {
  return (
    <div className="Homepage-Options">
      <p onClick={console.log} className="button">
        Add Room
      </p>
      <form>
        <label>
          <input type="text" placeholder="Search room..." />
        </label>
      </form>
    </div>
  );
};

export default Options;
