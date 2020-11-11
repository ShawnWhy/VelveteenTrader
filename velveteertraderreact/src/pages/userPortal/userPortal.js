import React, { Component, useEffect, useState , usecontext, useContext, useRef} from 'react';
import ItemCard from "../../components/itemCard";
import Itempage from "../itempage"

import { InformationContext } from "../../App"
import {ItemContext}from "../../App"


const UserPortal= function(props) {






  const [likes, setLikes]=useState(0)
  const [itemNumber, setItemNumber]=useState(0)
  const [bidItems, setBidItems]=useState([])


  const {userProfile, setUserProfile}= useContext(InformationContext)
  const {chosenItem, setChosenItem}=useContext(ItemContext)
  const calculateLikes= ()=>{
    var length=0
    var templikes=0;
    for(var i=0; i<userProfile.items.length;i++){
      templikes+=userProfile.items[i].likes;
      length++;
    }
    if(length=userProfile.items.length){
      setLikes(templikes)
    }
 
    
  }

  

  const calculateItems =()=>{
    setItemNumber(userProfile.items.length)}
  useEffect(()=>{
    calculateLikes();
    calculateItems();

    


    

  },[userProfile.userName])
 


  return(
    <ItemContext.Provider value = {{chosenItem, setChosenItem}}>

   <div> <div> welcome   { userProfile.userName} </div>
   <div>you have {likes} likes </div>
   <div> you have submitted {itemNumber} items</div>

   {!userProfile.items.length?(
     <div>you have no items</div>
   ):(<div>{userProfile.items.map(item=>{
     return(
       <ItemCard
         portraitImageUrl={item.portraitImageUrl}
                 itemName={item.itemName}  
                 likes = { item.likes}
                 highestBid = {item.highestBid} 
                 itemStory={item.itemStory}
                 id={item.id}
                 imageUrl1={item.imageUrl1}
                 imageUrl2={item.imageUrl2}
                 imageUrl3={item.imageUrl3}
                 modelLink={item.modelLink}
                 comments={item.comments}
                 />
       
     )
   })}</div>)}


<div className={chosenItem.ItemPageModal === "on" ? "itemPageOn" : "itemPageOff" } id = {chosenItem.id}>
              <Itempage 
              />
            </div>

</div>
</ItemContext.Provider>

  )
}

export default UserPortal;
