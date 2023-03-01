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
  
 var newTitleColors = [
    'orange','rgb(244, 170, 42)',
    'rgb(255, 10, 247)','rgb(204, 255, 51)','rgb(242, 115, 208)',
    'rgb(255, 51, 0)'
  ]

  const [warnMessageLogin, setWarnMessageLogin] = useState({
    status:"off",
    message:""
  })
  const [warnMessageSignUp, setWarnMessageSignup] = useState({
    status:"off",
    message:""
  })



  

 const titleOnMouseOver = (e)=>{
  e.stopPropagation()
  e.preventDefault()
   if (e.target.tagName.toLowerCase() == "a"){
   
    let newTitleColors2 = [
    'orange','rgb(244, 170, 42)',
    'rgb(255, 10, 247)','rgb(204, 255, 51)','rgb(242, 115, 208)',
    'rgb(255, 51, 0)'
  ]
    console.log(newTitleColors2)
    let randomNumber = Math.floor(Math.random()*newTitleColors2.length)
    var titleColor = newTitleColors2[randomNumber];
    console.log(randomNumber)
    console.log(newTitleColors2)
    e.target.parentElement.setAttribute('style','background-color:'+titleColor + ";border-radius:12px")

 }
}



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
    titles[i].setAttribute('style','background-color:'+titleColor + ";border-radius:12px")
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
    let userId;
    API.getUserData()
    .then(function(res){
      if(res.data.id){
        console.log("got user data +++++++++++")
        console.log(res.data)
            setLoggedIn("on")
      userId = res.data.id
       }
       
    
    })
    .then(()=>{
      console.log(userId)
      API.getPoints(userId).then(
        res=>{
          if(res.data !==null){
            console.log(res)
          setUserProfile({id:res.data.id, points:res.data.points, userName:res.data.username})
          
        }
      }
      )
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
    console.log(res);
    setWarnMessageLogin({...warnMessageLogin, message:"you are logged in !"})

  }) .catch((err) => {
        console.error(err);
        setWarnMessageLogin({...warnMessageLogin, message:err.message})
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
      setWarnMessageSignup({...warnMessageSignUp, message:"you have succesfully signed up!"})

      // console.log(res.data);

    }
    )
    .catch((err) => {
        console.error(err);
        setWarnMessageSignup({...warnMessageSignUp, message:err.message})
      });
  }


  
  // }

  const logOut=async function(e){
        e.stopPropagation()
    e.preventDefault()
    API.logOut().then(
      (res)=>{
      console.log("logged out")
      console.log(res)
    window.location.reload();})
    }

  const loginModalDeploy = function(e){
    e.stopPropagation()
    e.preventDefault()
    setSignInModal("off")
    setLogInModal("on")
  }

 const signUpModalDeploy = function(e){
    e.stopPropagation()
    e.preventDefault()
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

var titleLinks = document.querySelectorAll(".title_link a");
  console.log(titleLinks)
  if(titleLinks.length>0){
    console.log("34")
    titleLinks.forEach(element => {
      console.log("36")
      element.addEventListener("mouseover",(e)=>{
        titleOnMouseOver(e)
      })
      
    });
  }
  
  },'')

 

   return (
     <ItemContext.Provider value={{chosenItem, setChosenItem}}>
     <InformationContext.Provider value={{userProfile, setUserProfile}}>
        <Router>
        <div className="row justify-content-center">
            <div className = "margin title_linkLogo title_link">
            <div>The Velveteen</div>
            <div>Exchange</div>
            <div>The Velveteen Exchange</div>
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
              <a onClick={(e)=>{loginModalDeploy(e)}} href="">Log In</a>
            </div>
            <div
              className={
                (loggedIn === false ? "visible title_link4 title_link" : "invisible")
              }
            >
              <a onClick={(e)=>{signUpModalDeploy(e)}} href="">Sign Up</a>
            </div>
            <div
              className={
                (loggedIn === false ? "invisible " : "visible title_link3 title_link")
              }
            >
              <a onClick={(e)=>{logOut(e)}} href="">Log Out</a>
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
                  <div className="warnMessage">{warnMessageLogin.message}</div>
                <div className={"XOut "+(returnHomeLogin ==="on"? "dissappear": "appear")} onClick={loginModaloff}>X</div>
                  <input ref={nameLoginRef} className = " offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input ref = {emailLoginRef} className = " offset-md-1 col-md-10 signinInPut" type="email" placeholder = "email"></input>
                  <input ref = {passwordLoginRef} className = "offset-md-1 col-md-10 signinInPut" type="password" placeholder = "password"></input>
                  <div></div>
                  <div className={"returnHome "+(returnHomeLogin==="on"?"dissappeaer":"appear")}>____________________</div>
                  <div className={"returnHome loginButton "+(returnHomeLogin==="on"?"dissappeaer":"appear")} onClick={logIn} >Login</div>

                  <div className={"returnHome "+(returnHomeLogin==="on"?"appear":"dissappear")}>logged On <a href="/">Return Home</a></div>


                </div>
              </div>
              <div className={" row justify-content-center signUpModal "+ ( signUpModal === "off" ? "invisible" : "visible")}>
              <div className="col-md-  modalContent">
              <div className="warnMessage">{warnMessageSignUp.message}</div>
              <div onClick={signUpModaloff} className={"XOut "+(returnHomeSignUp ==="on"? "dissappear": "appear")}>X</div>

              <input ref={nameSignupRef} className = "offset-md-1 col-md-10 signinInPut" type="text" placeholder = "User Name"></input>
                  <input ref={emailSignupRef}  className = "offset-md-1 col-md-10 signinInPut"  type="email" placeholder = "email"></input>
                  <input ref={passwordSignupRef}  className = "offset-md-1 col-md-10 signinInPut"  type="password" placeholder = "password"></input>  
                  <div className={"returnHome "+(returnHomeLogin==="on"?"dissappeaer":"appear")}>____________________</div>

                  <div className={"returnHome signUpButton "+(returnHomeSignUp==="on"? "dissappear":"appear")} onClick={SignUp}>signup</div>

                  <div className={"returnHome "+(returnHomeSignUp==="on"? "appear":"dissappear")}>Signed Up <a href="/">Return Home</a></div>
              </div>
 
              </div>

      </InformationContext.Provider> 
      </ItemContext.Provider>
      
    );
  }






export default App;
