

module.exports = (sequelize, DataTypes) => {
    const ProductInformation = sequelize.define("productInformation", {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        summary:{
            type: DataTypes.STRING
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        }
    });


    return ProductInformation;
  };
  