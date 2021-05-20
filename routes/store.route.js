module.exports = app =>{
    const store = require ("../controllers/store.controller")
    app.post('/stores', store.create)
    app.put('/stores/:id', store.update)
    app.delete('/stores/:id', store.delete)
    app.get('/stores', store.getAll)
}