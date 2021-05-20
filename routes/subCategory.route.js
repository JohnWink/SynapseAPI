module.exports = app =>{
    const subCategory = require ("../controllers/subCategory.controller")

    app.get('/categories/:idCategory/subCategories', subCategory.findByCategory)
    app.get('/subCategories/:idSubCategory', subCategory.findOne)
    app.post('/categories/:idCategory/subCategories/', subCategory.create)
    app.put('/subCategories/:idSubCategory', subCategory.update)
    app.put('/subCategories/:idSubCategory/upload', subCategory.upload)
    app.put('/subCategories/:idSubCategory/activate', subCategory.activate)
    app.delete('/subCategories/:idSubCategory', subCategory.delete)
}