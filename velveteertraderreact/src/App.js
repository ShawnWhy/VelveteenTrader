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
// import apiRoutes from "../../routes/api-routes";
// import ItemPage from "../src/pages/itempage";

export const ItemContext = React.createContext();


export const InformationContext = React.createContext();

const App = function(){

 const newTitleColors = [
    'orange','rgb(244, 170, 42)',
    'rgb(255, 10, 247)','rgb(204, 255, 51)','rgb(242, 115, 208)',
    'rgb(255, 51, 0)'
  ]
  const setTitles = ()=>{
    var titles = document.getElementsByClassName('title_link')
    console.log(titles)
    let newTitleColors2 = newTitleColors
    for(let i=0;i<titles.length;i++){
    setTimeout(() => {
    let randomNumber = Math.floor(Math.random()*newTitleColors2.length)
    var titleColor = newTitleColors2[randomNumber];
    newTitleColors2.splice(newTitleColors2[randomNumber],1)
    if(titles[i]){
    titles[i].setAttribute('style','background-color:'+titleColor)
    }
        
      }, i*100);
    }


  }
 

    

  const [chosenItem, setChosenItem]=useState(
    {bidModal:"off",
    ItemPageModal:"off",
      name:"",
      id:"",
    itemStory:"",
  highestBid:0}
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
      userName : "guest",
      id:0,
      points:20,
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
    
    API.getUserData()
    .then(function(res){
      if(res.data.id){
        console.log("got user data +++++++++++")
        console.log(res.data)
            setLoggedIn("on")

      setUserProfile({
        userName:res.data.username,
        points:res.data.points,
        id:res.data.id,

      });
      }
       
    
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
    console.log("loggin in ")
  

    API.logIn(loginInfo).then((res)=>{
    setReturnHomeLogin(
      "on"
    )

  }) .catch((err) => {
        console.error(err);
      });
    }

  const SignUp=function(event){
    event.stopPropagation();
    event.preventDefault();
    var signUpInfo ={
      email:emailSignupRef.current.value,
      username:nameSignupRef.current.value,
      password:passwordSignupRef.current.value,
      
}
    console.log(signUpInfo);
    API.signUp(signUpInfo).then((res)=>{
      setReturnHomeSignUp(
        "on"
      )

      console.log(res.data);

    }
    )
    .catch((err) => {
        console.error(err);
      });
  }


  
  // }

  const logOut=async function(){
    API.logOut().then(
      (res)=>{
      console.log("logged out")
      console.log(res)
    window.location.reload();})
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

loadUserInformation()

setTitles()
  
  },'')


  

   return (
     <ItemContext.Provider value={{chosenItem, setChosenItem}}>
     <InformationContext.Provider value={{userProfile, setUserProfile}}>
        <Router>
        <div className="row justify-content-center">
            <div className = "margin title_linkLogo title_link">
            <div>The Velveteen</div>
            <div>Exchange</div>
            </div>
            <div className = "margin title_link1 title_link">
              <Link to="/">Home Page</Link>
            </div>
            <div className = "margin title_link2 title_link">
              <Link to="/CommunityPage">Community Page</Link>
            </div>
            
            <div
              className={
                ( loggedIn == false ? "visible title_link3 title_link" : "invisible")
              }
            >
              <a onClick={loginModalDeploy}>Log In</a>
            </div>
            <div
              className={
                (loggedIn === false ? "visible title_link4 title_link" : "invisible")
              }
            >
              <a onClick={signUpModalDeploy}>Sign Up</a>
            </div>
            <div
              className={
                (loggedIn === false ? "invisible " : "visible title_link3 title_link")
              }
            >
              <a onClick={logOut}>Log Out</a>
            </div>

            <div className="margin title_link4 title_link">
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
            {/* <Route path="/communityPageold">
              <Chatroom name={userProfile.userName} />
            </Route>             */}
            <Route path="/communityPage">
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
