import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {CardContext} from "../myItemCard/myItemCard"
import {InformationContext} from "../../App"
import { FavItemContext} from '../billboardscroll/billboardscroll';
import API from "../../utils/API"

const MyHearts =function(props) {
  const {favoriteItems, SetFavoriteItems}= useContext(FavItemContext)

  const {cardInfo, ChildrenSetCardInfo} = useContext(CardContext)
  
  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)
  const [heartColor, setHeartColor]= useState(
    "blue"
  )

 
  
    return(
    // <CardContext.Consumer>
    
    <div
    className="heart">
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

export default MyHearts;
