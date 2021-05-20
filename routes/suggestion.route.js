module.exports = app =>{
    const suggestion = require ("../controllers/suggestion.controller")
    const auth = require("../controllers/authentication")

    app.get('/suggestions', auth.authenticateJWT, suggestion.countByProduct)
    app.post('/users/:idUser/suggestions',  auth.authenticateJWT, suggestion.create)
    app.get('/suggestions/products',  auth.authenticateJWT, suggestion.findByProduct)
}