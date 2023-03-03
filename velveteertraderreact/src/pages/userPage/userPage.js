import React, { Component, useEffect, useState , useContext, useRef} from 'react';
import ItemCard from "../../components/itemCard"
import API from "../../utils/API"
import Itempage from "../itempage"
import Chatroom from "../chatroom"
import { InformationContext } from "../../App"
import {ItemContext}from "../../App"
import Style from "./userPage.css"
import { useLocation } from 'react-router-dom'
import {useParams} from 'react-router-dom';



const UserPage= function(props) {

  let {id}  = useParams();

  const {userProfile, setUserProfile}= useContext(InformationContext)
  const {chosenItem, setChosenItem}=useContext(ItemContext)
  

// console.log(props.location);

  useEffect(()=>{
    console.log("PARAMS++++++++")
console.log(id)

setChosenItem({...chosenItem, ItemPageModal:"off"})
  },'')



  return(

 <div>
<div>{id}</div>
<div>userid</div>
 </div>

  )
}

export default UserPage;
