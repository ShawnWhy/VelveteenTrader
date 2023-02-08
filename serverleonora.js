
const express = require('express');
const ghosts = require("./utility/ghosts")
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server, {
  transports: ["websocket", "polling"]
})




app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,  "leonorasgamingtable/build", "index.html"));
});
const PORT = process.env.PORT || 3002 ;
// players with custom   IDs
  const users ={}  
//   all of the players names in an array
  //player's turn
  //all of the sentences
  var usernames={
    1:[],
    2:[],
    3:[],
    4:[],
    5:[],
    6:[],
    7:[],
    8:[],
  }
//   all of the players names in an array
  //player's turn
  var i= {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0
    };
//all of the couplets  
var sentences = {
  1:[],
  2:[], 
  3:[],
  4:[],
  5:[],
  6:[],
  7:[],
  8:[],


};

var currentPlayer = {
  1:"",
  2:"",
  3:"",
  4:"",
  5:"",
  6:"",
  7:"",
  8:""
}

const nextPlayer = function(room,players){
  console.log("nextplayer")

  console.log(room)

  console.log("curret i")
  console.log(i[room])
  console.log(players)

//   i[room]++
//   console.log("next i")
//   console.log(i[room])

//  if (i[room]>players.length-1){
//   i[room]=0
//   console.log("i = 0 now")  
// }
if(players[i[room]]){
currentPlayer[room]= players[i[room]].name
console.log("currentplayer")
console.log (currentPlayer[room])
    io.to(room).emit("nextPlayer",players[i[room]].name)
    i[room]++
    if(i[room]>players.length-1){
        i[room]=0
    }    
  } 
}





  io.on("connection", client => {

    
//    
    //the client is to receive a username
  client.on("username", username => {
  user = {
      name: username.userName,
      id: client.id,
      room:username.room
    };
    var room = username.room
      if (usernames[room].indexOf(username.userName)!==-1){
        console.log("useralreadyexists")
        client.emit("rejected")
        client.disconnect();
      }
      else{
      usernames[room].push(username.userName)
      client.join(username.room)
      users[client.id] = user;
      client.broadcast.to(room).emit("connected", user);
      var players = Object.values(users)
      players = players.filter((player)=>player.room===room)
      if (players.length<2){
        console.log("there is only one person")
        console.log(i[room]);
        i[room] =0
        currentPlayer[room] = username.userName
      }
      var host = ghosts[room].name;
      host={name:host,
            id:1}
      console.log(host)
      players.push(host)
      console.log(players)
      console.log(i[room])
      io.to(room).emit("users", players);
      if(players[0]){
    // console.log(players[0].name)}
    //if there are players in the room, the game starts
    if(players.length>0){
        console.log("start");
        console.log("start current player")
        console.log(currentPlayer[room])

      client.emit("start", {
        sentences:sentences[room],
       currentPlayer:currentPlayer[room]
      })
      i[room]++
      if( i[room] > players.length-2){
        i[room]=0;
            
      }
    }
  }
}}
);

//the next play button prompts the next player in quo to have input enabled

client.on("nextPlayer",room=>{
  var room = room 
  var players = Object.values(users);
  players = players.filter((player)=>player.room===room);
  nextPlayer(room, players);

}

)
  //when a player emit a sentence, it is received here and is broadcasted to others
  client.on("sentence", sentence=>{
      // console.log("received sentence")
      // console.log(sentence)
      // console.log(i)
    var room = sentence.room
    sentences[room].push(sentence.sentence);
    var players = Object.values(users) 
    players = players.filter((player)=>player.room===room)
    console.log(players)
    console.log(i[room])
    if(players[i[room]]){
    currentPlayer[room]=players[i[room]].name
//broadcasted to otheres and also emit the next player in line to others
    io.to(room).emit("sentenceBroadcast",{
      text:sentence.sentence,
      player:players[i[room]].name
    })
    // console.log("server emitted sentencec")
    i[room]++
    if(i[room]>players.length-1){
        i[room]=0
    }
}
})

//the server receives the message
  client.on("send", message => {
    var room = message.room
      // console.log(message)
    //server emit the message to other players
    io.to(room).emit("message", {
      text: message.message,
      date: new Date().toISOString(),
      user: message.username
    });
  });

  client.on("disconnect", () => {
    var username = users[client.id];
    // username = username.username;
    // console.log("loggedout")
    // console.log(username)
    delete users[client.id];
    io.emit("disconnected", client.id);
  });

client.on("sendToGhost", (message)=>{
  // console.log("ghost received")
  // console.log(message);
  var room = message.room;
  io.to(room).emit("message", {
    text: message.message,
    date: new Date().toISOString(),
    user: message.username
    
  });

  setTimeout(() => {
  var quoteLength = ghosts[room].quotes.length;
  var randomNumber = Math.floor(Math.random() * quoteLength)
  
  console.log(randomNumber)
  var ghostMessage = ghosts[room].quotes[randomNumber]
  console.log(ghostMessage)
  io.emit("message",{
    text:ghostMessage,
    date: new Date().toISOString(),
    user:ghosts[room].name

  })
    
  }, 100);
  
  
})
});

// users.filter((user) => user.id!==id);
  

server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  
  });