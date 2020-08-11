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

  const [returnHomeLogin, setReturnHomeLogin]=useState(
    "off"
  )

  const [ returnHomeSignUp, setReturnHomeSignUp]=useState(
    "off" 
  )


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
    }
  )

  const [loggInModal, setLogInModal] = useState(
    "off"
  )

  const [signUpModal, setSignInModal] = useState(
    "off"
  )

  const loadUserInformation = async function(){
    await API.getUserData()
    .then(function(res){
      setUserProfile(res);
       
    
    })

  }
  const logIn= function(){
    setReturnHomeLogin(
      "on"
    )
    }

  const SignUp=function(){
    setReturnHomeSignUp(
      "on"
    )
  }

  const logOut=function(){
    setLoggedIn("false")
    

  }

  const loginModalDeploy = function(){
    setLogInModal("on")
  }

 const signUpModalDeploy = function(){
    setLogInModal("on")
  }

  const loginModaloff = function(){
    setLogInModal("off")
  }

  const signUpModaloff = function(){
    setSignInModal("off")
  }
 



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
                ( loggedIn == false ? "visible" : "invisible")
              }
            >
              <a onClick={loginModalDeploy}>Log In</a>
            </div>
            <div
              className={
                (loggedIn == false ? "visible" : "invisible")
              }
            >
              <a onClick={signUpModalDeploy}>Sign Up</a>
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
      </Router>
              <div className={" row justify-content-center logInModal "+ ( loggInModal === "off" ? "invisible" : "visible")}>
                <div className="col-md-4 modalContent">
                <div className={"XOut "+(returnHomeLogin ==="on"? "dissappear": "appear")} onClick={loginModaloff}>X</div>
                  <input className = " offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input className = " offset-md-1 col-md-10 signinInPut" type="email" placeholder = "email"></input>
                  <input className = "offset-md-1 col-md-10 signinInPut" type="password" placeholder = "password"></input>
                  <div onClick={logIn} >Login</div>
                  <div className={"returnHome "+(returnHomeLogin==="on"?"appear":"dissappear")}>logged On <a href="/">Return Home</a></div>


                </div>
              </div>
              <div className={" row justify-content-center signUpModal "+ ( signUpModal === "off" ? "invisible" : "visible")}>
              <div className="col-md- 4 modalContent">
              <div onClick={signUpModaloff} className={"XOut "+(returnHomeSignUp ==="on"? "dissappear": "appear")}>X</div>

              <input  className = "offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input className = "offset-md-1 col-md-10 signinInPut"  type="email" placeholder = "email"></input>
                  <input className = "offset-md-1 col-md-10 signinInPut"  type="password" placeholder = "password"></input>  
                  <div onClick={SignUp}>signup</div>
                  <div className={"returnHome "+(returnHomeSignUp==="on"?  "appear":"dissappear")}>Signed Up <a href="/">Return Home</a></div>
              </div>
 
              </div>

      </InformationContext.Provider> 
    );
  }






export default App;
