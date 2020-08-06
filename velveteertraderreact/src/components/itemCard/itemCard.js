import React, { imageBackground, Component, useEffect, useState, useContext } from 'react';
import Bids from "../bids";
import Hearts from "../hearts";
import API from "../../utils/API";
import InformationContext from "../../App"
import Style from "./itemCard.css"

const ItemCard = function(props){


    return (
      <div style={{backgroundImage: `url(${props.portraitImageUrl})` }} className = "col-md-3 itemCard" >
        
          <div className = "itemName">
            {props.itemName}
          </div>
          <div className="otherInfo">
             <Bids
             highestBid={props.highestBid}
             id = {props.id}
             itemName= {props.itemName}
             />
               
            <Hearts
            votes={props.votes}/>
          
          </div>
          
        
        <div className = "modal1">
          <div className = "modalContent1">
            <a href="/cardpage" >go to website</a> 
             </div> 
          
        </div>
         </div>
  )  
}


export default ItemCard;
