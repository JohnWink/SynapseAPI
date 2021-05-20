
module.exports = (sequelize, DataTypes) => {
    const Suggestion = sequelize.define("suggestion", {
        product: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING,
            allowNull:true
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
    });
    
    return Suggestion;
  };
  