

// Requiring our models
var db = require("../models");
var passport = require("passport");
var connection =require("./connection");

 

// var mysql = require("mysql");
// const { ConnectionError } = require("sequelize");
module.exports = function(app) {

  app.get("/api/getFavs",
    function(req, res){
      Connection.query ("SELECT * FROM Items ORDER By votes DESC Limit 10",function(err, data){if(err) throw err;
       console.log("got top picks");
       res.json(data)
      })
    });

  app.get("/api/allItems",
  function(req, res){
    connection.query("SELECT * FROM Items JOIN Users ON Items.itemOwnerId = Users.id", function(err, data){
    if(err) throw err, 
    console.log("got them all");
    res.json(data)
  })
})

app.get("/api/alltheItems",
function(req, res){
  connection.query("SELECT * FROM items", function(err, data){
  if(err) throw err, 
  res.json(data)
})
})

  app.get("/api/items/:id", function(req, res){
    userId = req.params.id;
    conenction.query("SELECT * FROM Item RIGHT JOIN User ON Item.itemOwnerId = User.id LEFT JOIN Bid ON Item.id = Bid.bidItemId WHERE ItemOwnerId = ?", userId,
    function(err, data){
      if(err) throw err;
      console.log("got the item for this guy")

    })
  })

  app.get("/api/itemDetails/:id", function(req,res){
    itemId = req.params.id;
    connection.query("SELECT * FROM Item LEFT JOIN Bid on Bid.bidItemId = Item.id LEFT JOIN Message ON Message.itemId = Item.id LEFT JOIN Bid on Bid.bidItemId = Item.id WHERE Item.id=?",
    itemId,function(err, data){
      if(err) throw err;
      res.json(data)
    })
  })

  app.post("/api/signUp", function(req, res) {
    console.log(req.body)
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        console.log(err)
        res.status(401).json(err);
      });
  });

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
  });
  
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout()
    .then(function(data){
      res.json(data);
    })
    .catch(function(err){
      res.json(err);
    }
    )

    })
    


  
  app.post("/api/createItem",
  function(req, res){
    db.Item.create({
      itemOwnerId : req.body.itemOwnerId,
      itemName:req.body.itemName,
      itemStory : req.body.itemStory,
      votes : 0,
      highestBid:0,
      imageUrl1: req.body.imageUrl1,
      imageUrl2: req.body.imageUrl2,
      imageUrl3: req.body.imageUrl3,
      modelLink: req.body.modelLink
    }).then(function(err,result){
    if(err) throw err, 
    res.json(result)
  })
})


  app.post("/api/createBid",
  function(req, res){
    db.Bid.create({
      bidderId:req.body.BidderId,
      bidItemId:req.body.bidItemId,
      bidAmount:req.body.bidAmount,
      
    }).then(function(err,result){
    if(err) throw err, 
    console.log("postedbid");
    res.json(result)
  })
})

  app.post("/api/createMessage",
  function(req, res){
    db.Message.create({
      itemID:req.body.itemId,
      posterID:req.body.posterId,
      message:req.body.message,
    }).then(function(err,result){
    if(err) throw err, 
    console.log("postedmessage");
    res.json(result)
  })
})

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
     // if the user is succesfully logged in , all of the user information would be given 
     //as the user object.
      res.json({
        email: req.user.email,
        id: req.user.id,
        username: req.user.username,
       });
    }
  });

}



  
  