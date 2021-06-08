module.exports = app =>{
    const language = require ("../controllers/language.controller")
    const auth = require("../controllers/authentication")

    app.get('/languages', auth.authenticateJWT, language.findAll)
    app.post('/languages',  auth.authenticateJWT, language.create)
    app.put('/languages/:idLanguage',  auth.authenticateJWT, language.update)
    app.put('/languages/:idLanguage/upload',  auth.authenticateJWT, language.upload)
    app.put('/languages/:idLanguage/activate',  auth.authenticateJWT, language.activate)
    app.delete('/languages/:idLanguage',  auth.authenticateJWT, language.delete)
}