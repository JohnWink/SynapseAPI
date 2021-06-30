module.exports = (sequelize, DataTypes) => {
    const Products_Categories = sequelize.define("products_categories", {
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });

  
    return Products_Categories;
  };