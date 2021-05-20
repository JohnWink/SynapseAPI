

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        minimumStock: {
            type: DataTypes.INTEGER
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });

  
    return Product;
  };