import React, { Component, useContext, useState } from 'react';
import {InformationContext} from "../../App"
import {ItemContext} from "../../App"
import Style from "./bids.css"

 const Bids = function(props) {

 

  const {chosenItem, setChosenItem}= useContext(ItemContext)


  const bringupBidModal = ()=>{
    setChosenItem({...chosenItem, bidModal:"on", itemName:props.itemName, highestBid:props.highestBid, id : props.id })

  }


    return( <div className= "bids" onClick={bringupBidModal}>
              <div className="click">Click to Bid</div>
              <div className="bidDisplay"> highest bid : {props.highestBid}</div>
      
    </div>
    )
    


  }


export default Bids;
