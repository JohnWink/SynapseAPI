module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        image: {
            type: DataTypes.STRING
        },
        order:{
            type:DataTypes.INTEGER
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });
   
    return Image;
  };