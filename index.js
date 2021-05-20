const express = require('express')
var bodyParser = require("body-parser");
var mustacheExpress = require('mustache-express')
const cors = require("cors");
const db = require("./models/index.js");


var app = express();

var corsOptions = {
    origin: "http://localhost:8080",
  };


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


/*
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
*/

db.sequelize.sync();

app.engine('html',mustacheExpress())
app.set('view engine', 'html')

/*
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  //res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
*/


module.exports= app;


require("./routes/category.route.js")(app)


require("./routes/history.route")(app)
require("./routes/image.route")(app)
require("./routes/item.route")(app)
require("./routes/product.route")(app)
require("./routes/productInformation.route")(app)
require("./routes/publicity.route")(app)
require("./routes/stock.route")(app)
require("./routes/store.route")(app)
require("./routes/subCategory.route")(app)
require("./routes/suggestion.route")(app)
require("./routes/support.route")(app)
require("./routes/user.route")(app)


let port = process.env.PORT

if(port == null||port ==""){
     port = 3000;
}
app.listen(port,function(){
  console.log("Server running at port", port)
})

