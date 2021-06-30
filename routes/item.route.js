module.exports = app =>{
    const item = require ("../controllers/item.controller")
    const auth = require("../controllers/authentication")

    app.post('/products/:idProduct/items', auth.authenticateJWT, item.create)
    app.post('/products/:idProduct/items/add', auth.authenticateJWT, item.addItem)
    app.put('/items/:idItem', auth.authenticateJWT, item.update)
    app.put('/products/:idProduct/items', auth.authenticateJWT, item.updateDosageMeasure)
    app.put('/items/:idItem/activate', auth.authenticateJWT,  item.activate)
    app.delete('/items/:idItem', auth.authenticateJWT,  item.delete)
    app.delete('/stores/:idStore/items', auth.authenticateJWT,  item.deleteByStore)
    app.get('/products/:idProduct/items', auth.authenticateJWT,  item.findByProduct)
    app.get('/stores/:idStore/products/:idProduct/items', auth.authenticateJWT,  item.findByStoreProduct)
}