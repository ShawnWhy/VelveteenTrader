import React, { Component, useEffect, useState , useContext, useRef} from 'react';
import API from "../../utils/API"
import ItempageUserPage from '../itempageUserPage/itempageUserPage';
import ItemCard from '../../components/itemCard/itemCard';
import { InformationContext } from "../../App"
import {ItemContext}from "../../App"
import Style from "./userPage.css"
import {useParams} from 'react-router-dom';

export const userItemsContext = React.createContext()



const UserPage= function(props) {

  let {id}  = useParams();
  const [userItemsDownloaded, setUserItemDownloaded]= useState([])
  const [otherUser, setOtherUser]= useState({})
  const [likes, setLikes]=useState(0)
  const [itemNumber, setItemNumber]=useState(0)
  const [bidItems, setBidItems]=useState([])

  const {userProfile, setUserProfile}= useContext(InformationContext)
  const {chosenItem, setChosenItem}=useContext(ItemContext)
  const [topComments, setTopComments]= useState([])
  const [userItems, setUserItems] = useState([])


//load all of the comments that relates to the gotten items for the certain user
//and then push those into the userItem variable as an array 

function loadComments(){
  var dataUserItems = userItemsDownloaded;
      
      console.log("dataFavItems")
      console.log(dataUserItems)
      console.log("itemdataas")
      console.log(userItems)
      for(let i=0; i<userItemsDownloaded.length; i++){

        dataUserItems[i].comments = []

      }
      var number = dataUserItems.length
    for (let i = 0; i<dataUserItems.length; i++){
      // res.data.forEach(element => {
    console.log(dataUserItems[i].id)
    API.getCommentsOtherUser(dataUserItems[i].id).then(res=>{
      if(res.data.length>0){
        console.log("commentsgotten")
        console.log(res)
      res.data.forEach((object)=>{    
   
    let index = userItemsDownloaded.findIndex(obj => obj.id === object.itemId);
     console.log("index of the array2")
    console.log(index)
    if(index>-1){
      console.log("index of the array")
    console.log(index)
    
    dataUserItems[index].comments.push({userName:object.userName,votes:object.votes,userId:object.userId,text:object.comment, id:object.id, itemId:object.itemId})
    // console.log("dataFavItems " )
    // console.log(userItems)
    }
      })}
     }).catch(err=>{
      console.log(err);
     })
     
     number-=1;
     console.log(number)
     if(number==0){
      console.log("got all of the things")
      console.log(dataUserItems)
      
      setUserItems(dataUserItems)
     }

      }
      

}
  
useEffect(()=>{
    console.log("useeffect getMyItems")
    console.log(id) 
    API.getOtherUserItems(id).then((result)=>{
    console.log(result)
    setUserItemDownloaded(result.data)
}).catch(err=>{console.log(err)})

setChosenItem({...chosenItem, ItemPageModal:"off"})
console.log("userPage chosenItem")
console.log(chosenItem)
},[id])

//calculate the number of likes the user has received based on all of the gotten Items

const calculateLikes= ()=>{
    var length=0
    var templikes=0;
    for(var i=0; i<userItemsDownloaded.length;i++){
      templikes+=userItemsDownloaded[i].likes;
      length++;
    }
    if(length=userItemsDownloaded.length){
      setLikes(templikes)
    }
  
  }

    useEffect(()=>{
    loadComments();
    calculateLikes();
    calculateItems();

  },[userItemsDownloaded])
 
const [newBid, setNewBid]= useState(
  0
)
  //count the number of the user's items to show in screen
  const calculateItems =()=>{
    setItemNumber(userItemsDownloaded.length)
  }

//set the appearance of the bid number in the chosen item page
function ChildrenSetCardInfoBid (bid){
console.log(bid)
console.log("childrensetcard2");

var objectsArray = userItems;

console.log(objectsArray)
let index = userItems.findIndex(obj => obj.id === chosenItem.id);
objectsArray[index].highestBid = bid
setUserItems(objectsArray)
console.log(objectsArray);

setChosenItem({...chosenItem, highestBid:bid})

 }
//submitting bid from the bid modal
const submitBid = function(newBid, oldBid, userid, itemid){
if(newBid>oldBid){
  var body = {
  userId:userid,
  itemId:itemid,
  amount:newBid
}
 API.updateBids(body, itemid)
 API.createBid(body)
 ChildrenSetCardInfoBid(newBid)
 }
}

 //set current objects await
const setNewBid1 = function(){

  var newbidValue = document.querySelector('.bidInput').value;

  if(newbidValue>0){

      setNewBid(parseInt(newbidValue));
  }
} 

 const turnOffBidModal = ()=>{
    setChosenItem({...chosenItem, bidModal : "off"})

  }


const turnOffItemPageModal = ()=>{
  setChosenItem({...chosenItem, ItemPageModal:"off"})
}


  return(
    <userItemsContext.Provider value = {{userItems, setUserItems}}>
    <ItemContext.Provider value = {{chosenItem, setChosenItem}}>

   

    <div className='userPortal_info'>
   <div className='welcomeHome'>  this is {id} { userProfile.userName}'s page</div>
   <div className='userPortal_points'>they have {userProfile.points} points</div>
   <div className="userPortal_likes">and {likes} likes </div>
   <div className='userPortal_itemcount'> { userProfile.userName} has submitted {itemNumber} items</div>
    </div>

       <div className = {chosenItem.bidModal === "on" ? "bidModalOn" : "bidModalOff" } id = {chosenItem.id}>
        <div className = "bidforum" >
          <div> the highest bid for {chosenItem.name} is {chosenItem.highestBid}</div>
          <div> how much would you like to bid" <input className = "bidInput" onChange = {setNewBid1}  type="number" placeholder={chosenItem.highestBid}></input> </div>
          {/* <div className="visible" onMouseOver={turnOffBidModal}>X</div> */}
          <div className="visible closeBid" onClick={turnOffBidModal}>X</div>
          <div className="submitBid" onClick={()=>{submitBid(newBid, chosenItem.highestBid, userProfile.id, chosenItem.id)}}>submit</div>
        </div>
        </div>
   {!userItems.length?(
     <div className = "noItemMessage">they have no items</div>
   ):(<div className='myItemDisplay userItemDisplay'>{userItems.map(item=>{
     return(
       <ItemCard
         portraitImageUrl={item.imageUrl1}
                 page="user"
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
   

   


<div className={chosenItem.ItemPageModal === "on" ? "itemPageOn" : "itemPageOff" } id = {chosenItem.id}>
              <ItempageUserPage 
              page="user"
              
              />
            </div>


</ItemContext.Provider>
</userItemsContext.Provider>

  )
}



export default UserPage;
