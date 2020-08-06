import React, { Component, useContext } from 'react';
import InformationContext from "../../App"
import Style from "./bids.css"

 const Bids = function(props) {

  const bringupBidModal = ()=>{

  }


    return <div className= "bids" onClick={bringupBidModal}>
      <div> highest bid : {props.highestBid}</div>
      <div className = "bidModal" id = {props.id}>
        <div className = "bidforum">
          <div> the highest bid for {props.itemName} is {props.highestBid}</div>


        </div>

      </div>
      
    </div>;
  }


export default Bids;
