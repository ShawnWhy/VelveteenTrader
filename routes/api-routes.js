

// Requiring our models
var db = require("../models");
var passport = require("../config/passport");

var mysql = require("mysql");
const { ConnectionError } = require("sequelize");
module.exports = function(app) {

  app.get("api/getFavs",
    function(req, res){
      Connection.query ("SELECT * FROM Item ORDER By Likes DESC Limit 10",function(err, data){if(err) throw err;
       console.log("got top picks");
       res.json(data)
      })
    });

  app.get("api/allItems",
  function(req, res){
    connection.query("SELECT * FROM Item JOIN User ON Item.itemOwnerId = User.id", function(err, data){
    if(err) throw err, 
    console.log("got them all");
    res.json(data)
  })
})

  app.get("api/items/:id", function(req, res){
    userId = req.params.id;
    conenction.query("SELECT * FROM Item RIGHT JOIN User ON Item.itemOwnerId = User.id LEFT JOIN Bid ON Item.id = Bid.bidItemId WHERE ItemOwnerId = ?", userId,
    function(err, data){
      if(err) throw err;
      console.log("got the item for this guy")

    })
  })

  app.get("api/itemDetails/:id", function(req,res){
    itemId = req.params.id;
    connection.query("SELECT * FROM Item LEFT JOIN Bid on Bid.bidItemId = Item.id LEFT JOIN Message ON Message.itemId = Item.id LEFT JOIN Bid on Bid.bidItemId = Item.id WHERE Item.id=?",
    itemId,function(err, data){
      if(err) throw err;
      res.json(data)
    })
  })

  app.post("/api/signUp", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
      .then(function() {
        res.redirect(307, "/");
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
    req.logout();
    res.redirect("/");
  })

  
  app.post("api/item",
  function(req, res){
    db.Item.create({
      itemOwnerId : req.body.ItemownerId,
      itemName:req.body.itemName,
      itemStory : req.body.itemStory,
      Votes : 0,
      bids:0,
      imageUrl1: req.body.imageUrl1,
      imageUrl2: req.body.imageUrl2,
      imageUrl3: req.body.imageUrl3,
      modelLink: req.body.modelLink
    }).then(function(err,result){
    if(err) throw err, 
    console.log("postedItem");
    res.json(result)
  })
})


  app.post("api/bids",
  function(req, res){
    db.Bid.create({
      BidderId:req.body.BidderId,
      bidItemId:req.body.bidItemId,
      bidAmount:req.body.bidAmount,
      
    }).then(function(err,result){
    if(err) throw err, 
    console.log("postedbid");
    res.json(result)
  })
})

  app.post("api/message",
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

  
  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Todo.findAll({}).then(function(dbTodo) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTodo);
    });
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbTodo) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Todo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/todos", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Todo.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbTodo) {
      res.json(dbTodo);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });


  
};


// var db = require("../models");
// var passport = require("../config/passport");
// var movieSearch = require("../public/js/movie-search");
// var buddySearch = require("../public/js/buddy-search")
// var mysql = require("mysql");

// var connection =require("../public/js/connection");

// module.exports = function(app) {

//   // If the user has valid login credentials, send them to the members page. Otherwise the user will be sent an error
//   app.post("/api/login", passport.authenticate("local"), function(req, res) {
//   res.json(req.user);
//   });

//   // Route for signing up a user.
//   // otherwise send back an error
//   app.post("/api/signup", function(req, res) {
//     db.User.create({
//       email: req.body.email,
//       password: req.body.password,
//       username: req.body.username
//     })
//       .then(function() {
//         res.redirect(307, "/");
//       })
//       .catch(function(err) {
//         console.log(err)
//         res.status(401).json(err);
//       });
//   });

//   // Route for logging user out
//   app.get("/logout", function(req, res) {
//     req.logout();
//     res.redirect("/");
//   })


//   // Route for getting some data about our user to be used client side
//   app.get("/api/user_data", function(req, res) {
//     if (!req.user) {
//       // The user is not logged in, send back an empty object
//       res.json({});
//     } else {
//      // if the user is succesfully logged in , all of the user information would be given 
//      //as the user object.
//       res.json({
//         email: req.user.email,
//         id: req.user.id,
//         password:req.user.password,
//         username: req.user.username,
//         movie_one:req.user.movie_one,
//         movie_two:req.user.movie_two,
//         movie_three:req.user.movie_three,
//         actor_one:req.user.actor_one,
//         actor_two:req.user.actor_two,
//         actor_three:req.user.actor_three,
//         director_one:req.user.director_one,
//         director_two:req.user.director_two,
//         director_three:req.user.director_three,
//         genre_one:req.user.genre_one,
//         genre_two:req.user.genre_two,
//         genre_three:req.user.genre_three
//       });
//     }
//   });

//   //getting the information from the stored results for movie search
//   app.get("/api/movieSearchInfo/:id",function(req,res){
//     var id=req.params.id;
//    connection.query("SELECT * FROM SearchMovieData WHERE username=?",id,function(err,data){
//      if(err) throw err;
//      res.json(data);
//    })
// })

//   //getting the information from the stored results for buddy search
//   app.get("/api/buddySearchInfo/:id",function(req,res){
//     var id=req.params.id;
//    connection.query("SELECT * FROM SearchBuddyData WHERE username=?",id,function(err,data){
//      if(err) throw err;
//      res.json(data);
//     })
//   })

   

//   app.post("/api/search/:id",function(req,res){
//     var id=req.params.id;
//     var numberofMovies=req.body.numberMovies;

//     //moviesearch called from a imported function
//     console.log(numberofMovies);
//     movieSearch.movieSearch(id,numberofMovies);

//     //buddy search is called from a imported function
//     buddySearch.buddySearch(id);

    
// })


//   //putting the submitted information from userpage into the database 
//   app.put("/api/submitUserInformation/:id", function(req, res){
//     var id = req.params.id;
//     console.log(id)
//     db.User.update(
//       {movie_one: req.body.movie_one,
//         movie_two:req.body.movie_two,
//         movie_three:req.body.movie_three,
//         actor_one:req.body.actor_one,
//         actor_two:req.body.actor_two,
//         actor_three:req.body.actor_three,
//         director_one:req.body.director_one,
//         director_two:req.body.director_two,
//         director_three:req.body.director_three,
//         genre_one:req.body.genre_one,
//         genre_two:req.body.genre_two,
//         genre_three:req.body.genre_three},
//       {where: {
//         username:id
//       }}
//       )
//     .then(function(data) {
//       res.json(data);})

//     })

//   //deletes the stored search information to open it up on the next search
//   app.delete("/api/deleteSearch/:id",function(req,res){
//   connection.query("DELETE FROM SearchBuddyData WHERE username = ?",req.params.id,function(err,result){
//   if(err) throw err;
//          // console.log("deleted")
         
//   connection.query("DELETE FROM SearchMovieData WHERE username =?",req.params.id,function(err,result){
//   if(err) throw err;
//   // console.log("2deleted");
//   res.json(result);
//         })
//       })
//     })


// //manually updates the user information used without logout and login
// app.post("/api/relogin", function(req, res){
//     req.session.passport.user = req.body;
//     console.log("yayay");
//     res.redirect("/members");

//   }
// )

// }
 
 