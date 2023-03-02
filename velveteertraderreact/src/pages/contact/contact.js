import React, { Component, useEffect, useState , usecontext, useContext, useRef} from 'react';
import Style from "./contact.css"
import Mypic from "./mypic.jpg"

const Contact = function(props){

  const contactDepartments =[
    "technical Support",
    "Advertising opportunities",
    "suggestions",]

  const changeDepartment=(event)=>{
    event.stopPropagation();
    event.preventDefault();
    switch (event.target.value) {
      case "technical Support":
        setcontactDiv("engineer") 
        break;
      case "Advertising opportunities":
        setcontactDiv("advertising") 
        break;
      case "suggestions":
          setcontactDiv("manager") 
          break;
      }
  }
  const [contactDiv, setcontactDiv] = useState("");

  const departmentRef = useRef()
  const nameRef = useRef()

  const messageRef = useRef()
  const emailRef = useRef()

  const submitmessage = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    if(nameRef.current.value||emailRef.current.value
      ||messageRef.current.value){
    var name = nameRef.current.value;
    var email = emailRef.current.value;
    var message = messageRef.current.value;
    var department = contactDiv;

    var messageSubmit= {
      name: name,
      email : email,
      message: message,
      department: department,
    }

    console.log(messageSubmit);
  }
  else{
    
  }

  }


return(
  
  <div className="contactBackground">
    
    <div className ="contactContent">
    <h2>Function Under Construction</h2>
    <p>name</p>
    < input type= "text" placeholder="name" ref={nameRef}>
    </input>
    <p>email</p>
    <input type = "text" placeholder = "email" ref={emailRef}></input>
    <p>message </p>
    <textarea ref={messageRef}></textarea>
    <select className="departmentSelect" onChange={changeDepartment} ref={departmentRef}>
      <option disabled selected value>Select Department </option>
    {contactDepartments.map (department =>
      {
        return(
        <option value={department}>{department}</option>
        )

      }
      )}
  </select>
  <div className={"EmployeeProfile "+(contactDiv==="engineer"?"":"invisible")}>
  <div className="imageContainer">
  <img className="profilePic" src={Mypic}></img>
  </div>   
      <div className="employeeInfo">
      <p>Contact Name: Shawn Yu</p>
      <p>position: Engineer</p>
      <p>bio:shawn is the creator of Velveteen Trader</p>
      </div>
  </div>

  <div className={"EmployeeProfile "+(contactDiv==="advertising"?"":"invisible")}>
  <div className="imageContainer">
  <img className="profilePic" src={Mypic}></img>
  </div>  
      <div className="employeeInfo">
      <p>Contact Name: Shawn Yu</p>
      <p>position: Advertising Director</p>
      <p>bio:shawn is the creator of Velveteen Trader</p>
      </div>
  </div>

  <div className={"EmployeeProfile "+(contactDiv==="manager"?"":"invisible")}>
  <div className="imageContainer">
  <img className="profilePic" src={Mypic}></img>
  </div>  
      <div className="employeeInfo">
      <p>Contact Name: Shawn Yu</p>
      <p>position: Operations Manager</p>
      <p>bio:shawn is the creator of Velveteen Trader</p>
      </div>
  </div>
  <button className="submitButton" onClick={submitmessage}>send</button>

 
  </div>
  </div>
)



}

export default Contact;
