import React, { Component, useEffect, useState , usecontext, useContext, useRef} from 'react';
import {InformationContext} from "../../App"
import Style from "./chatroom.css";
import io from "socket.io-client";
import openSocket from 'socket.io-client';

const Chatroom = function(props){

  const socket = io("http://localhost:3002", {
   withCredentials: false,
  autoConnect:false,
  transports: ["websocket", "polling"]
});

// const socket = openSocket ("wss://ladyleonorasgamingroom.herokuapp.com/",{autoConnect:false,

// transports:["websocket","polling"]
// });

const [currentDisplay, setCurrentDisplay]= useState("");
const {userProfile, setUserProfile}= useContext(InformationContext)
const chatwindowRef = useRef();
const [chat, setChat] = useState("on");
const [users, setUsers] = useState([]);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
console.log(userProfile.userName)
//  window.onbeforeunload = function(e) {
//   socket.disconnect();
// };

  useEffect(() => {
  socket.close()
  socket.disconnect()
  socket.connect();

  socket.on("connect", function () {
  console.log("clientsideworks")
  socket.open();
  socket.emit("username", userProfile.userName);
    })
    //set all the users in the chatroom 
    socket.on("users", (users) => {
      setUsers( users);
    });
    //when receiving messages
    socket.on("message", (message) => {
      console.log("message")
      console.log(message);
      //push the message into the messages array
      setMessages((messages) => [...messages, message]);
      console.log(chatwindowRef.current.scrollTop);
      chatwindowRef.current.scrollTop = chatwindowRef.current.scrollHeight;
      console.log(chatwindowRef.current.scrollHeight);
      // console.log(chatwindowRef.current.scrollTop)
    });
    // as other players connect to the server, the player's name is pushed into the list of players
    socket.on("connected", (user) => {
      setUsers((users) => [...users, user]);
      console.log("connected")
    });

     socket.on("disconnected", id => {
      console.log(id)
      setUsers((users) => {
        return users.filter((user) => user.id!==id);
      });


    });

  }, [userProfile]);

  const handleMessageOut = (event) => {
    console.log(message)
    event.preventDefault();
    var newMessage = {
      message: message,
      username: userProfile.userName,
    };
    socket.open();
    socket.emit("send", newMessage);
    setMessage("");
  };
    return(
      <div>
      <div className = "welcomeScreen">
        welcome {userProfile.userName}

      </div>
      <div className=" chatWindow">
      {!messages.length ? (
                <h1 className="chat-title">Speak</h1>
                 ) : (
                 <div  ref= {chatwindowRef} className={"messageBox "+(chat==="on"?"onChatbox":"")}> 
                  {messages.map(({ user, date, text }, index) => (
                    <div
                      key={index}
                    
                      className={user === userProfile.userName ? "toLeft" : "toRight"}
                    >
                      {user}: {text}{" "}
                    </div>
                  ))}
                </div>
              )}    
      </div>

           <input className="chatBox"
              type="text"
              placeholder="message"
              value={message}
              onChange={(event) => setMessage(event.currentTarget.value)}
            />
            <button className="chatBtn" onClick={handleMessageOut}>submit</button>

            <div className="col-md-4 remove">
              <h3>Users</h3>
              <ul id="users">
                {users.map(({ name, id }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </div>
      </div>
    )
}

export default Chatroom;
