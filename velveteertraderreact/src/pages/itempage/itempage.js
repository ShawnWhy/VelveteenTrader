import React, { Component, useEffect, useState , usecontext, useContext} from 'react';
import Bids from "../../components/bids";
import Hearts2 from "../../components/hearts2"
import {ItemContext} from "../../components/billboardscroll/billboardscroll"
import {InformationContext} from "../../App"
import Style from "./itempage.css"
const Itempage = function(props)  {

  const {userProfile, setUserProfile}= useContext(InformationContext)

  const {chosenItem, setChosenItem}= useContext(ItemContext)
  const [imageRoll, setImageRoll]= useState(
()    


  )
  useEffect(()=>{
    
  })

  
    return(

    
      
      <div>
        <div className = "imagecarosel">

        </div>

        <div className="detailDisplay">
        <div className="bidDisplay">
        <Bids 
        highestBid={chosenItem.highestBid}
        itemName={chosenItem.itemName}
        />
        </div>
        <div className="heartDisplay">
        <Hearts2 
        likes = {chosenItem.likes}
         />
         </div>
        </div>

        <p className="itemStory">
          {chosenItem.itemStory}
        </p>


      
        


      </div>



    ) 
  
}

export default Itempage;
