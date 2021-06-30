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
db.languages = require("./language.model.js")(sequelize, Sequelize);
db.products_categories = require("./products_categories.model.js")(sequelize, Sequelize);
db.products_subCategories = require("./products_subCategories.model.js")(sequelize, Sequelize);


//LANGUAGE-CATEGORY
db.languages.hasMany(db.categories,{foreignKey:'idLanguage'})
//LANGUAGE-SUBCATEGORY
db.languages.hasMany(db.subCategories,{foreignKey:'idLanguage'})
//LANGUAGE-PUBLICITY
db.languages.hasMany(db.publicities,{foreignKey:'idLanguage'})
//LANGUAGE-PRODUCT_INFORMATION
db.languages.hasMany(db.productInformations,{foreignKey:'idLanguage'})

//PUBLICITY-LANGUAGE
db.publicities.belongsTo(db.languages,{foreignKey:'idLanguage'})

//CATEGORY-SUBCATEGORY
db.categories.hasMany(db.subCategories, {foreignKey:'idCategory'});

//CATEGORY-LANGUAGE
db.categories.belongsTo(db.languages,{
  foreignKey:"idLanguage",
})

//CATEGORY-PRODUCT
db.categories.belongsToMany(db.products,{
  through: db.products_categories,
 
  foreignKey:"idCategory",
})




//SUBCATEGORY-CATEGORY
db.subCategories.belongsTo(db.categories,{
  foreignKey:"idCategory",
})



//SUBCATEGORY-LANGUAGE
db.subCategories.belongsTo(db.languages,{
  foreignKey:"idLanguage",
})

//CATEGORY-PRODUCT
db.subCategories.belongsToMany(db.products,{
  through:db.products_subCategories,

  foreignKey:"idSubCategory",
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
db.products.belongsToMany(db.categories,{
  through:db.products_categories,

  foreignKey:"idProduct",
})

//PRODUCT-SUBCATEGORY
db.products.belongsToMany(db.subCategories,{
  
      through:db.products_subCategories,

      foreignKey:"idProduct",
      allowNull:true,
})

//PRODUCT-IMAGE
db.products.hasMany(db.images,{foreignKey :"idProduct"})

//PRODUCT-PRODUCT_INFORMATION
db.products.hasMany(db.productInformations,{foreignKey :"idProduct"})

//PRODUCTION_INFORMATION-PRODUCT
db.productInformations.belongsTo(db.products,{
  foreignKey:"idProduct"
})

//PRODUCTION_INFORMATION-LANGUAGE
db.productInformations.belongsTo(db.languages,{
  foreignKey:"idLanguage"
})

//STOCK-ITEM
db.stocks.belongsTo(db.items,{
  foreignKey:"idItem",
})

//STORE-HISTORY
db.stores.hasMany(db.histories,{foreignKey :"idStore"})

//STORE-ITEM
db.stores.hasMany(db.items,{foreignKey :"idStore"})


//SUGGESTION-USER
db.suggestions.belongsTo(db.users,{
  foreignKey:"idUser"
})

module.exports = db;

