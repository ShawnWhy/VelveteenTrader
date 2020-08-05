import React, { imageBackground, Component, useEffect, useState, useContext } from 'react';
import Bids from "../bids";
import Hearts from "../hearts";
import API from "../../utils/API";
import InformationContext from "../../App"
import Style from "./itemCard.css"

const ItemCard = function(props){


    return (
      <div style={{backgroundImage: `url(${props.portraitImageUrl})` }} className = "itemCard col-md-3" >
        
          <div className = "itemName">
            {props.itemName}
          </div>
          <div>
             <Bids
             highestBid={props.highestBid}/>
               
            <Hearts
            votes={props.votes}/>
          
          </div>
          
        
        <div className = "modal">
          <div className = "modalContent">
            <a href="/cardpage" >go to website</a> 
             </div> 
          
        </div>
         </div>
  )  
}


export default ItemCard;
