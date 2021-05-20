module.exports = app =>{
    const productInformation = require ("../controllers/productInformation.controller")
    const auth = require("../controllers/authentication")
    app.post('/products/:idProduct/productInformation', auth.authenticateJWT,  productInformation.create)
    app.put('/productInformation/:idCategory',  auth.authenticateJWT,  productInformation.update)
    app.delete('/productInformation/:idCategory', auth.authenticateJWT, productInformation.delete)
    
}