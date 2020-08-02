import React, { useEffect, useState, useContext } from "react";
import { InformationContext } from "../../App";


function Homepage(props) {
  const {userProfile, setUserProfile}= useContext(InformationContext)







    return <div>
        <div>{userProfile.userName}</div>
        <div onClick={()=> setUserProfile({...userProfile, userName:"shawa"})}>sddss</div>

      <div >
        
      </div>
    </div>;
  }


export default Homepage;
