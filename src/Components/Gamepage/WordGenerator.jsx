import { addWords, getWordSetWord, hideWord } from "../../db/word-utils";
import userContext from "../../contexts/userContext";

import { useState, useEffect, useContext } from "react";

export default function WordGenerator({ room, room_id }) {
  const { loggedUser } = useContext(userContext);

  const [word, setWord] = useState("");
  const [hiddenWord, setHiddenWord] = useState("");

  useEffect(() => {
    //retrieves new word from database, updates word in state, removes word from database
    getWordSetWord(room_id, setWord); // <<<<<---- This needs to be invoked at the end of a round.

    // generates an obscured version of the current word in state
    hideWord(word, setHiddenWord);
  }, [word]);

  return (
    <>
      {loggedUser.user_id === room.host.user_id ? (
        <h1>{word}</h1>
      ) : (
        <h1>{hiddenWord}</h1>
      )}
    </>
  );
}
