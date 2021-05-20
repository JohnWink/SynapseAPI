module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define("stock", {
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });
  
    
    return Stock;
  };
  