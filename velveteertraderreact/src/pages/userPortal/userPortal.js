import React, { Component, useEffect, useState , usecontext, useContext, useRef} from 'react';
import MyItemCard from "../../components/myItemCard";
import API from "../../utils/API"
import MyItempage from "../myItemPage"
import Chatroom from "../chatroom"
import { InformationContext } from "../../App"
import {ItemContext}from "../../App"
import Style from "./userPortal.css"



const UserPortal= function(props) {
// useEffect(() => {
//    loadAllMyItems()
   
// },[]);






  const [likes, setLikes]=useState(0)
  const [itemNumber, setItemNumber]=useState(0)
  const [bidItems, setBidItems]=useState([])
  const [myItems, setMyItems] = useState([])


  const {userProfile, setUserProfile}= useContext(InformationContext)
  const {chosenItem, setChosenItem}=useContext(ItemContext)


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


  },'')

  useEffect(()=>{
    calculateLikes();
    calculateItems();

  },[myItems])
 


  return(
    <ItemContext.Provider value = {{chosenItem, setChosenItem}}>


   <div> <div> welcome   { userProfile.userName} </div>
   <div>you have {likes} likes </div>
   <div> you have submitted {itemNumber} items</div>

   {!userProfile.items.length?(
     <div>you have no items</div>
   ):(<div>{myItems.map(item=>{
     return(
       <MyItemCard
         portraitImageUrl={item.imageUrl1}
                 name={item.name}  
                 likes = { item.likes}
                 highestBid = {item.highestBid} 
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
<Chatroom>


</Chatroom>
</div>

<div className={chosenItem.ItemPageModal === "on" ? "itemPageOn" : "itemPageOff" } id = {chosenItem.id}>
              <MyItempage 
              />
            </div>

</div>
</ItemContext.Provider>

  )
}

export default UserPortal;
