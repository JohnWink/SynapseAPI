module.exports = app =>{
    const stock = require ("../controllers/stock.controller")

    app.get('/items/:idItem/stocks', stock.findByItem)
    app.get('/items/:idItem/stocks/count', stock.countByItem)
    app.post('/items/:idItem/stocks/', stock.create)
    app.delete('/stocks/:idStock', stock.delete)

}