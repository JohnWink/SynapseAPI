module.exports = app =>{
    const product = require ("../controllers/product.controller")

    app.get('/products', product.findAll)
    app.get('/products/:idProduct', product.findOne)
    app.post('/products', product.create)
    app.put('/products/:idProduct', product.update)
    app.put('/products/:idProduct/activate', product.activate)
    app.delete('/products/:idProduct', product.delete)
}