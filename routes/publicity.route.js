module.exports = app =>{
    const publicity = require ("../controllers/publicity.controller")
    const auth = require("../controllers/authentication")

    app.get('/publicities', auth.authenticateJWT,  publicity.findAll)
    app.post('/publicities', auth.authenticateJWT,  publicity.create)
    app.put('/publicities/:idPublicity/upload', auth.authenticateJWT,  publicity.upload)
    app.put('/publicities/:idPublicity', auth.authenticateJWT,  publicity.update)
    app.put('/publicities/:idPublicity/activate', auth.authenticateJWT,  publicity.activate)
    app.delete('/publicities/:idPublicity', auth.authenticateJWT,  publicity.delete)

}