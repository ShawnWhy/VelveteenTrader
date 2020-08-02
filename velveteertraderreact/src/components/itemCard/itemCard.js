import React, { Component, useEffect, useState } from 'react';
import Bids from "../bids";
import Hearts from "../hearts";
import API from "../../utils/API";
import apiRoutes from '../../../../routes/api-routes';


const ItemCard = function(props){

  
    return (
      <div className = "card container">
        <div className = "itemPortrait">
          <div className = "itemName">
            {props.itemName}

          </div>
           
          <div>
             <Bids
             highestBid={props.highestBid}/>
               
            <Hearts
            votes={props.votes}/>
          
          </div>
          
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
