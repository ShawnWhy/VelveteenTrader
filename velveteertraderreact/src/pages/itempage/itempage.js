import React, { Component, useEffect, useState , usecontext, useContext} from 'react';
import Bids from "../../components/bids";
import Hearts2 from "../../components/hearts2"
import {ItemContext} from "../../App"
import {InformationContext} from "../../App"
import Style from "./itempage.css"
const Itempage = function(props)  {

  const {userProfile, setUserProfile}= useContext(InformationContext)

  const {chosenItem, setChosenItem}= useContext(ItemContext)
  const [imageRoll, setImageRoll]= useState(
    []
    
  )
  const [imageNumber, setImageNumber]=useState(0)

  const rowForward = ()=>{
   var length=imageRoll.length;
   var number = imageNumber
   var number = number+1;
   if (number >length-1){
     number=0
   }
   setImageNumber(number);
}



  const rowBackwards = () =>{
    var length=imageRoll.length;
    var number = imageNumber
    var number = number-1;
    if (number <0){
      number= length-1
    }
    setImageNumber(number);

   }

   const closeModal = ()=>
   {
     setChosenItem({...chosenItem,ItemPageModal:"off"})
   }


  
  useEffect(()=>{
    console.log("refreshment")
    console.log(chosenItem);
    var itemImageUrls= [chosenItem.imageUrl1,chosenItem.imageUrl2, chosenItem. imageUrl3 ]
    setImageRoll(itemImageUrls)
  },[chosenItem])

  
    return(

    
      
      <div>
        <div ClassName="closeModal" onClick ={closeModal}>x</div>
        <div className = "imagecarosel">
        <a className="prevBigPic" onClick={rowBackwards}>&#10094;</a>
          {imageRoll.map((image,index)=>{
            return(
              <img  name = {index} className={"BigImage "+ (index==imageNumber?"":"invisible")}  src={image}></img>


            )
          })}

               
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

 
        {!chosenItem.comments?(
          <h1 className = "nocomments">no comments yet</h1>
        ):(
          <div>{chosenItem.comments.map(comment=>{return(
          <div>{comment.author} : {comment.text}</div>
        )})}</div>)}

      </div>)}
    

export default Itempage;
