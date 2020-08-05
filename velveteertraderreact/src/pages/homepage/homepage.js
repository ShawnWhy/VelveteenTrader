import React, {useEffect, useState, useContext } from "react";
import { InformationContext } from "../../App";
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
        <div>
          <input type="text" name="name" placeholder = "item name"></input> 
          <input type="url" name="url1" placeholder = "imagehr1"></input> 
          <input type="url" name="url2" placeholder = "imageurl2"></input> 
          <input type="url" name="url3" placeholder = "imageurl3"></input> 
          <input type="url" name="verge" placeholder = "vergeurl"></input> 





          <textarea  name="story" placeholder  ></textarea> 

          
        </div>
        
        </div>

        <div className ="col-md-10">
        <Billboardscroll />
        </div>
      
        
      
    </div>
    )
  }


export default Homepage;
