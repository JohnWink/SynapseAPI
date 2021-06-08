module.exports = app =>{
    const product = require ("../controllers/product.controller")
    const auth = require("../controllers/authentication")

    app.get('/products', auth.authenticateJWT,  product.findAll)
    app.get('/products/:idProduct', auth.authenticateJWT,  product.findOne)
    app.get('/stores/:idStore/products', auth.authenticateJWT,  product.findByStore)
    app.post('/products', auth.authenticateJWT,  product.create)
    app.put('/products/:idProduct', auth.authenticateJWT,  product.update)
    app.put('/products/:idProduct/activate', auth.authenticateJWT,  product.activate)
    app.delete('/products/:idProduct', auth.authenticateJWT,  product.delete)
    
}