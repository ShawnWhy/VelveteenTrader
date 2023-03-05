import React, { Component, useEffect, useContext, useState } from 'react';
import Style from "./hearts.css"
import {ItemContext} from "../../App"
import {CardContext} from "../itemCard/itemCard"
import {InformationContext} from "../../App"
import {TopCommentsContext} from '../billboardscroll/billboardscroll';
import API from "../../utils/API"
import UserPage from "../../pages/userPage/userPage"
import { pageUSerContext } from '../../App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";


const Comments =function(props) {
  const {userProfile, setUserProfile} = useContext(InformationContext)
  const {chosenItem, setChosenItem} = useContext(ItemContext)
  const {topComments, setTopComments}= useContext(TopCommentsContext)
  const [commentThrottle, setCommentThrottle] = useState("off")

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

}).catch(err=>{
        console.log(err)
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

  }).catch(err=>{
        console.log(err)
      })

   
  }
  
  
  const voteForComment=(e)=>{
    e.preventDefault()
    e.stopPropagation()
        if(userProfile.points>0 && commentThrottle==="off"){
          setCommentThrottle("on")
          
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
          console.log(userProfile.id)
          if(userProfile.id!==0){
            console.log("userprofile is not 0")
          API.changePoints ({points:newPoints}, userProfile.id)
          .then(res=>{
            console.log(res)
          }).catch((err)=>{
          console.log(err);
        })
          }
          console.log(props.author)
          if(props.author!==0){
          API.getPoints(props.author).then(res=>{
          console.log("got the user points")
          console.log(res.data)
          //  promisedSetState(res.data);
          if(res.data){
              console.log("res.data")

          if(res.data.points !== null){
            console.log("res.data.points")
          var newOwnerPoints = parseInt(res.data.points) +1
          API.changePoints({points:newOwnerPoints}, props.author)
          }
        }
        }).catch((err)=>{
          console.log(err);
        })
      }
        setTimeout(() => {
        setCommentThrottle("off")
      }, 2000);
      }
   

      }
  
    return(
 

    
    <div class = "commentContainer">
    <div className = "commentInfo">
      {props.author}
      <div className = "commentInfoName"  ><Link to = {{pathname: '/userPage/'+props.author}} >{props.authorName}</Link></div><div>:</div>
      <div className = "commentInfoComment" onClick = { (e)=>{HandleVoteClick(e) }}>{props.comment}</div>
    
      </div>
  <div className = "commentVotes othersComment" onClick = { (e)=>{voteForComment(e)}} >votes : {props.votes}</div>
</div>


   
    )
    
}

export default Comments
