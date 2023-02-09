import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {CardContext} from "../itemCard/itemCard"
import {InformationContext} from "../../App"
import API from "../../utils/API"

const MyComments =function(props) {
  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)



    return(
    // <CardContext.Consumer>
    <div className="commentInformation ">
      <div className="commentAuthorName">{props.authorName}</div><div>:</div>
      <div className= "commentComment">{props.comment}</div>
    <div >
      </div>
  <div className = "commentVotes">{props.votes}</div>

    </div>
    // </CardContext.Consumer>
    
    )
    
}

export default MyComments
