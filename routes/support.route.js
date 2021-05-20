module.exports = app =>{
    const support = require ("../controllers/support.controller")
    const auth = require("../controllers/authentication")

    app.get('/supports/:idSupport', auth.authenticateJWT,  support.findOne)
    app.put('/supports/:idSupport', auth.authenticateJWT, support.update)
    app.put('/supports/:idSupport/activate', auth.authenticateJWT, support.activate)
    app.post('/supports', auth.authenticateJWT, support.create)
    app.delete('/supports/:idSupport', auth.authenticateJWT, support.delete)
}