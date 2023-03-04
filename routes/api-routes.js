

// Requiring our models
var db = require("../models");
var passport = require("passport");
var connection =require("./connection");

 

// var mysql = require("mysql");
// const { ConnectionError } = require("sequelize");
module.exports = function(app) {

  

  app.get("/api/getFavs",
    function(req, res){
      
      connection.query ("SELECT * FROM items ORDER By likes DESC Limit 10",function(err, data){if(err) throw err;
       console.log("got top picks");
       res.json(data)
      })
    });

  app.get("/api/getTopComments",
    function(req, res){
      
      connection.query ("SELECT * FROM comments ORDER By votes DESC, id ASC Limit 20",function(err, data){if(err) throw err;
       console.log("got top comments");
       res.json(data)
      })
    });

// app.get("/api/allItems/:userid",
//   function(req, res){
//     connection.query("SELECT * FROM Items JOIN Users ON Items.userId = Users.id", function(err, data){
//     if(err) throw err, 
//     console.log("got them all");
//     res.json(data)
//   })
// })

app.get("/api/alltheItems",
function(req, res){
  console.log("all teh utems!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  connection.query("SELECT * FROM items", function(err, data){
  if(err) throw err, 
  
  res.json(data)
})
})

app.get("/api/myItems/:id", function(req, res){
    userId = req.params.id;
    console.log("getting MY ITEMS!!!!!!!!!!!!!!")
    console.log(userId)
    console.log("user id used to myitems++++++++++++++++++++++++")
    connection.query("SELECT * FROM Items WHERE userId = ?", userId,
    function(err, data){
      if(err) throw err;
      console.log("got the item for this guy++++++++++++++++++++++")
      res.json(data)

    })
  })

  app.get("/api/itemDetails/:id", function(req,res){
    console.log("getting item etails")
    console.log(req.params.id)
    itemId = req.params.id;
    connection.query("SELECT * FROM Items WHERE id = ?", 
    itemId,function(err, data){
      if(err) throw err;
    console.log(data)
    console.log("got item data")
      res.json(data)
    })
  })

  app.post("/api/signUp", function(req, res) {
    console.log(req.body)
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      points:20
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
      console.log("authenticating")
  res.json(req.user);
  });
  
  // Route for logging user out
app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

     
  app.post("/api/createLikes",
  function(req,res){
  db.Like.create({
    itemId:req.body.itemId,
    userId:req.body.userId
  }).then(function(err,result){
    if(err) throw err, 
    res.json(result)

  })
})

  app.post("/api/postComment",
  function(req,res){
  db.Comment.create({
    itemId:req.body.itemId,
    userId:req.body.userId,
    comment:req.body.comment,
    userName : req.body.userName,
    votes:req.body.votes
  }).then(function(err,result){
    if(err) throw err, 
    res.json(result)

  })
})

  app.post("/api/createMessages",
  function(req,res){
  db.Message.create({
    itemId:req.body.itemId,
    userId:req.body.userId
  }).then(function(err,result){
    if(err) throw err, 
    res.json(result)

  })
})

  app.post("/api/createVotes",
  function(req,res){
  db.Like.create({
    itemId:req.body.itemId,
    userId:req.body.userId
  }).then(function(err,result){
    if(err) throw err, 
    res.json(result)

  })
})

  app.post("/api/createBid",
  function(req,res){
    console.log(req.body)
  db.Bid.create({
    userId:req.body.userId,
    itemId:req.body.itemId,
    amount:req.body.amount
  }).then(function(err,result){
    if(err) throw err, 
    res.json(result)
  })

  })
  
  app.post("/api/createItem",
  function(req, res){
    db.Item.create({
      userId : req.body.userId,
      name:req.body.name,
      itemStory : req.body.itemStory,
      likes : 0,
      highestBid:0,
      imageUrl1: req.body.url1,
      imageUrl2: req.body.url2,
      imageUrl3: req.body.url3,
      modelLink: req.body.modelUrl
    }).then(function(err,result){
    if(err) throw err, 
    res.json(result)
  })
})


  app.post("/api/createBid",
  function(req, res){
    db.Bid.create({
      userId:req.body.userId,
      itemId:req.body.itemId,
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
      senderId:req.body.itemId,
      receiverId:req.body.userId,
      time:req.body.time,
      message:req.body.message,
    }).then(function(err,result){
    if(err) throw err, 
    console.log("createdmessage");
    res.json(result)
  })
})

