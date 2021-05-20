module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        address:{
            type: DataTypes.STRING
        },
        nif:{
            type: DataTypes.STRING
        },
        nipc:{
            type: DataTypes.STRING
        },
        publicity:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
  
    return User;
  };
  