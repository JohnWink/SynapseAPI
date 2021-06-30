module.exports = (sequelize, DataTypes) => {
    const Product_SubCategory = sequelize.define("Product_subCategory", {
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });


    return Product_SubCategory;
  };