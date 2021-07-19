

module.exports = (sequelize, DataTypes) => {
    const ProductInformation = sequelize.define("productInformation", {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        summary:{
            type: DataTypes.TEXT
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });


    return ProductInformation;
  };
  