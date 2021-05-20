const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  username: dbConfig.USERNAME,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.categories = require("./category.model.js")(sequelize, Sequelize);
db.histories = require("./history.model.js")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);
db.items = require("./item.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.productInformations = require("./productInformation.model.js")(sequelize, Sequelize);
db.stocks = require("./stock.model.js")(sequelize, Sequelize);
db.stores = require("./store.model.js")(sequelize, Sequelize);
db.subCategories = require("./subCategory.model.js")(sequelize, Sequelize);
db.suggestions = require("./suggestion.model.js")(sequelize, Sequelize);
db.supports = require("./support.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.publicities = require("./publicity.model.js")(sequelize, Sequelize);


//CATEGORY-SUBCATEGORY
db.categories.hasMany(db.subCategories, {foreignKey:'idCategory'});

//SUBCATEGORY-CATEGORY
db.subCategories.belongsTo(db.categories,{
  foreignKey:"idCategory",
})

// HISTORY-STOCK
db.histories.belongsTo(db.stocks,{
  foreignKey:"idStock",

},)
//HISTORY-USER
db.histories.belongsTo(db.users,{
  foreignKey:{
      name: "idUser",
      allowNull: true
  }
})


//HISTORY-STORE
db.histories.belongsTo(db.stores,{
  foreignKey:{
      name: "idStore"
  }
})

//IMAGE-PRODUCT
db.images.belongsTo(db.products,{
  foreignKey:"idProduct",
})

//ITEM-STORE
db.items.belongsTo(db.stores,{
  foreignKey:"idStore",

})

//ITEM-PRODUCT
db.items.belongsTo(db.products,{
  foreignKey:"idProduct",
})

//ITEM-STOCK
db.items.hasMany(db.stocks,{foreignKey :"idItem"})

//PRODUCT-ITEM
db.products.hasMany(db.items,{foreignKey:"idProduct"})

//PRODUCT-CATEGORY
db.products.belongsTo(db.categories,{
  foreignKey:"idCategory",
})

//PRODUCT-SUBCATEGORY
db.products.belongsTo(db.subCategories,{
  foreignKey:{
      name:"idSubCategory",
      allowNull:true},
})

//PRODUCT-IMAGE
db.products.hasMany(db.images,{foreignKey :"idProduct"})

//PRODUCT-PRODUCT_INFORMATION
db.products.hasMany(db.productInformations,{foreignKey :"idProduct"})

//PRODUCTION_INFORMATION-PRODUCT
db.productInformations.belongsTo(db.products,{
  foreignKey:"idProduct"
})

//STOCK-ITEM
db.stocks.belongsTo(db.items,{
  foreignKey:"idItem",
})

//STORE-HISTORY
db.stores.hasMany(db.histories,{foreignKey :"idStore"})

//STORE-ITEM
db.stores.hasMany(db.items,{foreignKey :"idItem"})


//SUGGESTION-USER
db.suggestions.belongsTo(db.users,{
  foreignKey:"idUser"
})

module.exports = db;

