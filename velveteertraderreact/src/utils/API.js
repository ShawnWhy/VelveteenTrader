import axios from "axios";


export default {
  getFavorites: function(){
    console.log("gettingfavs")
    return axios.get("/api/getFavs");
},

getAllItems : function(){
  console.log("gettingAll")
  return axios.get("/api/allItems")
},

getUserItems : function(id){
  console.log("getthing this one persons items")
  return axios.get("api/items/"+id)
},

getItemDetails : function(id){
  console.log("getting details for this one object")
  return axios.get ("api/itemDetails/"+id)
},

signUp : function(body){
  console.log("signingup");
  return axios.get ("api/signUp",body)
},

logIn : function(body){
  consold.log("logginin");
  return axios.post ("api/login", body)
},

logOut : function(){
  console.log("logout");
  return axios.get("/logout");
},




  moveToPurchase: function(body){
  console.log("doing the switch");
  return axios.post("/moveToPurchased",body)
  },

  logOut: function(){
    console.log("loggingout at API");
    return axios.post("/logout")
  },

getUserID:function(){
  return axios.get("/api/userme")
},
  
getRandom : function(){
return axios.get("/api/random");

},

   getUserInfo : function(name){
     return axios.get("/api/userInfoByName/"+name)

   },

  signup : function(body){
    return axios.post("/api/signup",body)
  },
  login : function(body){
    return axios.post("/api/login",body)
  },

   createUserInfo:function(body){
     return axios.post ("/api/userinformation",body)
   }
     
}

// getAllEmployees: function() {
//   return axios.get("/api/employees");
// },

// getAllEmployeesPositionSort:function(){
//   return axios.get("/api/employeesPosition")
// },
// getAllEmployeesDateSort:function(){
//   return axios.get("/api/employeesDate")
// },

// getEmployee:function(newbody){
//   console.log("lls")
//   console.log(newbody)
//   return axios.post("/api/login", newbody);

// },
// getAllManagers: function() {
//   return axios.get("/api/managers/");
// },

// componentDidMount() {
//   axios.get('/auth/user').then(response => {
//     console.log(response.data)
//     if (!!response.data.user) {
//       console.log('THERE IS A USER')
//       this.setState({
//         loggedIn: true,
//         user: response.data.user
//       })
//     } else {
//       this.setState({
//         loggedIn: false,
//         user: null
//       })
//     }
//   })
// }

// _logout(event) {
//   event.preventDefault()
//   console.log('logging out')
//   axios.post('/auth/logout').then(response => {
//     console.log(response.data)
//     if (response.status === 200) {
//       this.setState({
//         loggedIn: false,
//         user: null
//       })
//     }
//   })
// }

// _login(username, password) {
//   axios
//     .post('/auth/login', {
//       username,
//       password
//     })
//     .then(response => {
//       console.log(response)
//       if (response.status === 200) {
//         // update the state
//         this.setState({
//           loggedIn: true,
//           user: response.data.user
//         })
//       }
//     })
// }