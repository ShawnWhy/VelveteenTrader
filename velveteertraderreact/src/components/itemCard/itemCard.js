import React, { imageBackground, Component, useEffect, useState, useContext } from 'react';
import Bids from "../bids";
import Hearts from "../hearts";
import API from "../../utils/API";
import {InformationContext} from "../../App"
import Style from "./itemCard.css"
import {ItemContext} from "../../App"

export const CardContext = React.createContext();

const ItemCard = function(props){

  const [cardInfo, setCardInfo]=useState(   
    {likes:props.likes,
    highestBid: props.highestBid,
    itemStory: props.itemStory,
    itemOwnerId:props.itemOwnerId,
    id:props.id,
    itemName:props.itemName,
    imageUrl1:props.imageUrl1,
    imageUrl2: props.imageUrl2,
    imageUrl3:props.imageUrl3,
    modelLink:props.modelLink,}
  )

  const {chosenItem, setChosenItem}= useContext(ItemContext)

  useEffect(()=>{
    setCardInfo({
      likes:props.likes,
      highestBid: props.highestBid,
      itemStory: props.itemStory,
      itemOwnerId:props.itemOwnerId,
      id:props.id,
      itemName:props.itemName,
      imageUrl1:props.imageUrl1,
      imageUrl2: props.imageUrl2,
      imageUrl3:props.imageUrl3,
      modelLink:props.modelLink,
    })},[props]

  )



  const setChosenItemPage = ()=>{
    setChosenItem({...chosenItem, 
      likes:props.likes,
      highestBid: props.highestBid,
      itemStory: props.itemStory,
      itemOwnerId:props.itemOwnerId,
      id:props.id,
      itemName:props.itemName,
      imageUrl1:props.imageUrl1,
      imageUrl2: props.imageUrl2,
      imageUrl3:props.imageUrl3,
      modelLink:props.modelLink,
      bidModal:"off",
      ItemPageModal:"on",
      comments:props.comments
      

    })

    console.log(chosenItem.itemStory)
    
  }


  


    return (
      <CardContext.Provider value = {{cardInfo, setCardInfo}}>
      <div style={{backgroundImage: `url(${props.portraitImageUrl})` }} className = "col-md-3 itemCard" >
        
          <div className = "itemName">
            {cardInfo.itemName}
          </div>
          <div className="otherInfo">
             <Bids
             highestBid={cardInfo.highestBid}
             id = {cardInfo.id}
             itemName= {cardInfo.itemName}
             />
               
            <Hearts
            likes={cardInfo.likes}/>
          
          </div>
          
        
        <div className = "modal1">
          <div className = "modalContent1">
            <div onClick={setChosenItemPage} >view ItemDetails
            </div> 
             </div> 
          
        </div>
         </div>
         </CardContext.Provider>
  )  
}


export default ItemCard;
