import React, {useEffect, useState, useContext } from "react";
import { InformationContext } from "../../App";
import { ItemContext } from "../../App";


import Billboardscroll from "../../components/billboardscroll";

import Style from "./homepage.css"
  const {userProfile, setUserProfile}= useContext(InformationContext)

function Homepage(props) {

    const handleInputChange = function (event) {
    const { name, value } = event.target;
    console.log(name, value);
    setNewUser({ ...newUser, [name]: value });
  };

  const[newUser, setNewUser]= useState({
    name:"",
    url1:"",
    url2:"",
    url3:"",
    modelUrl:"",
    story:""
})

function createItem(){
  body= {
    name:newUser.name,
    url1:newUser.url1,
    url2:newUser.url2,
    url3:newUser.url3,
    modelLink:newUser.modelUrl,
    itemStory:newUser.story,
    userid:userProfile.id
  }
API.createItem(newUser);

}

    return (
    <div class= "row">
        <div className= "col-md-2 sidebar"> 
        <div>
         {userProfile.userName}
        </div>
        <form>
        <div>
          
          <input className = "userinput" type="text" name="name" placeholder = "item name" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="url1" placeholder = "imageurl1" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="url2" placeholder = "imageurl2" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="url3" placeholder = "imageurl3" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="modelUrl" placeholder = "modelUrl" onChange={handleInputChange}></input> 
          <textarea className = "userinput" name="story" onChange={handleInputChange}  ></textarea>
          <input className="userinput" type="submit" onSubmit={createItem}></input>
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
