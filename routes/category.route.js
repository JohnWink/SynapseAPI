module.exports = app =>{
    const category = require ("../controllers/category.controller")

    app.get('/categories', category.findAll)
    app.get('/categories/:idCategory', category.findOne)
    app.post('/categories/', category.create)
    app.put('/categories/:idCategory', category.update)
    app.put('/categories/:idCategory/upload', category.upload)
    app.put('/categories/:idCategory/activate', category.activate)
    app.delete('/categories/:idCategory', category.delete)
}