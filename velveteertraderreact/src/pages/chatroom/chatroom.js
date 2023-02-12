import React, { Component, useEffect, useState ,useContext, useRef} from 'react';
import {InformationContext} from "../../App"
import Style from "./chatroom.css";
import io from "socket.io-client";
import openSocket from 'socket.io-client';

const Chatroom = function(props){

  var socketlist = [];

  const socket = openSocket("http://localhost:3002", {
   withCredentials: false,
  autoConnect:false,
  // reconnection:false,
  transports: ["websocket", "polling"]
});

// const socket = openSocket ("wss://ladyleonorasgamingroom.herokuapp.com/",{autoConnect:false,

// transports:["websocket","polling"]
// });
const [displayUsersList, setDisplayUsersList]=useState([])

const calculateUSerDisplay = ()=>{

  let displayUserArray = []
  let displayUserNamesArray = []
  let displayUsersNames = users.map(function(item){
    return(item.name)
  })
  // console.log("calculate user display %%%%%%%%%%%5")
  // console.log(displayUsersNames)
  users.forEach(element => {
    // console.log(element)
    // console.log(users)
    // console.log(element.name)
    // console.log(displayUserArray)
    // console.log(displayUserNamesArray.indexOf(element.name))
    if(displayUserNamesArray.indexOf(element.name)==-1){
      displayUserNamesArray.push(element.name)
     displayUserArray.push(element)
    }
 setDisplayUsersList(displayUserArray)
  });
  
}
const [chatWindow, setChatWindow]= useState("off")
const [currentDisplay, setCurrentDisplay]= useState("");
const {userProfile, setUserProfile}= useContext(InformationContext)
const chatwindowRef = useRef();
const [chat, setChat] = useState("off");
const [users, setUsers] = useState([]);
const [message, setMessage] = useState("");
const [messages, setMessages] = useState([]);
// console.log(userProfile.userName)
//  window.onbeforeunload = function(e) {
//   socket.disconnect();
// };
useContext(()=>{
  // socket.open()
  socket.emit("manualDisconnect")
},[userProfile])


useEffect(()=>{
  console.log("sdsada calculating user display")
calculateUSerDisplay()

},[users])


  useEffect(() => {


  if(chat=="on"){
  console.log("chat is on")

  socket.connect();

  socket.on("connect", function () {
  // console.log("clientsideworks")
  socket.open();
  socket.emit("username", userProfile.userName);
    })
    //set all the users in the chatroom 
    socket.on("users", (users) => {
      console.log("users ####")
      console.log(users)
      setUsers( users);
    });
    //when receiving messages
    socket.on("message", (message) => {
      // console.log("message")
      // console.log(message);
      //push the message into the messages array
      setMessages((messages) => [...messages, message]);
      // console.log(chatwindowRef.current.scrollTop);
      // chatwindowRef.current.scrollTop = chatwindowRef.current.scrollHeight;
      // console.log(chatwindowRef.current.scrollHeight);
      // console.log(chatwindowRef.current.scrollTop)
    });
    // as other players connect to the server, the player's name is pushed into the list of players
    socket.on("connected", (user) => {
      setUsers((users) => [...users, user]);
      console.log("connected++++++++++++")
      console.log(user)
    });

     socket.on("disconnected", id => {
      // console.log(id)
      setUsers((users) => {
      return users.filter((user) => user.id!==id);
      });


    });
  }
  else{

console.log("chat is off")

 

  }
    

  }, [chat]);

  const toggleChat = function(e){
    e.preventDefault()
    e.stopPropagation()
    // console.log(chat)
    if(chat=="on"){
      setChat("off")
    }
    else{
      setChat("on")
    }
    // console.log(chat)
  }

  const handleMessageOut = (event) => {
    // console.log(message)
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
      {chat == "on"? (
        <div>
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
                {displayUsersList.map(({ name, id }) => (
                  <li key={id} id = {id}>{name}</li>
                ))}
              </ul>
            </div>
            </div>
            ):(<div> turn on chat </div>)}
            <div className = "chatOnButton" onClick={function(){setChat("on")}}>start Chatting</div>
            <div className = "chatOnButton" onClick={function(e){toggleChat(e)}}>start Chatting</div>

      </div>
    )
}

export default Chatroom;
