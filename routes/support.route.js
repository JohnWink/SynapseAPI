module.exports = app =>{
    const support = require ("../controllers/support.controller")

    app.get('/supports/:idSupport', support.findOne)
    app.put('/supports/:idSupport', support.update)
    app.put('/supports/:idSupport/activate', support.activate)
    app.post('/supports', support.create)
    app.delete('/supports/:idSupport', support.delete)
}