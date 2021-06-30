module.exports = app =>{
    const store = require ("../controllers/store.controller")
    const auth = require("../controllers/authentication")
    app.post('/stores',auth.authenticateJWT, store.create)
    app.put('/stores/:id',auth.authenticateJWT, store.update)
    app.delete('/stores/:id', auth.authenticateJWT, store.delete)
    app.get('/products/:idProduct/stores', auth.authenticateJWT, store.findByProduct)
    app.get('/stores', auth.authenticateJWT, store.getAll)
    app.get('/stores/sales', auth.authenticateJWT, store.findAllSales)
}