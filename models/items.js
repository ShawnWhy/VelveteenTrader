const { Sequelize } = require(".");
const { INTEGER } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    id:{
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    itemOwnerId: {
      type: Sequelize.INTEGER,
      allowNull: false, 
      references: "User",
      referencesKey:"id"
    }, 
    itemName:{
      type: DataTypes.String,
      allowNull: false,
    },
    itemStory:{
      type: DataTypes.text,
  },
    votes : {
      type: DataTypes.INTEGER,
  },
    highestBid:{
      type: DataTypes.INTEGER,

  },

  portraitImageUrl:{

  },
  imageUrl1:{ 
    type: DataTypes.String
  },
  imageUrl2:{ 
    type: DataTypes.String
  },
  imageUrl3:{ 
    type: DataTypes.String
  },
  modelLink:{ 
    type: DataTypes.String
  },
  });
  return Item;
}
//   personId: {
//         type: Sequelize.INTEGER,
//         references: 'persons', // <<< Note, its table's name, not object name
//         referencesKey: 'id' // <<< Note, its a column name
//   }
// });
//     text: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       // len is a validation that checks that our todo is between 1 and 140 characters
//       validate: {
//         len: [1, 140]
//       }
//     },
//     complete: {
//       type: DataTypes.BOOLEAN,
//       // defaultValue is a flag that defaults a new todos complete value to false if
//       // it isn't supplied one
//       defaultValue: false
//     }
//   });
//   return Todo;
// };


// var Person = sequelize.define('Person', {

//   name: Sequelize.STRING
// });

// var Father = sequelize.define('Father', {

//   age: Sequelize.STRING,
//   //The magic start here
//   personId: {
//         type: Sequelize.INTEGER,
//         references: 'persons', // <<< Note, its table's name, not object name
//         referencesKey: 'id' // <<< Note, its a column name
//   }
// });

// Person.hasMany(Father); // Set one to many relationship


// module.exports = function(sequelize, DataTypes) {
//   var Todo = sequelize.define("Item", {
//     itemOwnerId: {
//       type: Datatypes.INTEGER,
//       allowNull: false, 
//     }
//     text: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       // len is a validation that checks that our todo is between 1 and 140 characters
//       validate: {
//         len: [1, 140]
//       }
//     },
//     complete: {
//       type: DataTypes.BOOLEAN,
//       // defaultValue is a flag that defaults a new todos complete value to false if
//       // it isn't supplied one
//       defaultValue: false
//     }
//   });
//   return Todo;
// };