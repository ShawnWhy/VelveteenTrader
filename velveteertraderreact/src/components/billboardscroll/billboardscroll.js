import React, { Component, useEffect, useState, useContext } from 'react';
import API from "../../utils/API"
import ItemCard from "../itemCard";
import InformationContext from "../../App"
import Style from "./billboardscroll.css"




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
        portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg" ,
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
        portraitImageUrl: "https://i.imgur.com/hpTkbNy.jpg",
        imageUrl1: "https://i.imgur.com/hpTkbNy.jpg",
        imageUrl2: "https://i.imgur.com/3iix37r.jpg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:""
      },
      {
        id:9,
        itemOwnerId:1,
        itemName: "crazer",
        itemStory:
        "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
        votes: 1,
        highestBid: 800,
        portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg" ,
        imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
        imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:""
      },
      {
        id:10,
        itemOwnerId:1,
        itemName: "doozer",
        itemStory:
        "Jumping tea Put loves to go up the stairs, Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ,Jumping tea Put loves to go up the stairs ",
        votes: 1,
        highestBid: 700,
        portraitImageUrl: "https://i.imgur.com/RyyVi7q.jpeg" ,
        imageUrl1: "https://i.imgur.com/RyyVi7q.jpeg",
        imageUrl2: "https://i.imgur.com/8mQuaJT.jpeg",
        imageUrl3: "https://i.imgur.com/MCmdtIt.jpeg",
        modelLink:""
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



  
    return (
    
          <div className="row justify-content-center">
          
        {!rotationItems.length ? (
           <h1 className="text-center">no votes yet</h1>
         ) : (
           <div className= "col-md-12 justify-content-center">
                         <a class="prev" onClick="">&#10094;</a>

             {rotationItems.map(item => {
               return (
                 <ItemCard
                 portraitImageUrl={item.portraitImageUrl}
                 itemName={item.itemName}  
                 votes = { item.votes}
                 highestBid = {item.highestBid} 
                   
                 />
               );
             })}
               <div>
              <a class="next" onClick="">&#10095;</a>
            </div>
           </div>
           
            )}
            
            </div>
      
  
  )}
    
  export default Billboardscroll;
