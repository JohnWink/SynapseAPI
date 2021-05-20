module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("item", {
        marketPrice: {
            type: DataTypes.INTEGER
        },
        storePrice: {
            type: DataTypes.INTEGER
        },
        dosageValue:{
            type: DataTypes.INTEGER
        },
        dosageMeasure:{
            type: DataTypes.STRING,
            defaultValue:"ml"
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });

   

    return Item;
  };
  