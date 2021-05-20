module.exports = app =>{
    const suggestion = require ("../controllers/suggestion.controller")

    app.get('/suggestions', suggestion.countByProduct)
    app.post('/users/:idUser/suggestions', suggestion.create)
    app.get('/suggestions/products', suggestion.findByProduct)
}