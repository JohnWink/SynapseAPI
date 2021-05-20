module.exports = app =>{
    const item = require ("../controllers/item.controller")

    app.post('/stores/:idStore/products/:idProduct/items/', item.create)
    app.put('/items/:idItem', item.update)
    app.put('/items/:idItem/activate', item.activate)
    app.delete('/items/:idItem', item.delete)
}