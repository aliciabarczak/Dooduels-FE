import { get, onChildAdded, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import db from "../../db/db";

export default function Chat({ roomID }) {
  const [messageText, setMessageText] = useState("");
  const [selectedUser, setSelectedUser] = useState("Phill");
  const [messages, setMessages] = useState([]);
  const messagesRef = ref(db, "rooms/" + roomID + "/messages");

  function handleMessage() {
    console.log(`sending message from ${selectedUser}`);
    console.log(messageText);

    push(messagesRef, { sender: selectedUser, message: messageText });
  }

  useEffect(() => {
    // onChildAdded(messagesRef).then((snapshot) => {
    //   let message = snapshot.val();
    // });
  }, []);

  console.log(messages, "<<< messages");
  return (
    <div>
      <ul>
        {messages.map((msg) => {
          return (
            <li key={msg}>
              {msg.sender}
              {msg.text}
            </li>
          );
        })}
      </ul>

      <h1>{roomID}</h1>
      <input
        value={messageText}
        type="text"
        onChange={(event) => {
          setMessageText(event.target.value);
        }}
      ></input>
      <button onClick={handleMessage}>SEND</button>
      <div>
        <button
          onClick={() => {
            setSelectedUser("Phill");
          }}
        >
          Phill
        </button>

        <button
          onClick={() => {
            setSelectedUser("Lewis");
          }}
        >
          Lewis
        </button>

        <button
          onClick={() => {
            setSelectedUser("Alicia");
          }}
        >
          Alicia
        </button>

        <button
          onClick={() => {
            setSelectedUser("Javier");
          }}
        >
          Javier
        </button>
      </div>
    </div>
  );
}
