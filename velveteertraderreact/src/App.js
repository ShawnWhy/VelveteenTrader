import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import './App.css';
import API from "../src/utils/API"
import HomePage from "../src/pages/homepage";
import Contact from "../src/pages/contact";
import Chatroom from "../src/pages/chartroom";
import UserPortal from "../src/pages/userPortal";
// import ItemPage from "../src/pages/itempage";


export const InformationContext = React.createContext();

const App = function(){


  const [loggedIn, setLoggedIn] = useState(
    false
    
  )
  const [userProfile, setUserProfile] = useState(
    {
      userName : "Shawnster ",
      items:[
        {
          id:1,
          itemOwnerId:1,
          itemName: "Gold Pot",
          itemStory:
          "Golg Pot is made of gold  and lives in a place and like to jump",
          votes: 1,
          highestBid: 300,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/n65vbtN.jpeg",
          imageUrl3: "https://i.imgur.com/N6ljJ1T.jpeg",
          modelLink:""
        },
        {
          id:2,
          itemOwnerId:1,
          itemName: "Jumping TeaPot",
          itemStory:
          "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
          votes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
          imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
          modelLink:""
        },
        {
          id:3,
          itemOwnerId:1,
          itemName: "Jumperson",
          itemStory:
          "this one also lives to jump ",
          votes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/3iix37r.jpeg",
          imageUrl3: "https://i.imgur.com/0INGPZD.jpeg",
          modelLink:""
        },
      ],
      votes:[
        {
          id:1,
          itemOwnerId:1,
          itemName: "Gold Pot",
          itemStory:
          "Golg Pot is made of gold  and lives in a place and like to jump",
          votes: 1,
          highestBid: 300,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/n65vbtN.jpeg",
          imageUrl3: "https://i.imgur.com/N6ljJ1T.jpeg",
          modelLink:""
        },
        {
          id:2,
          itemOwnerId:1,
          itemName: "Jumping TeaPot",
          itemStory:
          "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
          votes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
          imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
          modelLink:""
        },
        {
          id:3,
          itemOwnerId:1,
          itemName: "Jumperson",
          itemStory:
          "this one also lives to jump ",
          votes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/3iix37r.jpeg",
          imageUrl3: "https://i.imgur.com/0INGPZD.jpeg",
          modelLink:""
        },
  
      ],
      bids:[
        {
          id:1,
          itemOwnerId:1,
          itemName: "Gold Pot",
          itemStory:
          "Golg Pot is made of gold  and lives in a place and like to jump",
          votes: 1,
          highestBid: 300,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/n65vbtN.jpeg",
          imageUrl3: "https://i.imgur.com/N6ljJ1T.jpeg",
          modelLink:""
        },
        {
          id:2,
          itemOwnerId:1,
          itemName: "Jumping TeaPot",
          itemStory:
          "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
          votes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
          imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
          modelLink:""
        },
        {
          id:3,
          itemOwnerId:1,
          itemName: "Jumperson",
          itemStory:
          "this one also lives to jump ",
          votes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/3iix37r.jpeg",
          imageUrl3: "https://i.imgur.com/0INGPZD.jpeg",
          modelLink:""
        },
  
      ],
      loggedin:"false"
    }
  )

  const loadUserInformation = async function(){
    await API.getUserData()
    .then(function(res){
      setUserProfile(res);
       
    
    })

  }
  const logOn= function(){

  }

  const logOut=function(){

  }

  const LoginModalDeploy = function(){}

 const SignUpModalDeploy = function(){}



  // useEffect(() => {
  //   loadUserInformation()
  //   .then(res=>{
  //     setUserProfile(res);
  //   })
   
  // }, []);

  

   return (
     <InformationContext.Provider value={{userProfile, setUserProfile}}>
        <Router>
        <div className="row justify-content-center">
          
            <div className = "margin">
              <Link to="/">Home Page</Link>
            </div>
            <div className = "margin">
              <Link to="/CommunityPage">Community Page</Link>
            </div>
            
            <div
              className={
                (loggedIn == false ? "visible" : "invisible")
              }
            >
              <a onClick={LoginModalDeploy}>Log In</a>
            </div>
            <div
              className={
                (loggedIn == false ? "visible" : "invisible")
              }
            >
              <a onClick={SignUpModalDeploy}>Sign Up</a>
            </div>
            <div
              className={
                (loggedIn == false ? "invisible" : "visible")
              }
            >
              <a onClick={logOut}>Log Out</a>
            </div>
            <div
              className={
                 (loggedIn == false ? "invisible" : "visible")
              }
            >
              
              <Link to="/user">User Portal</Link>
            </div>
            <div className="margin">
              <Link to="/contact">Contact</Link>
            </div>
          </div>

  <div className="row">
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
           
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/communityPage">
              <Chatroom name={userProfile.userName} />
            </Route>            
            <Route>
              <UserPortal name={userProfile.userName} />
            </Route>
          </Switch>
        </div>
      </Router>
      </InformationContext.Provider> 
    );
  }






export default App;
