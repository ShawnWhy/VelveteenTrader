import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {CardContext} from "../itemCard/itemCard"
import {InformationContext} from "../../App"
import API from "../../utils/API"

const Comments =function(props) {
  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)


// console.log(chosenItem)


  const voteForComment=(e)=>{
    e.preventDefault()
    e.stopPropagation()
        if(userProfile.points>0){
          var newVote = parseInt(props.votes)
          newVote++
          console.log(newVote)
          var itemData = chosenItem;
          console.log(itemData)
          var index = chosenItem.comments.findIndex(obj => obj.id === props.id)
          console.log(index)

          itemData.comments[index].votes = newVote;
          itemData.comments.sort((a, b) =>  b.votes - a.votes )
          console.log("sorted")
          console.log(itemData.comments)

          
          setChosenItem({...chosenItem, comments:itemData.comments})
          //update the votenumber on comment
          API.updateVotes(props.id,{votes:newVote})

          var newPoints = userProfile.points - 1
          setUserProfile(()=>({...userProfile, points:newPoints}))
          console.log(newPoints)
          API.changePoints ({points:newPoints}, userProfile.id)
                
          API.getPoints(chosenItem.itemOwnerId).then(res=>{
          console.log("got the user points")
          console.log(res.data)
          //  promisedSetState(res.data);
          if(res.data.points !== null){
          var newOwnerPoints = parseInt(res.data.points) +1
          API.changePoints({points:newOwnerPoints}, chosenItem.itemOwnerId)
          }
        })
      }
      }


  

//   const addLike = ()=>{
//     if(userProfile.points>0){
//     var newLike = parseInt(cardInfo.likes);
//     newLike+=1;
//     console.log("like")
//     var body={
//       "id":props.id,
//       "likes":newLike,
//       "userId":userProfile.id
    
//     }
//     console.log(body);
//     API.updateLikes(body, props.id)
   
 
//     //set favorite items
//     var data = [...favoriteItems]
//     var index = data.findIndex(obj => obj.id === props.id);
//     data = favoriteItems;
//     data[index].likes = newLike
//     SetFavoriteItems(data)
//     props.ChildrenSetCardInfo(newLike)
//     console.log(cardInfo.likes);
  
// //
// var newPoints = userProfile.points - 1
// setUserProfile(()=>({...userProfile, points:newPoints}))
// console.log(newPoints)
// API.changePoints ({points:newPoints}, userProfile.id)
// console.log('cardinfo')
// console.log(cardInfo);
// API.getPoints(cardInfo.itemOwnerId).then(res=>{
//   console.log("got the user points")
// console.log(res.data)
//     //  promisedSetState(res.data);
// if(res.data.points !== null){
// var newOwnerPoints = parseInt(res.data.points) +1
// API.changePoints({points:newOwnerPoints}, cardInfo.itemOwnerId)
// }
// })
// }


// }
  
  
    return(
    // <CardContext.Consumer>
    <div onClick = {(e)=>{voteForComment(e)}}>
      <div>{props.authorName}</div><div>:</div>
      <div>{props.comment}</div>
    <div >
      </div>
  <div className = "commentVotes">{props.votes}</div>

    </div>
    // </CardContext.Consumer>
    
    )
    
}

export default Comments
