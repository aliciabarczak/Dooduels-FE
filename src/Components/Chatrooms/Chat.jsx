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
        let message_id = message;
        allMessages[message].message_id = message_id;
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
            ? messages.map((msg, index) => {
                return (
                  <li
                    key={msg.message_id}
                    className={index % 2 === 0 ? "lightInput" : "darkInput"}>
                    <span id="msgSender">{msg.sender} :</span>
                    <span id="msg">{msg.message}</span>
                  </li>
                );
              })
            : null}
        </ul>
      </section>
      <input
        className="chatInput"
        value={messageText}
        type="text"
        onChange={(event) => {
          setMessageText(event.target.value);
        }}></input>
      <button className="chatBttn" onClick={handleMessage}>
        SEND
      </button>
      <div></div>
    </div>
  );
}
