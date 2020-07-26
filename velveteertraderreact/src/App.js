import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import './App.css';

export const InformationContext = React.createContext();

const App = function(){

  const [userProfile, setUserProfile] = useState(
    {
      userName : "",
      items:[],
      votes:[],
      bids:[],
      loggedin:"false"
    }
  )

  const loadUserInformation = function(){

  }

  useEffect(() => {
    loadUserInformation()
   
  }, [UserProfile]);

  

   return (
     <InformationContext.Provider value={userProfile}>
    
      <Router>
        <div className="container-fluid navbar">
          <ul id="nav">
            <li>
              <Link to="/">Home Page</Link>
            </li>
            <li>
              <Link to="/CommunityPage">Community Page</Link>
            </li>
            <li>
              {" "}
              <img src={logo} className="logoImg" alt="Logo"></img>
            </li>
            <li
              className={
                "margin " + (UserProfile.loggedIn === "false" ? "visible" : "invisible")
              }
            >
              <a onClick={LoginModalDeploy}>Log In</a>
            </li>
            <li
              className={
                "margin " + (UserProfile.loggedin === "false" ? "visible" : "invisible")
              }
            >
              <a onClick={SignUpModalDeploy}>Sign Up</a>
            </li>
            <li
              className={
                "margin " + (UserProfile.loggedin === "false" ? "invisible" : "visible")
              }
            >
              <a onClick={logOut}>Log Out</a>
            </li>
            <li
              className={
                "margin " + (UserProfile.loggedin === "false" ? "invisible" : "visible")
              }
            >
              <Link to="/userPortal">User Portal</Link>
            </li>
            <li className="margin">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
  
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/templates">
              <Templates user={userName} />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/userPortal">
              <UserPortal name={userName} />
            </Route>
          </Switch>
        </div>
      </Router>
      </InformationContext.Provider> 
    );
  }






export default App;
