

module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define("language", {
        language: {
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING,
            
        },

        order:{
            type:DataTypes.INTEGER
        },

        active:{
            type:DataTypes.BOOLEAN,
            defaultValue: 0
        }

    });

  
    return Language;
  };