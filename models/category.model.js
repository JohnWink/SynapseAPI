


module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        category: {
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
   
    return Category;
  };