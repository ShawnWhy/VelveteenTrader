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
    []
    
  )

  const rowForward = ()=>{

  }

  const rowBackwards = () =>{

  }


  
  useEffect(()=>{
    var itemImageUrls= [chosenItem.imageUrl1,chosenItem.imageUrl2, chosenItem. imageUrl3 ]
    setImageRoll(itemImageUrls)
  },[chosenItem])

  
    return(

    
      
      <div>
        <div className = "imagecarosel">
          <img src={imageRoll[0]}></img>
          <a className="prevBigPic" onClick={rowBackwards}>&#10094;</a>

               
<a className="nextBigPic" onClick={rowForward}>&#10095;</a>

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
