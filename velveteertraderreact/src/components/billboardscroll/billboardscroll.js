import React, { Component, useEffect, useState, useContext,useRef} from 'react';
import API from "../../utils/API"
import ItemCard from "../itemCard";
import MyItemCard from "../myItemCard";
import Itempage from "../../pages/itempage"
import { InformationContext } from '../../App';
// import {InformationContext} from "../../App"
import Style from "./billboardscroll.css"
import {ItemContext} from "../../App"
import Comments from "../../components/comment";
import MyComments from "../../components/myComment"

export const FavItemContext = React.createContext();

export const TopCommentsContext = React.createContext();







const Billboardscroll = function() {


  const {chosenItem, setChosenItem}= useContext(ItemContext)

  const {userProfile, setUserProfile}= useContext(InformationContext)


  const [topComments, setTopComments]= useState([])

  const [favoriteItems, SetFavoriteItems] = useState(
    [
      {
        id:1,
        userId:1,
        name: "Gold Pot",
        itemStory:
        "Golg Pot is made of gold  and lives in a place and like to jump",
        likes: 1,
        highestBid: 300,
        portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
        imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
        imageUrl2: "https://i.imgur.com/n65vbtN.jpeg",
        imageUrl3: "https://i.imgur.com/N6ljJ1T.jpeg",
        modelLink:"",
        comments:[
          {author:"Shawnski",text:"this is amazing"},
          {author:"Shawnster",text:"hey bro this is cool"},
          {author:"Shawnssd",text:"hey man cool"}
          ]
      },
      {
        id:2,
        userId:1,
        name: "Jumping TeaPot",
        itemStory:
        "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
        likes: 3,
        highestBid: 400,
        portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg" ,
        imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
        imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:"",
        comments:[
          {author:"Shawnski",text:"this is amazing"},
          {author:"Shawnster",text:"hey bro this is cool"},
          {author:"Shawnssd",text:"hey man cool"}
          ]
      },
      {
        id:3,
        userId:1,
        name: "Jumperson",
        itemStory:
        "this one also lives to jump ",
        likes: 9,
        highestBid: 400,
        portraitImageUrl: "https://i.imgur.com/hpTkbNy.jpg",
        imageUrl1: "https://i.imgur.com/hpTkbNy.jpg",
        imageUrl2: "https://i.imgur.com/3iix37r.jpg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:"",
        comments:[
          {author:"Shawnski",text:"this is amazing"},
          {author:"Shawnster",text:"hey bro this is cool"},
          {author:"Shawnssd",text:"hey man cool"}
          ]
      },
      {
        id:9,
        userId:8,
        name: "crazer",
        itemStory:
        "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
        likes: 1,
        highestBid: 800,
        portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg" ,
        imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
        imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:"",
        comments:[
          {author:"Shawnski",text:"this is amazing"},
          {author:"Shawnster",text:"hey bro this is cool"},
          {author:"Shawnssd",text:"hey man cool"}
          ]
      },
      {
        id:10,
        userId:1,
        name: "doozer",
        itemStory:
        "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
        likes: 1,
        highestBid: 700,
        portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg" ,
        imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
        imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:"",
        comments:[
          {author:"Shawnski",text:"this is amazing"},
          {author:"Shawnster",text:"hey bro this is cool"},
          {author:"Shawnssd",text:"hey man cool"}
          ]
      },
]
)

function ChildrenSetCardInfoBid (bid){
console.log(bid)
console.log("childrensetcard2");

var objectsArray = favoriteItems;

console.log(objectsArray)
let index = favoriteItems.findIndex(obj => obj.id === chosenItem.id);
objectsArray[index].highestBid = bid
SetFavoriteItems(objectsArray)
console.log(objectsArray);

setChosenItem({...chosenItem, highestBid:bid})

 }

const [rotationItems, setRotationItems]=useState(
  []
  
) 

//load the comments for the selected items
function loadComments(){

var dataFavItems = favoriteItems;

      for(let i=0; i<dataFavItems.length; i++){

        dataFavItems[i].comments = []

      }
      var number = dataFavItems.length
    for (let i = 0; i<dataFavItems.length; i++){
      API.getComments(dataFavItems[i].id).then(res=>{
      if(res.data.length>0){
      res.data.forEach((object)=>{    
      let index = favoriteItems.findIndex(obj => obj.id === object.itemId);
      if(index>-1){
    dataFavItems[index].comments.push({authorName:object.userName,author:object.userId,text:object.comment, id:object.id, votes:object.votes, itemId:object.itemId})
       }
      })}
     })
     number-=1;
     if(number==0){
      console.log("got all of the things")
        SetFavoriteItems(dataFavItems)
     }
    }
   }

  useEffect(() => {
   loadComments()
   },[favoriteItems]);

const [newBid, setNewBid]= useState(
  0
)

//submitting bid from the bid modal
const submitBid = function(newBid, oldBid, userid, itemid){
if(newBid>oldBid){
  var body = {
  userId:userid,
  itemId:itemid,
  amount:newBid
}
 API.updateBids(body, itemid).then(res=>{
  console.log(res)
 API.createBid(body).then(res=>{
 console.log(res)
 })
 }).catch(err=>{
  console.log(err)
 })

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
useEffect (()=>{

 loadFavorites()
 loadTopComments()

  },'')

useEffect  (()=>{
  console.log(favoriteItems)
  var tempRot = favoriteItems.slice(0,3)
    
  setRotationItems(tempRot)


  },[favoriteItems]);

  const loadFavorites = function(){
    // console.log("loadfav")
    API.getFavorites()
    .then(res=>{
      // console.log(res)
    //  promisedSetState(res.data);
      SetFavoriteItems(res.data)       // dataFavItems[index].comments=[]
}).catch(err=>{
  console.log(err)
});

  }

  const loadTopComments = function(){
    API.getTopComments()
    .then(res=>{
      setTopComments(res.data)
    })

    
  }

  const rowForward= ()=>{
    var itemlength=favoriteItems.length
    var temFav=favoriteItems.slice(0,itemlength-1)
    temFav.unshift(favoriteItems[itemlength-1])
    SetFavoriteItems (temFav)
  }

  const rowBackwards =()=>{
    var itemlength=favoriteItems.length
    var tempFav = favoriteItems.splice(1,itemlength);
    // console.log(tempFav)
    tempFav.push(favoriteItems[0])
    // console.log(tempFav)
    SetFavoriteItems(tempFav)
}
 const turnOffBidModal = ()=>{
    setChosenItem({...chosenItem, bidModal : "off"})

  }


const turnOffItemPageModal = ()=>{
  setChosenItem({...chosenItem, ItemPageModal:"off"})
}

  
    return (
<TopCommentsContext.Provider value={{topComments, setTopComments}}>

<div>
<div className = {chosenItem.bidModal === "on" ? "bidModalOn" : "bidModalOff" } id = {chosenItem.id}>
        <div className = "bidforum" >
          <div> the highest bid for {chosenItem.name} is {chosenItem.highestBid}</div>
          <div> how much would you like to bid" <input className = "bidInput" onChange = {setNewBid1}  type="number" placeholder={chosenItem.highestBid}></input> </div>
          {/* <div className="visible" onMouseOver={turnOffBidModal}>X</div> */}
          <div className="visible closeBid" onClick={turnOffBidModal}>X</div>
          <div className="submitBid" onClick={()=>{submitBid(newBid, chosenItem.highestBid, userProfile.id, chosenItem.id)}}>submit</div>
        </div>
        </div>



    
          <div className="row justify-content-md-center">
          
        {!rotationItems.length ? (
           <h1 className="text-center">no votes yet</h1>
         ) : (
           <div className= "col-md-12 ">
             <div className ="row justify-content-md-center">

             {rotationItems.map(item => {
               return (

              <FavItemContext.Provider value={{favoriteItems, SetFavoriteItems}}>

                <div></div>
                   
                 {item.userId == userProfile.id ? (
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
           
                 ) : (
                
                 <ItemCard
                 portraitImageUrl={item.imageUrl1}
                 name={item.name}  
                 likes = { item.likes}
                 highestBid = {item.highestBid} 
                 itemStory={item.itemStory}
                 id={item.id}
                 itemOwnerId = {item.userId}
                 imageUrl1={item.imageUrl1}
                 imageUrl2={item.imageUrl2}
                 imageUrl3={item.imageUrl3}
                 modelLink={item.modelLink}
                 comments={item.comments}
                   
                 />
                 )}

                 </FavItemContext.Provider>

               );
             })}
            
           </div>
           </div>
           
            )}
             <a className="prev" onClick={rowBackwards}>&#10094;</a>

               
              <a className="next" onClick={rowForward}>&#10095;</a>
            
            </div>
         <div>
     
      {!topComments?(
          <h1 className = "nocomments">no comments yet</h1>
        ):(
          <div className = "comments">{topComments.map(comment=>{return(
          <div id ={"key "+comment.id} key={comment.id}>
            {/* {comment.author} : {comment.text} */}
        {comment.userId!== userProfile.id ? (
              <div className='comment'>
           {/* {userProfile.id}
           {"comment user id " + comment.userId} */}
            <Comments
            page = "main"
            author={comment.userId}
            authorName={comment.userName}
            id={comment.id}
            comment={comment.comment}
            votes = {comment.votes}
            itemId = {comment.itemId}
            />
            </div>
            ) : (
              <div className='myComment'>
                    {/* {userProfile.id}
           {"comment user id " + comment.userId} */}
            <MyComments
            page = "main"
            author={comment.userId}
            authorName={comment.userName}
            id={comment.id}
            comment={comment.comment}
            votes = {comment.votes}
          itemId = {comment.itemId}
           />
            </div>


            )}

            </div>
        )})}</div>)}


            </div>
            <div className={chosenItem.ItemPageModal === "on" ? "itemPageOn" : "itemPageOff" } id = {chosenItem.id}>
              <FavItemContext.Provider value={{favoriteItems, SetFavoriteItems}}>
              <Itempage 
              />
              </FavItemContext.Provider>

            </div>
            </div>

              
            </TopCommentsContext.Provider>

  )}
    
  export default Billboardscroll;
