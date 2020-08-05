import React, { Component, useContext } from 'react';
import InformationContext from "../../App"

 const Bids = function(props) {


    return <div className= "bids">
      <div> {props.highestBid}</div>
      
    </div>;
  }


export default Bids;
