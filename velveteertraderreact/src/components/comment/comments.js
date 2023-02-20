import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {CardContext} from "../itemCard/itemCard"
import {InformationContext} from "../../App"
import {TopCommentsContext} from '../billboardscroll/billboardscroll';
import API from "../../utils/API"

const Comments =function(props) {
  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)
  const {topComments, setTopComments}= useContext(TopCommentsContext)


  const HandleVoteClick = ()=>{
    if(props.page =="main"){
      setChosenItemPage()
    }



  }

    const setChosenItemPage = ()=>{
      let itemComments = []

      API.getComments(props.itemId).then((res)=>{
      console.log(res.data)
      if(res.data.length>0){
      res.data.forEach((object)=>{ 
        itemComments.push({authorName:object.userName,votes:object.votes,author:object.userId,text:object.comment, id:object.id})   

      })
   
  }

})

    API.getItemDetails(props.itemId).then((res)=>{ 
      console.log(res) 
    setChosenItem({...chosenItem, 
      likes:res.data[0].likes,
      highestBid:res.data[0].highestBid,
      itemStory: res.data[0].itemStory,
      itemOwnerId:res.data[0].userId,
      id:res.data[0].id,
      name:res.data[0].name,
      imageUrl1:res.data[0].imageUrl1,
      imageUrl2: res.data[0].imageUrl2,
      imageUrl3:res.data[0].imageUrl3,
      modelLink:res.data[0].modelLink,
      bidModal:"off",
      ItemPageModal:"on",
      comments:itemComments
    })



    console.log(chosenItem)

  })

   
  }
  
  
  const voteForComment=(e)=>{
    e.preventDefault()
    e.stopPropagation()
        if(userProfile.points>0){
          
          var newVote = parseInt(props.votes)
          newVote++
          console.log(newVote)
          if(props.page =="item"){
          var itemData = chosenItem;
          console.log(itemData)
          var index = chosenItem.comments.findIndex(obj => obj.id === props.id)
          console.log(index)

          itemData.comments[index].votes = newVote;
          itemData.comments.sort((a, b) =>  b.votes - a.votes )
          setChosenItem({...chosenItem, comments:itemData.comments})
          //update the votenumber on comment
          }
          else if (props.page=="main"){

            var topCommentsData = topComments;
            var index=topCommentsData.findIndex(obj=> obj.id ===props.id)
            topCommentsData[index].votes = newVote;
            topCommentsData.sort((a, b) =>  b.votes - a.votes )
            setTopComments(topCommentsData);



          }
          API.updateVotes(props.id,{votes:newVote})

          var newPoints = userProfile.points - 1
          setUserProfile(()=>({...userProfile, points:newPoints}))
          console.log(newPoints)
          if(userProfile.id!=0){
          API.changePoints ({points:newPoints}, userProfile.id)
          }
          API.getPoints(props.itemId).then(res=>{
          console.log("got the user points")
          console.log(res.data)
          //  promisedSetState(res.data);
          if(res.data.points !== null){
          var newOwnerPoints = parseInt(res.data.points) +1
          API.changePoints({points:newOwnerPoints}, props.itemId)
          }
        })
      }
      }
  
    return(
    // <CardContext.Consumer>
    <div className = "commentInfo" onClick = { (e)=>{HandleVoteClick(e) }} >
      <div className = "commentInfoName" >{props.authorName}</div><div>:</div>
      <div className = "commentInfoComment">{props.comment}</div>
    <div >
      </div>
  <div className = "commentVotes" onClick = { (e)=>{voteForComment(e)}} >{props.votes}</div>

    </div>
   
    )
    
}

export default Comments