app.put("/api/updateLikes/:id",
   
  function(req, res){
    console.log(req.body);
    db.Item.update({
      
      likes:req.body.likes,
      },{
        where:{
          id:req.params.id
        }
      }).then(function(err,result){
    if(err) throw err, 
    console.log("postedmessage");
    res.json(result)
  });
})

app.put("/api/changePoints/:id",

   
  function(req, res){
    console.log(req.body)
    console.log(req.params);
    console.log("change points ++++++++")
    db.User.update({
      
      points:req.body.points,
      },{
        where:{
          id:req.params.id
        }
      }).then(function(err,result){
    if(err) throw err, 
    console.log("changed points");
    res.json(result)
  });
})

app.put("/api/updateBids/:id",
   
  function(req, res){
    console.log(req.body);
    db.Item.update({
      
      highestBid:req.body.amount,
      },{
        where:{
          id:req.params.id
        }
      }).then(function(err,result){
    if(err) throw err, 
    console.log("postedBid");
    res.json(result)
  });
})

//updatecomment votes

app.put("/api/updateVotes/:id",
   
  function(req, res){
    console.log(req.body);
    db.Comment.update({
      
      votes:req.body.votes,
      },{
        where:{
          id:req.params.id
        }
      }).then(function(err,result){
    if(err) throw err, 
    console.log("postedvote");
    res.json(result)
  });
})

//delete user
  app.delete("/api/deleteUser/:id",
    function(req, res)
{
  db.User.destroy({
    where: {
        id : req.params.id
    }
})

}
  ).on('success', function(u) {
    if (u && u.deletedAt) {
      // successfully deleted the project

      console.log(u);
    }
})
//delete commment
  app.delete("/api/deleteComment/:id",
    function(req, res)
{
  db.Comment.destroy({
    where: {
        id : req.params.id
    }
})

}
  ).on('success', function(u) {
    if (u && u.deletedAt) {
      // successfully deleted the project

      console.log(u);
    }
})
//delete 




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
        points:req.user.points
       });
    }
  });

  app.get("/api/getPoints/:id",function(req, res){
    console.log("getting points++++++++")
    console.log(req.params.id)
    db.User.findOne({
      where:{
        id : req.params.id
      }
    }).then(function(result){
    console.log(result);

    res.json(
    result
       );
    
  });
  }
  
  )


  app.get("/api/getComments/:id", function(req, res) {
    console.log(req.params.id)
    
    db.Comment.findAll({
      where:{
        itemId: parseInt(req.params.id)
      },
       order: [
            ['votes', 'DESC'],
            ['id', 'ASC'],
        ],
      

    }).then(function(result){

    res.json(
    result
       );
    
  });
}),

app.get("/api/otherUserData/:id", function(req,res ){
  console.log("FINDING OTHER PEOPLES DATA!!!!!!!")
userId = req.params.id
db.User.findOne({
   where:{
        id:userId
      },

}).then(function(result){

    res.json(
    result
       );
    
  });
}),



app.get("/api/otherUserItems/:id", function(req,res ){
  console.log("FINDING OTHER PEOPLES Items")
userId = req.params.id
db.Item.findAll({
   where:{
        userId:userId
      },

}).then(function(result){

    res.json(
    result
       );
    
  });
})

}

//   function(req, res){
//     console.log(req.body);
//     db.Item.update({
      
//       likes:req.body.likes,
//       },{
//         where:{
//           id:req.params.id
//         }
//       }).then(function(err,result){
//     if(err) throw err, 
//     console.log("postedmessage");
//     res.json(result)
//   });
// })


  // app.get("/api/itemDetails/:id", function(req,res){
  //   itemId = req.params.id;
  //   connection.query("SELECT * FROM Item LEFT JOIN Bid on Bid.biditemId = Item.id LEFT JOIN Message ON Message.itemId = Item.id LEFT JOIN Bid on Bid.biditemId = Item.id WHERE Item.id=?n",
  //   itemId,function(err, data){
  //     if(err) throw err;
  //     res.json(data)
  //   })
  // })

  
  