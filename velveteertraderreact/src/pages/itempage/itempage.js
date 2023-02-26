import React, { Component, useEffect, useState , usecontext, useContext} from 'react';
import Bids from "../../components/bids";
import MyBids from "../../components/myBids";
import Hearts2 from "../../components/hearts2"
import MyHearts2 from "../../components/myHearts2"
import Comments from "../../components/comment"
import MyComments from "../../components/myComment"

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


const submitComment = (event)=>{
event.preventDefault();
event.stopPropagation();

var comment = document.querySelector('.commentInput').value;

var itemData = chosenItem;
itemData.comments.push({author:userProfile.id,text:comment,authorName:userProfile.userName,votes:0})
setChosenItem({...chosenItem, comments:itemData.comments})



API.postComment({
itemId:chosenItem.id,
userId:userProfile.id,
userName:userProfile.userName,
votes:0,
comment:comment
})



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
      <div className="closeModal" onMouseLeave={removeCloseText} onMouseOver={showCloseText} onClick ={closeModal}><div className={closeText==="on"?"visible closeItemPage2":"invisible"}>close</div><div className={closeText==="on"?"invisible":"visible closeItemPage"}>x</div> </div>

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
       
        {chosenItem.itemOwnerId !== userProfile.id ? (<Bids 
        highestBid={chosenItem.highestBid}
        name={chosenItem.name}
        id={chosenItem.id}
        />) : (
          <MyBids 
        highestBid={chosenItem.highestBid}
        name={chosenItem.name}
        id={chosenItem.id}
        />


        )} 
        </div>
        <div className="heartDisplay">
        {chosenItem.itemOwnerId !== userProfile.id ? (
        <Hearts2 
        likes = {chosenItem.likes}
         />
        ):(<MyHearts2 
        likes = {chosenItem.likes}
        id={chosenItem.id}
        
         />
         )
        }
         </div>
        </div>

        <p className="itemStory">
          {chosenItem.itemStory}
        </p>
        <div onClick={turnOnComment} className={commentSection==="on"?"invisible":"button turnOnComment"}>Turn On comments</div>
        <div onClick={turnOffComment} className={commentSection==="off"?"invisible":"button turnOffComment"}>Turn off comments</div>

        <div className={commentSection==="on"?"commentSection":"invisible"}>
        
        {!chosenItem.comments?(
          <h1 className = "nocomments">no comments yet</h1>
        ):(
          <div className = "comments">{chosenItem.comments.map(comment=>{return(
          <div id ={"key "+comment.id} key={comment.id} >
            {/* {comment.author} : {comment.text} */}
            {comment.author !== userProfile.id ? (
              <div className='comment'>
            <Comments
            page="item"
            itemId={comment.itemId}
            author={comment.author}
            authorName={comment.authorName}
            id={comment.id}
            comment={comment.text}
            votes = {comment.votes}
            />
            </div>
            ) : (
              <div className='myComment'>
            <MyComments
            page="item"
            itemId={comment.itemId}
            author={comment.author}
            authorName={comment.authorName}
            id={comment.id}
            comment={comment.text}
            votes = {comment.votes}
            />
            </div>


            )}

            </div>
        )})}</div>)}
        <form onSubmit ={submitComment} className="commentForm">
          <input className="commentInput" type="text"></input>
          <input className="commentSubmit" type="submit"></input>
        </form>
        </div>
        

      </div>)}
    

export default Itempage;
