module.exports = app =>{
    const publicity = require ("../controllers/publicity.controller")

    app.get('/publicities', publicity.findAll)
    app.post('/publicities', publicity.create)
    app.put('/publicities/:idPublicity/upload', publicity.upload)
    app.put('/publicities/:idPublicity', publicity.update)
    app.put('/publicities/:idPublicity/activate', publicity.activate)
    app.delete('/publicities/:idPublicity', publicity.delete)

}