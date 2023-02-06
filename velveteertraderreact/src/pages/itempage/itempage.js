import React, { Component, useEffect, useState , usecontext, useContext} from 'react';
import Bids from "../../components/bids";
import Hearts2 from "../../components/hearts2"
import {ItemContext} from "../../App"
import {InformationContext} from "../../App"
import Style from "./itempage.css"
import API from "../../utils/API"
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
    // console.log(chosenItem);
    var itemImageUrls= [chosenItem.imageUrl1,chosenItem.imageUrl2, chosenItem. imageUrl3 ]
    setImageRoll(itemImageUrls)
  },[chosenItem])

  const [closeText, setCloseText]=useState("off") 
  const showCloseText = ()=>{
    setCloseText("on")}
  const removeCloseText =()=>{
    setCloseText("off") 
  }
  const [commentSection, setCommentSection]=useState("off")
  const turnOnComment=()=>{
    setCommentSection("on")
  }
  const turnOffComment=()=>{
    setCommentSection("off")
  }
    return(

    
      
      <div className="page">
      <div className="closeModal" onMouseLeave={removeCloseText} onMouseOver={showCloseText} onClick ={closeModal}><div className={closeText==="on"?"visible":"invisible"}>close</div><div className={closeText==="on"?"invisible":"visible"}>x</div> </div>

        <div className = "imageCarosel">

        <a className="prevBigPic" onClick={rowBackwards}>&#10094;</a>
          {imageRoll.map((image,index)=>{
            return(
              <img  name = {index} className={"bigImage "+ (index==imageNumber?"":"invisible")}  src={image}></img>


            )
          })}

               
<a className="nextBigPic" onClick={rowForward}>&#10095;</a>

        </div>

        <div className="detailDisplay">
        <div className="bidDisplay">
        <Bids 
        highestBid={chosenItem.highestBid}
        name={chosenItem.name}
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
        <div onClick={turnOnComment} className={commentSection==="on"?"invisible":"button"}>Turn On comments</div>
        <div onClick={turnOffComment} className={commentSection==="off"?"invisible":"button"}>Turn off comments</div>

        <div className={commentSection==="on"?"commentSection":"invisible"}>
        
        {!chosenItem.comments?(
          <h1 className = "nocomments">no comments yet</h1>
        ):(
          <div className = "comments">{chosenItem.comments.map(comment=>{return(
          <div className='comment'>{comment.author} : {comment.text}</div>
        )})}</div>)}
        <form className="commentForm">
          <input className="commentInput" type="text"></input>
          <input className="commentSubmit" type="submit"></input>
        </form>
        </div>
        

      </div>)}
    

export default Itempage;
