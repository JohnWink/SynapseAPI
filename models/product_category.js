module.exports = (sequelize, DataTypes) => {
    const Product_Category = sequelize.define("Product_Category", {
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });


    return Product_Category;
  };