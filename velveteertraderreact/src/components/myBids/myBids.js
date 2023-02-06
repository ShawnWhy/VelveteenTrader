import React, { Component, useContext, useState } from 'react';
import {InformationContext} from "../../App"
import {ItemContext} from "../../App"
import Style from "./bids.css"

 const MyBids = function(props) {

 

  const {chosenItem, setChosenItem}= useContext(ItemContext)



    return( <div className= "bids">
              <div className="click">Click to Bid</div>
              <div className="bidDisplay"> highest bid : {props.highestBid}</div>
      
    </div>
    )
    


  }


export default MyBids;
