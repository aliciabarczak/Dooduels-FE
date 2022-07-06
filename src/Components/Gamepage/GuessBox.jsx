import { get, onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import userContext from "../../contexts/userContext";
import db from "../../db/db";
import { awardPointsToUser } from "../../db/utils";
import { getCurrentWord, getWordSetWord } from "../../db/word-utils";
import words from "../../helpers/words.js";

const GuessBox = ({ room_id, room , setHostPoints}) => {

  const [currWord, setCurrWord] = useState("");
  const [input, setInput] = useState("");
  const [regex, setRegex] = useState("");
  const { loggedUser } = useContext(userContext);
  const [isHost, setIsHost] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null)
  const [seconds, setSeconds] = useState(0)
  const [alertMessage, setAlertMessage] = useState("START")
  const [alertShowing, setAlertShowing] = useState(false)
  const alertRef = ref(db, `rooms/${room_id}/alert`)

  useEffect(()=> {
    setInterval(()=>{
      getCurrentWord(room_id)
      .then((word) => {
        setCurrWord(word)
      })
    }, 1000)
  },[])



  useEffect(()=> {
    if (!currentTimer) {
      const timer = setInterval(()=>{
          setSeconds((currentSeconds)=> {
            if (currentSeconds > 0) {
              return currentSeconds - 1
            } else return 0
          })
    }, 1000)
    setCurrentTimer(timer)
    }
  },[])

  useEffect(()=>{
    set(alertRef, "START!")
  },[])

  if (seconds === 0) {
    set(alertRef, `no-one guessed ${currWord}!`)
    getWordSetWord(room_id).then((word) => {
      setCurrWord(word);
      setInput("");
    });
    clearInterval(currentTimer)
    const timer = setInterval(()=>{
          setSeconds((currentSeconds)=> {
            if (currentSeconds > 0) {
              return currentSeconds - 1
            } else return 0
          })
    }, 1000)
    setCurrentTimer(timer)
    setSeconds(60)
  }

  useEffect(()=> {
    onValue(alertRef, (snapshot => {
      const message = snapshot.val()
      setAlertMessage(message)
      setAlertShowing(true)
      setTimeout(()=>{
        setAlertShowing(false)
        setSeconds(60)
      }, 3000)
    }))
  }, [])

  useEffect(() => {
    if (loggedUser.user_id === room.host.user_id) {
      setIsHost(true);
    }

    setRegex(new RegExp(currWord, "gi"));
  }, [currWord]);


  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (regex.test(input)) {
      setHostPoints(current => {
        return current + seconds
      })
      awardPointsToUser(seconds, loggedUser.user_id);
      awardPointsToUser(seconds, room.host.user_id)
      const playerPointsRef = ref(db, `rooms/${room_id}/players/${loggedUser.user_id}/points`);
      get(playerPointsRef).then(snapshot => {
        const playerPoints = snapshot.val();
        set(playerPointsRef, playerPoints + seconds);
      });

      const hostPointsRef = ref(db, `rooms/${room_id}/host/points`);
      get(hostPointsRef).then(snapshot => {
        const hostPoints = snapshot.val();
        console.log("giving points to host")
        set(hostPointsRef, hostPoints + seconds);
      });
      
      set(alertRef, `${loggedUser.user_name} guessed ${currWord}! ${seconds} points`)
      

      getWordSetWord(room_id).then((word) => {
        setCurrWord(word);
        setInput("");
      });
    }
  };


  return (
    <>
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
    <section className="timer">
      <p>{seconds}</p>
    </section>

    { alertShowing ? <section className="alertMessage">
      <p>{alertMessage}</p>
    </section> : null}
   </>
  );
};

export default GuessBox;
