import React, {useEffect, useState, useContext } from "react";
import { InformationContext } from "../../App";
import { ItemContext } from "../../App";


import Billboardscroll from "../../components/billboardscroll";

import Style from "./homepage.css"

function Homepage(props) {
  const {userProfile, setUserProfile}= useContext(InformationContext)







    return (
    <div class= "row">
        <div className= "col-md-2 sidebar"> 
        <div>
         {userProfile.userName}
        </div>
        <form>
        <div>
          
          <input className = "userinput" type="text" name="name" placeholder = "item name"></input> 
          <input className = "userinput" type="url" name="url1" placeholder = "imagehr1"></input> 
          <input className = "userinput" type="url" name="url2" placeholder = "imageurl2"></input> 
          <input className = "userinput" type="url" name="url3" placeholder = "imageurl3"></input> 
          <input className = "userinput" type="url" name="verge" placeholder = "vergeurl"></input> 
          <textarea className = "userinput" name="story" placeholder  ></textarea>
          <input className="userinput" type="submit"></input>
           </div>
          
          </form>
        </div>

        <div className ="col-md-10">
        <Billboardscroll />
        </div>
      
        
      
    </div>
    )
  }


export default Homepage;
