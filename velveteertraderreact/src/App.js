import React, { useEffect, useState, useContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import './App.css';
import API from "../src/utils/API"
import HomePage from "./pages/homepage";
import Contact from "./pages/contact";
import Chatroom from "./pages/chatroom";
import UserPortal from "./pages/userPortal";
// import ItemPage from "../src/pages/itempage";

export const ItemContext = React.createContext();


export const InformationContext = React.createContext();

const App = function(){

// const setBid = function(newBid, oldBid, userid, itemid){


// var bidBody= {


// }
  
// API.createBid(newBid);
// if(newBid>oldBid){

//   API.updateBids();

// }
// }

// const makeComment = function(comment, userid, itemid){

// var commentBody= {


// }
  
// API.createBid(newBid);
// if(newBid>oldBid){

//   API.updateBids();

// }
// }

  const [chosenItem, setChosenItem]=useState(
    {bidModal:"off",
    ItemPageModal:"off",
      name:"",
      id:"",
    itemStory:""}
  )

  const [contactModal , setContactModal]=useState("on");

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
      id:1,
      points:20,
      items:[
        {
          id:1,
          itemOwnerId:1,
          name: "Gold Pot",
          itemStory:
          "Golg Pot is made of gold  and lives in a place and like to jump",
          likes: 1,
          highestBid: 300,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/n65vbtN.jpeg",
          imageUrl3: "https://i.imgur.com/N6ljJ1T.jpeg",
          modelLink:"",
          comments:[
            {author:"Shawnski",text:"this is amazing"},
            {author:"Shawnster",text:"hey bro this is cool"},
            {author:"Shawnssd",text:"hey man cool"}
            ]
        },
        {
          id:2,
          itemOwnerId:1,
          name: "Jumping TeaPot",
          itemStory:
          "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
          likes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
          imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
          modelLink:"",
          comments:[
            {author:"Shawnski",text:"this is amazing"},
            {author:"Shawnster",text:"hey bro this is cool"},
            {author:"Shawnssd",text:"hey man cool"}



          ]
        },
        {
          id:3,
          itemOwnerId:1,
          name: "Jumperson",
          itemStory:
          "this one also lives to jump ",
          likes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/3iix37r.jpeg",
          imageUrl3: "https://i.imgur.com/0INGPZD.jpeg",
          modelLink:"",
          comments:[
            {author:"Shawnski",text:"this is amazing"},
            {author:"Shawnster",text:"hey bro this is cool"},
            {author:"Shawnssd",text:"hey man cool"}



          ]
        },
        {
          id:4,
          itemOwnerId:1,
          name: "Gold Pot",
          itemStory:
          "Golg Pot is made of gold  and lives in a place and like to jump",
          likes: 1,
          highestBid: 300,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/n65vbtN.jpeg",
          imageUrl3: "https://i.imgur.com/N6ljJ1T.jpeg",
          modelLink:"",
          comments:[
            {author:"Shawnski",text:"this is amazing"},
            {author:"Shawnster",text:"hey bro this is cool"},
            {author:"Shawnssd",text:"hey man cool"}



          ]
        },
        {
          id:5,
          itemOwnerId:1,
          name: "Jumping TeaPot",
          itemStory:
          "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
          likes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
          imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
          imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
          modelLink:"",
          comments:[
            {author:"Shawnski",text:"this is amazing"},
            {author:"Shawnster",text:"hey bro this is cool"},
            {author:"Shawnssd",text:"hey man cool"}



          ]
        },
        {
          id:6,
          itemOwnerId:1,
          name: "Jumperson",
          itemStory:
          "this one also lives to jump ",
          likes: 1,
          highestBid: 400,
          portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
          imageUrl2: "https://i.imgur.com/3iix37r.jpeg",
          imageUrl3: "https://i.imgur.com/0INGPZD.jpeg",
          modelLink:"",
          comments:[
            {author:"Shawnski",text:"this is amazing"},
            {author:"Shawnster",text:"hey bro this is cool"},
            {author:"Shawnssd",text:"hey man cool"}



          ]
        },
        
        
      ],
      votes:[1,4,5,3
    
  
      ],
      bids:[
        {item:2, amount:500},
        {item:3, amount:500},
        {item:5, amount:500},
        {item:6, amount:500},



         
   

          ],
      
        },
  
      
    
  )

  const nameLoginRef = useRef();
  const passwordLoginRef = useRef();
  const emailLoginRef = useRef();
  const nameSignupRef = useRef();
  const passwordSignupRef = useRef();
  const emailSignupRef = useRef();

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
  const logIn= function(event){
    event.stopPropagation();
    event.preventDefault();
    var loginInfo ={
      email:emailLoginRef.current.value,
      username:nameLoginRef.current.value,
      password:passwordLoginRef.current.value

    }

    API.logIn(loginInfo).then((res)=>{
    setReturnHomeLogin(
      "on"
    )})
    }

  const SignUp=function(event){
    event.stopPropagation();
    event.preventDefault();
    var signUpInfo ={
      email:emailSignupRef.current.value,
      username:nameSignupRef.current.value,
      password:passwordSignupRef.current.value
}
    console.log(signUpInfo);
    API.signUp(signUpInfo).then((res)=>{
      setReturnHomeSignUp(
        "on"
      )

    }
    )
  }


  
  // }

  const logOut=function(){
    setLoggedIn("false")
    

  }

  const loginModalDeploy = function(){
    setSignInModal("off")
    setLogInModal("on")
  }

 const signUpModalDeploy = function(){
    setLogInModal("off")
    setSignInModal("on")
  }

  const loginModaloff = function(){
    setLogInModal("off")
  }

  const signUpModaloff = function(){
    setSignInModal("off")
  }

  useEffect(()=>{
    async function getUserInfo(){
      var username = await API.getUserData()
      console.log(username);


    }

  },[])


  

   return (
     <ItemContext.Provider value={{chosenItem, setChosenItem}}>
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
                (loggedIn === false ? "visible" : "invisible")
              }
            >
              <a onClick={signUpModalDeploy}>Sign Up</a>
            </div>
            <div
              className={
                (loggedIn === false ? "invisible" : "visible")
              }
            >
              <a onClick={logOut}>Log Out</a>
            </div>
            <div
              className={
                 (loggedIn === false ? "invisible" : "visible")
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
                <div className="col-md-  modalContent">
                <div className={"XOut "+(returnHomeLogin ==="on"? "dissappear": "appear")} onClick={loginModaloff}>X</div>
                  <input ref={nameLoginRef} className = " offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input ref = {emailLoginRef} className = " offset-md-1 col-md-10 signinInPut" type="email" placeholder = "email"></input>
                  <input ref = {passwordLoginRef} className = "offset-md-1 col-md-10 signinInPut" type="password" placeholder = "password"></input>
                  <div className={"returnHome "+(returnHomeLogin==="on"?"dissappeaer":"appear")} onClick={logIn} >Login</div>
                  <div className={"returnHome "+(returnHomeLogin==="on"?"appear":"dissappear")}>logged On <a href="/">Return Home</a></div>


                </div>
              </div>
              <div className={" row justify-content-center signUpModal "+ ( signUpModal === "off" ? "invisible" : "visible")}>
              <div className="col-md-  modalContent">
              <div onClick={signUpModaloff} className={"XOut "+(returnHomeSignUp ==="on"? "dissappear": "appear")}>X</div>

              <input ref={nameSignupRef} className = "offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input ref={emailSignupRef}  className = "offset-md-1 col-md-10 signinInPut"  type="email" placeholder = "email"></input>
                  <input ref={passwordSignupRef}  className = "offset-md-1 col-md-10 signinInPut"  type="password" placeholder = "password"></input>  
                  <div className={"returnHome "+(returnHomeSignUp==="on"? "dissappear":"appear")} onClick={SignUp}>signup</div>
                  <div className={"returnHome "+(returnHomeSignUp==="on"? "appear":"dissappear")}>Signed Up <a href="/">Return Home</a></div>
              </div>
 
              </div>

      </InformationContext.Provider> 
      </ItemContext.Provider>
      
    );
  }






export default App;
