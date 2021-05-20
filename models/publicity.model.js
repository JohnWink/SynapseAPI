module.exports = (sequelize, DataTypes) => {
    const Publicity = sequelize.define("publicity", {
        file: {
            type: DataTypes.STRING
        },
        order:{
            type: DataTypes.INTEGER
        },

        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });
  
    return Publicity;
  };
  