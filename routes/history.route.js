module.exports = app =>{
    const history = require ("../controllers/history.controller")
    const auth = require("../controllers/authentication")
    app.post('/histories', auth.authenticateJWT, history.create) 
    app.get('/histories', auth.authenticateJWT, history.findAll)       
}