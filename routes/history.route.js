module.exports = app =>{
    const history = require ("../controllers/history.controller")

    app.post('/histories', history.create)

}