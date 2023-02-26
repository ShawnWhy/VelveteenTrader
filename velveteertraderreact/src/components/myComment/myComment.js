import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {CardContext} from "../itemCard/itemCard"
import {InformationContext} from "../../App"
import API from "../../utils/API"

const MyComments =function(props) {
  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)

  const HandleVoteClick = (e)=>{
    if(props.page=="main"){

    }
    else{
      console.log("nothing")
    }


  }

    return(
    // <CardContext.Consumer>
    <div class = "commentContainer">

    <div className="commentInfo" onClick = { (e)=>{HandleVoteClick(e)}}>
      <div className="commentInfoName">{props.authorName}</div><div>:</div>
      <div className= "commentInfoComment">{props.comment}</div>
      </div>
  <div className = "commentVotes">votes : {props.votes}</div>

    </div>
    // </CardContext.Consumer>
    
    )
    
}

export default MyComments
