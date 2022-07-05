import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import userContext from "../../contexts/userContext";
import db from "../../db/db";
import { getCurrentWord, getWordSetWord } from "../../db/word-utils";

const GuessBox = ({ room_id, room }) => {
  let words = [
    "dog",
    "cat",
    "hippo",
    "snake",
    "zebra",
    "spider",
    "axolotl",
    "dragon",
    "monkey",
    "ostrich",
    "penguin",
    "elephant",
    "reindeer",
    "swordfish",
    "armadillo",
    "gong",
    "harp",
    "piano",
    "drums",
    "guitar",
    "violin",
    "trumpet",
    "ukulele",
    "clarinet",
    "bagpipes",
    "saxophone",
    "harmonica",
    "running",
    "jumping",
    "dancing",
    "flying",
    "sitting",
    "walking",
    "waving",
    "washing",
    "writing",
    "driving",
    "reading",
    "talking",
    "sky",
    "tree",
    "lake",
    "rock",
    "river",
    "cloud",
    "flower",
    "forest",
    "bonfire",
    "mountain",
    "cliffside",
    "waterfall",
    "car",
    "bus",
    "bicycle",
    "caravan",
    "hospital",
    "motorway",
    "building",
    "ambulance",
    "firetruck",
    "motorcycle",
  ];
  const [currWord, setCurrWord] = useState("");
  const [input, setInput] = useState("");
  const [regex, setRegex] = useState("");
  const { loggedUser } = useContext(userContext);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (loggedUser.user_id === room.host.user_id) {
      setIsHost(true);
    }

    setRegex(new RegExp(currWord, "gi"));
  }, [currWord]);

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentWord(room_id).then((word) => {
        setCurrWord(word);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (regex.test(input)) {
      getWordSetWord(room_id).then((word) => {
        setCurrWord(word);
      });
    }
  };

  return (
    <section className="guess-box">
      {isHost ? (
        <p>{currWord}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>{currWord}</p>
          <label>Guess the word!</label>
          <input onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  );
};

export default GuessBox;
