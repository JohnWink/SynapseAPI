module.exports = app =>{
    const stock = require ("../controllers/stock.controller")
    const auth = require("../controllers/authentication")

    app.get('/items/:idItem/stocks', auth.authenticateJWT,  stock.findByItem)
    app.get('/items/:idItem/stocks/count',  auth.authenticateJWT,  stock.countByItem)
    app.post('/items/:idItem/stocks/',  auth.authenticateJWT,  stock.create)
    app.delete('/stocks/:idStock',  auth.authenticateJWT,  stock.delete)

}