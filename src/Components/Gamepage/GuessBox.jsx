import { set } from "firebase/database";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import userContext from "../../contexts/userContext.js";
import { onValue, ref } from "firebase/database";
import db from "../../db/db.js";
import newRound from "../../helpers/newRound.js";
import "../../Styling/Game-page.css";

const GuessBox = () => {
  const [words, setWords] = useState(["cat", "dog", "bird"]);
  const [currWord, setCurrWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );

  const { loggedUser } = useContext(userContext);
  const [input, setInput] = useState("");
  const [regex, setRegex] = useState(new RegExp(currWord, "gi"));
  const { room_id } = useParams();
  const [seconds, setSeconds] = useState(60);
  const [currentInterval, setCurrentInterval] = useState(null);
  const [points, setPoints] = useState(60);

  useEffect(() => {
    setWords(words.filter(filterWords));
    setRegex(new RegExp(currWord, "gi"));
    const playersRef = ref(db, `rooms/${room_id}/players`);
    onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      for (let key in players) {
        if (
          players[key].hasOwnProperty("guess") &&
          players[key].guess.toLowerCase() === currWord.toLowerCase()
        ) {
          setCurrWord(words[Math.floor(Math.random() * words.length)]);
          setSeconds(60);
          // newRound(timeRemaining, guesser);
        }
      }
    });

    if (!currentInterval) {
      const interval = setInterval(() => {
        setSeconds((currSeconds) => currSeconds - 1);
      }, 1000);
      setCurrentInterval(interval);
    }
  }, [currWord]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(currentInterval);
      setCurrentInterval(null);
    }
  }, [seconds]);

  const filterWords = (word) => {
    if (word !== currWord) {
      return word;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const playerGuessRef = ref(
      db,
      `rooms/${room_id}/players/${loggedUser.user_id}/guess`
    );
    set(playerGuessRef, input);
    setPoints(seconds);
  };

  return (
    <>
      <div className="seconds">
        {seconds <= 0 ? <p>time up!</p> : <p>{seconds}</p>}
      </div>
      <section className="guess-box">
        <p>{currWord}</p>
        <form onSubmit={handleSubmit}>
          <label>Guess the word!</label>
          <input
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
};

export default GuessBox;
