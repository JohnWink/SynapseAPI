
module.exports = (sequelize, DataTypes) => {
    const Support = sequelize.define("support", {
        contact: {
            type: DataTypes.STRING
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    });
    return Support;
  };
