import React, { Component, useEffect, useState , usecontext, useContext, useRef} from 'react';
import MyItemCard from "../../components/myItemCard";
import API from "../../utils/API"
import MyItempage from "../myItemPage"
import Chatroom from "../chatroom"
import { InformationContext } from "../../App"
import {ItemContext}from "../../App"
import { TopCommentsContext } from '../../components/billboardscroll/billboardscroll';
import Style from "./userPortal.css"



const UserPortal= function(props) {
const [topComments, setTopComments]= useState([])

// useEffect(() => {
//    loadAllMyItems()
   
// },[]);


function loadComments(){

var dataMyItems = myItems;
      
      console.log("dataFavItems")
      console.log(dataMyItems)
      console.log("itemdataas")
      console.log(myItems)
      for(let i=0; i<myItems.length; i++){

        dataMyItems[i].comments = []

      }
      var number = dataMyItems.length
    for (let i = 0; i<dataMyItems.length; i++){
      // res.data.forEach(element => {
        console.log(dataMyItems[i].id)
    API.getComments(dataMyItems[i].id).then(res=>{
      if(res.data.length>0){
      res.data.forEach((object)=>{    
        console.log(object)
    let index = myItems.findIndex(obj => obj.id === object.itemId);
     console.log("index of the array2")
    console.log(index)
    if(index>-1){
      console.log("index of the array")
    console.log(index)
    
    dataMyItems[index].comments.push({userName:object.userName,votes:object.votes,userId:object.userId,text:object.comment, id:object.id, itemId:object.itemId})
    console.log("dataFavItems " )
    console.log(object)
    }
      })}
     })
     
     number-=1;
     console.log(number)
     if(number==0){
      console.log("got all of the things")
      console.log(dataMyItems)
      
      setMyItems(dataMyItems)
     }

      }
      

}





  const [likes, setLikes]=useState(0)
  const [itemNumber, setItemNumber]=useState(0)
  const [bidItems, setBidItems]=useState([])
  const [myItems, setMyItems] = useState([])


  const {userProfile, setUserProfile}= useContext(InformationContext)
  const {chosenItem, setChosenItem}=useContext(ItemContext)

  useEffect(() => {
   loadComments()
   
  },[myItems]);
  
  const calculateLikes= ()=>{
    var length=0
    var templikes=0;
    for(var i=0; i<myItems.length;i++){
      templikes+=myItems[i].likes;
      length++;
    }
    if(length=myItems.length){
      setLikes(templikes)
    }
  
  }

  
  

  const calculateItems =()=>{
    setItemNumber(myItems.length)}
  useEffect(()=>{

  API.getMyItems(userProfile.id).then((result)=>{
    console.log(result)
    setMyItems(result.data)
  })


  },[userProfile])

  useEffect(()=>{
    calculateLikes();
    calculateItems();

  },[myItems])
 


  return(
    <TopCommentsContext.Provider value={{topComments, setTopComments}}>
    <ItemContext.Provider value = {{chosenItem, setChosenItem}}>

    <div className='userPortal_info'>
   <div className='welcomeHome'>  welcome   { userProfile.userName} </div>
   <div className='userPortal_points'>you have {userProfile.points} points</div>
   <div className="userPortal_likes">you have {likes} likes </div>
   <div className='userPortal_itemcount'> you have submitted {itemNumber} items</div>
    </div>
   {!myItems.length?(
     <div className = "noItemMessage">you have no items</div>
   ):(<div className='myItemDisplay'>{myItems.map(item=>{
     return(
       <MyItemCard
         portraitImageUrl={item.imageUrl1}
                 name={item.name}  
                 likes = { item.likes}
                 highestBid = {item.highestBid}
                 itemOwnerId = {item.userId} 
                 itemStory={item.itemStory}
                 id={item.id}
                 imageUrl1={item.imageUrl1}
                 imageUrl2={item.imageUrl2}
                 imageUrl3={item.imageUrl3}
                 modelLink={item.modelLink}
                 comments={item.comments}
                 />
       
     )
   })}</div>)}
   
<div className='chatRoom'>
<Chatroom/>


</div>

<div className={chosenItem.ItemPageModal === "on" ? "itemPageOn" : "itemPageOff" } id = {chosenItem.id}>
              <MyItempage 
              />
            </div>


</ItemContext.Provider>
</TopCommentsContext.Provider>

  )
}

export default UserPortal;
