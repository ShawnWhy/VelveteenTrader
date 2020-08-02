import React, { Component, useEffect, useState } from 'react';
import API from "../../utils/API"
import apiRoutes from '../../../../routes/api-routes';
import ItemCard from "../itemCard";



const Billboardscroll = function() {

  const [favoriteItems, SetFavoriteItems] = useState(
    [
      {
        id:1,
        itemOwnerId:1,
        itemName: "Gold Pot",
        itemStory:
        "Golg Pot is made of gold  and lives in a place and like to jump",
        votes: 1,
        highestBid: 300,
        portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
        imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
        imageUrl2: "https://i.imgur.com/n65vbtN.jpeg",
        imageUrl3: "https://i.imgur.com/N6ljJ1T.jpeg",
        modelLink:""
      },
      {
        id:2,
        itemOwnerId:1,
        itemName: "Jumping TeaPot",
        itemStory:
        "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
        votes: 1,
        highestBid: 400,
        portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg",
        imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
        imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:""
      },
      {
        id:3,
        itemOwnerId:1,
        itemName: "Jumperson",
        itemStory:
        "this one also lives to jump ",
        votes: 1,
        highestBid: 400,
        portraitImageUrl: "https://i.imgur.com/SI0tPk8.jpg",
        imageUrl1: "https://i.imgur.com/SI0tPk8.jpg",
        imageUrl2: "https://i.imgur.com/3iix37r.jpeg",
        imageUrl3: "https://i.imgur.com/0INGPZD.jpeg",
        modelLink:""
      },
]
)

  // useEffect(() => {
  //  loadFavorites()
   
  // },);

  const loadFavorites = function(){
    API.getFavorites()
    .then(res=>{
      SetFavoriteItems(res)

      
    })

  }



  
    return (
    <div>
      <div className = ""> 
        <div className = "boardRotation">
        {!favoriteItems.length ? (
           <h1 className="text-center">no votes yet</h1>
         ) : (
           <div>
             {favoriteItems.map(item => {
               return (
                 <ItemCard
                 itemName={item.itemName}  
                 votes = { item.votes}
                 highestBid = {item.highestBid} 
                   
                 />
               );
             })}
           </div>
            )}
         </div>
      </div>
  </div>
  )}
    
  export default Billboardscroll;
