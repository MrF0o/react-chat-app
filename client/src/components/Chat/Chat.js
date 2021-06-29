import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Message from "../Message/Message";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  let [roomCode, setRoomCode] = useState("");
  let [userName, setUserName] = useState("");
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);

  const ENDPOINT = "192.168.1.4:5000";

  useEffect(() => {
    const { roomcode, username } = queryString.parse(location.search);
    console.log(roomcode, username);

    socket = io(ENDPOINT);

    setRoomCode(roomcode);
    setUserName(username);

    socket.emit("join", roomcode, username);

    return () => {
    //   socket.disconnect();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    // TODO: socket.on("welcome", (text) => console.log(text));
    socket.on("messagerecv", ({id, text}) => {
        console.log(`message recieved from ${id} contains ${text}`);

        const msg = {text: text, iscoming: true, sender: id};
        setMessages(messages => [...messages, msg]);
    });
  }, []);

  function sendMessage( e) {
    socket.emit("message", {text: message, room: queryString.parse(location.search).roomcode, sender: userName});

    const msg = {text: message, iscoming: false};
    setMessages(messages => [...messages, msg]);

    console.log('a message just sent');

    e.target.value = "";
    message = "";
  }

  return (
    <div className="container">
      <div className="appContainer">
        <div className="roomTitle">
            {queryString.parse(location.search).roomcode}
        </div>

        <div className="chatbox">
            {messages.map((msg, i) => <Message text={msg.text} isincoming={msg.iscoming} sender={msg.sender} key={i} />)}
        </div>

        <div className="toolbox">
            <input type="text" className="input" placeholder="Click to Type" onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null}
                onChange={ (event) => setMessage(event.target.value)}/>
            {/*TODO: <button className="emojis" ></button> */}
        </div>
      </div>
    </div>
  );
};

export default Chat;
