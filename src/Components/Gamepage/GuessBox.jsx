import { get, onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import userContext from "../../contexts/userContext";
import db from "../../db/db";
import { awardPointsToUser } from "../../db/utils";
import { getCurrentWord, getWordSetWord } from "../../db/word-utils";

const GuessBox = ({ room_id, room }) => {
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
      awardPointsToUser(10, loggedUser.user_id);
      const playerPointsRef = ref(
        db,
        `rooms/${room_id}/players/${loggedUser.user_id}/points`
      );
      get(playerPointsRef).then((snapshot) => {
        const playerPoints = snapshot.val();
        console.log(playerPoints);
        set(playerPointsRef, playerPoints + 10);
      });
      getWordSetWord(room_id).then((word) => {
        setCurrWord(word);
        setInput("");
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
