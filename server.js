// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var Axios =require ("axios");
const { createProxyMiddleware } = require('http-proxy-middleware');

const passportControl = require('./config/passport');
const compression = require("compression");

var express = require("express");
var bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(compression())

var cors = require('cors');
app.use(cors());
    app.use(
        // Do not use `/ws` as it conflicts with create-react-app's hotrefresh socket.
        createProxyMiddleware('/websocket', {
            target: 'http://localhost:3001',
            ws: true,
            changeOrigin: true,
        })
      );


var PORT = process.env.PORT || 3001;
const server = require("http").createServer(app);

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials:false
};
const io = require('socket.io')(server,
{
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
    credentials: false
  }
  ,  transports: ["websocket", "polling"],

   allowEIO3: true 
}
);


// Requiring our models for syncing
var db = require("./models");
var session = require("express-session");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Static directory
// app.use(express.static("public"));
app.use(
	session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
  );
  app.use(passportControl.initialize());
  app.use(passportControl.session());
// Routes
// =============================================================
require("./routes/api-routes")(app);

const users = {};
io.on("connection", client => {
  client.on("username", username => {
    console.log(username)
    const user = {
      name: username,
      id: client.id
    };
    users[client.id] = user;
    console.log(user);
    console.log(users);
    console.log(client.id)
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  client.on("send", message => {
    console.log(message);
    console.log(client.id)
    console.log(users)
    console.log(users[client.id])
    var id = client.id;
    console.log(id)
    io.emit("message", {
      text: message.message,
      date: new Date().toISOString(),
      user: message.username
    });
  });

  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", client.id);
  });
});


db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    

  
  });
});