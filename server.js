// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var Axios =require ("axios");
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

var PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require("./models");
var session = require("express-session");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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



// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    

  
  });
});
