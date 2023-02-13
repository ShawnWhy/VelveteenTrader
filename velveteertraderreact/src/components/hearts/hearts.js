import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {CardContext} from ".././itemCard/itemCard"
import {InformationContext} from "../../App"
import { FavItemContext} from '../billboardscroll/billboardscroll';
import API from "../../utils/API"

const Hearts =function(props) {
  const {favoriteItems, SetFavoriteItems}= useContext(FavItemContext)

  const {cardInfo, ChildrenSetCardInfo} = useContext(CardContext)
  
  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)
  const [heartColor, setHeartColor]= useState(
    "red"
  )
    
  const newHeartColors = [
    'orange','rgb(244, 170, 42)',
    'rgb(255, 10, 247)','rgb(204, 255, 51)','rgb(242, 115, 208)',
    'rgb(255, 51, 0)'
  ]

  const createHeart= (target)=>{
    let randomNumber = Math.floor(Math.random()*5)
    var newHeartColor = newHeartColors[randomNumber];
    let randomNumber2 = Math.random()*1.5+.5;
    let randomNumber3 = Math.floor(Math.random()*5)


    var heart = document.createElement("div")
    heart.innerHTML=('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2  195 146.79"><g fill= "'+ newHeartColor + '" ><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/><path class="cls-2" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/><path class="cls-3" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/></g></g></svg>love ')
    heart.classList.add("moreHeart")
    heart.classList.add("moreHeart"+randomNumber3)
    console.log("heart________")
    console.log(heart)

    target.parentElement.append(heart)
  }

  const explodeHeart = (e)=>{
    console.log("e.target+++++++++++")
    console.log(e.target)
    e.stopPropagation()
    e.preventDefault()
    var heart= e.target;
    for(var i=0; i<7; i++){
      createHeart(heart)
    }

    setTimeout(() => {
      let hearts = document.getElementsByClassName('moreHeart')
      // console.log(hearts)
      // hearts.forEach((heart)=>{
      // document.remove(heart)
      // })
      for(let i=hearts.length -1 ; i>=0; i--){
        
          hearts[i].remove()

       
      }

      
      
    }, 400);

  }

// console.log(chosenItem)
  const changeToPink=()=>{
    setHeartColor("orange")
   
  }
  const changeToRed=()=>{
    setHeartColor("red")
  }

  const addLike = (e)=>{
    if(userProfile.points>0){

    explodeHeart(e)

    var newLike = parseInt(cardInfo.likes);
    newLike+=1;
    console.log("like")
    var body={
      "id":props.id,
      "likes":newLike,
      "userId":userProfile.id
    
    }
    console.log(body);
    API.updateLikes(body, props.id)
   
 
    //set favorite items
    var data = [...favoriteItems]
    var index = data.findIndex(obj => obj.id === props.id);
    data = favoriteItems;
    data[index].likes = newLike
    SetFavoriteItems(data)
    props.ChildrenSetCardInfo(newLike)
    console.log(cardInfo.likes);
  
//
var newPoints = userProfile.points - 1
setUserProfile(()=>({...userProfile, points:newPoints}))
console.log(newPoints)
API.changePoints ({points:newPoints}, userProfile.id)
console.log('cardinfo')
console.log(cardInfo);
API.getPoints(cardInfo.itemOwnerId).then(res=>{
  console.log("got the user points")
console.log(res.data)
    //  promisedSetState(res.data);
if(res.data.points !== null){
var newOwnerPoints = parseInt(res.data.points) +1
API.changePoints({points:newOwnerPoints}, cardInfo.itemOwnerId)
}
})
}
}
  
  
    return(
    // <CardContext.Consumer>
    
    <div onMouseOver={changeToPink} onMouseLeave={changeToRed} 
    onClick={function(e){addLike(e)}} className="heart">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2  195 146.79">
    <g fill={heartColor}>
    <g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/>
    <path class="cls-2" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/>
    <path class="cls-3" d="M97.5,145.5c-10.48-25-62.22-36-84.77-64.3a48.5,48.5,0,1,1,79-55.2c4.1,10.32,7.16,10.06,11.48.17A49.14,49.14,0,0,1,117,10.11,48.53,48.53,0,0,1,182.47,81C160,109.43,108,120.51,97.5,145.5Z"/>
    </g>

    </g>
    </svg>
  <div className = "likesNumber">{cardInfo.likes}</div>

    </div>
    // </CardContext.Consumer>
    
    )
    
}

export default Hearts;

