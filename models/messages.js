// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    id:{
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references:{
        model:"Items",
        key:"id"
      }
      // references: "Item",
      // referencesKey:"id"
    }, 
   posterId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references:{
         model:"Users",
         key:"id"
       }
      //  referemce: "User",
      //  referencesKey: "id"
   },
    message:{
      type: DataTypes.TEXT,
}
  });
  return Message
}

// addressId: {
//   type: DataTypes.INTEGER,
//   references: {
//       model: 'addresses',
//       key: 'id'
//   }
// }