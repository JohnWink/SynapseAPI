
module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("store", {
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        phone:{
            type: DataTypes.STRING
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
    });

    return Store;
  };
  