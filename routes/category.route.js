module.exports = app =>{
    const category = require ("../controllers/category.controller")
    const auth = require("../controllers/authentication")
    app.get('/categories', auth.authenticateJWT, category.findAll)
    app.get('/categories/:idCategory',  auth.authenticateJWT, category.findOne)
    app.post('/categories/',  auth.authenticateJWT, category.create)
    app.put('/categories/:idCategory',auth.authenticateJWT, category.update)
    app.put('/categories/:idCategory/upload',auth.authenticateJWT, category.upload)
    app.put('/categories/:idCategory/activate', auth.authenticateJWT, category.activate)
    app.delete('/categories/:idCategory',auth.authenticateJWT, category.delete)
}