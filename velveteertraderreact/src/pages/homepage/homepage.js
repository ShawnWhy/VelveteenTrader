import React, {useEffect, useState, useContext } from "react";
import { InformationContext } from "../../App";
import { ItemContext } from "../../App";
import API from "../../utils/API"
import Billboardscroll from "../../components/billboardscroll";
import Style from "./homepage.css"

function Homepage(props) {

  const {userProfile, setUserProfile}= useContext(InformationContext)

    const handleInputChange = function (event) {
    const { name, value } = event.target;
    // console.log(name, value);
    setNewItem({ ...newItem, [name]: value });
  };

  const[newItem, setNewItem]= useState({
    name:"",
    url1:"",
    url2:"",
    url3:"",
    modelUrl:"",
    story:""
})

const createItem = (event)=>{
  event.preventDefault();
  event.stopPropagation();
  console.log("createitem")
  console.log(userProfile);
  var body= {
    name:newItem.name,
    url1:newItem.url1,
    url2:newItem.url2,
    url3:newItem.url3,
    modelLink:newItem.modelUrl,
    itemStory:newItem.story,
    userId:userProfile.id
  }

  console.log(body);
API.createItem(body);

}

    return (
    <div class= "row">
        <div className= "col-md-2 sidebar"> 
        <div>
         {userProfile.userName}
        </div>
        <form onSubmit={createItem}>
        <div>
          
          <input className = "userinput" type="text" name="name" placeholder = "item name" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="url1" placeholder = "imageurl1" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="url2" placeholder = "imageurl2" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="url3" placeholder = "imageurl3" onChange={handleInputChange}></input> 
          <input className = "userinput" type="url" name="modelUrl" placeholder = "modelUrl" onChange={handleInputChange}></input> 
          <textarea className = "userinput" name="story" onChange={handleInputChange}  ></textarea>
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
