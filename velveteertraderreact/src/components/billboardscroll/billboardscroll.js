import React, { Component, useEffect, useState } from 'react';
import API from "../../util/API";



const Billboardscroll = function() {

  const [favoriteItems, SetFavoriteItems] = useState(
    
  )

  useEffect(() => {
   loadFavorites()
   
  },);

  const loadFavorites = function(){
    API.getFavorites()
    .then(res=>{
      
    })

  }



  
    return <div>
      <div> 
        
      </div>

    </div>;
  }


export default Billboardscroll;
