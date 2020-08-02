const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    id:{
      type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    itemId: {
      type: Sequelize.INTEGER,
      allowNull: false, 
      references: "Item",
      referencesKey:"id"
    }, 
   posterId: {
       type: sequelize.INTEGER,
       allowNull: false,
       referemce: "User",
       referencesKey: id
   },
    message:{
      type: DataTypes.text,
}
  });
  return Message
}