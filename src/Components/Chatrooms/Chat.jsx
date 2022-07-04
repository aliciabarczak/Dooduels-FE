import { onValue, push, ref } from "firebase/database";
import { useEffect, useState, useRef, useContext } from "react";
import db from "../../db/db";
import userContext from "../../contexts/userContext.js";

export default function Chat({ roomID }) {
  const [messageText, setMessageText] = useState("");

  const [messages, setMessages] = useState([]);
  const messagesRef = ref(db, "rooms/" + roomID + "/messages");

  const { loggedUser } = useContext(userContext);

  const chatWindow = useRef(null);

  function handleMessage() {
    push(messagesRef, { sender: loggedUser.user_name, message: messageText });
  }

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      let allMessages = snapshot.val();
      let messagesArray = [];
      for (let message in allMessages) {
        messagesArray.push(allMessages[message]);
      }
      setMessages(messagesArray);
    });
    chatWindow.current.scrollTo({ bottom: 0, behaviour: "smooth" });
  }, []);

  return (
    <div>
      <section id="chat-window" ref={chatWindow}>
        <ul>
          {messages.length
            ? messages.map((msg) => {
                return (
                  <li key="index">
                    {msg.sender}: {msg.message}
                  </li>
                );
              })
            : null}
        </ul>
      </section>

      <input
        value={messageText}
        type="text"
        onChange={(event) => {
          setMessageText(event.target.value);
        }}></input>
      <button onClick={handleMessage}>SEND</button>
      <div></div>
    </div>
  );
}
