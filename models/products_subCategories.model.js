module.exports = (sequelize, DataTypes) => {
    const Products_SubCategories = sequelize.define("products_subCategories", {
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });

  
    return Products_SubCategories;
  };