import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {InformationContext} from "../../App"
import API from "../../utils/API"
import { FavItemContext} from '../billboardscroll/billboardscroll';


const Hearts2 =function(props) {

  const {favoriteItems, SetFavoriteItems}= useContext(FavItemContext)

  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)
  const [heartColor, setHeartColor]= useState(
    "red"
  )

  const changeToPink=()=>{
    setHeartColor("orange")
   
  }
  const changeToRed=()=>{
    setHeartColor("red")
  }

  const addLike = ()=>{
  console.log("like")
  var newLike = parseInt(props.likes);
  newLike+=1;
    var body={
      'id':chosenItem.id,
      'likes':newLike,
      'userId':userProfile.id
    
    }
    API.updateLikes(body,chosenItem.id)
    console.log(body);
  
    // alert(newLike)
    setChosenItem({...chosenItem, likes:newLike})


    //set favorite items
    var data = [...favoriteItems]
    var index = data.findIndex(obj => obj.id === chosenItem.id);
    data = favoriteItems;
    data[index].likes = newLike
    SetFavoriteItems(data)
    console.log(chosenItem.likes);
  
//
var newPoints = userProfile.points - 1
setUserProfile(()=>({...userProfile, points:newPoints}))
console.log(newPoints)
API.changePoints ({points:newPoints}, userProfile.id)
console.log('cardinfo')
console.log(chosenItem);
API.getPoints(chosenItem.itemOwnerId).then(res=>{
  console.log("got the user points")
console.log(res.data)
    //  promisedSetState(res.data);
if(res.data.points !== null){
var newOwnerPoints = parseInt(res.data.points) +1
API.changePoints({points:newOwnerPoints}, chosenItem.itemOwnerId)
}
})

}

  
  
  
    return(
    
    <div onMouseOver={changeToPink} onMouseLeave={changeToRed} 
    onClick={addLike} className="heart">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2  195 146.79">
    <g fill={heartColor}>
    <g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/>
    <path class="cls-2" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/>
    <path class="cls-3" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/>
    </g>

    </g>
    </svg>
  <div className = "likesNumber">{props.likes}</div>



      
      
    </div>
    )
    
}

export default Hearts2;
