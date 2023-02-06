import React, { imageBackground, Component, useEffect, useState, useContext } from 'react';
import MyBids from "../myBids";
import MyHearts from "../myHearts";
import API from "../../utils/API";
import {InformationContext} from "../../App"
import Style from "./itemCard.css"
import {ItemContext} from "../../App"

export const CardContext = React.createContext();

const MyItemCard = function(props){

  const [cardInfo, setCardInfo]=useState(   
    {likes:props.likes,
    highestBid: props.highestBid,
    itemStory: props.itemStory,
    itemOwnerId:props.itemOwnerId,
    id:props.id,
    name:props.name,
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
      name:props.name,
      imageUrl1:props.imageUrl1,
      imageUrl2: props.imageUrl2,
      imageUrl3:props.imageUrl3,
      modelLink:props.modelLink,
    })},[props]

  )

//sets the invisible popup for the item

  const setChosenItemPage = ()=>{
    setChosenItem({...chosenItem, 
      likes:props.likes,
      highestBid: props.highestBid,
      itemStory: props.itemStory,
      itemOwnerId:props.itemOwnerId,
      id:props.id,
      name:props.name,
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

 function ChildrenSetCardInfo (info){
  console.log("childrensetcard");
  console.log(info);
setCardInfo(()=>({...cardInfo, likes:info

}))
console.log(cardInfo);

 }
  


    return (
      <CardContext.Provider value = {{cardInfo}}>
      <div style={{backgroundImage: `url(${props.portraitImageUrl})` }} className = "col-md-3 itemCard" >
        
          <div className = "name">
            {cardInfo.name}
          </div>
          <div className="otherInfo">
             <MyBids
             highestBid={cardInfo.highestBid}
             id = {cardInfo.id}
             name= {cardInfo.name}
             />
               
            <MyHearts
            likes={cardInfo.likes}
            id={cardInfo.id}
            ChildrenSetCardInfo = {ChildrenSetCardInfo}/>
          
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


export default MyItemCard;
