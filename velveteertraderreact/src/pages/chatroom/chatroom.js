import React, { Component, useEffect, useState , usecontext, useContext, useRef} from 'react';
import {InformationContext} from "../../App"
import Style from "./chatroom.css";
import io from "socket.io-client";
// import { set } from "mongoose";
import openSocket from 'socket.io-client';
const Chatroom = function(props){

    const socket = io("http://localhost:3001", {autoConnect:false,
  transports: ["websocket", "polling"]
});
// const socket = openSocket ("wss://ladyleonorasgamingroom.herokuapp.com/",{autoConnect:false,

// transports:["websocket","polling"]
// });

const [currentDisplay, setCurrentDisplay]= useState("");
const {userProfile, setUserProfile}= useContext(InformationContext)
const [users, setUsers] = useState(
  []
);
const [messages, setMessages]=useState([]);

const chatwindowRef = useRef();
const [chat, setChat] = useState("on");

  useEffect(() => {
  
    if(userProfile.userName.length>0){
    socket.connect();
    socket.on("connect", function () {
      // console.log("clientsideworks")
      socket.emit("username", userProfile.userName);
    });}
    //set all the users in the chatroom 
    socket.on("users", (users) => {
      setUsers( users);
    });
    //when receiving messages
    socket.on("message", (message) => {
      // console.log(message);
      // var id = message.id
      // console.log(users[id])
      //push the message into the messages array
      setMessages((messages) => [...messages, message]);
      // console.log(chatwindowRef.current.scrollTop);
      chatwindowRef.current.scrollTop = chatwindowRef.current.scrollHeight;
      // console.log(chatwindowRef.current.scrollHeight);
      // console.log(chatwindowRef.current.scrollTop)

      
    });
    // as other players connect to the server, the player's name is pushed into the list of players
    socket.on("connected", (user) => {
      setUsers((users) => [...users, user]);
    });

    //once this client receives the broadcasted sentence
    //the sentence is set as the display
    //sentence.player is the prodcasted next player in line
    //the sentence is also sent to the allsentences variable
    //if this client's username == the prodcasted name, 
    // the turn ariable is turned on and the player can type into the input div


    
    //on another player's disconnect, the cient gets the emit, and rids the player
    //from the list
    socket.on("disconnected", id => {
      setUsers((users) => {
        return users.filter((user) => user.id!==id);
      });
    });
  }
  , [userProfile]);




    return(
      <div>
        <div className="usersContainer">
          {!users.length?(
            <div>users</div>
          ) : ( 
            <div>
            {users.map(({user,id}, index)=>(
              <div
              ksy={index}>user</div>
            ))}</div>
            )
          }
          
        </div>


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
      </div>

      
    )
}

export default Chatroom;
