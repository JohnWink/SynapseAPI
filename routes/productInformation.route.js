module.exports = app =>{
    const productInformation = require ("../controllers/productInformation.controller")
    const auth = require("../controllers/authentication")
    app.post('/products/:idProduct/productInformation', auth.authenticateJWT,  productInformation.create)
    app.get('/language/:idLanguage/productInformation', auth.authenticateJWT,  productInformation.findByLanguage)
    app.get('/products/:idProduct/productInformation', auth.authenticateJWT,  productInformation.findByProduct)
    app.put('/productInformation/:idProductInformation',  auth.authenticateJWT,  productInformation.update)
    app.delete('/productInformation/:idCategory', auth.authenticateJWT, productInformation.delete)
}