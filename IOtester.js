var io = require("socket.io-client")

const socket = io("ws://localhost:3001");
console.log(socket)
// send a message to the server
socket.emit("message", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("send", (...args) => {
    console.log(args)
  // ...
});