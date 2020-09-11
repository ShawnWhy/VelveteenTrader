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


export const InformationContext = React.createContext();

const App = function(){

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
    // var signUpInfo ={
    //   email:emailSignupRef.current.value,
    //   username:nameSignupRef.current.value,
    //   password:passwordSignupRef.current.value

    var randomItem={
      itemOwnderId:1,
      itemName:"shit",
      itemStory:"this is a piece of shit"


    }
    console.log("randomitem");
    API.createItem(randomItem).then((res)=>{
      console.log(res);
    })

    }
    // console.log(signUpInfo);
    // API.signUp(signUpInfo).then((res)=>{
    //   setReturnHomeSignUp(
    //     "on"
    //   )

    // }
    // )


  
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
  // useEffect(() => {
  //   async function getId() {
  //     var data = await API.getUserID();
  //     console.log(data);
  //     if (
  //       data.data.username === null ||
  //       !data ||
  //       data.data.username === "nobody"
  //     ) {
  //       console.log("loggedon..not");
  //       setLoggedin("false");
  //       setUserName("nobody");
  //     } else {
  //       console.log(data.data.username);
  //       // console.log("loggedin");
  //       setUserName(data.data.username);
  //       setLoggedin("true");
  //     }
  //   }
  //   getId();
  // }, [loggedin]);

  // const logOut = function () {
  //   // API.logOut();
  //   // console.log("logout");
  //   //   event.preventDefault();
  //   //   event.stopPropagation();

  //   async function logingOut() {
  //     var done = await API.logOut();
  //     if (done) {
  //       console.log("loggedout");
  //       setLoggedin("false");
  //     }
  //   }

  //   logingOut();
  // };

  
  // var handleSubmit = function (e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   var userlogin = { username: newUser.username, password: newUser.password };
  //   console.log(userlogin);

  //   API.login(userlogin)
  //     .then((res) => {
  //       // localStorage.setItem('token', res.data.token)
  //       setLoggedin(true);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
 




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
                <div className="col-md-  modalContent">
                <div className={"XOut "+(returnHomeLogin ==="on"? "dissappear": "appear")} onClick={loginModaloff}>X</div>
                  <input ref={nameLoginRef} className = " offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input ref = {emailLoginRef} className = " offset-md-1 col-md-10 signinInPut" type="email" placeholder = "email"></input>
                  <input ref = {passwordLoginRef} className = "offset-md-1 col-md-10 signinInPut" type="password" placeholder = "password"></input>
                  <div onClick={logIn} >Login</div>
                  <div className={"returnHome "+(returnHomeLogin==="on"?"appear":"dissappear")}>logged On <a href="/">Return Home</a></div>


                </div>
              </div>
              <div className={" row justify-content-center signUpModal "+ ( signUpModal === "off" ? "invisible" : "visible")}>
              <div className="col-md-  modalContent">
              <div onClick={signUpModaloff} className={"XOut "+(returnHomeSignUp ==="on"? "dissappear": "appear")}>X</div>

              <input ref={nameSignupRef} className = "offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input ref={emailSignupRef}  className = "offset-md-1 col-md-10 signinInPut"  type="email" placeholder = "email"></input>
                  <input ref={passwordSignupRef}  className = "offset-md-1 col-md-10 signinInPut"  type="password" placeholder = "password"></input>  
                  <div onClick={SignUp}>signup</div>
                  <div className={"returnHome "+(returnHomeSignUp==="on"? "appear":"dissappear")}>Signed Up <a href="/">Return Home</a></div>
              </div>
 
              </div>

      </InformationContext.Provider> 
    );
  }






export default App;
