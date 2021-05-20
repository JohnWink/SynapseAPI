module.exports = app =>{
    const item = require ("../controllers/item.controller")
    const auth = require("../controllers/authentication")

    app.post('/stores/:idStore/products/:idProduct/items/', auth.authenticateJWT, item.create)
    app.put('/items/:idItem', auth.authenticateJWT, item.update)
    app.put('/items/:idItem/activate', auth.authenticateJWT,  item.activate)
    app.delete('/items/:idItem', auth.authenticateJWT,  item.delete)
}