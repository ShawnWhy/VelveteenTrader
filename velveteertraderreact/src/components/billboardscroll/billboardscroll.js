import React, { Component, useEffect, useState, useContext } from 'react';
import API from "../../utils/API"
import ItemCard from "../itemCard";
import Itempage from "../../pages/itempage"
// import {InformationContext} from "../../App"
import Style from "./billboardscroll.css"
import {ItemContext} from "../../App"





const Billboardscroll = function() {

  const {chosenItem, setChosenItem}= useContext(ItemContext)


  const [favoriteItems, SetFavoriteItems] = useState(
    [
      {
        id:1,
        itemOwnerId:1,
        itemName: "Gold Pot",
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
        itemOwnerId:1,
        itemName: "Jumping TeaPot",
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
        itemOwnerId:1,
        itemName: "Jumperson",
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
        itemOwnerId:8,
        itemName: "crazer",
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
        itemOwnerId:1,
        itemName: "doozer",
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

const [rotationItems, setRotationItems]=useState(
  []
  
) 

  // useEffect(() => {
  //  loadFavorites()
   
  // },);

  useEffect  (()=>{
    var tempRot = favoriteItems.slice(0,3)
    setRotationItems(tempRot)


  },[favoriteItems]);

  const loadFavorites = function(){
    API.getFavorites()
    .then(res=>{
      SetFavoriteItems(res)

      
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
    console.log(tempFav)
    tempFav.push(favoriteItems[0])
    console.log(tempFav)
    SetFavoriteItems(tempFav)
}
 const turnOffBidModal = ()=>{
    setChosenItem({...chosenItem, bidModal : "off"})

  }


const turnOffItemPageModal = ()=>{
  setChosenItem({...chosenItem, ItemPageModal:"off"})
}

  
    return (
<div>
<div onClick={turnOffBidModal} className = {chosenItem.bidModal === "on" ? "bidModalOn" : "bidModalOff" } id = {chosenItem.id}>
        <div className = "bidforum" >
          <div> the highest bid for {chosenItem.itemName} is {chosenItem.highestBid}</div>
          <div> how much would you like to bid" <input type="number" placeholder="100"></input> </div>
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
                 <ItemCard
                 portraitImageUrl={item.portraitImageUrl}
                 itemName={item.itemName}  
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
               );
             })}
             
            
           </div>
           </div>
           
            )}
             <a className="prev" onClick={rowBackwards}>&#10094;</a>

               
              <a className="next" onClick={rowForward}>&#10095;</a>
            
            </div>
            <div className={chosenItem.ItemPageModal === "on" ? "itemPageOn" : "itemPageOff" } id = {chosenItem.id}>
              <Itempage 
              />
            </div>
            </div>

      
  
  )}
    
  export default Billboardscroll;
