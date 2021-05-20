
module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define("subCategory", {
        subCategory: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
  
    return SubCategory;
  };
  