module.exports = app =>{
    const productInformation = require ("../controllers/category.controller")

    app.post('/productInformation/', productInformation.create)
    app.put('/productInformation/:idCategory', productInformation.update)
    app.put('/productInformation/:idCategory/upload', productInformation.upload)
    app.put('/productInformation/:idCategory/activate', productInformation.activate)
    app.delete('/productInformation/:idCategory', productInformation.delete)
    
}