

module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define("history", {
        dateTime:{
            type:DataTypes.DATE
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
    return History;
  };